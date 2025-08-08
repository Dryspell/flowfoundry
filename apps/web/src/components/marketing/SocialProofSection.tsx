'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    id: 1,
    content: "Stratalace transformed our manufacturing operations with AI automation. We're seeing 40% faster production cycles and 60% fewer errors.",
    author: "Sarah Chen",
    role: "Operations Director",
    company: "TechManufacturing Inc.",
    rating: 5,
    industry: "Manufacturing"
  },
  {
    id: 2,
    content: "The multi-agent system they built handles our entire customer service pipeline. Customer satisfaction up 85% and costs down 50%.",
    author: "Michael Rodriguez",
    role: "CEO",
    company: "ServicePro Solutions",
    rating: 5,
    industry: "Customer Service"
  },
  {
    id: 3,
    content: "ROI of 340% in just 8 months. Their AI solutions optimized our supply chain and inventory management beyond our expectations.",
    author: "Jennifer Park",
    role: "Supply Chain Manager",
    company: "Retail Dynamics",
    rating: 5,
    industry: "Retail"
  },
  {
    id: 4,
    content: "Professional, knowledgeable, and results-driven. They turned our manual processes into an intelligent, automated workflow system.",
    author: "David Thompson",
    role: "Operations Manager",
    company: "HealthTech Solutions",
    rating: 5,
    industry: "Healthcare"
  }
]

const successMetrics = [
  { label: "Average ROI Increase", value: "340%" },
  { label: "Process Efficiency Gain", value: "65%" },
  { label: "Cost Reduction", value: "45%" },
  { label: "Client Satisfaction", value: "98%" }
]

export function SocialProofSection() {
  return (
    <section className="bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by Growing Businesses
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Join 150+ companies that have transformed their operations with our AI solutions
          </p>
        </div>

        {/* Success Metrics */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {successMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary sm:text-4xl">
                {metric.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-6">
                <CardContent className="p-0">
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 h-6 w-6 text-muted-foreground/20" />
                    <p className="text-foreground leading-relaxed pl-4">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.company}
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {testimonial.industry}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mx-auto mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Trusted by companies in manufacturing, healthcare, retail, and more
          </p>
        </div>
      </div>
    </section>
  )
}