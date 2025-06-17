import React, { useState } from 'react';

interface MultilineTooltipProps {
  children: React.ReactNode;
  content: string | string[];
  title?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  maxWidth?: string;
  delay?: number;
  className?: string;
  tooltipClassName?: string;
}

export const MultilineTooltip: React.FC<MultilineTooltipProps> = ({
  children,
  content,
  title,
  position = 'top',
  maxWidth = 'max-w-xs',
  delay = 300,
  className = '',
  tooltipClassName = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900',
  };

  const renderContent = () => {
    if (Array.isArray(content)) {
      return content.map((line, index) => (
        <div key={index} className={index > 0 ? 'mt-1' : ''}>
          {line}
        </div>
      ));
    }
    
    return content.split('\n').map((line, index) => (
      <div key={index} className={index > 0 ? 'mt-1' : ''}>
        {line}
      </div>
    ));
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        tabIndex={0}
      >
        {children}
      </div>
      {isVisible && (
        <div
          className={`
            absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg
            ${maxWidth} whitespace-normal
            ${positionClasses[position]}
            ${tooltipClassName}
          `}
          role="tooltip"
        >
          {title && (
            <div className="font-semibold mb-1 border-b border-gray-700 pb-1">
              {title}
            </div>
          )}
          <div className="leading-relaxed">
            {renderContent()}
          </div>
          <div className={`absolute ${arrowClasses[position]}`} />
        </div>
      )}
    </div>
  );
}; 