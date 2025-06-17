import React, { useState } from 'react';

interface RightTooltipProps {
  children: React.ReactNode;
  content: string;
  delay?: number;
  className?: string;
  tooltipClassName?: string;
}

export const RightTooltip: React.FC<RightTooltipProps> = ({
  children,
  content,
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
            left-full top-1/2 transform -translate-y-1/2 ml-2
            whitespace-nowrap
            ${tooltipClassName}
          `}
          role="tooltip"
        >
          {content}
          <div className="absolute right-full top-1/2 transform -translate-y-1/2">
            <div className="border-4 border-transparent border-r-gray-900" />
          </div>
        </div>
      )}
    </div>
  );
}; 