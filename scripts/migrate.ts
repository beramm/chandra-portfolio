/**
 * One-shot migration: creates the projects and otp_codes tables.
 * Requires POSTGRES_URL in .env.local (run `vercel env pull .env.local` first).
 *
 * Run with: npm run migrate
 */
import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  if (!process.env.POSTGRES_URL) {
    console.error(
      "POSTGRES_URL is not set. Run `vercel env pull .env.local` first.",
    );
    process.exit(1);
  }

  const { sql } = await import("@vercel/postgres");

  await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;

  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      slug text NOT NULL UNIQUE,
      description text NOT NULL DEFAULT '',
      type text NOT NULL,
      cover_image_url text NOT NULL DEFAULT '',
      github_url text NOT NULL DEFAULT '',
      live_url text,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `;

  await sql`
    ALTER TABLE projects
    ADD COLUMN IF NOT EXISTS tech_stack text[] NOT NULL DEFAULT '{}'
  `;

  await sql`
    ALTER TABLE projects
    ADD COLUMN IF NOT EXISTS gallery_images text[] NOT NULL DEFAULT '{}'
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS otp_codes (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      email text NOT NULL,
      code text NOT NULL,
      expires_at timestamptz NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS otp_codes_email_idx ON otp_codes (email)
  `;

  console.log("Migration complete: projects + otp_codes tables ready.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
