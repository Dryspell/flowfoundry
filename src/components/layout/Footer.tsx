import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Zap, Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react'

const navigation = {
  services: [
    { name: 'Custom Web Development', href: '/services/custom-web-development' },
    { name: 'Digital Consultancy', href: '/services/digital-consultancy' },
    { name: 'Web Agency Services', href: '/services/web-agency-services' },
    { name: 'AI-Enhanced Solutions', href: '/services/ai-enhanced-solutions' }
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' }
  ],
  resources: [
    { name: 'AI Strategy Guide', href: '/resources/strategy-guide' },
    { name: 'ROI Calculator', href: '/resources/roi-calculator' },
    { name: 'Implementation Checklist', href: '/resources/checklist' },
    { name: 'Industry Reports', href: '/resources/reports' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' }
  ]
}

const social = [
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'GitHub', href: '#', icon: Github }
]

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Flowfoundry</span>
              </Link>
              
              <p className="text-muted-foreground text-sm max-w-md mb-6">
                Transforming small and mid-sized businesses through AI-powered solutions. 
                We deliver custom AI implementations that drive real business outcomes and ROI.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>hello@flowfoundry.ai</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 flex space-x-4">
                {social.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <span className="sr-only">{item.name}</span>
                      <Icon className="h-5 w-5" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Services</h3>
              <ul className="space-y-3">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t py-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-sm text-muted-foreground">
                Get the latest insights on web development and digital transformation
              </p>
            </div>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 Flowfoundry. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            {navigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}