import { Suspense } from 'react'
import { Metadata } from 'next'
import { TeamSection } from '@/components/marketing/TeamSection'
import { MissionSection } from '@/components/marketing/MissionSection'
import { TeamSkeleton } from '@/components/skeletons/TeamSkeleton'
import { MissionSkeleton } from '@/components/skeletons/MissionSkeleton'

export const metadata: Metadata = {
  title: 'About FlowFoundry - Technology Consultancy & Web Development Experts',
  description: 'Meet the FlowFoundry team: Technology consultants and web development experts from Google, Microsoft, and top consulting firms. 15+ years experience, 100+ successful projects, and proven 340% ROI results.',
  keywords: [
    'technology consultants',
    'web development experts',
    'digital transformation consultants',
    'full-stack developers',
    'React Next.js experts',
    'technology strategy',
    'system architecture',
    'cloud deployment experts',
    'performance optimization',
    'AI-enhanced solutions'
  ],
  openGraph: {
    title: 'About FlowFoundry - Technology Consultancy & Web Development Experts',
    description: 'Meet our technology consultants and web development experts from Google, Microsoft, and top firms. 15+ years experience, 100+ successful projects, and proven 340% ROI results.',
    url: 'https://flowfoundry.ai/about',
    images: [
      {
        url: '/og-image-about.png',
        width: 1200,
        height: 630,
        alt: 'FlowFoundry Team - Technology Consultants and Web Development Experts',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About FlowFoundry - Technology Consultancy & Web Development Experts',
    description: 'Meet our technology consultants and web development experts from Google, Microsoft, and top firms. 15+ years experience, 100+ successful projects, and proven 340% ROI results.',
    images: ['/og-image-about.png'],
  },
  alternates: {
    canonical: 'https://flowfoundry.ai/about',
  },
}

// Async function to fetch team members (placeholder for future Sanity CMS integration)
async function getTeamMembers() {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 200))
  
  return [
    {
      id: "founder-ceo",
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Former Principal Engineer at Google with 15+ years in web development, system architecture, and business transformation. Led technology initiatives at 3 Fortune 500 companies before founding Flowfoundry.",
      expertise: ["Technology Strategy", "Web Development", "System Architecture"],
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
      bio: "Former Senior Software Engineer at Microsoft with expertise in distributed systems, cloud architecture, and full-stack development. PhD in Computer Science from Stanford.",
      expertise: ["System Architecture", "Cloud Infrastructure", "Full-Stack Development"],
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
      bio: "Former McKinsey Principal with 12+ years in digital transformation and technology consulting. Specialized in web platform implementation and change management.",
      expertise: ["Digital Transformation", "Technology Consulting", "Project Management"],
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
      role: "Lead Full-Stack Developer",
      bio: "Former Senior Engineer at Meta with deep expertise in React, Next.js, and scalable web applications. MS in Computer Science from MIT.",
      expertise: ["React/Next.js Development", "Performance Optimization"],
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
      role: "Senior Technology Strategist",
      bio: "Former Director of Strategy at Accenture with 10+ years helping SMBs adopt modern web technologies. Expert in technology ROI measurement and digital strategy development.",
      expertise: ["Technology Strategy", "Digital Transformation"],
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

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://flowfoundry.ai/about#aboutpage",
        "url": "https://flowfoundry.ai/about",
        "name": "About FlowFoundry",
        "description": "Learn about FlowFoundry's technology consultants and web development experts with proven track records at Google, Microsoft, and top consulting firms.",
        "mainEntity": {
          "@id": "https://flowfoundry.ai/#organization"
        }
      },
      ...teamMembers.map((member) => ({
        "@type": "Person",
        "@id": `https://flowfoundry.ai/about#${member.id}`,
        "name": member.name,
        "jobTitle": member.role,
        "description": member.bio,
        "url": member.linkedin,
        "email": member.email,
        "image": `https://flowfoundry.ai${member.image}`,
        "worksFor": {
          "@id": "https://flowfoundry.ai/#organization"
        },
        "knowsAbout": member.expertise,
        "hasCredential": member.achievements
      })),
      {
        "@type": "BreadcrumbList",
        "@id": "https://flowfoundry.ai/about#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@id": "https://flowfoundry.ai",
              "name": "Home"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@id": "https://flowfoundry.ai/about",
              "name": "About"
            }
          }
        ]
      }
    ]
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Hero Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-background via-background to-muted/50">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            About Flowfoundry
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We&apos;re on a mission to make modern web technology and digital solutions accessible to every business. 
            Our team of technology consultants and web development experts helps companies transform 
            their digital presence and achieve unprecedented growth.
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
