import { Suspense } from 'react'
import { CaseStudiesHero } from '@/components/case-studies/CaseStudiesHero'
import { CaseStudiesGrid } from '@/components/case-studies/CaseStudiesGrid'
import { CaseStudiesGridSkeleton } from '@/components/skeletons/CaseStudiesGridSkeleton'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Success Stories & Case Studies - 340% Average ROI Results',
  description: 'Discover how we\'ve helped businesses achieve 340% average ROI through AI-powered solutions. Real case studies with measurable impact across manufacturing, retail, healthcare, and financial services. 98% client satisfaction.',
  keywords: [
    'AI success stories',
    'AI case studies',
    'business transformation results',
    'AI ROI results',
    'automation case studies',
    'AI implementation success',
    'manufacturing AI',
    'retail AI solutions',
    'healthcare AI',
    'financial services AI',
    'proven AI results',
    'AI transformation examples'
  ],
  openGraph: {
    title: 'AI Success Stories & Case Studies - 340% Average ROI Results',
    description: 'Real businesses, real results. See how our AI solutions delivered 340% ROI, 65% efficiency gains, and 98% client satisfaction across industries.',
    url: 'https://flowfoundry.ai/case-studies',
    images: [
      {
        url: '/og-image-case-studies.png',
        width: 1200,
        height: 630,
        alt: 'FlowFoundry AI Success Stories - 340% Average ROI',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Success Stories & Case Studies - 340% Average ROI Results',
    description: 'Real businesses, real results. See how our AI solutions delivered 340% ROI, 65% efficiency gains, and 98% client satisfaction.',
    images: ['/og-image-case-studies.png'],
  },
  alternates: {
    canonical: 'https://flowfoundry.ai/case-studies',
  },
}

// Server Component for Case Studies listing with comprehensive filtering and search
export default async function CaseStudiesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://flowfoundry.ai/case-studies#collectionpage",
        "url": "https://flowfoundry.ai/case-studies",
        "name": "Technology Solutions & Case Studies",
        "description": "Real web development and technology transformation results with 340% average ROI across manufacturing, retail, healthcare, and financial services.",
        "mainEntity": {
          "@type": "ItemList",
          "name": "Technology Case Studies",
          "description": "Success stories and case studies from FlowFoundry's web development and technology transformation projects"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://flowfoundry.ai/case-studies#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@id": "https://flowfoundry.ai",
              "name": "Home"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@id": "https://flowfoundry.ai/case-studies",
              "name": "Case Studies"
            }
          }
        ]
      }
    ]
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
