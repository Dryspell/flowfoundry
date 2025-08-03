// Sanity CMS schema types for Flowfoundry

export interface SiteSettings {
  title: string
  description: string
  logo?: {
    asset: {
      url: string
    }
  }
  navigation: NavigationItem[]
  footer: FooterSettings
  contact: ContactInfo
  social: SocialLinks
}

export interface NavigationItem {
  title: string
  href: string
  children?: NavigationItem[]
}

export interface FooterSettings {
  copyright: string
  links: NavigationItem[]
}

export interface ContactInfo {
  email: string
  phone?: string
  address?: string
}

export interface SocialLinks {
  linkedin?: string
  twitter?: string
  github?: string
}

export interface HeroSection {
  title: string
  subtitle?: string
  description: string
  ctaButton: {
    text: string
    href: string
  }
  backgroundImage?: {
    asset: {
      url: string
    }
  }
  metrics?: Metric[]
}

export interface Metric {
  label: string
  value: string
  description?: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  image?: {
    asset: {
      url: string
    }
  }
  expertise: string[]
  linkedIn?: string
  email?: string
  featured: boolean
}

export interface CaseStudy {
  title: string
  slug: string
  client: string
  industry: string
  challenge: string
  solution: string
  results: string
  technologies: string[]
  coverImage?: {
    asset: {
      url: string
    }
  }
  gallery?: Array<{
    asset: {
      url: string
    }
  }>
  testimonial?: Testimonial
}

export interface ServiceArea {
  title: string
  slug: string
  description: string
  icon?: string
  benefits: string[]
  processSteps: ProcessStep[]
  pricing?: PricingInfo
}

export interface ProcessStep {
  title: string
  description: string
  duration?: string
}

export interface PricingInfo {
  startingPrice?: number
  priceRange?: string
  billingType: 'project' | 'hourly' | 'monthly'
}

export interface BlogPost {
  title: string
  slug: string
  excerpt: string
  content: unknown // Portable Text content
  author: TeamMember
  publishDate: string
  tags: string[]
  coverImage?: {
    asset: {
      url: string
    }
  }
  seo: SEOSettings
  relatedPosts?: BlogPost[]
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
  image?: {
    asset: {
      url: string
    }
  }
}

export interface SEOSettings {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  noIndex?: boolean
}
