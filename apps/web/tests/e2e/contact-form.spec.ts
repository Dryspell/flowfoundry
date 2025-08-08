import { test, expect } from '@playwright/test';
import { ContactFormPage } from '../utils/page-objects';
import { TestHelpers, BusinessAssertions } from '../utils/test-helpers';
import { 
  validContactFormData, 
  highValueLeadData, 
  mediumValueLeadData, 
  lowValueLeadData,
  invalidFormData,
  leadScoringTestCases
} from '../utils/mock-data';

/**
 * Contact Form Multi-Step Testing Suite
 * 
 * CRITICAL BUSINESS COMPONENT - This is the primary lead generation mechanism
 * Priority: HIGHEST - All contact form functionality must work perfectly
 */

test.describe('Contact Form - Multi-Step Functionality', () => {
  let contactFormPage: ContactFormPage;
  let helpers: TestHelpers;
  let businessAssertions: BusinessAssertions;

  test.beforeEach(async ({ page }) => {
    contactFormPage = new ContactFormPage(page);
    helpers = new TestHelpers(page);
    businessAssertions = new BusinessAssertions(page);
    
    // Setup console error monitoring
    helpers.setupConsoleErrorMonitoring();
    
    await contactFormPage.goto();
  });

  test('should display multi-step form with proper structure', async () => {
    await test.step('Validate form container and progress indicator', async () => {
      await contactFormPage.validateFormStructure();
      await contactFormPage.validateStep(1);
    });

    await test.step('Check all step indicators are present', async () => {
      await expect(contactFormPage.stepIndicators).toHaveCount(4);
    });

    await test.step('Verify initial step state', async () => {
      await expect(contactFormPage.primaryChallengeSelect).toBeVisible();
      await expect(contactFormPage.urgencySelect).toBeVisible();
      await expect(contactFormPage.nextButton).toBeVisible();
    });
  });

  test('should complete full multi-step form submission successfully', async () => {
    const formData = validContactFormData;

    await test.step('Fill and submit Step 1 - Project Details', async () => {
      await contactFormPage.fillStep1(formData.step1);
      await contactFormPage.validateStep(2);
    });

    await test.step('Fill and submit Step 2 - Company Information', async () => {
      await contactFormPage.fillStep2(formData.step2);
      await contactFormPage.validateStep(3);
    });

    await test.step('Fill and submit Step 3 - Project Scope', async () => {
      await contactFormPage.fillStep3(formData.step3);
      await contactFormPage.validateStep(4);
    });

    await test.step('Fill and submit Step 4 - Contact Information', async () => {
      await contactFormPage.fillStep4(formData.step4);
      
      // Validate lead scoring is calculated
      await contactFormPage.validateLeadScoring();
      
      // Submit the form
      await contactFormPage.submitForm();
    });

    await test.step('Verify successful submission', async () => {
      // Should redirect to success page or show success message
      await expect(contactFormPage.page.locator('[data-testid="form-success"]')).toBeVisible({ timeout: 10000 });
    });
  });

  test('should validate lead scoring algorithm with different lead types', async () => {
    for (const testCase of leadScoringTestCases) {
      await test.step(`Test ${testCase.name} lead scoring`, async () => {
        // Navigate back to form start
        await contactFormPage.goto();
        
        // Fill all steps
        await contactFormPage.fillStep1(testCase.data.step1);
        await contactFormPage.fillStep2(testCase.data.step2);
        await contactFormPage.fillStep3(testCase.data.step3);
        await contactFormPage.fillStep4(testCase.data.step4);
        
        // Validate lead score range
        await businessAssertions.validateLeadScore(testCase.expectedScoreRange);
        
        // Validate priority level
        await businessAssertions.validateBudgetImpactOnPriority(
          testCase.data.step3.budgetRange, 
          testCase.expectedPriority
        );
      });
    }
  });

  test('should handle form validation correctly', async () => {
    await test.step('Test Step 1 validation', async () => {
      // Try to proceed without selecting required fields
      await contactFormPage.nextButton.click();
      await expect(contactFormPage.page.locator('[data-testid="validation-error"]')).toBeVisible();
    });

    await test.step('Test Step 2 validation with invalid data', async () => {
      // Fill Step 1 correctly first
      await contactFormPage.fillStep1(validContactFormData.step1);
      
      // Test invalid email addresses
      for (const invalidEmail of invalidFormData.step2.invalidEmails) {
        await contactFormPage.emailInput.fill(invalidEmail);
        await contactFormPage.nextButton.click();
        
        if (invalidEmail !== '') { // Skip empty case as it's caught by required validation
          await expect(contactFormPage.page.locator('[data-testid="email-error"]')).toBeVisible();
        }
      }
      
      // Test invalid websites
      for (const invalidWebsite of invalidFormData.step2.invalidWebsites) {
        await contactFormPage.websiteInput.fill(invalidWebsite);
        await contactFormPage.nextButton.click();
        
        if (invalidWebsite !== '') {
          await expect(contactFormPage.page.locator('[data-testid="website-error"]')).toBeVisible();
        }
      }
    });

    await test.step('Test Step 4 validation with invalid phone numbers', async () => {
      // Navigate to Step 4
      await contactFormPage.fillStep1(validContactFormData.step1);
      await contactFormPage.fillStep2(validContactFormData.step2);
      await contactFormPage.fillStep3(validContactFormData.step3);
      
      // Test invalid phone numbers
      for (const invalidPhone of invalidFormData.step4.invalidPhones) {
        await contactFormPage.phoneInput.fill(invalidPhone);
        await contactFormPage.submitButton.click();
        
        if (invalidPhone !== '') {
          await expect(contactFormPage.page.locator('[data-testid="phone-error"]')).toBeVisible();
        }
      }
    });
  });

  test('should handle browser navigation correctly', async () => {
    await test.step('Test browser back/forward with form state', async () => {
      // Fill first step
      await contactFormPage.fillStep1(validContactFormData.step1);
      
      // Go back using browser
      await contactFormPage.page.goBack();
      await expect(contactFormPage.currentStep).toContainText('1');
      
      // Form should retain state
      await expect(contactFormPage.primaryChallengeSelect).toHaveValue(validContactFormData.step1.primaryChallenge);
      
      // Go forward using browser
      await contactFormPage.page.goForward();
      await expect(contactFormPage.currentStep).toContainText('2');
    });

    await test.step('Test direct URL navigation to form steps', async () => {
      // Direct navigation to contact page should always start at step 1
      await contactFormPage.page.goto('/contact?step=3');
      await expect(contactFormPage.currentStep).toContainText('1');
    });
  });

  test('should persist form data between steps', async () => {
    const formData = validContactFormData;

    await test.step('Fill Step 1 and verify persistence', async () => {
      await contactFormPage.fillStep1(formData.step1);
      
      // Navigate back to Step 1
      await contactFormPage.prevButton.click();
      
      // Verify data is persisted
      await expect(contactFormPage.primaryChallengeSelect).toHaveValue(formData.step1.primaryChallenge);
      await expect(contactFormPage.urgencySelect).toHaveValue(formData.step1.urgency);
    });

    await test.step('Test data persistence across all steps', async () => {
      // Fill all steps
      await contactFormPage.fillStep1(formData.step1);
      await contactFormPage.fillStep2(formData.step2);
      await contactFormPage.fillStep3(formData.step3);
      
      // Navigate back to Step 2
      await contactFormPage.prevButton.click();
      await contactFormPage.prevButton.click();
      
      // Verify Step 2 data is persisted
      await expect(contactFormPage.companyNameInput).toHaveValue(formData.step2.companyName);
      await expect(contactFormPage.emailInput).toHaveValue(formData.step2.email || '');
    });
  });

  test('should work correctly on mobile devices', async () => {
    await test.step('Test mobile form interaction', async () => {
      await contactFormPage.page.setViewportSize({ width: 375, height: 667 });
      await contactFormPage.page.reload();
      
      await helpers.waitForPageLoad();
      
      // Form should be responsive and usable
      await expect(contactFormPage.formContainer).toBeVisible();
      await expect(contactFormPage.progressIndicator).toBeVisible();
    });

    await test.step('Test touch interactions', async () => {
      // Use touch events for mobile interaction
      await helpers.simulateTouch('[data-testid="primary-challenge"]');
      await contactFormPage.primaryChallengeSelect.selectOption('operational-optimization');
      
      await helpers.simulateTouch('[data-testid="urgency"]');
      await contactFormPage.urgencySelect.selectOption('within-3-months');
      
      await helpers.simulateTouch('[data-testid="next-step"]');
      
      await contactFormPage.validateStep(2);
    });
  });

  test('should handle different contact method selections', async () => {
    const formData = validContactFormData;

    await test.step('Test email preference selection', async () => {
      await contactFormPage.fillStep1(formData.step1);
      await contactFormPage.fillStep2(formData.step2);
      await contactFormPage.fillStep3(formData.step3);
      
      await contactFormPage.contactNameInput.fill(formData.step4.contactName);
      await contactFormPage.emailInput.fill(formData.step4.email);
      await contactFormPage.preferredContactSelect.selectOption('email');
      
      // Email preference should affect lead scoring
      await contactFormPage.validateLeadScoring();
    });

    await test.step('Test phone preference selection', async () => {
      await contactFormPage.preferredContactSelect.selectOption('phone');
      await contactFormPage.phoneInput.fill(formData.step4.phone);
      
      // Phone preference might have different scoring
      await contactFormPage.validateLeadScoring();
    });

    await test.step('Test consultation time preferences', async () => {
      const timeOptions = ['business-hours', 'evenings', 'weekends', 'flexible'];
      
      for (const timeOption of timeOptions) {
        await contactFormPage.consultationTimeSelect.selectOption(timeOption);
        
        // Each option should be selectable
        await expect(contactFormPage.consultationTimeSelect).toHaveValue(timeOption);
      }
    });
  });

  test('should calculate lead scores correctly for budget ranges', async () => {
    const budgetTestCases = [
      { range: 'under-50k', expectedScoreImpact: 'low' },
      { range: '50k-100k', expectedScoreImpact: 'medium' },
      { range: '100k-250k', expectedScoreImpact: 'medium-high' },
      { range: '250k-500k', expectedScoreImpact: 'high' },
      { range: '500k+', expectedScoreImpact: 'highest' }
    ];

    for (const testCase of budgetTestCases) {
      await test.step(`Test budget range: ${testCase.range}`, async () => {
        await contactFormPage.goto();
        
        // Fill steps with consistent data except budget
        await contactFormPage.fillStep1(validContactFormData.step1);
        await contactFormPage.fillStep2(validContactFormData.step2);
        
        const step3Data = { ...validContactFormData.step3, budgetRange: testCase.range };
        await contactFormPage.fillStep3(step3Data);
        await contactFormPage.fillStep4(validContactFormData.step4);
        
        // Validate that lead score reflects budget impact
        await contactFormPage.validateLeadScoring();
        
        // Higher budgets should result in higher scores
        const scoreElement = contactFormPage.page.locator('[data-testid="lead-score"]');
        const scoreText = await scoreElement.textContent();
        const score = parseInt(scoreText?.match(/\d+/)?.[0] || '0');
        
        // Basic validation that score is reasonable for budget range
        if (testCase.range === '500k+') {
          expect(score).toBeGreaterThan(70);
        } else if (testCase.range === 'under-50k') {
          expect(score).toBeLessThan(60);
        }
      });
    }
  });

  test('should handle server errors gracefully', async () => {
    await test.step('Test form submission with server error simulation', async () => {
      // Mock server error response
      await contactFormPage.page.route('**/api/contact', route => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Server error' })
        });
      });

      // Fill and submit form
      await contactFormPage.fillStep1(validContactFormData.step1);
      await contactFormPage.fillStep2(validContactFormData.step2);
      await contactFormPage.fillStep3(validContactFormData.step3);
      await contactFormPage.fillStep4(validContactFormData.step4);
      
      await contactFormPage.submitForm();
      
      // Should display error message
      await expect(contactFormPage.page.locator('[data-testid="submission-error"]')).toBeVisible();
    });
  });

  test('should validate urgency impact on lead scoring', async () => {
    const urgencyTestCases = [
      { urgency: 'asap', expectedImpact: 'high' },
      { urgency: 'within-3-months', expectedImpact: 'medium-high' },
      { urgency: 'within-6-months', expectedImpact: 'medium' },
      { urgency: 'no-rush', expectedImpact: 'low' }
    ];

    for (const testCase of urgencyTestCases) {
      await test.step(`Test urgency: ${testCase.urgency}`, async () => {
        await contactFormPage.goto();
        
        const step1Data = { ...validContactFormData.step1, urgency: testCase.urgency };
        await contactFormPage.fillStep1(step1Data);
        await contactFormPage.fillStep2(validContactFormData.step2);
        await contactFormPage.fillStep3(validContactFormData.step3);
        await contactFormPage.fillStep4(validContactFormData.step4);
        
        // Higher urgency should result in higher lead scores
        const scoreElement = contactFormPage.page.locator('[data-testid="lead-score"]');
        const scoreText = await scoreElement.textContent();
        const score = parseInt(scoreText?.match(/\d+/)?.[0] || '0');
        
        if (testCase.urgency === 'asap') {
          expect(score).toBeGreaterThan(60);
        } else if (testCase.urgency === 'no-rush') {
          expect(score).toBeLessThan(80);
        }
      });
    }
  });
});