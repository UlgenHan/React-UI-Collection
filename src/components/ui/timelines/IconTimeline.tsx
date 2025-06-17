import React from 'react';

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  icon?: React.ReactNode;
  completed?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

interface IconTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export const IconTimeline: React.FC<IconTimelineProps> = ({
  events,
  className = '',
}) => {
  const getVariantClasses = (variant: string = 'default', completed: boolean = false) => {
    if (completed) {
      const completedVariants = {
        default: 'border-blue-500 bg-blue-500 text-white',
        success: 'border-green-500 bg-green-500 text-white',
        warning: 'border-yellow-500 bg-yellow-500 text-white',
        error: 'border-red-500 bg-red-500 text-white',
      };
      return completedVariants[variant as keyof typeof completedVariants];
    }
    
    const variants = {
      default: 'border-gray-300 bg-white text-gray-400',
      success: 'border-green-300 bg-green-50 text-green-400',
      warning: 'border-yellow-300 bg-yellow-50 text-yellow-400',
      error: 'border-red-300 bg-red-50 text-red-400',
    };
    return variants[variant as keyof typeof variants];
  };

  const defaultIcon = (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300" />
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={event.id} className="relative flex items-start">
            <div
              className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${getVariantClasses(
                event.variant,
                event.completed
              )}`}
            >
              {event.icon || defaultIcon}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                {event.timestamp && (
                  <span className="text-sm text-gray-500">{event.timestamp}</span>
                )}
              </div>
              {event.description && (
                <p className="mt-1 text-gray-600">{event.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 