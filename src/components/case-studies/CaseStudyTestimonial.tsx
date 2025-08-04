'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CaseStudy } from '@/types/sanity'
import { Quote, User, Building, ChevronDown, ChevronUp } from 'lucide-react'

interface CaseStudyTestimonialProps {
  testimonial: CaseStudy['testimonial']
  clientName: string
  className?: string
}

export function CaseStudyTestimonial({ testimonial, clientName, className }: CaseStudyTestimonialProps) {
  const [showFullReview, setShowFullReview] = useState(false)

  return (
    <section className={`space-y-8 ${className}`}>
      {/* Section Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Client Testimonial</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Hear directly from our client about their experience and the impact of our AI transformation.
        </p>
      </div>

      {/* Main Testimonial Card */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
        <CardContent className="p-8 lg:p-12">
          <div className="space-y-6">
            {/* Quote Icon */}
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Quote className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* Main Quote */}
            <blockquote className="text-center">
              <p className="text-xl lg:text-2xl font-medium leading-relaxed text-foreground/90 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </blockquote>

            {/* Author Information */}
            <div className="flex flex-col items-center space-y-4">
              {/* Author Image (if available) */}
              {testimonial.authorImage && (
                <div className="h-16 w-16 rounded-full bg-muted overflow-hidden">
                  <Image
                    src={testimonial.authorImage}
                    alt={testimonial.author}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* Author Details */}
              <div className="text-center space-y-2">
                <div className="flex flex-col items-center gap-2">
                  <h3 className="font-semibold text-lg">{testimonial.author}</h3>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {testimonial.authorRole}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Building className="h-4 w-4" />
                  <span>{testimonial.company}</span>
                </div>
              </div>
            </div>

            {/* Expanded Review */}
            {testimonial.fullReview && (
              <div className="pt-6 border-t border-border/50">
                {showFullReview ? (
                  <div className="space-y-4">
                    <div className="prose prose-gray max-w-none text-center">
                      <p className="text-foreground/80 leading-relaxed">
                        {testimonial.fullReview}
                      </p>
                    </div>
                    <div className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFullReview(false)}
                        className="text-primary"
                      >
                        Show Less
                        <ChevronUp className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFullReview(true)}
                      className="text-primary"
                    >
                      Read Full Review
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Context */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center p-6">
          <div className="space-y-2">
            <User className="h-8 w-8 text-primary mx-auto" />
            <h3 className="font-semibold">Decision Maker</h3>
            <p className="text-sm text-muted-foreground">
              Direct feedback from the executive who championed the AI transformation
            </p>
          </div>
        </Card>

        <Card className="text-center p-6">
          <div className="space-y-2">
            <Building className="h-8 w-8 text-primary mx-auto" />
            <h3 className="font-semibold">Industry Expert</h3>
            <p className="text-sm text-muted-foreground">
              Deep industry knowledge and understanding of sector-specific challenges
            </p>
          </div>
        </Card>

        <Card className="text-center p-6">
          <div className="space-y-2">
            <Quote className="h-8 w-8 text-primary mx-auto" />
            <h3 className="font-semibold">Verified Results</h3>
            <p className="text-sm text-muted-foreground">
              Testimonial based on actual measured business outcomes and ROI
            </p>
          </div>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-muted/30 rounded-lg p-8">
        <h3 className="text-xl font-semibold mb-2">
          Want to share a success story like this?
        </h3>
        <p className="text-muted-foreground mb-6">
          Join {clientName} and other leading companies who have transformed their operations with AI.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/contact">
              Start Your Transformation
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/case-studies">
              View More Case Studies
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}