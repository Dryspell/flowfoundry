import { Page, Locator, expect } from '@playwright/test';
import { TestHelpers } from './test-helpers';

/**
 * Page Object Models for Flowfoundry application
 */

export class HomePage {
  private helpers: TestHelpers;

  // Selectors
  readonly heroSection: Locator;
  readonly primaryCTA: Locator;
  readonly secondaryCTA: Locator;
  readonly heroMetrics: Locator;
  readonly servicesSection: Locator;
  readonly serviceCards: Locator;
  readonly socialProofSection: Locator;
  readonly testimonials: Locator;
  readonly trustIndicators: Locator;

  constructor(private page: Page) {
    this.helpers = new TestHelpers(page);
    
    // Initialize locators
    this.heroSection = page.locator('[data-testid="hero-section"]');
    this.primaryCTA = page.locator('[data-testid="hero-primary-cta"]');
    this.secondaryCTA = page.locator('[data-testid="hero-secondary-cta"]');
    this.heroMetrics = page.locator('[data-testid="hero-metrics"]');
    this.servicesSection = page.locator('[data-testid="services-overview"]');
    this.serviceCards = page.locator('[data-testid="service-card"]');
    this.socialProofSection = page.locator('[data-testid="social-proof"]');
    this.testimonials = page.locator('[data-testid="testimonial"]');
    this.trustIndicators = page.locator('[data-testid="trust-indicator"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.helpers.waitForPageLoad();
    await this.helpers.waitForSkeletonsToLoad();
  }

  async clickPrimaryCTA(): Promise<void> {
    await this.primaryCTA.click();
  }

  async clickSecondaryCTA(): Promise<void> {
    await this.secondaryCTA.click();
  }

  async hoverServiceCard(index: number): Promise<void> {
    await this.serviceCards.nth(index).hover();
    await this.page.waitForTimeout(300); // Allow hover animation
  }

  async validateHeroMetrics(): Promise<void> {
    await expect(this.heroMetrics).toBeVisible();
    
    const metrics = ['150+', '340%', '200+', '2,400+'];
    for (const metric of metrics) {
      await expect(this.heroSection).toContainText(metric);
    }
  }

  async validateServicesOverview(): Promise<void> {
    await expect(this.serviceCards).toHaveCount(4);
    
    const expectedServices = [
      'Multi-Agent AI Systems',
      'Operational Optimization', 
      'AI-Accelerated Transformation',
      'Custom AI Solutions'
    ];

    for (const service of expectedServices) {
      await expect(this.servicesSection).toContainText(service);
    }
  }

  async validateSocialProof(): Promise<void> {
    await expect(this.socialProofSection).toBeVisible();
    await expect(this.testimonials.first()).toBeVisible();
    await expect(this.trustIndicators.first()).toBeVisible();
  }
}

export class ContactFormPage {
  private helpers: TestHelpers;

  // Form sections
  readonly formContainer: Locator;
  readonly progressIndicator: Locator;
  readonly stepIndicators: Locator;
  readonly currentStep: Locator;
  readonly nextButton: Locator;
  readonly prevButton: Locator;
  readonly submitButton: Locator;
  readonly leadScore: Locator;

  // Step 1 - Project Details
  readonly primaryChallengeSelect: Locator;
  readonly urgencySelect: Locator;

  // Step 2 - Company Information
  readonly companyNameInput: Locator;
  readonly websiteInput: Locator;
  readonly industrySelect: Locator;
  readonly companySizeSelect: Locator;
  readonly currentTechInput: Locator;
  readonly aiExperienceSelect: Locator;

  // Step 3 - Project Scope
  readonly projectScopeTextarea: Locator;
  readonly expectedOutcomesInput: Locator;
  readonly budgetRangeSelect: Locator;
  readonly timelineSelect: Locator;
  readonly decisionMakersInput: Locator;
  readonly stakeholdersInput: Locator;

  // Step 4 - Contact Information
  readonly contactNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly preferredContactSelect: Locator;
  readonly consultationTimeSelect: Locator;
  readonly specificQuestionsTextarea: Locator;

  constructor(private page: Page) {
    this.helpers = new TestHelpers(page);

    // Initialize form locators
    this.formContainer = page.locator('[data-testid="multi-step-form"]');
    this.progressIndicator = page.locator('[data-testid="progress-indicator"]');
    this.stepIndicators = page.locator('[data-testid^="step-"]');
    this.currentStep = page.locator('[data-testid="current-step"]');
    this.nextButton = page.locator('[data-testid="next-step"]');
    this.prevButton = page.locator('[data-testid="prev-step"]');
    this.submitButton = page.locator('[data-testid="submit-form"]');
    this.leadScore = page.locator('[data-testid="lead-score"]');

    // Step 1 locators
    this.primaryChallengeSelect = page.locator('[data-testid="primary-challenge"]');
    this.urgencySelect = page.locator('[data-testid="urgency"]');

    // Step 2 locators
    this.companyNameInput = page.locator('[data-testid="company-name"]');
    this.websiteInput = page.locator('[data-testid="website"]');
    this.industrySelect = page.locator('[data-testid="industry"]');
    this.companySizeSelect = page.locator('[data-testid="company-size"]');
    this.currentTechInput = page.locator('[data-testid="current-tech"]');
    this.aiExperienceSelect = page.locator('[data-testid="ai-experience"]');

    // Step 3 locators
    this.projectScopeTextarea = page.locator('[data-testid="project-scope"]');
    this.expectedOutcomesInput = page.locator('[data-testid="expected-outcomes"]');
    this.budgetRangeSelect = page.locator('[data-testid="budget-range"]');
    this.timelineSelect = page.locator('[data-testid="timeline"]');
    this.decisionMakersInput = page.locator('[data-testid="decision-makers"]');
    this.stakeholdersInput = page.locator('[data-testid="stakeholders"]');

    // Step 4 locators
    this.contactNameInput = page.locator('[data-testid="contact-name"]');
    this.emailInput = page.locator('[data-testid="email"]');
    this.phoneInput = page.locator('[data-testid="phone"]');
    this.preferredContactSelect = page.locator('[data-testid="preferred-contact"]');
    this.consultationTimeSelect = page.locator('[data-testid="consultation-time"]');
    this.specificQuestionsTextarea = page.locator('[data-testid="specific-questions"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/contact');
    await this.helpers.waitForPageLoad();
    await this.helpers.waitForSkeletonsToLoad();
  }

  async validateFormStructure(): Promise<void> {
    await expect(this.formContainer).toBeVisible();
    await expect(this.progressIndicator).toBeVisible();
    await expect(this.stepIndicators).toHaveCount(4);
  }

  async fillStep1(data: { primaryChallenge: string; urgency: string }): Promise<void> {
    // Click challenge card
    await this.page.locator(`[data-testid="challenge-${data.primaryChallenge}"]`).click();
    await this.page.waitForTimeout(300);
    
    // Click urgency card
    await this.page.locator(`[data-testid="urgency-${data.urgency}"]`).click();
    await this.page.waitForTimeout(300);
    
    await this.nextButton.click();
  }

  async fillStep2(data: {
    companyName: string;
    website: string;
    industry: string;
    companySize: string;
    currentTech: string;
    aiExperience: string;
  }): Promise<void> {
    await this.companyNameInput.fill(data.companyName);
    await this.websiteInput.fill(data.website);
    
    // Click industry dropdown to open it
    await this.page.locator('[data-testid="industry-dropdown"]').click();
    await this.page.waitForTimeout(300);
    // Select industry from dropdown
    await this.page.locator(`button:has-text("${data.industry}")`).first().click();
    await this.page.waitForTimeout(300);
    
    // Click company size card
    await this.page.locator(`[data-testid="company-size-${data.companySize}"]`).click();
    await this.page.waitForTimeout(300);
    
    await this.currentTechInput.fill(data.currentTech);
    
    // Click AI experience card
    await this.page.locator(`[data-testid="ai-experience-${data.aiExperience}"]`).click();
    await this.page.waitForTimeout(300);
    
    await this.nextButton.click();
  }

  async fillStep3(data: {
    projectScope: string;
    expectedOutcomes: string;
    budgetRange: string;
    timeline: string;
    decisionMakers: string;
    stakeholders: string;
  }): Promise<void> {
    await this.projectScopeTextarea.fill(data.projectScope);
    await this.expectedOutcomesInput.fill(data.expectedOutcomes);
    // Click budget range card
    await this.page.locator(`[data-testid="budget-${data.budgetRange}"]`).click();
    await this.page.waitForTimeout(300);
    
    // Timeline selection (if it's a card-based selection)
    if (data.timeline) {
      await this.page.locator(`[data-testid="timeline-${data.timeline}"]`).click();
      await this.page.waitForTimeout(300);
    }
    await this.decisionMakersInput.fill(data.decisionMakers);
    await this.stakeholdersInput.fill(data.stakeholders);
    await this.nextButton.click();
  }

  async fillStep4(data: {
    contactName: string;
    email: string;
    phone: string;
    preferredContact: string;
    consultationTime: string;
    specificQuestions: string;
  }): Promise<void> {
    await this.contactNameInput.fill(data.contactName);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
    // Click preferred contact method card (if applicable)
    if (data.preferredContact) {
      await this.page.locator(`[data-testid="contact-method-${data.preferredContact}"]`).click();
      await this.page.waitForTimeout(300);
    }
    
    // Click consultation time card (if applicable)
    if (data.consultationTime) {
      await this.page.locator(`[data-testid="consultation-time-${data.consultationTime}"]`).click();
      await this.page.waitForTimeout(300);
    }
    await this.specificQuestionsTextarea.fill(data.specificQuestions);
  }

  async submitForm(): Promise<void> {
    await this.submitButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async validateStep(stepNumber: number): Promise<void> {
    await expect(this.currentStep).toContainText(stepNumber.toString());
    
    // Validate progress indicator
    const progressWidth = await this.progressIndicator.evaluate((el) => {
      const progressBar = el.querySelector('[role="progressbar"]');
      return progressBar?.getAttribute('style') || '';
    });
    
    expect(progressWidth).toContain(`${(stepNumber / 4) * 100}%`);
  }

  async validateLeadScoring(): Promise<void> {
    // Lead score should be visible and within valid range (0-100)
    await expect(this.leadScore).toBeVisible();
    
    const scoreText = await this.leadScore.textContent();
    const score = parseInt(scoreText?.match(/\d+/)?.[0] || '0');
    
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  }

  async testFormValidation(): Promise<void> {
    // Try to proceed without filling required fields
    await this.nextButton.click();
    
    // Should show validation errors
    await expect(this.page.locator('[data-testid="validation-error"]')).toBeVisible();
  }

  async testBrowserNavigation(): Promise<void> {
    // Fill first step and proceed
    await this.fillStep1({
      primaryChallenge: 'operational-optimization',
      urgency: 'within-3-months'
    });

    // Test browser back button
    await this.page.goBack();
    await expect(this.currentStep).toContainText('1');

    // Test browser forward button
    await this.page.goForward();
    await expect(this.currentStep).toContainText('2');
  }
}

export class CaseStudiesPage {
  private helpers: TestHelpers;

  readonly caseStudiesGrid: Locator;
  readonly caseStudyCards: Locator;
  readonly filterSection: Locator;
  readonly industryFilter: Locator;
  readonly serviceTypeFilter: Locator;
  readonly roiFilter: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly resultsCount: Locator;
  readonly clearFiltersButton: Locator;

  constructor(private page: Page) {
    this.helpers = new TestHelpers(page);

    this.caseStudiesGrid = page.locator('[data-testid="case-studies-grid"]');
    this.caseStudyCards = page.locator('[data-testid="case-study-card"]');
    this.filterSection = page.locator('[data-testid="filter-section"]');
    this.industryFilter = page.locator('[data-testid="industry-filter"]');
    this.serviceTypeFilter = page.locator('[data-testid="service-type-filter"]');
    this.roiFilter = page.locator('[data-testid="roi-filter"]');
    this.searchInput = page.locator('[data-testid="search-input"]');
    this.searchButton = page.locator('[data-testid="search-button"]');
    this.resultsCount = page.locator('[data-testid="results-count"]');
    this.clearFiltersButton = page.locator('[data-testid="clear-filters"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/case-studies');
    await this.helpers.waitForPageLoad();
  }

  async validateInitialLoad(): Promise<void> {
    await expect(this.caseStudiesGrid).toBeVisible();
    await expect(this.caseStudyCards).toHaveCount(4); // Should show all 4 case studies initially
  }

  async filterByIndustry(industry: string): Promise<void> {
    // First expand filters if needed
    const filtersButton = this.page.locator('button:has-text("Filters")');
    if (await filtersButton.isVisible()) {
      await filtersButton.click();
      await this.page.waitForTimeout(300);
    }
    
    // Click the specific industry button
    await this.page.locator(`[data-testid="industry-${industry}"]`).click();
    await this.page.waitForTimeout(500); // Allow filtering to complete
  }

  async filterByServiceType(serviceType: string): Promise<void> {
    // First expand filters if needed
    const filtersButton = this.page.locator('button:has-text("Filters")');
    if (await filtersButton.isVisible()) {
      await filtersButton.click();
      await this.page.waitForTimeout(300);
    }
    
    // Click the specific service type button
    await this.page.locator(`[data-testid="service-type-${serviceType}"]`).click();
    await this.page.waitForTimeout(500);
  }

  async filterByROI(roiRange: string): Promise<void> {
    // First expand filters if needed
    const filtersButton = this.page.locator('button:has-text("Filters")');
    if (await filtersButton.isVisible()) {
      await filtersButton.click();
      await this.page.waitForTimeout(300);
    }
    
    // Click the specific ROI range button
    await this.page.locator(`[data-testid="roi-${roiRange}"]`).click();
    await this.page.waitForTimeout(500);
  }

  async searchKeyword(keyword: string): Promise<void> {
    await this.searchInput.fill(keyword);
    // Search happens automatically on input change, no button click needed
    await this.page.waitForTimeout(500);
  }

  async clearAllFilters(): Promise<void> {
    // Clear filters button only appears when there are active filters
    const clearButton = this.page.locator('[data-testid="clear-filters"]');
    if (await clearButton.isVisible()) {
      await clearButton.click();
    }
    await this.page.waitForTimeout(500);
  }

  async validateFilterResults(expectedCount: number): Promise<void> {
    await expect(this.caseStudyCards).toHaveCount(expectedCount);
    await expect(this.resultsCount).toContainText(expectedCount.toString());
  }

  async clickCaseStudy(title: string): Promise<void> {
    await this.page.locator(`[data-testid="case-study-card"]:has-text("${title}")`).click();
  }
}

export class ServicesPage {
  private helpers: TestHelpers;

  readonly servicesGrid: Locator;
  readonly serviceCards: Locator;
  readonly serviceDetailSection: Locator;
  readonly pricingDisplay: Locator;
  readonly serviceDescription: Locator;
  readonly contactCTA: Locator;

  constructor(private page: Page) {
    this.helpers = new TestHelpers(page);

    this.servicesGrid = page.locator('[data-testid="services-grid"]');
    this.serviceCards = page.locator('[data-testid="service-card"]');
    this.serviceDetailSection = page.locator('[data-testid="service-detail"]');
    this.pricingDisplay = page.locator('[data-testid="pricing-display"]');
    this.serviceDescription = page.locator('[data-testid="service-description"]');
    this.contactCTA = page.locator('[data-testid="contact-cta"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/services');
    await this.helpers.waitForPageLoad();
  }

  async gotoServiceDetail(slug: string): Promise<void> {
    await this.page.goto(`/services/${slug}`);
    await this.helpers.waitForPageLoad();
  }

  async validateServicesOverview(): Promise<void> {
    await expect(this.servicesGrid).toBeVisible();
    await expect(this.serviceCards).toHaveCount(4);
    
    const expectedServices = [
      'Multi-Agent AI Systems',
      'Operational Optimization',
      'AI-Accelerated Transformation', 
      'Custom AI Solutions'
    ];

    for (const service of expectedServices) {
      await expect(this.servicesGrid).toContainText(service);
    }
  }

  async validateServiceDetail(): Promise<void> {
    await expect(this.serviceDetailSection).toBeVisible();
    await expect(this.pricingDisplay).toBeVisible();
    await expect(this.serviceDescription).toBeVisible();
    await expect(this.contactCTA).toBeVisible();
  }

  async validatePricing(expectedRange: string): Promise<void> {
    await expect(this.pricingDisplay).toContainText(expectedRange);
  }

  async clickContactCTA(): Promise<void> {
    await this.contactCTA.click();
  }
}

export class NavigationHeader {
  private helpers: TestHelpers;

  readonly header: Locator;
  readonly logo: Locator;
  readonly navigationMenu: Locator;
  readonly mobileMenuButton: Locator;
  readonly mobileMenu: Locator;
  readonly homeLink: Locator;
  readonly aboutLink: Locator;
  readonly servicesLink: Locator;
  readonly caseStudiesLink: Locator;
  readonly contactLink: Locator;

  constructor(private page: Page) {
    this.helpers = new TestHelpers(page);

    this.header = page.locator('[data-testid="main-header"]');
    this.logo = page.locator('[data-testid="logo"]');
    this.navigationMenu = page.locator('[data-testid="navigation-menu"]');
    this.mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
    this.mobileMenu = page.locator('[data-testid="mobile-menu"]');
    this.homeLink = page.locator('[data-testid="nav-home"]');
    this.aboutLink = page.locator('[data-testid="nav-about"]');
    this.servicesLink = page.locator('[data-testid="nav-services"]');
    this.caseStudiesLink = page.locator('[data-testid="nav-case-studies"]');
    this.contactLink = page.locator('[data-testid="nav-contact"]');
  }

  async validateHeader(): Promise<void> {
    await expect(this.header).toBeVisible();
    await expect(this.logo).toBeVisible();
    await expect(this.navigationMenu).toBeVisible();
  }

  async navigateToHome(): Promise<void> {
    await this.homeLink.click();
    await this.helpers.waitForPageLoad();
  }

  async navigateToAbout(): Promise<void> {
    await this.aboutLink.click();
    await this.helpers.waitForPageLoad();
  }

  async navigateToServices(): Promise<void> {
    await this.servicesLink.click();
    await this.helpers.waitForPageLoad();
  }

  async navigateToCaseStudies(): Promise<void> {
    await this.caseStudiesLink.click();
    await this.helpers.waitForPageLoad();
  }

  async navigateToContact(): Promise<void> {
    await this.contactLink.click();
    await this.helpers.waitForPageLoad();
  }

  async testMobileNavigation(): Promise<void> {
    // Test mobile menu on smaller screens
    await this.page.setViewportSize({ width: 375, height: 667 });
    await expect(this.mobileMenuButton).toBeVisible();
    
    await this.mobileMenuButton.click();
    await expect(this.mobileMenu).toBeVisible();
    
    // Test mobile menu navigation
    await this.mobileMenu.locator('[data-testid="mobile-nav-about"]').click();
    await this.helpers.waitForPageLoad();
    expect(this.page.url()).toContain('/about');
  }
}