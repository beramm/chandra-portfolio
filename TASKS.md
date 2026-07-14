# TASKS.md

## Phase 0 — Setup

- [x] `npx create-next-app@latest` (TypeScript, Tailwind, App Router, `src/` optional)
- [x] Set up ESLint/Prettier
- [ ] Push to GitHub, connect Vercel for preview deploys
- [x] Add base fonts (next/font)

## Phase 1 — Vercel Postgres + Blob setup

- [x] Neon Postgres integration installed via `vercel integration add neon`, attached to project (Vercel Postgres is now Neon on the marketplace)
- [x] Blob store created + linked via `vercel blob create-store chandra-portfolio-blob --access public`
- [x] `vercel env pull .env.local` — `POSTGRES_URL` (+ variants) and `BLOB_READ_WRITE_TOKEN` present locally
- [x] Migration script written (`scripts/migrate.ts`, run via `npm run migrate`) — creates `projects` table (id, name, slug, description, type, cover_image_url, github_url, live_url, created_at, updated_at)
- [x] Migration script covers `otp_codes` table (id, email, code, expires_at, created_at)
- [x] Run `npm run migrate` against the attached Postgres store — `projects` + `otp_codes` tables created
- [x] `npm install @vercel/postgres @vercel/blob`
- [x] `lib/db.ts` — query helpers using `@vercel/postgres`

## Phase 1b — Auth (OTP)

- [x] MailerSend account + API key → `MAILERSEND_API_TOKEN` + `MAILERSEND_FROM_EMAIL` set in all Vercel envs + `.env.local` (trial domain `test-3m5jgrop9nxgdpyo.mlsender.net`; trial sends only to account owner's email)
- [x] `ADMIN_EMAIL` env var (only this address can log in) — set in all Vercel envs + `.env.local`
- [x] `POST /api/auth/request-otp` — generate code, store, email it, rate-limit (5/hour)
- [x] `POST /api/auth/verify-otp` — check code+expiry, delete row, sign JWT, set httpOnly cookie
- [x] `POST /api/auth/logout` — clear cookie
- [x] `proxy.ts` (Next 16 replacement for `middleware.ts`) — guard `/admin/*` and admin API routes
- [x] `JWT_SECRET` env var — generated, set in all Vercel envs + `.env.local`

## Phase 2 — Admin UI

- [x] `/admin/login` — email input + "send code" + code input (two-step client form)
- [x] `/admin/projects` — list of all projects (edit/delete, logout)
- [x] `/admin/projects/new` + `/admin/projects/[id]/edit` — shared `ProjectForm`: name, description, type (chips + custom input), photo upload, github url, live url (optional)
- [x] `POST /api/upload` — photo to Vercel Blob (`put()`, 5 MB cap, image MIME whitelist), return public URL
- [x] `GET/POST /api/projects`, `PUT/DELETE /api/projects/[id]` — mutations guarded by proxy, revalidate `/`, `/projects`, slug paths
- [x] Slug auto-generated from name (dedupe with `-2`, `-3` suffix — tested)
- [x] Validation client + server side (required fields, valid URLs) — server returns 400 on bad input

## Phase 3 — Layout & nav

- [x] Lock design direction: **motion-driven**, light + dark toggle, monochrome + blue accent (#2563EB light / #3B82F6 dark), Space Grotesk (headings) + Archivo (body). Tokens in `app/globals.css` `@theme` (Tailwind v4 is CSS-first — no `tailwind.config.ts` in this scaffold)
- [x] `app/layout.tsx` — base layout, metadata defaults (title template), next/font, `next-themes` ThemeProvider (class strategy, system default)
- [x] Nav component (sticky, active link state, theme toggle; hidden on `/admin/*`)
- [x] Footer component (socials, links; hidden on `/admin/*`)

## Phase 4 — Home page

- [x] `ui-ux-pro-max` skill: queried landing patterns — Portfolio Grid (hero → grid → about → contact, neutral bg, visuals first)
- [x] Hero section (name, tagline, CTAs) — staggered entrance animation, reduced-motion safe
- [x] Featured projects grid (3 newest from DB, `ProjectCard` + scroll `Reveal`, ISR `revalidate = 3600` + on-demand revalidation from admin writes)
- [x] Skills/stack strip
- [x] Contact section on `/` (`#contact`, mailto CTA — Phase 7 may upgrade to form)

## Phase 5 — Public projects

- [x] `ui-ux-pro-max` skill queried (results not relevant — standard case-study layout used)
- [x] `/projects` — list page, `ProjectCard`, filter chips by `type` (distinct values from DB, `?type=` searchParam, server-filtered)
- [x] `/projects/[slug]` — detail page (cover, type badge, date, description, GitHub/live links; 404 if missing)
- [x] `generateMetadata` per project (title, description, OG image from cover)
- [x] On-demand revalidation: admin create/update/delete calls `revalidatePath` for `/`, `/projects`, and slug paths (wired in Phase 2)

## Phase 6 — About

- [x] Bio content — derived from CV (AI Engineer, Denpasar; Sanata Dharma Informatics 3.87; Apple Developer Academy Bali 2026)
- [x] Timeline/experience component (Apple Academy, PT. Sinergi Merah Putih, Bangkit Academy) + education card + highlights (IT Days 1st place, IEEEXtreme top-10 ID, TF Developer cert)
- [x] Home hero tagline, Stack strip, site metadata, footer name updated with real CV data (LinkedIn URL in footer still placeholder — need the real profile URL)

## Phase 7 — Contact

- [x] Decide mailto vs form — **mailto** (contact section on `/` with `#contact` anchor, built in Phase 4)
- [x] ~~If form: API route + email service integration~~ (not needed)
- [x] ~~Basic validation + success/error state~~ (not needed)

## Phase 8 — Polish

- [x] `ui-ux-pro-max` skill: `--domain ux` checklist pass — reduced-motion ✓, ease-out ✓, restrained animation ✓; added global `:focus-visible` ring + skip-to-content link
- [x] Mobile responsive (max-w containers, sm/lg grid breakpoints, flexible nav/footer)
- [x] Dark mode toggle (built in Phase 3; `theme-color` viewport meta added per theme)
- [x] Favicon (`app/icon.tsx` generated "B" mark), OG image (`app/opengraph-image.tsx` branded card), `metadataBase` + per-route metadata
- [x] Lighthouse (local prod build): performance 94, accessibility 100, best-practices 100, SEO 100 (LCP 3.1 s locally — hero fade-in delays it; expect better on Vercel CDN)

## Phase 9 — Deploy

- [x] Production live at **https://bramchandra.vercel.app** (note: `chandra-portfolio.vercel.app` was taken by another user's site — claimed `bramchandra.vercel.app` instead; `NEXT_PUBLIC_SITE_URL` + `metadataBase` point there)
- [x] GitHub repo `beramm/chandra-portfolio` pushed; connect to Vercel project (Settings → Git) for auto-deploys — **verify connected**
- [ ] Custom domain (optional — `.vercel.app` subdomain works now)
- [ ] Analytics (decide: none / Vercel Analytics)
- [x] Seeded 5 CV projects via prod API (cover photos pending — add via `/admin`)
- [ ] Final content review (project GitHub links are profile placeholder `github.com/beramm` — swap for real repo URLs in admin; add cover photos)
- [x] Postgres (Neon) + Blob attached, env vars propagated
- [x] All env vars in prod (MAILERSEND_API_TOKEN, MAILERSEND_FROM_EMAIL, ADMIN_EMAIL, JWT_SECRET, NEXT_PUBLIC_SITE_URL)
