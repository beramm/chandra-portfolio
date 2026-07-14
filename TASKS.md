# TASKS.md

## Phase 0 — Setup
- [ ] `npx create-next-app@latest` (TypeScript, Tailwind, App Router, `src/` optional)
- [ ] Set up ESLint/Prettier
- [ ] Push to GitHub, connect Vercel for preview deploys
- [ ] Add base fonts (next/font)

## Phase 1 — Vercel Postgres + Blob setup
- [ ] Vercel dashboard → Storage tab → create Postgres store, attach to project
- [ ] Vercel dashboard → Storage tab → create Blob store, attach to project
- [ ] `vercel env pull .env.local` to get `POSTGRES_URL` (+ variants) and `BLOB_READ_WRITE_TOKEN` locally
- [ ] Migration: create `projects` table (id, name, slug, description, type, cover_image_url, github_url, live_url, created_at, updated_at)
- [ ] Migration: create `otp_codes` table (id, email, code, expires_at, created_at)
- [ ] `npm install @vercel/postgres @vercel/blob`
- [ ] `lib/db.ts` — query helpers using `@vercel/postgres`

## Phase 1b — Auth (OTP)
- [ ] Resend account + API key, `RESEND_API_KEY` env var
- [ ] `ADMIN_EMAIL` env var (only this address can log in)
- [ ] `POST /api/auth/request-otp` — generate code, store, email it, rate-limit
- [ ] `POST /api/auth/verify-otp` — check code+expiry, delete row, sign JWT, set httpOnly cookie
- [ ] `POST /api/auth/logout` — clear cookie
- [ ] `middleware.ts` — guard `/admin/*` and admin API routes
- [ ] `JWT_SECRET` env var

## Phase 2 — Admin UI
- [ ] `/admin/login` — email display (fixed) + "send code" + code input
- [ ] `/admin/projects` — list of all projects (edit/delete)
- [ ] `/admin/projects/new` — form: name, description, type (chips + custom input), photo upload, github url, live url (optional)
- [ ] `POST /api/upload` — photo to Vercel Blob (`put()`), return public URL
- [ ] `GET/POST /api/projects`, `PUT/DELETE /api/projects/[id]`
- [ ] Slug auto-generated from name (dedupe if collision)
- [ ] Basic client-side validation (required fields, valid URL for github link)

## Phase 3 — Layout & nav
- [ ] `app/layout.tsx` — base layout, metadata defaults, font, theme provider if dark mode
- [ ] Nav component
- [ ] Footer component (socials, links)

## Phase 4 — Home page
- [ ] Hero section (name, tagline, CTA)
- [ ] Featured projects grid (2-3 cards, pulled from DB)
- [ ] Skills/stack strip (optional)

## Phase 5 — Public projects
- [ ] `/projects` — list page, card component, filter by `type` (distinct values from DB)
- [ ] `/projects/[slug]` — detail page (fetch by slug, 404 if missing)
- [ ] `generateMetadata` per project for SEO
- [ ] On-demand revalidation: after admin create/update/delete, call `revalidatePath` for `/projects` and the specific slug

## Phase 6 — About
- [ ] Bio content
- [ ] Timeline/experience component (optional)

## Phase 7 — Contact
- [ ] Decide mailto vs form
- [ ] If form: API route + email service integration
- [ ] Basic validation + success/error state

## Phase 8 — Polish
- [ ] Mobile responsive pass
- [ ] Dark mode toggle (if applicable)
- [ ] Favicon, OG image, metadata for all routes
- [ ] Lighthouse pass (performance, a11y)

## Phase 9 — Deploy
- [ ] Custom domain
- [ ] Analytics (if chosen)
- [ ] Final content review
- [ ] Confirm Postgres + Blob stores are attached to the Vercel project (Storage tab) and env vars propagated
- [ ] Confirm remaining env vars set in Vercel dashboard (RESEND_API_KEY, ADMIN_EMAIL, JWT_SECRET)
