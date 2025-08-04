'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ContactFormProgress } from './ContactFormProgress'
import { FormStep1 } from './FormStep1'
import { FormStep2 } from './FormStep2'
import { FormStep3 } from './FormStep3'
import { FormStep4 } from './FormStep4'
import { ContactFormData, ContactFormState, LeadScore } from '@/types/sanity'
import { submitContactForm } from '@/app/contact/actions'
import { ArrowLeft, ArrowRight, Send, CheckCircle, Loader2 } from 'lucide-react'

const TOTAL_STEPS = 4
const STEP_LABELS = [
  'Project & Urgency',
  'Company Information', 
  'Scope & Budget',
  'Contact Details'
]

interface MultiStepFormProps {
  className?: string
}

export function MultiStepForm({ className }: MultiStepFormProps) {
  const [isPending, startTransition] = useTransition()
  const [formState, setFormState] = useState<ContactFormState>({
    currentStep: 1,
    formData: {},
    errors: {},
    isSubmitting: false,
    leadScore: {
      budget: 0,
      urgency: 0,
      companySize: 0,
      techReadiness: 0,
      decisionMaker: 0,
      total: 0,
      tier: 'low'
    }
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const updateFormData = (newData: Partial<ContactFormData>) => {
    setFormState(prev => ({
      ...prev,
      formData: { ...prev.formData, ...newData },
      errors: {} // Clear errors when user makes changes
    }))
  }

  const calculateLeadScore = (data: Partial<ContactFormData>): LeadScore => {
    let budget = 0
    let urgency = 0
    let companySize = 0
    let techReadiness = 0
    let decisionMaker = 0

    // Budget scoring (0-30 points)
    switch (data.budgetRange) {
      case 'under-50k': budget = 10; break
      case '50k-100k': budget = 15; break
      case '100k-250k': budget = 20; break
      case '250k-500k': budget = 25; break
      case 'over-500k': budget = 30; break
      case 'discuss': budget = 20; break
      default: budget = 0
    }

    // Urgency scoring (0-25 points)
    switch (data.urgency) {
      case 'immediate': urgency = 25; break
      case 'soon': urgency = 20; break
      case 'planning': urgency = 15; break
      case 'future': urgency = 10; break
      default: urgency = 0
    }

    // Company size scoring (0-20 points)
    switch (data.companySize) {
      case 'startup': companySize = 10; break
      case 'small': companySize = 12; break
      case 'medium': companySize = 15; break
      case 'large': companySize = 18; break
      case 'enterprise': companySize = 20; break
      default: companySize = 0
    }

    // Tech readiness (0-15 points)
    switch (data.previousAIExperience) {
      case 'none': techReadiness = 8; break
      case 'basic': techReadiness = 10; break
      case 'intermediate': techReadiness = 12; break
      case 'advanced': techReadiness = 15; break
      default: techReadiness = 5
    }

    // Decision maker involvement (0-10 points)
    if (data.decisionMakers) {
      const decisionText = data.decisionMakers.toLowerCase()
      if (decisionText.includes('ceo') || decisionText.includes('cto') || decisionText.includes('founder')) {
        decisionMaker = 10
      } else if (decisionText.includes('director') || decisionText.includes('vp')) {
        decisionMaker = 7
      } else if (decisionText.includes('manager')) {
        decisionMaker = 5
      } else {
        decisionMaker = 3
      }
    }

    const total = budget + urgency + companySize + techReadiness + decisionMaker
    let tier: 'high' | 'medium' | 'low' = 'low'
    
    if (total >= 80) tier = 'high'
    else if (total >= 50) tier = 'medium'

    return { budget, urgency, companySize, techReadiness, decisionMaker, total, tier }
  }

  const validateStep = (step: number): Record<string, string> => {
    const errors: Record<string, string> = {}
    const data = formState.formData

    switch (step) {
      case 1:
        if (!data.primaryChallenge) {
          errors.primaryChallenge = 'Please select your primary business challenge'
        }
        if (!data.urgency) {
          errors.urgency = 'Please indicate when you need this solved'
        }
        break

      case 2:
        if (!data.companyName?.trim()) {
          errors.companyName = 'Company name is required'
        }
        if (!data.industry) {
          errors.industry = 'Please select your industry'
        }
        if (!data.companySize) {
          errors.companySize = 'Please select your company size'
        }
        break

      case 3:
        if (!data.projectScope?.trim()) {
          errors.projectScope = 'Please describe your project scope and challenge'
        } else if (data.projectScope.length < 50) {
          errors.projectScope = 'Please provide more detail about your project (at least 50 characters)'
        }
        if (!data.budgetRange) {
          errors.budgetRange = 'Please select a budget range'
        }
        break

      case 4:
        if (!data.contactName?.trim()) {
          errors.contactName = 'Your name is required'
        }
        if (!data.email?.trim()) {
          errors.email = 'Email address is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
          errors.email = 'Please enter a valid email address'
        }
        break
    }

    return errors
  }

  const handleNext = () => {
    const errors = validateStep(formState.currentStep)
    
    if (Object.keys(errors).length > 0) {
      setFormState(prev => ({ ...prev, errors }))
      return
    }

    if (formState.currentStep < TOTAL_STEPS) {
      setFormState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1,
        errors: {},
        leadScore: calculateLeadScore(prev.formData)
      }))
    }
  }

  const handlePrevious = () => {
    if (formState.currentStep > 1) {
      setFormState(prev => ({
        ...prev,
        currentStep: prev.currentStep - 1,
        errors: {}
      }))
    }
  }

  const handleSubmit = async () => {
    const errors = validateStep(formState.currentStep)
    
    if (Object.keys(errors).length > 0) {
      setFormState(prev => ({ ...prev, errors }))
      return
    }

    startTransition(async () => {
      try {
        setFormState(prev => ({ ...prev, isSubmitting: true }))
        
        // Calculate final lead score
        const leadScore = calculateLeadScore(formState.formData)
        
        // Prepare form data for submission
        const formData = new FormData()
        Object.entries(formState.formData).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              formData.append(key, value.join(', '))
            } else {
              formData.append(key, value.toString())
            }
          }
        })
        
        // Add lead score
        formData.append('leadScore', JSON.stringify(leadScore))
        
        await submitContactForm(formData)
        setIsSubmitted(true)
      } catch (error) {
        console.error('Form submission error:', error)
        setFormState(prev => ({
          ...prev,
          errors: { submit: 'Failed to submit form. Please try again.' },
          isSubmitting: false
        }))
      }
    })
  }

  const renderCurrentStep = () => {
    const stepProps = {
      formData: formState.formData,
      onUpdate: updateFormData,
      errors: formState.errors
    }

    switch (formState.currentStep) {
      case 1:
        return <FormStep1 {...stepProps} />
      case 2:
        return <FormStep2 {...stepProps} />
      case 3:
        return <FormStep3 {...stepProps} />
      case 4:
        return <FormStep4 {...stepProps} />
      default:
        return null
    }
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="space-y-6">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
              <p className="text-muted-foreground">
                Your consultation request has been submitted successfully.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 text-left">
              <h3 className="font-semibold mb-2">What's Next:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• You'll receive a confirmation email within 5 minutes</li>
                <li>• Our team will review your requirements within 2 business hours</li>
                <li>• We'll reach out to schedule your consultation at your preferred time</li>
                <li>• Expect initial contact within 24 hours</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="outline">
                <a href="/case-studies">View Case Studies</a>
              </Button>
              <Button asChild>
                <a href="/services">Explore Our Services</a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={className}>
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8">
          {/* Progress Indicator */}
          <ContactFormProgress 
            currentStep={formState.currentStep}
            totalSteps={TOTAL_STEPS}
            stepLabels={STEP_LABELS}
          />

          {/* Form Content */}
          <div className="mt-8">
            {renderCurrentStep()}
          </div>

          {/* Form Errors */}
          {formState.errors.submit && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{formState.errors.submit}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={formState.currentStep === 1 || formState.isSubmitting}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="text-sm text-muted-foreground">
              Step {formState.currentStep} of {TOTAL_STEPS}
            </div>

            {formState.currentStep === TOTAL_STEPS ? (
              <Button
                onClick={handleSubmit}
                disabled={formState.isSubmitting || isPending}
                className="flex items-center gap-2"
              >
                {(formState.isSubmitting || isPending) ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Request
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={formState.isSubmitting}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}