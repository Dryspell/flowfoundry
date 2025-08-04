'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, Cog, Zap, Wrench } from "lucide-react"
import { motion } from "framer-motion"

const services = [
  {
    id: "multi-agent-systems",
    title: "Multi-Agent AI Systems",
    description: "Intelligent automation with multiple AI agents working in harmony to handle complex workflows and decision-making processes.",
    icon: Bot,
    benefits: ["24/7 Automated Operations", "Intelligent Decision Making", "Scalable Workflows"]
  },
  {
    id: "operational-optimization",
    title: "Operational Optimization",
    description: "Streamline processes and maximize efficiency with AI-driven analysis and optimization of your business operations.",
    icon: Cog,
    benefits: ["Cost Reduction", "Process Efficiency", "Performance Analytics"]
  },
  {
    id: "ai-transformation",
    title: "AI-Accelerated Transformation",
    description: "Complete business transformation powered by AI, from strategy development to implementation and optimization.",
    icon: Zap,
    benefits: ["Strategic Planning", "Full Implementation", "Ongoing Support"]
  },
  {
    id: "custom-ai-solutions",
    title: "Custom AI Solutions",
    description: "Tailored AI implementations designed specifically for your unique business challenges and requirements.",
    icon: Wrench,
    benefits: ["Bespoke Development", "Industry-Specific", "Scalable Architecture"]
  }
]

export function ServicesOverview() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our AI Consultancy Services
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Comprehensive AI solutions designed to transform your business operations 
            and accelerate growth through intelligent automation.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="h-full"
              >
                <Card className="h-full transition-shadow duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center text-sm text-muted-foreground">
                          <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    
                    <Button variant="outline" className="w-full group">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}