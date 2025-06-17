import React from 'react';

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface DotStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  allowClickThrough?: boolean;
  orientation?: 'horizontal' | 'vertical';
  dotSize?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
}

export const DotStepper: React.FC<DotStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  allowClickThrough = false,
  orientation = 'horizontal',
  dotSize = 'md',
  showLabels = true,
  className = ''
}) => {
  const handleStepClick = (index: number) => {
    if (allowClickThrough && onStepClick) {
      onStepClick(index);
    }
  };

  const dotSizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  const activeDotSizeClasses = {
    sm: 'w-4 h-2',
    md: 'w-6 h-3',
    lg: 'w-8 h-4'
  };

  const connectorClasses = {
    sm: orientation === 'horizontal' ? 'w-3 h-0.5' : 'h-3 w-0.5',
    md: orientation === 'horizontal' ? 'w-4 h-0.5' : 'h-4 w-0.5',
    lg: orientation === 'horizontal' ? 'w-6 h-1' : 'h-6 w-1'
  };

  if (orientation === 'vertical') {
    return (
      <div className={`flex flex-col ${className}`}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center mr-4">
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={!allowClickThrough}
                  className={`
                    ${isCurrent ? activeDotSizeClasses[dotSize] : dotSizeClasses[dotSize]} 
                    rounded-full transition-all duration-300 relative
                    ${isCompleted 
                      ? 'bg-green-500 shadow-lg' 
                      : isCurrent 
                        ? 'bg-blue-500 shadow-lg' 
                        : 'bg-gray-300'
                    }
                    ${allowClickThrough ? 'cursor-pointer hover:scale-125' : 'cursor-default'}
                  `}
                  aria-label={`Step ${index + 1}: ${step.label}`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-30"></div>
                  )}
                  {isCompleted && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
                
                {index < steps.length - 1 && (
                  <div className={`${connectorClasses[dotSize]} bg-gray-300 mt-2 mb-2`}>
                    {isCompleted && (
                      <div className={`${connectorClasses[dotSize]} bg-green-500 transition-all duration-300`} />
                    )}
                  </div>
                )}
              </div>
              
              {showLabels && (
                <div className="flex-1 py-2">
                  <div className={`text-sm font-medium ${
                    isCurrent ? 'text-blue-600' : 
                    isCompleted ? 'text-green-600' : 
                    'text-gray-500'
                  }`}>
                    {step.label}
                  </div>
                  {step.description && (
                    <div className="text-xs text-gray-400 mt-1">
                      {step.description}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Horizontal Dots */}
      <div className="flex items-center justify-center space-x-2">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => handleStepClick(index)}
                disabled={!allowClickThrough}
                className={`
                  ${isCurrent ? activeDotSizeClasses[dotSize] : dotSizeClasses[dotSize]} 
                  rounded-full transition-all duration-300 relative
                  ${isCompleted 
                    ? 'bg-green-500 shadow-lg' 
                    : isCurrent 
                      ? 'bg-blue-500 shadow-lg' 
                      : 'bg-gray-300'
                  }
                  ${allowClickThrough ? 'cursor-pointer hover:scale-125' : 'cursor-default'}
                `}
                aria-label={`Step ${index + 1}: ${step.label}`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {/* Pulse animation for current step */}
                {isCurrent && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-30"></div>
                    <div className="absolute inset-0 rounded-full bg-blue-500 animate-pulse opacity-20"></div>
                  </>
                )}
                
                {/* Completion indicator */}
                {isCompleted && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
                
                {/* Loading dots for current step */}
                {isCurrent && dotSize === 'lg' && (
                  <div className="absolute inset-0 flex items-center justify-center space-x-px">
                    <div className="w-0.5 h-0.5 bg-white rounded-full animate-bounce"></div>
                    <div className="w-0.5 h-0.5 bg-white rounded-full animate-bounce delay-100"></div>
                    <div className="w-0.5 h-0.5 bg-white rounded-full animate-bounce delay-200"></div>
                  </div>
                )}
              </button>
              
              {/* Connector */}
              {index < steps.length - 1 && (
                <div className={`${connectorClasses[dotSize]} bg-gray-300 mx-1 relative overflow-hidden rounded-full`}>
                  <div 
                    className={`h-full bg-green-500 transition-all duration-500 rounded-full ${
                      isCompleted ? 'w-full' : 'w-0'
                    }`}
                  />
                  
                  {/* Animated dots flowing through connector */}
                  {isCompleted && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-px h-px bg-white rounded-full animate-ping delay-0"></div>
                      <div className="w-px h-px bg-white rounded-full animate-ping delay-300 ml-1"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Labels */}
      {showLabels && (
        <div className="mt-4 flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={step.id} className="text-center flex-1 px-2">
                <div className={`text-xs font-medium ${
                  isCurrent ? 'text-blue-600' : 
                  isCompleted ? 'text-green-600' : 
                  'text-gray-500'
                }`}>
                  {step.label}
                </div>
                {step.description && (
                  <div className="text-xs text-gray-400 mt-1">
                    {step.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      {/* Progress Info */}
      <div className="mt-3 text-center">
        <div className="text-xs text-gray-600">
          {currentStep + 1} of {steps.length}
        </div>
        <div className="flex justify-center space-x-1 mt-1">
          {Array.from({ length: steps.length }, (_, i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full transition-colors duration-200 ${
                i <= currentStep ? 'bg-blue-400' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 