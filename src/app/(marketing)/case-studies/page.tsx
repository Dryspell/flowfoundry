import { Suspense } from 'react'

// Async Server Component for Case Studies listing
export default async function CaseStudiesPage() {
  // TODO: Add data fetching for case studies from Sanity

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-4xl font-bold">Case Studies</h1>

      <Suspense fallback={<div>Loading case studies...</div>}>
        {/* TODO: Add case studies grid */}
        <section>
          <p className="mb-8 text-muted-foreground">
            Coming soon: Comprehensive project documentation with before/after
            metrics
          </p>

          {/* Placeholder for case studies grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* TODO: Replace with dynamic case study cards */}
          </div>
        </section>
      </Suspense>
    </div>
  )
}
