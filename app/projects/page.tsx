import type { Metadata } from "next";
import { getProjectsFiltered, getProjectTypes, getTechStacks } from "@/lib/db";
import { formatType } from "@/lib/format";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilters from "@/components/ProjectFilters";
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
  searchParams: Promise<{ type?: string; tech?: string }>;
}) {
  const { type, tech } = await searchParams;
  const [types, techs, projects] = await Promise.all([
    getProjectTypes(),
    getTechStacks(),
    getProjectsFiltered(type, tech),
  ]);

  const activeFilters = [
    type && `type "${formatType(type)}"`,
    tech && `tech "${tech}"`,
  ]
    .filter(Boolean)
    .join(" and ");

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

      {(types.length > 0 || techs.length > 0) && (
        <Reveal delay={0.05}>
          <div className="mt-8">
            <ProjectFilters
              types={types}
              techs={techs}
              activeType={type}
              activeTech={tech}
            />
          </div>
        </Reveal>
      )}

      {projects.length === 0 ? (
        <Reveal delay={0.1}>
          <p className="mt-10 text-sm text-muted-foreground">
            {activeFilters
              ? `No projects match ${activeFilters}.`
              : "No projects yet."}
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
