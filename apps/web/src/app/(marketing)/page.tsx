import { Suspense } from 'react'
import { Metadata } from 'next'
import { HeroSection } from '@/components/marketing/HeroSection'
import { ServicesOverview } from '@/components/marketing/ServicesOverview'
import { SocialProofSection } from '@/components/marketing/SocialProofSection'
import { HeroSkeleton } from '@/components/skeletons/HeroSkeleton'
import { ServicesOverviewSkeleton } from '@/components/skeletons/ServicesOverviewSkeleton'
import { SocialProofSkeleton } from '@/components/skeletons/SocialProofSkeleton'

export const metadata: Metadata = {
  title: 'Technology Consultancy & Web Development Solutions',
  description: 'Transform your business with AI-powered multi-agent systems, operational optimization, and custom solutions. 340% average ROI. Free consultation available. Proven results in manufacturing, retail, healthcare & finance.',
  keywords: [
    'technology consultancy',
    'business automation',
    'multi-agent systems',
    'operational optimization',
    'AI consulting',
    'business optimization',
    'automation solutions',
    'AI implementation',
    'ROI improvement',
    'custom AI solutions'
  ],
  openGraph: {
    title: 'Technology Consultancy & Web Development Solutions - Stratalace',
    description: 'Transform your business with AI-powered solutions. 340% average ROI, proven results across industries. Free consultation available.',
    url: 'https://stratalace.com',
    images: [
      {
        url: '/og-image-homepage.png',
        width: 1200,
        height: 630,
        alt: 'Stratalace AI Transformation Solutions - 340% Average ROI',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technology Consultancy & Web Development Solutions - Stratalace',
    description: 'Transform your business with AI-powered solutions. 340% average ROI, proven results across industries. Free consultation available.',
    images: ['/og-image-homepage.png'],
  },
  alternates: {
    canonical: 'https://stratalace.com',
  },
}

// Async function to fetch hero metrics (placeholder for future Sanity CMS integration)
async function getHeroMetrics() {
  // Simulate API call delay for demonstration
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    clientsServed: "150+",
    averageROI: "340%",
    projectsCompleted: "200+",
    monthsSaved: "2,400+"
  }
}

export default async function HomePage() {
  const heroMetrics = await getHeroMetrics()

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://stratalace.com/#organization",
        "name": "Stratalace",
        "url": "https://stratalace.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://stratalace.com/logo.png"
        },
        "description": "AI transformation and business automation solutions with proven 340% average ROI. Expert consultancy in multi-agent systems and operational optimization.",
        "foundingDate": "2023",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "value": "6-10"
        },
        "areaServed": ["United States", "Canada", "Europe"],
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "40.7128",
            "longitude": "-74.0060"
          },
          "geoRadius": "10000"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "hello@stratalace.com",
          "availableLanguage": "English"
        },
        "sameAs": [
          "https://linkedin.com/company/stratalace",
          "https://twitter.com/stratalace"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://stratalace.com/#website",
        "url": "https://stratalace.com",
        "name": "Stratalace",
        "publisher": {
          "@id": "https://stratalace.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://stratalace.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Service",
        "@id": "https://stratalace.com/#service",
        "name": "AI Transformation & Business Automation",
        "provider": {
          "@id": "https://stratalace.com/#organization"
        },
        "description": "Comprehensive AI solutions including multi-agent systems, operational optimization, and business transformation with 340% average ROI.",
        "serviceType": "AI Consulting",
        "areaServed": ["United States", "Canada", "Europe"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "AI Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Multi-Agent AI Systems"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI Strategy & Consulting"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Business Transformation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Operational Optimization"
              }
            }
          ]
        }
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
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection metrics={heroMetrics} />
      </Suspense>

      {/* Services Overview Section */}
      <Suspense fallback={<ServicesOverviewSkeleton />}>
        <ServicesOverview />
      </Suspense>

      {/* Social Proof Section */}
      <Suspense fallback={<SocialProofSkeleton />}>
        <SocialProofSection />
      </Suspense>
    </div>
  )
}
