import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';
import { responsiveViewports } from '../utils/mock-data';

/**
 * Visual Regression Testing - Responsive Design
 * 
 * Tests visual consistency across different screen sizes and devices
 */

test.describe('Responsive Visual Regression', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should maintain visual consistency across all viewports', async ({ page }) => {
    const pages = [
      { path: '/', name: 'homepage' },
      { path: '/about', name: 'about' },
      { path: '/services', name: 'services' },
      { path: '/case-studies', name: 'case-studies' },
      { path: '/contact', name: 'contact' }
    ];

    for (const pagePath of pages) {
      await test.step(`Test ${pagePath.name} responsiveness`, async () => {
        for (const viewport of responsiveViewports) {
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          await page.goto(pagePath.path);
          await helpers.waitForPageLoad();
          await helpers.waitForSkeletonsToLoad();
          await helpers.waitForAnimationsToComplete();
          
          await expect(page).toHaveScreenshot(`${pagePath.name}-${viewport.name.toLowerCase().replace(' ', '-')}.png`, {
            fullPage: true,
            animations: 'disabled'
          });
        }
      });
    }
  });

  test('should handle responsive navigation', async ({ page }) => {
    await test.step('Test navigation across viewports', async () => {
      for (const viewport of responsiveViewports.slice(0, 4)) { // Test key viewports
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');
        await helpers.waitForPageLoad();
        
        // Capture navigation area
        const navigation = page.locator('header, nav');
        await expect(navigation).toHaveScreenshot(`navigation-${viewport.name.toLowerCase().replace(' ', '-')}.png`, {
          animations: 'disabled'
        });
      }
    });
  });

  test('should handle responsive forms', async ({ page }) => {
    await test.step('Test contact form responsiveness', async () => {
      for (const viewport of responsiveViewports.filter(v => v.width <= 1024)) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/contact');
        await helpers.waitForPageLoad();
        await helpers.waitForSkeletonsToLoad();
        
        const formContainer = page.locator('[data-testid="multi-step-form"]');
        await expect(formContainer).toHaveScreenshot(`contact-form-${viewport.name.toLowerCase().replace(' ', '-')}.png`, {
          animations: 'disabled'
        });
      }
    });
  });
});

test.describe('Component Visual Regression', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await page.goto('/');
    await helpers.waitForPageLoad();
    await helpers.waitForSkeletonsToLoad();
  });

  test('should maintain service card visual consistency', async ({ page }) => {
    await test.step('Test service cards across viewports', async () => {
      const viewportsToTest = [
        { width: 375, height: 667, name: 'mobile' },
        { width: 768, height: 1024, name: 'tablet' },
        { width: 1440, height: 900, name: 'desktop' }
      ];

      for (const viewport of viewportsToTest) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.waitForTimeout(500);
        
        const servicesSection = page.locator('[data-testid="services-overview"]');
        await servicesSection.scrollIntoViewIfNeeded();
        
        await expect(servicesSection).toHaveScreenshot(`services-cards-${viewport.name}.png`, {
          animations: 'disabled'
        });
      }
    });
  });

  test('should maintain case study grid visual consistency', async ({ page }) => {
    await test.step('Test case studies grid responsiveness', async () => {
      await page.goto('/case-studies');
      await helpers.waitForPageLoad();
      
      const viewportsToTest = [
        { width: 375, height: 667, name: 'mobile' },
        { width: 768, height: 1024, name: 'tablet' },
        { width: 1440, height: 900, name: 'desktop' }
      ];

      for (const viewport of viewportsToTest) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.waitForTimeout(500);
        
        const caseStudiesGrid = page.locator('[data-testid="case-studies-grid"]');
        await expect(caseStudiesGrid).toHaveScreenshot(`case-studies-grid-${viewport.name}.png`, {
          animations: 'disabled'
        });
      }
    });
  });
});