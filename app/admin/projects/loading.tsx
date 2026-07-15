import Skeleton from "@/components/Skeleton";

export default function AdminProjectsLoading() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-40" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-28 rounded-full" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>

      <ul className="mt-8 divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="flex items-center gap-4 p-4">
            <Skeleton className="h-10 w-16" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-12" />
          </li>
        ))}
      </ul>
    </main>
  );
}
