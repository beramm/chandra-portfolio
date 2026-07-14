import { getProjectTypes } from "@/lib/db";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const existingTypes = await getProjectTypes();

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl bg-neutral-950 px-4 py-8 text-neutral-100">
      <h1 className="text-xl font-semibold">New project</h1>
      <div className="mt-6">
        <ProjectForm existingTypes={existingTypes} />
      </div>
    </main>
  );
}
