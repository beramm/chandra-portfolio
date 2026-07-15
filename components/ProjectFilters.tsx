"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { formatType } from "@/lib/format";

type Props = {
  types: string[];
  techs: string[];
  activeType?: string;
  activeTech?: string;
};

export default function ProjectFilters({
  types,
  techs,
  activeType,
  activeTech,
}: Props) {
  const router = useRouter();

  function navigate(next: { type?: string; tech?: string }) {
    const q = new URLSearchParams();
    if (next.type) q.set("type", next.type);
    if (next.tech) q.set("tech", next.tech);
    const s = q.toString();
    router.push(s ? `/projects?${s}` : "/projects");
  }

  const segments = ["", ...types];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {types.length > 0 && (
        <div
          role="tablist"
          aria-label="Filter by type"
          className="inline-flex flex-wrap items-center gap-1 rounded-full border border-border bg-muted/40 p-1"
        >
          {segments.map((t) => {
            const active = (activeType ?? "") === t;
            return (
              <button
                key={t || "all"}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() =>
                  navigate({ type: t || undefined, tech: activeTech })
                }
                className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="type-segment"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    className="absolute inset-0 rounded-full bg-background shadow-sm ring-1 ring-border"
                  />
                )}
                <span className="relative z-10">
                  {t ? formatType(t) : "All"}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {techs.length > 0 && (
        <label className="group flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-xs uppercase tracking-wide">Tech</span>
          <span className="relative">
            <select
              value={activeTech ?? ""}
              onChange={(e) =>
                navigate({
                  type: activeType,
                  tech: e.target.value || undefined,
                })
              }
              className="cursor-pointer appearance-none rounded-full border border-border bg-transparent py-1.5 pl-4 pr-9 text-sm text-foreground outline-none transition-colors hover:border-accent focus:border-accent"
            >
              <option value="">All</option>
              {techs.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-hover:text-foreground"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </label>
      )}
    </div>
  );
}
