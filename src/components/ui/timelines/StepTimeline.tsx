import React from 'react';

interface TimelineStep {
  id: string;
  title: string;
  description?: string;
  stepNumber?: number;
  icon?: React.ReactNode;
  status?: 'pending' | 'current' | 'completed';
}

interface StepTimelineProps {
  steps: TimelineStep[];
  className?: string;
  orientation?: 'vertical' | 'horizontal';
}

export const StepTimeline: React.FC<StepTimelineProps> = ({
  steps,
  className = '',
  orientation = 'vertical',
}) => {
  const getStatusClasses = (status: string = 'pending') => {
    const statusClasses = {
      pending: 'border-gray-300 bg-white text-gray-400',
      current: 'border-blue-500 bg-blue-500 text-white',
      completed: 'border-green-500 bg-green-500 text-white',
    };
    return statusClasses[status as keyof typeof statusClasses];
  };

  const getConnectorClasses = (status: string = 'pending') => {
    return status === 'completed' ? 'bg-green-500' : 'bg-gray-300';
  };

  if (orientation === 'horizontal') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold text-sm ${getStatusClasses(
                    step.status
                  )}`}
                >
                  {step.icon || step.stepNumber || index + 1}
                </div>
                <div className="mt-2 text-center max-w-xs">
                  <h3 className="text-sm font-medium text-gray-900">{step.title}</h3>
                  {step.description && (
                    <p className="mt-1 text-xs text-gray-600">{step.description}</p>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div
                    className={`h-0.5 transition-colors duration-300 ${getConnectorClasses(
                      step.status
                    )}`}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex items-start">
            {index < steps.length - 1 && (
              <div
                className={`absolute left-5 top-10 bottom-0 w-0.5 transition-colors duration-300 ${getConnectorClasses(
                  step.status
                )}`}
              />
            )}
            <div
              className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold text-sm ${getStatusClasses(
                step.status
              )}`}
            >
              {step.icon || step.stepNumber || index + 1}
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
              {step.description && (
                <p className="mt-1 text-gray-600">{step.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 