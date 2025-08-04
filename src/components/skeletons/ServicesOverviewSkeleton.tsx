import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function ServicesOverviewSkeleton() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* Title skeleton */}
          <div className="mx-auto h-10 w-96 animate-pulse rounded bg-muted" />
          
          {/* Description skeleton */}
          <div className="mt-6 space-y-2">
            <div className="mx-auto h-6 w-full animate-pulse rounded bg-muted" />
            <div className="mx-auto h-6 w-3/4 animate-pulse rounded bg-muted" />
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="h-full">
              <CardHeader>
                <div className="mb-4 h-12 w-12 animate-pulse rounded-lg bg-muted" />
                <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-muted" />
                      <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                    </div>
                  ))}
                </div>
                
                <div className="h-10 w-full animate-pulse rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}