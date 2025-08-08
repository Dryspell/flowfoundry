'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CaseStudy } from '@/types/sanity'
import { Calendar, Clock, CheckCircle, Circle, ChevronDown, ChevronRight } from 'lucide-react'

interface CaseStudyTimelineProps {
  timeline: CaseStudy['solution']['timeline']
  phases: CaseStudy['implementation']['phases']
  className?: string
}

interface TimelineItemProps {
  phase: CaseStudy['solution']['timeline'][0]
  implementationPhase?: CaseStudy['implementation']['phases'][0]
  index: number
  isLast: boolean
}

function TimelineItem({ phase, implementationPhase, index, isLast }: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(index === 0) // First item expanded by default

  return (
    <div className="relative">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border" />
      )}

      <div className="flex gap-4">
        {/* Timeline Icon */}
        <div className="relative flex-shrink-0">
          <div className="h-12 w-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pb-8">
          <Card className="border-border/50 hover:border-primary/20 transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-xs">
                    Phase {index + 1}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {phase.duration}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="h-8 w-8 p-0"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <CardTitle className="text-lg">{phase.phase}</CardTitle>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Key Activities - Always Visible */}
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2 uppercase tracking-wide">
                    Key Activities
                  </h4>
                  <ul className="space-y-1">
                    {phase.activities.slice(0, 2).map((activity, actIndex) => (
                      <li key={actIndex} className="text-sm text-foreground/80 flex items-start gap-2">
                        <Circle className="h-3 w-3 mt-1 text-muted-foreground flex-shrink-0" />
                        {activity}
                      </li>
                    ))}
                    {phase.activities.length > 2 && !isExpanded && (
                      <li className="text-sm text-muted-foreground">
                        +{phase.activities.length - 2} more activities...
                      </li>
                    )}
                  </ul>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="space-y-4 pt-4 border-t">
                    {/* Remaining Activities */}
                    {phase.activities.length > 2 && (
                      <div>
                        <ul className="space-y-1">
                          {phase.activities.slice(2).map((activity, actIndex) => (
                            <li key={actIndex + 2} className="text-sm text-foreground/80 flex items-start gap-2">
                              <Circle className="h-3 w-3 mt-1 text-muted-foreground flex-shrink-0" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Implementation Details */}
                    {implementationPhase && (
                      <div className="space-y-4">
                        {/* Deliverables */}
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-2 uppercase tracking-wide">
                            Key Deliverables
                          </h4>
                          <ul className="space-y-1">
                            {implementationPhase.deliverables.map((deliverable, delIndex) => (
                              <li key={delIndex} className="text-sm text-foreground/80 flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 mt-1 text-green-600 flex-shrink-0" />
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Challenges & Solutions */}
                        {implementationPhase.challenges.length > 0 && (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-sm text-muted-foreground mb-2 uppercase tracking-wide">
                                Challenges
                              </h4>
                              <ul className="space-y-1">
                                {implementationPhase.challenges.map((challenge, chalIndex) => (
                                  <li key={chalIndex} className="text-sm text-orange-600 flex items-start gap-2">
                                    <Circle className="h-3 w-3 mt-1 text-orange-600 flex-shrink-0" />
                                    {challenge}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-medium text-sm text-muted-foreground mb-2 uppercase tracking-wide">
                                Solutions
                              </h4>
                              <ul className="space-y-1">
                                {implementationPhase.solutions.map((solution, solIndex) => (
                                  <li key={solIndex} className="text-sm text-green-600 flex items-start gap-2">
                                    <CheckCircle className="h-3 w-3 mt-1 text-green-600 flex-shrink-0" />
                                    {solution}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export function CaseStudyTimeline({ timeline, phases, className }: CaseStudyTimelineProps) {
  return (
    <section className={`space-y-8 ${className}`}>
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Implementation Timeline</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A detailed breakdown of our systematic approach to delivering this AI transformation, 
          including key milestones, deliverables, and how we overcame challenges.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {timeline.map((phase, index) => {
          // Find matching implementation phase
          const implementationPhase = phases.find(p => 
            p.name.toLowerCase().includes(phase.phase.toLowerCase()) ||
            phase.phase.toLowerCase().includes(p.name.toLowerCase())
          )

          return (
            <TimelineItem
              key={index}
              phase={phase}
              {...(implementationPhase && { implementationPhase })}
              index={index}
              isLast={index === timeline.length - 1}
            />
          )
        })}
      </div>

      {/* Summary */}
      <div className="bg-muted/30 rounded-lg p-6 mt-8">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Project Summary</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">
              {timeline.length}
            </div>
            <div className="text-sm text-muted-foreground">Implementation Phases</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {timeline.reduce((total, phase) => {
                const weeks = parseInt(phase.duration.match(/\d+/)?.[0] || '0')
                return total + weeks
              }, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Weeks</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {phases.reduce((total, phase) => total + phase.deliverables.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Deliverables</div>
          </div>
        </div>
      </div>
    </section>
  )
}