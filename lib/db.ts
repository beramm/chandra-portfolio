import { sql } from "@vercel/postgres";

export type Project = {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: string;
  cover_image_url: string;
  github_url: string;
  live_url: string | null;
  created_at: string;
  updated_at: string;
};

export type OtpCode = {
  id: string;
  email: string;
  code: string;
  expires_at: string;
  created_at: string;
};

// --- Projects ---

export async function getProjects(): Promise<Project[]> {
  const { rows } = await sql<Project>`
    SELECT * FROM projects ORDER BY created_at DESC
  `;
  return rows;
}

export async function getProjectsByType(type: string): Promise<Project[]> {
  const { rows } = await sql<Project>`
    SELECT * FROM projects WHERE type = ${type} ORDER BY created_at DESC
  `;
  return rows;
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const { rows } = await sql<Project>`
    SELECT * FROM projects ORDER BY created_at DESC LIMIT ${limit}
  `;
  return rows;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { rows } = await sql<Project>`
    SELECT * FROM projects WHERE slug = ${slug} LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const { rows } = await sql<Project>`
    SELECT * FROM projects WHERE id = ${id} LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function getProjectTypes(): Promise<string[]> {
  const { rows } = await sql<{ type: string }>`
    SELECT DISTINCT type FROM projects ORDER BY type
  `;
  return rows.map((r) => r.type);
}

export async function slugExists(slug: string): Promise<boolean> {
  const { rows } = await sql`
    SELECT 1 FROM projects WHERE slug = ${slug} LIMIT 1
  `;
  return rows.length > 0;
}

export async function createProject(data: {
  name: string;
  slug: string;
  description: string;
  type: string;
  cover_image_url: string;
  github_url: string;
  live_url: string | null;
}): Promise<Project> {
  const { rows } = await sql<Project>`
    INSERT INTO projects (name, slug, description, type, cover_image_url, github_url, live_url)
    VALUES (${data.name}, ${data.slug}, ${data.description}, ${data.type},
            ${data.cover_image_url}, ${data.github_url}, ${data.live_url})
    RETURNING *
  `;
  return rows[0];
}

export async function updateProject(
  id: string,
  data: {
    name: string;
    slug: string;
    description: string;
    type: string;
    cover_image_url: string;
    github_url: string;
    live_url: string | null;
  },
): Promise<Project | null> {
  const { rows } = await sql<Project>`
    UPDATE projects
    SET name = ${data.name},
        slug = ${data.slug},
        description = ${data.description},
        type = ${data.type},
        cover_image_url = ${data.cover_image_url},
        github_url = ${data.github_url},
        live_url = ${data.live_url},
        updated_at = now()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] ?? null;
}

export async function deleteProject(id: string): Promise<boolean> {
  const { rowCount } = await sql`DELETE FROM projects WHERE id = ${id}`;
  return (rowCount ?? 0) > 0;
}

// --- OTP codes ---

export async function createOtpCode(
  email: string,
  code: string,
  expiresAt: Date,
): Promise<void> {
  await sql`
    INSERT INTO otp_codes (email, code, expires_at)
    VALUES (${email}, ${code}, ${expiresAt.toISOString()})
  `;
}

export async function findValidOtpCode(
  email: string,
  code: string,
): Promise<OtpCode | null> {
  const { rows } = await sql<OtpCode>`
    SELECT * FROM otp_codes
    WHERE email = ${email} AND code = ${code} AND expires_at > now()
    ORDER BY created_at DESC
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function deleteOtpCode(id: string): Promise<void> {
  await sql`DELETE FROM otp_codes WHERE id = ${id}`;
}

export async function countRecentOtpRequests(
  email: string,
  windowMinutes = 60,
): Promise<number> {
  const { rows } = await sql<{ count: string }>`
    SELECT count(*)::text AS count FROM otp_codes
    WHERE email = ${email}
      AND created_at > now() - make_interval(mins => ${windowMinutes})
  `;
  return Number(rows[0]?.count ?? 0);
}
