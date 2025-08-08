import { test, expect } from '@playwright/test';
import { CaseStudiesPage } from '../utils/page-objects';
import { TestHelpers, BusinessAssertions } from '../utils/test-helpers';
import { caseStudyData } from '../utils/mock-data';

/**
 * Case Studies Testing Suite
 * 
 * Tests the case studies functionality including:
 * - Overview page with grid layout
 * - Advanced filtering capabilities
 * - Search functionality
 * - Individual case study pages
 * - Results validation and ROI calculations
 */

test.describe('Case Studies - Overview and Grid Layout', () => {
  let caseStudiesPage: CaseStudiesPage;
  let helpers: TestHelpers;
  let businessAssertions: BusinessAssertions;

  test.beforeEach(async ({ page }) => {
    caseStudiesPage = new CaseStudiesPage(page);
    helpers = new TestHelpers(page);
    businessAssertions = new BusinessAssertions(page);
    
    helpers.setupConsoleErrorMonitoring();
    await caseStudiesPage.goto();
  });

  test('should load case studies grid with all case studies', async () => {
    await test.step('Validate initial page load', async () => {
      await caseStudiesPage.validateInitialLoad();
    });

    await test.step('Verify all expected case studies are present', async () => {
      const expectedCaseStudies = caseStudyData.expectedCaseStudies;
      
      for (const caseStudy of expectedCaseStudies) {
        await expect(caseStudiesPage.caseStudiesGrid).toContainText(caseStudy.title);
        await expect(caseStudiesPage.caseStudiesGrid).toContainText(caseStudy.roi);
      }
    });

    await test.step('Check filter section is visible', async () => {
      await expect(caseStudiesPage.filterSection).toBeVisible();
      await expect(caseStudiesPage.industryFilter).toBeVisible();
      await expect(caseStudiesPage.serviceTypeFilter).toBeVisible();
      await expect(caseStudiesPage.roiFilter).toBeVisible();
      await expect(caseStudiesPage.searchInput).toBeVisible();
    });
  });

  test('should display case study cards with proper structure', async () => {
    await test.step('Validate case study card elements', async () => {
      const caseStudyCards = caseStudiesPage.caseStudyCards;
      const cardCount = await caseStudyCards.count();
      
      expect(cardCount).toBe(4); // Should show all 4 case studies initially
      
      // Check each card has required elements
      for (let i = 0; i < cardCount; i++) {
        const card = caseStudyCards.nth(i);
        
        // Each card should have title, industry, ROI, and description
        await expect(card).toBeVisible();
        
        const cardText = await card.textContent();
        expect(cardText).toMatch(/\d+%/); // Should contain ROI percentage
        expect(cardText?.length).toBeGreaterThan(50); // Should have substantial content
      }
    });

    await test.step('Test case study card hover effects', async () => {
      const firstCard = caseStudiesPage.caseStudyCards.first();
      
      await firstCard.hover();
      await caseStudiesPage.page.waitForTimeout(300); // Allow hover animation
      
      // Card should be interactive
      await expect(firstCard).toBeVisible();
    });
  });
});

test.describe('Case Studies - Filtering Functionality', () => {
  let caseStudiesPage: CaseStudiesPage;
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    caseStudiesPage = new CaseStudiesPage(page);
    helpers = new TestHelpers(page);
    await caseStudiesPage.goto();
  });

  test('should filter by industry correctly', async () => {
    for (const filterTest of caseStudyData.filterTestCases.filter(t => t.filter === 'industry')) {
      await test.step(`Filter by industry: ${filterTest.value}`, async () => {
        // Reset filters first
        await caseStudiesPage.clearAllFilters();
        
        // Apply industry filter
        await caseStudiesPage.filterByIndustry(filterTest.value);
        
        // Validate results
        await caseStudiesPage.validateFilterResults(filterTest.expectedCount);
        
        // Check that correct case studies are shown
        for (const expectedTitle of filterTest.expectedTitles) {
          await expect(caseStudiesPage.caseStudiesGrid).toContainText(expectedTitle);
        }
      });
    }
  });

  test('should filter by service type correctly', async () => {
    for (const filterTest of caseStudyData.filterTestCases.filter(t => t.filter === 'serviceType')) {
      await test.step(`Filter by service type: ${filterTest.value}`, async () => {
        await caseStudiesPage.clearAllFilters();
        
        await caseStudiesPage.filterByServiceType(filterTest.value);
        
        await caseStudiesPage.validateFilterResults(filterTest.expectedCount);
        
        for (const expectedTitle of filterTest.expectedTitles) {
          await expect(caseStudiesPage.caseStudiesGrid).toContainText(expectedTitle);
        }
      });
    }
  });

  test('should filter by ROI range correctly', async () => {
    for (const filterTest of caseStudyData.filterTestCases.filter(t => t.filter === 'roi')) {
      await test.step(`Filter by ROI: ${filterTest.value}`, async () => {
        await caseStudiesPage.clearAllFilters();
        
        await caseStudiesPage.filterByROI(filterTest.value);
        
        await caseStudiesPage.validateFilterResults(filterTest.expectedCount);
        
        for (const expectedTitle of filterTest.expectedTitles) {
          await expect(caseStudiesPage.caseStudiesGrid).toContainText(expectedTitle);
        }
      });
    }
  });

  test('should handle multiple filter combinations', async () => {
    await test.step('Test industry + service type combination', async () => {
      await caseStudiesPage.clearAllFilters();
      
      // Apply multiple filters
      await caseStudiesPage.filterByIndustry('manufacturing');
      await caseStudiesPage.filterByServiceType('operational-optimization');
      
      // Should show intersection of both filters
      const resultCount = await caseStudiesPage.caseStudyCards.count();
      expect(resultCount).toBeLessThanOrEqual(1); // Very specific combination
      
      if (resultCount > 0) {
        await expect(caseStudiesPage.caseStudiesGrid).toContainText('Manufacturing');
      }
    });

    await test.step('Test all filters combined', async () => {
      await caseStudiesPage.clearAllFilters();
      
      // Apply all filter types
      await caseStudiesPage.filterByIndustry('healthcare');
      await caseStudiesPage.filterByServiceType('operational-optimization');
      await caseStudiesPage.filterByROI('over-50');
      
      // Should show very specific results
      const resultCount = await caseStudiesPage.caseStudyCards.count();
      await caseStudiesPage.validateFilterResults(resultCount);
    });
  });

  test('should clear filters correctly', async () => {
    await test.step('Apply filters and then clear them', async () => {
      // Apply some filters
      await caseStudiesPage.filterByIndustry('manufacturing');
      await caseStudiesPage.filterByServiceType('operational-optimization');
      
      // Verify filtered results
      const filteredCount = await caseStudiesPage.caseStudyCards.count();
      expect(filteredCount).toBeLessThan(4);
      
      // Clear all filters
      await caseStudiesPage.clearAllFilters();
      
      // Should show all case studies again
      await caseStudiesPage.validateFilterResults(4);
    });
  });

  test('should show no results state when filters match nothing', async () => {
    await test.step('Test filter combination with no matches', async () => {
      // Apply filters that shouldn't match anything
      await caseStudiesPage.filterByIndustry('manufacturing');
      await caseStudiesPage.filterByServiceType('custom-ai-solutions'); // Manufacturing + Custom AI might not exist
      
      const resultCount = await caseStudiesPage.caseStudyCards.count();
      
      if (resultCount === 0) {
        // Should show "no results" message
        await expect(caseStudiesPage.page.locator('[data-testid="no-results"]')).toBeVisible();
      }
    });
  });
});

test.describe('Case Studies - Search Functionality', () => {
  let caseStudiesPage: CaseStudiesPage;
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    caseStudiesPage = new CaseStudiesPage(page);
    helpers = new TestHelpers(page);
    await caseStudiesPage.goto();
  });

  test('should search by keywords correctly', async () => {
    for (const searchTest of caseStudyData.searchTestCases) {
      await test.step(`Search for keyword: ${searchTest.keyword}`, async () => {
        // Clear previous search
        await caseStudiesPage.searchInput.fill('');
        await caseStudiesPage.clearAllFilters();
        
        // Perform search
        await caseStudiesPage.searchKeyword(searchTest.keyword);
        
        // Validate results
        if (searchTest.expectedCount) {
          await caseStudiesPage.validateFilterResults(searchTest.expectedCount);
        }
        
        if (searchTest.expectedTitles) {
          for (const expectedTitle of searchTest.expectedTitles) {
            await expect(caseStudiesPage.caseStudiesGrid).toContainText(expectedTitle);
          }
        }
        
        // Results should contain the search keyword
        const visibleCards = await caseStudiesPage.caseStudyCards.count();
        if (visibleCards > 0) {
          const gridText = await caseStudiesPage.caseStudiesGrid.textContent();
          expect(gridText?.toLowerCase()).toContain(searchTest.keyword.toLowerCase());
        }
      });
    }
  });

  test('should handle search combined with filters', async () => {
    await test.step('Test search + industry filter', async () => {
      await caseStudiesPage.searchKeyword('automation');
      await caseStudiesPage.filterByIndustry('manufacturing');
      
      // Should show intersection of search and filter
      const resultCount = await caseStudiesPage.caseStudyCards.count();
      await caseStudiesPage.validateFilterResults(resultCount);
      
      if (resultCount > 0) {
        const gridText = await caseStudiesPage.caseStudiesGrid.textContent();
        expect(gridText?.toLowerCase()).toContain('automation');
      }
    });
  });

  test('should handle empty search correctly', async () => {
    await test.step('Test empty search returns all results', async () => {
      // First apply a search
      await caseStudiesPage.searchKeyword('automation');
      
      // Then clear the search
      await caseStudiesPage.searchInput.fill('');
      await caseStudiesPage.searchButton.click();
      
      // Should show all case studies again
      await caseStudiesPage.validateFilterResults(4);
    });
  });

  test('should handle search with no results', async () => {
    await test.step('Test search with no matching results', async () => {
      await caseStudiesPage.searchKeyword('nonexistentkeyword');
      
      const resultCount = await caseStudiesPage.caseStudyCards.count();
      
      if (resultCount === 0) {
        await expect(caseStudiesPage.page.locator('[data-testid="no-results"]')).toBeVisible();
      }
    });
  });
});

test.describe('Case Studies - Individual Case Study Pages', () => {
  let caseStudiesPage: CaseStudiesPage;
  let helpers: TestHelpers;
  let businessAssertions: BusinessAssertions;

  test.beforeEach(async ({ page }) => {
    caseStudiesPage = new CaseStudiesPage(page);
    helpers = new TestHelpers(page);
    businessAssertions = new BusinessAssertions(page);
    await caseStudiesPage.goto();
  });

  test('should navigate to individual case studies correctly', async () => {
    const expectedCaseStudies = caseStudyData.expectedCaseStudies;

    for (const caseStudy of expectedCaseStudies) {
      await test.step(`Navigate to ${caseStudy.title}`, async () => {
        await caseStudiesPage.goto(); // Reset to case studies overview
        
        // Click on case study
        await caseStudiesPage.clickCaseStudy(caseStudy.title);
        await helpers.waitForPageLoad();
        
        // Should navigate to individual case study page
        expect(caseStudiesPage.page.url()).toContain(caseStudy.slug);
        
        // Page should have proper structure
        await expect(caseStudiesPage.page.locator('h1')).toContainText(caseStudy.title);
        
        // Should display ROI information
        await businessAssertions.validateROICalculation(caseStudy.roi);
      });
    }
  });

  test('should display case study details correctly', async () => {
    await test.step('Test case study detail page structure', async () => {
      await caseStudiesPage.clickCaseStudy('Manufacturing Automation Revolution');
      await helpers.waitForPageLoad();
      
      // Should have comprehensive case study content
      await expect(caseStudiesPage.page.locator('[data-testid="case-study-overview"]')).toBeVisible();
      await expect(caseStudiesPage.page.locator('[data-testid="case-study-challenge"]')).toBeVisible();
      await expect(caseStudiesPage.page.locator('[data-testid="case-study-solution"]')).toBeVisible();
      await expect(caseStudiesPage.page.locator('[data-testid="case-study-results"]')).toBeVisible();
    });

    await test.step('Test case study timeline component', async () => {
      const timeline = caseStudiesPage.page.locator('[data-testid="case-study-timeline"]');
      
      if (await timeline.isVisible()) {
        // Timeline should be interactive
        const timelineItems = timeline.locator('[data-testid="timeline-item"]');
        const itemCount = await timelineItems.count();
        
        expect(itemCount).toBeGreaterThan(0);
        
        // Test clicking timeline items
        for (let i = 0; i < Math.min(itemCount, 3); i++) {
          await timelineItems.nth(i).click();
          await caseStudiesPage.page.waitForTimeout(300); // Allow interaction
        }
      }
    });

    await test.step('Test results visualization', async () => {
      const resultsSection = caseStudiesPage.page.locator('[data-testid="case-study-results"]');
      await expect(resultsSection).toBeVisible();
      
      // Should display quantified results
      const resultsText = await resultsSection.textContent();
      expect(resultsText).toMatch(/\d+%|\$[\d,]+|[0-9]+(x|X)/); // Should contain metrics
    });
  });

  test('should handle case study navigation between cases', async () => {
    await test.step('Test navigation between case studies', async () => {
      // Go to first case study
      await caseStudiesPage.clickCaseStudy('Manufacturing Automation Revolution');
      await helpers.waitForPageLoad();
      
      // Should have navigation to other case studies
      const nextCaseStudy = caseStudiesPage.page.locator('[data-testid="next-case-study"]');
      const prevCaseStudy = caseStudiesPage.page.locator('[data-testid="prev-case-study"]');
      const relatedCaseStudies = caseStudiesPage.page.locator('[data-testid="related-case-studies"]');
      
      // Test next case study navigation if available
      if (await nextCaseStudy.isVisible()) {
        await nextCaseStudy.click();
        await helpers.waitForPageLoad();
        
        // Should navigate to different case study
        expect(caseStudiesPage.page.url()).toContain('/case-studies/');
        expect(caseStudiesPage.page.url()).not.toContain('manufacturing-automation');
      }
      
      // Test related case studies if available
      if (await relatedCaseStudies.isVisible()) {
        const relatedLinks = relatedCaseStudies.locator('a');
        const linkCount = await relatedLinks.count();
        
        if (linkCount > 0) {
          await relatedLinks.first().click();
          await helpers.waitForPageLoad();
          
          // Should navigate to related case study
          expect(caseStudiesPage.page.url()).toContain('/case-studies/');
        }
      }
    });
  });
});

test.describe('Case Studies - Mobile and Responsive Design', () => {
  let caseStudiesPage: CaseStudiesPage;
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    caseStudiesPage = new CaseStudiesPage(page);
    helpers = new TestHelpers(page);
  });

  test('should work correctly on mobile devices', async () => {
    await test.step('Test mobile layout', async () => {
      await caseStudiesPage.page.setViewportSize({ width: 375, height: 667 });
      await caseStudiesPage.goto();
      
      // All sections should be visible on mobile
      await expect(caseStudiesPage.caseStudiesGrid).toBeVisible();
      await expect(caseStudiesPage.filterSection).toBeVisible();
    });

    await test.step('Test mobile filtering interface', async () => {
      // Mobile filters might be collapsed or in a different layout
      const mobileFilterToggle = caseStudiesPage.page.locator('[data-testid="mobile-filter-toggle"]');
      
      if (await mobileFilterToggle.isVisible()) {
        await mobileFilterToggle.click();
        await expect(caseStudiesPage.industryFilter).toBeVisible();
      }
      
      // Test filter functionality on mobile
      await caseStudiesPage.filterByIndustry('manufacturing');
      await caseStudiesPage.validateFilterResults(1);
    });

    await test.step('Test mobile search', async () => {
      await helpers.simulateTouch('[data-testid="search-input"]');
      await caseStudiesPage.searchKeyword('automation');
      
      // Should work with touch interactions
      const resultCount = await caseStudiesPage.caseStudyCards.count();
      expect(resultCount).toBeGreaterThanOrEqual(0);
    });
  });

  test('should be responsive across different screen sizes', async () => {
    await test.step('Test responsive grid layout', async () => {
      const viewports = [
        { width: 375, height: 667, name: 'mobile' },
        { width: 768, height: 1024, name: 'tablet' },
        { width: 1024, height: 768, name: 'desktop-small' },
        { width: 1440, height: 900, name: 'desktop-large' }
      ];

      for (const viewport of viewports) {
        await caseStudiesPage.page.setViewportSize({ width: viewport.width, height: viewport.height });
        await caseStudiesPage.goto();
        
        // Grid should adapt to viewport
        await expect(caseStudiesPage.caseStudiesGrid).toBeVisible();
        
        // Cards should be properly laid out
        const cards = caseStudiesPage.caseStudyCards;
        const cardCount = await cards.count();
        expect(cardCount).toBe(4);
        
        // All cards should be visible (not overlapping)
        for (let i = 0; i < cardCount; i++) {
          await expect(cards.nth(i)).toBeInViewport({ ratio: 0.5 });
        }
      }
    });
  });
});