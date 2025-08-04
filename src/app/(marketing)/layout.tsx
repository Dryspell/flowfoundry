import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with navigation */}
      <Suspense fallback={<div className="h-16 bg-background border-b animate-pulse" />}>
        <Header />
      </Suspense>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <Suspense fallback={<div className="h-32 bg-muted/30 animate-pulse" />}>
        <Footer />
      </Suspense>
    </div>
  )
}
