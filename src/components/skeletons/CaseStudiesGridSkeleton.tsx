export function CaseStudiesGridSkeleton() {
  return (
    <div className="space-y-8">
      {/* Filters Skeleton */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="h-10 bg-muted rounded-md animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-6 w-32 bg-muted rounded animate-pulse" />
            <div className="h-9 w-20 bg-muted rounded-md animate-pulse" />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="h-8 w-16 bg-muted rounded-md animate-pulse" />
          <div className="h-8 w-20 bg-muted rounded-md animate-pulse" />
        </div>
      </div>

      {/* Sort Controls Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-5 w-48 bg-muted rounded animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="h-9 w-32 bg-muted rounded-md animate-pulse" />
          <div className="h-9 w-16 bg-muted rounded-md animate-pulse" />
        </div>
      </div>

      {/* Case Studies Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <CaseStudyCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

export function CaseStudyCardSkeleton() {
  return (
    <div className="border border-border rounded-lg p-6 space-y-4 animate-pulse">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-muted rounded" />
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-4 w-4 bg-muted rounded-full" />
              <div className="h-4 w-20 bg-muted rounded" />
            </div>
            <div className="h-6 w-full bg-muted rounded" />
            <div className="h-5 w-3/4 bg-muted rounded" />
          </div>
          <div className="h-6 w-16 bg-muted rounded-full" />
        </div>
      </div>

      {/* Challenge */}
      <div className="space-y-2">
        <div className="h-4 w-20 bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-5/6 bg-muted rounded" />
      </div>

      {/* Solution */}
      <div className="space-y-2">
        <div className="h-4 w-16 bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-4/5 bg-muted rounded" />
      </div>

      {/* Results */}
      <div className="border-t pt-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-muted rounded" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="h-6 w-16 bg-muted rounded" />
            <div className="h-3 w-20 bg-muted rounded" />
          </div>
          <div className="space-y-1">
            <div className="h-6 w-20 bg-muted rounded" />
            <div className="h-3 w-16 bg-muted rounded" />
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        <div className="h-5 w-16 bg-muted rounded-full" />
        <div className="h-5 w-20 bg-muted rounded-full" />
        <div className="h-5 w-14 bg-muted rounded-full" />
      </div>

      {/* Button */}
      <div className="h-10 w-full bg-muted rounded-md" />
    </div>
  )
}

export function CaseStudySkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      {/* Hero Section */}
      <div className="space-y-6">
        <div className="h-8 w-32 bg-muted rounded mx-auto" />
        <div className="h-12 w-3/4 bg-muted rounded mx-auto" />
        <div className="h-6 w-full bg-muted rounded mx-auto" />
        <div className="h-6 w-5/6 bg-muted rounded mx-auto" />
      </div>

      {/* Client Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-5 w-full bg-muted rounded" />
          <div className="h-5 w-full bg-muted rounded" />
          <div className="h-5 w-3/4 bg-muted rounded" />
        </div>
        <div className="space-y-4">
          <div className="h-8 w-32 bg-muted rounded" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-2/3 bg-muted rounded" />
          </div>
        </div>
      </div>

      {/* Content Sections */}
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="space-y-6">
          <div className="h-8 w-64 bg-muted rounded mx-auto" />
          <div className="h-6 w-full bg-muted rounded mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="h-5 w-full bg-muted rounded" />
              <div className="h-5 w-full bg-muted rounded" />
              <div className="h-5 w-3/4 bg-muted rounded" />
            </div>
            <div className="space-y-3">
              <div className="h-5 w-full bg-muted rounded" />
              <div className="h-5 w-full bg-muted rounded" />
              <div className="h-5 w-4/5 bg-muted rounded" />
            </div>
          </div>
        </div>
      ))}

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="border border-border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-muted rounded-lg" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-32 bg-muted rounded" />
                <div className="h-5 w-16 bg-muted rounded-full" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center space-y-1">
                <div className="h-4 w-12 bg-muted rounded mx-auto" />
                <div className="h-6 w-16 bg-muted rounded mx-auto" />
              </div>
              <div className="text-center space-y-1">
                <div className="h-4 w-10 bg-muted rounded mx-auto" />
                <div className="h-6 w-14 bg-muted rounded mx-auto" />
              </div>
            </div>
            <div className="text-center pt-3 border-t">
              <div className="h-8 w-24 bg-muted rounded mx-auto" />
              <div className="h-3 w-20 bg-muted rounded mx-auto mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}