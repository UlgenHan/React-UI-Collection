import React, { useState, useRef, useEffect } from 'react';

interface TooltipPopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click';
  delay?: number;
  className?: string;
  popoverClassName?: string;
}

export const TooltipPopover: React.FC<TooltipPopoverProps> = ({
  children,
  content,
  position = 'top',
  trigger = 'hover',
  delay = 300,
  className = '',
  popoverClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
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

  const showPopover = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (trigger === 'hover') {
      const id = setTimeout(() => setIsOpen(true), delay);
      setTimeoutId(id);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const hidePopover = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    if (trigger === 'hover') {
      setIsOpen(false);
    }
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-800',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-800',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        ref={triggerRef}
        onClick={trigger === 'click' ? showPopover : undefined}
        onMouseEnter={trigger === 'hover' ? showPopover : undefined}
        onMouseLeave={trigger === 'hover' ? hidePopover : undefined}
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
            absolute z-50 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg
            whitespace-nowrap max-w-xs
            ${positionClasses[position]}
            ${popoverClassName}
          `}
          role="tooltip"
          onMouseEnter={trigger === 'hover' ? showPopover : undefined}
          onMouseLeave={trigger === 'hover' ? hidePopover : undefined}
        >
          {content}
          <div className={`absolute ${arrowClasses[position]}`} />
        </div>
      )}
    </div>
  );
}; 