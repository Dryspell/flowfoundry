# Playwright Testing Suite for Flowfoundry

## Overview

This comprehensive Playwright testing suite provides enterprise-grade testing coverage for the Flowfoundry AI consultancy platform. The suite focuses on the critical business objective of generating 50+ qualified leads per month with a 5%+ conversion rate.

## Test Coverage

### 🎯 Critical Business Components (Highest Priority)
- **Contact Form Multi-Step Testing**: Complete lead generation flow validation
- **Lead Scoring Algorithm**: 100-point scoring system validation
- **Cross-Browser Compatibility**: Chrome, Firefox, Safari, Edge
- **Mobile Responsiveness**: iPhone, iPad, Android testing

### 📊 Comprehensive Test Suite
- **E2E Testing**: Homepage, Navigation, Services, Case Studies, Contact Form
- **Performance Testing**: Core Web Vitals, Lighthouse scores, Accessibility
- **Visual Regression**: UI consistency across updates and browsers
- **Mobile Testing**: Touch interactions, responsive layouts, mobile performance

## Quick Start

### Installation
```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install
```

### Running Tests
```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run tests with UI
npm run test:ui

# Run specific browser tests
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:mobile
```

### Debug Tests
```bash
# Debug mode
npm run test:debug

# Debug specific test
npx playwright test contact-form.spec.ts --debug
```

## Test Structure

```
tests/
├── e2e/                          # End-to-end tests
│   ├── contact-form.spec.ts      # 🔥 CRITICAL: Multi-step form testing
│   ├── homepage.spec.ts          # Homepage functionality
│   ├── navigation.spec.ts        # Navigation and routing
│   ├── case-studies.spec.ts      # Case studies filtering
│   ├── services.spec.ts          # Services pages
│   ├── mobile.spec.ts            # Mobile-specific testing
│   └── performance.spec.ts       # Performance & accessibility
├── visual/                       # Visual regression tests
│   ├── homepage.spec.ts          # Homepage visual consistency
│   └── responsive.spec.ts        # Responsive design validation
└── utils/                        # Test utilities
    ├── page-objects.ts           # Page object models
    ├── test-helpers.ts           # Shared utilities
    ├── mock-data.ts              # Test data and fixtures
    ├── auth.setup.ts             # Authentication setup
    └── global.teardown.ts        # Cleanup utilities
```

## Key Features

### 🚀 Contact Form Testing (Business Critical)
- Complete 4-step form submission validation
- Lead scoring algorithm testing (0-100 points)
- Form validation and error handling
- Mobile form interactions
- Browser navigation handling
- Different contact method validation

### 📱 Mobile & Responsive Testing
- Touch interaction validation
- Mobile navigation testing
- Responsive layout verification
- Mobile performance optimization
- Cross-device compatibility

### ⚡ Performance Testing
- Core Web Vitals compliance (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- Lighthouse scores > 95
- Accessibility compliance (WCAG 2.1 AA)
- Mobile performance optimization
- Network condition simulation

### 🎨 Visual Regression Testing
- Cross-browser visual consistency
- Responsive design validation
- Component state testing
- Font rendering differences
- Loading state validation

## Business Logic Validation

### Lead Scoring Test Cases
- **High Value Lead**: Enterprise, $500K+ budget, ASAP urgency → Score 80-100
- **Medium Value Lead**: Mid-size company, $50K-250K budget → Score 50-79
- **Low Value Lead**: Small business, <$50K budget, exploration → Score 0-49

### Conversion Flow Testing
- Homepage → Services → Contact Form → Lead Generation
- Case Studies → Contact Form → High-Intent Lead
- Mobile conversion optimization
- CTA effectiveness validation

## CI/CD Integration

### GitHub Actions Workflow
- **Multi-browser testing**: Chrome, Firefox, Safari, Edge
- **Mobile testing**: iPhone, iPad, Android devices
- **Performance monitoring**: Core Web Vitals tracking
- **Visual regression**: Automated screenshot comparison
- **Accessibility validation**: WCAG 2.1 AA compliance

### Test Reports
- HTML reports with screenshots and videos
- Performance metrics and benchmarks
- Accessibility compliance reports
- Visual regression difference highlights

## Test Data Management

### Form Test Data
```typescript
// High-value lead example
const highValueLead = {
  company: "Enterprise Solutions Inc",
  budget: "500k+",
  urgency: "asap",
  industry: "technology",
  expectedScore: 85-95
};
```

### Case Study Data
- Manufacturing Automation (340% ROI)
- Retail Optimization (45% efficiency)
- Healthcare Workflow (98% satisfaction)
- Financial Risk Assessment (65% accuracy)

## Performance Benchmarks

### Core Web Vitals
- **LCP**: < 2.5 seconds
- **FID**: < 100 milliseconds
- **CLS**: < 0.1

### Load Time Targets
- **Homepage**: < 1.5 seconds
- **Contact Form**: < 2.0 seconds
- **Case Studies**: < 2.0 seconds

## Accessibility Requirements

### WCAG 2.1 AA Compliance
- Keyboard navigation support
- Screen reader compatibility
- Color contrast validation (4.5:1 ratio)
- Focus management
- Semantic HTML structure

## Troubleshooting

### Common Issues

**Tests failing on CI but passing locally:**
- Ensure consistent viewport sizes
- Add proper wait conditions
- Check for race conditions in async operations

**Visual regression failures:**
- Review screenshot differences in test reports
- Update baselines if changes are intentional
- Consider browser-specific rendering differences

**Mobile tests failing:**
- Verify touch event simulation
- Check viewport configuration
- Ensure mobile-specific selectors are used

### Debug Commands
```bash
# Run specific test file
npx playwright test contact-form.spec.ts

# Run with trace viewer
npx playwright test --trace on

# Generate test report
npx playwright show-report
```

## Maintenance

### Updating Test Data
- Modify `tests/utils/mock-data.ts` for form data
- Update expected metrics in performance benchmarks
- Adjust lead scoring criteria as business rules change

### Adding New Tests
1. Create test file in appropriate directory
2. Import required page objects and helpers
3. Follow existing test patterns and naming conventions
4. Add test data to mock-data.ts if needed

### Visual Regression Baselines
```bash
# Update all visual baselines
npx playwright test --update-snapshots

# Update specific test baselines
npx playwright test homepage.spec.ts --update-snapshots
```

## Contact & Support

For questions about the testing suite or to report issues:
- Review test reports in GitHub Actions
- Check console logs for detailed error information
- Refer to Playwright documentation for advanced debugging

---

**Testing Priority**: Contact form functionality is the highest priority as it's the primary lead generation mechanism for the business objective of 50+ qualified leads per month.