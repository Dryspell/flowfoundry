'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Linkedin, Mail, Brain, Cog, Zap, Target } from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  expertise: string[]
  image: string
  linkedin?: string
  email?: string
  achievements: string[]
}

interface TeamSectionProps {
  members: TeamMember[]
}

const expertiseAreas = [
  { name: 'All', icon: Target },
  { name: 'Multi-Agent Systems', icon: Brain },
  { name: 'Operational Optimization', icon: Cog },
  { name: 'AI Strategy', icon: Zap },
  { name: 'Business Transformation', icon: Target }
]

export function TeamSection({ members }: TeamSectionProps) {
  const [selectedExpertise, setSelectedExpertise] = useState('All')

  const filteredMembers = selectedExpertise === 'All' 
    ? members 
    : members.filter(member => member.expertise.includes(selectedExpertise))

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Meet Our Expert Team</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our diverse team of AI specialists, business strategists, and implementation experts 
          brings decades of combined experience in transforming businesses with AI.
        </p>
      </div>

      {/* Expertise Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {expertiseAreas.map((area) => {
          const Icon = area.icon
          return (
            <Button
              key={area.name}
              variant={selectedExpertise === area.name ? 'default' : 'outline'}
              onClick={() => setSelectedExpertise(area.name)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {area.name}
            </Button>
          )
        })}
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="h-full">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <div className="text-4xl font-bold text-primary">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-primary font-medium">{member.role}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {member.bio}
              </p>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-1">
                {member.expertise.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Key Achievements */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Key Achievements</h4>
                <ul className="space-y-1">
                  {member.achievements.map((achievement, index) => (
                    <li key={index} className="text-xs text-muted-foreground flex items-start">
                      <div className="w-1 h-1 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Links */}
              <div className="flex gap-2 pt-2">
                {member.linkedin && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {member.email && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={`mailto:${member.email}`}>
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}