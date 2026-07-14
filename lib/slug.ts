import { slugExists } from "@/lib/db";

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Returns a slug unique among projects. If the base slug is taken (by a
 * project other than `excludeId`'s current slug), appends -2, -3, ...
 */
export async function uniqueSlug(
  name: string,
  currentSlug?: string,
): Promise<string> {
  const base = slugify(name) || "project";
  let candidate = base;
  let n = 2;
  while (candidate !== currentSlug && (await slugExists(candidate))) {
    candidate = `${base}-${n++}`;
  }
  return candidate;
}
