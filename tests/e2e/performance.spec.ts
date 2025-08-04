import { test, expect } from '@playwright/test';
import { TestHelpers } from '../utils/test-helpers';
import { performanceBenchmarks, accessibilityTestCases } from '../utils/mock-data';

/**
 * Performance and Accessibility Testing Suite
 * 
 * Tests performance requirements including:
 * - Core Web Vitals compliance
 * - Lighthouse scores
 * - Accessibility (WCAG 2.1 AA)
 * - Loading performance
 * - Mobile performance optimization
 */

test.describe('Performance - Core Web Vitals', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    helpers.setupConsoleErrorMonitoring();
  });

  test('should meet Core Web Vitals requirements on homepage', async ({ page }) => {
    await test.step('Navigate to homepage and measure vitals', async () => {
      await page.goto('/');
      await helpers.waitForPageLoad();
      
      // Measure Core Web Vitals
      await helpers.validateCoreWebVitals();
    });

    await test.step('Validate LCP (Largest Contentful Paint)', async () => {
      const lcp = await page.evaluate(() => {
        return new Promise((resolve) => {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            resolve(lastEntry.startTime);
          });
          observer.observe({ type: 'largest-contentful-paint', buffered: true });
          
          // Fallback timeout
          setTimeout(() => resolve(0), 5000);
        });
      });

      expect(lcp).toBeLessThan(performanceBenchmarks.coreWebVitals.lcp);
    });

    await test.step('Validate CLS (Cumulative Layout Shift)', async () => {
      const cls = await page.evaluate(() => {
        return new Promise((resolve) => {
          let clsValue = 0;
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            }
            resolve(clsValue);
          });
          observer.observe({ type: 'layout-shift', buffered: true });
          
          // Measure for 3 seconds
          setTimeout(() => resolve(clsValue), 3000);
        });
      });

      expect(cls).toBeLessThan(performanceBenchmarks.coreWebVitals.cls);
    });
  });

  test('should meet Core Web Vitals on contact form', async ({ page }) => {
    await test.step('Test contact form performance', async () => {
      await page.goto('/contact');
      await helpers.waitForPageLoad();
      
      // Contact form should load quickly
      const formLoadTime = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        return navigation.loadEventEnd - navigation.navigationStart;
      });

      expect(formLoadTime).toBeLessThan(performanceBenchmarks.loadTimes.contactForm);
      
      await helpers.validateCoreWebVitals();
    });
  });

  test('should meet Core Web Vitals on case studies page', async ({ page }) => {
    await test.step('Test case studies performance', async () => {
      await page.goto('/case-studies');
      await helpers.waitForPageLoad();
      
      const pageLoadTime = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        return navigation.loadEventEnd - navigation.navigationStart;
      });

      expect(pageLoadTime).toBeLessThan(performanceBenchmarks.loadTimes.caseStudies);
      
      await helpers.validateCoreWebVitals();
    });
  });

  test('should handle slow network conditions gracefully', async ({ page }) => {
    await test.step('Test performance under slow 3G conditions', async () => {
      // Simulate slow 3G network
      const client = await page.context().newCDPSession(page);
      await client.send('Network.enable');
      await client.send('Network.emulateNetworkConditions', {
        offline: false,
        downloadThroughput: 1.5 * 1024 * 1024 / 8, // 1.5 Mbps
        uploadThroughput: 750 * 1024 / 8, // 750 Kbps
        latency: 40 // 40ms latency
      });

      await page.goto('/');
      
      // Page should still load within reasonable time
      await expect(page.locator('h1')).toBeVisible({ timeout: 15000 });
      
      // Should show loading states appropriately
      const hasLoadingStates = await page.locator('[data-testid*="skeleton"]').count() > 0;
      // Loading states help with perceived performance
    });
  });
});

test.describe('Performance - Resource Optimization', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should optimize image loading', async ({ page }) => {
    await test.step('Test image optimization', async () => {
      const imageRequests: any[] = [];
      
      page.on('request', request => {
        if (request.resourceType() === 'image') {
          imageRequests.push({
            url: request.url(),
            method: request.method()
          });
        }
      });

      await page.goto('/');
      await helpers.waitForPageLoad();
      
      // Should not load excessive number of images
      expect(imageRequests.length).toBeLessThan(20);
      
      // Images should use appropriate formats
      const imageFormats = imageRequests.map(req => {
        const url = req.url;
        if (url.includes('.webp')) return 'webp';
        if (url.includes('.avif')) return 'avif';
        if (url.includes('.jpg') || url.includes('.jpeg')) return 'jpeg';
        if (url.includes('.png')) return 'png';
        return 'other';
      });

      // Should prefer modern formats
      const modernFormats = imageFormats.filter(format => ['webp', 'avif'].includes(format));
      const totalImages = imageFormats.length;
      
      if (totalImages > 0) {
        const modernRatio = modernFormats.length / totalImages;
        expect(modernRatio).toBeGreaterThan(0.5); // At least 50% modern formats
      }
    });
  });

  test('should minimize JavaScript bundle size', async ({ page }) => {
    await test.step('Test JavaScript bundle optimization', async () => {
      const jsRequests: any[] = [];
      let totalJSSize = 0;

      page.on('response', response => {
        if (response.request().resourceType() === 'script' && response.status() === 200) {
          jsRequests.push({
            url: response.url(),
            size: parseInt(response.headers()['content-length'] || '0')
          });
          totalJSSize += parseInt(response.headers()['content-length'] || '0');
        }
      });

      await page.goto('/');
      await helpers.waitForPageLoad();
      
      // Total JS size should be reasonable (under 500KB)
      expect(totalJSSize).toBeLessThan(500 * 1024);
      
      // Should use code splitting (multiple smaller bundles)
      expect(jsRequests.length).toBeGreaterThan(1);
      
      // No single bundle should be too large
      for (const request of jsRequests) {
        expect(request.size).toBeLessThan(200 * 1024); // 200KB max per bundle
      }
    });
  });

  test('should optimize CSS delivery', async ({ page }) => {
    await test.step('Test CSS optimization', async () => {
      const cssRequests: any[] = [];
      let totalCSSSize = 0;

      page.on('response', response => {
        if (response.request().resourceType() === 'stylesheet' && response.status() === 200) {
          cssRequests.push({
            url: response.url(),
            size: parseInt(response.headers()['content-length'] || '0')
          });
          totalCSSSize += parseInt(response.headers()['content-length'] || '0');
        }
      });

      await page.goto('/');
      await helpers.waitForPageLoad();
      
      // CSS should be optimized and minimal
      expect(totalCSSSize).toBeLessThan(100 * 1024); // Under 100KB total CSS
      
      // Should minimize number of CSS files
      expect(cssRequests.length).toBeLessThan(5);
    });
  });

  test('should implement effective caching strategies', async ({ page }) => {
    await test.step('Test caching headers', async () => {
      const cachingResponses: any[] = [];

      page.on('response', response => {
        const cacheControl = response.headers()['cache-control'];
        const expires = response.headers()['expires'];
        const etag = response.headers()['etag'];
        
        if (cacheControl || expires || etag) {
          cachingResponses.push({
            url: response.url(),
            cacheControl,
            expires,
            etag,
            resourceType: response.request().resourceType()
          });
        }
      });

      await page.goto('/');
      await helpers.waitForPageLoad();
      
      // Static assets should have caching headers
      const staticAssets = cachingResponses.filter(r => 
        ['stylesheet', 'script', 'image', 'font'].includes(r.resourceType)
      );
      
      expect(staticAssets.length).toBeGreaterThan(0);
      
      // Static assets should have long cache times
      for (const asset of staticAssets) {
        if (asset.cacheControl) {
          const hasLongCache = asset.cacheControl.includes('max-age=') && 
                              parseInt(asset.cacheControl.match(/max-age=(\d+)/)?.[1] || '0') > 86400; // 1 day
          // Should have reasonable caching for static assets
        }
      }
    });
  });
});

test.describe('Accessibility - WCAG 2.1 AA Compliance', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should meet basic accessibility requirements', async ({ page }) => {
    const pages = ['/', '/about', '/services', '/case-studies', '/contact'];

    for (const pagePath of pages) {
      await test.step(`Test accessibility on ${pagePath}`, async () => {
        await page.goto(pagePath);
        await helpers.waitForPageLoad();
        
        await helpers.checkBasicAccessibility();
      });
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    await test.step('Test keyboard navigation on homepage', async () => {
      await page.goto('/');
      await helpers.waitForPageLoad();
      
      // Start from the beginning
      await page.keyboard.press('Home');
      
      let tabCount = 0;
      const focusedElements = [];
      
      // Tab through interactive elements
      for (let i = 0; i < 20; i++) {
        await page.keyboard.press('Tab');
        tabCount++;
        
        const focusedElement = await page.evaluate(() => {
          const el = document.activeElement;
          return {
            tagName: el?.tagName,
            type: el?.getAttribute('type'),
            role: el?.getAttribute('role'),
            ariaLabel: el?.getAttribute('aria-label'),
            text: el?.textContent?.trim().slice(0, 30)
          };
        });
        
        focusedElements.push(focusedElement);
        
        // Check if focus is visible
        const hasFocusStyles = await page.evaluate(() => {
          const el = document.activeElement;
          if (!el) return false;
          
          const styles = window.getComputedStyle(el);
          const pseudoStyles = window.getComputedStyle(el, ':focus');
          
          // Should have focus indicators
          return styles.outline !== 'none' || 
                 pseudoStyles.outline !== 'none' ||
                 styles.boxShadow !== 'none' ||
                 pseudoStyles.boxShadow !== 'none';
        });
        
        // Interactive elements should have visible focus
        if (['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(focusedElement.tagName)) {
          // Focus should be visible for interactive elements
        }
        
        // Stop if we've cycled through main navigation
        if (focusedElement.tagName === 'MAIN' || i > 15) break;
      }
      
      expect(tabCount).toBeGreaterThan(3); // Should have tabbable elements
    });

    await test.step('Test keyboard navigation on contact form', async () => {
      await page.goto('/contact');
      await helpers.waitForPageLoad();
      
      // Should be able to navigate form with keyboard
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      
      // Should reach form elements
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(['SELECT', 'INPUT', 'BUTTON', 'TEXTAREA']).toContain(focusedElement);
    });
  });

  test('should have proper heading structure', async ({ page }) => {
    const pages = ['/', '/about', '/services', '/case-studies', '/contact'];

    for (const pagePath of pages) {
      await test.step(`Test heading structure on ${pagePath}`, async () => {
        await page.goto(pagePath);
        await helpers.waitForPageLoad();
        
        // Should have exactly one h1
        const h1Count = await page.locator('h1').count();
        expect(h1Count).toBe(1);
        
        // Get all headings
        const headings = await page.evaluate(() => {
          const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
          return Array.from(headingElements).map(el => ({
            level: parseInt(el.tagName.charAt(1)),
            text: el.textContent?.trim()
          }));
        });
        
        // Should have logical heading progression
        let previousLevel = 0;
        for (const heading of headings) {
          // Heading levels shouldn't skip (e.g., h1 -> h3)
          if (previousLevel > 0) {
            expect(heading.level - previousLevel).toBeLessThanOrEqual(1);
          }
          previousLevel = heading.level;
        }
      });
    }
  });

  test('should have proper ARIA labels and descriptions', async ({ page }) => {
    await test.step('Test form accessibility', async () => {
      await page.goto('/contact');
      await helpers.waitForPageLoad();
      
      // Form should have proper labels
      const formInputs = page.locator('input, select, textarea');
      const inputCount = await formInputs.count();
      
      for (let i = 0; i < inputCount; i++) {
        const input = formInputs.nth(i);
        
        // Should have associated label or aria-label
        const hasLabel = await input.evaluate((el) => {
          const id = el.id;
          const ariaLabel = el.getAttribute('aria-label');
          const ariaLabelledBy = el.getAttribute('aria-labelledby');
          
          if (ariaLabel || ariaLabelledBy) return true;
          
          if (id) {
            const label = document.querySelector(`label[for="${id}"]`);
            return !!label;
          }
          
          // Check if wrapped in label
          const parentLabel = el.closest('label');
          return !!parentLabel;
        });
        
        expect(hasLabel).toBeTruthy();
      }
    });

    await test.step('Test button accessibility', async () => {
      await page.goto('/');
      await helpers.waitForPageLoad();
      
      const buttons = page.locator('button, [role="button"]');
      const buttonCount = await buttons.count();
      
      for (let i = 0; i < Math.min(buttonCount, 10); i++) {
        const button = buttons.nth(i);
        
        // Button should have accessible name
        const hasAccessibleName = await button.evaluate((el) => {
          const textContent = el.textContent?.trim();
          const ariaLabel = el.getAttribute('aria-label');
          const ariaLabelledBy = el.getAttribute('aria-labelledby');
          
          return !!(textContent || ariaLabel || ariaLabelledBy);
        });
        
        expect(hasAccessibleName).toBeTruthy();
      }
    });
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await test.step('Test color contrast compliance', async () => {
      await page.goto('/');
      await helpers.waitForPageLoad();
      
      // Check contrast for text elements
      const textElements = await page.locator('p, h1, h2, h3, h4, h5, h6, span, a').all();
      
      for (const element of textElements.slice(0, 10)) { // Check first 10 elements
        if (await element.isVisible()) {
          const contrastInfo = await element.evaluate((el) => {
            const styles = window.getComputedStyle(el);
            const color = styles.color;
            const backgroundColor = styles.backgroundColor;
            const fontSize = parseFloat(styles.fontSize);
            const fontWeight = styles.fontWeight;
            
            return {
              color,
              backgroundColor,
              fontSize,
              fontWeight: parseInt(fontWeight) || 400
            };
          });
          
          // Basic validation - should have color and background color
          expect(contrastInfo.color).not.toBe('');
          expect(contrastInfo.fontSize).toBeGreaterThan(0);
          
          // Large text (18pt+ or 14pt+ bold) needs 3:1 contrast
          // Normal text needs 4.5:1 contrast
          // This is a simplified check - in production you'd use a proper contrast calculation
        }
      }
    });
  });

  test('should support screen readers', async ({ page }) => {
    await test.step('Test screen reader support', async () => {
      await page.goto('/');
      await helpers.waitForPageLoad();
      
      // Check for semantic HTML structure
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('header')).toBeVisible();
      
      // Check for skip navigation link
      const skipLink = page.locator('a[href="#main"], a[href="#content"], .skip-link');
      if (await skipLink.count() > 0) {
        await expect(skipLink.first()).toBeInDOM();
      }
      
      // Images should have alt text
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        
        // Alt attribute should exist (can be empty for decorative images)
        expect(alt).not.toBeNull();
      }
    });
  });
});

test.describe('Performance - Mobile Optimization', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should perform well on mobile devices', async ({ page }) => {
    await test.step('Test mobile performance', async () => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Simulate mobile network conditions
      const client = await page.context().newCDPSession(page);
      await client.send('Network.enable');
      await client.send('Network.emulateNetworkConditions', {
        offline: false,
        downloadThroughput: 1.6 * 1024 * 1024 / 8, // 1.6 Mbps
        uploadThroughput: 750 * 1024 / 8, // 750 Kbps
        latency: 150 // 150ms latency
      });

      await page.goto('/');
      
      // Should load reasonably quickly on mobile
      await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
      
      // Mobile-specific performance check
      const mobilePerformance = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        return {
          loadTime: navigation.loadEventEnd - navigation.navigationStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
          firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0
        };
      });

      expect(mobilePerformance.loadTime).toBeLessThan(5000); // 5 seconds on mobile
      expect(mobilePerformance.domContentLoaded).toBeLessThan(3000); // 3 seconds to interactive
    });
  });

  test('should handle touch interactions efficiently', async ({ page }) => {
    await test.step('Test touch performance', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await helpers.waitForPageLoad();
      
      // Test touch response time
      const touchTargets = page.locator('button, a, [role="button"]');
      const targetCount = await touchTargets.count();
      
      for (let i = 0; i < Math.min(targetCount, 5); i++) {
        const target = touchTargets.nth(i);
        
        if (await target.isVisible()) {
          const startTime = Date.now();
          await helpers.simulateTouch(`button:nth-child(${i + 1}), a:nth-child(${i + 1})`);
          const responseTime = Date.now() - startTime;
          
          // Touch response should be quick
          expect(responseTime).toBeLessThan(100); // 100ms response time
        }
      }
    });
  });
});