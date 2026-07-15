"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTO_ADVANCE_MS = 5000;

type Props = {
  images: string[];
  alt: string;
};

export default function ImageCarousel({ images, alt }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const [index, setIndex] = useState(0);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(i, track.children.length - 1));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
  }, []);

  // Auto-advance; the interval restarts whenever the index changes (manual
  // or automatic), so interacting always grants a fresh interval.
  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      if (hovering.current) return;
      const track = trackRef.current;
      if (!track) return;
      const next = (Math.round(track.scrollLeft / track.clientWidth) + 1) %
        images.length;
      track.scrollTo({
        left: next * track.clientWidth,
        behavior: "smooth",
      });
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [images.length, index]);

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  }

  if (images.length === 0) return null;

  return (
    <div
      className="group relative"
      onPointerEnter={() => (hovering.current = true)}
      onPointerLeave={() => (hovering.current = false)}
    >
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-lg border border-border bg-muted [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-roledescription="carousel"
        aria-label={`${alt} images`}
      >
        {images.map((url, i) => (
          <div
            key={url}
            className="relative aspect-[16/9] w-full shrink-0 snap-start"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${images.length}`}
          >
            <Image
              src={url}
              alt={`${alt} screenshot ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground opacity-0 shadow transition-opacity hover:bg-background focus-visible:opacity-100 disabled:hidden group-hover:opacity-100"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => scrollTo(index + 1)}
            disabled={index === images.length - 1}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground opacity-0 shadow transition-opacity hover:bg-background focus-visible:opacity-100 disabled:hidden group-hover:opacity-100"
          >
            <ChevronRight />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((url, i) => (
              <button
                key={url}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-accent" : "w-1.5 bg-background/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
