import type { Metadata } from "next";
import Link from "next/link";
import { getProjects, getProjectsByType, getProjectTypes } from "@/lib/db";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/motion/Reveal";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "All projects — websites, machine learning, AI, and app development.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const [types, projects] = await Promise.all([
    getProjectTypes(),
    type ? getProjectsByType(type) : getProjects(),
  ]);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <Reveal>
        <h1 className="font-heading text-3xl font-bold tracking-tight">
          Projects
        </h1>
        <p className="mt-2 text-muted-foreground">
          Everything I&apos;ve built and shipped.
        </p>
      </Reveal>

      {types.length > 0 && (
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap gap-2">
            <FilterChip href="/projects" label="all" active={!type} />
            {types.map((t) => (
              <FilterChip
                key={t}
                href={`/projects?type=${encodeURIComponent(t)}`}
                label={t}
                active={type === t}
              />
            ))}
          </div>
        </Reveal>
      )}

      {projects.length === 0 ? (
        <Reveal delay={0.1}>
          <p className="mt-10 text-sm text-muted-foreground">
            {type ? `No projects of type "${type}".` : "No projects yet."}
          </p>
        </Reveal>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i, 5) * 0.08}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      )}
    </main>
  );
}

function FilterChip({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-3 py-1 text-sm transition-colors ${
        active
          ? "border-accent bg-accent text-on-accent"
          : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
      }`}
    >
      {label}
    </Link>
  );
}
