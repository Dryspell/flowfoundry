import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, CheckCircle, Clock, DollarSign } from 'lucide-react'

interface ProcessStep {
  step: number
  title: string
  description: string
  duration: string
  deliverables: string[]
}

interface TechnologyStack {
  category: string
  technologies: string[]
}

interface PricingTier {
  name: string
  description: string
  startingPrice: string
  features: string[]
  timeline: string
}

interface ServiceData {
  title: string
  subtitle: string
  description: string
  benefits: string[]
  process: ProcessStep[]
  technologies: TechnologyStack[]
  pricing: PricingTier[]
  caseStudies: string[]
  icon: React.ElementType
}

interface ServiceDetailProps {
  service: ServiceData
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  const Icon = service.icon

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-background via-background to-muted/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {service.subtitle}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto mb-8">
              {service.description}
            </p>
            <Button size="lg" className="text-base font-semibold">
              Schedule Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-8 py-16">
        {/* Benefits Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Key Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.benefits.map((benefit, _index) => (
              <Card key={_index} className="p-6">
                <CardContent className="p-0 flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{benefit}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
          <div className="space-y-8">
            {service.process.map((step, _index) => (
              <Card key={step.step} className="overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{step.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Key Deliverables:</h4>
                    <ul className="space-y-1">
                      {step.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Technology Stack</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.technologies.map((tech, _index) => (
              <Card key={_index} className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-lg">{tech.category}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex flex-wrap gap-2">
                    {tech.technologies.map((technology) => (
                      <Badge key={technology} variant="secondary">
                        {technology}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Investment Options</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {service.pricing.map((tier, _index) => (
              <Card key={_index} className={`relative ${_index === 1 ? 'ring-2 ring-primary' : ''}`}>
                {_index === 1 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl mb-2">{tier.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                  <div className="flex items-center justify-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold">{tier.startingPrice}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{tier.timeline}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={_index === 1 ? 'default' : 'outline'}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 bg-muted/30 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Schedule a free consultation to discuss your specific needs and see how our 
            {service.title.toLowerCase()} can drive results for your business.
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
        </section>
      </div>
    </div>
  )
}