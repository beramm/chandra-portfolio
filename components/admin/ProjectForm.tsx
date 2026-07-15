"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Project } from "@/lib/db";
import TechStackInput from "@/components/admin/TechStackInput";

const SEED_TYPES = ["website", "ml-deep-learning", "ai", "app-development"];

type Props = {
  project?: Project;
  existingTypes?: string[];
  existingTech?: string[];
};

export default function ProjectForm({
  project,
  existingTypes = [],
  existingTech = [],
}: Props) {
  const router = useRouter();
  const isEdit = Boolean(project);

  const [name, setName] = useState(project?.name ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [type, setType] = useState(project?.type ?? "");
  const [customType, setCustomType] = useState("");
  const [techStack, setTechStack] = useState<string[]>(
    project?.tech_stack ?? [],
  );
  const [githubUrl, setGithubUrl] = useState(project?.github_url ?? "");
  const [liveUrl, setLiveUrl] = useState(project?.live_url ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(
    project?.cover_image_url ?? "",
  );
  const [galleryImages, setGalleryImages] = useState<string[]>(
    project?.gallery_images ?? [],
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const typeChips = Array.from(new Set([...SEED_TYPES, ...existingTypes]));
  const effectiveType = customType.trim() || type;

  async function uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error ?? "Upload failed");
    return body.url;
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      setCoverImageUrl(await uploadFile(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    e.target.value = "";
    setError(null);
    setUploading(true);
    try {
      for (const file of files) {
        const url = await uploadFile(file);
        setGalleryImages((prev) =>
          prev.includes(url) ? prev : [...prev, url],
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function removeGalleryImage(url: string) {
    setGalleryImages((prev) => prev.filter((u) => u !== url));
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
        tech_stack: techStack,
        cover_image_url: coverImageUrl,
        gallery_images: galleryImages,
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
    "mt-1 w-full rounded border border-border bg-card px-3 py-2 text-foreground outline-none focus:border-accent";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm text-muted-foreground">
        Name *
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="block text-sm text-muted-foreground">
        Description *
        <textarea
          required
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
        />
      </label>

      <fieldset className="text-sm text-muted-foreground">
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
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                effectiveType === t
                  ? "border-accent bg-accent text-on-accent"
                  : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
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

      <fieldset className="text-sm text-muted-foreground">
        <legend>Tech stack</legend>
        <TechStackInput
          value={techStack}
          onChange={setTechStack}
          suggestions={existingTech}
        />
      </fieldset>

      <label className="block text-sm text-muted-foreground">
        Cover photo
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={handleCoverUpload}
          className="mt-1 block w-full text-sm text-muted-foreground file:mr-3 file:rounded file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-foreground"
        />
      </label>
      {coverImageUrl && (
        <Image
          src={coverImageUrl}
          alt="Cover preview"
          width={320}
          height={180}
          className="h-auto w-64 rounded border border-border object-cover"
        />
      )}

      <label className="block text-sm text-muted-foreground">
        Gallery photos (shown on the project page)
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={handleGalleryUpload}
          className="mt-1 block w-full text-sm text-muted-foreground file:mr-3 file:rounded file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-foreground"
        />
      </label>
      {galleryImages.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {galleryImages.map((url) => (
            <div key={url} className="relative">
              <Image
                src={url}
                alt=""
                width={160}
                height={90}
                className="h-20 w-32 rounded border border-border object-cover"
              />
              <button
                type="button"
                onClick={() => removeGalleryImage(url)}
                aria-label="Remove gallery image"
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-on-accent"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      {uploading && (
        <p className="text-xs text-muted-foreground">Uploading…</p>
      )}

      <label className="block text-sm text-muted-foreground">
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

      <label className="block text-sm text-muted-foreground">
        Live URL (optional)
        <input
          type="url"
          value={liveUrl ?? ""}
          onChange={(e) => setLiveUrl(e.target.value)}
          placeholder="https://example.com"
          className={inputClass}
        />
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-on-accent transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create project"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="rounded-full border border-border px-5 py-2 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
