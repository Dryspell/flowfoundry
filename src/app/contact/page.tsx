import { Suspense } from 'react'

// Contact page with Server Actions integration
export default function ContactPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-4xl font-bold">Contact Flowfoundry</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Suspense fallback={<div>Loading contact form...</div>}>
          {/* TODO: Add contact form with Server Actions */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">Get in Touch</h2>
            <p className="mb-6 text-muted-foreground">
              Coming soon: Intelligent contact form with project type
              pre-qualification
            </p>

            {/* Placeholder form */}
            <div className="rounded-lg border p-6">
              <p className="text-sm text-muted-foreground">
                Contact form with Server Actions will be implemented here
              </p>
            </div>
          </section>
        </Suspense>

        <Suspense fallback={<div>Loading contact information...</div>}>
          {/* TODO: Add contact information and calendar integration */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              Schedule a Consultation
            </h2>
            <p className="mb-6 text-muted-foreground">
              Coming soon: Calendly integration for consultation booking
            </p>

            {/* Placeholder calendar */}
            <div className="rounded-lg border p-6">
              <p className="text-sm text-muted-foreground">
                Calendar integration will be implemented here
              </p>
            </div>
          </section>
        </Suspense>
      </div>
    </div>
  )
}
