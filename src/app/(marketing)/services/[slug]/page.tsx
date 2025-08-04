import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { ServiceDetail } from '@/components/marketing/ServiceDetail'
import { getServiceBySlug, getAllServiceSlugs } from '@/lib/services-data'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  
  if (!service) {
    return {
      title: 'Service Not Found | FlowFoundry',
      description: 'The requested service could not be found.'
    }
  }

  const primaryBenefit = service.benefits[0] || 'Significant business improvements'
  const startingPrice = service.pricing[0]?.startingPrice || 'Contact for pricing'
  
  return {
    title: `${service.title} - AI Solutions & Consulting Services`,
    description: `${service.subtitle}. ${service.description.substring(0, 120)}... Starting from ${startingPrice}. Free consultation available.`,
    keywords: [
      service.title.toLowerCase().replace(/\s+/g, ' '),
      'AI consulting',
      'business automation',
      'custom AI solutions',
      'operational optimization',
      service.slug.replace(/-/g, ' '),
      ...service.benefits.slice(0, 3).map(benefit => 
        benefit.split(' ').slice(0, 3).join(' ').toLowerCase()
      )
    ],
    openGraph: {
      title: `${service.title} - Professional AI Solutions | FlowFoundry`,
      description: `${service.subtitle}. ${primaryBenefit}. Starting from ${startingPrice}.`,
      url: `https://flowfoundry.ai/services/${service.slug}`,
      images: [
        {
          url: `/og-image-service-${service.slug}.png`,
          width: 1200,
          height: 630,
          alt: `${service.title} - FlowFoundry AI Solutions`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} - Professional AI Solutions | FlowFoundry`,
      description: `${service.subtitle}. ${primaryBenefit}. Starting from ${startingPrice}.`,
      images: [`/og-image-service-${service.slug}.png`],
    },
    alternates: {
      canonical: `https://flowfoundry.ai/services/${service.slug}`,
    },
  }
}

// Dynamic service pages with generateStaticParams
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  
  // Simulate async data fetching delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const service = getServiceBySlug(slug)
  
  if (!service) {
    notFound()
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://flowfoundry.ai/services/${service.slug}#service`,
        "name": service.title,
        "description": service.description,
        "url": `https://flowfoundry.ai/services/${service.slug}`,
        "provider": {
          "@id": "https://flowfoundry.ai/#organization"
        },
        "serviceType": "AI Consulting",
        "category": service.title,
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `${service.title} Pricing`,
          "itemListElement": service.pricing.map((tier, index) => ({
            "@type": "Offer",
            "position": index + 1,
            "name": tier.name,
            "description": tier.description,
            "priceSpecification": {
              "@type": "PriceSpecification",
              "priceCurrency": "USD",
              "description": tier.startingPrice
            },
            "eligibleDuration": {
              "@type": "QuantitativeValue",
              "description": tier.timeline
            }
          }))
        },
        "additionalProperty": service.benefits.map(benefit => ({
          "@type": "PropertyValue",
          "name": "Benefit",
          "value": benefit
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://flowfoundry.ai/services/${service.slug}#breadcrumb`,
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
              "@id": "https://flowfoundry.ai/services",
              "name": "Services"
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@id": `https://flowfoundry.ai/services/${service.slug}`,
              "name": service.title
            }
          }
        ]
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading service details...</p>
        </div>
      </div>}>
        <ServiceDetail service={service} />
      </Suspense>
    </>
  )
}
