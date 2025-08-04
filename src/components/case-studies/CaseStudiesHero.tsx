import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Users, Award, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function CaseStudiesHero() {
  const keyMetrics = [
    {
      value: "340%",
      label: "Average ROI",
      description: "Return on investment across all projects",
      icon: TrendingUp
    },
    {
      value: "65%",
      label: "Efficiency Gains", 
      description: "Average operational improvement",
      icon: Award
    },
    {
      value: "98%",
      label: "Client Satisfaction",
      description: "Satisfaction rate across all engagements",
      icon: Users
    }
  ]

  return (
    <section className="relative bg-gradient-to-br from-background via-background to-muted/30 py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-sm px-4 py-1">
            Real Results from Real Businesses
          </Badge>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Proven AI Transformations
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover how we've helped businesses like yours achieve measurable ROI through intelligent automation, 
              operational optimization, and custom AI solutions. Every case study represents real business transformation.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 mt-12">
            {keyMetrics.map((metric) => (
              <div 
                key={metric.label}
                className="bg-card border border-border/50 rounded-lg p-6 hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <metric.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary mb-1">
                  {metric.value}
                </div>
                <div className="font-semibold text-foreground mb-2">
                  {metric.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Schedule Your Assessment
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">
                Explore Our Services
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by businesses across industries
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              <span>Manufacturing</span>
              <span>•</span>
              <span>Retail</span>
              <span>•</span>
              <span>Healthcare</span>
              <span>•</span>
              <span>Financial Services</span>
              <span>•</span>
              <span>Technology</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />
        <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-secondary/5 to-transparent blur-3xl" />
      </div>
    </section>
  )
}