import React, { useState } from 'react';

interface DarkTooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'dark' | 'light' | 'colorful';
  delay?: number;
  className?: string;
  tooltipClassName?: string;
}

export const DarkTooltip: React.FC<DarkTooltipProps> = ({
  children,
  content,
  position = 'top',
  variant = 'dark',
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

  const variantClasses = {
    dark: {
      bg: 'bg-gray-900 text-white',
      arrow: 'border-t-gray-900',
    },
    light: {
      bg: 'bg-white text-gray-900 border border-gray-200',
      arrow: 'border-t-white',
    },
    colorful: {
      bg: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white',
      arrow: 'border-t-purple-600',
    },
  };

  const arrowClasses = {
    top: `top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent ${variantClasses[variant].arrow}`,
    bottom: `bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-${variantClasses[variant].arrow.split('-').pop()}`,
    left: `left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-${variantClasses[variant].arrow.split('-').pop()}`,
    right: `right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-${variantClasses[variant].arrow.split('-').pop()}`,
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
            absolute z-50 px-3 py-2 text-sm rounded-lg shadow-xl
            whitespace-nowrap backdrop-blur-sm
            ${positionClasses[position]}
            ${variantClasses[variant].bg}
            ${tooltipClassName}
          `}
          role="tooltip"
        >
          {content}
          <div className={`absolute ${arrowClasses[position]}`} />
        </div>
      )}
    </div>
  );
}; 