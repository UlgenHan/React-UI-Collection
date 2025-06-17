import React, { useState, useRef, useEffect } from 'react';

interface PositionedPopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
  trigger?: 'click' | 'hover';
  offset?: number;
  className?: string;
  popoverClassName?: string;
}

export const PositionedPopover: React.FC<PositionedPopoverProps> = ({
  children,
  content,
  position = 'bottom',
  trigger = 'click',
  offset = 8,
  className = '',
  popoverClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen && trigger === 'click') {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, trigger]);

  const handleTrigger = () => {
    if (trigger === 'click') {
      setIsOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsOpen(false);
    }
  };

  const getPositionClasses = () => {
    const positions = {
      top: `bottom-full left-1/2 transform -translate-x-1/2`,
      bottom: `top-full left-1/2 transform -translate-x-1/2`,
      left: `right-full top-1/2 transform -translate-y-1/2`,
      right: `left-full top-1/2 transform -translate-y-1/2`,
      'top-start': `bottom-full left-0`,
      'top-end': `bottom-full right-0`,
      'bottom-start': `top-full left-0`,
      'bottom-end': `top-full right-0`,
    };
    return positions[position];
  };

  const getMarginClass = () => {
    const margins = {
      top: `mb-${offset}`,
      bottom: `mt-${offset}`,
      left: `mr-${offset}`,
      right: `ml-${offset}`,
      'top-start': `mb-${offset}`,
      'top-end': `mb-${offset}`,
      'bottom-start': `mt-${offset}`,
      'bottom-end': `mt-${offset}`,
    };
    return margins[position];
  };

  const getArrowClasses = () => {
    const arrows = {
      top: 'top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white',
      bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-white',
      left: 'left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-white',
      right: 'right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-white',
      'top-start': 'top-full left-4 border-4 border-transparent border-t-white',
      'top-end': 'top-full right-4 border-4 border-transparent border-t-white',
      'bottom-start': 'bottom-full left-4 border-4 border-transparent border-b-white',
      'bottom-end': 'bottom-full right-4 border-4 border-transparent border-b-white',
    };
    return arrows[position];
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        ref={triggerRef}
        onClick={handleTrigger}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        {children}
      </div>
      {isOpen && (
        <div
          ref={popoverRef}
          className={`
            absolute z-50 p-4 bg-white border border-gray-200 rounded-lg shadow-lg
            min-w-48 max-w-sm
            ${getPositionClasses()}
            ${getMarginClass()}
            ${popoverClassName}
          `}
          role="dialog"
          aria-modal="true"
          onMouseEnter={trigger === 'hover' ? handleMouseEnter : undefined}
          onMouseLeave={trigger === 'hover' ? handleMouseLeave : undefined}
        >
          {content}
          <div className={`absolute ${getArrowClasses()}`} />
        </div>
      )}
    </div>
  );
}; 