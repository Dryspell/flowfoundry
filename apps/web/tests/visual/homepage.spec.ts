import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';

/**
 * Visual Regression Testing - Homepage
 * 
 * Tests visual consistency across different:
 * - Viewports and screen sizes
 * - Browser rendering
 * - Component states
 * - Responsive breakpoints
 */

test.describe('Homepage Visual Regression', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await page.goto('/');
    await helpers.waitForPageLoad();
    await helpers.waitForSkeletonsToLoad();
    await helpers.waitForAnimationsToComplete();
  });

  test('should maintain visual consistency across viewports', async ({ page }) => {
    await test.step('Desktop screenshot', async () => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(500); // Allow layout to settle
      
      await expect(page).toHaveScreenshot('homepage-desktop.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    await test.step('Tablet screenshot', async () => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(500);
      
      await expect(page).toHaveScreenshot('homepage-tablet.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    await test.step('Mobile screenshot', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);
      
      await expect(page).toHaveScreenshot('homepage-mobile.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });
  });

  test('should maintain hero section visual consistency', async ({ page }) => {
    await test.step('Hero section base state', async () => {
      const heroSection = page.locator('[data-testid="hero-section"]');
      await expect(heroSection).toHaveScreenshot('hero-section-base.png', {
        animations: 'disabled'
      });
    });

    await test.step('Hero section with hover on CTA', async () => {
      const primaryCTA = page.locator('[data-testid="hero-primary-cta"]');
      await primaryCTA.hover();
      await page.waitForTimeout(300); // Allow hover animation
      
      const heroSection = page.locator('[data-testid="hero-section"]');
      await expect(heroSection).toHaveScreenshot('hero-section-cta-hover.png', {
        animations: 'disabled'
      });
    });
  });

  test('should maintain services section visual consistency', async ({ page }) => {
    await test.step('Services section base state', async () => {
      const servicesSection = page.locator('[data-testid="services-overview"]');
      await servicesSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      await expect(servicesSection).toHaveScreenshot('services-section-base.png', {
        animations: 'disabled'
      });
    });

    await test.step('Services section with card hover', async () => {
      const servicesSection = page.locator('[data-testid="services-overview"]');
      await servicesSection.scrollIntoViewIfNeeded();
      
      const firstServiceCard = page.locator('[data-testid="service-card"]').first();
      await firstServiceCard.hover();
      await page.waitForTimeout(300);
      
      await expect(servicesSection).toHaveScreenshot('services-section-card-hover.png', {
        animations: 'disabled'
      });
    });
  });

  test('should maintain social proof section visual consistency', async ({ page }) => {
    await test.step('Social proof section', async () => {
      const socialProofSection = page.locator('[data-testid="social-proof"]');
      await socialProofSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      await expect(socialProofSection).toHaveScreenshot('social-proof-section.png', {
        animations: 'disabled'
      });
    });
  });

  test('should handle different content lengths gracefully', async ({ page }) => {
    await test.step('Test with simulated content variations', async () => {
      // Simulate longer hero text
      await page.evaluate(() => {
        const heroText = document.querySelector('[data-testid="hero-section"] p');
        if (heroText) {
          heroText.textContent = 'This is a much longer hero description that tests how the layout handles extended content. It should maintain proper spacing and readability even with significantly more text than the original design intended.';
        }
      });

      await page.waitForTimeout(500);
      
      await expect(page.locator('[data-testid="hero-section"]')).toHaveScreenshot('hero-section-long-text.png', {
        animations: 'disabled'
      });
    });
  });
});

test.describe('Homepage Visual States', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should handle loading states visually', async ({ page }) => {
    await test.step('Capture loading skeleton states', async () => {
      // Navigate and immediately capture skeleton
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      
      // Try to capture skeleton if it appears
      const skeletonElements = page.locator('[data-testid*="skeleton"]');
      const skeletonCount = await skeletonElements.count();
      
      if (skeletonCount > 0) {
        await expect(page).toHaveScreenshot('homepage-loading-skeletons.png', {
          animations: 'disabled'
        });
      }
      
      // Wait for full load and capture final state
      await helpers.waitForPageLoad();
      await helpers.waitForSkeletonsToLoad();
      
      await expect(page).toHaveScreenshot('homepage-fully-loaded.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });
  });

  test('should handle error states visually', async ({ page }) => {
    await test.step('Test with failed image loads', async () => {
      // Mock image failures
      await page.route('**/*.{png,jpg,jpeg,webp,svg}', route => {
        route.fulfill({ status: 404 });
      });

      await page.goto('/');
      await helpers.waitForPageLoad();
      
      await expect(page).toHaveScreenshot('homepage-failed-images.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });
  });

  test('should maintain focus states visually', async ({ page }) => {
    await test.step('Test keyboard focus indicators', async () => {
      await page.goto('/');
      await helpers.waitForPageLoad();
      
      // Tab to first interactive element
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200);
      
      await expect(page).toHaveScreenshot('homepage-focus-state.png', {
        animations: 'disabled'
      });
    });
  });
});

test.describe('Cross-Browser Visual Consistency', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await page.goto('/');
    await helpers.waitForPageLoad();
    await helpers.waitForSkeletonsToLoad();
  });

  test('should render consistently across browsers', async ({ page, browserName }) => {
    await test.step(`Visual consistency on ${browserName}`, async () => {
      await page.waitForTimeout(1000); // Allow browser-specific rendering
      
      await expect(page).toHaveScreenshot(`homepage-${browserName}.png`, {
        fullPage: true,
        animations: 'disabled',
        threshold: 0.3 // Allow for minor browser differences
      });
    });
  });

  test('should handle font rendering differences', async ({ page, browserName }) => {
    await test.step(`Font rendering on ${browserName}`, async () => {
      const heroSection = page.locator('[data-testid="hero-section"]');
      await expect(heroSection).toHaveScreenshot(`hero-fonts-${browserName}.png`, {
        animations: 'disabled',
        threshold: 0.4 // Fonts can vary significantly between browsers
      });
    });
  });
});