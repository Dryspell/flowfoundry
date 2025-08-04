import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { CaseStudyPreview } from '@/types/sanity'
import { ArrowRight, Building, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface CaseStudyCardProps {
  caseStudy: CaseStudyPreview
  className?: string
}

export function CaseStudyCard({ caseStudy, className }: CaseStudyCardProps) {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Building className="h-4 w-4" />
              <span>{caseStudy.client}</span>
              <span>•</span>
              <span>{caseStudy.industry}</span>
            </div>
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
              {caseStudy.title}
            </h3>
          </div>
          {caseStudy.featured && (
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="space-y-4">
          {/* Challenge Preview */}
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-1 uppercase tracking-wide">
              Challenge
            </h4>
            <p className="text-sm text-foreground/80 line-clamp-2">
              {caseStudy.challenge}
            </p>
          </div>

          {/* Solution Preview */}
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-1 uppercase tracking-wide">
              Solution
            </h4>
            <p className="text-sm text-foreground/80 line-clamp-2">
              {caseStudy.solution}
            </p>
          </div>

          {/* Results Preview */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <h4 className="font-medium text-sm text-green-700 uppercase tracking-wide">
                Key Results
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="font-semibold text-lg text-green-600">
                  {caseStudy.results.primaryMetricValue}
                </div>
                <div className="text-xs text-muted-foreground">
                  {caseStudy.results.primaryMetric}
                </div>
              </div>
              <div>
                <div className="font-semibold text-lg text-green-600">
                  {caseStudy.results.roi}
                </div>
                <div className="text-xs text-muted-foreground">
                  in {caseStudy.results.timeframe}
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {caseStudy.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs py-0.5 px-2 border-border/60"
              >
                {tag}
              </Badge>
            ))}
            {caseStudy.tags.length > 3 && (
              <Badge 
                variant="outline" 
                className="text-xs py-0.5 px-2 border-border/60 text-muted-foreground"
              >
                +{caseStudy.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button asChild className="w-full group/btn">
          <Link href={`/case-studies/${caseStudy.id}`}>
            View Full Case Study
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}