import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Bram Raiskay Chandra — AI Engineer";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#09090b",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#3b82f6" }}>Hi, I&apos;m</div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 12 }}>
          Bram Raiskay Chandra
        </div>
        <div style={{ fontSize: 32, color: "#a1a1aa", marginTop: 20 }}>
          AI Engineer — LLM systems, deep learning, full-stack apps
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 48,
            fontSize: 22,
            color: "#a1a1aa",
          }}
        >
          <div style={{ border: "1px solid #27272a", borderRadius: 999, padding: "8px 20px" }}>
            Gemini API
          </div>
          <div style={{ border: "1px solid #27272a", borderRadius: 999, padding: "8px 20px" }}>
            TensorFlow
          </div>
          <div style={{ border: "1px solid #27272a", borderRadius: 999, padding: "8px 20px" }}>
            Next.js
          </div>
          <div style={{ border: "1px solid #27272a", borderRadius: 999, padding: "8px 20px" }}>
            GCP
          </div>
        </div>
      </div>
    ),
    size,
  );
}
