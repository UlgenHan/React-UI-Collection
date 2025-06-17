import React, { useState } from 'react';

interface BottomTooltipProps {
  children: React.ReactNode;
  content: string;
  delay?: number;
  className?: string;
  tooltipClassName?: string;
}

export const BottomTooltip: React.FC<BottomTooltipProps> = ({
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
            top-full left-1/2 transform -translate-x-1/2 mt-2
            whitespace-nowrap
            ${tooltipClassName}
          `}
          role="tooltip"
        >
          {content}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2">
            <div className="border-4 border-transparent border-b-gray-900" />
          </div>
        </div>
      )}
    </div>
  );
}; 