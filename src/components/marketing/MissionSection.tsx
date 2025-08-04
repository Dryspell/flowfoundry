import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Target, Eye, Heart, Award, TrendingUp, Users } from 'lucide-react'

const companyValues = [
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'Every AI solution we build is designed to deliver measurable business outcomes and ROI.'
  },
  {
    icon: Heart,
    title: 'Client-Centric',
    description: 'We prioritize our clients\' success and build long-term partnerships based on trust and results.'
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'We stay at the forefront of AI technology to provide cutting-edge solutions.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work closely with your team to ensure successful implementation and adoption.'
  }
]

const achievements = [
  { icon: Award, metric: '150+', label: 'Businesses Transformed' },
  { icon: TrendingUp, metric: '340%', label: 'Average ROI Delivered' },
  { icon: Users, metric: '98%', label: 'Client Satisfaction Rate' },
  { icon: Target, metric: '200+', label: 'Successful Projects' }
]

export function MissionSection() {
  return (
    <section className="py-16">
      {/* Mission & Vision */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-6 w-6 text-primary" />
            <Badge variant="outline">Our Mission</Badge>
          </div>
          <h2 className="text-2xl font-bold mb-4">Democratizing AI for Business</h2>
          <p className="text-muted-foreground leading-relaxed">
            We believe every business, regardless of size, should have access to the transformative 
            power of AI. Our mission is to make enterprise-level AI solutions accessible and 
            practical for small to mid-sized companies, helping them compete and thrive in an 
            AI-driven economy.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Eye className="h-6 w-6 text-primary" />
            <Badge variant="outline">Our Vision</Badge>
          </div>
          <h2 className="text-2xl font-bold mb-4">AI-Powered Future for All</h2>
          <p className="text-muted-foreground leading-relaxed">
            We envision a future where AI amplifies human capabilities across every industry. 
            By 2030, we aim to be the leading AI consultancy for SMBs, having helped over 1,000 
            companies achieve breakthrough results through intelligent automation and optimization.
          </p>
        </div>
      </div>

      {/* Company Story */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Story</h2>
        <div className="max-w-4xl mx-auto space-y-6 text-muted-foreground">
          <p className="leading-relaxed">
            Founded in 2020 by a team of AI researchers and business transformation experts, 
            Flowfoundry emerged from a simple observation: while large enterprises were rapidly 
            adopting AI, small and mid-sized businesses were being left behind due to complexity, 
            cost, and lack of specialized expertise.
          </p>
          <p className="leading-relaxed">
            Our founders, with combined experience of over 40 years in AI research, enterprise 
            consulting, and startup scaling, recognized the opportunity to bridge this gap. 
            We started with a commitment to make AI accessible, practical, and profitable for 
            businesses that form the backbone of the global economy.
          </p>
          <p className="leading-relaxed">
            Today, we&apos;ve helped over 150 companies transform their operations, achieve an 
            average ROI of 340%, and future-proof their businesses with AI. Our approach combines 
            cutting-edge technology with deep business understanding, ensuring every solution we 
            build drives real, measurable results.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Core Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyValues.map((value) => {
            const Icon = value.icon
            return (
              <Card key={value.title} className="text-center p-6">
                <CardContent className="p-0">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">By the Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <div key={achievement.label} className="text-center">
                <div className="mx-auto mb-2 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">{achievement.metric}</div>
                <div className="text-sm text-muted-foreground">{achievement.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}