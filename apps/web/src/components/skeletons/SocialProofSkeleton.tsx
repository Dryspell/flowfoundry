import { Card, CardContent } from "@/components/ui/card"

export function SocialProofSkeleton() {
  return (
    <section className="bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto h-10 w-80 animate-pulse rounded bg-muted" />
          <div className="mt-6 space-y-2">
            <div className="mx-auto h-6 w-full animate-pulse rounded bg-muted" />
            <div className="mx-auto h-6 w-2/3 animate-pulse rounded bg-muted" />
          </div>
        </div>

        {/* Success Metrics */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto h-10 w-16 animate-pulse rounded bg-muted" />
              <div className="mt-2 h-4 w-24 mx-auto animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="h-full p-6">
              <CardContent className="p-0">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="h-4 w-4 animate-pulse rounded bg-muted" />
                  ))}
                </div>

                {/* Quote */}
                <div className="mb-6 space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-28 animate-pulse rounded bg-muted" />
                  </div>
                  <div className="h-6 w-16 animate-pulse rounded bg-muted" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mx-auto mt-16 text-center">
          <div className="mx-auto h-4 w-80 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </section>
  )
}