'use client'

import { useState, useMemo } from 'react'
import { CaseStudyCard } from './CaseStudyCard'
import { CaseStudyFilters } from './CaseStudyFilters'
import { getCaseStudyPreviews, filterCaseStudies, CaseStudy } from '@/lib/case-studies-data'

import { Button } from '@/components/ui/button'
import { ChevronDown, SortAsc, SortDesc } from 'lucide-react'

type SortOption = 'newest' | 'oldest' | 'industry' | 'impact'

// Partial CaseStudy type for filtering
type FilterableCaseStudy = Pick<CaseStudy, 'title' | 'tags' | 'featured'> & {
  client: Pick<CaseStudy['client'], 'industry'>
  solution: Pick<CaseStudy['solution'], 'servicesUsed' | 'overview'>
  challenge: Pick<CaseStudy['challenge'], 'overview'>
}

interface CaseStudiesGridProps {
  className?: string
}

export function CaseStudiesGrid({ className }: CaseStudiesGridProps) {
  const [filters, setFilters] = useState<{
    industry?: string
    serviceType?: string
    resultsRange?: string
    searchQuery?: string
    featuredOnly?: boolean
  }>({})
  
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  // Get all case study previews
  const allCaseStudies = useMemo(() => getCaseStudyPreviews(), [])

  // Apply filters
  const filteredCaseStudies = useMemo(() => {
    // Convert previews to case studies format for filtering (simplified)
    const caseStudiesForFiltering: FilterableCaseStudy[] = allCaseStudies.map(preview => ({
      client: { industry: preview.industry },
      solution: { 
        servicesUsed: [preview.industry], // Simplified for filtering
        overview: preview.solution 
      },
      title: preview.title,
      challenge: { overview: preview.challenge },
      tags: preview.tags,
      featured: preview.featured
    }))

    const filtered = filterCaseStudies(caseStudiesForFiltering as CaseStudy[], filters)
    
    // Convert back to previews
    return allCaseStudies.filter((caseStudy) => 
      filtered.some(f => f.title === caseStudy.title)
    )
  }, [allCaseStudies, filters])

  // Apply sorting
  const sortedCaseStudies = useMemo(() => {
    const sorted = [...filteredCaseStudies]
    
    switch (sortBy) {
      case 'newest':
        // Assuming newer case studies come first in the array
        return sortOrder === 'desc' ? sorted : sorted.reverse()
      
      case 'oldest':
        return sortOrder === 'desc' ? sorted.reverse() : sorted
      
      case 'industry':
        return sorted.sort((a, b) => {
          const comparison = a.industry.localeCompare(b.industry)
          return sortOrder === 'desc' ? -comparison : comparison
        })
      
      case 'impact':
        // Sort by ROI/impact (simplified metric)
        return sorted.sort((a, b) => {
          const aImpact = parseInt(a.results.primaryMetricValue) || 0
          const bImpact = parseInt(b.results.primaryMetricValue) || 0
          return sortOrder === 'desc' ? bImpact - aImpact : aImpact - bImpact
        })
      
      default:
        return sorted
    }
  }, [filteredCaseStudies, sortBy, sortOrder])

  // Apply featured filter
  const finalCaseStudies = useMemo(() => {
    if (filters.featuredOnly) {
      return sortedCaseStudies.filter(cs => cs.featured)
    }
    return sortedCaseStudies
  }, [sortedCaseStudies, filters.featuredOnly])

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'industry', label: 'Industry' },
    { value: 'impact', label: 'Impact Level' }
  ]

  const toggleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div data-testid="case-studies-grid" className={`space-y-8 ${className}`}>
      {/* Filters */}
      <CaseStudyFilters
        onFilterChange={setFilters}
        totalCount={allCaseStudies.length}
        filteredCount={finalCaseStudies.length}
      />

      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <div data-testid="results-count" className="text-sm text-muted-foreground">
          {finalCaseStudies.length === 0 ? (
            'No case studies found matching your criteria'
          ) : (
            <>
              Showing {finalCaseStudies.length} case stud{finalCaseStudies.length === 1 ? 'y' : 'ies'}
              {filters.featuredOnly && ' (featured only)'}
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2"
            >
              Sort by: {sortOptions.find(opt => opt.value === sortBy)?.label}
              <ChevronDown className="h-4 w-4" />
            </Button>
            
            {showSortDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-popover border border-border rounded-md shadow-lg z-10 min-w-[160px]">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value as SortOption)
                      setShowSortDropdown(false)
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-accent text-sm transition-colors ${
                      sortBy === option.value ? 'bg-accent' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleSort}
            className="flex items-center gap-2"
          >
            {sortOrder === 'desc' ? (
              <>
                <SortDesc className="h-4 w-4" />
                Desc
              </>
            ) : (
              <>
                <SortAsc className="h-4 w-4" />
                Asc
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Case Studies Grid */}
      {finalCaseStudies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {finalCaseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <svg
              className="mx-auto h-12 w-12 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-medium mb-2">No case studies found</h3>
            <p className="text-sm">
              Try adjusting your filters or search terms to find relevant case studies.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setFilters({})
              setSortBy('newest')
              setSortOrder('desc')
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}