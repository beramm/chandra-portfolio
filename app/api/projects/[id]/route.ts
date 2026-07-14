import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteProject, getProjectById, updateProject } from "@/lib/db";
import { uniqueSlug } from "@/lib/slug";
import { parseProjectInput } from "@/lib/validate";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const { id } = await params;

  const existing = await getProjectById(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = parseProjectInput(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const slug = await uniqueSlug(parsed.data.name, existing.slug);
  const project = await updateProject(id, { ...parsed.data, slug });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${existing.slug}`);
  if (project && project.slug !== existing.slug) {
    revalidatePath(`/projects/${project.slug}`);
  }

  return NextResponse.json(project);
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;

  const existing = await getProjectById(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await deleteProject(id);

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${existing.slug}`);

  return NextResponse.json({ ok: true });
}
