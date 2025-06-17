import React, { useState } from 'react';

interface AnimatedTooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  animation?: 'fade' | 'slide' | 'scale';
  delay?: number;
  className?: string;
  tooltipClassName?: string;
}

export const AnimatedTooltip: React.FC<AnimatedTooltipProps> = ({
  children,
  content,
  position = 'top',
  animation = 'fade',
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

  const animationClasses = {
    fade: isVisible ? 'opacity-100' : 'opacity-0',
    slide: isVisible 
      ? 'opacity-100 translate-y-0' 
      : `opacity-0 ${position === 'top' ? 'translate-y-1' : position === 'bottom' ? '-translate-y-1' : position === 'left' ? 'translate-x-1' : '-translate-x-1'}`,
    scale: isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
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
      <div
        className={`
          absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg
          whitespace-nowrap transition-all duration-200 ease-in-out
          ${positionClasses[position]}
          ${animationClasses[animation]}
          ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}
          ${tooltipClassName}
        `}
        role="tooltip"
      >
        {content}
        <div className={`absolute ${arrowClasses[position]}`} />
      </div>
    </div>
  );
}; 