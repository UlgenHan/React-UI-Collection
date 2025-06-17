import React from 'react';

interface Step {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface ClickableStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
  completedSteps?: number[];
  className?: string;
}

export const ClickableStepper: React.FC<ClickableStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  completedSteps = [],
  className = ''
}) => {
  const handleStepClick = (index: number) => {
    if (!steps[index].disabled) {
      onStepClick(index);
    }
  };

  return (
    <div className={`w-full ${className}`} role="progressbar" aria-valuenow={currentStep + 1} aria-valuemax={steps.length}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isCurrent = index === currentStep;
          const isClickable = !step.disabled;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center relative">
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={step.disabled}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative group
                    ${isCompleted 
                      ? 'bg-green-600 border-green-600 text-white shadow-lg' 
                      : isCurrent 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
                        : step.disabled
                          ? 'bg-gray-100 border-gray-300 text-gray-300 cursor-not-allowed'
                          : 'bg-white border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-600'
                    }
                    ${isClickable ? 'cursor-pointer hover:scale-110 active:scale-95' : ''}
                    ${!step.disabled ? 'hover:shadow-lg' : ''}
                  `}
                  aria-label={`${step.disabled ? 'Disabled step' : 'Navigate to step'} ${index + 1}: ${step.label}`}
                  aria-current={isCurrent ? 'step' : undefined}
                  aria-disabled={step.disabled}
                >
                  {isCompleted ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-lg font-bold">{index + 1}</span>
                  )}
                  
                  {/* Hover tooltip */}
                  {isClickable && (
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                      Click to navigate
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                    </div>
                  )}
                  
                  {/* Click ripple effect */}
                  {isClickable && (
                    <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-active:opacity-30 group-active:animate-ping"></div>
                  )}
                </button>
                
                {/* Step Label */}
                <div className="mt-3 text-center">
                  <div className={`text-sm font-medium transition-colors duration-200 ${
                    isCurrent ? 'text-blue-600' : 
                    isCompleted ? 'text-green-600' : 
                    step.disabled ? 'text-gray-300' :
                    'text-gray-500 hover:text-blue-600'
                  }`}>
                    {step.label}
                  </div>
                  {step.description && (
                    <div className={`text-xs mt-1 max-w-20 ${
                      step.disabled ? 'text-gray-300' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </div>
                  )}
                </div>
                
                {/* Step Status Indicators */}
                <div className="mt-2 flex space-x-1">
                  {isCompleted && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✓ Done
                    </span>
                  )}
                  {isCurrent && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      → Active
                    </span>
                  )}
                  {step.disabled && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                      🔒 Locked
                    </span>
                  )}
                  {!isCompleted && !isCurrent && !step.disabled && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 cursor-pointer hover:bg-blue-100 hover:text-blue-600">
                      ↗ Jump
                    </span>
                  )}
                </div>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className="h-0.5 bg-gray-200 relative">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        isCompleted ? 'w-full bg-green-600' : 'w-0'
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Navigation Controls */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() => handleStepClick(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>
        <button
          onClick={() => handleStepClick(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
      
      {/* Progress Summary */}
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-600">
          Step {currentStep + 1} of {steps.length} • {completedSteps.length} completed
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}; 