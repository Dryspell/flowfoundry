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
    slug: 'multi-agent-systems',
    title: 'Multi-Agent AI Systems',
    subtitle: 'Intelligent automation with multiple AI agents working in harmony',
    description: 'Transform your operations with sophisticated AI agents that collaborate to handle complex workflows, make intelligent decisions, and adapt to changing business needs. Our multi-agent systems provide 24/7 automated operations while maintaining human oversight and control.',
    icon: Bot,
    benefits: [
      '24/7 automated operations with minimal human intervention',
      'Intelligent decision-making across multiple business processes',
      'Scalable workflows that adapt to changing business requirements',
      'Reduced operational costs by up to 60%',
      'Improved accuracy and consistency in task execution',
      'Real-time coordination between different AI agents',
      'Seamless integration with existing business systems',
      'Continuous learning and optimization capabilities'
    ],
    process: [
      {
        step: 1,
        title: 'Discovery & Analysis',
        description: 'Comprehensive analysis of your current processes, identifying opportunities for multi-agent automation and defining system requirements.',
        duration: '2-3 weeks',
        deliverables: [
          'Process mapping and automation opportunities assessment',
          'Technical architecture recommendations',
          'ROI projections and implementation roadmap',
          'Risk assessment and mitigation strategies'
        ]
      },
      {
        step: 2,
        title: 'Agent Design & Architecture',
        description: 'Design specialized AI agents for different functions and create the coordination framework for seamless interaction.',
        duration: '3-4 weeks',
        deliverables: [
          'Multi-agent system architecture design',
          'Individual agent specifications and capabilities',
          'Communication protocols and coordination mechanisms',
          'Integration specifications with existing systems'
        ]
      },
      {
        step: 3,
        title: 'Development & Training',
        description: 'Build and train the AI agents, implementing the coordination system and ensuring robust performance across scenarios.',
        duration: '6-8 weeks',
        deliverables: [
          'Fully developed multi-agent system',
          'Trained and tested AI agents',
          'Monitoring and management dashboard',
          'Comprehensive testing and validation reports'
        ]
      },
      {
        step: 4,
        title: 'Deployment & Integration',
        description: 'Deploy the system in your environment with careful integration, monitoring, and gradual rollout to ensure smooth transition.',
        duration: '2-3 weeks',
        deliverables: [
          'Production deployment of multi-agent system',
          'Staff training and change management support',
          'Performance monitoring and optimization',
          'Documentation and operational procedures'
        ]
      },
      {
        step: 5,
        title: 'Optimization & Scaling',
        description: 'Continuous monitoring, optimization, and scaling of the system based on performance data and evolving business needs.',
        duration: 'Ongoing',
        deliverables: [
          'Performance optimization recommendations',
          'System scaling and enhancement roadmap',
          'Regular system health reports',
          'Continuous improvement implementations'
        ]
      }
    ],
    technologies: [
      {
        category: 'AI Frameworks',
        technologies: ['LangChain', 'AutoGen', 'CrewAI', 'OpenAI API', 'Anthropic Claude']
      },
      {
        category: 'Coordination',
        technologies: ['Apache Kafka', 'Redis', 'RabbitMQ', 'WebSockets', 'gRPC']
      },
      {
        category: 'Deployment',
        technologies: ['Docker', 'Kubernetes', 'AWS/Azure/GCP', 'Terraform', 'GitHub Actions']
      },
      {
        category: 'Monitoring',
        technologies: ['Prometheus', 'Grafana', 'DataDog', 'New Relic', 'Custom Dashboards']
      }
    ],
    pricing: [
      {
        name: 'Starter',
        description: 'Perfect for small teams looking to automate 2-3 key processes',
        startingPrice: '$25,000',
        timeline: '8-12 weeks',
        features: [
          '2-3 specialized AI agents',
          'Basic coordination system',
          'Integration with up to 3 existing systems',
          'Standard monitoring dashboard',
          '3 months of support and optimization',
          'Staff training included'
        ]
      },
      {
        name: 'Professional',
        description: 'Comprehensive solution for mid-sized businesses with complex workflows',
        startingPrice: '$75,000',
        timeline: '12-16 weeks',
        features: [
          '5-8 specialized AI agents',
          'Advanced coordination and workflow management',
          'Integration with up to 8 existing systems',
          'Custom monitoring and analytics dashboard',
          '6 months of support and optimization',
          'Advanced staff training and change management',
          'Performance optimization included'
        ]
      },
      {
        name: 'Enterprise',
        description: 'Full-scale multi-agent ecosystem for large organizations',
        startingPrice: '$150,000',
        timeline: '16-24 weeks',
        features: [
          '10+ specialized AI agents',
          'Enterprise-grade coordination platform',
          'Unlimited system integrations',
          'Advanced analytics and AI insights platform',
          '12 months of support and continuous optimization',
          'Comprehensive training and change management',
          'Custom agent development for specific needs',
          'Dedicated success manager'
        ]
      }
    ],
    caseStudies: ['manufacturing-automation', 'customer-service-transformation']
  },
  {
    slug: 'operational-optimization',
    title: 'Operational Optimization',
    subtitle: 'Streamline processes and maximize efficiency with AI-driven analysis',
    description: 'Unlock hidden efficiencies in your operations through AI-powered process analysis, optimization, and continuous improvement. Our solutions identify bottlenecks, reduce waste, and enhance productivity while maintaining quality standards.',
    icon: Cog,
    benefits: [
      'Process efficiency improvements of 40-70%',
      'Cost reduction through waste elimination and optimization',
      'Real-time operational insights and performance tracking',
      'Predictive maintenance and resource allocation',
      'Quality improvement through automated monitoring',
      'Data-driven decision making at all operational levels',
      'Scalable optimization that grows with your business',
      'Integration with existing operational systems'
    ],
    process: [
      {
        step: 1,
        title: 'Operational Assessment',
        description: 'Comprehensive analysis of current operations, identifying inefficiencies, bottlenecks, and optimization opportunities.',
        duration: '2-3 weeks',
        deliverables: [
          'Complete operational process mapping',
          'Efficiency gap analysis and bottleneck identification',
          'Data quality assessment and optimization potential',
          'Quick-win recommendations for immediate impact'
        ]
      },
      {
        step: 2,
        title: 'AI Solution Design',
        description: 'Design AI-powered optimization solutions tailored to your specific operational challenges and business objectives.',
        duration: '2-3 weeks',
        deliverables: [
          'AI optimization strategy and architecture',
          'Custom algorithm specifications',
          'Integration plan with existing systems',
          'Performance metrics and KPI framework'
        ]
      },
      {
        step: 3,
        title: 'Implementation & Integration',
        description: 'Deploy AI optimization tools and integrate them with your operational systems for real-time monitoring and improvement.',
        duration: '4-6 weeks',
        deliverables: [
          'AI optimization platform deployment',
          'Real-time monitoring and analytics dashboard',
          'Automated reporting and alert systems',
          'Staff training on new optimization tools'
        ]
      },
      {
        step: 4,
        title: 'Performance Tuning',
        description: 'Fine-tune the optimization algorithms based on real operational data and performance feedback.',
        duration: '3-4 weeks',
        deliverables: [
          'Algorithm optimization and performance improvements',
          'Customized operational dashboards',
          'Process automation implementations',
          'Performance validation and ROI measurement'
        ]
      },
      {
        step: 5,
        title: 'Continuous Improvement',
        description: 'Ongoing optimization, monitoring, and enhancement to ensure sustained performance improvements.',
        duration: 'Ongoing',
        deliverables: [
          'Monthly performance reviews and optimizations',
          'Quarterly strategy updates and enhancements',
          'Continuous system learning and adaptation',
          'Regular ROI reporting and improvement recommendations'
        ]
      }
    ],
    technologies: [
      {
        category: 'Analytics & ML',
        technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy']
      },
      {
        category: 'Process Mining',
        technologies: ['Celonis', 'Process Street', 'Nintex', 'UiPath Process Mining']
      },
      {
        category: 'Data Platforms',
        technologies: ['Snowflake', 'Databricks', 'AWS Redshift', 'PostgreSQL', 'MongoDB']
      },
      {
        category: 'Visualization',
        technologies: ['Tableau', 'Power BI', 'Grafana', 'D3.js', 'Custom Dashboards']
      }
    ],
    pricing: [
      {
        name: 'Essential',
        description: 'Core optimization for small to medium operations',
        startingPrice: '$15,000',
        timeline: '6-8 weeks',
        features: [
          'Process analysis and optimization for 2-3 key areas',
          'Basic AI-powered monitoring dashboard',
          'Integration with up to 3 data sources',
          'Monthly performance reports',
          '3 months of support and fine-tuning',
          'Basic staff training included'
        ]
      },
      {
        name: 'Advanced',
        description: 'Comprehensive optimization for complex operations',
        startingPrice: '$45,000',
        timeline: '8-12 weeks',
        features: [
          'End-to-end operational optimization',
          'Advanced AI analytics and predictive insights',
          'Integration with up to 8 data sources',
          'Real-time monitoring and automated alerts',
          '6 months of support and continuous optimization',
          'Advanced training and change management',
          'Custom dashboard development'
        ]
      },
      {
        name: 'Enterprise',
        description: 'Large-scale optimization for enterprise operations',
        startingPrice: '$100,000',
        timeline: '12-16 weeks',
        features: [
          'Organization-wide operational optimization',
          'AI-powered predictive analytics and forecasting',
          'Unlimited data source integrations',
          'Advanced process automation capabilities',
          '12 months of support and continuous improvement',
          'Executive training and strategic consulting',
          'Custom AI model development',
          'Dedicated optimization specialist'
        ]
      }
    ],
    caseStudies: ['retail-optimization', 'healthcare-workflow']
  },
  {
    slug: 'ai-transformation',
    title: 'AI-Accelerated Transformation',
    subtitle: 'Complete business transformation powered by AI strategy and implementation',
    description: 'Transform your entire business with a comprehensive AI strategy that touches every aspect of your operations. From strategy development to full implementation, we guide you through a complete transformation that positions your business for the AI-driven future.',
    icon: Zap,
    benefits: [
      'Complete business transformation with measurable ROI',
      'Strategic AI integration across all business functions',
      'Future-proof business model adapted for AI advantages',
      'Comprehensive change management and staff upskilling',
      'Competitive advantage through early AI adoption',
      'Scalable transformation that grows with your business',
      'Executive leadership support and strategic guidance',
      'Cultural transformation for AI-first mindset'
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
    slug: 'custom-ai-solutions',
    title: 'Custom AI Solutions',
    subtitle: 'Tailored AI implementations designed for your unique business challenges',
    description: 'Get AI solutions built specifically for your unique requirements and challenges. Our custom development approach ensures perfect alignment with your business processes, data, and objectives, delivering solutions that provide maximum value and competitive advantage.',
    icon: Wrench,
    benefits: [
      'AI solutions perfectly tailored to your specific needs',
      'Competitive advantage through unique AI capabilities',
      'Seamless integration with existing systems and workflows',
      'Scalable architecture that grows with your business',
      'Full ownership and control of your AI intellectual property',
      'Ongoing support and evolution of your custom solutions',
      'Expert guidance from ideation to deployment',
      'Measurable ROI through targeted solution design'
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