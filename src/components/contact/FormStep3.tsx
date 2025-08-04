'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ContactFormData } from '@/types/sanity'
import { 
  Target, 
  DollarSign, 
  Calendar,
  Users,
  Plus,
  X,
  Check,
  Clock,
  TrendingUp,
  BarChart,
  Shield
} from 'lucide-react'

interface FormStep3Props {
  formData: Partial<ContactFormData>
  onUpdate: (data: Partial<ContactFormData>) => void
  errors: Record<string, string>
}

const budgetRanges = [
  { id: 'under-50k', label: 'Under $50,000', description: 'Small-scale automation projects' },
  { id: '50k-100k', label: '$50,000 - $100,000', description: 'Medium complexity implementations' },
  { id: '100k-250k', label: '$100,000 - $250,000', description: 'Comprehensive AI solutions' },
  { id: '250k-500k', label: '$250,000 - $500,000', description: 'Enterprise-scale transformations' },
  { id: 'over-500k', label: 'Over $500,000', description: 'Large-scale digital transformation' },
  { id: 'discuss', label: 'Prefer to discuss', description: 'Budget depends on scope and ROI' }
]

const timelineOptions = [
  { id: 'asap', label: 'ASAP (1-2 months)', description: 'Urgent implementation needed', icon: Clock },
  { id: 'quarter', label: 'This quarter (2-3 months)', description: 'Planned for current quarter', icon: Calendar },
  { id: 'next-quarter', label: 'Next quarter (3-6 months)', description: 'Strategic implementation', icon: TrendingUp },
  { id: 'flexible', label: 'Flexible timeline', description: 'Timeline depends on planning', icon: BarChart }
]

const commonOutcomes = [
  'Reduce operational costs', 'Increase revenue', 'Improve efficiency', 
  'Enhance customer experience', 'Automate manual processes', 'Better decision making',
  'Improve accuracy', 'Scale operations', 'Competitive advantage', 'Risk reduction',
  'Compliance automation', 'Data insights'
]

const stakeholderRoles = [
  'CEO/Founder', 'CTO/VP Engineering', 'COO/VP Operations', 'CFO/Finance',
  'IT Director', 'Data/Analytics Team', 'Department Heads', 'Board Members',
  'External Consultants', 'End Users'
]

export function FormStep3({ formData, onUpdate, errors }: FormStep3Props) {
  const [newOutcome, setNewOutcome] = useState('')
  const [showOutcomeSuggestions, setShowOutcomeSuggestions] = useState(false)
  const [newStakeholder, setNewStakeholder] = useState('')
  const [showStakeholderSuggestions, setShowStakeholderSuggestions] = useState(false)

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    onUpdate({ [field]: value })
  }

  const handleArrayAdd = (field: 'expectedOutcomes' | 'stakeholders', item: string) => {
    const currentArray = formData[field] || []
    if (!currentArray.includes(item)) {
      onUpdate({ [field]: [...currentArray, item] })
    }
  }

  const handleArrayRemove = (field: 'expectedOutcomes' | 'stakeholders', item: string) => {
    const currentArray = formData[field] || []
    onUpdate({ [field]: currentArray.filter(i => i !== item) })
  }

  const handleOutcomeAdd = (outcome: string) => {
    handleArrayAdd('expectedOutcomes', outcome)
    setNewOutcome('')
    setShowOutcomeSuggestions(false)
  }

  const handleStakeholderAdd = (stakeholder: string) => {
    handleArrayAdd('stakeholders', stakeholder)
    setNewStakeholder('')
    setShowStakeholderSuggestions(false)
  }

  const filteredOutcomeSuggestions = commonOutcomes.filter(outcome => 
    outcome.toLowerCase().includes(newOutcome.toLowerCase()) &&
    !(formData.expectedOutcomes || []).includes(outcome)
  )

  const filteredStakeholderSuggestions = stakeholderRoles.filter(role => 
    role.toLowerCase().includes(newStakeholder.toLowerCase()) &&
    !(formData.stakeholders || []).includes(role)
  )

  return (
    <div className="space-y-6">
      {/* Project Scope */}
      <div>
        <Label htmlFor="projectScope" className="text-base font-medium">
          Project Scope & Challenge Description *
        </Label>
        <p className="text-sm text-muted-foreground mt-1 mb-3">
          Describe your specific challenge, current processes, and what you&apos;d like to achieve
        </p>
        <div className="relative">
          <Textarea
            id="projectScope"
            placeholder="Example: We need to automate our invoice processing system. Currently, our team manually processes 500+ invoices monthly, taking 2-3 hours per day. We want to reduce processing time by 80% and improve accuracy..."
            value={formData.projectScope || ''}
            onChange={(e) => handleInputChange('projectScope', e.target.value)}
            className={`min-h-32 ${errors.projectScope ? 'border-red-500' : ''}`}
          />
          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
            {(formData.projectScope || '').length}/1000
          </div>
        </div>
        {errors.projectScope && (
          <p className="text-red-600 text-sm mt-1">{errors.projectScope}</p>
        )}
      </div>

      {/* Expected Outcomes */}
      <div>
        <Label className="text-base font-medium">Expected Outcomes & Success Metrics</Label>
        <p className="text-sm text-muted-foreground mt-1 mb-3">
          What specific results are you hoping to achieve?
        </p>
        
        {/* Selected Outcomes */}
        {formData.expectedOutcomes && formData.expectedOutcomes.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.expectedOutcomes.map((outcome) => (
              <Badge key={outcome} variant="secondary" className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                {outcome}
                <button
                  onClick={() => handleArrayRemove('expectedOutcomes', outcome)}
                  className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Add Outcome Input */}
        <div className="relative">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Add expected outcome..."
                value={newOutcome}
                onChange={(e) => {
                  setNewOutcome(e.target.value)
                  setShowOutcomeSuggestions(e.target.value.length > 0)
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    if (newOutcome.trim()) handleOutcomeAdd(newOutcome.trim())
                  }
                }}
                className="pl-10"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => newOutcome.trim() && handleOutcomeAdd(newOutcome.trim())}
              disabled={!newOutcome.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Outcome Suggestions */}
          {showOutcomeSuggestions && filteredOutcomeSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-40 overflow-y-auto">
              {filteredOutcomeSuggestions.slice(0, 6).map((outcome) => (
                <button
                  key={outcome}
                  onClick={() => handleOutcomeAdd(outcome)}
                  className="w-full text-left px-3 py-2 hover:bg-accent text-sm transition-colors"
                >
                  {outcome}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Budget Range */}
      <div>
        <Label className="text-base font-medium">Budget Range *</Label>
        <p className="text-sm text-muted-foreground mt-1 mb-3">
          Understanding your budget helps us recommend the most appropriate solution
        </p>
        
        <div className="space-y-2">
          {budgetRanges.map((budget) => (
            <Card
              key={budget.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${
                formData.budgetRange === budget.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleInputChange('budgetRange', budget.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                    formData.budgetRange === budget.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    <DollarSign className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{budget.label}</div>
                    <div className="text-xs text-muted-foreground">{budget.description}</div>
                  </div>
                  {formData.budgetRange === budget.id && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {errors.budgetRange && (
          <p className="text-red-600 text-sm mt-1">{errors.budgetRange}</p>
        )}
      </div>

      {/* Timeline */}
      <div>
        <Label className="text-base font-medium">Preferred Timeline</Label>
        <div className="mt-2 space-y-2">
          {timelineOptions.map((option) => (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${
                formData.timeline === option.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleInputChange('timeline', option.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                    formData.timeline === option.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    <option.icon className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </div>
                  {formData.timeline === option.id && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Decision Makers */}
      <div>
        <Label htmlFor="decisionMakers" className="text-base font-medium">
          Decision Making Process
        </Label>
        <p className="text-sm text-muted-foreground mt-1 mb-3">
          Who will be involved in the decision-making process?
        </p>
        <Textarea
          id="decisionMakers"
          placeholder="Example: Final decision will be made by CEO and CTO, with input from the operations team. We typically evaluate 2-3 vendors before making a decision..."
          value={formData.decisionMakers || ''}
          onChange={(e) => handleInputChange('decisionMakers', e.target.value)}
          className="min-h-24"
        />
      </div>

      {/* Other Stakeholders */}
      <div>
        <Label className="text-base font-medium">Other Stakeholders Involved</Label>
        <p className="text-sm text-muted-foreground mt-1 mb-3">
          Who else will be impacted by or involved in this project?
        </p>
        
        {/* Selected Stakeholders */}
        {formData.stakeholders && formData.stakeholders.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.stakeholders.map((stakeholder) => (
              <Badge key={stakeholder} variant="secondary" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {stakeholder}
                <button
                  onClick={() => handleArrayRemove('stakeholders', stakeholder)}
                  className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Add Stakeholder Input */}
        <div className="relative">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Add stakeholder role..."
                value={newStakeholder}
                onChange={(e) => {
                  setNewStakeholder(e.target.value)
                  setShowStakeholderSuggestions(e.target.value.length > 0)
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    if (newStakeholder.trim()) handleStakeholderAdd(newStakeholder.trim())
                  }
                }}
                className="pl-10"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => newStakeholder.trim() && handleStakeholderAdd(newStakeholder.trim())}
              disabled={!newStakeholder.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Stakeholder Suggestions */}
          {showStakeholderSuggestions && filteredStakeholderSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-40 overflow-y-auto">
              {filteredStakeholderSuggestions.slice(0, 6).map((stakeholder) => (
                <button
                  key={stakeholder}
                  onClick={() => handleStakeholderAdd(stakeholder)}
                  className="w-full text-left px-3 py-2 hover:bg-accent text-sm transition-colors"
                >
                  {stakeholder}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Security & Compliance Note */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h4 className="font-medium mb-1">Security & Compliance</h4>
            <p className="text-sm text-muted-foreground">
              All project information is treated with strict confidentiality. We can sign NDAs before 
              detailed discussions and follow enterprise-grade security practices throughout the engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}