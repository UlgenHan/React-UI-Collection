import React from 'react';

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  author?: string;
  completed?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

interface CardTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export const CardTimeline: React.FC<CardTimelineProps> = ({
  events,
  className = '',
}) => {
  const getVariantClasses = (variant: string = 'default') => {
    const variants = {
      default: 'border-blue-200 bg-blue-50',
      success: 'border-green-200 bg-green-50',
      warning: 'border-yellow-200 bg-yellow-50',
      error: 'border-red-200 bg-red-50',
    };
    return variants[variant as keyof typeof variants];
  };

  const getDotClasses = (variant: string = 'default', completed: boolean = false) => {
    if (completed) {
      const completedVariants = {
        default: 'border-blue-500 bg-blue-500',
        success: 'border-green-500 bg-green-500',
        warning: 'border-yellow-500 bg-yellow-500',
        error: 'border-red-500 bg-red-500',
      };
      return completedVariants[variant as keyof typeof completedVariants];
    }
    return 'border-gray-300 bg-white';
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300" />
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={event.id} className="relative flex items-start">
            <div
              className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${getDotClasses(
                event.variant,
                event.completed
              )}`}
            >
              {event.completed ? (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <div className="w-2 h-2 bg-gray-400 rounded-full" />
              )}
            </div>
            <div className="ml-6 flex-1">
              <div
                className={`bg-white border rounded-lg p-4 shadow-sm ${getVariantClasses(
                  event.variant
                )}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                  {event.timestamp && (
                    <span className="text-sm text-gray-500">{event.timestamp}</span>
                  )}
                </div>
                {event.description && (
                  <p className="text-gray-700 mb-3">{event.description}</p>
                )}
                {event.author && (
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    {event.author}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 