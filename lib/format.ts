const ACRONYMS = new Set(["ai", "ml", "api", "ui", "ux", "llm", "ios", "gcp"]);

/** Display-only: "ml-deep-learning" -> "ML Deep Learning". Raw values stay in URLs/DB. */
export function formatType(type: string): string {
  return type
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) =>
      ACRONYMS.has(w.toLowerCase())
        ? w.toUpperCase()
        : w.charAt(0).toUpperCase() + w.slice(1),
    )
    .join(" ");
}
