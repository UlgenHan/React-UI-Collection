import React, { useState } from 'react';

export interface StepProps {
  id: string;
  title: string;
  content: React.ReactNode;
  isValid?: boolean;
  canSkip?: boolean;
}

export interface MultiStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: StepProps[];
  onComplete: (stepData: Record<string, any>) => void;
  initialStep?: number;
  showProgress?: boolean;
  allowSkipSteps?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const MultiStepModal: React.FC<MultiStepModalProps> = ({
  isOpen,
  onClose,
  steps,
  onComplete,
  initialStep = 0,
  showProgress = true,
  allowSkipSteps = false,
  size = 'lg',
  className = ''
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [stepData, setStepData] = useState<Record<string, any>>({});
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  if (!isOpen) return null;

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const currentStepData = steps[currentStep];
  const canProceed = currentStepData?.isValid !== false;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (allowSkipSteps || completedSteps.has(stepIndex) || stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const handleComplete = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    onComplete(stepData);
  };

  const handleSkip = () => {
    if (currentStepData?.canSkip) {
      handleNext();
    }
  };

  const updateStepData = (stepId: string, data: any) => {
    setStepData(prev => ({ ...prev, [stepId]: data }));
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getStepStatus = (stepIndex: number) => {
    if (completedSteps.has(stepIndex)) return 'completed';
    if (stepIndex === currentStep) return 'current';
    if (stepIndex < currentStep) return 'completed';
    return 'upcoming';
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden ${className}`}>
        {/* Header with Progress */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {currentStepData?.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Indicator */}
          {showProgress && (
            <div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>

              {/* Step Indicators */}
              <div className="flex justify-between">
                {steps.map((step, index) => {
                  const status = getStepStatus(index);
                  return (
                    <button
                      key={step.id}
                      onClick={() => handleStepClick(index)}
                      disabled={!allowSkipSteps && status === 'upcoming' && index > currentStep}
                      className={`
                        flex flex-col items-center text-xs font-medium transition-colors
                        ${allowSkipSteps || completedSteps.has(index) || index <= currentStep
                          ? 'cursor-pointer hover:text-blue-600'
                          : 'cursor-not-allowed'
                        }
                      `}
                    >
                      <div
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-colors
                          ${status === 'completed'
                            ? 'bg-green-600 text-white'
                            : status === 'current'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                          }
                        `}
                      >
                        {status === 'completed' ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span
                        className={`
                          text-center max-w-20 truncate
                          ${status === 'current' ? 'text-blue-600' : 'text-gray-500'}
                        `}
                      >
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {React.cloneElement(currentStepData?.content as React.ReactElement, {
            stepData,
            updateStepData: (data: any) => updateStepData(currentStepData.id, data),
            currentStepId: currentStepData.id
          })}
        </div>

        {/* Footer with Navigation */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center rounded-b-lg">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>

          <div className="flex space-x-3">
            {/* Skip Button */}
            {currentStepData?.canSkip && (
              <button
                onClick={handleSkip}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Skip
              </button>
            )}

            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              disabled={isFirstStep}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {/* Next/Complete Button */}
            {isLastStep ? (
              <button
                onClick={handleComplete}
                disabled={!canProceed}
                className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!canProceed}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepModal; 