import { Check } from 'lucide-react'

interface ContactFormProgressProps {
  currentStep: number
  totalSteps: number
  stepLabels: string[]
}

export function ContactFormProgress({ currentStep, totalSteps, stepLabels }: ContactFormProgressProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep
          const isUpcoming = stepNumber > currentStep

          return (
            <div key={label} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="relative flex items-center justify-center">
                <div
                  className={`
                    h-10 w-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-300
                    ${isCompleted 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : isActive 
                        ? 'bg-primary/10 border-primary text-primary' 
                        : 'bg-background border-border text-muted-foreground'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
              </div>

              {/* Step Label */}
              <div className="ml-3 flex-1">
                <div 
                  className={`
                    text-sm font-medium transition-colors duration-300
                    ${isActive 
                      ? 'text-primary' 
                      : isCompleted 
                        ? 'text-foreground' 
                        : 'text-muted-foreground'
                    }
                  `}
                >
                  {label}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Step {stepNumber} of {totalSteps}
                </div>
              </div>

              {/* Connection Line */}
              {index < stepLabels.length - 1 && (
                <div className="flex-1 mx-4">
                  <div 
                    className={`
                      h-0.5 transition-colors duration-300
                      ${isCompleted 
                        ? 'bg-primary' 
                        : 'bg-border'
                      }
                    `}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-6 w-full bg-border rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  )
}