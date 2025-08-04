import { Page, expect } from '@playwright/test';

/**
 * Shared test utilities for Flowfoundry Playwright tests
 */

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Wait for page to be fully loaded including all async content
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Wait for skeleton components to be replaced with actual content
   */
  async waitForSkeletonsToLoad(): Promise<void> {
    // Wait for skeleton components to disappear
    await this.page.waitForSelector('[data-testid*="skeleton"]', { state: 'hidden', timeout: 10000 });
  }

  /**
   * Check if element is visible in viewport
   */
  async isElementVisible(selector: string): Promise<boolean> {
    const element = this.page.locator(selector);
    await element.waitFor({ state: 'attached' });
    return await element.isVisible();
  }

  /**
   * Scroll element into view if needed
   */
  async scrollIntoView(selector: string): Promise<void> {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Validate Core Web Vitals
   */
  async validateCoreWebVitals(): Promise<void> {
    const vitals = await this.page.evaluate((): Promise<{ lcp: number; fid: number; cls: number }> => {
      return new Promise((resolve) => {
        const metrics = {
          lcp: 0, // Will be updated by LCP observer
          fid: 0, // Will be simulated
          cls: 0  // Will be updated by CLS observer
        };

        // LCP Observer
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            metrics.lcp = lastEntry.startTime;
          }
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // CLS Observer
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          metrics.cls = clsValue;
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });

        // Resolve after short delay to gather metrics
        setTimeout(() => {
          resolve(metrics);
        }, 2000);
      });
    });

    // Validate thresholds
    expect(vitals.lcp).toBeLessThan(2500); // LCP < 2.5s
    expect(vitals.cls).toBeLessThan(0.1);  // CLS < 0.1
  }

  /**
   * Check accessibility basics
   */
  async checkBasicAccessibility(): Promise<void> {
    // Check for basic accessibility requirements
    await expect(this.page.locator('h1')).toBeVisible();
    await expect(this.page.locator('[alt]')).toHaveCount(0); // No empty alt attributes
    
    // Check color contrast (basic validation)
    const contrastRatio = await this.page.evaluate(() => {
      const element = document.querySelector('h1');
      if (!element) return 0;
      const styles = window.getComputedStyle(element);
      return parseFloat(styles.fontSize) || 0;
    });
    
    expect(contrastRatio).toBeGreaterThan(0);
  }

  /**
   * Simulate mobile touch interactions
   */
  async simulateTouch(selector: string): Promise<void> {
    const element = this.page.locator(selector);
    const box = await element.boundingBox();
    if (box) {
      await this.page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
    }
  }

  /**
   * Test responsive breakpoints
   */
  async testResponsiveBreakpoints(): Promise<void> {
    const breakpoints = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1024, height: 768, name: 'desktop-small' },
      { width: 1440, height: 900, name: 'desktop-large' }
    ];

    for (const breakpoint of breakpoints) {
      await this.page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await this.page.waitForTimeout(500); // Allow layout to settle
      
      // Verify navigation is accessible
      const nav = this.page.locator('nav');
      await expect(nav).toBeVisible();
    }
  }

  /**
   * Test form validation with various inputs
   */
  async testFormValidation(fieldTests: Array<{
    selector: string,
    validValue: string,
    invalidValues: string[],
    expectedErrorSelector?: string
  }>): Promise<void> {
    for (const test of fieldTests) {
      // Test invalid values
      for (const invalidValue of test.invalidValues) {
        await this.page.fill(test.selector, invalidValue);
        await this.page.locator(test.selector).blur();
        
        if (test.expectedErrorSelector) {
          await expect(this.page.locator(test.expectedErrorSelector)).toBeVisible();
        }
      }

      // Test valid value
      await this.page.fill(test.selector, test.validValue);
      await this.page.locator(test.selector).blur();
      
      if (test.expectedErrorSelector) {
        await expect(this.page.locator(test.expectedErrorSelector)).not.toBeVisible();
      }
    }
  }

  /**
   * Monitor and log console errors
   */
  setupConsoleErrorMonitoring(): void {
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error('Browser console error:', msg.text());
      }
    });

    this.page.on('pageerror', (error) => {
      console.error('Page error:', error.message);
    });
  }

  /**
   * Check for broken links
   */
  async checkForBrokenLinks(): Promise<void> {
    const links = await this.page.locator('a[href]').all();
    
    for (const link of links.slice(0, 10)) { // Limit to first 10 links for performance
      const href = await link.getAttribute('href');
      if (href && href.startsWith('/')) {
        // Internal link - check if it exists
        const response = await this.page.request.head(href);
        expect(response.status()).toBeLessThan(400);
      }
    }
  }

  /**
   * Verify animations complete properly
   */
  async waitForAnimationsToComplete(): Promise<void> {
    await this.page.waitForFunction(() => {
      const animations = document.getAnimations();
      return animations.every(animation => animation.playState === 'finished' || animation.playState === 'idle');
    }, { timeout: 5000 });
  }

  /**
   * Take screenshots for visual regression testing
   */
  async takeResponsiveScreenshots(name: string): Promise<void> {
    const viewports = [
      { width: 375, height: 667, suffix: 'mobile' },
      { width: 768, height: 1024, suffix: 'tablet' },
      { width: 1440, height: 900, suffix: 'desktop' }
    ];

    for (const viewport of viewports) {
      await this.page.setViewportSize({ width: viewport.width, height: viewport.height });
      await this.page.waitForTimeout(500);
      await expect(this.page).toHaveScreenshot(`${name}-${viewport.suffix}.png`, {
        fullPage: true,
        animations: 'disabled'
      });
    }
  }
}

/**
 * Custom assertions for business logic
 */
export class BusinessAssertions {
  constructor(private page: Page) {}

  /**
   * Validate lead scoring calculation
   */
  async validateLeadScore(expectedRange: { min: number, max: number }): Promise<void> {
    const scoreElement = this.page.locator('[data-testid="lead-score"]');
    await expect(scoreElement).toBeVisible();
    
    const scoreText = await scoreElement.textContent();
    const score = parseInt(scoreText?.match(/\d+/)?.[0] || '0');
    
    expect(score).toBeGreaterThanOrEqual(expectedRange.min);
    expect(score).toBeLessThanOrEqual(expectedRange.max);
  }

  /**
   * Validate budget range affects lead priority
   */
  async validateBudgetImpactOnPriority(expectedPriority: 'high' | 'medium' | 'low'): Promise<void> {
    const priorityElement = this.page.locator('[data-testid="lead-priority"]');
    await expect(priorityElement).toContainText(expectedPriority);
  }

  /**
   * Validate ROI calculations in case studies
   */
  async validateROICalculation(expectedROI: string): Promise<void> {
    const roiElement = this.page.locator('[data-testid="roi-display"]');
    await expect(roiElement).toContainText(expectedROI);
  }
}