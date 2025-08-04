import { Card, CardContent } from '@/components/ui/card'

export function MissionSkeleton() {
  return (
    <section className="py-16">
      {/* Mission & Vision Skeleton */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i}>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 animate-pulse rounded bg-muted" />
              <div className="h-6 w-24 animate-pulse rounded bg-muted" />
            </div>
            <div className="h-8 w-64 animate-pulse rounded bg-muted mb-4" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>

      {/* Company Story Skeleton */}
      <div className="mb-16">
        <div className="h-8 w-32 mx-auto animate-pulse rounded bg-muted mb-6" />
        <div className="max-w-4xl mx-auto space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>

      {/* Values Skeleton */}
      <div className="mb-16">
        <div className="h-8 w-40 mx-auto animate-pulse rounded bg-muted mb-8" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="text-center p-6">
              <CardContent className="p-0">
                <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-lg bg-muted" />
                <div className="h-5 w-20 mx-auto animate-pulse rounded bg-muted mb-2" />
                <div className="space-y-1">
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-5/6 mx-auto animate-pulse rounded bg-muted" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements Skeleton */}
      <div>
        <div className="h-8 w-40 mx-auto animate-pulse rounded bg-muted mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto mb-2 h-12 w-12 animate-pulse rounded-lg bg-muted" />
              <div className="h-8 w-16 mx-auto animate-pulse rounded bg-muted mb-1" />
              <div className="h-4 w-20 mx-auto animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}