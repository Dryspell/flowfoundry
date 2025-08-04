'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CaseStudy } from '@/types/sanity'
import { TrendingUp, DollarSign, Clock, Users, Target, ArrowRight, BarChart3 } from 'lucide-react'

interface CaseStudyResultsProps {
  results: CaseStudy['results']
  className?: string
}

interface MetricCardProps {
  metric: CaseStudy['results']['quantifiedResults'][0]
  index: number
}

function MetricCard({ metric, index }: MetricCardProps) {
  const getIcon = (metricName: string) => {
    const name = metricName.toLowerCase()
    if (name.includes('cost') || name.includes('saving') || name.includes('roi')) {
      return DollarSign
    }
    if (name.includes('time') || name.includes('cycle')) {
      return Clock
    }
    if (name.includes('satisfaction') || name.includes('employee')) {
      return Users
    }
    if (name.includes('accuracy') || name.includes('quality')) {
      return Target
    }
    return TrendingUp
  }

  const Icon = getIcon(metric.metric)

  const getImprovementColor = (improvement: string) => {
    const isPositive = improvement.includes('increase') || 
                      improvement.includes('improvement') || 
                      improvement.includes('faster') || 
                      improvement.includes('reduction') ||
                      improvement.includes('savings')
    return isPositive ? 'text-green-600' : 'text-blue-600'
  }

  return (
    <Card className="border-border/50 hover:border-primary/20 transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {metric.metric}
              </CardTitle>
              <Badge variant="secondary" className="text-xs mt-1">
                {metric.timeframe}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Before/After Comparison */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-sm font-medium text-muted-foreground mb-1">Before</div>
              <div className="text-lg font-bold text-muted-foreground/70">
                {metric.before}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-muted-foreground mb-1">After</div>
              <div className="text-lg font-bold text-foreground">
                {metric.after}
              </div>
            </div>
          </div>

          {/* Improvement Highlight */}
          <div className="text-center pt-3 border-t">
            <div className={`text-2xl font-bold ${getImprovementColor(metric.improvement)}`}>
              {metric.improvement}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Net Improvement
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function CaseStudyResults({ results, className }: CaseStudyResultsProps) {
  const [showAllQualitative, setShowAllQualitative] = useState(false)
  const [showAllFeedback, setShowAllFeedback] = useState(false)

  return (
    <section className={`space-y-8 ${className}`}>
      {/* Section Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Results & Impact</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          {results.overview}
        </p>
      </div>

      {/* Quantified Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.quantifiedResults.map((metric, index) => (
          <MetricCard key={index} metric={metric} index={index} />
        ))}
      </div>

      {/* Qualitative Results */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-primary" />
            Operational Improvements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.qualitativeResults
              .slice(0, showAllQualitative ? undefined : 4)
              .map((result, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-sm text-foreground/80">
                    {result}
                  </p>
                </div>
              ))}
          </div>
          
          {results.qualitativeResults.length > 4 && (
            <div className="mt-4 text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllQualitative(!showAllQualitative)}
                className="text-primary"
              >
                {showAllQualitative ? 'Show Less' : `Show ${results.qualitativeResults.length - 4} More`}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Client Feedback */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Users className="h-5 w-5 text-primary" />
            Client Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.clientFeedback
              .slice(0, showAllFeedback ? undefined : 3)
              .map((feedback, index) => (
                <div key={index} className="border-l-4 border-primary/20 pl-4 py-2">
                  <p className="text-foreground/80 italic">
                    "{feedback}"
                  </p>
                </div>
              ))}
          </div>
          
          {results.clientFeedback.length > 3 && (
            <div className="mt-4 text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllFeedback(!showAllFeedback)}
                className="text-primary"
              >
                {showAllFeedback ? 'Show Less' : `Show ${results.clientFeedback.length - 3} More`}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Long-term Impact */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Target className="h-5 w-5 text-primary" />
            Long-term Business Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.longTermImpact.map((impact, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <TrendingUp className="h-3 w-3 text-primary" />
                </div>
                <p className="text-foreground/90 font-medium">
                  {impact}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results Summary CTA */}
      <div className="text-center bg-muted/30 rounded-lg p-8">
        <h3 className="text-xl font-semibold mb-2">
          Ready to achieve similar results?
        </h3>
        <p className="text-muted-foreground mb-6">
          Let's discuss how we can deliver measurable business impact for your organization.
        </p>
        <Button asChild size="lg" className="group">
          <a href="/contact">
            Schedule Your Assessment
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </div>
    </section>
  )
}