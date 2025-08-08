// Sanity CMS schema types for Stratalace

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

// Basic case study preview interface for listings
export interface CaseStudyPreview {
  id: string
  title: string
  client: string
  industry: string
  challenge: string
  solution: string
  results: {
    roi: string
    timeframe: string
    primaryMetric: string
    primaryMetricValue: string
  }
  coverImage: string
  tags: string[]
  featured: boolean
}

// Comprehensive case study interface for detailed views
export interface CaseStudy {
  // Basic Information
  title: string
  slug: string
  client: {
    name: string
    industry: string
    size: string
    location: string
    website?: string
  }
  
  // Challenge Section
  challenge: {
    overview: string
    specificProblems: string[]
    businessImpact: string[]
    urgency: string
    previousAttempts?: string[]
  }
  
  // Solution Section
  solution: {
    overview: string
    servicesUsed: string[]
    technicalApproach: string
    innovations: string[]
    timeline: {
      phase: string
      duration: string
      activities: string[]
    }[]
    teamInvolved: string[]
  }
  
  // Implementation Section
  implementation: {
    methodology: string
    phases: {
      name: string
      duration: string
      deliverables: string[]
      challenges: string[]
      solutions: string[]
    }[]
    changeManagement: string[]
    training: string[]
  }
  
  // Results Section
  results: {
    overview: string
    quantifiedResults: {
      metric: string
      before: string
      after: string
      improvement: string
      timeframe: string
    }[]
    qualitativeResults: string[]
    clientFeedback: string[]
    longTermImpact: string[]
  }
  
  // Media & Assets
  media: {
    heroImage: string
    gallery: string[]
    diagrams: string[]
    videos?: string[]
    beforeAfterImages?: string[]
  }
  
  // Testimonial
  testimonial: {
    quote: string
    author: string
    authorRole: string
    authorImage?: string
    company: string
    fullReview?: string
  }
  
  // Related Content
  relatedServices: string[]
  relatedCaseStudies: string[]
  tags: string[]
  featured: boolean
  publishDate: string
  lastUpdated: string
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

// Contact form interfaces for Phase 3 multi-step form
export interface ContactMethods {
  phone: {
    main: string
    emergency: string
    hours: string
  }
  email: {
    general: string
    sales: string
    support: string
    emergency: string
  }
  address: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  social: {
    linkedin: string
    twitter: string
  }
}

export interface ContactFormData {
  // Step 1: Project Type & Urgency
  primaryChallenge: string
  urgency: string
  
  // Step 2: Company Information
  companyName: string
  website: string
  industry: string
  companySize: string
  currentTech: string[]
  previousAIExperience: string
  
  // Step 3: Project Scope & Budget
  projectScope: string
  expectedOutcomes: string[]
  budgetRange: string
  timeline: string
  decisionMakers: string
  stakeholders: string[]
  
  // Step 4: Contact Details & Preferences
  contactName: string
  email: string
  phone: string
  preferredContact: string
  consultationTime: string
  specificQuestions: string
}

export interface ContactFormState {
  currentStep: number
  formData: Partial<ContactFormData>
  errors: Record<string, string>
  isSubmitting: boolean
  leadScore: LeadScore
}

export interface LeadScore {
  budget: number        // 0-30 points
  urgency: number       // 0-25 points  
  companySize: number   // 0-20 points
  techReadiness: number // 0-15 points
  decisionMaker: number // 0-10 points
  total: number         // 0-100 points
  tier: 'high' | 'medium' | 'low'
}
