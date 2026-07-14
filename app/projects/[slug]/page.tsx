import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/db";
import Reveal from "@/components/motion/Reveal";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description: project.description.slice(0, 160),
    openGraph: project.cover_image_url
      ? { images: [{ url: project.cover_image_url }] }
      : undefined,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const created = new Date(project.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16">
      <Reveal>
        <Link
          href="/projects"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← All projects
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {project.name}
          </h1>
          <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
            {project.type}
          </span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{created}</p>
      </Reveal>

      {project.cover_image_url && (
        <Reveal delay={0.1}>
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg border border-border bg-muted">
            <Image
              src={project.cover_image_url}
              alt={project.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        </Reveal>
      )}

      <Reveal delay={0.15}>
        <div className="mt-8 whitespace-pre-line leading-relaxed text-foreground/90">
          {project.description}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={project.github_url}
            target="_blank"
            rel="noreferrer"
            className="rounded bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
          >
            View on GitHub
          </a>
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-border px-5 py-2.5 text-sm transition-colors hover:border-accent"
            >
              Live site ↗
            </a>
          )}
        </div>
      </Reveal>
    </main>
  );
}
