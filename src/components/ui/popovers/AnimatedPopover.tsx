import React, { useState, useRef, useEffect } from 'react';

interface AnimatedPopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'scale';
  trigger?: 'click' | 'hover';
  className?: string;
  popoverClassName?: string;
}

export const AnimatedPopover: React.FC<AnimatedPopoverProps> = ({
  children,
  content,
  animation = 'fade',
  trigger = 'click',
  className = '',
  popoverClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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
        handleClose();
      }
    };

    if (isOpen && trigger === 'click') {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, trigger]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 200);
  };

  const handleTrigger = () => {
    if (trigger === 'click') {
      if (isOpen) {
        handleClose();
      } else {
        handleOpen();
      }
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      handleOpen();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      handleClose();
    }
  };

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-200 ease-in-out';
    
    const animations = {
      fade: isVisible 
        ? 'opacity-100' 
        : 'opacity-0',
      'slide-up': isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-2',
      'slide-down': isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 -translate-y-2',
      scale: isVisible 
        ? 'opacity-100 scale-100' 
        : 'opacity-0 scale-95',
    };

    return `${baseClasses} ${animations[animation]}`;
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
            handleTrigger();
          }
        }}
      >
        {children}
      </div>
      {isOpen && (
        <div
          ref={popoverRef}
          className={`
            absolute z-50 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg
            min-w-48 max-w-sm transform origin-top
            ${getAnimationClasses()}
            ${popoverClassName}
          `}
          role="dialog"
          aria-modal="true"
          onMouseEnter={trigger === 'hover' ? handleMouseEnter : undefined}
          onMouseLeave={trigger === 'hover' ? handleMouseLeave : undefined}
        >
          {content}
        </div>
      )}
    </div>
  );
}; 