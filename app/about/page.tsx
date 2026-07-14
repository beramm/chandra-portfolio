import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import {
  bio,
  education,
  experience,
  highlights,
  skillGroups,
} from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "AI Engineer from Bali, Indonesia — LLM systems, deep learning, and full-stack development.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16">
      <Reveal>
        <h1 className="font-heading text-3xl font-bold tracking-tight">
          About
        </h1>
        <div className="mt-6 space-y-4 leading-relaxed text-foreground/90">
          {bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </Reveal>

      <section className="mt-14">
        <Reveal>
          <h2 className="font-heading text-2xl font-semibold">Experience</h2>
        </Reveal>
        <ol className="mt-6 space-y-8 border-l border-border pl-6">
          {experience.map((e, i) => (
            <Reveal key={e.org + e.period} delay={i * 0.08}>
              <li className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[1.85rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent"
                />
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {e.period}
                </p>
                <h3 className="mt-1 font-heading font-semibold">
                  {e.title} · {e.org}
                </h3>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <Reveal>
          <h2 className="font-heading text-2xl font-semibold">Education</h2>
          <div className="mt-6 rounded-lg border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {education.period}
            </p>
            <h3 className="mt-1 font-heading font-semibold">
              {education.title}
            </h3>
            <p className="text-sm text-muted-foreground">{education.org}</p>
            <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
              {education.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="mt-14">
        <Reveal>
          <h2 className="font-heading text-2xl font-semibold">Highlights</h2>
          <ul className="mt-6 space-y-2">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm">
                <span aria-hidden className="mt-0.5 text-accent">
                  ★
                </span>
                <span className="text-foreground/90">{h}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mt-14">
        <Reveal>
          <h2 className="font-heading text-2xl font-semibold">Skills</h2>
          <div className="mt-6 space-y-5">
            {skillGroups.map((g) => (
              <div key={g.label}>
                <h3 className="text-sm font-medium text-muted-foreground">
                  {g.label}
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  );
}
