---
name: Guest access model
description: How anonymous access, guest AI metering, and per-user data scoping work in the finance course app
---

The login wall was removed. Rules that must survive future changes:

- **Every request has an identity.** The `identify` middleware stamps `req.userId` with either the Clerk user id or a `g_<uuid>` guest-cookie id (`fin_guest`). All progress tables (`attempts`, `practice_sessions`, `practice_attempts`, `practice_assignments`) carry `user_id` and every read/write MUST be scoped by it — the app used to be single-owner, so unscoped queries look fine in dev but leak the owner's data to every guest.
  **Why:** removing auth exposed unscoped course-overview/analytics/practice queries; a review also found a session IDOR (`/practice/sessions/:id/*` loaded by id only).
  **How to apply:** any new route that touches progress data must filter by `getUserId(req)`; load parent rows (sessions, attempts) with `and(id, userId)` and 404 on mismatch.
- **Guest AI metering** (`guestAiGate`): only explicit AI-generation routes are metered (regex allowlist), never plain browsing; the quota is charged with an atomic up-front reservation so parallel requests can't bypass the limit. Over-limit guests get 401 `{error:"LOGIN_REQUIRED"}`, which the frontend's react-query caches turn into the LoginGate dialog.
- **Guest→user adoption:** on first signed-in request with a lingering `fin_guest` cookie, identify reassigns the guest's rows to the Clerk id and clears the cookie — the UI promises "your progress will be saved".
- **Admin-only data** (visitor counts) is enforced server-side by looking up the Clerk user's primary email via `clerkClient.users.getUser` — sessionClaims lack email.
- pdfkit/fontkit must stay in the esbuild `external` list in api-server's build.mjs (bundling breaks their font-data file reads).
- Schema changes were applied with drizzle push to the shared Neon DB; if prod ever uses a separate DB, push there before publishing.
