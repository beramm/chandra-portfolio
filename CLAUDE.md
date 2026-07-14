# CLAUDE.md

Instructions for Claude Code working in this repo.

## Stack
- Next.js 15 (App Router), TypeScript
- Tailwind CSS
- Framer Motion (animations, optional)
- Vercel Postgres (Neon-backed, via Vercel Storage tab) — project data
- Vercel Blob — project photos
- Resend (OTP emails)
- `jose` (sign/verify session JWT)
- Deploy: Vercel

## Auth model (single admin, no third-party auth provider)
- Admin email is a fixed env var (`ADMIN_EMAIL`). Only that email can request OTP.
- OTP: 6-digit code, stored in `otp_codes` table with `expires_at` (~10 min), single use.
- On verify: delete the OTP row, sign a JWT (`{ role: "admin" }`), set as httpOnly + secure + sameSite=strict cookie.
- `middleware.ts` guards `/admin/*` and all admin API routes (`/api/projects` POST/PUT/DELETE, `/api/upload`) by checking/verifying that cookie.
- Rate-limit `request-otp` (e.g. max 5/hour) to avoid email abuse — even though only one email is allowed, still throttle.
- Never trust client-sent role/email — always re-verify JWT server-side per request.

## Conventions
- `app/` for routes, `components/` for UI, `content/` for portfolio data (projects, about, resume).
- Server Components by default. Only add `"use client"` when interactivity is needed (forms, animations, hooks).
- No CSS-in-JS. Tailwind only. Shared tokens in `tailwind.config.ts`.
- Path alias `@/*` -> project root.
- Components: PascalCase file + export. One component per file unless trivially small.
- Keep components pure/presentational where possible; put data fetching in server components or `lib/`.

## Commands
- `npm run dev` — local dev
- `npm run build` — production build (run before considering a task done)
- `npm run lint` — must pass before commit

## Content model
Projects are DB-backed (Vercel Postgres), not static files — they're created/edited via the admin UI.

`projects` table:
- `id` (uuid, pk)
- `name` (text)
- `slug` (text, unique, generated from name)
- `description` (text)
- `type` (text — free-form, e.g. "website", "ml-deep-learning", "ai", "app-development"; new types are just new string values, no migration needed)
- `cover_image_url` (text — Vercel Blob public URL)
- `github_url` (text)
- `live_url` (text, nullable)
- `created_at`, `updated_at` (timestamptz)

`otp_codes` table:
- `id`, `email`, `code`, `expires_at`, `created_at`

No `project_types` table in v1 — types are just whatever string values exist in `projects.type`. Public `/projects` page derives the filter list with `SELECT DISTINCT type FROM projects`.

## Non-goals
- No CMS integration unless explicitly asked.
- No auth, no database — this is a static/SSG portfolio.
- Don't add new dependencies without checking plan.md's stack decisions first.

## Workflow
- Check tasks.md for current phase before starting work.
- Update tasks.md checkboxes as items complete.
- Don't restructure content model or routing without flagging it first — treat as an architecture decision.
