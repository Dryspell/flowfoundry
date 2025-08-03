import { Suspense } from 'react'

// Async Server Component for About page
export default async function AboutPage() {
  // TODO: Add data fetching for team members and company info

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-4xl font-bold">About Flowfoundry</h1>

      <Suspense fallback={<div>Loading team information...</div>}>
        {/* TODO: Add team section */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Our Team</h2>
          <p className="text-muted-foreground">
            Coming soon: Dynamic team member profiles with expertise filtering
          </p>
        </section>
      </Suspense>

      <Suspense fallback={<div>Loading company information...</div>}>
        {/* TODO: Add company mission and values */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground">
            Coming soon: Company mission, vision, and values presentation
          </p>
        </section>
      </Suspense>
    </div>
  )
}
