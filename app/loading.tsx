import Skeleton from "@/components/Skeleton";

export default function HomeLoading() {
  return (
    <main>
      <section className="mx-auto w-full max-w-5xl px-4 py-24">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-4 h-12 w-3/4" />
        <Skeleton className="mt-3 h-12 w-1/2" />
        <Skeleton className="mt-6 h-4 w-full max-w-xl" />
        <Skeleton className="mt-2 h-4 w-2/3 max-w-md" />
        <div className="mt-8 flex gap-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-28" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16">
        <Skeleton className="h-7 w-48" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-border"
            >
              <Skeleton className="aspect-[16/10] rounded-none" />
              <div className="p-4">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="mt-3 h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
