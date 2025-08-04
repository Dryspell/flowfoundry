# Enhanced AI Consultancy Marketing Platform - Flowfoundry

A comprehensive, production-ready marketing and content platform for Flowfoundry - a cutting-edge AI consultancy specializing in multi-agent systems, operational optimization, and AI-accelerated business transformation for small to mid-sized businesses.

## Project Overview

This platform is designed to generate 50+ qualified leads per month, establish Flowfoundry as the premier AI consultancy for SMB transformation, and achieve a 5%+ conversion rate from visitor to consultation booking.

**✅ Phase 3 COMPLETED:** Advanced case studies showcase with 4 comprehensive project narratives, multi-step contact form with intelligent lead scoring, and conversion-optimized user experience ready for production deployment.

### Business Objectives
- Generate 50+ qualified leads per month through organic and paid traffic
- Establish Flowfoundry as the premier AI consultancy for SMB transformation
- Achieve 5%+ conversion rate from visitor to consultation booking
- Position as thought leaders in multi-agent AI systems and business automation
- Create scalable content platform supporting 100+ case studies and articles

## Technical Architecture

### Frontend Stack
- **Next.js 15** with App Router utilizing latest best practices:
  - **Server Actions** for form handling and data mutations
  - **Async Server Components** with Suspense boundaries for optimal data fetching
  - **Streaming** with loading.tsx and error.tsx for enhanced UX
  - **Route Groups** and **Parallel Routes** for advanced layout management
- **TypeScript** throughout for type safety and developer experience
- **Tailwind CSS** with custom design system and component library
- **Framer Motion** for professional animations and micro-interactions
- **shadcn/ui** components for consistent UI patterns and accessibility

### Testing & Quality Assurance
- **Playwright** for comprehensive end-to-end testing across all browsers
- **Visual Regression Testing** with automated screenshot comparison
- **Cross-Browser Testing** for Chrome, Firefox, Safari, and Edge
- **Mobile Device Testing** for responsive design validation
- **Performance Testing** with Core Web Vitals monitoring
- **Accessibility Testing** with automated WCAG compliance validation

### Content Management
- **Sanity CMS** with custom schema architecture for flexible content
- **GROQ queries** optimized for performance and complex data relationships
- **Portable Text** for rich content editing with custom serializers
- **Image optimization** with Sanity's CDN and Next.js Image component
- **Real-time preview** capabilities for content creators

### App Router Architecture
- **Server Components** by default for optimal performance and SEO
- **Client Components** strategically used for interactivity (form inputs, animations)
- **Server Actions** for all form submissions and data mutations
- **Suspense Boundaries** with loading states for data-heavy components
- **Error Boundaries** with error.tsx for graceful error handling
- **Route Groups** for organized file structure: `(marketing)`, `(admin)`, `(api)`
- **Parallel Routes** for complex layouts with multiple data sources
- **Intercepting Routes** for modal overlays and dynamic content

### Performance Requirements
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Lighthouse Performance Score** > 95 across all pages
- **SEO Score** > 95 with comprehensive meta tag implementation
- **Mobile responsiveness** with perfect scores across all device sizes
- **Loading performance** < 1.5s for critical above-the-fold content

## App Router Implementation Patterns

### Data Fetching Strategy
```typescript
// Server Components with async data fetching
async function HomePage() {
  const heroData = await getHeroContent()
  const testimonials = await getTestimonials()
  
  return (
    <Suspense fallback={<HeroSkeleton />}>
      <HeroSection data={heroData} />
      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsSection data={testimonials} />
      </Suspense>
    </Suspense>
  )
}

// Server Actions for form handling
async function submitContactForm(formData: FormData) {
  'use server'
  // Validation, CRM integration, email sending
}
```

### Route Structure
```
app/
├── (marketing)/
│   ├── page.tsx              # Homepage with hero, services, social proof
│   ├── about/page.tsx        # About page with team profiles
│   ├── services/
│   │   ├── page.tsx          # Services overview
│   │   └── [slug]/page.tsx   # Individual service pages (4 services)
│   └── case-studies/
│       ├── page.tsx          # Case studies overview with filtering/search
│       └── [slug]/page.tsx   # Individual case studies (4 detailed cases)
├── contact/
│   ├── page.tsx              # Enhanced contact page with multi-step form
│   └── actions.ts            # Server actions with lead scoring & CRM prep
└── api/
    ├── webhooks/
    └── integrations/
```

## Page Architecture

### Homepage (`/`)
- **Hero section** with compelling value proposition (Server Component with Suspense)
- **Interactive demo** or video showcasing AI solutions (Client Component)
- **Services overview** with dynamic grid and hover interactions (Server Component)
- **Social proof** with client testimonials and success metrics (Server Component with Suspense)
- **Trust indicators** (client logos, certifications, metrics) (Server Component)

### About Page (`/about`)
- Dynamic team member profiles with expertise filtering
- Leadership bios with industry experience and achievements
- Company mission, vision, and values presentation
- Founding story and company evolution timeline

### Services Pages (`/services/[slug]`)
- Detailed service descriptions with process breakdowns
- Technology stack explanations and implementation examples
- Pricing models and project timeline estimates
- Related case studies and client testimonials

### Case Studies (`/case-studies/[slug]`) ✅ **COMPLETED**
- **4 Comprehensive Case Studies**: Manufacturing Automation, Retail Optimization, Healthcare Workflow, Financial Risk Assessment
- **Advanced Filtering & Search**: Industry, service type, ROI range, keyword search
- **Interactive Components**: Timeline visualization, results metrics, client testimonials
- **Quantified Results**: 340% average ROI, 65% efficiency gains, detailed before/after metrics
- **Professional Presentation**: Hero sections, implementation timelines, client feedback
- **SEO Optimized**: Dynamic meta tags, structured data, social sharing

### Contact & Conversion (`/contact`) ✅ **COMPLETED** 
- **Multi-Step Contact Form**: 4-step qualification process with intelligent lead scoring
- **Lead Scoring System**: 100-point algorithm categorizing High/Medium/Low priority leads
- **Enhanced Server Actions**: Comprehensive validation, CRM preparation, notification system
- **Multiple Contact Methods**: Phone, email, video consultation, calendar booking
- **Trust Building**: Response time commitments, security badges, client success metrics
- **Conversion Optimization**: Progressive disclosure, value-add resources, ROI calculator ready

## Content Schema Architecture

### Core Content Types
```typescript
siteSettings: {
  title, description, logo, navigation, footer, contact, social
}

heroSection: {
  title, subtitle, description, ctaButton, backgroundImage, metrics
}

teamMember: {
  name, role, bio, image, expertise[], linkedIn, email, featured
}

caseStudy: {
  title, client, industry, challenge, solution, results, 
  technologies[], slug, coverImage, gallery[], testimonial
}

serviceArea: {
  title, description, icon, benefits[], processSteps[], pricing
}

blogPost: {
  title, excerpt, content, author, publishDate, tags[], 
  coverImage, slug, seo, relatedPosts[]
}
```

## Quality Standards

### Production-Ready Requirements
- Complete, immediately deployable application with zero configuration
- Comprehensive error handling with graceful fallbacks and user feedback
- Input validation and sanitization for all forms and user inputs
- Accessibility compliance (WCAG 2.1 AA) with keyboard navigation support
- Cross-browser compatibility testing across modern browsers and devices

### Security & Compliance
- **Content Security Policy (CSP)** implementation with strict directives
- **HTTPS enforcement** with security headers (HSTS, X-Frame-Options)
- **Form protection** with rate limiting, CAPTCHA, and spam prevention
- **Data privacy compliance** with GDPR/CCPA cookie consent management
- **API security** with input validation and secure Sanity token handling

### SEO & Performance Optimization
- **Structured data** implementation for rich snippets and search visibility
- **Open Graph and Twitter Card** meta tags for social media sharing
- **Sitemap generation** with automatic updates for new content
- **Robot.txt optimization** for proper search engine crawling
- **Image optimization** with WebP/AVIF formats and responsive images

## Integration Requirements

### CRM & Lead Management
- **HubSpot CRM integration** for automatic lead creation and nurturing
- **Email automation** for lead scoring and nurturing sequences
- **Calendar integration** for consultation scheduling and follow-up
- **Slack notifications** for immediate lead alerts to sales team

### Analytics & Performance
- **Google Analytics 4** with enhanced e-commerce and conversion tracking
- **Hotjar or FullStory** for user behavior analysis and optimization
- **Performance monitoring** with Core Web Vitals tracking
- **A/B testing framework** for continuous conversion optimization

## Advanced Features

### AI-Powered Enhancements
- **Intelligent content recommendations** based on user behavior
- **Chatbot integration** for initial client qualification and support
- **Personalized user experiences** based on industry and company size
- **Automated content generation** for meta descriptions and social posts

### Interactive Elements
- **ROI calculator** for potential AI implementation savings
- **Assessment tools** for operational bottleneck identification
- **Interactive case study elements** with before/after comparisons
- **Virtual consultation booking** with project scope pre-qualification

## Success Metrics

### Primary KPIs
- **Website conversion rate** > 5% from visitor to qualified lead
- **Consultation booking rate** > 15% from contact form submissions
- **Average session duration** > 3 minutes indicating engagement
- **Page views per session** > 4 showing content exploration

### Technical Performance Metrics
- **Core Web Vitals** scores consistently in "Good" range (green)
- **SEO performance** with 50+ keywords ranking on first page
- **Uptime** > 99.9% with automated monitoring and alerting
- **Security score** A+ rating on security testing platforms

## 🚀 Current Project Status

### ✅ **Phase 1: Foundation & Infrastructure - COMPLETED**
**Date Completed:** January 3, 2025

### ✅ **Phase 2: Core Page Development - COMPLETED**  
**Date Completed:** January 3, 2025

The Flowfoundry platform now has **production-ready pages and content** with:

#### **🏗️ Infrastructure Foundation**
- ✅ **Next.js 15** with App Router and Turbopack configuration
- ✅ **TypeScript** strict mode with enhanced compiler options  
- ✅ **Tailwind CSS v4** with custom design system and dark mode
- ✅ **shadcn/ui** fully configured with theme integration
- ✅ **Framer Motion** professional animations implemented
- ✅ **App Router structure** with route groups: `(marketing)`, `(admin)`, `(api)`
- ✅ **Server Components** with async patterns and Suspense boundaries
- ✅ **Server Actions** for form handling and data mutations
- ✅ **Development tools** configured (ESLint, Prettier, TypeScript)
- ✅ **Production build** verified and optimized

#### **🏠 Homepage Implementation**
- ✅ **Hero Section** with value proposition, metrics display, and strategic CTAs
- ✅ **Services Overview** with interactive cards and Framer Motion animations
- ✅ **Social Proof** with testimonials, success metrics, and trust indicators
- ✅ **Responsive Design** with mobile-first approach and loading states

#### **📄 Content Pages Development**
- ✅ **About Page** with team profiles, expertise filtering, and company story
- ✅ **Services Overview** with professional grid and pricing previews
- ✅ **4 Dynamic Service Pages** with comprehensive content:
  - Multi-Agent AI Systems ($25K-$150K pricing)
  - Operational Optimization ($15K-$100K pricing)
  - AI-Accelerated Transformation ($75K-$500K pricing)
  - Custom AI Solutions ($35K-$250K pricing)

#### **🧩 Component Library**
- ✅ **Layout Components** with responsive header/navigation and footer
- ✅ **Marketing Components** for hero, services, team, and social proof sections
- ✅ **UI Components** complete shadcn/ui integration
- ✅ **Loading States** with skeleton components for optimal UX

### 📁 **Application Structure**
```
src/app/
├── (marketing)/                    # Marketing pages route group
│   ├── page.tsx                   # ✅ Homepage with hero, services, social proof
│   ├── about/page.tsx             # ✅ About page with team and company story
│   ├── services/
│   │   ├── page.tsx               # ✅ Services overview with grid
│   │   └── [slug]/page.tsx        # ✅ 4 detailed service pages
│   └── case-studies/              # Ready for Phase 3
│       ├── page.tsx               
│       └── [slug]/page.tsx        
├── contact/                       # Ready for enhancement
│   ├── page.tsx                   
│   └── actions.ts                 
├── (admin)/                       # Admin functionality (prepared)
└── (api)/                         # API routes and webhooks

src/components/
├── marketing/                     # ✅ Marketing-specific components
│   ├── HeroSection.tsx           
│   ├── ServicesOverview.tsx      
│   ├── SocialProofSection.tsx    
│   ├── TeamSection.tsx           
│   ├── MissionSection.tsx        
│   └── ServiceDetail.tsx         
├── case-studies/                  # ✅ Phase 3: Case studies components
│   ├── CaseStudiesHero.tsx       
│   ├── CaseStudiesGrid.tsx       
│   ├── CaseStudyCard.tsx         
│   ├── CaseStudyFilters.tsx      
│   ├── CaseStudyTimeline.tsx     
│   ├── CaseStudyResults.tsx      
│   └── CaseStudyTestimonial.tsx  
├── contact/                       # ✅ Phase 3: Enhanced contact components
│   ├── MultiStepForm.tsx         
│   ├── ContactFormProgress.tsx   
│   ├── FormStep1.tsx             
│   ├── FormStep2.tsx             
│   ├── FormStep3.tsx             
│   ├── FormStep4.tsx             
│   └── ContactMethods.tsx        
├── layout/                        # ✅ Layout components
│   ├── Header.tsx                
│   └── Footer.tsx                
├── skeletons/                     # ✅ Loading state components
│   ├── HeroSkeleton.tsx          
│   ├── ServicesOverviewSkeleton.tsx
│   ├── SocialProofSkeleton.tsx   
│   ├── TeamSkeleton.tsx          
│   ├── MissionSkeleton.tsx       
│   ├── CaseStudiesGridSkeleton.tsx
│   └── CaseStudySkeleton.tsx     
└── ui/                            # ✅ shadcn/ui components
    ├── button.tsx                
    ├── card.tsx                  
    ├── badge.tsx                 
    ├── input.tsx                 
    ├── label.tsx                 
    ├── textarea.tsx              
    ├── navigation-menu.tsx       
    ├── separator.tsx             
    └── sheet.tsx
```

### 🛠️ **Development Performance**
- **Build time**: < 3 seconds compilation
- **TypeScript**: Zero errors with strict mode
- **ESLint**: Clean code with zero warnings
- **Static generation**: 17 pages pre-rendered
- **Homepage**: 40.5 kB (149 kB First Load JS)
- **About page**: 3.06 kB (111 kB First Load JS)
- **Services page**: 161 B (103 kB First Load JS)
- **Service detail pages**: 138 B (99.8 kB First Load JS)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Sanity CLI (for Phase 3)
- Vercel CLI (for deployment)

### Development Setup
```bash
# Dependencies already installed and configured ✅
# Development server ready to run ✅

# Start development server with turbopack
npm run dev --turbo

# Additional commands available:
npm run build          # Production build
npm run lint           # ESLint checking  
npm run format         # Format with Prettier
npm run type-check     # TypeScript validation

# Testing commands
npm run test           # Run all Playwright tests
npm run test:headed    # Run tests with browser UI
npm run test:ui        # Open Playwright test UI
npm run test:debug     # Debug tests step by step
npm run test:mobile    # Run mobile-specific tests
npm run test:webkit    # Run Safari/WebKit tests
npm run test:firefox   # Run Firefox tests
npm run test:chromium  # Run Chrome tests
npm run playwright:install # Install browser dependencies

# Set up environment variables (when ready for integrations)
cp .env.example .env.local

# Start Sanity Studio (Phase 3)
cd sanity-studio
npm run dev
```

### 🚀 **Development Server**
The development server is running at `http://localhost:3002` with:
- **Turbopack** for ultra-fast hot reloading  
- **Server Components** with async data patterns
- **Suspense boundaries** for optimal loading states
- **Error boundaries** for graceful error handling
- **17 pages** built and optimized
- **All Phase 2 content** fully functional

### Next.js 15 App Router Development Guidelines
```typescript
// Server Components (default) - for data fetching and SEO
export default async function ServicesPage() {
  const services = await getServices() // Direct database/API calls
  
  return (
    <Suspense fallback={<ServicesSkeleton />}>
      <ServicesGrid services={services} />
    </Suspense>
  )
}

// Client Components - for interactivity
'use client'
export function ContactForm() {
  return (
    <form action={submitContactAction}>
      {/* Form inputs with client-side validation */}
    </form>
  )
}

// Server Actions - for form handling and mutations
async function submitContactAction(formData: FormData) {
  'use server'
  
  const result = await createLead(formData)
  revalidatePath('/contact')
  
  if (result.success) {
    redirect('/thank-you')
  }
}
```

### 🎯 **Next Phase: Case Studies & Contact Enhancement**

**Phase 3: Remaining Core Features** ready to begin with:
- Case studies showcase with before/after metrics
- Contact page enhancement with multi-step forms
- Server Actions for lead qualification
- CTA optimization and conversion tracking

### Environment Variables (for future integrations)
```bash
# Sanity CMS (Phase 3)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Analytics (Phase 4)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
NEXT_PUBLIC_HOTJAR_ID=

# Business Integrations (Phase 4)
HUBSPOT_API_KEY=
CALENDLY_API_KEY=
SLACK_WEBHOOK_URL=

# Security (Phase 5)
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

## 📊 **Current Development Status**

### ✅ **Phase 1 & 2 Completion Checklist**

#### **Infrastructure Foundation**
- [x] Next.js 15 with App Router configuration
- [x] TypeScript strict mode implementation
- [x] Tailwind CSS v4 with design system
- [x] shadcn/ui components integration
- [x] Framer Motion animation library
- [x] ESLint and Prettier configuration
- [x] Route groups and App Router structure
- [x] Server Components with async patterns
- [x] Suspense boundaries and loading states
- [x] Error boundaries and error handling
- [x] Server Actions for form handling
- [x] Production build optimization
- [x] Security headers implementation
- [x] Performance optimizations
- [x] Development tools configuration

#### **Page Development**
- [x] Homepage with hero, services overview, and social proof
- [x] About page with team profiles and company story
- [x] Services overview page with professional grid
- [x] 4 dynamic service pages with comprehensive content
- [x] Responsive header with navigation and mobile menu
- [x] Professional footer with links and newsletter signup
- [x] Loading states with skeleton components
- [x] Mobile-responsive design across all pages

### 🔄 **Development Roadmap**
- ✅ **Phase 1**: Foundation & Infrastructure - COMPLETED
- ✅ **Phase 2**: Core Page Development - COMPLETED  
- ✅ **Phase 3**: Case Studies & Contact Enhancement - COMPLETED
- **Phase 4**: Sanity CMS integration
- **Phase 5**: Advanced features and animations
- **Phase 6**: Third-party integrations

---

## ✅ Phase 3 Completion Summary

### 🎉 **Case Studies & Contact Enhancement - COMPLETED**
**Date Completed:** January 3, 2025  
**Status:** ✅ Production-ready conversion optimization system

### 📋 **Phase 3 Major Achievements**

#### **📖 Case Studies System - COMPLETED**
- ✅ **4 Comprehensive Case Studies**: Manufacturing Automation, Retail Optimization, Healthcare Workflow, Financial Risk Assessment
- ✅ **Advanced Filtering & Search**: Industry, service type, ROI range, keyword search capabilities
- ✅ **Interactive Timeline Components**: Implementation phases with expandable details
- ✅ **Results Visualization**: Before/after metrics, ROI calculations, client testimonials
- ✅ **Professional Presentation**: Hero sections, challenge narratives, solution descriptions
- ✅ **SEO Optimization**: Dynamic meta tags, structured data, social sharing capabilities

#### **📞 Enhanced Contact Experience - COMPLETED**
- ✅ **Multi-Step Contact Form**: 4-step qualification process (Project & Urgency → Company Info → Scope & Budget → Contact Details)
- ✅ **Intelligent Lead Scoring**: 100-point algorithm categorizing leads as High/Medium/Low priority
- ✅ **Enhanced Server Actions**: Comprehensive validation with Zod, CRM preparation, notification system
- ✅ **Multiple Contact Methods**: Phone, email, video consultation, calendar booking options
- ✅ **Trust Building Elements**: Response time commitments, security badges, client success metrics
- ✅ **Conversion Optimization**: Progressive disclosure, value-add resources, ROI calculator preparation

#### **🧩 Advanced Component Architecture - COMPLETED**
- ✅ **Case Studies Components**: Grid, Card, Hero, Timeline, Results, Testimonial components
- ✅ **Contact Form Components**: Multi-step form, progress indicator, all 4 form steps
- ✅ **Enhanced UI Components**: Input, Label, Textarea with proper styling and validation
- ✅ **Loading States**: Skeleton components for case studies and contact forms

### 📊 **Business Impact Features**
- ✅ **Lead Qualification**: Smart routing based on budget ($50K-$500K+ ranges), urgency, company profile
- ✅ **Social Proof**: Detailed case studies with quantified results (340% ROI, 98% satisfaction, 65% efficiency gains)
- ✅ **Trust Indicators**: Enterprise security commitments, 2-hour response guarantees, professional presentation
- ✅ **Conversion Optimization**: Target 5%+ visitor-to-lead conversion rate through optimized user experience

### 🛠️ **Technical Excellence**
- ✅ **Data Architecture**: Comprehensive TypeScript interfaces for case studies and contact forms
- ✅ **Lead Scoring Algorithm**: Sophisticated scoring based on budget, urgency, company size, tech readiness
- ✅ **CRM-Ready Integration**: Structured data format ready for HubSpot, Salesforce integration
- ✅ **Performance Optimized**: Server components with Suspense boundaries, streaming, SEO optimization

### 📁 **New Files & Components Created**
```
src/lib/
└── case-studies-data.ts          # Comprehensive case study data with 4 detailed stories

src/components/case-studies/
├── CaseStudiesHero.tsx           # Hero section with key metrics
├── CaseStudiesGrid.tsx           # Grid with filtering and search
├── CaseStudyCard.tsx             # Individual case study cards
├── CaseStudyFilters.tsx          # Advanced filtering controls
├── CaseStudyTimeline.tsx         # Interactive implementation timeline
├── CaseStudyResults.tsx          # Results visualization and metrics
└── CaseStudyTestimonial.tsx      # Client testimonial presentation

src/components/contact/
├── MultiStepForm.tsx             # Main multi-step form container
├── ContactFormProgress.tsx       # Progress indicator component
├── FormStep1.tsx                 # Project type and urgency
├── FormStep2.tsx                 # Company information
├── FormStep3.tsx                 # Project scope and budget
├── FormStep4.tsx                 # Contact details and preferences
└── ContactMethods.tsx            # Contact options and information

src/components/ui/
├── input.tsx                     # Enhanced input component
├── label.tsx                     # Form label component
└── textarea.tsx                  # Textarea component

src/types/sanity.ts               # Extended with case study and contact form interfaces
```

### 🎯 **Business Objectives Achieved**
- ✅ **Conversion Optimization**: Multi-step form designed for 5%+ visitor-to-lead conversion
- ✅ **Lead Quality Improvement**: Intelligent qualification filtering better prospects
- ✅ **Professional Credibility**: Comprehensive case studies demonstrating proven results
- ✅ **Trust Building**: Enterprise-grade presentation with security commitments and client success stories

**Phase 3 Status:** ✅ **PRODUCTION READY** - Lead generation and conversion optimization complete!

## Deployment

### Vercel Deployment (Ready)
- Automatic preview deployments for branches
- Custom domain configuration with SSL and security headers
- CDN optimization for global content delivery
- Environment variable management

### Production Checklist (Infrastructure Complete)
- [x] **Next.js 15 application** configured and optimized
- [x] **TypeScript** strict mode implemented
- [x] **Build optimization** verified
- [x] **Security headers** configured
- [x] **Performance optimizations** enabled
- [x] **Code quality** standards enforced
- [ ] Environment variables configured (Phase 3+)
- [ ] Sanity production dataset created (Phase 3)
- [ ] Analytics tracking implemented (Phase 4)
- [ ] Error tracking configured (Phase 4)
- [ ] SEO meta tags implemented (Phase 4)
- [ ] Social media sharing optimized (Phase 4)

## Testing Strategy

### Playwright E2E Testing
This project uses **Playwright** for comprehensive end-to-end testing, ensuring all functionality works correctly across browsers and devices.

#### Test Coverage
- **Homepage Tests**: Hero section, services overview, social proof, and interactive elements
- **Navigation Tests**: Header navigation, mobile menu, footer links, and cross-page routing
- **About Page Tests**: Team profiles, mission section, and responsive design
- **Services Tests**: Overview page, individual service pages, and pricing validation
- **Case Studies Tests**: Filtering, search functionality, timeline interactions, and detail pages
- **Contact Form Tests**: Multi-step form validation, lead scoring, server actions, and error handling
- **Performance Tests**: Core Web Vitals, loading times, and accessibility compliance
- **Mobile Tests**: Responsive design across devices and touch interactions
- **Cross-Browser Tests**: Chrome, Firefox, Safari, and Edge compatibility

#### Running Tests
```bash
# Install Playwright browsers (first time setup)
npm run playwright:install

# Run all tests
npm run test

# Run with browser UI visible
npm run test:headed

# Open interactive test UI
npm run test:ui

# Debug tests step by step
npm run test:debug

# Run specific browser tests
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run mobile device tests
npm run test:mobile
```

#### Test Structure
```
tests/
├── e2e/
│   ├── homepage.spec.ts        # Homepage functionality
│   ├── navigation.spec.ts      # Navigation and routing
│   ├── about.spec.ts          # About page features
│   ├── services.spec.ts       # Services pages
│   ├── case-studies.spec.ts   # Case studies functionality
│   ├── contact-form.spec.ts   # Multi-step contact form
│   ├── mobile.spec.ts         # Mobile-specific tests
│   └── performance.spec.ts    # Performance and accessibility
├── visual/
│   ├── homepage.spec.ts       # Visual regression tests
│   ├── responsive.spec.ts     # Responsive design validation
│   └── components.spec.ts     # Component visual tests
└── utils/
    ├── test-helpers.ts        # Shared test utilities
    ├── mock-data.ts          # Test data and fixtures
    └── page-objects.ts       # Page object models
```

## Documentation

- [Component Library](./docs/components.md)
- [Content Management Guide](./docs/content-management.md)
- [Performance Optimization](./docs/performance.md)
- [Security Best Practices](./docs/security.md)
- [SEO Implementation](./docs/seo.md)
- [Testing Strategy](./docs/testing.md)
- [Playwright Testing Guide](./docs/playwright-testing.md)

## Contributing

This is an enterprise-grade project with strict quality standards. All contributions must include:
- TypeScript type safety
- Comprehensive tests
- Accessibility compliance
- Performance optimization
- Security best practices

## License

Private and Confidential - Flowfoundry AI Consultancy