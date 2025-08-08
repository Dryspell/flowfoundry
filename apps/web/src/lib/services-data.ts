import { Bot, Cog, Zap, Wrench } from 'lucide-react'

export interface ProcessStep {
  step: number
  title: string
  description: string
  duration: string
  deliverables: string[]
}

export interface TechnologyStack {
  category: string
  technologies: string[]
}

export interface PricingTier {
  name: string
  description: string
  startingPrice: string
  features: string[]
  timeline: string
}

export interface ServiceData {
  slug: string
  title: string
  subtitle: string
  description: string
  benefits: string[]
  process: ProcessStep[]
  technologies: TechnologyStack[]
  pricing: PricingTier[]
  caseStudies: string[]
  icon: React.ElementType
}

export const servicesData: ServiceData[] = [
  {
    slug: 'custom-web-development',
    title: 'Custom Web Development',
    subtitle: 'Full-stack web applications built with modern frameworks',
    description: 'Transform your business with custom web applications built using React, Next.js, and modern tech stacks. We create scalable, performance-optimized solutions that drive real business results, with optional AI capabilities to enhance functionality.',
    icon: Wrench,
    benefits: [
      'Custom React/Next.js applications built for your specific needs',
      'Full-stack development with modern frameworks and databases',
      'E-commerce platforms with integrated payment processing',
      'Enterprise web applications with advanced functionality',
      'Performance-optimized solutions for superior user experience',
      'Mobile-responsive design that works on all devices',
      'API development and third-party integrations',
      'Scalable architecture designed for business growth'
    ],
    process: [
      {
        step: 1,
        title: 'Requirements & Planning',
        description: 'Comprehensive analysis of your business requirements, user needs, and technical specifications to design the optimal web solution.',
        duration: '1-2 weeks',
        deliverables: [
          'Detailed project requirements and specifications',
          'Technical architecture and technology stack recommendations',
          'UI/UX wireframes and design mockups',
          'Project timeline and development roadmap'
        ]
      },
      {
        step: 2,
        title: 'Design & Prototyping',
        description: 'Create responsive designs and interactive prototypes that align with your brand and provide exceptional user experience.',
        duration: '2-3 weeks',
        deliverables: [
          'Complete UI/UX design system',
          'Responsive design mockups for all screen sizes',
          'Interactive prototypes and user flows',
          'Brand integration and style guide'
        ]
      },
      {
        step: 3,
        title: 'Development & Implementation',
        description: 'Build your web application using modern frameworks, implementing both frontend and backend functionality with best practices.',
        duration: '6-12 weeks',
        deliverables: [
          'Fully functional web application',
          'Responsive frontend built with React/Next.js',
          'Robust backend API and database architecture',
          'Comprehensive testing and quality assurance'
        ]
      },
      {
        step: 4,
        title: 'Testing & Deployment',
        description: 'Thorough testing across devices and browsers, followed by secure deployment to production environments.',
        duration: '1-2 weeks',
        deliverables: [
          'Cross-browser and device compatibility testing',
          'Performance optimization and security audits',
          'Production deployment and environment setup',
          'Documentation and training materials'
        ]
      },
      {
        step: 5,
        title: 'Support & Maintenance',
        description: 'Ongoing support, performance monitoring, and feature enhancements to ensure your web application continues to perform optimally.',
        duration: 'Ongoing',
        deliverables: [
          'Regular performance monitoring and optimization',
          'Security updates and maintenance',
          'Feature enhancements and improvements',
          'Technical support and consultation'
        ]
      }
    ],
    technologies: [
      {
        category: 'Frontend',
        technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
      },
      {
        category: 'Backend',
        technologies: ['Node.js', 'Express', 'NestJS', 'Python', 'FastAPI']
      },
      {
        category: 'Database',
        technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'Supabase']
      },
      {
        category: 'Cloud & DevOps',
        technologies: ['AWS', 'Vercel', 'Docker', 'GitHub Actions', 'Terraform']
      }
    ],
    pricing: [
      {
        name: 'Essential',
        description: 'Perfect for small businesses looking for a professional web presence',
        startingPrice: '$15,000',
        timeline: '6-8 weeks',
        features: [
          'Custom React/Next.js web application',
          'Responsive design for all devices',
          'Basic CMS integration',
          'Contact forms and basic functionality',
          '3 months of support and maintenance',
          'SEO optimization included'
        ]
      },
      {
        name: 'Professional',
        description: 'Comprehensive solution for growing businesses with complex requirements',
        startingPrice: '$35,000',
        timeline: '8-12 weeks',
        features: [
          'Full-stack web application with custom features',
          'Advanced user authentication and management',
          'Database integration and API development',
          'Third-party service integrations',
          '6 months of support and optimization',
          'Performance monitoring and analytics',
          'Advanced SEO and conversion optimization'
        ]
      },
      {
        name: 'Enterprise',
        description: 'Large-scale web applications for enterprise organizations',
        startingPrice: '$75,000',
        timeline: '12-16 weeks',
        features: [
          'Enterprise-grade web application platform',
          'Advanced security and compliance features',
          'Scalable cloud infrastructure setup',
          'Multiple integrations and API endpoints',
          '12 months of support and continuous optimization',
          'Dedicated development team access',
          'Custom feature development and scaling',
          'Performance optimization and monitoring'
        ]
      }
    ],
    caseStudies: ['manufacturing-automation', 'retail-optimization']
  },
  {
    slug: 'digital-consultancy',
    title: 'Digital Consultancy',
    subtitle: 'Strategic technology planning and digital transformation consulting',
    description: 'Navigate digital transformation with expert technology strategy, system architecture design, and digital modernization consulting. We help you make informed technology decisions that drive business growth and operational efficiency.',
    icon: Cog,
    benefits: [
      'Strategic technology roadmap and planning',
      'System architecture design and optimization',
      'Digital transformation strategy and execution',
      'Performance optimization and scalability planning',
      'Technology stack evaluation and recommendations',
      'Integration strategy and API architecture',
      'Security and compliance consulting',
      'Ongoing technical advisory and support'
    ],
    process: [
      {
        step: 1,
        title: 'Technology Assessment',
        description: 'Comprehensive analysis of your current technology stack, identifying opportunities for improvement and modernization.',
        duration: '1-2 weeks',
        deliverables: [
          'Current technology stack audit and analysis',
          'Performance and scalability assessment',
          'Security and compliance review',
          'Technology gap analysis and recommendations'
        ]
      },
      {
        step: 2,
        title: 'Strategic Planning',
        description: 'Develop comprehensive technology strategy aligned with your business objectives and growth plans.',
        duration: '2-3 weeks',
        deliverables: [
          'Technology roadmap and strategic plan',
          'Architecture design and technical specifications',
          'Implementation timeline and resource planning',
          'ROI projections and budget recommendations'
        ]
      },
      {
        step: 3,
        title: 'Implementation Support',
        description: 'Provide guidance and support during the implementation of technology initiatives and system upgrades.',
        duration: '4-8 weeks',
        deliverables: [
          'Technical implementation guidance',
          'Architecture review and optimization',
          'Integration planning and support',
          'Team training and knowledge transfer'
        ]
      },
      {
        step: 4,
        title: 'Performance Optimization',
        description: 'Optimize system performance, security, and scalability based on real-world usage and data.',
        duration: '2-3 weeks',
        deliverables: [
          'Performance analysis and optimization',
          'Security hardening and compliance',
          'Scalability improvements and planning',
          'Documentation and best practices guide'
        ]
      },
      {
        step: 5,
        title: 'Ongoing Advisory',
        description: 'Continuous strategic technology advisory to ensure your systems evolve with your business needs.',
        duration: 'Ongoing',
        deliverables: [
          'Regular technology reviews and updates',
          'Strategic advisory and consulting',
          'Technology trend analysis and recommendations',
          'Continuous improvement planning'
        ]
      }
    ],
    technologies: [
      {
        category: 'Architecture & Planning',
        technologies: ['System Design', 'Microservices', 'API Architecture', 'Cloud Architecture']
      },
      {
        category: 'Cloud Platforms',
        technologies: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Vercel', 'Digital Ocean']
      },
      {
        category: 'DevOps & Infrastructure',
        technologies: ['Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Monitoring']
      },
      {
        category: 'Strategy & Planning',
        technologies: ['Technology Roadmaps', 'Risk Assessment', 'Compliance', 'Performance Analysis']
      }
    ],
    pricing: [
      {
        name: 'Strategic Assessment',
        description: 'Technology strategy and planning for growing businesses',
        startingPrice: '$10,000',
        timeline: '3-4 weeks',
        features: [
          'Technology stack assessment and recommendations',
          'Strategic technology roadmap development',
          'Architecture review and optimization plan',
          'Implementation timeline and budget planning',
          '3 months of strategic advisory support',
          'Technology decision support'
        ]
      },
      {
        name: 'Digital Transformation',
        description: 'Comprehensive technology modernization consulting',
        startingPrice: '$25,000',
        timeline: '6-8 weeks',
        features: [
          'End-to-end digital transformation strategy',
          'System architecture design and planning',
          'Technology migration and modernization plan',
          'Implementation support and guidance',
          '6 months of ongoing advisory support',
          'Team training and knowledge transfer',
          'Performance optimization strategy'
        ]
      },
      {
        name: 'Enterprise Advisory',
        description: 'Large-scale technology consulting for enterprises',
        startingPrice: '$50,000',
        timeline: '8-12 weeks',
        features: [
          'Organization-wide technology strategy',
          'Enterprise architecture design and governance',
          'Multi-system integration planning',
          'Scalability and performance optimization',
          '12 months of strategic advisory support',
          'Executive technology consulting',
          'Technology team mentoring',
          'Dedicated technology advisor'
        ]
      }
    ],
    caseStudies: ['healthcare-workflow', 'financial-risk-assessment']
  },
  {
    slug: 'web-agency-services',
    title: 'Web Development Agency Services',
    subtitle: 'Complete web development services from design to deployment',
    description: 'Full-service web development agency offering responsive design, API development, and cloud deployment solutions. We handle every aspect of your web presence from initial design concepts to production deployment and ongoing maintenance.',
    icon: Zap,
    benefits: [
      'Professional website design and user experience',
      'Mobile-responsive solutions that work on all devices',
      'API development and third-party integrations',
      'Cloud deployment and DevOps automation',
      'E-commerce platform development and optimization',
      'Content management system integration',
      'Performance optimization and SEO implementation',
      'Ongoing maintenance and support services'
    ],
    process: [
      {
        step: 1,
        title: 'Strategic Assessment',
        description: 'Comprehensive evaluation of your business, market position, and AI transformation opportunities.',
        duration: '3-4 weeks',
        deliverables: [
          'Complete business and market analysis',
          'AI readiness assessment across all functions',
          'Strategic AI transformation roadmap',
          'Competitive analysis and positioning strategy',
          'Executive summary and board presentation'
        ]
      },
      {
        step: 2,
        title: 'Transformation Strategy',
        description: 'Develop comprehensive AI transformation strategy aligned with business objectives and market opportunities.',
        duration: '4-5 weeks',
        deliverables: [
          'Detailed AI transformation strategy document',
          'Phased implementation plan with timelines',
          'Investment requirements and ROI projections',
          'Risk management and mitigation strategies',
          'Success metrics and KPI framework'
        ]
      },
      {
        step: 3,
        title: 'Foundation Building',
        description: 'Establish the technological, organizational, and cultural foundation for AI transformation.',
        duration: '6-8 weeks',
        deliverables: [
          'AI infrastructure setup and optimization',
          'Data strategy implementation and governance',
          'Initial AI pilot projects and proof of concepts',
          'Staff training and change management program',
          'Performance monitoring and measurement systems'
        ]
      },
      {
        step: 4,
        title: 'Transformation Implementation',
        description: 'Execute the comprehensive AI transformation across all identified business areas.',
        duration: '12-16 weeks',
        deliverables: [
          'AI system deployments across business functions',
          'Process automation and optimization implementations',
          'Advanced analytics and intelligence platforms',
          'Staff upskilling and capability development',
          'Performance optimization and fine-tuning'
        ]
      },
      {
        step: 5,
        title: 'Optimization & Scaling',
        description: 'Continuous optimization, scaling, and evolution of your AI-transformed business.',
        duration: 'Ongoing',
        deliverables: [
          'Quarterly transformation reviews and optimizations',
          'Scaling plans for additional business areas',
          'Advanced AI capability development',
          'Strategic advisory and future planning',
          'Continuous ROI measurement and improvement'
        ]
      }
    ],
    technologies: [
      {
        category: 'AI Platforms',
        technologies: ['OpenAI GPT', 'Anthropic Claude', 'Google Vertex AI', 'AWS Bedrock']
      },
      {
        category: 'Data & Analytics',
        technologies: ['Snowflake', 'Databricks', 'Tableau', 'Power BI', 'Apache Spark']
      },
      {
        category: 'Cloud Infrastructure',
        technologies: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Kubernetes', 'Terraform']
      },
      {
        category: 'Integration',
        technologies: ['MuleSoft', 'Zapier', 'Microsoft Power Platform', 'Custom APIs']
      }
    ],
    pricing: [
      {
        name: 'Foundation',
        description: 'Strategic AI transformation for focused business areas',
        startingPrice: '$75,000',
        timeline: '16-20 weeks',
        features: [
          'AI transformation strategy for 2-3 business areas',
          'Foundation infrastructure and data strategy',
          'Initial AI implementations and pilot projects',
          'Staff training and change management',
          '6 months of optimization and support',
          'Executive coaching and strategic guidance'
        ]
      },
      {
        name: 'Comprehensive',
        description: 'Complete business transformation with AI integration',
        startingPrice: '$200,000',
        timeline: '20-28 weeks',
        features: [
          'Organization-wide AI transformation strategy',
          'Complete infrastructure and platform development',
          'AI implementation across all business functions',
          'Comprehensive staff upskilling program',
          '12 months of optimization and strategic support',
          'Executive leadership development',
          'Advanced analytics and intelligence platforms'
        ]
      },
      {
        name: 'Enterprise',
        description: 'Large-scale transformation for complex organizations',
        startingPrice: '$500,000',
        timeline: '28-40 weeks',
        features: [
          'Multi-division AI transformation program',
          'Enterprise-grade AI infrastructure and governance',
          'Custom AI platform development',
          'Organization-wide culture transformation',
          '18 months of strategic advisory and optimization',
          'C-suite AI leadership development',
          'Advanced AI research and development',
          'Dedicated transformation team'
        ]
      }
    ],
    caseStudies: ['manufacturing-transformation', 'retail-digital-transformation']
  },
  {
    slug: 'ai-enhanced-solutions',
    title: 'AI-Enhanced Solutions',
    subtitle: 'Intelligent web applications with AI capabilities',
    description: 'Enhance your web applications with intelligent features, automated workflows, and data-driven insights. We integrate AI capabilities into your existing or new web solutions to provide smart automation and improved user experiences.',
    icon: Bot,
    benefits: [
      'Smart web applications with AI-powered features',
      'Automated workflow optimization and efficiency',
      'Data analytics and intelligent insights integration',
      'Natural language processing and chatbot capabilities',
      'Machine learning-enhanced user experiences',
      'Intelligent content management and recommendations',
      'Predictive analytics and business intelligence',
      'Seamless AI integration with existing web platforms'
    ],
    process: [
      {
        step: 1,
        title: 'Requirements Discovery',
        description: 'Deep dive into your specific challenges, requirements, and success criteria for custom AI development.',
        duration: '2-3 weeks',
        deliverables: [
          'Detailed requirements specification document',
          'Technical feasibility analysis',
          'Custom solution architecture proposal',
          'Project timeline and resource allocation plan',
          'Success metrics and acceptance criteria'
        ]
      },
      {
        step: 2,
        title: 'Solution Design',
        description: 'Design the custom AI solution architecture, algorithms, and integration approach tailored to your needs.',
        duration: '3-4 weeks',
        deliverables: [
          'Detailed technical architecture and design specs',
          'AI model specifications and training approach',
          'Integration design with existing systems',
          'User interface and experience design',
          'Testing and validation strategy'
        ]
      },
      {
        step: 3,
        title: 'Development & Training',
        description: 'Build and train your custom AI solution with iterative development and continuous stakeholder feedback.',
        duration: '8-12 weeks',
        deliverables: [
          'Custom AI solution development',
          'Model training and optimization',
          'User interface and experience implementation',
          'Integration with existing systems',
          'Comprehensive testing and validation'
        ]
      },
      {
        step: 4,
        title: 'Deployment & Integration',
        description: 'Deploy your custom solution into production with careful monitoring and user training.',
        duration: '2-4 weeks',
        deliverables: [
          'Production deployment of custom AI solution',
          'System integration and performance optimization',
          'User training and adoption support',
          'Documentation and operational procedures',
          'Performance monitoring and analytics setup'
        ]
      },
      {
        step: 5,
        title: 'Support & Evolution',
        description: 'Ongoing support, optimization, and evolution of your custom AI solution based on usage and feedback.',
        duration: 'Ongoing',
        deliverables: [
          'Regular performance monitoring and optimization',
          'Feature enhancements and capability expansions',
          'Technical support and troubleshooting',
          'Strategic guidance on AI solution evolution',
          'Quarterly reviews and improvement recommendations'
        ]
      }
    ],
    technologies: [
      {
        category: 'AI Development',
        technologies: ['PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain', 'Custom Models']
      },
      {
        category: 'Backend Development',
        technologies: ['Python', 'Node.js', 'FastAPI', 'GraphQL', 'Microservices']
      },
      {
        category: 'Frontend Development',
        technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Mobile Apps']
      },
      {
        category: 'Infrastructure',
        technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Monitoring Stack']
      }
    ],
    pricing: [
      {
        name: 'Focused Solution',
        description: 'Custom AI for specific business function or process',
        startingPrice: '$35,000',
        timeline: '10-14 weeks',
        features: [
          'Custom AI solution for 1-2 specific functions',
          'Basic user interface and integration',
          'Model training on your specific data',
          'Integration with up to 3 existing systems',
          '6 months of support and optimization',
          'Staff training and documentation'
        ]
      },
      {
        name: 'Comprehensive Solution',
        description: 'Advanced custom AI platform for multiple business areas',
        startingPrice: '$100,000',
        timeline: '14-20 weeks',
        features: [
          'Multi-functional custom AI platform',
          'Advanced user interface and analytics',
          'Multiple AI models and capabilities',
          'Extensive system integrations',
          '12 months of support and continuous improvement',
          'Advanced training and change management',
          'Performance optimization and scaling'
        ]
      },
      {
        name: 'Enterprise Platform',
        description: 'Large-scale custom AI platform for enterprise needs',
        startingPrice: '$250,000',
        timeline: '20-30 weeks',
        features: [
          'Enterprise-grade custom AI platform',
          'Advanced AI capabilities and algorithms',
          'Comprehensive integration ecosystem',
          'Advanced analytics and intelligence features',
          '18 months of support and evolution',
          'Executive training and strategic consulting',
          'IP ownership and technology transfer',
          'Dedicated development and support team'
        ]
      }
    ],
    caseStudies: ['custom-healthcare-ai', 'financial-risk-assessment']
  }
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find(service => service.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return servicesData.map(service => service.slug)
}