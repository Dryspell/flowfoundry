'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ContactFormData } from '@/types/sanity'
import { 
  DollarSign, 
  TrendingUp, 
  Cog, 
  Users, 
  Zap, 
  Bot,
  Clock,
  AlertTriangle,
  Calendar,
  Target
} from 'lucide-react'

interface FormStep1Props {
  formData: Partial<ContactFormData>
  onUpdate: (data: Partial<ContactFormData>) => void
  errors: Record<string, string>
}

const challenges = [
  {
    id: 'reduce-costs',
    label: 'Reduce operational costs',
    description: 'Automate processes to cut expenses and improve margins',
    icon: DollarSign,
    examples: ['Process automation', 'Resource optimization', 'Waste reduction']
  },
  {
    id: 'increase-efficiency',
    label: 'Increase revenue/efficiency',
    description: 'Boost productivity and optimize workflows',
    icon: TrendingUp,
    examples: ['Workflow optimization', 'Performance analytics', 'Capacity planning']
  },
  {
    id: 'automate-processes',
    label: 'Automate manual processes',
    description: 'Replace time-consuming manual tasks with AI',
    icon: Cog,
    examples: ['Data entry automation', 'Report generation', 'Quality control']
  },
  {
    id: 'improve-experience',
    label: 'Improve customer experience',
    description: 'Enhance service delivery and satisfaction',
    icon: Users,
    examples: ['Personalization', 'Response times', 'Service quality']
  },
  {
    id: 'digital-transformation',
    label: 'Digital transformation',
    description: 'Modernize operations with AI-first approach',
    icon: Zap,
    examples: ['Legacy system modernization', 'Digital workflows', 'Data integration']
  },
  {
    id: 'custom-ai',
    label: 'Custom AI development',
    description: 'Build specialized AI solutions for unique needs',
    icon: Bot,
    examples: ['Machine learning models', 'Predictive analytics', 'Intelligent automation']
  }
]

const urgencyOptions = [
  {
    id: 'immediate',
    label: 'Immediately (< 1 month)',
    description: 'Critical business need requiring urgent attention',
    icon: AlertTriangle,
    color: 'border-red-200 bg-red-50 text-red-700',
    iconColor: 'text-red-600'
  },
  {
    id: 'soon',
    label: 'Soon (1-3 months)',
    description: 'Important project with defined timeline',
    icon: Clock,
    color: 'border-orange-200 bg-orange-50 text-orange-700',
    iconColor: 'text-orange-600'
  },
  {
    id: 'planning',
    label: 'Planning phase (3-6 months)',
    description: 'Strategic initiative in planning stage',
    icon: Calendar,
    color: 'border-blue-200 bg-blue-50 text-blue-700',
    iconColor: 'text-blue-600'
  },
  {
    id: 'future',
    label: 'Future consideration (6+ months)',
    description: 'Long-term strategic planning',
    icon: Target,
    color: 'border-green-200 bg-green-50 text-green-700',
    iconColor: 'text-green-600'
  }
]

export function FormStep1({ formData, onUpdate, errors }: FormStep1Props) {
  const handleChallengeSelect = (challengeId: string) => {
    onUpdate({ primaryChallenge: challengeId })
  }

  const handleUrgencySelect = (urgencyId: string) => {
    onUpdate({ urgency: urgencyId })
  }

  return (
    <div className="space-y-8">
      {/* Challenge Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-2">
          What's your primary business challenge?
        </h3>
        <p className="text-muted-foreground mb-6">
          Select the main area where you're looking to implement AI solutions
        </p>
        
        {errors.primaryChallenge && (
          <div className="text-red-600 text-sm mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            {errors.primaryChallenge}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((challenge) => (
            <Card 
              key={challenge.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                formData.primaryChallenge === challenge.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleChallengeSelect(challenge.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    formData.primaryChallenge === challenge.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    <challenge.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base leading-tight">
                      {challenge.label}
                    </CardTitle>
                  </div>
                  {formData.primaryChallenge === challenge.id && (
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      Selected
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3">
                  {challenge.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {challenge.examples.map((example) => (
                    <Badge key={example} variant="outline" className="text-xs">
                      {example}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Urgency Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-2">
          When do you need this solved?
        </h3>
        <p className="text-muted-foreground mb-6">
          Understanding your timeline helps us recommend the best approach
        </p>

        {errors.urgency && (
          <div className="text-red-600 text-sm mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            {errors.urgency}
          </div>
        )}

        <div className="space-y-3">
          {urgencyOptions.map((option) => (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${
                formData.urgency === option.id
                  ? `border-primary ${option.color}`
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleUrgencySelect(option.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                    formData.urgency === option.id
                      ? 'bg-current/20'
                      : 'bg-muted'
                  }`}>
                    <option.icon className={`h-4 w-4 ${
                      formData.urgency === option.id
                        ? option.iconColor
                        : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {option.description}
                    </div>
                  </div>
                  {formData.urgency === option.id && (
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      Selected
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Target className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h4 className="font-medium mb-1">Why do we ask this?</h4>
            <p className="text-sm text-muted-foreground">
              Understanding your challenge and timeline helps us provide more accurate recommendations 
              and connect you with the right specialists. This information also helps us prioritize 
              urgent requests and prepare relevant case studies for our consultation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}