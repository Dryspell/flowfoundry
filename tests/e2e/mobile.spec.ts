import { test, expect } from '@playwright/test';
import { HomePage, ContactFormPage, CaseStudiesPage, ServicesPage, NavigationHeader } from '../utils/page-objects';
import { TestHelpers } from '../utils/test-helpers';
import { responsiveViewports } from '../utils/mock-data';

/**
 * Mobile-Specific Testing Suite
 * 
 * Tests mobile-specific functionality including:
 * - Touch interactions
 * - Mobile navigation
 * - Responsive layouts
 * - Mobile form interactions
 * - Performance on mobile devices
 */

test.describe('Mobile - Touch Interactions', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await page.setViewportSize({ width: 375, height: 667 });
    helpers.setupConsoleErrorMonitoring();
  });

  test('should handle touch interactions on homepage', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await test.step('Test hero CTA touch interaction', async () => {
      await helpers.simulateTouch('[data-testid="hero-primary-cta"]');
      await helpers.waitForPageLoad();
      
      // Should navigate to contact form
      expect(page.url()).toContain('/contact');
    });

    await test.step('Test service card touch interactions', async () => {
      await homePage.goto();
      
      const serviceCards = page.locator('[data-testid="service-card"]');
      const cardCount = await serviceCards.count();
      
      if (cardCount > 0) {
        await helpers.simulateTouch('[data-testid="service-card"]:first-child');
        await helpers.waitForPageLoad();
        
        // Should navigate to services
        expect(page.url()).toContain('/services');
      }
    });
  });

  test('should handle touch scrolling and gestures', async ({ page }) => {
    await test.step('Test touch scrolling', async () => {
      await page.goto('/');
      await helpers.waitForPageLoad();
      
      // Test scroll gesture
      await page.touchscreen.tap(200, 300);
      await page.mouse.wheel(0, 500); // Scroll down
      
      // Should scroll to different sections
      const socialProofSection = page.locator('[data-testid="social-proof"]');
      await expect(socialProofSection).toBeInViewport();
    });

    await test.step('Test swipe gestures on mobile', async () => {
      // Test horizontal swipe if there are carousel/slider components
      const carousel = page.locator('[data-testid="carousel"], [data-testid="slider"]');
      
      if (await carousel.count() > 0) {
        const box = await carousel.first().boundingBox();
        if (box) {
          // Swipe left
          await page.touchscreen.tap(box.x + box.width - 50, box.y + box.height / 2);
          await page.touchscreen.tap(box.x + 50, box.y + box.height / 2);
        }
      }
    });
  });

  test('should handle long press interactions', async ({ page }) => {
    await test.step('Test long press on interactive elements', async () => {
      await page.goto('/');
      await helpers.waitForPageLoad();
      
      const primaryCTA = page.locator('[data-testid="hero-primary-cta"]');
      
      if (await primaryCTA.isVisible()) {
        const box = await primaryCTA.boundingBox();
        if (box) {
          // Simulate long press
          await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
          await page.waitForTimeout(1000); // Hold for 1 second
          
          // Should not trigger unintended actions
          expect(page.url()).toContain('/'); // Should still be on homepage
        }
      }
    });
  });
});

test.describe('Mobile - Navigation and Menu', () => {
  let navigationHeader: NavigationHeader;
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    navigationHeader = new NavigationHeader(page);
    helpers = new TestHelpers(page);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await helpers.waitForPageLoad();
  });

  test('should display mobile navigation correctly', async ({ page }) => {
    await test.step('Test mobile menu button visibility', async () => {
      await expect(navigationHeader.mobileMenuButton).toBeVisible();
      await expect(navigationHeader.navigationMenu).not.toBeVisible();
    });

    await test.step('Test mobile menu opening and closing', async () => {
      // Open mobile menu
      await navigationHeader.mobileMenuButton.click();
      await expect(navigationHeader.mobileMenu).toBeVisible();
      
      // Test menu items are accessible
      const mobileMenuItems = navigationHeader.mobileMenu.locator('a, button');
      const itemCount = await mobileMenuItems.count();
      expect(itemCount).toBeGreaterThan(0);
      
      // Close mobile menu (click outside or close button)
      const closeButton = navigationHeader.mobileMenu.locator('[data-testid="mobile-menu-close"]');
      if (await closeButton.isVisible()) {
        await closeButton.click();
      } else {
        // Click outside to close
        await page.click('body', { position: { x: 10, y: 100 } });
      }
      
      await expect(navigationHeader.mobileMenu).not.toBeVisible();
    });

    await test.step('Test mobile navigation to different pages', async () => {
      await navigationHeader.mobileMenuButton.click();
      
      const aboutLink = navigationHeader.mobileMenu.locator('[data-testid="mobile-nav-about"]');
      if (await aboutLink.isVisible()) {
        await aboutLink.click();
        await helpers.waitForPageLoad();
        
        expect(page.url()).toContain('/about');
        
        // Menu should close after navigation
        await expect(navigationHeader.mobileMenu).not.toBeVisible();
      }
    });
  });

  test('should handle mobile menu touch interactions', async ({ page }) => {
    await test.step('Test touch interactions on mobile menu', async () => {
      await helpers.simulateTouch('[data-testid="mobile-menu-button"]');
      await expect(navigationHeader.mobileMenu).toBeVisible();
      
      // Test touch on menu items
      const menuItems = navigationHeader.mobileMenu.locator('a');
      const itemCount = await menuItems.count();
      
      if (itemCount > 0) {
        const firstItem = menuItems.first();
        await helpers.simulateTouch('[data-testid="mobile-nav-services"]');
        await helpers.waitForPageLoad();
        
        expect(page.url()).toContain('/services');
      }
    });
  });
});

test.describe('Mobile - Form Interactions', () => {
  let contactFormPage: ContactFormPage;
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    contactFormPage = new ContactFormPage(page);
    helpers = new TestHelpers(page);
    await page.setViewportSize({ width: 375, height: 667 });
    await contactFormPage.goto();
  });

  test('should handle mobile form input correctly', async ({ page }) => {
    await test.step('Test mobile keyboard interactions', async () => {
      // Test text input on mobile
      await contactFormPage.primaryChallengeSelect.click();
      await contactFormPage.primaryChallengeSelect.selectOption('operational-optimization');
      
      await contactFormPage.urgencySelect.click();
      await contactFormPage.urgencySelect.selectOption('within-3-months');
      
      await contactFormPage.nextButton.click();
      await contactFormPage.validateStep(2);
    });

    await test.step('Test mobile virtual keyboard handling', async () => {
      // Test that form adjusts when virtual keyboard appears
      const companyNameInput = contactFormPage.companyNameInput;
      
      await companyNameInput.focus();
      await page.waitForTimeout(500); // Allow virtual keyboard to appear
      
      // Form should still be accessible
      await expect(companyNameInput).toBeVisible();
      await expect(contactFormPage.nextButton).toBeVisible();
      
      // Fill input
      await companyNameInput.fill('Mobile Test Company');
      
      // Blur to hide keyboard
      await page.click('h1'); // Click on header to lose focus
      await page.waitForTimeout(300);
    });

    await test.step('Test mobile dropdown interactions', async () => {
      await contactFormPage.industrySelect.click();
      
      // On mobile, select dropdown should be usable
      await contactFormPage.industrySelect.selectOption('technology');
      
      const selectedValue = await contactFormPage.industrySelect.inputValue();
      expect(selectedValue).toBe('technology');
    });
  });

  test('should handle mobile form validation display', async ({ page }) => {
    await test.step('Test mobile validation message display', async () => {
      // Try to proceed without filling required fields
      await contactFormPage.nextButton.click();
      
      // Validation errors should be visible on mobile
      const validationError = page.locator('[data-testid="validation-error"]');
      if (await validationError.count() > 0) {
        await expect(validationError.first()).toBeVisible();
        
        // Error should not be cut off on mobile
        const errorBox = await validationError.first().boundingBox();
        expect(errorBox?.width).toBeLessThanOrEqual(375);
      }
    });
  });

  test('should complete full form on mobile', async ({ page }) => {
    await test.step('Test complete mobile form submission', async () => {
      const mobileFormData = {
        step1: {
          primaryChallenge: 'operational-optimization',
          urgency: 'within-3-months'
        },
        step2: {
          companyName: 'Mobile Test Corp',
          website: 'https://mobiletestcorp.com',
          industry: 'manufacturing',
          companySize: '50-200',
          currentTech: 'Basic systems',
          aiExperience: 'some'
        },
        step3: {
          projectScope: 'Mobile form testing for AI implementation project.',
          expectedOutcomes: 'Improved mobile experience, Better efficiency',
          budgetRange: '100k-250k',
          timeline: '6-12-months',
          decisionMakers: 'CTO, Operations Manager',
          stakeholders: 'IT Team, Operations'
        },
        step4: {
          contactName: 'Mobile User',
          email: 'mobile@mobiletestcorp.com',
          phone: '+1-555-0123',
          preferredContact: 'email',
          consultationTime: 'business-hours',
          specificQuestions: 'Testing mobile form submission flow.'
        }
      };

      await contactFormPage.fillStep1(mobileFormData.step1);
      await contactFormPage.fillStep2(mobileFormData.step2);
      await contactFormPage.fillStep3(mobileFormData.step3);
      await contactFormPage.fillStep4(mobileFormData.step4);
      
      // Form should work properly on mobile
      await contactFormPage.validateLeadScoring();
    });
  });
});

test.describe('Mobile - Responsive Layout Testing', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should handle different mobile viewport sizes', async ({ page }) => {
    for (const viewport of responsiveViewports.filter(v => v.width <= 768)) {
      await test.step(`Test ${viewport.name} (${viewport.width}x${viewport.height})`, async () => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');
        await helpers.waitForPageLoad();
        
        // Main sections should be visible and properly laid out
        await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
        await expect(page.locator('[data-testid="services-overview"]')).toBeVisible();
        
        // Content should not overflow horizontally
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 20); // Allow small tolerance
      });
    }
  });

  test('should handle orientation changes', async ({ page }) => {
    await test.step('Test portrait to landscape orientation', async () => {
      // Start in portrait
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await helpers.waitForPageLoad();
      
      // Switch to landscape
      await page.setViewportSize({ width: 667, height: 375 });
      await page.waitForTimeout(500);
      
      // Layout should adapt to landscape
      await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
      
      // Navigation should still work
      const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
      if (await mobileMenuButton.isVisible()) {
        await mobileMenuButton.click();
        await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
      }
    });
  });

  test('should maintain readability at different zoom levels', async ({ page }) => {
    await test.step('Test zoom level adaptability', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await helpers.waitForPageLoad();
      
      // Test different zoom levels
      const zoomLevels = [0.8, 1.0, 1.2, 1.5];
      
      for (const zoom of zoomLevels) {
        await page.evaluate((zoomLevel) => {
          document.body.style.zoom = zoomLevel.toString();
        }, zoom);
        
        await page.waitForTimeout(300);
        
        // Text should remain readable
        const headingText = await page.locator('h1').textContent();
        expect(headingText?.length).toBeGreaterThan(0);
        
        // Interactive elements should remain clickable
        await expect(page.locator('[data-testid="hero-primary-cta"]')).toBeVisible();
      }
      
      // Reset zoom
      await page.evaluate(() => {
        document.body.style.zoom = '1';
      });
    });
  });
});

test.describe('Mobile - Performance and Optimization', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test('should load efficiently on mobile networks', async ({ page }) => {
    await test.step('Test performance on slow mobile connection', async () => {
      // Simulate slow 3G
      const client = await page.context().newCDPSession(page);
      await client.send('Network.enable');
      await client.send('Network.emulateNetworkConditions', {
        offline: false,
        downloadThroughput: 1.6 * 1024 * 1024 / 8,
        uploadThroughput: 750 * 1024 / 8,
        latency: 150
      });

      const startTime = Date.now();
      await page.goto('/');
      
      // Should show content quickly even on slow connection
      await expect(page.locator('h1')).toBeVisible({ timeout: 8000 });
      const loadTime = Date.now() - startTime;
      
      expect(loadTime).toBeLessThan(8000); // 8 seconds max on slow 3G
    });
  });

  test('should handle mobile data optimization', async ({ page }) => {
    await test.step('Test data usage optimization', async () => {
      const requests: any[] = [];
      let totalDataTransferred = 0;

      page.on('response', response => {
        if (response.status() === 200) {
          const contentLength = response.headers()['content-length'];
          const size = contentLength ? parseInt(contentLength) : 0;
          totalDataTransferred += size;
          
          requests.push({
            url: response.url(),
            type: response.request().resourceType(),
            size: size
          });
        }
      });

      await page.goto('/');
      await helpers.waitForPageLoad();
      
      // Total data transfer should be reasonable for mobile
      expect(totalDataTransferred).toBeLessThan(2 * 1024 * 1024); // Under 2MB total
      
      // Images should be optimized for mobile
      const imageRequests = requests.filter(r => r.type === 'image');
      for (const imgRequest of imageRequests) {
        expect(imgRequest.size).toBeLessThan(500 * 1024); // No single image over 500KB
      }
    });
  });

  test('should handle mobile memory constraints', async ({ page }) => {
    await test.step('Test memory usage on mobile', async () => {
      await page.goto('/');
      await helpers.waitForPageLoad();
      
      // Navigate through several pages to test memory management
      const pages = ['/about', '/services', '/case-studies', '/contact'];
      
      for (const path of pages) {
        await page.goto(path);
        await helpers.waitForPageLoad();
        
        // Check for memory leaks (simplified check)
        const domNodeCount = await page.evaluate(() => document.querySelectorAll('*').length);
        expect(domNodeCount).toBeLessThan(5000); // Reasonable DOM size
      }
      
      // Return to homepage
      await page.goto('/');
      await helpers.waitForPageLoad();
    });
  });

  test('should handle mobile touch target sizes', async ({ page }) => {
    await test.step('Test touch target accessibility', async () => {
      await page.goto('/');
      await helpers.waitForPageLoad();
      
      // All touch targets should be at least 44x44px
      const touchTargets = page.locator('button, a, [role="button"], input, select');
      const targetCount = await touchTargets.count();
      
      for (let i = 0; i < Math.min(targetCount, 10); i++) {
        const target = touchTargets.nth(i);
        
        if (await target.isVisible()) {
          const boundingBox = await target.boundingBox();
          
          if (boundingBox) {
            // Touch targets should be large enough for mobile
            expect(Math.min(boundingBox.width, boundingBox.height)).toBeGreaterThanOrEqual(40);
          }
        }
      }
    });
  });
});