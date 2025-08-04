import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { ServiceDetail } from '@/components/marketing/ServiceDetail'
import { getServiceBySlug, getAllServiceSlugs } from '@/lib/services-data'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

// Dynamic service pages with generateStaticParams
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  
  // Simulate async data fetching delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const service = getServiceBySlug(slug)
  
  if (!service) {
    notFound()
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading service details...</p>
      </div>
    </div>}>
      <ServiceDetail service={service} />
    </Suspense>
  )
}
