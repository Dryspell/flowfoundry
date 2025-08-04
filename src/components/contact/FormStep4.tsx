'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ContactFormData } from '@/types/sanity'
import { 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  Calendar,
  Clock,
  PhoneCall,
  Video,
  Check,
  HelpCircle,
  Send
} from 'lucide-react'

interface FormStep4Props {
  formData: Partial<ContactFormData>
  onUpdate: (data: Partial<ContactFormData>) => void
  errors: Record<string, string>
}

const contactMethods = [
  { id: 'email', label: 'Email', description: 'Detailed written communication', icon: Mail },
  { id: 'phone', label: 'Phone Call', description: 'Direct conversation', icon: PhoneCall },
  { id: 'video', label: 'Video Call', description: 'Screen sharing and demos', icon: Video },
  { id: 'meeting', label: 'In-Person Meeting', description: 'Face-to-face discussion', icon: Calendar }
]

const consultationTimes = [
  { id: 'morning', label: 'Morning (9 AM - 12 PM)', icon: Clock },
  { id: 'afternoon', label: 'Afternoon (12 PM - 5 PM)', icon: Clock },
  { id: 'evening', label: 'Evening (5 PM - 8 PM)', icon: Clock },
  { id: 'flexible', label: 'Flexible / Any time', icon: Clock }
]

export function FormStep4({ formData, onUpdate, errors }: FormStep4Props) {
  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    onUpdate({ [field]: value })
  }

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length >= 10) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
    }
    return value
  }

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value)
    handleInputChange('phone', formatted)
  }

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        
        {/* Full Name */}
        <div>
          <Label htmlFor="contactName" className="text-base font-medium">
            Full Name *
          </Label>
          <div className="mt-2">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="contactName"
                placeholder="Enter your full name"
                value={formData.contactName || ''}
                onChange={(e) => handleInputChange('contactName', e.target.value)}
                className={`pl-10 ${errors.contactName ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.contactName && (
              <p className="text-red-600 text-sm mt-1">{errors.contactName}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-base font-medium">
            Business Email *
          </Label>
          <div className="mt-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@company.com"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" className="text-base font-medium">
            Phone Number
          </Label>
          <div className="mt-2">
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone || ''}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Communication Preferences */}
      <div>
        <Label className="text-base font-medium">Preferred Communication Method</Label>
        <p className="text-sm text-muted-foreground mt-1 mb-3">
          How would you like us to contact you for the initial consultation?
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {contactMethods.map((method) => (
            <Card
              key={method.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${
                formData.preferredContact === method.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleInputChange('preferredContact', method.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                    formData.preferredContact === method.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    <method.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{method.label}</div>
                    <div className="text-xs text-muted-foreground">{method.description}</div>
                  </div>
                  {formData.preferredContact === method.id && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Best Time for Consultation */}
      <div>
        <Label className="text-base font-medium">Best Time for Consultation</Label>
        <p className="text-sm text-muted-foreground mt-1 mb-3">
          When would be the best time to reach you? (Times shown in your local timezone)
        </p>
        
        <div className="space-y-2">
          {consultationTimes.map((time) => (
            <Card
              key={time.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${
                formData.consultationTime === time.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleInputChange('consultationTime', time.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                    formData.consultationTime === time.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    <time.icon className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{time.label}</div>
                  </div>
                  {formData.consultationTime === time.id && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Specific Questions */}
      <div>
        <Label htmlFor="specificQuestions" className="text-base font-medium">
          Specific Questions or Additional Information
        </Label>
        <p className="text-sm text-muted-foreground mt-1 mb-3">
          Any specific questions, concerns, or additional context you'd like to share?
        </p>
        <div className="relative">
          <Textarea
            id="specificQuestions"
            placeholder="Example: We're particularly interested in ROI projections, integration with our existing ERP system, and implementation timeline. Are there any similar clients in our industry you've worked with?"
            value={formData.specificQuestions || ''}
            onChange={(e) => handleInputChange('specificQuestions', e.target.value)}
            className="min-h-24"
          />
          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
            {(formData.specificQuestions || '').length}/500
          </div>
        </div>
      </div>

      {/* What Happens Next */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Send className="h-5 w-5 text-primary" />
            What Happens Next?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div>
                <div className="font-medium text-sm">Immediate Confirmation</div>
                <div className="text-xs text-muted-foreground">
                  You'll receive an email confirmation with your submission details
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div>
                <div className="font-medium text-sm">Expert Review (2 hours)</div>
                <div className="text-xs text-muted-foreground">
                  Our specialists will review your requirements and prepare for the call
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div>
                <div className="font-medium text-sm">Consultation Call</div>
                <div className="text-xs text-muted-foreground">
                  30-minute discussion about your needs and potential solutions
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                4
              </div>
              <div>
                <div className="font-medium text-sm">Custom Proposal</div>
                <div className="text-xs text-muted-foreground">
                  Detailed project scope, timeline, and investment recommendation
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <Check className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <h4 className="font-medium mb-1 text-sm">Privacy & Security Commitment</h4>
            <p className="text-sm text-muted-foreground">
              Your information is encrypted and secure. We never share your details with third parties 
              and can sign NDAs before detailed technical discussions. You can unsubscribe from 
              communications at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}