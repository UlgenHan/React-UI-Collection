import React from 'react';

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  completed?: boolean;
}

interface BasicTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export const BasicTimeline: React.FC<BasicTimelineProps> = ({
  events,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300" />
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={event.id} className="relative flex items-start">
            <div
              className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 bg-white ${
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