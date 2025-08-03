import { Suspense } from 'react'
// import { notFound } from 'next/navigation'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

// Dynamic service pages with generateStaticParams
export async function generateStaticParams() {
  // TODO: Fetch service slugs from Sanity CMS
  return [
    { slug: 'ai-automation' },
    { slug: 'multi-agent-systems' },
    { slug: 'operational-optimization' },
  ]
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params

  // TODO: Fetch service data from Sanity based on slug
  // const service = await getServiceBySlug(slug)
  // if (!service) notFound()

  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<div>Loading service details...</div>}>
        <h1 className="mb-8 text-4xl font-bold capitalize">
          {slug.replace('-', ' ')} Service
        </h1>

        {/* TODO: Add comprehensive service content */}
        <div className="prose max-w-none">
          <p className="text-muted-foreground">
            Coming soon: Detailed service description for {slug}
          </p>
        </div>

        <Suspense fallback={<div>Loading related case studies...</div>}>
          {/* TODO: Add related case studies section */}
          <section className="mt-12">
            <h2 className="mb-4 text-2xl font-semibold">
              Related Case Studies
            </h2>
            <p className="text-muted-foreground">
              Coming soon: Related case studies and client testimonials
            </p>
          </section>
        </Suspense>
      </Suspense>
    </div>
  )
}
