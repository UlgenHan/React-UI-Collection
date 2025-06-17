import React from 'react';

interface Step {
  id: string;
  label: string;
}

interface MiniStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  allowClickThrough?: boolean;
  variant?: 'dots' | 'numbers' | 'lines';
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export const MiniStepper: React.FC<MiniStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  allowClickThrough = false,
  variant = 'dots',
  size = 'sm',
  className = ''
}) => {
  const handleStepClick = (index: number) => {
    if (allowClickThrough && onStepClick) {
      onStepClick(index);
    }
  };

  const sizeClasses = {
    xs: 'w-2 h-2',
    sm: 'w-3 h-3',
    md: 'w-4 h-4'
  };

  const numberSizeClasses = {
    xs: 'w-4 h-4 text-xs',
    sm: 'w-5 h-5 text-xs',
    md: 'w-6 h-6 text-sm'
  };

  const lineSizeClasses = {
    xs: 'h-0.5',
    sm: 'h-1',
    md: 'h-1.5'
  };

  if (variant === 'dots') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => handleStepClick(index)}
                disabled={!allowClickThrough}
                className={`
                  ${sizeClasses[size]} rounded-full transition-all duration-200
                  ${isCompleted 
                    ? 'bg-green-500' 
                    : isCurrent 
                      ? 'bg-blue-500' 
                      : 'bg-gray-300'
                  }
                  ${allowClickThrough ? 'cursor-pointer hover:scale-125' : 'cursor-default'}
                `}
                aria-label={`Step ${index + 1}: ${step.label}`}
                aria-current={isCurrent ? 'step' : undefined}
                title={step.label}
              />
              {index < steps.length - 1 && (
                <div className={`w-2 h-px bg-gray-300 mx-1`} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === 'numbers') {
    return (
      <div className={`flex items-center space-x-1 ${className}`}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => handleStepClick(index)}
                disabled={!allowClickThrough}
                className={`
                  ${numberSizeClasses[size]} rounded-full flex items-center justify-center font-medium transition-all duration-200
                  ${isCompleted 
                    ? 'bg-green-500 text-white' 
                    : isCurrent 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }
                  ${allowClickThrough ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
                `}
                aria-label={`Step ${index + 1}: ${step.label}`}
                aria-current={isCurrent ? 'step' : undefined}
                title={step.label}
              >
                {isCompleted ? (
                  <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </button>
              {index < steps.length - 1 && (
                <div className={`w-1 h-px bg-gray-300 mx-0.5`} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === 'lines') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(index)}
                disabled={!allowClickThrough}
                className={`
                  text-xs font-medium transition-colors duration-200
                  ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}
                  ${allowClickThrough ? 'cursor-pointer hover:text-blue-500' : 'cursor-default'}
                `}
                aria-label={`Step ${index + 1}: ${step.label}`}
                aria-current={isCurrent ? 'step' : undefined}
                title={step.label}
              >
                {step.label}
              </button>
            );
          })}
        </div>
        
        <div className={`w-full bg-gray-200 rounded-full ${lineSizeClasses[size]}`}>
          <div 
            className={`bg-gradient-to-r from-blue-500 to-green-500 ${lineSizeClasses[size]} rounded-full transition-all duration-500`}
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-500">
            {currentStep + 1}/{steps.length}
          </span>
          <span className="text-xs text-gray-500">
            {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </span>
        </div>
      </div>
    );
  }

  return null;
}; 