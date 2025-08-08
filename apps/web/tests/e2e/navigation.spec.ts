import { test, expect } from '@playwright/test';
import { NavigationHeader } from '../utils/page-objects';
import { TestHelpers } from '../utils/test-helpers';
import { navigationTestCases } from '../utils/mock-data';

/**
 * Navigation and Routing Testing Suite
 * 
 * Tests all navigation functionality across the site including:
 * - Header navigation
 * - Mobile navigation
 * - Footer navigation  
 * - Cross-page routing
 * - URL handling
 */

test.describe('Navigation - Header and Main Navigation', () => {
  let navigationHeader: NavigationHeader;
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    navigationHeader = new NavigationHeader(page);
    helpers = new TestHelpers(page);
    
    helpers.setupConsoleErrorMonitoring();
    await page.goto('/');
    await helpers.waitForPageLoad();
  });

  test('should display header navigation correctly', async () => {
    await test.step('Validate header structure', async () => {
      await navigationHeader.validateHeader();
    });

    await test.step('Check logo is clickable and navigates home', async () => {
      // Navigate away from home first
      await navigationHeader.navigateToAbout();
      expect(navigationHeader.page.url()).toContain('/about');
      
      // Click logo to return home
      await navigationHeader.logo.click();
      await helpers.waitForPageLoad();
      
      const url = navigationHeader.page.url();
      expect(url).toMatch(/\/(#.*)?$/); // Should be home page
    });

    await test.step('Validate all navigation links are present', async () => {
      await expect(navigationHeader.homeLink).toBeVisible();
      await expect(navigationHeader.aboutLink).toBeVisible();
      await expect(navigationHeader.servicesLink).toBeVisible();
      await expect(navigationHeader.caseStudiesLink).toBeVisible();
      await expect(navigationHeader.contactLink).toBeVisible();
    });
  });

  test('should navigate to all main pages correctly', async () => {
    for (const testCase of navigationTestCases) {
      await test.step(`Navigate to ${testCase.page}`, async () => {
        // Navigate using the appropriate method
        switch (testCase.page) {
          case 'Home':
            await navigationHeader.navigateToHome();
            break;
          case 'About':
            await navigationHeader.navigateToAbout();
            break;
          case 'Services':
            await navigationHeader.navigateToServices();
            break;
          case 'Case Studies':
            await navigationHeader.navigateToCaseStudies();
            break;
          case 'Contact':
            await navigationHeader.navigateToContact();
            break;
        }
        
        // Verify URL and page content
        expect(navigationHeader.page.url()).toContain(testCase.path);
        
        // Check that page title or main heading contains expected content
        if (testCase.expectedTitle !== 'Stratalace') {
          const h1 = navigationHeader.page.locator('h1');
          await expect(h1).toContainText(new RegExp(testCase.expectedTitle, 'i'));
        }
      });
    }
  });

  test('should handle mobile navigation correctly', async () => {
    await test.step('Test mobile menu functionality', async () => {
      await navigationHeader.page.setViewportSize({ width: 375, height: 667 });
      await navigationHeader.page.reload();
      await helpers.waitForPageLoad();
      
      // Mobile menu button should be visible
      await expect(navigationHeader.mobileMenuButton).toBeVisible();
      
      // Desktop navigation should be hidden
      await expect(navigationHeader.navigationMenu).not.toBeVisible();
    });

    await test.step('Test mobile menu interactions', async () => {
      // Open mobile menu
      await navigationHeader.mobileMenuButton.click();
      await expect(navigationHeader.mobileMenu).toBeVisible();
      
      // Test navigation through mobile menu
      const mobileAboutLink = navigationHeader.mobileMenu.locator('[data-testid="mobile-nav-about"]');
      if (await mobileAboutLink.isVisible()) {
        await mobileAboutLink.click();
        await helpers.waitForPageLoad();
        expect(navigationHeader.page.url()).toContain('/about');
      }
      
      // Mobile menu should close after navigation
      await expect(navigationHeader.mobileMenu).not.toBeVisible();
    });

    await test.step('Test mobile menu close functionality', async () => {
      await navigationHeader.mobileMenuButton.click();
      await expect(navigationHeader.mobileMenu).toBeVisible();
      
      // Click outside to close (if implemented)
      await navigationHeader.page.click('main');
      
      // Or click close button
      const closeButton = navigationHeader.mobileMenu.locator('[data-testid="mobile-menu-close"]');
      if (await closeButton.isVisible()) {
        await closeButton.click();
      }
    });
  });

  test('should maintain active navigation state', async () => {
    const pages = [
      { path: '/about', linkSelector: '[data-testid="nav-about"]' },
      { path: '/services', linkSelector: '[data-testid="nav-services"]' },
      { path: '/case-studies', linkSelector: '[data-testid="nav-case-studies"]' },
      { path: '/contact', linkSelector: '[data-testid="nav-contact"]' }
    ];

    for (const page of pages) {
      await test.step(`Test active state for ${page.path}`, async () => {
        await navigationHeader.page.goto(page.path);
        await helpers.waitForPageLoad();
        
        const activeLink = navigationHeader.page.locator(page.linkSelector);
        
        // Active link should have active styling (aria-current or class)
        const ariaCurrent = await activeLink.getAttribute('aria-current');
        const classList = await activeLink.getAttribute('class');
        
        const hasActiveState = ariaCurrent === 'page' || 
                              classList?.includes('active') || 
                              classList?.includes('current');
        
        expect(hasActiveState).toBeTruthy();
      });
    }
  });

  test('should handle keyboard navigation', async () => {
    await test.step('Test tab navigation through header', async () => {
      // Start from beginning of page
      await navigationHeader.page.keyboard.press('Home');
      
      let focusedElements = [];
      
      // Tab through navigation elements
      for (let i = 0; i < 10; i++) {
        await navigationHeader.page.keyboard.press('Tab');
        
        const focusedElement = await navigationHeader.page.evaluate(() => {
          const el = document.activeElement;
          return {
            tagName: el?.tagName,
            role: el?.getAttribute('role'),
            ariaLabel: el?.getAttribute('aria-label'),
            textContent: el?.textContent?.trim().slice(0, 50)
          };
        });
        
        focusedElements.push(focusedElement);
        
        // Stop if we've reached the main content
        if (focusedElement.role === 'main' || focusedElement.tagName === 'MAIN') {
          break;
        }
      }
      
      // Should have focused on navigation elements
      const navigationElements = focusedElements.filter(el => 
        el.tagName === 'A' || el.tagName === 'BUTTON'
      );
      
      expect(navigationElements.length).toBeGreaterThan(0);
    });

    await test.step('Test enter key navigation', async () => {
      // Focus on About link and press Enter
      await navigationHeader.aboutLink.focus();
      await navigationHeader.page.keyboard.press('Enter');
      await helpers.waitForPageLoad();
      
      expect(navigationHeader.page.url()).toContain('/about');
    });
  });
});

test.describe('Navigation - Cross-page and URL Handling', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    helpers.setupConsoleErrorMonitoring();
  });

  test('should handle direct URL navigation', async ({ page }) => {
    const directURLs = [
      '/',
      '/about',
      '/services', 
      '/services/multi-agent-ai-systems',
      '/services/operational-optimization',
      '/case-studies',
      '/case-studies/manufacturing-automation',
      '/contact'
    ];

    for (const url of directURLs) {
      await test.step(`Test direct navigation to ${url}`, async () => {
        await page.goto(url);
        await helpers.waitForPageLoad();
        
        // Page should load successfully (not 404)
        const is404 = await page.locator('text=404').isVisible().catch(() => false);
        expect(is404).toBeFalsy();
        
        // Should have proper page structure
        await expect(page.locator('header')).toBeVisible();
        await expect(page.locator('main, [role="main"]')).toBeVisible();
      });
    }
  });

  test('should handle invalid URLs gracefully', async ({ page }) => {
    const invalidURLs = [
      '/nonexistent-page',
      '/services/invalid-service',
      '/case-studies/invalid-case-study',
      '/random/nested/path'
    ];

    for (const url of invalidURLs) {
      await test.step(`Test invalid URL: ${url}`, async () => {
        const response = await page.goto(url);
        
        // Should return 404 status
        expect(response?.status()).toBe(404);
        
        // Should show proper 404 page
        const has404Content = await page.locator('text=/404|not found/i').isVisible();
        expect(has404Content).toBeTruthy();
        
        // Should still have navigation to get back
        await expect(page.locator('header')).toBeVisible();
      });
    }
  });

  test('should handle browser back/forward navigation', async ({ page }) => {
    await test.step('Test browser back/forward buttons', async () => {
      // Navigate through several pages
      await page.goto('/');
      await helpers.waitForPageLoad();
      
      await page.goto('/about');
      await helpers.waitForPageLoad();
      
      await page.goto('/services');
      await helpers.waitForPageLoad();
      
      await page.goto('/contact');
      await helpers.waitForPageLoad();
      
      // Use browser back button
      await page.goBack();
      expect(page.url()).toContain('/services');
      
      await page.goBack();
      expect(page.url()).toContain('/about');
      
      await page.goBack();
      expect(page.url()).toMatch(/\/(#.*)?$/); // Home page
      
      // Use browser forward button
      await page.goForward();
      expect(page.url()).toContain('/about');
      
      await page.goForward();
      expect(page.url()).toContain('/services');
    });
  });

  test('should handle URL parameters and fragments', async ({ page }) => {
    await test.step('Test URL parameters', async () => {
      await page.goto('/contact?source=navigation-test');
      await helpers.waitForPageLoad();
      
      // Page should load normally with parameters
      await expect(page.locator('[data-testid="multi-step-form"]')).toBeVisible();
      
      // URL should preserve parameters
      expect(page.url()).toContain('source=navigation-test');
    });

    await test.step('Test URL fragments', async () => {
      await page.goto('/about#team-section');
      await helpers.waitForPageLoad();
      
      // Should navigate to specific section if implemented
      expect(page.url()).toContain('#team-section');
    });
  });

  test('should handle concurrent navigation', async ({ page }) => {
    await test.step('Test rapid navigation changes', async () => {
      // Simulate rapid navigation
      const navigationPromises = [
        page.goto('/about'),
        page.goto('/services'),
        page.goto('/case-studies')
      ];
      
      // Wait for last navigation to complete
      await Promise.all(navigationPromises);
      await helpers.waitForPageLoad();
      
      // Should end up at the last navigated page
      expect(page.url()).toContain('/case-studies');
      
      // Page should be functional
      await expect(page.locator('main')).toBeVisible();
    });
  });
});

test.describe('Navigation - Footer and Secondary Navigation', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    await page.goto('/');
    await helpers.waitForPageLoad();
  });

  test('should display footer navigation correctly', async ({ page }) => {
    await test.step('Validate footer structure', async () => {
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
      
      // Scroll to footer
      await footer.scrollIntoViewIfNeeded();
      await expect(footer).toBeInViewport();
    });

    await test.step('Test footer navigation links', async () => {
      const footerLinks = page.locator('footer a[href]');
      const linkCount = await footerLinks.count();
      
      expect(linkCount).toBeGreaterThan(0);
      
      // Test first few footer links
      for (let i = 0; i < Math.min(linkCount, 5); i++) {
        const link = footerLinks.nth(i);
        const href = await link.getAttribute('href');
        
        if (href && href.startsWith('/')) {
          // Internal link - should be valid
          await link.click();
          await helpers.waitForPageLoad();
          
          // Should not be a 404
          const is404 = await page.locator('text=404').isVisible().catch(() => false);
          expect(is404).toBeFalsy();
          
          // Go back for next test
          await page.goBack();
          await helpers.waitForPageLoad();
        }
      }
    });

    await test.step('Test newsletter signup if present', async () => {
      const newsletterForm = page.locator('[data-testid="newsletter-signup"]');
      
      if (await newsletterForm.isVisible()) {
        const emailInput = newsletterForm.locator('input[type="email"]');
        const submitButton = newsletterForm.locator('button[type="submit"]');
        
        await expect(emailInput).toBeVisible();
        await expect(submitButton).toBeVisible();
        
        // Test newsletter signup
        await emailInput.fill('test@example.com');
        await submitButton.click();
        
        // Should show success or error message
        await expect(page.locator('[data-testid="newsletter-message"]')).toBeVisible({ timeout: 5000 });
      }
    });
  });

  test('should handle social media links', async ({ page }) => {
    await test.step('Test social media link structure', async () => {
      const socialLinks = page.locator('footer a[href*="twitter"], footer a[href*="linkedin"], footer a[href*="github"]');
      const socialCount = await socialLinks.count();
      
      if (socialCount > 0) {
        for (let i = 0; i < socialCount; i++) {
          const link = socialLinks.nth(i);
          const href = await link.getAttribute('href');
          
          // Should be external links
          expect(href).toMatch(/^https?:\/\//);
          
          // Should have proper target and rel attributes for external links
          const target = await link.getAttribute('target');
          const rel = await link.getAttribute('rel');
          
          expect(target).toBe('_blank');
          expect(rel).toContain('noopener');
        }
      }
    });
  });
});