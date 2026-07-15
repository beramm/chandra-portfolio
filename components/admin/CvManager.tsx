"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Cv } from "@/lib/db";

export default function CvManager({ cvs }: { cvs: Cv[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setError(null);
    setBusy(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      // First CV becomes active automatically.
      formData.append("active", String(cvs.length === 0));
      const res = await fetch("/api/cv", { method: "POST", body: formData });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Upload failed");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function makeActive(id: string) {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/cv/${id}`, { method: "PUT" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to set active CV");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(cv: Cv) {
    if (!confirm(`Delete "${cv.filename}"? This cannot be undone.`)) return;
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/cv/${cv.id}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to delete CV");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm text-muted-foreground">
        Upload CV (PDF, max 10 MB)
        <input
          type="file"
          accept="application/pdf"
          disabled={busy}
          onChange={handleUpload}
          className="mt-1 block w-full text-sm text-muted-foreground file:mr-3 file:rounded file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-foreground"
        />
      </label>

      {busy && <p className="text-xs text-muted-foreground">Working…</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {cvs.length === 0 ? (
        <p className="text-sm text-muted-foreground">No CVs uploaded yet.</p>
      ) : (
        <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
          {cvs.map((cv) => (
            <li key={cv.id} className="flex items-center gap-4 p-4">
              <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="active-cv"
                  checked={cv.is_active}
                  disabled={busy}
                  onChange={() => makeActive(cv.id)}
                  className="accent-[var(--accent)]"
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">
                    {cv.filename}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {new Date(cv.created_at).toLocaleDateString()}
                    {cv.is_active && " · shown on site"}
                  </span>
                </span>
              </label>
              <a
                href={cv.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                View
              </a>
              <button
                type="button"
                disabled={busy}
                onClick={() => handleDelete(cv)}
                className="text-sm text-red-500 transition-colors hover:text-red-400 disabled:opacity-50"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
