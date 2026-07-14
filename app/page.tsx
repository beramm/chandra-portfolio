import Link from "next/link";
import { getFeaturedProjects } from "@/lib/db";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/motion/Reveal";

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
  const featured = await getFeaturedProjects(3);

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
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        )}
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
