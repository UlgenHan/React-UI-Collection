import React, { useState, useRef, useEffect } from 'react';

interface ImagePopoverProps {
  children: React.ReactNode;
  imageSrc: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  trigger?: 'click' | 'hover';
  className?: string;
  popoverClassName?: string;
}

export const ImagePopover: React.FC<ImagePopoverProps> = ({
  children,
  imageSrc,
  imageAlt = '',
  title,
  description,
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
            absolute z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden
            w-80 max-w-sm
            ${popoverClassName}
          `}
          role="dialog"
          aria-modal="true"
          onMouseEnter={trigger === 'hover' ? handleMouseEnter : undefined}
          onMouseLeave={trigger === 'hover' ? handleMouseLeave : undefined}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-48 object-cover"
          />
          {(title || description) && (
            <div className="p-4">
              {title && (
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              )}
              {description && (
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 