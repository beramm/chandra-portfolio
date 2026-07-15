"use client";

import { useState } from "react";

const SEED_TECH = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Python",
  "PyTorch",
];

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
  suggestions?: string[];
};

export default function TechStackInput({
  value,
  onChange,
  suggestions = [],
}: Props) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const [custom, setCustom] = useState<string[]>([]);

  const options = Array.from(new Set([...SEED_TECH, ...suggestions, ...custom]));

  function toggle(tech: string) {
    if (value.includes(tech)) {
      onChange(value.filter((t) => t !== tech));
    } else {
      onChange([...value, tech]);
    }
  }

  function commitDraft() {
    const t = draft.trim();
    setDraft("");
    setAdding(false);
    if (!t) return;
    const existing = options.find(
      (o) => o.toLowerCase() === t.toLowerCase(),
    );
    const tech = existing ?? t;
    if (!existing) setCustom((c) => [...c, tech]);
    if (!value.includes(tech)) onChange([...value, tech]);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      commitDraft();
    } else if (e.key === "Escape") {
      setDraft("");
      setAdding(false);
    }
  }

  return (
    <div>
      <div className="mt-1 flex flex-wrap gap-2">
        {options.map((t) => {
          const selected = value.includes(t);
          return (
            <button
              key={t}
              type="button"
              onClick={() => toggle(t)}
              aria-pressed={selected}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                selected
                  ? "border-accent bg-accent text-on-accent"
                  : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
              }`}
            >
              {t}
            </button>
          );
        })}
        {!adding && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="rounded-full border border-dashed border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
          >
            + add new
          </button>
        )}
      </div>
      {adding && (
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitDraft}
          placeholder="new tech name, press Enter"
          className="mt-2 w-full rounded border border-border bg-card px-3 py-2 text-foreground outline-none focus:border-accent"
        />
      )}
    </div>
  );
}
