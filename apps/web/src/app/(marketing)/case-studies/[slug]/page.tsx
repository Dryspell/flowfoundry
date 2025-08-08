import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CaseStudyTimeline } from '@/components/case-studies/CaseStudyTimeline'
import { CaseStudyResults } from '@/components/case-studies/CaseStudyResults'
import { CaseStudyTestimonial } from '@/components/case-studies/CaseStudyTestimonial'
import { CaseStudySkeleton } from '@/components/skeletons/CaseStudiesGridSkeleton'
import { getCaseStudyBySlug, getAllCaseStudySlugs, getRelatedCaseStudies } from '@/lib/case-studies-data'
import { Building, MapPin, Globe, Users, Clock, ArrowRight, Tag } from 'lucide-react'
import Link from 'next/link'

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | Stratalace',
      description: 'The requested case study could not be found.'
    }
  }

  const primaryResult = caseStudy.results.quantifiedResults[0]
  
  return {
    title: `${caseStudy.title} | Stratalace Case Study`,
    description: `Learn how ${caseStudy.client.name} achieved ${primaryResult?.improvement || 'significant improvements'} with Stratalace's AI solutions. ${caseStudy.challenge.overview.substring(0, 100)}...`,
    openGraph: {
      title: `${caseStudy.title} - Real AI Transformation Results`,
      description: `${primaryResult?.improvement || 'Significant improvement'} in ${primaryResult?.timeframe || 'months'}. See the full case study.`,
      images: [caseStudy.media.heroImage],
      type: 'article'
    },
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  const relatedCaseStudies = getRelatedCaseStudies(slug)

  return (
    <div className="min-h-screen">
      <Suspense fallback={<CaseStudySkeleton />}>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-background via-background to-muted/30 py-16 lg:py-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="mb-8">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Link href="/case-studies" className="hover:text-primary">Case Studies</Link>
                  <span>/</span>
                  <span>{caseStudy.client.industry}</span>
                </div>
              </nav>

              {/* Title and Client Info */}
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {caseStudy.featured && (
                    <Badge className="bg-primary/10 text-primary border-primary/20">Featured</Badge>
                  )}
                  <Badge variant="outline">{caseStudy.client.industry}</Badge>
                  {caseStudy.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  {caseStudy.title}
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed">
                  {caseStudy.challenge.overview}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="group">
                    <Link href="/contact">
                      Get Similar Results
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/case-studies">
                      View All Case Studies
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Client Overview */}
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                    <p className="text-foreground/80 leading-relaxed mb-6">
                      {caseStudy.challenge.overview}
                    </p>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold">Key Problems:</h3>
                      <ul className="space-y-2">
                        {caseStudy.challenge.specificProblems.map((problem, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="h-2 w-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                            <span className="text-foreground/80">{problem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        Client Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="font-semibold">{caseStudy.client.name}</div>
                        <div className="text-sm text-muted-foreground">{caseStudy.client.industry}</div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{caseStudy.client.size}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{caseStudy.client.location}</span>
                        </div>
                        {caseStudy.client.website && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="text-primary">{caseStudy.client.website}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Project Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div>
                        <div className="font-medium">Services Used:</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {caseStudy.solution.servicesUsed.map((service) => (
                            <Badge key={service} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Timeline:</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{caseStudy.solution.timeline.length} phases</span>
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Team Size:</div>
                        <div>{caseStudy.solution.teamInvolved.length} specialists</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Overview */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold">Our Solution</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {caseStudy.solution.overview}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Technical Approach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80">
                      {caseStudy.solution.technicalApproach}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Key Innovations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {caseStudy.solution.innovations.slice(0, 3).map((innovation, index) => (
                        <li key={index} className="text-sm text-foreground/80 flex items-start gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {innovation}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Timeline */}
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <CaseStudyTimeline 
              timeline={caseStudy.solution.timeline}
              phases={caseStudy.implementation.phases}
            />
          </div>
        </section>

        {/* Results */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6 lg:px-8">
            <CaseStudyResults results={caseStudy.results} />
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <CaseStudyTestimonial 
              testimonial={caseStudy.testimonial}
              clientName={caseStudy.client.name}
            />
          </div>
        </section>

        {/* Related Case Studies */}
        {relatedCaseStudies.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Related Case Studies</h2>
                  <p className="text-muted-foreground">
                    Explore more success stories from similar transformations
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedCaseStudies.slice(0, 3).map((relatedCase) => (
                    <Card key={relatedCase.slug} className="group hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Building className="h-4 w-4" />
                          <span>{relatedCase.client.industry}</span>
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {relatedCase.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-foreground/80 line-clamp-3 mb-4">
                          {relatedCase.challenge.overview}
                        </p>
                        <Button asChild variant="outline" size="sm" className="w-full">
                          <Link href={`/case-studies/${relatedCase.slug}`}>
                            View Case Study
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </Suspense>
    </div>
  )
}