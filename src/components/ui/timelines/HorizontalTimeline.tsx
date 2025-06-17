import React from 'react';

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  completed?: boolean;
}

interface HorizontalTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export const HorizontalTimeline: React.FC<HorizontalTimelineProps> = ({
  events,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="relative flex items-center justify-between">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-300" />
        {events.map((event, index) => (
          <div key={event.id} className="relative flex flex-col items-center">
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
            <div className="mt-4 text-center max-w-xs">
              <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
              {event.timestamp && (
                <span className="text-xs text-gray-500 mt-1 block">{event.timestamp}</span>
              )}
              {event.description && (
                <p className="mt-2 text-xs text-gray-600">{event.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 