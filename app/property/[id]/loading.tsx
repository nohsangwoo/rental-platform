import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="min-h-screen bg-white">
      {/* Image Gallery Skeleton */}
      <section className="bg-gray-100 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="flex-shrink-0 w-72 h-48 rounded-lg" />
            ))}
          </div>
        </div>
      </section>

      {/* Property Information Skeleton */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-3/4 mb-4" />

          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            {/* Right Column */}
            <div className="border rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-5 w-12" />
              </div>

              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-[240px] w-full mb-6" />

              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-12 w-full mb-6" />

              <Skeleton className="h-12 w-full mb-4" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Skeleton */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-64 mb-6" />
          <Skeleton className="h-[300px] w-full mb-4" />
          <Skeleton className="h-5 w-72 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </section>

      {/* Contract Information Skeleton */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-5 w-40" />
          </div>

          <div className="border-b pb-6 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-5 w-24 mx-auto mb-2" />
                  <Skeleton className="h-6 w-20 mx-auto" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-6 w-40 mb-4" />
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
          </div>

          <Skeleton className="h-6 w-40 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>

          <Skeleton className="h-6 w-40 mb-4" />
          <div className="space-y-2 mb-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
          <Skeleton className="h-12 w-full" />
        </div>
      </section>
    </main>
  )
}
