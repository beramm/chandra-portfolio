import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createProject, getProjects } from "@/lib/db";
import { uniqueSlug } from "@/lib/slug";
import { parseProjectInput } from "@/lib/validate";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
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

  const slug = await uniqueSlug(parsed.data.name);
  const project = await createProject({ ...parsed.data, slug });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);

  return NextResponse.json(project, { status: 201 });
}
