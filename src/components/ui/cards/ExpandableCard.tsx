import React, { useState } from 'react';

export interface ExpandableCardProps {
  title: string;
  previewContent?: string;
  expandedContent: React.ReactNode;
  defaultExpanded?: boolean;
  icon?: React.ReactNode;
  expandButtonText?: string;
  collapseButtonText?: string;
  animationDuration?: 'fast' | 'normal' | 'slow';
  showToggleIcon?: boolean;
  className?: string;
  onToggle?: (expanded: boolean) => void;
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  previewContent,
  expandedContent,
  defaultExpanded = false,
  icon,
  expandButtonText = 'Show more',
  collapseButtonText = 'Show less',
  animationDuration = 'normal',
  showToggleIcon = true,
  className = '',
  onToggle
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const durationClasses = {
    fast: 'duration-150',
    normal: 'duration-300',
    slow: 'duration-500'
  };

  const toggleExpanded = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div
      className={`
        bg-white rounded-lg border shadow-sm
        hover:shadow-md transition-shadow duration-200
        ${className}
      `}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            {icon && (
              <div className="flex-shrink-0 w-6 h-6 text-gray-600 mt-1">
                {icon}
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {title}
              </h3>
              {previewContent && !isExpanded && (
                <p className="text-gray-600 leading-relaxed">
                  {previewContent}
                </p>
              )}
            </div>
          </div>
          
          {showToggleIcon && (
            <button
              onClick={toggleExpanded}
              className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className={`w-5 h-5 transform transition-transform ${durationClasses[animationDuration]} ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Expandable Content */}
      <div
        className={`
          overflow-hidden transition-all ${durationClasses[animationDuration]} ease-in-out
          ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-6 pb-4">
          <div className="border-t border-gray-100 pt-4">
            {expandedContent}
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="px-6 pb-6">
        <button
          onClick={toggleExpanded}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <span>
            {isExpanded ? collapseButtonText : expandButtonText}
          </span>
          <svg
            className={`w-4 h-4 transform transition-transform ${durationClasses[animationDuration]} ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ExpandableCard; 