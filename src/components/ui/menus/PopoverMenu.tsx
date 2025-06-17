import React, { useState, useRef, useEffect } from 'react';

export interface PopoverMenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  description?: string;
}

export interface PopoverMenuProps {
  trigger: React.ReactNode;
  items: PopoverMenuItem[];
  placement?: 'top' | 'bottom' | 'left' | 'right';
  offset?: number;
  showArrow?: boolean;
  className?: string;
}

const PopoverMenu: React.FC<PopoverMenuProps> = ({
  trigger,
  items,
  placement = 'bottom',
  offset = 8,
  showArrow = true,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [actualPlacement, setActualPlacement] = useState(placement);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const placementClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2 top-0',
    right: 'left-full ml-2 top-0'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-200 border-t-8 border-x-8 border-x-transparent',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-200 border-b-8 border-x-8 border-x-transparent',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-l-gray-200 border-l-8 border-y-8 border-y-transparent',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-r-gray-200 border-r-8 border-y-8 border-y-transparent'
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && menuRef.current && triggerRef.current) {
      const menuRect = menuRef.current.getBoundingClientRect();
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      let newPlacement = placement;

      // Check if menu would go outside viewport and adjust placement
      switch (placement) {
        case 'top':
          if (triggerRect.top - menuRect.height - offset < 0) {
            newPlacement = 'bottom';
          }
          break;
        case 'bottom':
          if (triggerRect.bottom + menuRect.height + offset > viewport.height) {
            newPlacement = 'top';
          }
          break;
        case 'left':
          if (triggerRect.left - menuRect.width - offset < 0) {
            newPlacement = 'right';
          }
          break;
        case 'right':
          if (triggerRect.right + menuRect.width + offset > viewport.width) {
            newPlacement = 'left';
          }
          break;
      }

      setActualPlacement(newPlacement);
    }
  }, [isOpen, placement, offset]);

  const handleItemClick = (item: PopoverMenuItem) => {
    if (!item.disabled) {
      item.onClick?.();
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute z-50 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 ${placementClasses[actualPlacement]}`}
          style={{ 
            marginTop: actualPlacement === 'bottom' ? offset : undefined,
            marginBottom: actualPlacement === 'top' ? offset : undefined,
            marginLeft: actualPlacement === 'right' ? offset : undefined,
            marginRight: actualPlacement === 'left' ? offset : undefined,
          }}
        >
          {showArrow && (
            <div className={`absolute ${arrowClasses[actualPlacement]}`} />
          )}
          
          {items.map((item, index) => (
            <div key={index}>
              {item.href ? (
                <a
                  href={item.href}
                  className={`flex items-start px-4 py-3 hover:bg-gray-100 transition-colors ${
                    item.disabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={(e) => {
                    if (item.disabled) {
                      e.preventDefault();
                    } else {
                      setIsOpen(false);
                    }
                  }}
                >
                  {item.icon && (
                    <span className="mr-3 w-5 h-5 text-gray-400 mt-0.5">{item.icon}</span>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    {item.description && (
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    )}
                  </div>
                </a>
              ) : (
                <button
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  className={`w-full flex items-start px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                    item.disabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {item.icon && (
                    <span className="mr-3 w-5 h-5 text-gray-400 mt-0.5">{item.icon}</span>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    {item.description && (
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    )}
                  </div>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopoverMenu; 