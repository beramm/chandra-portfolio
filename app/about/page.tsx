import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "AI Engineer from Bali, Indonesia — LLM systems, deep learning, and full-stack development.",
};

const experience = [
  {
    period: "Mar 2026 — Present",
    title: "Student",
    org: "Apple Developer Academy, Bali",
    points: [
      "Selected for the highly competitive international Apple Developer Academy Bali 2026 program.",
      "Building iOS apps with Swift, SwiftUI, and Xcode through challenge-based, user-centered product development.",
      "Collaborating in cross-functional teams to design, prototype, and ship real-world mobile applications.",
    ],
  },
  {
    period: "Jun 2025 — Present",
    title: "AI Engineer",
    org: "PT. Sinergi Merah Putih, Yogyakarta",
    points: [
      "Built a real-time AI home companion on Gemini with streaming and live API integration.",
      "Cut an AI travel assistant's response latency by >50% by restructuring prompt pipelines.",
      "Solely owned an AI itinerary-generation feature, shipped in under a month; cut per-itinerary cost ~50% with Milvus vector search.",
      "Deployed AI services with FastAPI, Python, and Golang on Google Cloud Platform.",
    ],
  },
  {
    period: "Aug — Dec 2023",
    title: "Machine Learning Graduate",
    org: "Bangkit Academy (Google, Tokopedia, Gojek & Traveloka)",
    points: [
      "Specialized in the Machine Learning path; earned the TensorFlow Developer Certificate.",
      "Built a yoga AI instructor mobile app as a cross-functional capstone project.",
    ],
  },
];

const education = {
  period: "Aug 2021 — Mar 2025",
  title: "B.Sc. Informatics — GPA 3.87/4.00",
  org: "Sanata Dharma University, Yogyakarta",
  points: [
    "Thesis: comparison of CNN VGG16 and EfficientNet B7 for disease recognition in rice plant leaves.",
    "Professor's assistant for two years — taught practical sessions in Algorithms, Data Structures, and Data Analysis for 20–30 students.",
  ],
};

const highlights = [
  "1st place — IT Days Web Development Competition, Sanata Dharma University (2024)",
  "Top-10 Indonesia — IEEEXtreme 17.0, 24-hour global coding competition (2023)",
  "Certified TensorFlow Developer (DeepLearning.AI)",
];

const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "LLM Systems",
    items: [
      "Gemini API",
      "OpenAI API",
      "Prompt engineering",
      "Function calling",
      "Grounding",
      "Streaming",
      "Latency optimization",
      "Milvus vector search",
    ],
  },
  {
    label: "ML / Deep Learning",
    items: [
      "TensorFlow (certified)",
      "Computer vision",
      "NLP",
      "CNNs & sequence models",
    ],
  },
  {
    label: "Engineering",
    items: [
      "Python",
      "FastAPI",
      "Golang",
      "Next.js / React",
      "TypeScript",
      "Swift / SwiftUI",
      "PostgreSQL",
      "GCP",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16">
      <Reveal>
        <h1 className="font-heading text-3xl font-bold tracking-tight">
          About
        </h1>
        <div className="mt-6 space-y-4 leading-relaxed text-foreground/90">
          <p>
            I&apos;m Bram Raiskay Chandra, an AI Engineer based in Denpasar,
            Bali. I studied Informatics at Sanata Dharma University and now
            build AI-powered products — from real-time LLM companions on Gemini
            to deep-learning models for computer vision.
          </p>
          <p>
            At PT. Sinergi Merah Putih I design LLM workflows with function
            calling, grounding, and streaming, and deploy them on Google Cloud.
            Currently I&apos;m also at the Apple Developer Academy Bali 2026,
            exploring the intersection of AI and mobile applications.
          </p>
        </div>
      </Reveal>

      <section className="mt-14">
        <Reveal>
          <h2 className="font-heading text-2xl font-semibold">Experience</h2>
        </Reveal>
        <ol className="mt-6 space-y-8 border-l border-border pl-6">
          {experience.map((e, i) => (
            <Reveal key={e.org + e.period} delay={i * 0.08}>
              <li className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[1.85rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent"
                />
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {e.period}
                </p>
                <h3 className="mt-1 font-heading font-semibold">
                  {e.title} · {e.org}
                </h3>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <Reveal>
          <h2 className="font-heading text-2xl font-semibold">Education</h2>
          <div className="mt-6 rounded-lg border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {education.period}
            </p>
            <h3 className="mt-1 font-heading font-semibold">
              {education.title}
            </h3>
            <p className="text-sm text-muted-foreground">{education.org}</p>
            <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
              {education.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="mt-14">
        <Reveal>
          <h2 className="font-heading text-2xl font-semibold">Highlights</h2>
          <ul className="mt-6 space-y-2">
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
      </section>

      <section className="mt-14">
        <Reveal>
          <h2 className="font-heading text-2xl font-semibold">Skills</h2>
          <div className="mt-6 space-y-5">
            {skillGroups.map((g) => (
              <div key={g.label}>
                <h3 className="text-sm font-medium text-muted-foreground">
                  {g.label}
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  );
}
