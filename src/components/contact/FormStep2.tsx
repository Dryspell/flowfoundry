'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ContactFormData } from '@/types/sanity'
import { 
  Building, 
  Globe, 
  Users, 
  Building2,
  Laptop,
  Plus,
  X,
  ChevronDown,
  Check
} from 'lucide-react'

interface FormStep2Props {
  formData: Partial<ContactFormData>
  onUpdate: (data: Partial<ContactFormData>) => void
  errors: Record<string, string>
}

const industries = [
  'Manufacturing', 'Retail & E-commerce', 'Healthcare', 'Financial Services',
  'Technology', 'Logistics & Supply Chain', 'Real Estate', 'Education',
  'Professional Services', 'Construction', 'Energy & Utilities', 'Media & Entertainment',
  'Automotive', 'Aerospace', 'Food & Beverage', 'Pharmaceuticals',
  'Government', 'Non-profit', 'Agriculture', 'Other'
]

const companySizes = [
  { id: 'startup', label: 'Startup (1-10 employees)', description: 'Early stage company' },
  { id: 'small', label: 'Small Business (11-50 employees)', description: 'Growing business' },
  { id: 'medium', label: 'Medium Business (51-250 employees)', description: 'Established company' },
  { id: 'large', label: 'Large Business (251-1000 employees)', description: 'Enterprise organization' },
  { id: 'enterprise', label: 'Enterprise (1000+ employees)', description: 'Large corporation' }
]

const commonTechStack = [
  'Microsoft Office 365', 'Google Workspace', 'Salesforce', 'HubSpot',
  'SAP', 'Oracle', 'AWS', 'Microsoft Azure', 'Slack', 'Zoom',
  'Shopify', 'WordPress', 'QuickBooks', 'Tableau', 'Power BI',
  'Jira', 'GitHub', 'Docker', 'Kubernetes', 'PostgreSQL', 'MySQL'
]

const aiExperienceOptions = [
  { id: 'none', label: 'No previous experience', description: 'New to AI implementations' },
  { id: 'basic', label: 'Basic experience', description: 'Some exposure to AI tools' },
  { id: 'intermediate', label: 'Intermediate experience', description: 'Implemented basic AI solutions' },
  { id: 'advanced', label: 'Advanced experience', description: 'Multiple AI implementations' }
]

export function FormStep2({ formData, onUpdate, errors }: FormStep2Props) {
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false)
  const [newTechItem, setNewTechItem] = useState('')
  const [showTechSuggestions, setShowTechSuggestions] = useState(false)

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    onUpdate({ [field]: value })
  }

  const handleTechStackAdd = (tech: string) => {
    const currentTech = formData.currentTech || []
    if (!currentTech.includes(tech)) {
      onUpdate({ currentTech: [...currentTech, tech] })
    }
    setNewTechItem('')
    setShowTechSuggestions(false)
  }

  const handleTechStackRemove = (tech: string) => {
    const currentTech = formData.currentTech || []
    onUpdate({ currentTech: currentTech.filter(t => t !== tech) })
  }

  const handleCustomTechAdd = () => {
    if (newTechItem.trim()) {
      handleTechStackAdd(newTechItem.trim())
    }
  }

  const filteredTechSuggestions = commonTechStack.filter(tech => 
    tech.toLowerCase().includes(newTechItem.toLowerCase()) &&
    !(formData.currentTech || []).includes(tech)
  )

  return (
    <div className="space-y-6">
      {/* Company Name */}
      <div>
        <Label htmlFor="companyName" className="text-base font-medium">
          Company Name *
        </Label>
        <div className="mt-2">
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="companyName"
              placeholder="Enter your company name"
              value={formData.companyName || ''}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className={`pl-10 ${errors.companyName ? 'border-red-500' : ''}`}
            />
          </div>
          {errors.companyName && (
            <p className="text-red-600 text-sm mt-1">{errors.companyName}</p>
          )}
        </div>
      </div>

      {/* Website */}
      <div>
        <Label htmlFor="website" className="text-base font-medium">
          Company Website
        </Label>
        <div className="mt-2">
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="website"
              placeholder="https://yourcompany.com"
              value={formData.website || ''}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Industry Selection */}
      <div>
        <Label className="text-base font-medium">Industry *</Label>
        <div className="mt-2 relative">
          <Button
            variant="outline"
            onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
            className={`w-full justify-between ${errors.industry ? 'border-red-500' : ''}`}
          >
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              {formData.industry || 'Select your industry'}
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
          
          {showIndustryDropdown && (
            <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => {
                    handleInputChange('industry', industry)
                    setShowIndustryDropdown(false)
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-accent text-sm transition-colors flex items-center justify-between"
                >
                  {industry}
                  {formData.industry === industry && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        {errors.industry && (
          <p className="text-red-600 text-sm mt-1">{errors.industry}</p>
        )}
      </div>

      {/* Company Size */}
      <div>
        <Label className="text-base font-medium">Company Size *</Label>
        <div className="mt-2 space-y-2">
          {companySizes.map((size) => (
            <Card
              key={size.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${
                formData.companySize === size.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleInputChange('companySize', size.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                    formData.companySize === size.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    <Users className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{size.label}</div>
                    <div className="text-xs text-muted-foreground">{size.description}</div>
                  </div>
                  {formData.companySize === size.id && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {errors.companySize && (
          <p className="text-red-600 text-sm mt-1">{errors.companySize}</p>
        )}
      </div>

      {/* Current Tech Stack */}
      <div>
        <Label className="text-base font-medium">Current Technology Stack</Label>
        <p className="text-sm text-muted-foreground mt-1 mb-3">
          Tell us about the tools and platforms you currently use
        </p>
        
        {/* Selected Tech */}
        {formData.currentTech && formData.currentTech.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.currentTech.map((tech) => (
              <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                {tech}
                <button
                  onClick={() => handleTechStackRemove(tech)}
                  className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Add Tech Input */}
        <div className="relative">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Laptop className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Add technology or platform..."
                value={newTechItem}
                onChange={(e) => {
                  setNewTechItem(e.target.value)
                  setShowTechSuggestions(e.target.value.length > 0)
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleCustomTechAdd()
                  }
                }}
                className="pl-10"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleCustomTechAdd}
              disabled={!newTechItem.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Tech Suggestions */}
          {showTechSuggestions && filteredTechSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-40 overflow-y-auto">
              {filteredTechSuggestions.slice(0, 8).map((tech) => (
                <button
                  key={tech}
                  onClick={() => handleTechStackAdd(tech)}
                  className="w-full text-left px-3 py-2 hover:bg-accent text-sm transition-colors"
                >
                  {tech}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* AI Experience */}
      <div>
        <Label className="text-base font-medium">Previous AI/Automation Experience</Label>
        <div className="mt-2 space-y-2">
          {aiExperienceOptions.map((option) => (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${
                formData.previousAIExperience === option.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleInputChange('previousAIExperience', option.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                    formData.previousAIExperience === option.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    <Check className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </div>
                  {formData.previousAIExperience === option.id && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}