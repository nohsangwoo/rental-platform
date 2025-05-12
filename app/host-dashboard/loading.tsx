import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-8">
      {/* Greeting section */}
      <div>
        <Skeleton className="h-10 w-64" />
      </div>

      {/* Contract management section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-9 w-32" />
        </div>

        <div className="mb-4">
          <Skeleton className="h-10 w-full" />
        </div>

        <Skeleton className="h-4 w-full max-w-md mb-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </section>

      {/* Settlement section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-5 w-36" />
        </div>

        <Skeleton className="h-48 w-full rounded-lg" />
      </section>

      {/* Usage guide section */}
      <section>
        <Skeleton className="h-8 w-40 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((index) => (
            <Skeleton key={index} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </section>
    </div>
  )
}
