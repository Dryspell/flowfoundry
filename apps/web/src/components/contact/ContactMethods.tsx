import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ContactMethods as ContactMethodsType } from '@/types/sanity'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar,
  PhoneCall,
  Video,
  Download,
  ExternalLink,
  Shield,
  Zap,
  Users
} from 'lucide-react'

interface ContactMethodsProps {
  className?: string
}

// Contact information - this would typically come from CMS or config
const contactInfo: ContactMethodsType = {
  phone: {
    main: "+1 (555) 123-4567",
    emergency: "+1 (555) 123-4568", 
    hours: "Monday-Friday, 9 AM - 6 PM PST"
  },
  email: {
    general: "hello@stratalace.com",
    sales: "sales@stratalace.com",
    support: "support@stratalace.com",
    emergency: "urgent@stratalace.com"
  },
  address: {
    street: "123 Innovation Drive",
    city: "San Francisco",
    state: "CA", 
    zip: "94105",
    country: "United States"
  },
  social: {
    linkedin: "https://linkedin.com/company/stratalace",
    twitter: "https://twitter.com/stratalace"
  }
}

const contactOptions = [
  {
    id: 'consultation',
    title: 'Schedule Free Consultation',
    description: 'Book a 30-minute strategy session to discuss your AI transformation needs',
    icon: Calendar,
    primary: true,
    href: '#consultation-form',
    action: 'Schedule Now'
  },
  {
    id: 'phone',
    title: 'Phone Consultation',
    description: 'Speak directly with our AI specialists for immediate guidance',
    icon: PhoneCall,
    href: `tel:${contactInfo.phone.main}`,
    action: 'Call Now',
    details: contactInfo.phone.main
  },
  {
    id: 'email',
    title: 'Email Inquiry',
    description: 'Send us detailed information about your project for a comprehensive response',
    icon: Mail,
    href: `mailto:${contactInfo.email.sales}?subject=AI Transformation Inquiry`,
    action: 'Send Email',
    details: contactInfo.email.sales
  },
  {
    id: 'video',
    title: 'Video Demo',
    description: 'See our AI solutions in action with a personalized demonstration',
    icon: Video,
    href: '#consultation-form',
    action: 'Request Demo'
  }
]

const quickResources = [
  {
    title: 'AI Readiness Assessment',
    description: 'Evaluate your organization\'s readiness for AI implementation',
    icon: Download,
    href: '/resources/ai-readiness-assessment.pdf',
    type: 'PDF Download'
  },
  {
    title: 'ROI Calculator',
    description: 'Estimate potential savings and returns from AI automation',
    icon: Zap,
    href: '/calculator',
    type: 'Interactive Tool'
  },
  {
    title: 'Implementation Guide',
    description: 'Step-by-step guide to successful AI project implementation',
    icon: Users,
    href: '/resources/implementation-guide',
    type: 'Resource Page'
  }
]

export function ContactMethods({ className }: ContactMethodsProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Primary Contact Options */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Get Started Today</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactOptions.map((option) => (
            <Card 
              key={option.id}
              className={`group hover:shadow-lg transition-all duration-300 cursor-pointer ${
                option.primary ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    option.primary 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted group-hover:bg-primary/10'
                  }`}>
                    <option.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{option.title}</CardTitle>
                    {option.primary && (
                      <Badge className="mt-1 bg-primary/10 text-primary border-primary/20">
                        Recommended
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4 text-sm">
                  {option.description}
                </p>
                {option.details && (
                  <p className="text-sm font-medium mb-4 text-primary">
                    {option.details}
                  </p>
                )}
                <Button 
                  asChild 
                  className={`w-full ${option.primary ? '' : 'variant-outline'}`}
                  variant={option.primary ? 'default' : 'outline'}
                >
                  <a href={option.href}>
                    {option.action}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Phone & Hours */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Phone className="h-5 w-5 text-primary" />
                Phone Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="font-medium">Main Line</div>
                <a 
                  href={`tel:${contactInfo.phone.main}`}
                  className="text-primary hover:underline"
                >
                  {contactInfo.phone.main}
                </a>
              </div>
              <div>
                <div className="font-medium">Emergency Line</div>
                <a 
                  href={`tel:${contactInfo.phone.emergency}`}
                  className="text-primary hover:underline"
                >
                  {contactInfo.phone.emergency}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {contactInfo.phone.hours}
              </div>
            </CardContent>
          </Card>

          {/* Email Support */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Mail className="h-5 w-5 text-primary" />
                Email Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="font-medium">Sales Inquiries</div>
                <a 
                  href={`mailto:${contactInfo.email.sales}`}
                  className="text-primary hover:underline text-sm"
                >
                  {contactInfo.email.sales}
                </a>
              </div>
              <div>
                <div className="font-medium">General Questions</div>
                <a 
                  href={`mailto:${contactInfo.email.general}`}
                  className="text-primary hover:underline text-sm"
                >
                  {contactInfo.email.general}
                </a>
              </div>
              <div>
                <div className="font-medium">Urgent Matters</div>
                <a 
                  href={`mailto:${contactInfo.email.emergency}`}
                  className="text-primary hover:underline text-sm"
                >
                  {contactInfo.email.emergency}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Office Location */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Office Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>{contactInfo.address.street}</div>
            <div>
              {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}
            </div>
            <div>{contactInfo.address.country}</div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Resources */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Free Resources</h3>
        <div className="space-y-3">
          {quickResources.map((resource) => (
            <Card key={resource.title} className="group hover:shadow-md transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <resource.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{resource.title}</div>
                    <div className="text-sm text-muted-foreground">{resource.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {resource.type}
                    </Badge>
                    <Button asChild variant="ghost" size="sm">
                      <a href={resource.href}>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Our Commitment to You</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Response within 2 hours during business hours</li>
                <li>• Free initial consultation with no obligation</li>
                <li>• Enterprise-grade security and confidentiality</li>
                <li>• Transparent pricing with no hidden fees</li>
                <li>• 98% client satisfaction rate across all projects</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}