import { getProjectTypes, getTechStacks } from "@/lib/db";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const [existingTypes, existingTech] = await Promise.all([
    getProjectTypes(),
    getTechStacks(),
  ]);

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold tracking-tight">
        New project
      </h1>
      <div className="mt-8">
        <ProjectForm existingTypes={existingTypes} existingTech={existingTech} />
      </div>
    </main>
  );
}
