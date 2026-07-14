import Link from "next/link";
import { getFeaturedProjects } from "@/lib/db";
import Hero from "@/components/Hero";
import ProjectCarousel from "@/components/ProjectCarousel";
import Reveal from "@/components/motion/Reveal";
import { bio, experience, highlights } from "@/content/about";

export const revalidate = 3600;

const skills = [
  "Gemini API",
  "LLM Workflows",
  "TensorFlow",
  "Deep Learning",
  "Python",
  "FastAPI",
  "Golang",
  "Next.js",
  "Swift / SwiftUI",
  "PostgreSQL",
  "GCP",
];

export default async function HomePage() {
  const featured = await getFeaturedProjects(8);

  return (
    <main>
      <Hero />

      <section className="mx-auto w-full max-w-5xl px-4 py-16">
        <Reveal>
          <div className="flex items-end justify-between">
            <h2 className="font-heading text-2xl font-semibold">
              Featured projects
            </h2>
            <Link
              href="/projects"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              View all →
            </Link>
          </div>
        </Reveal>
        {featured.length === 0 ? (
          <Reveal delay={0.1}>
            <p className="mt-6 text-sm text-muted-foreground">
              Projects coming soon.
            </p>
          </Reveal>
        ) : (
          <Reveal delay={0.1} className="mt-6">
            <ProjectCarousel projects={featured} />
          </Reveal>
        )}
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16">
        <Reveal>
          <div className="flex items-end justify-between">
            <h2 className="font-heading text-2xl font-semibold">About me</h2>
            <Link
              href="/about"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Full profile →
            </Link>
          </div>
          <p className="mt-4 max-w-2xl leading-relaxed text-foreground/90">
            {bio[0]}
          </p>
        </Reveal>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Reveal delay={0.05}>
            <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Experience
            </h3>
            <ol className="mt-4 space-y-4 border-l border-border pl-5">
              {experience.map((e) => (
                <li key={e.org + e.period} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[1.6rem] top-1.5 h-2 w-2 rounded-full bg-accent"
                  />
                  <p className="text-xs text-muted-foreground">{e.period}</p>
                  <p className="mt-0.5 text-sm font-medium">
                    {e.title} · {e.org}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Highlights
            </h3>
            <ul className="mt-4 space-y-2">
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
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16">
        <Reveal>
          <h2 className="font-heading text-2xl font-semibold">Stack</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mt-6 flex flex-wrap gap-2">
            {skills.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section id="contact" className="mx-auto w-full max-w-5xl px-4 py-16">
        <Reveal>
          <h2 className="font-heading text-2xl font-semibold">Get in touch</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Have a project in mind or just want to say hi? My inbox is open.
          </p>
          <a
            href="mailto:bramraysky232@gmail.com"
            className="mt-6 inline-block rounded bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
          >
            Say hello
          </a>
        </Reveal>
      </section>
    </main>
  );
}
