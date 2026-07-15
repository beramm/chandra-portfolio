import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/db";
import { formatType } from "@/lib/format";

export default function ProjectCard({
  project,
  eager = false,
}: {
  project: Project;
  eager?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      draggable={false}
      className="group overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-accent"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={project.name}
            fill
            priority={eager}
            draggable={false}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-heading text-3xl text-muted-foreground">
            {project.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate font-heading font-semibold">
            {project.name}
          </h3>
          <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {formatType(project.type)}
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {project.description}
        </p>
        {project.tech_stack.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tech_stack.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
            {project.tech_stack.length > 4 && (
              <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                +{project.tech_stack.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
