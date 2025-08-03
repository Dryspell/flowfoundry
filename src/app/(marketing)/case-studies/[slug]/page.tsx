import { Suspense } from 'react'
// import { notFound } from 'next/navigation'

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

// Dynamic case study pages with generateStaticParams
export async function generateStaticParams() {
  // TODO: Fetch case study slugs from Sanity CMS
  return [
    { slug: 'manufacturing-automation' },
    { slug: 'retail-optimization' },
    { slug: 'healthcare-workflow' },
  ]
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params

  // TODO: Fetch case study data from Sanity based on slug
  // const caseStudy = await getCaseStudyBySlug(slug)
  // if (!caseStudy) notFound()

  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<div>Loading case study...</div>}>
        <h1 className="mb-8 text-4xl font-bold capitalize">
          {slug.replace('-', ' ')} Case Study
        </h1>

        {/* TODO: Add comprehensive case study content */}
        <div className="prose max-w-none">
          <p className="text-muted-foreground">
            Coming soon: Detailed case study for {slug}
          </p>
        </div>

        <Suspense fallback={<div>Loading client testimonials...</div>}>
          {/* TODO: Add client testimonials section */}
          <section className="mt-12">
            <h2 className="mb-4 text-2xl font-semibold">Client Testimonial</h2>
            <p className="text-muted-foreground">
              Coming soon: Client testimonials and quantified business impact
            </p>
          </section>
        </Suspense>
      </Suspense>
    </div>
  )
}
