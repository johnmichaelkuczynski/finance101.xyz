import type { Request, Response, NextFunction } from "express";
import { sql } from "drizzle-orm";
import { db, guestUsageTable } from "@workspace/db";
import type { IdentifiedRequest } from "./identify";

// A guest may sample the AI features until the app has generated roughly two
// paragraphs of output for them. After that, AI endpoints demand Google
// sign-in. Signed-in users are never limited.
export const GUEST_AI_CHAR_LIMIT = 1600;

// Charged up-front for every gated request so parallel requests can't blow
// past the limit; the actual response size (minus this) is added afterward.
const RESERVATION_CHARS = 200;

// Only these endpoints actually generate AI output. Plain browsing (lecture
// reads, assignment lists, analytics views) must never consume the allowance.
const AI_ROUTES: Array<{ method: string; pattern: RegExp }> = [
  { method: "POST", pattern: /^\/tutor\/ask$/ },
  { method: "GET", pattern: /^\/tutor\/suggestions\/\d+$/ },
  { method: "POST", pattern: /^\/practice\/sessions\/\d+\/(next|grade)$/ },
  { method: "POST", pattern: /^\/assignments\/attempts\/\d+\/(answers|submit)/ },
  { method: "POST", pattern: /^\/practice-assignments(\/|$)/ },
  { method: "POST", pattern: /^\/detection\/scan$/ },
  { method: "POST", pattern: /^\/analytics\/report$/ },
];

function isAiRoute(req: Request): boolean {
  return AI_ROUTES.some(
    (r) => r.method === req.method && r.pattern.test(req.path),
  );
}

// Atomically add chars to a guest's tally and return the total BEFORE adding.
async function chargeGuest(guestId: string, chars: number): Promise<number> {
  const rows = await db
    .insert(guestUsageTable)
    .values({ guestId, aiChars: chars })
    .onConflictDoUpdate({
      target: guestUsageTable.guestId,
      set: {
        aiChars: sql`${guestUsageTable.aiChars} + ${chars}`,
        updatedAt: sql`now()`,
      },
    })
    .returning({ aiChars: guestUsageTable.aiChars });
  return (rows[0]?.aiChars ?? chars) - chars;
}

// Mounted in front of the AI-powered routers. For guests over the free-sample
// limit it returns 401 { error: "LOGIN_REQUIRED" }, which the frontend turns
// into a "sign in with Google to continue" prompt.
export function guestAiGate(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const r = req as IdentifiedRequest;
  if (!r.isGuest || !r.userId || !isAiRoute(req)) {
    next();
    return;
  }
  const guestId = r.userId;

  void (async () => {
    try {
      // Reserve up-front (atomic) so concurrent requests each pay before any
      // AI call runs; check the pre-reservation total against the limit.
      const usedBefore = await chargeGuest(guestId, RESERVATION_CHARS);
      if (usedBefore >= GUEST_AI_CHAR_LIMIT) {
        res.status(401).json({
          error: "LOGIN_REQUIRED",
          message:
            "You've used up the free sample. Sign in with Google to keep going — it's free.",
        });
        return;
      }

      // After the response, top up with the actual output size.
      const originalJson = res.json.bind(res);
      res.json = ((body: unknown) => {
        try {
          const size = JSON.stringify(body)?.length ?? 0;
          const extra = size - RESERVATION_CHARS;
          if (res.statusCode < 400 && extra > 0) {
            void chargeGuest(guestId, extra).catch(() => {});
          }
        } catch {
          // metering must never break the response
        }
        return originalJson(body as never);
      }) as typeof res.json;

      next();
    } catch (err) {
      next(err as Error);
    }
  })();
}
