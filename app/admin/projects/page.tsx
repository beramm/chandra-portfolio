import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/lib/db";
import { formatType } from "@/lib/format";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";
import LogoutButton from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold tracking-tight">
          Projects
        </h1>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-on-accent transition-colors hover:opacity-90"
          >
            New project
          </Link>
          <LogoutButton />
        </div>
      </div>

      {projects.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          No projects yet. Create your first one.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
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
                <div className="h-10 w-16 rounded bg-muted" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{p.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {formatType(p.type)} · /{p.slug}
                </p>
              </div>
              <Link
                href={`/admin/projects/${p.id}/edit`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
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
