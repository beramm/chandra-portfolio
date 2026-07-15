import { notFound } from "next/navigation";
import { getProjectById, getProjectTypes, getTechStacks } from "@/lib/db";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, existingTypes, existingTech] = await Promise.all([
    getProjectById(id),
    getProjectTypes(),
    getTechStacks(),
  ]);

  if (!project) notFound();

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold tracking-tight">
        Edit project
      </h1>
      <div className="mt-8">
        <ProjectForm
          project={project}
          existingTypes={existingTypes}
          existingTech={existingTech}
        />
      </div>
    </main>
  );
}
