import { Suspense } from 'react'

// Async Server Component for Services overview
export default async function ServicesPage() {
  // TODO: Add data fetching for services from Sanity

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-4xl font-bold">Our AI Consultancy Services</h1>

      <Suspense fallback={<div>Loading services...</div>}>
        {/* TODO: Add services grid */}
        <section>
          <p className="mb-8 text-muted-foreground">
            Coming soon: Detailed service descriptions with process breakdowns
          </p>

          {/* Placeholder for services grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* TODO: Replace with dynamic service cards */}
          </div>
        </section>
      </Suspense>
    </div>
  )
}
