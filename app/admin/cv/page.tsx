import Link from "next/link";
import { getCvs } from "@/lib/db";
import CvManager from "@/components/admin/CvManager";

export const dynamic = "force-dynamic";

export default async function AdminCvPage() {
  const cvs = await getCvs();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16">
      <Link
        href="/admin/projects"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Projects
      </Link>
      <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight">
        CV
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Upload CVs and pick which one the public download button serves.
      </p>
      <div className="mt-8">
        <CvManager cvs={cvs} />
      </div>
    </main>
  );
}
