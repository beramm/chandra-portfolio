import { notFound } from "next/navigation";
import { getProjectById, getProjectTypes } from "@/lib/db";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, existingTypes] = await Promise.all([
    getProjectById(id),
    getProjectTypes(),
  ]);

  if (!project) notFound();

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl bg-neutral-950 px-4 py-8 text-neutral-100">
      <h1 className="text-xl font-semibold">Edit project</h1>
      <div className="mt-6">
        <ProjectForm project={project} existingTypes={existingTypes} />
      </div>
    </main>
  );
}
