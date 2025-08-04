import { Suspense } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { servicesData } from '@/lib/services-data'

// Async function to get services data
async function getServices() {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100))
  return servicesData
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-background via-background to-muted/50">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Our AI Consultancy Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive AI solutions designed to transform your business operations 
            and accelerate growth through intelligent automation and optimization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Schedule Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Download Service Overview
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="h-full">
                <CardHeader>
                  <div className="mb-4 h-12 w-12 animate-pulse rounded-lg bg-muted" />
                  <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <div key={j} className="flex items-center">
                          <div className="mr-2 h-4 w-4 animate-pulse rounded bg-muted" />
                          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                        </div>
                      ))}
                    </div>
                    <div className="h-10 w-full animate-pulse rounded bg-muted" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <Card key={service.slug} className="h-full group hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {service.subtitle}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description.slice(0, 150)}...
                      </p>

                      {/* Key Benefits Preview */}
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Key Benefits:</h4>
                        <ul className="space-y-1">
                          {service.benefits.slice(0, 3).map((benefit, index) => (
                            <li key={index} className="flex items-start text-xs text-muted-foreground">
                              <CheckCircle className="mr-2 h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                              {benefit.slice(0, 50)}...
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pricing Preview */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold">Starting from:</span>
                          <Badge variant="secondary">
                            {service.pricing[0]?.startingPrice || 'Contact Us'}
                          </Badge>
                        </div>
                      </div>
                      
                      <Button asChild className="w-full group">
                        <Link href={`/services/${service.slug}`}>
                          Learn More & Get Pricing
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Not sure which service is right for you? Schedule a free consultation 
            and we&apos;ll help you identify the best AI solutions for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Schedule Free AI Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              View Case Studies
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
