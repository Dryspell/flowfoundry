import { test, expect } from '@playwright/test';
import { ServicesPage, ContactFormPage } from '../utils/page-objects';
import { TestHelpers } from '../utils/test-helpers';
import { servicesData } from '../utils/mock-data';

/**
 * Services Testing Suite
 * 
 * Tests the services functionality including:
 * - Services overview page
 * - Individual service detail pages
 * - Dynamic routing for service slugs
 * - Pricing validation
 * - CTA navigation to contact form
 */

test.describe('Services - Overview Page', () => {
  let servicesPage: ServicesPage;
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    servicesPage = new ServicesPage(page);
    helpers = new TestHelpers(page);
    
    helpers.setupConsoleErrorMonitoring();
    await servicesPage.goto();
  });

  test('should display all services correctly', async () => {
    await test.step('Validate services grid structure', async () => {
      await servicesPage.validateServicesOverview();
    });

    await test.step('Check all expected services are present', async () => {
      const expectedServices = servicesData.expectedServices;
      
      for (const service of expectedServices) {
        await expect(servicesPage.servicesGrid).toContainText(service.title);
        await expect(servicesPage.servicesGrid).toContainText(service.priceRange);
      }
    });

    await test.step('Validate service card structure', async () => {
      const serviceCards = servicesPage.serviceCards;
      const cardCount = await serviceCards.count();
      
      expect(cardCount).toBe(4);
      
      // Each card should have title, description, pricing, and CTA
      for (let i = 0; i < cardCount; i++) {
        const card = serviceCards.nth(i);
        
        await expect(card).toBeVisible();
        
        const cardText = await card.textContent();
        expect(cardText).toMatch(/\$[\d,]+(K|-)/); // Should contain pricing
        expect(cardText?.length).toBeGreaterThan(100); // Should have substantial content
      }
    });
  });

  test('should handle service card interactions', async () => {
    await test.step('Test service card hover effects', async () => {
      const serviceCards = servicesPage.serviceCards;
      const cardCount = await serviceCards.count();
      
      for (let i = 0; i < cardCount; i++) {
        await serviceCards.nth(i).hover();
        await servicesPage.page.waitForTimeout(300); // Allow hover animation
        
        // Card should remain visible and interactive
        await expect(serviceCards.nth(i)).toBeVisible();
      }
    });

    await test.step('Test navigation to individual service pages', async () => {
      const expectedServices = servicesData.expectedServices;
      
      for (const service of expectedServices) {
        await servicesPage.goto(); // Reset to services overview
        
        // Click on service card
        const serviceCard = servicesPage.page.locator(`[data-testid="service-card"]:has-text("${service.title}")`);
        await serviceCard.click();
        await helpers.waitForPageLoad();
        
        // Should navigate to individual service page
        expect(servicesPage.page.url()).toContain(service.slug);
      }
    });
  });

  test('should display pricing information correctly', async () => {
    await test.step('Validate pricing format and ranges', async () => {
      const expectedServices = servicesData.expectedServices;
      
      for (const service of expectedServices) {
        await expect(servicesPage.servicesGrid).toContainText(service.priceRange);
        
        // Pricing should be properly formatted
        const pricingElements = servicesPage.page.locator(`text=${service.priceRange}`);
        await expect(pricingElements.first()).toBeVisible();
      }
    });

    await test.step('Test pricing calculations are consistent', async () => {
      // Verify that pricing ranges make sense
      const pricingTexts = await servicesPage.page.locator('[data-testid="service-pricing"]').allTextContents();
      
      for (const pricingText of pricingTexts) {
        // Should contain dollar amounts
        expect(pricingText).toMatch(/\$[\d,]+(K|-[\d,]+K)/);
        
        // Ranges should be logical (min < max)
        const amounts = pricingText.match(/\$(\d+)K/g);
        if (amounts && amounts.length === 2) {
          const min = parseInt(amounts[0].replace(/\$|K/g, ''));
          const max = parseInt(amounts[1].replace(/\$|K/g, ''));
          expect(max).toBeGreaterThan(min);
        }
      }
    });
  });
});

test.describe('Services - Individual Service Pages', () => {
  let servicesPage: ServicesPage;
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    servicesPage = new ServicesPage(page);
    helpers = new TestHelpers(page);
    helpers.setupConsoleErrorMonitoring();
  });

  test('should load individual service pages correctly', async () => {
    const expectedServices = servicesData.expectedServices;

    for (const service of expectedServices) {
      await test.step(`Test ${service.title} service page`, async () => {
        await servicesPage.gotoServiceDetail(service.slug);
        
        // Validate service detail page structure
        await servicesPage.validateServiceDetail();
        
        // Check page title and content
        await expect(servicesPage.page.locator('h1')).toContainText(service.title);
        
        // Validate pricing is displayed correctly
        await servicesPage.validatePricing(service.priceRange);
        
        // Check that description content is present
        const descriptionText = await servicesPage.serviceDescription.textContent();
        expect(descriptionText?.length).toBeGreaterThan(200); // Should have substantial content
      });
    }
  });

  test('should handle dynamic routing correctly', async () => {
    await test.step('Test all service slugs route correctly', async () => {
      const expectedServices = servicesData.expectedServices;
      
      for (const service of expectedServices) {
        // Direct navigation to service URL
        await servicesPage.page.goto(`/services/${service.slug}`);
        await helpers.waitForPageLoad();
        
        // Should not be 404
        const is404 = await servicesPage.page.locator('text=404').isVisible().catch(() => false);
        expect(is404).toBeFalsy();
        
        // Should have proper page structure
        await expect(servicesPage.page.locator('h1')).toBeVisible();
        await expect(servicesPage.serviceDetailSection).toBeVisible();
      }
    });

    await test.step('Test invalid service slugs return 404', async () => {
      const invalidSlugs = [
        'nonexistent-service',
        'invalid-slug',
        'random-service-name'
      ];

      for (const slug of invalidSlugs) {
        const response = await servicesPage.page.goto(`/services/${slug}`);
        expect(response?.status()).toBe(404);
      }
    });
  });

  test('should display comprehensive service information', async () => {
    await test.step('Test Multi-Agent AI Systems service details', async () => {
      await servicesPage.gotoServiceDetail('multi-agent-ai-systems');
      
      // Should have detailed service information
      await expect(servicesPage.serviceDescription).toContainText(/multi-agent|AI|automation/i);
      await servicesPage.validatePricing('$25K-$150K');
      
      // Should have features/benefits section
      const featuresSection = servicesPage.page.locator('[data-testid="service-features"]');
      if (await featuresSection.isVisible()) {
        const featuresText = await featuresSection.textContent();
        expect(featuresText?.length).toBeGreaterThan(100);
      }
    });

    await test.step('Test Operational Optimization service details', async () => {
      await servicesPage.gotoServiceDetail('operational-optimization');
      
      await expect(servicesPage.serviceDescription).toContainText(/optimization|efficiency|process/i);
      await servicesPage.validatePricing('$15K-$100K');
    });

    await test.step('Test AI-Accelerated Transformation service details', async () => {
      await servicesPage.gotoServiceDetail('ai-accelerated-transformation');
      
      await expect(servicesPage.serviceDescription).toContainText(/transformation|enterprise|digital/i);
      await servicesPage.validatePricing('$75K-$500K');
    });

    await test.step('Test Custom AI Solutions service details', async () => {
      await servicesPage.gotoServiceDetail('custom-ai-solutions');
      
      await expect(servicesPage.serviceDescription).toContainText(/custom|tailored|solution/i);
      await servicesPage.validatePricing('$35K-$250K');
    });
  });

  test('should have proper service methodology and process', async () => {
    await test.step('Test service methodology section', async () => {
      await servicesPage.gotoServiceDetail('multi-agent-ai-systems');
      
      const methodologySection = servicesPage.page.locator('[data-testid="service-methodology"]');
      if (await methodologySection.isVisible()) {
        // Should describe the process/approach
        const methodologyText = await methodologySection.textContent();
        expect(methodologyText).toMatch(/process|approach|methodology|step/i);
        expect(methodologyText?.length).toBeGreaterThan(150);
      }
    });

    await test.step('Test deliverables section', async () => {
      const deliverablesSection = servicesPage.page.locator('[data-testid="service-deliverables"]');
      if (await deliverablesSection.isVisible()) {
        const deliverablesText = await deliverablesSection.textContent();
        expect(deliverablesText).toMatch(/deliverable|outcome|result/i);
      }
    });
  });
});

test.describe('Services - CTA and Contact Integration', () => {
  let servicesPage: ServicesPage;
  let contactFormPage: ContactFormPage;
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    servicesPage = new ServicesPage(page);
    contactFormPage = new ContactFormPage(page);
    helpers = new TestHelpers(page);
  });

  test('should navigate to contact form from service CTAs', async () => {
    const expectedServices = servicesData.expectedServices;

    for (const service of expectedServices) {
      await test.step(`Test CTA navigation from ${service.title}`, async () => {
        await servicesPage.gotoServiceDetail(service.slug);
        
        // Click contact CTA
        await servicesPage.clickContactCTA();
        await helpers.waitForPageLoad();
        
        // Should navigate to contact form
        expect(servicesPage.page.url()).toContain('/contact');
        
        // Contact form should be visible
        await expect(contactFormPage.formContainer).toBeVisible();
      });
    }
  });

  test('should pre-populate contact form with service context', async () => {
    await test.step('Test form pre-population from service pages', async () => {
      await servicesPage.gotoServiceDetail('operational-optimization');
      await servicesPage.clickContactCTA();
      await helpers.waitForPageLoad();
      
      // Check if service context is passed to form
      const url = servicesPage.page.url();
      if (url.includes('service=') || url.includes('source=')) {
        // Form might be pre-populated with service information
        const primaryChallenge = contactFormPage.primaryChallengeSelect;
        const selectedValue = await primaryChallenge.inputValue();
        
        // Might be pre-selected based on service
        if (selectedValue) {
          expect(selectedValue).toMatch(/optimization|operational/i);
        }
      }
    });
  });

  test('should track service-to-lead conversion', async () => {
    await test.step('Test conversion tracking from services', async () => {
      await servicesPage.gotoServiceDetail('ai-accelerated-transformation');
      await servicesPage.clickContactCTA();
      await helpers.waitForPageLoad();
      
      // Fill out contact form from service page
      const formData = {
        step1: {
          primaryChallenge: 'ai-transformation',
          urgency: 'within-3-months'
        },
        step2: {
          companyName: 'Service Test Corp',
          website: 'https://servicetestcorp.com',
          industry: 'technology',
          companySize: '200-500',
          currentTech: 'Legacy systems, Basic CRM',
          aiExperience: 'some'
        },
        step3: {
          projectScope: 'Looking for AI-accelerated transformation based on your service offering. Need comprehensive digital transformation.',
          expectedOutcomes: 'Digital transformation, Competitive advantage, Process automation',
          budgetRange: '250k-500k',
          timeline: '12-18-months',
          decisionMakers: 'CTO, CEO',
          stakeholders: 'IT Team, Business Units'
        },
        step4: {
          contactName: 'Service Lead Test',
          email: 'servicetest@servicetestcorp.com',
          phone: '+1-555-0199',
          preferredContact: 'email',
          consultationTime: 'business-hours',
          specificQuestions: 'Interested in AI-accelerated transformation service. What would be the first steps?'
        }
      };

      await contactFormPage.fillStep1(formData.step1);
      await contactFormPage.fillStep2(formData.step2);
      await contactFormPage.fillStep3(formData.step3);
      await contactFormPage.fillStep4(formData.step4);
      
      // Lead score should reflect high-value service interest
      await contactFormPage.validateLeadScoring();
      
      const scoreElement = contactFormPage.page.locator('[data-testid="lead-score"]');
      const scoreText = await scoreElement.textContent();
      const score = parseInt(scoreText?.match(/\d+/)?.[0] || '0');
      
      // High-value service with good budget should score well
      expect(score).toBeGreaterThan(70);
    });
  });
});

test.describe('Services - Mobile and Responsive Design', () => {
  let servicesPage: ServicesPage;
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    servicesPage = new ServicesPage(page);
    helpers = new TestHelpers(page);
  });

  test('should work correctly on mobile devices', async () => {
    await test.step('Test mobile services overview layout', async () => {
      await servicesPage.page.setViewportSize({ width: 375, height: 667 });
      await servicesPage.goto();
      
      // Services should be visible and properly laid out on mobile
      await expect(servicesPage.servicesGrid).toBeVisible();
      
      const serviceCards = servicesPage.serviceCards;
      const cardCount = await serviceCards.count();
      expect(cardCount).toBe(4);
      
      // Cards should stack vertically on mobile
      for (let i = 0; i < cardCount; i++) {
        await expect(serviceCards.nth(i)).toBeVisible();
      }
    });

    await test.step('Test mobile service detail pages', async () => {
      await servicesPage.gotoServiceDetail('multi-agent-ai-systems');
      
      // All sections should be accessible on mobile
      await expect(servicesPage.serviceDetailSection).toBeVisible();
      await expect(servicesPage.pricingDisplay).toBeVisible();
      await expect(servicesPage.contactCTA).toBeVisible();
    });

    await test.step('Test mobile touch interactions', async () => {
      await helpers.simulateTouch('[data-testid="contact-cta"]');
      await helpers.waitForPageLoad();
      
      // Should navigate to contact form
      expect(servicesPage.page.url()).toContain('/contact');
    });
  });

  test('should be responsive across different screen sizes', async () => {
    await test.step('Test services grid responsiveness', async () => {
      const viewports = [
        { width: 375, height: 667, name: 'mobile' },
        { width: 768, height: 1024, name: 'tablet' },
        { width: 1024, height: 768, name: 'desktop-small' },
        { width: 1440, height: 900, name: 'desktop-large' }
      ];

      for (const viewport of viewports) {
        await servicesPage.page.setViewportSize({ width: viewport.width, height: viewport.height });
        await servicesPage.goto();
        
        // Grid should adapt to viewport
        await expect(servicesPage.servicesGrid).toBeVisible();
        
        // All service cards should be visible
        const cards = servicesPage.serviceCards;
        const cardCount = await cards.count();
        expect(cardCount).toBe(4);
        
        // Pricing should be visible on all screen sizes
        for (let i = 0; i < cardCount; i++) {
          const card = cards.nth(i);
          await expect(card).toBeVisible();
          
          const cardText = await card.textContent();
          expect(cardText).toMatch(/\$[\d,]+(K|-)/);
        }
      }
    });
  });

  test('should handle long service descriptions on mobile', async () => {
    await test.step('Test service description readability on mobile', async () => {
      await servicesPage.page.setViewportSize({ width: 375, height: 667 });
      await servicesPage.gotoServiceDetail('ai-accelerated-transformation');
      
      // Description should be readable without horizontal scrolling
      const description = servicesPage.serviceDescription;
      await expect(description).toBeVisible();
      
      const boundingBox = await description.boundingBox();
      expect(boundingBox?.width).toBeLessThanOrEqual(375);
    });
  });
});