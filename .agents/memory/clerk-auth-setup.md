---
name: Clerk auth setup (qr-course finance app)
description: How Google/Clerk login is wired into the qr-course web app and api-server, and the security boundary.
---

# Clerk auth in the finance course app

The qr-course web app uses Replit-managed Clerk for login (Google + email/password). Setup was done via the `clerk-auth` skill.

## Security boundary — the key lesson
**UI route gating is NOT a security boundary.** `clerkMiddleware` only decorates requests; it does not enforce auth. The Express `/api` router enforces auth server-side: `requireAuth` (uses `getAuth(req)`) is mounted after the public `healthz` route and before all other routers, so anonymous callers get 401.

**Why:** without server-side `requireAuth`, the diagnostics endpoints (course reset, lecture-expansion) and the OpenAI-backed tutor/practice/grading endpoints were publicly callable on the deployed app — data tampering + OpenAI cost-burn risk. Architect flagged this; fix was adding `requireAuth`.

**How to apply:** any new `/api` route is auth-protected by default (it's behind the blanket `requireAuth` in routes/index.ts). Only add a route above the `requireAuth` line if it is intentionally public. Web auth is cookie-based — never add Bearer/`getToken()` token handling to browser calls.

## Home route
Base path `/` is public: `HomeRedirect` shows `Landing` (pages/Landing.tsx) when signed-out, `Dashboard` when signed-in. Other routes use a `Protected` wrapper that redirects signed-out users to `/`. Never drop signed-out users onto `/sign-in`.

## Gotcha
Tailwind v4 here — needed `@layer theme, base, clerk, components, utilities;` before `@import "tailwindcss"` in index.css and `tailwindcss({ optimize: false })` in vite.config.ts, or Clerk UI renders broken in prod.
