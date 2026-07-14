"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Project } from "@/lib/db";

const SEED_TYPES = ["website", "ml-deep-learning", "ai", "app-development"];

type Props = {
  project?: Project;
  existingTypes?: string[];
};

export default function ProjectForm({ project, existingTypes = [] }: Props) {
  const router = useRouter();
  const isEdit = Boolean(project);

  const [name, setName] = useState(project?.name ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [type, setType] = useState(project?.type ?? "");
  const [customType, setCustomType] = useState("");
  const [githubUrl, setGithubUrl] = useState(project?.github_url ?? "");
  const [liveUrl, setLiveUrl] = useState(project?.live_url ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(
    project?.cover_image_url ?? "",
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const typeChips = Array.from(new Set([...SEED_TYPES, ...existingTypes]));
  const effectiveType = customType.trim() || type;

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Upload failed");
      setCoverImageUrl(body.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!effectiveType) {
      setError("Pick a type or enter a custom one");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name,
        description,
        type: effectiveType,
        cover_image_url: coverImageUrl,
        github_url: githubUrl,
        live_url: liveUrl || null,
      };
      const res = await fetch(
        isEdit ? `/api/projects/${project!.id}` : "/api/projects",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Save failed");
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "mt-1 w-full rounded border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100 outline-none focus:border-neutral-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm text-neutral-400">
        Name *
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="block text-sm text-neutral-400">
        Description *
        <textarea
          required
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
        />
      </label>

      <fieldset className="text-sm text-neutral-400">
        <legend>Type *</legend>
        <div className="mt-1 flex flex-wrap gap-2">
          {typeChips.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setType(t);
                setCustomType("");
              }}
              className={`rounded-full border px-3 py-1 text-xs ${
                effectiveType === t
                  ? "border-neutral-100 bg-neutral-100 text-neutral-900"
                  : "border-neutral-700 text-neutral-300 hover:border-neutral-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <input
          value={customType}
          onChange={(e) => setCustomType(e.target.value)}
          placeholder="or type a custom type"
          className={inputClass}
        />
      </fieldset>

      <label className="block text-sm text-neutral-400">
        Cover photo
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={handleUpload}
          className="mt-1 block w-full text-sm text-neutral-400 file:mr-3 file:rounded file:border-0 file:bg-neutral-800 file:px-3 file:py-1.5 file:text-neutral-200"
        />
      </label>
      {uploading && <p className="text-xs text-neutral-500">Uploading…</p>}
      {coverImageUrl && (
        <Image
          src={coverImageUrl}
          alt="Cover preview"
          width={320}
          height={180}
          className="h-auto w-64 rounded border border-neutral-800 object-cover"
        />
      )}

      <label className="block text-sm text-neutral-400">
        GitHub URL *
        <input
          type="url"
          required
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          placeholder="https://github.com/you/repo"
          className={inputClass}
        />
      </label>

      <label className="block text-sm text-neutral-400">
        Live URL (optional)
        <input
          type="url"
          value={liveUrl ?? ""}
          onChange={(e) => setLiveUrl(e.target.value)}
          placeholder="https://example.com"
          className={inputClass}
        />
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="rounded bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-white disabled:opacity-50"
        >
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create project"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="rounded border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:border-neutral-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
