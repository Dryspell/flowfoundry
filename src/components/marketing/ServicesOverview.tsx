'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, Cog, Zap, Wrench } from "lucide-react"
import { motion } from "framer-motion"

const services = [
  {
    id: "custom-web-development",
    title: "Custom Web Development",
    description: "Full-stack web applications built with modern frameworks like React and Next.js, designed for scalability and performance.",
    icon: Wrench,
    benefits: ["React/Next.js Applications", "Full-Stack Solutions", "E-commerce Platforms"]
  },
  {
    id: "digital-consultancy",
    title: "Digital Consultancy",
    description: "Strategic technology planning, system architecture design, and digital transformation consulting for modern businesses.",
    icon: Cog,
    benefits: ["Technology Strategy", "System Architecture", "Performance Optimization"]
  },
  {
    id: "web-agency-services",
    title: "Web Development Agency Services",
    description: "Complete web development services including responsive design, API development, and cloud deployment solutions.",
    icon: Zap,
    benefits: ["Responsive Design", "API Development", "Cloud Deployment"]
  },
  {
    id: "ai-enhanced-solutions",
    title: "AI-Enhanced Solutions",
    description: "Intelligent web applications with AI capabilities, automated workflows, and data-driven insights to enhance your digital solutions.",
    icon: Bot,
    benefits: ["Smart Web Applications", "Automated Workflows", "Data Analytics"]
  }
]

export function ServicesOverview() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Technology Consultancy Services
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Comprehensive web development and digital solutions designed to transform your business operations 
            and accelerate growth through modern technology and intelligent automation.
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