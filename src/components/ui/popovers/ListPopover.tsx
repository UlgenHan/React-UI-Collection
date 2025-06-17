import React, { useState, useRef, useEffect } from 'react';

interface ListItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

interface ListPopoverProps {
  children: React.ReactNode;
  items: ListItem[];
  title?: string;
  className?: string;
  popoverClassName?: string;
}

export const ListPopover: React.FC<ListPopoverProps> = ({
  children,
  items,
  title,
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

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleItemClick = (item: ListItem) => {
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
            absolute z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg
            min-w-48 max-w-sm
            ${popoverClassName}
          `}
          role="menu"
          aria-orientation="vertical"
        >
          {title && (
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            </div>
          )}
          <div className="py-1">
            {items.map((item) => {
              const ItemContent = (
                <div
                  className={`
                    flex items-center px-4 py-2 text-sm cursor-pointer
                    ${item.disabled 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                  onClick={() => handleItemClick(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleItemClick(item);
                    }
                  }}
                  tabIndex={item.disabled ? -1 : 0}
                  role="menuitem"
                >
                  {item.icon && (
                    <span className="mr-3 flex-shrink-0 w-4 h-4">
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </div>
              );

              if (item.href && !item.disabled) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className="block"
                    onClick={() => setIsOpen(false)}
                  >
                    {ItemContent}
                  </a>
                );
              }

              return (
                <div key={item.id}>
                  {ItemContent}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}; 