import React from 'react';

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  status?: 'success' | 'warning' | 'error' | 'info' | 'pending';
}

interface ColorCodedTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export const ColorCodedTimeline: React.FC<ColorCodedTimelineProps> = ({
  events,
  className = '',
}) => {
  const getStatusClasses = (status: string = 'pending') => {
    const statusClasses = {
      success: {
        dot: 'border-green-500 bg-green-500',
        line: 'bg-green-200',
        badge: 'bg-green-100 text-green-800',
        text: 'text-green-700',
      },
      warning: {
        dot: 'border-yellow-500 bg-yellow-500',
        line: 'bg-yellow-200',
        badge: 'bg-yellow-100 text-yellow-800',
        text: 'text-yellow-700',
      },
      error: {
        dot: 'border-red-500 bg-red-500',
        line: 'bg-red-200',
        badge: 'bg-red-100 text-red-800',
        text: 'text-red-700',
      },
      info: {
        dot: 'border-blue-500 bg-blue-500',
        line: 'bg-blue-200',
        badge: 'bg-blue-100 text-blue-800',
        text: 'text-blue-700',
      },
      pending: {
        dot: 'border-gray-300 bg-white',
        line: 'bg-gray-200',
        badge: 'bg-gray-100 text-gray-800',
        text: 'text-gray-500',
      },
    };
    return statusClasses[status as keyof typeof statusClasses] || statusClasses.pending;
  };

  return (
    <div className={`relative ${className}`}>
      <div className="space-y-6">
        {events.map((event, index) => {
          const statusClasses = getStatusClasses(event.status);
          const isLast = index === events.length - 1;
          
          return (
            <div key={event.id} className="relative flex items-start">
              {!isLast && (
                <div
                  className={`absolute left-4 top-8 bottom-0 w-0.5 ${statusClasses.line}`}
                />
              )}
              <div
                className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${statusClasses.dot}`}
              >
                {event.status === 'success' && (
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
                )}
                {event.status === 'error' && (
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
                {event.status === 'warning' && (
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                )}
                {(event.status === 'info' || event.status === 'pending') && (
                  <div className="w-2 h-2 bg-current rounded-full" />
                )}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                    {event.status && (
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses.badge}`}
                      >
                        {event.status}
                      </span>
                    )}
                  </div>
                  {event.timestamp && (
                    <span className="text-sm text-gray-500">{event.timestamp}</span>
                  )}
                </div>
                {event.description && (
                  <p className={`text-base ${statusClasses.text}`}>{event.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 