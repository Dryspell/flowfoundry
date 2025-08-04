import { Suspense } from 'react'
import { HeroSection } from '@/components/marketing/HeroSection'
import { ServicesOverview } from '@/components/marketing/ServicesOverview'
import { SocialProofSection } from '@/components/marketing/SocialProofSection'
import { HeroSkeleton } from '@/components/skeletons/HeroSkeleton'
import { ServicesOverviewSkeleton } from '@/components/skeletons/ServicesOverviewSkeleton'
import { SocialProofSkeleton } from '@/components/skeletons/SocialProofSkeleton'

// Async function to fetch hero metrics (placeholder for future Sanity CMS integration)
async function getHeroMetrics() {
  // Simulate API call delay for demonstration
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    clientsServed: "150+",
    averageROI: "340%",
    projectsCompleted: "200+",
    monthsSaved: "2,400+"
  }
}

export default async function HomePage() {
  const heroMetrics = await getHeroMetrics()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection metrics={heroMetrics} />
      </Suspense>

      {/* Services Overview Section */}
      <Suspense fallback={<ServicesOverviewSkeleton />}>
        <ServicesOverview />
      </Suspense>

      {/* Social Proof Section */}
      <Suspense fallback={<SocialProofSkeleton />}>
        <SocialProofSection />
      </Suspense>
    </div>
  )
}
