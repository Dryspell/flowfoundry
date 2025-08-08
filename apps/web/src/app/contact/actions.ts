'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { LeadScore } from '@/types/sanity'

// Validation schema for contact form data
const contactFormSchema = z.object({
  // Step 1: Project Type & Urgency
  primaryChallenge: z.string().min(1, 'Primary challenge is required'),
  urgency: z.string().min(1, 'Urgency is required'),
  
  // Step 2: Company Information
  companyName: z.string().min(1, 'Company name is required'),
  website: z.string().optional(),
  industry: z.string().min(1, 'Industry is required'),
  companySize: z.string().min(1, 'Company size is required'),
  currentTech: z.string().optional(), // Comma-separated
  previousAIExperience: z.string().optional(),
  
  // Step 3: Project Scope & Budget
  projectScope: z.string().min(50, 'Project scope must be at least 50 characters'),
  expectedOutcomes: z.string().optional(), // Comma-separated
  budgetRange: z.string().min(1, 'Budget range is required'),
  timeline: z.string().optional(),
  decisionMakers: z.string().optional(),
  stakeholders: z.string().optional(), // Comma-separated
  
  // Step 4: Contact Details & Preferences
  contactName: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  preferredContact: z.string().optional(),
  consultationTime: z.string().optional(),
  specificQuestions: z.string().optional(),
  
  // Lead scoring data
  leadScore: z.string().optional()
})

// Infer the TypeScript type from the Zod schema
type ContactFormData = z.infer<typeof contactFormSchema>

// Type for processed form data with arrays
type ProcessedContactFormData = Omit<ContactFormData, 'currentTech' | 'expectedOutcomes' | 'stakeholders'> & {
  currentTech: string[]
  expectedOutcomes: string[]
  stakeholders: string[]
}

// Enhanced server action for comprehensive contact form submission
export async function submitContactForm(formData: FormData) {
  try {
    // Extract and validate form data
    const rawData = Object.fromEntries(formData.entries())
    const validatedData = contactFormSchema.parse(rawData)
    
    // Parse lead score if provided
    let leadScore: LeadScore | null = null
    if (validatedData.leadScore) {
      try {
        leadScore = JSON.parse(validatedData.leadScore)
      } catch (e) {
        console.warn('Failed to parse lead score:', e)
      }
    }

    // Process arrays (comma-separated values)
    const processedData = {
      ...validatedData,
      currentTech: validatedData.currentTech ? validatedData.currentTech.split(', ').filter(Boolean) : [],
      expectedOutcomes: validatedData.expectedOutcomes ? validatedData.expectedOutcomes.split(', ').filter(Boolean) : [],
      stakeholders: validatedData.stakeholders ? validatedData.stakeholders.split(', ').filter(Boolean) : [],
    }

    // Determine priority based on lead score
    const priority = leadScore ? 
      (leadScore.tier === 'high' ? 'urgent' : 
       leadScore.tier === 'medium' ? 'high' : 'normal') : 'normal'

    // Generate lead summary
    const leadSummary = generateLeadSummary(processedData, leadScore)

    // Log the submission (in production, this would go to CRM/database)
    console.warn('Enhanced Contact Form Submission:', {
      submission: processedData,
      leadScore,
      priority,
      timestamp: new Date().toISOString(),
      summary: leadSummary
    })

    // TODO: Integrate with CRM (HubSpot, Salesforce, etc.)
    await createCRMLead(processedData, leadScore, priority)

    // TODO: Send notification emails based on priority
    await sendNotificationEmails(processedData, leadScore, priority)

    // TODO: Send to Slack/Teams for immediate team notification
    await sendTeamNotification(processedData, leadScore, priority)

    // TODO: Send confirmation email to prospect
    await sendConfirmationEmail(processedData)

    // Revalidate the contact page
    revalidatePath('/contact')

    // Success - MultiStepForm component handles the success state
    return { success: true }

  } catch (error) {
    console.error('Contact form submission error:', error)
    
    if (error instanceof z.ZodError) {
      const fieldErrors = error.issues.reduce((acc, err) => {
        if (err.path) {
          acc[err.path.join('.')] = err.message
        }
        return acc
      }, {} as Record<string, string>)
      
      throw new Error(JSON.stringify({ type: 'validation', errors: fieldErrors }))
    }
    
    throw new Error('Failed to submit contact form. Please try again.')
  }
}

// Generate a comprehensive lead summary
function generateLeadSummary(data: ProcessedContactFormData, leadScore: LeadScore | null): string {
  const parts = [
    `${data.companyName} (${data.industry}, ${data.companySize})`,
    `Challenge: ${data.primaryChallenge}`,
    `Budget: ${data.budgetRange}`,
    `Urgency: ${data.urgency}`,
  ]
  
  if (leadScore) {
    parts.push(`Lead Score: ${leadScore.total}/100 (${leadScore.tier.toUpperCase()})`)
  }
  
  return parts.join(' | ')
}

// Placeholder for CRM integration
async function createCRMLead(data: ProcessedContactFormData, leadScore: LeadScore | null, priority: string) {
  // TODO: Implement HubSpot/Salesforce integration
  console.warn('Creating CRM lead:', { data, leadScore, priority })
  
  // Example structure for CRM integration:
  /*
  const crmData = {
    company: data.companyName,
    website: data.website,
    industry: data.industry,
    employee_count: data.companySize,
    contact_name: data.contactName,
    email: data.email,
    phone: data.phone,
    lead_source: 'Website Contact Form',
    lead_score: leadScore?.total || 0,
    priority: priority,
    project_description: data.projectScope,
    budget_range: data.budgetRange,
    timeline: data.timeline,
    primary_challenge: data.primaryChallenge,
    urgency: data.urgency,
    preferred_contact: data.preferredContact,
    consultation_time: data.consultationTime,
    expected_outcomes: data.expectedOutcomes.join(', '),
    current_tech_stack: data.currentTech.join(', '),
    stakeholders: data.stakeholders.join(', '),
    specific_questions: data.specificQuestions,
    ai_experience: data.previousAIExperience,
    decision_makers: data.decisionMakers
  }
  
  // await hubspotClient.crm.contacts.basicApi.create({ properties: crmData })
  */
}

// Placeholder for notification emails
async function sendNotificationEmails(_data: ProcessedContactFormData, leadScore: LeadScore | null, priority: string) {
  // TODO: Implement email notifications
  console.warn('Sending notification emails:', { priority, leadScore })
  
  // High-priority leads get immediate notifications
  // Medium-priority leads get standard notifications
  // Low-priority leads get added to nurture sequence
}

// Placeholder for team notifications
async function sendTeamNotification(data: ProcessedContactFormData, leadScore: LeadScore | null, priority: string) {
  // TODO: Implement Slack/Teams integration
  console.warn('Sending team notification:', { 
    company: data.companyName,
    priority,
    leadScore: leadScore?.total || 0,
    challenge: data.primaryChallenge
  })
  
  // Example Slack message structure:
  /*
  const slackMessage = {
    text: `New ${priority.toUpperCase()} priority lead: ${data.companyName}`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*${data.companyName}* (${data.industry})\n*Contact:* ${data.contactName} <${data.email}>\n*Challenge:* ${data.primaryChallenge}\n*Budget:* ${data.budgetRange}\n*Lead Score:* ${leadScore?.total || 0}/100`
        }
      }
    ]
  }
  */
}

// Placeholder for confirmation email
async function sendConfirmationEmail(data: ProcessedContactFormData) {
  // TODO: Implement confirmation email
  console.warn('Sending confirmation email to:', data.email)
  
  // Email should include:
  // - Thank you message
  // - Next steps timeline
  // - What to expect
  // - Additional resources
  // - Emergency contact info if urgent
}

// Server Action for newsletter subscription
export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get('email') as string

  if (!email) {
    throw new Error('Email is required')
  }

  try {
    // TODO: Add to email marketing platform
    console.warn('Newsletter subscription:', { email })

    return { success: true, message: 'Successfully subscribed to newsletter' }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    throw new Error('Failed to subscribe to newsletter')
  }
}
