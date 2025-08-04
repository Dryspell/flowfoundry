import { Suspense } from 'react'
import { CaseStudiesHero } from '@/components/case-studies/CaseStudiesHero'
import { CaseStudiesGrid } from '@/components/case-studies/CaseStudiesGrid'
import { CaseStudiesGridSkeleton } from '@/components/skeletons/CaseStudiesGridSkeleton'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies - Real AI Transformation Results | Flowfoundry',
  description: 'Discover how we\'ve helped businesses achieve 340% average ROI through AI-powered solutions. Real case studies with measurable business impact across manufacturing, retail, healthcare, and financial services.',
  openGraph: {
    title: 'Case Studies - Proven AI Transformations | Flowfoundry',
    description: 'Real businesses, real results. See how our AI solutions delivered 340% ROI, 65% efficiency gains, and 98% client satisfaction.',
    type: 'website',
  },
}

// Server Component for Case Studies listing with comprehensive filtering and search
export default async function CaseStudiesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <CaseStudiesHero />

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <Suspense fallback={<CaseStudiesGridSkeleton />}>
          <CaseStudiesGrid />
        </Suspense>
      </div>
    </div>
  )
}
