import React from 'react';

interface TimelineAction {
  id: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  onClick: () => void;
}

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  completed?: boolean;
  actions?: TimelineAction[];
}

interface TimelineWithCTAProps {
  events: TimelineEvent[];
  className?: string;
}

export const TimelineWithCTA: React.FC<TimelineWithCTAProps> = ({
  events,
  className = '',
}) => {
  const getActionVariantClasses = (variant: string = 'primary') => {
    const variants = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
      secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
      success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
      warning: 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500',
      error: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    };
    return variants[variant as keyof typeof variants];
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300" />
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={event.id} className="relative flex items-start">
            <div
              className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                event.completed
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300 bg-white'
              }`}
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
            <div className="ml-4 flex-1">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                  {event.timestamp && (
                    <span className="text-sm text-gray-500">{event.timestamp}</span>
                  )}
                </div>
                {event.description && (
                  <p className="text-gray-600 mb-4">{event.description}</p>
                )}
                {event.actions && event.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {event.actions.map((action) => (
                      <button
                        key={action.id}
                        onClick={action.onClick}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${getActionVariantClasses(
                          action.variant
                        )}`}
                      >
                        {action.label}
                      </button>
                    ))}
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