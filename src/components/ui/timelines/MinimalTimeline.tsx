import React from 'react';

interface TimelineEvent {
  id: string;
  title: string;
  timestamp?: string;
  completed?: boolean;
}

interface MinimalTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export const MinimalTimeline: React.FC<MinimalTimelineProps> = ({
  events,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-200" />
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={event.id} className="relative flex items-center">
            <div
              className={`relative z-10 w-4 h-4 rounded-full border-2 ${
                event.completed
                  ? 'border-gray-900 bg-gray-900'
                  : 'border-gray-300 bg-white'
              }`}
            />
            <div className="ml-6 flex-1">
              <div className="flex items-center justify-between">
                <h3
                  className={`text-base font-medium ${
                    event.completed ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {event.title}
                </h3>
                {event.timestamp && (
                  <span className="text-sm text-gray-400">{event.timestamp}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 