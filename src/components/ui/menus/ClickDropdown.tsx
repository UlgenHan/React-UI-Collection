import React, { useState, useRef, useEffect } from 'react';

export interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface ClickDropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  position?: 'left' | 'right' | 'center';
  closeOnItemClick?: boolean;
  className?: string;
}

const ClickDropdown: React.FC<ClickDropdownProps> = ({
  trigger,
  items,
  position = 'left',
  closeOnItemClick = true,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const positionClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2'
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item: DropdownItem) => {
    if (item.onClick) {
      item.onClick();
    }
    if (closeOnItemClick) {
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
      </button>
      
      <div
        className={`absolute top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 transform transition-all duration-200 origin-top ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        } ${positionClasses[position]}`}
      >
        {items.map((item, index) => (
          <div key={index}>
            {item.href ? (
              <a
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors ${
                  item.disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={(e) => {
                  if (item.disabled) {
                    e.preventDefault();
                  } else if (closeOnItemClick) {
                    setIsOpen(false);
                  }
                }}
              >
                {item.icon && <span className="mr-3">{item.icon}</span>}
                {item.label}
              </a>
            ) : (
              <button
                onClick={() => !item.disabled && handleItemClick(item)}
                disabled={item.disabled}
                className={`w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left transition-colors ${
                  item.disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {item.icon && <span className="mr-3">{item.icon}</span>}
                {item.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClickDropdown; 