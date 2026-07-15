"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import type { Project } from "@/lib/db";
import ProjectCard from "@/components/ProjectCard";

// px/s of auto-scroll; direction is rightward to match the old CSS marquee.
const SPEED = 40;
// Seconds for release momentum to relax back to the base speed.
const FRICTION_TAU = 0.9;
const MAX_FLING = 2500;

/**
 * Infinite auto-scrolling marquee of project cards, draggable with the
 * cursor. Track is duplicated so wrapping x within one half loops
 * seamlessly. Releasing a drag keeps the fling velocity and eases it
 * back to the base auto-scroll; disabled under prefers-reduced-motion
 * (drag still works, without inertia).
 */
export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const velocity = useRef(SPEED);
  const reduced = useReducedMotion();

  // Wrap into [-half, 0) so the duplicated halves swap invisibly.
  function wrap(v: number) {
    const track = trackRef.current;
    if (!track) return v;
    const half = track.scrollWidth / 2;
    if (half <= 0) return v;
    return ((v % half) + half) % half - half;
  }

  useAnimationFrame((_, delta) => {
    if (dragging.current || reduced) return;
    const dt = delta / 1000;
    // Exponential decay of the fling toward the base speed.
    const blend = 1 - Math.exp(-dt / FRICTION_TAU);
    velocity.current += (SPEED - velocity.current) * blend;
    x.set(wrap(x.get() + dt * velocity.current));
  });

  if (projects.length === 0) return null;

  return (
    <div className="overflow-hidden" role="region" aria-label="Projects carousel">
      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={{ left: -Infinity, right: Infinity }}
        dragMomentum={false}
        onDragStart={() => (dragging.current = true)}
        onDragEnd={(_, info) => {
          x.set(wrap(x.get()));
          velocity.current = Math.max(
            -MAX_FLING,
            Math.min(MAX_FLING, info.velocity.x),
          );
          // Let the click-suppression below run before re-enabling.
          setTimeout(() => (dragging.current = false), 0);
        }}
        onClickCapture={(e) => {
          if (dragging.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        style={{ x }}
        className="flex w-max cursor-grab select-none gap-6 pr-6 active:cursor-grabbing"
      >
        {projects.map((p, i) => (
          <div key={p.id} className="w-80 shrink-0">
            <ProjectCard project={p} eager={i < 3} />
          </div>
        ))}
        {projects.map((p, i) => (
          <div key={`dup-${p.id}`} className="w-80 shrink-0" aria-hidden>
            <ProjectCard project={p} eager={i < 3} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
