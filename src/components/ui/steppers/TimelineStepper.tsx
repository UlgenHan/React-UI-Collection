import React from 'react';

interface TimelineStep {
  id: string;
  label: string;
  description?: string;
  timestamp?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

interface TimelineStepperProps {
  steps: TimelineStep[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  allowClickThrough?: boolean;
  showTimestamps?: boolean;
  showContent?: boolean;
  className?: string;
}

export const TimelineStepper: React.FC<TimelineStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  allowClickThrough = false,
  showTimestamps = true,
  showContent = true,
  className = ''
}) => {
  const handleStepClick = (index: number) => {
    if (allowClickThrough && onStepClick) {
      onStepClick(index);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isUpcoming = index > currentStep;

            return (
              <li key={step.id}>
                <div className="relative pb-8">
                  {/* Connector Line */}
                  {index !== steps.length - 1 && (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    >
                      {/* Animated progress line */}
                      <div 
                        className={`w-full bg-gradient-to-b from-green-500 to-blue-500 transition-all duration-700 ${
                          isCompleted ? 'h-full' : 'h-0'
                        }`}
                      />
                      
                      {/* Animated dots flowing down */}
                      {isCompleted && (
                        <div className="absolute inset-0 flex flex-col justify-center items-center space-y-4">
                          <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
                          <div className="w-0.5 h-0.5 bg-white rounded-full animate-ping delay-300"></div>
                          <div className="w-1 h-1 bg-white rounded-full animate-ping delay-700"></div>
                        </div>
                      )}
                    </span>
                  )}
                  
                  <div className="relative flex space-x-3">
                    {/* Step Icon/Indicator */}
                    <div>
                      <button
                        onClick={() => handleStepClick(index)}
                        disabled={!allowClickThrough}
                        className={`
                          relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300
                          ${isCompleted 
                            ? 'bg-green-500 border-green-500 text-white shadow-lg' 
                            : isCurrent 
                              ? 'bg-blue-500 border-blue-500 text-white shadow-lg' 
                              : 'bg-white border-gray-300 text-gray-400'
                          }
                          ${allowClickThrough ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
                        `}
                        aria-label={`Step ${index + 1}: ${step.label}`}
                        aria-current={isCurrent ? 'step' : undefined}
                      >
                        {step.icon ? (
                          <div className="w-4 h-4">{step.icon}</div>
                        ) : isCompleted ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span className="text-sm font-semibold">{index + 1}</span>
                        )}
                        
                        {/* Pulse animation for current step */}
                        {isCurrent && (
                          <>
                            <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-30"></div>
                            <div className="absolute inset-0 rounded-full bg-blue-500 animate-pulse opacity-20"></div>
                          </>
                        )}
                        
                        {/* Completion glow */}
                        {isCompleted && (
                          <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-pulse"></div>
                        )}
                      </button>
                    </div>
                    
                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className={`text-lg font-semibold ${
                            isCurrent ? 'text-blue-600' : 
                            isCompleted ? 'text-green-600' : 
                            'text-gray-500'
                          }`}>
                            {step.label}
                          </h3>
                          {step.description && (
                            <p className={`mt-1 text-sm ${
                              isUpcoming ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {step.description}
                            </p>
                          )}
                        </div>
                        
                        {/* Timestamp */}
                        {showTimestamps && step.timestamp && (
                          <div className="flex-shrink-0">
                            <time className={`text-sm ${
                              isUpcoming ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {step.timestamp}
                            </time>
                          </div>
                        )}
                      </div>
                      
                      {/* Step Status Badge */}
                      <div className="mt-2">
                        {isCompleted && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Completed
                          </span>
                        )}
                        {isCurrent && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-1 animate-pulse"></div>
                            In Progress
                          </span>
                        )}
                        {isUpcoming && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            Pending
                          </span>
                        )}
                      </div>
                      
                      {/* Step Content */}
                      {showContent && step.content && (isCurrent || isCompleted) && (
                        <div className={`mt-4 p-4 rounded-lg border transition-all duration-300 ${
                          isCurrent 
                            ? 'bg-blue-50 border-blue-200' 
                            : 'bg-green-50 border-green-200'
                        }`}>
                          {step.content}
                        </div>
                      )}
                      
                      {/* Preview for upcoming steps */}
                      {isUpcoming && step.content && (
                        <div className="mt-4 p-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 opacity-50">
                          <div className="text-xs text-gray-500 mb-2">Preview:</div>
                          {step.content}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      
      {/* Timeline Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-700">
            Timeline Progress
          </div>
          <div className="text-sm text-gray-600">
            {currentStep + 1} of {steps.length} steps
          </div>
        </div>
        
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>Started</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
          <span>Finished</span>
        </div>
      </div>
    </div>
  );
}; 