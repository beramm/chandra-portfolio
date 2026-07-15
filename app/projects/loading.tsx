import Skeleton from "@/components/Skeleton";

export default function ProjectsLoading() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <Skeleton className="h-9 w-44" />
      <Skeleton className="mt-3 h-4 w-64" />

      <div className="mt-8 flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-20 rounded-full" />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-16 rounded-full" />
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-border"
          >
            <Skeleton className="aspect-[16/10] rounded-none" />
            <div className="p-4">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
