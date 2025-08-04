import { Card } from "@/components/ui/card"

export function HeroSkeleton() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/50 py-20 sm:py-32">
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge skeleton */}
          <div className="mb-6 mx-auto h-6 w-64 animate-pulse rounded-full bg-muted" />

          {/* Main heading skeleton */}
          <div className="space-y-4">
            <div className="mx-auto h-12 w-full animate-pulse rounded bg-muted sm:h-16" />
            <div className="mx-auto h-12 w-3/4 animate-pulse rounded bg-muted sm:h-16" />
          </div>

          {/* Subheading skeleton */}
          <div className="mt-6 space-y-2">
            <div className="mx-auto h-6 w-full animate-pulse rounded bg-muted" />
            <div className="mx-auto h-6 w-5/6 animate-pulse rounded bg-muted" />
            <div className="mx-auto h-6 w-2/3 animate-pulse rounded bg-muted" />
          </div>

          {/* CTAs skeleton */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="h-12 w-64 animate-pulse rounded bg-muted" />
            <div className="h-12 w-48 animate-pulse rounded bg-muted" />
          </div>

          {/* Metrics Grid skeleton */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center justify-center mb-2">
                  <div className="h-6 w-6 animate-pulse rounded bg-muted" />
                </div>
                <div className="mx-auto mb-2 h-8 w-12 animate-pulse rounded bg-muted" />
                <div className="mx-auto h-4 w-20 animate-pulse rounded bg-muted" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}