import React from 'react';

interface Step {
  id: string;
  label: string;
  description?: string;
  content?: React.ReactNode;
}

interface VerticalStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  allowClickThrough?: boolean;
  showContent?: boolean;
  className?: string;
}

export const VerticalStepper: React.FC<VerticalStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  allowClickThrough = false,
  showContent = true,
  className = ''
}) => {
  const handleStepClick = (index: number) => {
    if (allowClickThrough && onStepClick) {
      onStepClick(index);
    }
  };

  return (
    <div className={`w-full ${className}`} role="progressbar" aria-valuenow={currentStep + 1} aria-valuemax={steps.length}>
      <div className="flex flex-col">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <div key={step.id} className="flex">
              {/* Step Indicator Column */}
              <div className="flex flex-col items-center mr-6">
                {/* Step Circle */}
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={!allowClickThrough}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative z-10
                    ${isCompleted 
                      ? 'bg-green-600 border-green-600 text-white shadow-lg' 
                      : isCurrent 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
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
                  
                  {/* Pulse effect for current step */}
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20"></div>
                  )}
                </button>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-16 bg-gray-200 relative mt-2">
                    <div 
                      className={`w-full bg-green-600 transition-all duration-500 ${
                        index < currentStep ? 'h-full' : 'h-0'
                      }`}
                    />
                  </div>
                )}
              </div>
              
              {/* Step Content Column */}
              <div className="flex-1 pb-8">
                <div className="pt-2">
                  <h3 className={`text-lg font-semibold ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                    {step.label}
                  </h3>
                  {step.description && (
                    <p className="text-gray-600 mt-1">{step.description}</p>
                  )}
                  
                  {/* Step Content */}
                  {showContent && (isCurrent || isCompleted) && step.content && (
                    <div className={`mt-4 p-4 rounded-lg border transition-all duration-300 ${
                      isCurrent 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-green-50 border-green-200'
                    }`}>
                      {step.content}
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="mt-2">
                    {isCompleted && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Completed
                      </span>
                    )}
                    {isCurrent && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-1 animate-pulse"></div>
                        In Progress
                      </span>
                    )}
                    {isUpcoming && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 