export const bio = [
  "I'm Bram Raiskay Chandra, an AI Engineer based in Denpasar, Bali. I studied Informatics at Sanata Dharma University and now build AI-powered products — from real-time LLM companions on Gemini to deep-learning models for computer vision.",
  "At PT. Sinergi Merah Putih I design LLM workflows with function calling, grounding, and streaming, and deploy them on Google Cloud. Currently I'm also at the Apple Developer Academy Bali 2026, exploring the intersection of AI and mobile applications.",
];

export const experience = [
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

export const education = {
  period: "Aug 2021 — Mar 2025",
  title: "B.Sc. Informatics — GPA 3.87/4.00",
  org: "Sanata Dharma University, Yogyakarta",
  points: [
    "Thesis: comparison of CNN VGG16 and EfficientNet B7 for disease recognition in rice plant leaves.",
    "Professor's assistant for two years — taught practical sessions in Algorithms, Data Structures, and Data Analysis for 20–30 students.",
  ],
};

export const highlights = [
  "1st place — IT Days Web Development Competition, Sanata Dharma University (2024)",
  "Top-10 Indonesia — IEEEXtreme 17.0, 24-hour global coding competition (2023)",
  "Certified TensorFlow Developer (DeepLearning.AI)",
];

export const skillGroups: { label: string; items: string[] }[] = [
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
