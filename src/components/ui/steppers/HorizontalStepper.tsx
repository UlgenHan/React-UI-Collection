import React from 'react';

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface HorizontalStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  allowClickThrough?: boolean;
  className?: string;
}

export const HorizontalStepper: React.FC<HorizontalStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  allowClickThrough = false,
  className = ''
}) => {
  const handleStepClick = (index: number) => {
    if (allowClickThrough && onStepClick) {
      onStepClick(index);
    }
  };

  return (
    <div className={`w-full ${className}`} role="progressbar" aria-valuenow={currentStep + 1} aria-valuemax={steps.length}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center relative">
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={!allowClickThrough}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isCompleted 
                      ? 'bg-green-600 border-green-600 text-white' 
                      : isCurrent 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-400'
                    }
                    ${allowClickThrough ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
                  `}
                  aria-label={`Step ${index + 1}: ${step.label}`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </button>
                
                {/* Step Label */}
                <div className="mt-2 text-center">
                  <div className={`text-sm font-medium ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                    {step.label}
                  </div>
                  {step.description && (
                    <div className="text-xs text-gray-400 mt-1 max-w-20">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className="h-0.5 bg-gray-200 relative">
                    <div 
                      className={`h-full bg-green-600 transition-all duration-500 ${
                        index < currentStep ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Progress Bar */}
      <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
      
      {/* Progress Text */}
      <div className="mt-2 text-sm text-gray-600 text-center">
        Step {currentStep + 1} of {steps.length}
      </div>
    </div>
  );
}; 