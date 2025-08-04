# Comprehensive Playwright Testing Development Prompt

## Project Overview

Flowfoundry is a production-ready AI consultancy marketing platform built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui** components. The platform includes sophisticated multi-step forms, dynamic routing, case studies filtering, and Server Actions for lead management.

Your task is to develop a comprehensive Playwright testing suite that covers all functionality, ensures cross-browser compatibility, validates performance, and provides visual regression testing.

## Current Platform Features to Test

### 1. Homepage (`/`)
- **Hero Section**: Value proposition, metrics display, primary CTA buttons
- **Services Overview**: Interactive service cards with hover animations
- **Social Proof**: Client testimonials, success metrics, trust indicators
- **Responsive Design**: Mobile-first approach with touch interactions
- **Performance**: Core Web Vitals, loading states, skeleton components

### 2. About Page (`/about`)
- **Team Profiles**: Dynamic team member cards with expertise filtering
- **Mission Section**: Company story and values presentation
- **Leadership Bios**: Detailed profiles with industry experience
- **Responsive Navigation**: Header with mobile menu functionality

### 3. Services (`/services`)
- **Services Overview**: Grid layout with pricing previews
- **Individual Service Pages** (`/services/[slug]`):
  - Multi-Agent AI Systems ($25K-$150K)
  - Operational Optimization ($15K-$100K)
  - AI-Accelerated Transformation ($75K-$500K)
  - Custom AI Solutions ($35K-$250K)
- **Dynamic Routing**: generateStaticParams implementation
- **Pricing Validation**: Accurate pricing display and calculations

### 4. Case Studies (`/case-studies`)
- **Overview Page**: Grid with filtering and search capabilities
- **Advanced Filtering**: Industry, service type, ROI range, keywords
- **Individual Case Studies** (`/case-studies/[slug]`):
  - Manufacturing Automation (340% ROI)
  - Retail Optimization (45% efficiency)
  - Healthcare Workflow (98% satisfaction)
  - Financial Risk Assessment (65% accuracy)
- **Interactive Elements**: Timeline components, results visualization
- **Search Functionality**: Real-time filtering and keyword search

### 5. Contact Form (`/contact`) - CRITICAL TESTING AREA
- **Multi-Step Form** (4 steps with progressive disclosure):
  - **Step 1**: Project type and urgency selection
  - **Step 2**: Company information and industry
  - **Step 3**: Project scope and budget range ($50K-$500K+)
  - **Step 4**: Contact details and preferences
- **Lead Scoring Algorithm**: 100-point intelligent scoring system
- **Server Actions**: Form validation with Zod, CRM preparation
- **Progress Indicator**: Visual step progression
- **Validation**: Comprehensive field validation and error handling
- **Multiple Contact Methods**: Phone, email, calendar booking

### 6. Navigation & Layout
- **Responsive Header**: Desktop navigation with mobile hamburger menu
- **Footer**: Links, newsletter signup, social media
- **Route Groups**: (marketing), (admin), (api) structure
- **Cross-page Navigation**: Smooth routing between all pages

## Technical Implementation Details

### Stack Information
- **Next.js 15** with App Router and Server Components
- **TypeScript** with strict mode
- **Tailwind CSS v4** with custom design system
- **Framer Motion** for animations
- **shadcn/ui** components
- **Server Actions** for form handling
- **Suspense Boundaries** with loading states

### Key Files Structure
```
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                    # Homepage
│   │   ├── about/page.tsx              # About page
│   │   ├── services/
│   │   │   ├── page.tsx                # Services overview
│   │   │   └── [slug]/page.tsx         # Individual services
│   │   └── case-studies/
│   │       ├── page.tsx                # Case studies overview
│   │       └── [slug]/page.tsx         # Individual case studies
│   ├── contact/
│   │   ├── page.tsx                    # Contact page
│   │   └── actions.ts                  # Server actions
│   └── layout.tsx                      # Root layout
├── components/
│   ├── marketing/                      # Marketing components
│   ├── case-studies/                   # Case study components
│   ├── contact/                        # Contact form components
│   ├── layout/                         # Header/Footer
│   └── ui/                            # shadcn/ui components
└── lib/
    ├── case-studies-data.ts           # Case study data
    └── services-data.ts               # Services data
```

## Required Testing Implementation

### 1. Project Setup & Configuration

Create a comprehensive Playwright testing setup with the following requirements:

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'] },
    },
    {
      name: 'tablet',
      use: { ...devices['iPad Pro'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 2. Test File Structure

Create the following test files with comprehensive coverage:

```
tests/
├── e2e/
│   ├── homepage.spec.ts               # Homepage functionality
│   ├── navigation.spec.ts             # Navigation and routing
│   ├── about.spec.ts                  # About page features
│   ├── services.spec.ts               # Services pages
│   ├── case-studies.spec.ts           # Case studies functionality
│   ├── contact-form.spec.ts           # Multi-step contact form
│   ├── mobile.spec.ts                 # Mobile-specific tests
│   └── performance.spec.ts            # Performance and accessibility
├── visual/
│   ├── homepage.spec.ts               # Visual regression tests
│   ├── responsive.spec.ts             # Responsive design validation
│   └── components.spec.ts             # Component visual tests
└── utils/
    ├── test-helpers.ts                # Shared test utilities
    ├── mock-data.ts                   # Test data and fixtures
    └── page-objects.ts                # Page object models
```

### 3. Specific Test Requirements

#### Homepage Tests (`tests/e2e/homepage.spec.ts`)
```typescript
// Required test cases:
- Hero section loads correctly with all elements
- Primary CTA buttons are functional and navigate correctly
- Services overview cards display with proper hover states
- Social proof section loads testimonials and metrics
- Responsive design works on mobile devices
- Loading skeletons appear before content loads
- All links in navigation work correctly
- Footer newsletter signup functions
```

#### Contact Form Tests (`tests/e2e/contact-form.spec.ts`) - HIGHEST PRIORITY
```typescript
// Critical test scenarios:
- Complete multi-step form submission (all 4 steps)
- Step-by-step validation (required fields, email format, etc.)
- Progress indicator updates correctly
- Budget range selection affects lead scoring
- Server Actions handle form submission properly
- Error handling for invalid inputs
- Browser back/forward button handling
- Form data persistence between steps
- Mobile form interaction and validation
- Different contact method selections
- Lead scoring algorithm validation (check 100-point system)
```

#### Case Studies Tests (`tests/e2e/case-studies.spec.ts`)
```typescript
// Test scenarios:
- Case studies grid loads with all 4 case studies
- Filtering by industry, service type, ROI range
- Search functionality with keyword matching
- Individual case study pages load completely
- Timeline components are interactive
- Results visualization displays correctly
- Navigation between case studies works
- Mobile filtering and search experience
```

#### Services Tests (`tests/e2e/services.spec.ts`)
```typescript
// Test scenarios:
- Services overview page displays all 4 services
- Individual service pages load with correct pricing
- Dynamic routing works for all service slugs
- Pricing calculations are accurate
- CTA buttons navigate to contact form
- Responsive design on mobile
```

#### Performance Tests (`tests/e2e/performance.spec.ts`)
```typescript
// Performance requirements:
- Core Web Vitals compliance (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- Lighthouse scores > 95
- Accessibility compliance (WCAG 2.1 AA)
- Loading performance < 1.5s for critical content
- Mobile performance optimization
```

### 4. Page Object Models

Implement page object models for maintainable tests:

```typescript
// utils/page-objects.ts
export class HomePage {
  constructor(private page: Page) {}
  
  async navigateToServices() {
    await this.page.click('[data-testid="services-nav"]');
  }
  
  async clickPrimaryCTA() {
    await this.page.click('[data-testid="hero-cta"]');
  }
  
  // ... more methods
}

export class ContactFormPage {
  constructor(private page: Page) {}
  
  async fillStep1(data: Step1Data) {
    await this.page.selectOption('[data-testid="primary-challenge"]', data.challenge);
    await this.page.selectOption('[data-testid="urgency"]', data.urgency);
    await this.page.click('[data-testid="next-step"]');
  }
  
  async completeEntireForm(formData: CompleteFormData) {
    // Complete all 4 steps with provided data
  }
  
  // ... more methods
}
```

### 5. Test Data and Fixtures

Create comprehensive test data:

```typescript
// utils/mock-data.ts
export const validContactFormData = {
  step1: {
    primaryChallenge: 'operational-optimization',
    urgency: 'within-3-months'
  },
  step2: {
    companyName: 'Test Corp',
    website: 'https://testcorp.com',
    industry: 'manufacturing',
    companySize: '50-200',
    currentTech: 'CRM, ERP',
    previousAIExperience: 'some'
  },
  step3: {
    projectScope: 'We need to optimize our manufacturing processes...',
    expectedOutcomes: 'Increased efficiency, Cost reduction',
    budgetRange: '100k-250k',
    timeline: '6-12-months',
    decisionMakers: 'CTO, Operations Director',
    stakeholders: 'IT Team, Operations Team'
  },
  step4: {
    contactName: 'John Doe',
    email: 'john@testcorp.com',
    phone: '+1234567890',
    preferredContact: 'email',
    consultationTime: 'business-hours',
    specificQuestions: 'What is your typical project timeline?'
  }
};

export const invalidFormData = {
  // Various invalid data scenarios for testing validation
};
```

### 6. Visual Regression Testing

Implement visual regression tests for UI consistency:

```typescript
// visual/homepage.spec.ts
test('homepage visual regression', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('homepage-desktop.png');
});

// Test different viewport sizes
test('homepage mobile visual', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage-mobile.png');
});
```

### 7. Cross-Browser Testing

Ensure tests run across all configured browsers and validate:
- Functionality consistency across Chrome, Firefox, Safari
- Mobile device compatibility (iPhone, iPad)
- Touch interactions and gestures
- Browser-specific CSS rendering
- JavaScript functionality across browsers

### 8. CI/CD Integration

Create GitHub Actions workflow for automated testing:

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npm run test
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

## Business-Critical Test Scenarios

### Lead Generation Flow (HIGHEST PRIORITY)
1. Complete contact form submission with lead scoring validation
2. Different budget ranges affecting lead priority
3. Urgency levels impacting lead scoring
4. Company size influence on lead qualification
5. Server Actions properly handling form data and CRM preparation

### Conversion Optimization
1. CTA button effectiveness across all pages
2. Service page to contact form conversion flow
3. Case study engagement leading to consultation requests
4. Mobile conversion optimization testing

### Performance Requirements
1. Core Web Vitals compliance across all pages
2. Loading performance under different network conditions
3. Accessibility compliance for all interactive elements
4. SEO optimization validation

## Success Criteria

Your Playwright implementation must achieve:

1. **100% Functional Coverage**: All features and user flows tested
2. **Cross-Browser Compatibility**: Chrome, Firefox, Safari, Edge
3. **Mobile Responsiveness**: iPhone, iPad, Android testing
4. **Performance Validation**: Core Web Vitals compliance
5. **Accessibility Compliance**: WCAG 2.1 AA standards
6. **Visual Regression**: UI consistency across updates
7. **CI/CD Integration**: Automated testing pipeline
8. **Comprehensive Reporting**: Detailed test results and screenshots

## Implementation Timeline

1. **Phase 1**: Setup and configuration (Playwright config, CI/CD)
2. **Phase 2**: Critical path testing (Contact form, navigation)
3. **Phase 3**: Page-specific testing (Homepage, About, Services)
4. **Phase 4**: Feature testing (Case studies, filtering, search)
5. **Phase 5**: Performance and accessibility testing
6. **Phase 6**: Visual regression and cross-browser testing
7. **Phase 7**: Mobile and responsive testing
8. **Phase 8**: CI/CD integration and documentation

## Deliverables

1. Complete Playwright test suite with all specified test files
2. Playwright configuration optimized for the project
3. Page object models for maintainable testing
4. Test data and fixtures for comprehensive scenarios
5. Visual regression testing setup
6. CI/CD integration with GitHub Actions
7. Comprehensive test documentation and reporting
8. Performance and accessibility testing validation

Focus on the **contact form multi-step functionality** as the highest priority, as this is the primary lead generation mechanism for the business. Ensure the lead scoring algorithm is thoroughly tested and validated.

The goal is to achieve **enterprise-grade testing coverage** that ensures the platform can confidently handle the business objective of generating 50+ qualified leads per month with a 5%+ conversion rate.