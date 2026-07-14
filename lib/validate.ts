export type ProjectInput = {
  name: string;
  description: string;
  type: string;
  cover_image_url: string;
  github_url: string;
  live_url: string | null;
};

function isValidUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function parseProjectInput(
  body: unknown,
): { data: ProjectInput } | { error: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "Invalid body" };
  }
  const b = body as Record<string, unknown>;

  const name = typeof b.name === "string" ? b.name.trim() : "";
  const description =
    typeof b.description === "string" ? b.description.trim() : "";
  const type = typeof b.type === "string" ? b.type.trim() : "";
  const coverImageUrl =
    typeof b.cover_image_url === "string" ? b.cover_image_url.trim() : "";
  const githubUrl = typeof b.github_url === "string" ? b.github_url.trim() : "";
  const liveUrl = typeof b.live_url === "string" ? b.live_url.trim() : "";

  if (!name) return { error: "Name is required" };
  if (!description) return { error: "Description is required" };
  if (!type) return { error: "Type is required" };
  if (!githubUrl || !isValidUrl(githubUrl)) {
    return { error: "A valid GitHub URL is required" };
  }
  if (liveUrl && !isValidUrl(liveUrl)) {
    return { error: "Live URL must be a valid URL" };
  }
  if (coverImageUrl && !isValidUrl(coverImageUrl)) {
    return { error: "Cover image URL must be a valid URL" };
  }

  return {
    data: {
      name,
      description,
      type,
      cover_image_url: coverImageUrl,
      github_url: githubUrl,
      live_url: liveUrl || null,
    },
  };
}
