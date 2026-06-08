import type { Request } from "express";

// requireAuth stamps the Clerk user id onto the request. This reads it back.
export function getUserId(req: Request): string {
  const id = (req as Request & { userId?: string }).userId;
  return id ? String(id) : "";
}
