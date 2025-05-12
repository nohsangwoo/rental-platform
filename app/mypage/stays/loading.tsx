import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="w-full max-w-5xl">
      <Skeleton className="h-8 w-48 mb-6" />

      <div className="border-b mb-8">
        <div className="flex space-x-8 pb-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      {/* Current stays section */}
      <div className="mb-12">
        <Skeleton className="h-6 w-32 mb-4" />
        <Skeleton className="h-[200px] w-full rounded-lg" />
      </div>

      {/* Upcoming stays section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>

        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden mb-4">
            <div className="flex">
              <div className="w-1/4">
                <Skeleton className="aspect-square w-full" />
              </div>
              <div className="flex-1 p-4">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-2" />
                <div className="flex items-center mt-3">
                  <Skeleton className="w-6 h-6 rounded-full mr-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="w-1/4 p-4">
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Past stays section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>

        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden mb-4">
            <div className="flex">
              <div className="w-1/4">
                <Skeleton className="aspect-square w-full" />
              </div>
              <div className="flex-1 p-4">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-2" />
                <div className="flex items-center mt-3">
                  <Skeleton className="w-6 h-6 rounded-full mr-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="w-1/4 p-4">
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
