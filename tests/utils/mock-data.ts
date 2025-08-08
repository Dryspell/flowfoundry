/**
 * Test data and fixtures for Stratalace Playwright tests
 */

export interface Step1Data {
  primaryChallenge: string;
  urgency: string;
}

export interface Step2Data {
  companyName: string;
  website: string;
  industry: string;
  companySize: string;
  currentTech: string;
  aiExperience: string;
}

export interface Step3Data {
  projectScope: string;
  expectedOutcomes: string;
  budgetRange: string;
  timeline: string;
  decisionMakers: string;
  stakeholders: string;
}

export interface Step4Data {
  contactName: string;
  email: string;
  phone: string;
  preferredContact: string;
  consultationTime: string;
  specificQuestions: string;
}

export interface CompleteFormData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
}

/**
 * Valid contact form data for successful submissions
 */
export const validContactFormData: CompleteFormData = {
  step1: {
    primaryChallenge: 'automate-processes',
    urgency: 'soon'
  },
  step2: {
    companyName: 'TestCorp Manufacturing',
    website: 'https://testcorp.com',
    industry: 'Manufacturing',
    companySize: 'medium',
    currentTech: 'CRM, ERP, Basic Analytics',
    aiExperience: 'basic'
  },
  step3: {
    projectScope: 'We need to optimize our manufacturing processes to reduce waste and improve efficiency. Our current manual processes are causing bottlenecks and we believe AI can help automate key decision points.',
    expectedOutcomes: 'Increased efficiency by 25%, Cost reduction of $500K annually, Improved quality control',
    budgetRange: '100k-250k',
    timeline: 'quarter',
    decisionMakers: 'CTO, Operations Director, VP Manufacturing',
    stakeholders: 'IT Team, Operations Team, Quality Control, Production Managers'
  },
  step4: {
    contactName: 'John Smith',
    email: 'john.smith@testcorp.com',
    phone: '+1-555-0123',
    preferredContact: 'email',
    consultationTime: 'morning',
    specificQuestions: 'What is your typical project timeline? How do you handle data integration with existing ERP systems?'
  }
};

/**
 * High-value lead data for lead scoring validation
 */
export const highValueLeadData: CompleteFormData = {
  step1: {
    primaryChallenge: 'digital-transformation',
    urgency: 'immediate'
  },
  step2: {
    companyName: 'Enterprise Solutions Inc',
    website: 'https://enterprisesolutions.com',
    industry: 'Technology',
    companySize: 'enterprise',
    currentTech: 'Advanced CRM, ERP, Cloud Infrastructure, Data Lakes',
    aiExperience: 'advanced'
  },
  step3: {
    projectScope: 'Full enterprise AI transformation across multiple departments including customer service, operations, and strategic planning. Looking for comprehensive AI implementation with custom solutions.',
    expectedOutcomes: 'Digital transformation, 40% efficiency gains, $2M annual savings, Competitive advantage',
    budgetRange: 'over-500k',
    timeline: 'flexible',
    decisionMakers: 'CEO, CTO, Chief Innovation Officer, Board of Directors',
    stakeholders: 'C-Suite, IT Department, All Business Units, External Consultants'
  },
  step4: {
    contactName: 'Sarah Johnson',
    email: 'sarah.johnson@enterprisesolutions.com',
    phone: '+1-555-0456',
    preferredContact: 'phone',
    consultationTime: 'flexible',
    specificQuestions: 'We need a comprehensive AI strategy. Can you provide enterprise-level implementation with ongoing support?'
  }
};

/**
 * Medium-value lead data
 */
export const mediumValueLeadData: CompleteFormData = {
  step1: {
    primaryChallenge: 'operational-optimization',
    urgency: 'within-6-months'
  },
  step2: {
    companyName: 'Mid-Size Retail Co',
    website: 'https://midsizeretail.com',
    industry: 'retail',
    companySize: '50-200',
    currentTech: 'POS Systems, Basic CRM, Inventory Management',
    aiExperience: 'some'
  },
  step3: {
    projectScope: 'Optimize inventory management and customer experience through AI-powered recommendations and demand forecasting.',
    expectedOutcomes: 'Better inventory turnover, Improved customer satisfaction, 15% cost reduction',
    budgetRange: '50k-100k',
    timeline: '6-12-months',
    decisionMakers: 'Operations Manager, IT Director',
    stakeholders: 'Operations Team, Store Managers, IT Team'
  },
  step4: {
    contactName: 'Mike Davis',
    email: 'mike.davis@midsizeretail.com',
    phone: '+1-555-0789',
    preferredContact: 'email',
    consultationTime: 'business-hours',
    specificQuestions: 'How quickly can we see ROI? What ongoing maintenance is required?'
  }
};

/**
 * Low-value lead data
 */
export const lowValueLeadData: CompleteFormData = {
  step1: {
    primaryChallenge: 'exploration',
    urgency: 'no-rush'
  },
  step2: {
    companyName: 'Small Business LLC',
    website: 'https://smallbiz.com',
    industry: 'other',
    companySize: '1-10',
    currentTech: 'Basic tools, Email, Spreadsheets',
    aiExperience: 'none'
  },
  step3: {
    projectScope: 'Just exploring what AI could do for our small business. Not sure what we need yet.',
    expectedOutcomes: 'Understanding AI potential, Maybe some automation',
    budgetRange: 'under-50k',
    timeline: 'flexible',
    decisionMakers: 'Business Owner',
    stakeholders: 'Business Owner, 2-3 employees'
  },
  step4: {
    contactName: 'Tom Wilson',
    email: 'tom@smallbiz.com',
    phone: '+1-555-0012',
    preferredContact: 'email',
    consultationTime: 'evenings',
    specificQuestions: 'What are the basics of AI for small business?'
  }
};

/**
 * Invalid form data for validation testing
 */
export const invalidFormData = {
  step2: {
    invalidEmails: [
      'notanemail',
      '@domain.com',
      'user@',
      'user..double@domain.com',
      ''
    ],
    invalidWebsites: [
      'notaurl',
      'http://',
      'ftp://invalid.com',
      'javascript:alert(1)',
      ''
    ],
    invalidCompanyNames: [
      '', // Empty
      'A', // Too short
      'A'.repeat(101), // Too long
    ]
  },
  step3: {
    invalidProjectScopes: [
      '', // Empty
      'Too short', // Less than minimum
      'A'.repeat(5001), // Too long
    ],
    invalidBudgetRanges: [
      '', // Empty selection
      'invalid-range' // Non-existent option
    ]
  },
  step4: {
    invalidPhones: [
      '123', // Too short
      'not-a-phone',
      '++1-555-0123', // Invalid format
      '1-555-ABCD', // Letters in number
      ''
    ],
    invalidNames: [
      '', // Empty
      'A', // Too short
      'A'.repeat(101), // Too long
      '123456', // Only numbers
      '!@#$%^' // Only special characters
    ]
  }
};

/**
 * Case study test data
 */
export const caseStudyData = {
  expectedCaseStudies: [
    {
      title: 'Digital Manufacturing Platform: Quality Control System with AI Enhancement',
      industry: 'manufacturing',
      serviceType: 'operational-optimization',
      roi: '$2.3M savings',
      slug: 'manufacturing-automation'
    },
    {
      title: 'E-commerce Platform Optimization: Inventory Management with Intelligent Forecasting', 
      industry: 'retail',
      serviceType: 'ai-transformation',
      roi: '340% ROI',
      slug: 'retail-optimization'
    },
    {
      title: 'Healthcare Efficiency Revolution: AI-Powered Patient Flow Optimization',
      industry: 'healthcare',
      serviceType: 'operational-optimization', 
      roi: 'Significant ROI',
      slug: 'healthcare-workflow'
    },
    {
      title: 'Financial Services Transformation: AI-Powered Risk Assessment and Compliance',
      industry: 'financial',
      serviceType: 'custom-ai-solutions',
      roi: 'Significant ROI',
      slug: 'financial-risk-assessment'
    }
  ],
  filterTestCases: [
    {
      filter: 'industry',
      value: 'manufacturing',
      expectedCount: 1,
      expectedTitles: ['Digital Manufacturing Platform: Quality Control System with AI Enhancement']
    },
    {
      filter: 'serviceType', 
      value: 'operational',
      expectedCount: 2,
      expectedTitles: ['Digital Manufacturing Platform: Quality Control System with AI Enhancement', 'Healthcare Efficiency Revolution: AI-Powered Patient Flow Optimization']
    },
    {
      filter: 'roi',
      value: 'high',
      expectedCount: 1,
      expectedTitles: ['E-commerce Platform Optimization: Inventory Management with Intelligent Forecasting']
    }
  ],
  searchTestCases: [
    {
      keyword: 'manufacturing',
      expectedCount: 1,
      expectedTitles: ['Digital Manufacturing Platform: Quality Control System with AI Enhancement']
    },
    {
      keyword: 'healthcare',
      expectedCount: 1,
      expectedTitles: ['Healthcare Efficiency Revolution: AI-Powered Patient Flow Optimization']
    },
    {
      keyword: 'optimization',
      expectedCount: 3, // Should match multiple case studies
    }
  ]
};

/**
 * Services test data
 */
export const servicesData = {
  expectedServices: [
    {
      title: 'Multi-Agent AI Systems',
      slug: 'multi-agent-ai-systems',
      priceRange: '$25K-$150K',
      description: 'Intelligent automation'
    },
    {
      title: 'Operational Optimization',
      slug: 'operational-optimization',
      priceRange: '$15K-$100K',
      description: 'Process improvement'
    },
    {
      title: 'AI-Accelerated Transformation',
      slug: 'ai-accelerated-transformation',
      priceRange: '$75K-$500K',
      description: 'Enterprise transformation'
    },
    {
      title: 'Custom AI Solutions',
      slug: 'custom-ai-solutions',
      priceRange: '$35K-$250K',
      description: 'Tailored solutions'
    }
  ]
};

/**
 * Lead scoring test cases
 */
export const leadScoringTestCases = [
  {
    name: 'High Value Enterprise Lead',
    data: highValueLeadData,
    expectedScoreRange: { min: 80, max: 100 },
    expectedPriority: 'high'
  },
  {
    name: 'Medium Value Business Lead',
    data: mediumValueLeadData,
    expectedScoreRange: { min: 50, max: 79 },
    expectedPriority: 'medium'
  },
  {
    name: 'Low Value Exploration Lead',
    data: lowValueLeadData,
    expectedScoreRange: { min: 0, max: 49 },
    expectedPriority: 'low'
  }
];

/**
 * Navigation test data
 */
export const navigationTestCases = [
  { page: 'Home', path: '/', expectedTitle: 'Stratalace' },
  { page: 'About', path: '/about', expectedTitle: 'About' },
  { page: 'Services', path: '/services', expectedTitle: 'Services' },
  { page: 'Case Studies', path: '/case-studies', expectedTitle: 'Case Studies' },
  { page: 'Contact', path: '/contact', expectedTitle: 'Contact' }
];

/**
 * Performance benchmarks
 */
export const performanceBenchmarks = {
  lighthouse: {
    performance: 95,
    accessibility: 95,
    bestPractices: 95,
    seo: 95
  },
  coreWebVitals: {
    lcp: 2500, // Largest Contentful Paint < 2.5s
    fid: 100,  // First Input Delay < 100ms  
    cls: 0.1   // Cumulative Layout Shift < 0.1
  },
  loadTimes: {
    homepage: 1500,
    contactForm: 2000,
    caseStudies: 2000,
    services: 1500
  }
};

/**
 * Responsive testing viewports
 */
export const responsiveViewports = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 13', width: 390, height: 844 },
  { name: 'iPad', width: 768, height: 1024 },
  { name: 'iPad Pro', width: 1024, height: 1366 },
  { name: 'Desktop Small', width: 1024, height: 768 },
  { name: 'Desktop Medium', width: 1440, height: 900 },
  { name: 'Desktop Large', width: 1920, height: 1080 }
];

/**
 * Accessibility test cases
 */
export const accessibilityTestCases = [
  {
    name: 'Keyboard Navigation',
    description: 'All interactive elements should be keyboard accessible'
  },
  {
    name: 'Screen Reader Support', 
    description: 'Proper ARIA labels and semantic HTML'
  },
  {
    name: 'Color Contrast',
    description: 'WCAG 2.1 AA color contrast requirements'
  },
  {
    name: 'Focus Management',
    description: 'Visible focus indicators and logical tab order'
  }
];