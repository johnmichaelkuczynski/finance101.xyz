import type { Request, Response, NextFunction } from "express";
import crypto from "node:crypto";
import { getAuth } from "@clerk/express";
import { eq, sql } from "drizzle-orm";
import {
  db,
  visitorsTable,
  attemptsTable,
  practiceSessionsTable,
  practiceAttemptsTable,
  practiceAssignmentsTable,
} from "@workspace/db";

export const GUEST_COOKIE = "fin_guest";

export type IdentifiedRequest = Request & {
  userId?: string;
  isGuest?: boolean;
};

function readCookie(req: Request, name: string): string | null {
  const header = req.headers.cookie;
  if (!header) return null;
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

// Throttle visitor upserts: only hit the DB once per visitor per process run.
const seenVisitors = new Set<string>();

async function trackVisitor(visitorId: string, kind: "guest" | "user") {
  if (seenVisitors.has(visitorId)) return;
  seenVisitors.add(visitorId);
  try {
    await db
      .insert(visitorsTable)
      .values({ visitorId, kind })
      .onConflictDoUpdate({
        target: visitorsTable.visitorId,
        set: { lastSeenAt: sql`now()`, kind },
      });
  } catch {
    seenVisitors.delete(visitorId);
  }
}

// One-time transfer of a guest's work to their new signed-in identity.
const adoptedGuests = new Set<string>();

async function adoptGuestProgress(guestId: string, userId: string) {
  const key = `${guestId}->${userId}`;
  if (adoptedGuests.has(key)) return;
  adoptedGuests.add(key);
  try {
    await db
      .update(attemptsTable)
      .set({ userId })
      .where(eq(attemptsTable.userId, guestId));
    await db
      .update(practiceSessionsTable)
      .set({ userId })
      .where(eq(practiceSessionsTable.userId, guestId));
    await db
      .update(practiceAttemptsTable)
      .set({ userId })
      .where(eq(practiceAttemptsTable.userId, guestId));
    await db
      .update(practiceAssignmentsTable)
      .set({ userId })
      .where(eq(practiceAssignmentsTable.userId, guestId));
  } catch {
    adoptedGuests.delete(key);
  }
}

// Identifies the caller without walling anyone out. Signed-in users get their
// Clerk user id; anonymous visitors get a long-lived guest cookie id. Every
// route downstream can rely on req.userId being present.
export function identify(req: Request, res: Response, next: NextFunction): void {
  const r = req as IdentifiedRequest;
  const auth = getAuth(req);
  const clerkId = auth?.sessionClaims?.userId || auth?.userId;

  if (clerkId) {
    r.userId = String(clerkId);
    r.isGuest = false;
    void trackVisitor(r.userId, "user");
    // If this browser was a guest before signing in, adopt that guest's
    // progress so nothing is lost, then retire the guest cookie.
    const priorGuestId = readCookie(req, GUEST_COOKIE);
    if (priorGuestId && /^g_[A-Za-z0-9-]{8,64}$/.test(priorGuestId)) {
      res.clearCookie(GUEST_COOKIE, { path: "/" });
      void adoptGuestProgress(priorGuestId, r.userId);
    }
    next();
    return;
  }

  let guestId = readCookie(req, GUEST_COOKIE);
  if (!guestId || !/^g_[A-Za-z0-9-]{8,64}$/.test(guestId)) {
    guestId = `g_${crypto.randomUUID()}`;
    res.cookie(GUEST_COOKIE, guestId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 365 * 24 * 60 * 60 * 1000,
      path: "/",
    });
  }
  r.userId = guestId;
  r.isGuest = true;
  void trackVisitor(guestId, "guest");
  next();
}
