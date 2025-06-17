import React, { useState } from 'react';

interface TimelineEvent {
  id: string;
  title: string;
  summary?: string;
  description?: string;
  timestamp?: string;
  completed?: boolean;
  expandable?: boolean;
}

interface InteractiveTimelineProps {
  events: TimelineEvent[];
  onEventClick?: (event: TimelineEvent) => void;
  className?: string;
}

export const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({
  events,
  onEventClick,
  className = '',
}) => {
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

  const toggleExpanded = (eventId: string) => {
    const newExpanded = new Set(expandedEvents);
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId);
    } else {
      newExpanded.add(eventId);
    }
    setExpandedEvents(newExpanded);
  };

  const handleEventClick = (event: TimelineEvent) => {
    if (event.expandable) {
      toggleExpanded(event.id);
    }
    onEventClick?.(event);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300" />
      <div className="space-y-6">
        {events.map((event, index) => {
          const isExpanded = expandedEvents.has(event.id);
          const isExpandable = event.expandable && event.description;
          
          return (
            <div key={event.id} className="relative flex items-start">
              <div
                className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-200 ${
                  event.completed
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300 bg-white hover:border-blue-300'
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
                <div
                  className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition-all duration-200 ${
                    isExpandable ? 'cursor-pointer hover:shadow-md hover:border-gray-300' : ''
                  }`}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                    <div className="flex items-center space-x-2">
                      {event.timestamp && (
                        <span className="text-sm text-gray-500">{event.timestamp}</span>
                      )}
                      {isExpandable && (
                        <svg
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  {event.summary && (
                    <p className="mt-2 text-gray-600">{event.summary}</p>
                  )}
                  {isExpandable && isExpanded && event.description && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-gray-700">{event.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 