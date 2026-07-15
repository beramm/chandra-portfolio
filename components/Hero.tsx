"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero({ cvUrl }: { cvUrl?: string | null }) {
  const reduced = useReducedMotion();

  return (
    <motion.section
      variants={reduced ? undefined : container}
      initial="hidden"
      animate="show"
      className="mx-auto w-full max-w-5xl px-4 pb-16 pt-24 sm:pt-32"
    >
      <motion.p variants={item} className="text-sm text-accent">
        Hi, I&apos;m
      </motion.p>
      <motion.h1
        variants={item}
        className="mt-2 font-heading text-4xl font-bold tracking-tight sm:text-6xl"
      >
        Bram Raiskay Chandra
      </motion.h1>
      <motion.p
        variants={item}
        className="mt-4 max-w-xl text-lg text-muted-foreground"
      >
        AI Engineer building LLM-powered products — real-time Gemini systems,
        deep learning for computer vision, and full-stack apps on Google Cloud.
      </motion.p>
      <motion.div variants={item} className="mt-8 flex gap-3">
        <Link
          href="/projects"
          className="rounded bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
        >
          View projects
        </Link>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="rounded border border-border px-5 py-2.5 text-sm transition-colors hover:border-accent"
        >
          Contact
        </a>
        {cvUrl && (
          <a
            href={`${cvUrl}?download=1`}
            className="rounded border border-border px-5 py-2.5 text-sm transition-colors hover:border-accent"
          >
            Download CV
          </a>
        )}
      </motion.div>
    </motion.section>
  );
}
