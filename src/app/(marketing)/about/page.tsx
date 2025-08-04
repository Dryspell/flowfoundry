import { Suspense } from 'react'
import { TeamSection } from '@/components/marketing/TeamSection'
import { MissionSection } from '@/components/marketing/MissionSection'
import { TeamSkeleton } from '@/components/skeletons/TeamSkeleton'
import { MissionSkeleton } from '@/components/skeletons/MissionSkeleton'

// Async function to fetch team members (placeholder for future Sanity CMS integration)
async function getTeamMembers() {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 200))
  
  return [
    {
      id: "founder-ceo",
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Former Principal AI Engineer at Google with 15+ years in AI research and business transformation. Led AI initiatives at 3 Fortune 500 companies before founding Flowfoundry.",
      expertise: ["AI Strategy", "Business Transformation", "Multi-Agent Systems"],
      image: "/team/alex-chen.jpg",
      linkedin: "https://linkedin.com/in/alexchen-ai",
      email: "alex@flowfoundry.ai",
      achievements: [
        "Led $50M+ AI transformation projects",
        "Published 25+ papers in top AI conferences", 
        "Built AI systems serving 100M+ users"
      ]
    },
    {
      id: "cto",
      name: "Sarah Rodriguez",
      role: "Chief Technology Officer",
      bio: "Former Senior AI Scientist at Microsoft Research with expertise in multi-agent systems and distributed AI architectures. PhD in Computer Science from Stanford.",
      expertise: ["Multi-Agent Systems", "AI Strategy", "Operational Optimization"],
      image: "/team/sarah-rodriguez.jpg",
      linkedin: "https://linkedin.com/in/sarahrodriguez-ai",
      email: "sarah@flowfoundry.ai",
      achievements: [
        "Designed AI systems for 50+ enterprises",
        "Expert in distributed multi-agent architectures",
        "Led teams of 20+ AI engineers"
      ]
    },
    {
      id: "head-delivery",
      name: "Michael Park",
      role: "Head of Delivery",
      bio: "Former McKinsey Principal with 12+ years in business transformation and operational excellence. Specialized in AI implementation and change management.",
      expertise: ["Business Transformation", "Operational Optimization", "AI Strategy"],
      image: "/team/michael-park.jpg",
      linkedin: "https://linkedin.com/in/michaelpark-consulting",
      email: "michael@flowfoundry.ai",
      achievements: [
        "Delivered 100+ transformation projects",
        "Achieved average 340% ROI for clients",
        "Expert in organizational change management"
      ]
    },
    {
      id: "lead-engineer",
      name: "Emma Thompson",
      role: "Lead AI Engineer",
      bio: "Former Senior Engineer at OpenAI with deep expertise in large language models and automated reasoning systems. MS in AI from MIT.",
      expertise: ["Multi-Agent Systems", "Operational Optimization"],
      image: "/team/emma-thompson.jpg",
      linkedin: "https://linkedin.com/in/emmathompson-ai",
      email: "emma@flowfoundry.ai",
      achievements: [
        "Built production LLM systems at scale",
        "Contributed to GPT-4 training infrastructure",
        "Expert in automated reasoning and planning"
      ]
    },
    {
      id: "business-strategist",
      name: "David Kumar",
      role: "Senior Business Strategist",
      bio: "Former Director of Strategy at Accenture with 10+ years helping SMBs adopt emerging technologies. Expert in AI ROI measurement and business case development.",
      expertise: ["Business Transformation", "AI Strategy"],
      image: "/team/david-kumar.jpg",
      linkedin: "https://linkedin.com/in/davidkumar-strategy",
      email: "david@flowfoundry.ai",
      achievements: [
        "Helped 200+ SMBs adopt AI technology",
        "Developed proprietary ROI measurement frameworks",
        "Published 'AI Strategy for Small Business' guide"
      ]
    },
    {
      id: "implementation-lead",
      name: "Jennifer Wu",
      role: "Implementation Lead",
      bio: "Former Solutions Architect at AWS with expertise in cloud-native AI systems and enterprise integration. Certified in multiple cloud platforms and AI frameworks.",
      expertise: ["Multi-Agent Systems", "Operational Optimization"],
      image: "/team/jennifer-wu.jpg",
      linkedin: "https://linkedin.com/in/jenniferwu-cloud",
      email: "jennifer@flowfoundry.ai",
      achievements: [
        "Deployed 75+ cloud-native AI solutions",
        "Expert in enterprise systems integration",
        "AWS, Azure, and GCP certified architect"
      ]
    }
  ]
}

export default async function AboutPage() {
  const teamMembers = await getTeamMembers()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-background via-background to-muted/50">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            About Flowfoundry
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We&apos;re on a mission to make enterprise-level AI accessible to every business. 
            Our team of AI experts and business strategists helps companies transform 
            their operations and achieve unprecedented growth.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <div className="container mx-auto px-6 lg:px-8">
        <Suspense fallback={<TeamSkeleton />}>
          <TeamSection members={teamMembers} />
        </Suspense>

        {/* Mission Section */}
        <Suspense fallback={<MissionSkeleton />}>
          <MissionSection />
        </Suspense>
      </div>
    </div>
  )
}
