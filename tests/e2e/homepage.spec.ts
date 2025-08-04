import { test, expect } from '@playwright/test';
import { HomePage, NavigationHeader } from '../utils/page-objects';
import { TestHelpers } from '../utils/test-helpers';

/**
 * Homepage Functionality Testing Suite
 * 
 * Tests the main landing page including hero section, services overview,
 * social proof, and all interactive elements
 */

test.describe('Homepage - Core Functionality', () => {
  let homePage: HomePage;
  let navigationHeader: NavigationHeader;
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    navigationHeader = new NavigationHeader(page);
    helpers = new TestHelpers(page);
    
    helpers.setupConsoleErrorMonitoring();
    await homePage.goto();
  });

  test('should load homepage with all critical elements', async () => {
    await test.step('Validate hero section loads correctly', async () => {
      await expect(homePage.heroSection).toBeVisible();
      await expect(homePage.primaryCTA).toBeVisible();
      await expect(homePage.secondaryCTA).toBeVisible();
      
      // Check hero metrics are displayed
      await homePage.validateHeroMetrics();
    });

    await test.step('Validate services overview section', async () => {
      await expect(homePage.servicesSection).toBeVisible();
      await homePage.validateServicesOverview();
    });

    await test.step('Validate social proof section', async () => {
      await expect(homePage.socialProofSection).toBeVisible();
      await homePage.validateSocialProof();
    });

    await test.step('Validate navigation header', async () => {
      await navigationHeader.validateHeader();
    });
  });

  test('should handle primary CTA button interactions', async () => {
    await test.step('Click primary CTA and verify navigation', async () => {
      await homePage.clickPrimaryCTA();
      
      // Should navigate to contact form
      await expect(homePage.page).toHaveURL(/.*\/contact/);
      
      // Contact form should be visible
      await expect(homePage.page.locator('[data-testid="multi-step-form"]')).toBeVisible();
    });
  });

  test('should handle secondary CTA button interactions', async () => {
    await test.step('Click secondary CTA and verify navigation', async () => {
      await homePage.clickSecondaryCTA();
      
      // Should navigate to services or about page
      const currentUrl = homePage.page.url();
      expect(currentUrl).toMatch(/\/(services|about|case-studies)/);
    });
  });

  test('should display service cards with hover interactions', async () => {
    await test.step('Test service card hover effects', async () => {
      const serviceCount = await homePage.serviceCards.count();
      expect(serviceCount).toBe(4);

      // Test hover on each service card
      for (let i = 0; i < serviceCount; i++) {
        await homePage.hoverServiceCard(i);
        
        // Card should have hover state (visual changes)
        const card = homePage.serviceCards.nth(i);
        await expect(card).toBeVisible();
        
        // Allow time for hover animation
        await homePage.page.waitForTimeout(300);
      }
    });

    await test.step('Test service card click navigation', async () => {
      // Click first service card
      await homePage.serviceCards.first().click();
      
      // Should navigate to services page or individual service
      const currentUrl = homePage.page.url();
      expect(currentUrl).toMatch(/\/services/);
    });
  });

  test('should load skeleton components before content', async () => {
    await test.step('Test loading states', async () => {
      // Navigate to homepage and immediately check for skeletons
      await homePage.page.goto('/', { waitUntil: 'domcontentloaded' });
      
      // Skeletons should be visible initially
      const skeletons = homePage.page.locator('[data-testid*="skeleton"]');
      const skeletonCount = await skeletons.count();
      
      if (skeletonCount > 0) {
        await expect(skeletons.first()).toBeVisible();
        
        // Wait for content to load and skeletons to disappear
        await helpers.waitForSkeletonsToLoad();
        
        // Skeletons should be hidden after loading
        await expect(skeletons.first()).not.toBeVisible();
      }
    });
  });

  test('should display hero metrics correctly', async () => {
    await test.step('Validate hero metrics content', async () => {
      const expectedMetrics = [
        { value: '150+', label: 'clients' },
        { value: '340%', label: 'ROI' },
        { value: '200+', label: 'projects' },
        { value: '2,400+', label: 'months' }
      ];

      for (const metric of expectedMetrics) {
        await expect(homePage.heroSection).toContainText(metric.value);
      }
    });

    await test.step('Validate metrics are properly formatted', async () => {
      const metricsElements = homePage.page.locator('[data-testid="metric-value"]');
      const count = await metricsElements.count();
      
      expect(count).toBeGreaterThanOrEqual(4);
      
      // Each metric should be visible and have content
      for (let i = 0; i < count; i++) {
        const metric = metricsElements.nth(i);
        await expect(metric).toBeVisible();
        
        const text = await metric.textContent();
        expect(text?.trim().length).toBeGreaterThan(0);
      }
    });
  });

  test('should handle testimonials and social proof', async () => {
    await test.step('Validate testimonials section', async () => {
      await expect(homePage.socialProofSection).toBeVisible();
      
      const testimonialCount = await homePage.testimonials.count();
      expect(testimonialCount).toBeGreaterThan(0);
    });

    await test.step('Test testimonial interaction', async () => {
      if (await homePage.testimonials.count() > 0) {
        // Test if testimonials are clickable or have any interactions
        const firstTestimonial = homePage.testimonials.first();
        await expect(firstTestimonial).toBeVisible();
        
        // Check if testimonial has proper structure
        await expect(firstTestimonial).toContainText(/\w+/); // Should contain some text
      }
    });

    await test.step('Validate trust indicators', async () => {
      const trustIndicatorCount = await homePage.trustIndicators.count();
      expect(trustIndicatorCount).toBeGreaterThan(0);
      
      // Each trust indicator should be visible
      for (let i = 0; i < Math.min(trustIndicatorCount, 3); i++) {
        await expect(homePage.trustIndicators.nth(i)).toBeVisible();
      }
    });
  });

  test('should be responsive on mobile devices', async () => {
    await test.step('Test mobile layout', async () => {
      await homePage.page.setViewportSize({ width: 375, height: 667 });
      await homePage.page.reload();
      await helpers.waitForPageLoad();
      
      // All main sections should still be visible on mobile
      await expect(homePage.heroSection).toBeVisible();
      await expect(homePage.servicesSection).toBeVisible();
      await expect(homePage.socialProofSection).toBeVisible();
    });

    await test.step('Test mobile navigation', async () => {
      // Test mobile navigation menu
      await navigationHeader.testMobileNavigation();
    });

    await test.step('Test mobile touch interactions', async () => {
      // Test touch events on CTAs
      await helpers.simulateTouch('[data-testid="hero-primary-cta"]');
      
      // Should navigate to contact form
      await expect(homePage.page).toHaveURL(/.*\/contact/);
    });
  });

  test('should handle tablet layout correctly', async () => {
    await test.step('Test tablet viewport', async () => {
      await homePage.page.setViewportSize({ width: 768, height: 1024 });
      await homePage.page.reload();
      await helpers.waitForPageLoad();
      
      // Layout should adapt to tablet size
      await expect(homePage.heroSection).toBeVisible();
      await expect(homePage.servicesSection).toBeVisible();
      
      // Service cards should be arranged properly for tablet
      const serviceCards = homePage.serviceCards;
      const cardCount = await serviceCards.count();
      expect(cardCount).toBe(4);
    });
  });

  test('should validate all links are functional', async () => {
    await test.step('Check for broken internal links', async () => {
      await helpers.checkForBrokenLinks();
    });

    await test.step('Test all navigation links', async () => {
      const navigationLinks = [
        { selector: '[data-testid="nav-about"]', expectedPath: '/about' },
        { selector: '[data-testid="nav-services"]', expectedPath: '/services' },
        { selector: '[data-testid="nav-case-studies"]', expectedPath: '/case-studies' },
        { selector: '[data-testid="nav-contact"]', expectedPath: '/contact' }
      ];

      for (const link of navigationLinks) {
        await homePage.goto(); // Reset to homepage
        
        const linkElement = homePage.page.locator(link.selector);
        if (await linkElement.isVisible()) {
          await linkElement.click();
          await helpers.waitForPageLoad();
          
          const currentUrl = homePage.page.url();
          expect(currentUrl).toContain(link.expectedPath);
        }
      }
    });
  });

  test('should handle smooth scrolling and animations', async () => {
    await test.step('Test scroll behavior', async () => {
      // Scroll to services section
      await homePage.servicesSection.scrollIntoViewIfNeeded();
      await expect(homePage.servicesSection).toBeInViewport();
      
      // Scroll to social proof section
      await homePage.socialProofSection.scrollIntoViewIfNeeded();
      await expect(homePage.socialProofSection).toBeInViewport();
    });

    await test.step('Wait for animations to complete', async () => {
      await helpers.waitForAnimationsToComplete();
    });
  });

  test('should validate content accuracy', async () => {
    await test.step('Check hero section content', async () => {
      // Validate main headline
      await expect(homePage.page.locator('h1')).toContainText(/AI|Flowfoundry|Transform/i);
      
      // Validate value proposition
      const heroText = await homePage.heroSection.textContent();
      expect(heroText).toMatch(/consultancy|AI|transform|business/i);
    });

    await test.step('Check services content accuracy', async () => {
      const expectedServices = [
        'Multi-Agent AI Systems',
        'Operational Optimization',
        'AI-Accelerated Transformation',
        'Custom AI Solutions'
      ];

      for (const service of expectedServices) {
        await expect(homePage.servicesSection).toContainText(service);
      }
    });
  });

  test('should handle error states gracefully', async () => {
    await test.step('Test with slow network conditions', async () => {
      // Simulate slow network
      await homePage.page.route('**/*', route => {
        setTimeout(() => route.continue(), 1000);
      });

      await homePage.goto();
      
      // Page should still load, possibly with loading states
      await expect(homePage.heroSection).toBeVisible({ timeout: 15000 });
    });

    await test.step('Test with failed image loads', async () => {
      // Mock image load failures
      await homePage.page.route('**/*.{png,jpg,jpeg,webp,svg}', route => {
        route.fulfill({ status: 404 });
      });

      await homePage.goto();
      
      // Page should still function without images
      await expect(homePage.heroSection).toBeVisible();
      await expect(homePage.primaryCTA).toBeVisible();
    });
  });
});

test.describe('Homepage - Performance and Accessibility', () => {
  let homePage: HomePage;
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    helpers = new TestHelpers(page);
    await homePage.goto();
  });

  test('should meet Core Web Vitals requirements', async () => {
    await test.step('Validate Core Web Vitals', async () => {
      await helpers.validateCoreWebVitals();
    });
  });

  test('should meet basic accessibility requirements', async () => {
    await test.step('Check accessibility basics', async () => {
      await helpers.checkBasicAccessibility();
    });

    await test.step('Test keyboard navigation', async () => {
      // Test tab navigation through interactive elements
      await homePage.page.keyboard.press('Tab');
      await homePage.page.keyboard.press('Tab');
      await homePage.page.keyboard.press('Tab');
      
      // Focus should be visible
      const focusedElement = await homePage.page.evaluate(() => document.activeElement?.tagName);
      expect(['BUTTON', 'A', 'INPUT']).toContain(focusedElement);
    });
  });

  test('should test responsive breakpoints', async () => {
    await test.step('Test all responsive breakpoints', async () => {
      await helpers.testResponsiveBreakpoints();
    });
  });
});