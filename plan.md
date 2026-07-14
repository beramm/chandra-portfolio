# plan.md

## Goal
Personal portfolio site: home/hero, projects, about, contact. Fast, static, easy to update with new projects.

## Decisions (fill in / lock before building)
- [x] Content source: **DB-backed (Vercel Postgres)**, managed via admin UI — not static MDX/JSON.
- [x] Admin auth: **OTP to your email** (single hardcoded admin address), no password, no third-party auth provider.
- [x] Image storage: **Vercel Blob**.
- [ ] Design direction: minimal/text-first vs visual/grid-heavy (affects component set).
- [ ] Dark mode: yes/no.
- [ ] Contact method: mailto link vs form (form needs an API route + email service, e.g. Resend — can reuse the same Resend account as OTP).
- [ ] Analytics: none / Vercel Analytics / Plausible.
- [x] Domain + hosting: Vercel.

## Project types
Not a fixed enum. `type` is a free-text field on each project row. Seed with:
`website`, `ml-deep-learning`, `ai`, `app-development`
Admin form shows these as quick-select chips + a "custom type" text input — typing a new value just creates it; no schema change needed.

## Vercel free-tier notes
- **Vercel Postgres** (Neon-backed, via Storage tab): free tier caps at a small storage/compute allotment — plenty for a portfolio (a few hundred projects, low traffic). Auto-provisions `POSTGRES_URL` etc. as env vars once attached to the project.
- **Vercel Blob**: free tier includes a set amount of storage + bandwidth/month — fine for project cover photos at reasonable sizes (compress/resize on upload, don't store raw multi-MB images).
- Both are attached per-project in the Vercel dashboard (Storage tab) and auto-inject env vars into your deployment — no manual `.env` copying for prod, but you still need a local `.env.local` (pull via `vercel env pull`) for dev.

## Pages / Routes
- `/` — hero, short intro, featured projects (2-3), links to socials/resume.
- `/projects` — full list, filterable by tag/tech if useful.
- `/projects/[slug]` — case study per project.
- `/about` — longer bio, skills, timeline (optional, could fold into `/`).
- `/contact` or just a section on `/` — depends on decision above.

## Architecture
- App Router. Public pages (`/`, `/projects`, `/projects/[slug]`) are Server Components fetching from Vercel Postgres at request/build time (use `revalidate` or on-demand revalidation after admin writes, since data is no longer static).
- Admin pages (`/admin/*`) are behind `middleware.ts` cookie check; forms are Client Components (`"use client"`) posting to API routes.
- `lib/db.ts` — `@vercel/postgres` client (or `pg`/`postgres.js` pointed at `POSTGRES_URL`), query helpers for projects + otp_codes.
- `lib/auth.ts` — sign/verify JWT (`jose`), cookie helpers.
- API routes:
  - `POST /api/auth/request-otp`
  - `POST /api/auth/verify-otp`
  - `POST /api/auth/logout`
  - `GET/POST /api/projects`, `PUT/DELETE /api/projects/[id]` (mutations require valid admin cookie)
  - `POST /api/upload` (photo → Vercel Blob via `@vercel/blob`'s `put()`, returns public URL)
- SEO: per-page `metadata` export, OG image generation via `next/og` if wanted.
- Images: `next/image` with the Blob public hostname (`*.public.blob.vercel-storage.com`) allowed in `next.config.js` `images.remotePatterns`.

## Phases
1. **Scaffold** — repo, Tailwind, base layout, fonts, nav/footer.
2. **Vercel storage setup** — attach Postgres + Blob from the Storage tab, run migration to create `projects` + `otp_codes` tables, `vercel env pull` for local dev.
3. **Auth** — request-otp / verify-otp API routes, Resend integration, session cookie, middleware guard.
4. **Admin UI** — login page, `/admin/projects` list + create/edit form (name, description, type, photo upload, github link).
5. **Public pages** — home (hero + featured), `/projects` (filter by type), `/projects/[slug]` detail.
6. **About page**.
7. **Contact** — mailto or form + API route.
8. **Polish** — responsive check, dark mode (if chosen), animations, SEO metadata, OG images.
9. **Deploy** — Vercel, confirm storage env vars are attached, custom domain, analytics.

## Out of scope (v1)
- Multi-admin / roles (single fixed admin email only)
- Blog (unless you want one — flag if so, it changes the content model)
- Rich text/MDX editor for description (v1 = plain textarea)
