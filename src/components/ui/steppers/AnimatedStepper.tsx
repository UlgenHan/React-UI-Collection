import React, { useEffect, useState } from 'react';

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface AnimatedStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  allowClickThrough?: boolean;
  animationDelay?: number;
  className?: string;
}

export const AnimatedStepper: React.FC<AnimatedStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  allowClickThrough = false,
  animationDelay = 300,
  className = ''
}) => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [animatingStep, setAnimatingStep] = useState<number | null>(null);

  useEffect(() => {
    // Animate steps as they become visible
    const newVisibleSteps: number[] = [];
    for (let i = 0; i <= currentStep; i++) {
      newVisibleSteps.push(i);
    }

    // Animate each step with a delay
    newVisibleSteps.forEach((stepIndex, index) => {
      setTimeout(() => {
        setVisibleSteps(prev => {
          if (!prev.includes(stepIndex)) {
            setAnimatingStep(stepIndex);
            setTimeout(() => setAnimatingStep(null), 500);
            return [...prev, stepIndex];
          }
          return prev;
        });
      }, index * animationDelay);
    });
  }, [currentStep, animationDelay]);

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
          const isVisible = visibleSteps.includes(index);
          const isAnimating = animatingStep === index;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center relative">
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={!allowClickThrough}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 relative
                    ${!isVisible ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
                    ${isAnimating ? 'animate-bounce' : ''}
                    ${isCompleted 
                      ? 'bg-green-600 border-green-600 text-white shadow-lg' 
                      : isCurrent 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
                        : 'bg-white border-gray-300 text-gray-400'
                    }
                    ${allowClickThrough ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
                  `}
                  style={{
                    transform: `scale(${isVisible ? (isAnimating ? 1.2 : 1) : 0})`,
                    transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                  }}
                  aria-label={`Step ${index + 1}: ${step.label}`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-lg font-bold">{index + 1}</span>
                  )}
                  
                  {/* Ripple effect for current step */}
                  {isCurrent && isVisible && (
                    <>
                      <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20"></div>
                      <div className="absolute inset-0 rounded-full bg-blue-600 animate-pulse opacity-30"></div>
                    </>
                  )}
                  
                  {/* Completion sparkle effect */}
                  {isCompleted && isAnimating && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping absolute -top-1 -right-1"></div>
                      <div className="w-1 h-1 bg-yellow-400 rounded-full animate-ping absolute -bottom-1 -left-1 delay-150"></div>
                    </div>
                  )}
                </button>
                
                {/* Animated Label */}
                <div 
                  className={`mt-3 text-center transition-all duration-500 delay-150 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
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
                    <div className="text-xs text-gray-400 mt-1 max-w-20">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Animated Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className="h-1 bg-gray-200 rounded-full relative overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-700 ease-out ${
                        index < currentStep ? 'w-full' : 'w-0'
                      }`}
                      style={{
                        background: isVisible && index < currentStep 
                          ? 'linear-gradient(90deg, #10b981, #3b82f6)' 
                          : 'transparent'
                      }}
                    />
                    
                    {/* Animated flowing dots */}
                    {index < currentStep && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1 h-1 bg-white rounded-full animate-ping delay-0"></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-ping delay-300 ml-4"></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-ping delay-700 ml-4"></div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Animated progress info */}
      <div className={`mt-6 text-center transition-all duration-500 ${
        visibleSteps.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="text-lg font-semibold text-gray-700">
          Step {currentStep + 1} of {steps.length}
        </div>
        <div className="w-32 h-1 bg-gray-200 rounded-full mx-auto mt-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}; 