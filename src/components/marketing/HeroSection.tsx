import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, TrendingUp, Users, Zap, Target } from "lucide-react"

interface HeroMetrics {
  clientsServed: string
  averageROI: string
  projectsCompleted: string
  monthsSaved: string
}

interface HeroSectionProps {
  metrics: HeroMetrics
}

export function HeroSection({ metrics }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/50 py-20 sm:py-32">
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <Badge variant="outline" className="mb-6 text-sm font-medium">
            <Zap className="mr-2 h-4 w-4" />
            AI-Powered Business Transformation
          </Badge>

          {/* Main heading */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Transform Your Business with{' '}
            <span className="text-primary">AI Excellence</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            We help small & mid-sized companies unlock unprecedented growth through 
            custom AI solutions, multi-agent systems, and operational optimization. 
            Join 150+ businesses already transforming with AI.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="text-base font-semibold">
              Schedule Free AI Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-base font-semibold">
              View Case Studies
            </Button>
          </div>

          {/* Metrics Grid */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-center">{metrics.clientsServed}</div>
              <div className="text-sm text-muted-foreground text-center">Clients Served</div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-center">{metrics.averageROI}</div>
              <div className="text-sm text-muted-foreground text-center">Average ROI</div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-center">{metrics.projectsCompleted}</div>
              <div className="text-sm text-muted-foreground text-center">Projects Completed</div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-center">{metrics.monthsSaved}</div>
              <div className="text-sm text-muted-foreground text-center">Months Saved</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}