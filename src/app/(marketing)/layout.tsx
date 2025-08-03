import { Suspense } from 'react'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Marketing-specific layout structure */}
      <Suspense fallback={<div>Loading header...</div>}>
        {/* TODO: Add Header component */}
      </Suspense>

      <main className="flex-1">{children}</main>

      <Suspense fallback={<div>Loading footer...</div>}>
        {/* TODO: Add Footer component */}
      </Suspense>
    </div>
  )
}
