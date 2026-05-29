---
name: QuantReason clone operations
description: Non-obvious operational facts for the QuantReason-derived course app (qr-course + api-server)
---

# QuantReason-derived course app

This app (qr-course frontend + api-server backend) is a reskinnable course runtime.
Content swaps (e.g. math -> finance) require touching more than the seed file.

## Content lives in three places, not one
A full curriculum reskin must update ALL of these or the UI shows mixed content:
- `artifacts/api-server/src/lib/seed.ts` — topics, lectures, assignments, problems (DB-seeded).
- `artifacts/api-server/src/routes/course.ts` — `WEEK_TITLES` map (hardcoded week titles/summaries) AND the overview `title` string. These are NOT in the DB; the dashboard H1 and Course Schedule come from here.
- Frontend chrome: `artifacts/qr-course/src/components/layout/Layout.tsx` (sidebar logo text), `index.html` (tab title/meta).
- Degraded/fallback paths also carry domain content: `practice.ts` OpenAI-failure fallback problem, and `diagnostics.ts` content-audit system prompts + the AI-detection sample text.
**Why:** branding leaks survive a seed-only swap because these strings are hardcoded outside the seed.

## DB is external Neon, not Replit-managed
- App connects via `DATABASE_URL` secret (Neon Postgres connectionString) — there is no Replit-managed DB.
- A fresh/empty DB needs `pnpm --filter @workspace/db run push` (drizzle-kit) BEFORE the app's `seedIfEmpty` can populate it.
- Leftover `PGHOST`/`PGDATABASE` secrets break the agent's executeSql/psql tooling, but the app ignores them (uses only DATABASE_URL connectionString). Test DB from a node script inside `lib/db` where `pg` resolves, not workspace root.

## Verification
- Two diagnostics prove the stack: GET `/api/diagnostics/system` (7 checks) and POST `/api/diagnostics/synthetic-run` (end-to-end). Both are AI-heavy; use long curl timeouts (~110s).
