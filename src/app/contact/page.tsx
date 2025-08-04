import { Suspense } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { MultiStepForm } from '@/components/contact/MultiStepForm'
import { ContactMethods } from '@/components/contact/ContactMethods'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, MessageSquare, Clock, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact FlowFoundry - Free AI Consultation & Custom ROI Analysis',
  description: 'Start your AI transformation journey today. Get a free consultation, custom ROI analysis, and detailed project proposal. 2-hour response time. 340% average ROI proven results.',
  keywords: [
    'free AI consultation',
    'AI transformation consultation',
    'custom ROI analysis',
    'AI project proposal',
    'business automation consultation',
    'AI strategy consultation',
    'free AI assessment',
    'AI implementation planning',
    'contact AI experts',
    'AI consultation services'
  ],
  openGraph: {
    title: 'Contact FlowFoundry - Free AI Consultation & Custom ROI Analysis',
    description: 'Start your AI transformation journey. Free consultation, custom ROI analysis, and detailed project proposal. 2-hour response guaranteed.',
    url: 'https://flowfoundry.ai/contact',
    images: [
      {
        url: '/og-image-contact.png',
        width: 1200,
        height: 630,
        alt: 'Contact FlowFoundry - Free AI Consultation',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact FlowFoundry - Free AI Consultation & Custom ROI Analysis',
    description: 'Start your AI transformation journey. Free consultation, custom ROI analysis, and detailed project proposal. 2-hour response guaranteed.',
    images: ['/og-image-contact.png'],
  },
  alternates: {
    canonical: 'https://flowfoundry.ai/contact',
  },
}

// Enhanced contact page with multi-step form and comprehensive contact options
export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://flowfoundry.ai/contact#contactpage",
        "url": "https://flowfoundry.ai/contact",
        "name": "Contact FlowFoundry",
        "description": "Get a free AI consultation, custom ROI analysis, and detailed project proposal from FlowFoundry's AI experts.",
        "mainEntity": {
          "@id": "https://flowfoundry.ai/#organization"
        }
      },
      {
        "@type": "ContactPoint",
        "@id": "https://flowfoundry.ai/contact#contactpoint",
        "contactType": "customer service",
        "email": "hello@flowfoundry.ai",
        "availableLanguage": "English",
        "areaServed": ["United States", "Canada", "Europe"],
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "40.7128",
            "longitude": "-74.0060"
          },
          "geoRadius": "10000"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://flowfoundry.ai/contact#breadcrumb",
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
              "@id": "https://flowfoundry.ai/contact",
              "name": "Contact"
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
      <section className="bg-gradient-to-br from-background via-background to-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-sm px-4 py-1">
              Free Consultation Available
            </Badge>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Start Your AI Transformation
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Get a free consultation, custom ROI analysis, and detailed project proposal. 
                Our AI specialists will help you identify opportunities and plan your implementation strategy.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              <div className="flex items-center justify-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Free Consultation</div>
                  <div className="text-sm text-muted-foreground">No obligation</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">2-Hour Response</div>
                  <div className="text-sm text-muted-foreground">During business hours</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Enterprise Security</div>
                  <div className="text-sm text-muted-foreground">Confidential & secure</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Multi-Step Form */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Tell Us About Your Project</h2>
              <p className="text-muted-foreground">
                Help us understand your needs so we can provide the most relevant recommendations 
                and connect you with the right specialists.
              </p>
            </div>
            
            <Suspense fallback={<ContactFormSkeleton />}>
              <MultiStepForm />
            </Suspense>
          </div>

          {/* Contact Methods & Information */}
          <div className="lg:col-span-1">
            <ContactMethods />
          </div>
        </div>
      </div>

      {/* Additional Value Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Flowfoundry?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We&apos;re not just another AI consultancy. We&apos;re your long-term partners in transformation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <div className="text-2xl font-bold text-primary">340%</div>
                  </div>
                  <h3 className="font-semibold mb-2">Average ROI</h3>
                  <p className="text-sm text-muted-foreground">
                    Our clients see significant returns on their AI investments within the first year
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <div className="text-2xl font-bold text-primary">98%</div>
                  </div>
                  <h3 className="font-semibold mb-2">Client Satisfaction</h3>
                  <p className="text-sm text-muted-foreground">
                    Consistently high satisfaction scores across all projects and engagements
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <div className="text-2xl font-bold text-primary">65%</div>
                  </div>
                  <h3 className="font-semibold mb-2">Efficiency Gains</h3>
                  <p className="text-sm text-muted-foreground">
                    Average operational efficiency improvement across all implementations
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="group">
                <Link href="/case-studies">
                  View Our Success Stories
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Simple skeleton component for the contact form
function ContactFormSkeleton() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-8">
        {/* Progress skeleton */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                <div className="ml-3 flex-1">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-3 w-16 bg-muted rounded animate-pulse mt-1" />
                </div>
                {step < 4 && <div className="flex-1 mx-4 h-0.5 bg-muted" />}
              </div>
            ))}
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full w-1/4" />
          </div>
        </div>

        {/* Form content skeleton */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="h-6 w-48 bg-muted rounded animate-pulse" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-muted rounded-lg animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                      <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation buttons skeleton */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <div className="h-10 w-24 bg-muted rounded animate-pulse" />
          <div className="h-4 w-20 bg-muted rounded animate-pulse" />
          <div className="h-10 w-24 bg-muted rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}
