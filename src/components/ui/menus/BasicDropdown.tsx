import React, { useState } from 'react';

export interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface BasicDropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  position?: 'left' | 'right' | 'center';
  className?: string;
}

const BasicDropdown: React.FC<BasicDropdownProps> = ({
  trigger,
  items,
  position = 'left',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2'
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="cursor-pointer">
        {trigger}
      </div>
      
      {isOpen && (
        <div className={`absolute top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 ${positionClasses[position]}`}>
          {items.map((item, index) => (
            <div key={index}>
              {item.href ? (
                <a
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                    item.disabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                >
                  {item.icon && <span className="mr-3">{item.icon}</span>}
                  {item.label}
                </a>
              ) : (
                <button
                  onClick={item.disabled ? undefined : item.onClick}
                  disabled={item.disabled}
                  className={`w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left ${
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
      )}
    </div>
  );
};

export default BasicDropdown; 