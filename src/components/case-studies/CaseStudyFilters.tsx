'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Filter, X, Building, Cog, TrendingUp, Star } from 'lucide-react'
import { useState } from 'react'

interface CaseStudyFiltersProps {
  onFilterChange: (filters: {
    industry?: string
    serviceType?: string
    resultsRange?: string
    searchQuery?: string
    featuredOnly?: boolean
  }) => void
  totalCount: number
  filteredCount: number
}

const industries = [
  { value: 'all', label: 'All Industries' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'retail', label: 'Retail' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'financial', label: 'Financial Services' },
  { value: 'technology', label: 'Technology' },
  { value: 'logistics', label: 'Logistics' }
]

const serviceTypes = [
  { value: 'all', label: 'All Services' },
  { value: 'multi-agent', label: 'Multi-Agent Systems' },
  { value: 'operational', label: 'Operational Optimization' },
  { value: 'ai-transformation', label: 'AI Transformation' },
  { value: 'custom', label: 'Custom Solutions' },
  { value: 'predictive', label: 'Predictive Analytics' }
]

const resultsRanges = [
  { value: 'all', label: 'All Results' },
  { value: 'high', label: 'High Impact (50%+ improvement)' },
  { value: 'medium', label: 'Medium Impact (25-50% improvement)' },
  { value: 'roi', label: 'High ROI (200%+ return)' }
]

export function CaseStudyFilters({ onFilterChange, totalCount, filteredCount }: CaseStudyFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('all')
  const [selectedServiceType, setSelectedServiceType] = useState('all')
  const [selectedResultsRange, setSelectedResultsRange] = useState('all')
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleFilterChange = (updates: Partial<{
    industry: string
    serviceType: string
    resultsRange: string
    searchQuery: string
    featuredOnly: boolean
  }>) => {
    const newFilters = {
      industry: updates.industry ?? selectedIndustry,
      serviceType: updates.serviceType ?? selectedServiceType,
      resultsRange: updates.resultsRange ?? selectedResultsRange,
      searchQuery: updates.searchQuery ?? searchQuery,
      featuredOnly: updates.featuredOnly ?? featuredOnly
    }

    if (updates.industry !== undefined) setSelectedIndustry(updates.industry)
    if (updates.serviceType !== undefined) setSelectedServiceType(updates.serviceType)
    if (updates.resultsRange !== undefined) setSelectedResultsRange(updates.resultsRange)
    if (updates.searchQuery !== undefined) setSearchQuery(updates.searchQuery)
    if (updates.featuredOnly !== undefined) setFeaturedOnly(updates.featuredOnly)

    onFilterChange({
      ...(newFilters.industry !== 'all' && { industry: newFilters.industry }),
      ...(newFilters.serviceType !== 'all' && { serviceType: newFilters.serviceType }),
      ...(newFilters.resultsRange !== 'all' && { resultsRange: newFilters.resultsRange }),
      ...(newFilters.searchQuery && { searchQuery: newFilters.searchQuery }),
      ...(newFilters.featuredOnly && { featuredOnly: newFilters.featuredOnly })
    })
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedIndustry('all')
    setSelectedServiceType('all')
    setSelectedResultsRange('all')
    setFeaturedOnly(false)
    onFilterChange({})
  }

  const hasActiveFilters = selectedIndustry !== 'all' || 
                          selectedServiceType !== 'all' || 
                          selectedResultsRange !== 'all' || 
                          searchQuery.length > 0 || 
                          featuredOnly

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      {/* Header with Search and Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search case studies..."
              value={searchQuery}
              onChange={(e) => handleFilterChange({ searchQuery: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">
            {filteredCount} of {totalCount} case studies
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                {[selectedIndustry !== 'all', selectedServiceType !== 'all', selectedResultsRange !== 'all', featuredOnly].filter(Boolean).length}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Quick Filters - Always Visible */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={featuredOnly ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange({ featuredOnly: !featuredOnly })}
          className="flex items-center gap-2"
        >
          <Star className="h-3 w-3" />
          Featured
        </Button>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
            Clear All
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="pt-4 border-t space-y-6">
          {/* Industry Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Building className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium">Industry</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <Button
                  key={industry.value}
                  variant={selectedIndustry === industry.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange({ industry: industry.value })}
                  className="text-xs"
                >
                  {industry.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Service Type Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Cog className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium">Service Type</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {serviceTypes.map((serviceType) => (
                <Button
                  key={serviceType.value}
                  variant={selectedServiceType === serviceType.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange({ serviceType: serviceType.value })}
                  className="text-xs"
                >
                  {serviceType.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Range Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium">Results Impact</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {resultsRanges.map((resultsRange) => (
                <Button
                  key={resultsRange.value}
                  variant={selectedResultsRange === resultsRange.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange({ resultsRange: resultsRange.value })}
                  className="text-xs"
                >
                  {resultsRange.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}