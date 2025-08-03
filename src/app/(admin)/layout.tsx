// Admin layout for future admin functionality
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* TODO: Add admin authentication check */}
      {/* TODO: Add admin navigation */}

      <div className="container mx-auto py-8">
        <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>
        <p className="mb-8 text-muted-foreground">
          Coming soon: Admin functionality for content management
        </p>

        <main>{children}</main>
      </div>
    </div>
  )
}
