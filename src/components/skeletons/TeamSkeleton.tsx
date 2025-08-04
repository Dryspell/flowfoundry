import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function TeamSkeleton() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <div className="h-8 w-64 mx-auto mb-4 animate-pulse rounded bg-muted" />
        <div className="space-y-2">
          <div className="h-6 w-96 mx-auto animate-pulse rounded bg-muted" />
          <div className="h-6 w-80 mx-auto animate-pulse rounded bg-muted" />
        </div>
      </div>

      {/* Expertise Filter Skeleton */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-32 animate-pulse rounded bg-muted" />
        ))}
      </div>

      {/* Team Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="h-full">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-32 w-32 animate-pulse rounded-full bg-muted" />
              <div className="h-6 w-24 mx-auto animate-pulse rounded bg-muted mb-2" />
              <div className="h-5 w-32 mx-auto animate-pulse rounded bg-muted" />
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              </div>

              <div className="flex flex-wrap gap-1">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-6 w-16 animate-pulse rounded bg-muted" />
                ))}
              </div>

              <div>
                <div className="h-4 w-24 animate-pulse rounded bg-muted mb-2" />
                <div className="space-y-1">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="h-3 w-full animate-pulse rounded bg-muted" />
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <div className="h-8 w-8 animate-pulse rounded bg-muted" />
                <div className="h-8 w-8 animate-pulse rounded bg-muted" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}