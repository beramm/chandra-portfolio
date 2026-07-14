import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/lib/db";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";
import LogoutButton from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl bg-neutral-950 px-4 py-8 text-neutral-100">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Projects</h1>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="rounded bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-900 hover:bg-white"
          >
            New project
          </Link>
          <LogoutButton />
        </div>
      </div>

      {projects.length === 0 ? (
        <p className="mt-8 text-sm text-neutral-500">
          No projects yet. Create your first one.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-neutral-800 rounded-lg border border-neutral-800">
          {projects.map((p) => (
            <li key={p.id} className="flex items-center gap-4 p-4">
              {p.cover_image_url ? (
                <Image
                  src={p.cover_image_url}
                  alt=""
                  width={64}
                  height={40}
                  className="h-10 w-16 rounded object-cover"
                />
              ) : (
                <div className="h-10 w-16 rounded bg-neutral-800" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{p.name}</p>
                <p className="truncate text-xs text-neutral-500">
                  {p.type} · /{p.slug}
                </p>
              </div>
              <Link
                href={`/admin/projects/${p.id}/edit`}
                className="text-sm text-neutral-400 hover:text-neutral-100"
              >
                Edit
              </Link>
              <DeleteProjectButton id={p.id} name={p.name} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
