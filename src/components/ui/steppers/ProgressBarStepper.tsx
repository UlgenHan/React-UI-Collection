import React from 'react';

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface ProgressBarStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  allowClickThrough?: boolean;
  showLabels?: boolean;
  className?: string;
}

export const ProgressBarStepper: React.FC<ProgressBarStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  allowClickThrough = false,
  showLabels = true,
  className = ''
}) => {
  const handleStepClick = (index: number) => {
    if (allowClickThrough && onStepClick) {
      onStepClick(index);
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className={`w-full ${className}`} role="progressbar" aria-valuenow={currentStep + 1} aria-valuemax={steps.length}>
      {/* Main Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
          <div 
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-3 rounded-full transition-all duration-700 ease-out relative"
            style={{ width: `${progressPercentage}%` }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Step Markers */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-1">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const position = (index / (steps.length - 1)) * 100;

            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(index)}
                disabled={!allowClickThrough}
                className={`
                  w-5 h-5 rounded-full border-2 transition-all duration-300 relative z-10
                  ${isCompleted 
                    ? 'bg-green-500 border-green-500 shadow-lg' 
                    : isCurrent 
                      ? 'bg-blue-500 border-blue-500 shadow-lg animate-pulse' 
                      : 'bg-white border-gray-300'
                  }
                  ${allowClickThrough ? 'cursor-pointer hover:scale-125' : 'cursor-default'}
                `}
                style={{ position: 'absolute', left: `${position}%`, transform: 'translateX(-50%)' }}
                aria-label={`Step ${index + 1}: ${step.label}`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isCompleted && (
                  <svg className="w-3 h-3 text-white absolute inset-0 m-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Labels */}
      {showLabels && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:flex md:justify-between gap-4">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div 
                key={step.id}
                className={`text-center transition-all duration-300 ${
                  isCurrent ? 'transform scale-105' : ''
                }`}
              >
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
                <div className="mt-2">
                  {isCompleted && (
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                  )}
                  {isCurrent && (
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  )}
                  {!isCompleted && !isCurrent && (
                    <span className="inline-block w-2 h-2 bg-gray-300 rounded-full"></span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Progress Info */}
      <div className="mt-4 flex justify-between items-center text-sm">
        <span className="text-gray-600">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="font-semibold text-blue-600">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>

      {/* Current Step Details */}
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800">
          Current: {steps[currentStep]?.label}
        </h3>
        {steps[currentStep]?.description && (
          <p className="text-blue-600 text-sm mt-1">
            {steps[currentStep].description}
          </p>
        )}
      </div>
    </div>
  );
}; 