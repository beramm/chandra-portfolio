import Skeleton from "@/components/Skeleton";

export default function ProjectDetailLoading() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16">
      <Skeleton className="h-4 w-24" />
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="mt-3 h-4 w-32" />
      <div className="mt-4 flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-16 rounded-full" />
        ))}
      </div>

      <Skeleton className="mt-8 aspect-[16/9] rounded-lg" />

      <div className="mt-8 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="mt-10 flex gap-3">
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-28" />
      </div>
    </main>
  );
}
