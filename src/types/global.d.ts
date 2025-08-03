// Global type definitions for the Flowfoundry platform

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Sanity CMS
      NEXT_PUBLIC_SANITY_PROJECT_ID: string
      NEXT_PUBLIC_SANITY_DATASET: string
      SANITY_API_TOKEN: string

      // Analytics
      NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: string
      NEXT_PUBLIC_HOTJAR_ID: string

      // Integrations
      HUBSPOT_API_KEY: string
      CALENDLY_API_KEY: string
      SLACK_WEBHOOK_URL: string

      // Security
      NEXTAUTH_SECRET: string
      NEXTAUTH_URL: string
    }
  }
}

export {}
