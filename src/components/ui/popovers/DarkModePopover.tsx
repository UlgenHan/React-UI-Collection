import React, { useState, useRef, useEffect } from 'react';

interface DarkModePopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  title?: string;
  trigger?: 'click' | 'hover';
  className?: string;
  popoverClassName?: string;
}

export const DarkModePopover: React.FC<DarkModePopoverProps> = ({
  children,
  content,
  title,
  trigger = 'click',
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
            absolute z-50 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl
            min-w-48 max-w-sm backdrop-blur-sm
            ${popoverClassName}
          `}
          role="dialog"
          aria-modal="true"
          onMouseEnter={trigger === 'hover' ? handleMouseEnter : undefined}
          onMouseLeave={trigger === 'hover' ? handleMouseLeave : undefined}
        >
          {title && (
            <div className="px-4 py-3 border-b border-gray-600">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
            </div>
          )}
          <div className="p-4 text-gray-100">
            {content}
          </div>
          <div className="absolute top-full left-4 border-4 border-transparent border-t-gray-800" />
        </div>
      )}
    </div>
  );
}; 