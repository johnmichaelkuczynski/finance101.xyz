import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";

// Enforces that the request carries a valid Clerk session. The browser sends
// Clerk's session cookie automatically with same-origin requests, so no token
// handling is needed on the client. Routes mounted behind this middleware
// return 401 for unauthenticated callers.
export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const auth = getAuth(req);
  const userId = auth?.sessionClaims?.userId || auth?.userId;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  (req as Request & { userId?: string }).userId = String(userId);
  next();
}
