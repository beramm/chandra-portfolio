import type { Project } from "@/lib/db";
import ProjectCard from "@/components/ProjectCard";

/**
 * Infinite auto-scrolling marquee of project cards. Pure CSS animation —
 * pauses on hover/focus, effectively static under prefers-reduced-motion
 * (global reduced-motion rule collapses the animation).
 */
export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  // Track is duplicated so translateX(-50%) loops seamlessly.
  return (
    <div className="marquee overflow-hidden" role="region" aria-label="Projects carousel">
      <div className="marquee-track flex w-max gap-6 pr-6">
        {projects.map((p) => (
          <div key={p.id} className="w-80 shrink-0">
            <ProjectCard project={p} />
          </div>
        ))}
        {projects.map((p) => (
          <div key={`dup-${p.id}`} className="w-80 shrink-0" aria-hidden>
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
