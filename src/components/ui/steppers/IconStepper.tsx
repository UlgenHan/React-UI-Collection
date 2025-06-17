import React from 'react';

interface StepIcon {
  id: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
}

interface IconStepperProps {
  steps: StepIcon[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  allowClickThrough?: boolean;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const IconStepper: React.FC<IconStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  allowClickThrough = false,
  orientation = 'horizontal',
  className = ''
}) => {
  const handleStepClick = (index: number) => {
    if (allowClickThrough && onStepClick) {
      onStepClick(index);
    }
  };

  if (orientation === 'vertical') {
    return (
      <div className={`w-full ${className}`} role="progressbar" aria-valuenow={currentStep + 1} aria-valuemax={steps.length}>
        <div className="flex flex-col">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={step.id} className="flex">
                <div className="flex flex-col items-center mr-6">
                  <button
                    onClick={() => handleStepClick(index)}
                    disabled={!allowClickThrough}
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
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
                    <div className="w-6 h-6">
                      {step.icon}
                    </div>
                  </button>
                  
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
                
                <div className="flex-1 pb-8">
                  <div className="pt-3">
                    <h3 className={`text-lg font-semibold ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                      {step.label}
                    </h3>
                    {step.description && (
                      <p className="text-gray-600 mt-1">{step.description}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`} role="progressbar" aria-valuenow={currentStep + 1} aria-valuemax={steps.length}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center relative">
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={!allowClickThrough}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative
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
                  <div className="w-6 h-6">
                    {step.icon}
                  </div>
                  
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20"></div>
                  )}
                </button>
                
                <div className="mt-3 text-center max-w-20">
                  <div className={`text-sm font-medium ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                    {step.label}
                  </div>
                  {step.description && (
                    <div className="text-xs text-gray-400 mt-1">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
              
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
      
      <div className="mt-4 text-sm text-gray-600 text-center">
        {currentStep + 1} of {steps.length} steps completed
      </div>
    </div>
  );
}; 