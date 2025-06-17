import React, { useState, useRef, useEffect } from 'react';

export interface IconMenuItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  badge?: string | number;
}

export interface IconMenuProps {
  trigger: React.ReactNode;
  items: IconMenuItem[];
  columns?: number;
  showLabels?: boolean;
  position?: 'left' | 'right' | 'center';
  className?: string;
}

const IconMenu: React.FC<IconMenuProps> = ({
  trigger,
  items,
  columns = 3,
  showLabels = true,
  position = 'center',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const positionClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2'
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item: IconMenuItem) => {
    if (!item.disabled) {
      item.onClick?.();
      setIsOpen(false);
    }
  };

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
  };

  return (
    <div ref={menuRef} className={`relative inline-block ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        aria-expanded={isOpen}
      >
        {trigger}
      </button>

      <div
        className={`absolute top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-50 transform transition-all duration-200 origin-top ${
          isOpen 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95 pointer-events-none'
        } ${positionClasses[position]}`}
      >
        <div className={`grid gap-2 ${gridCols[Math.min(columns, 6) as keyof typeof gridCols]}`}>
          {items.map((item, index) => (
            <div key={index} className="relative">
              {item.href ? (
                <a
                  href={item.href}
                  className={`flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors text-center ${
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
                  <div className="relative w-8 h-8 flex items-center justify-center text-gray-600 mb-2">
                    {item.icon}
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {showLabels && (
                    <span className="text-xs text-gray-700 font-medium">{item.label}</span>
                  )}
                </a>
              ) : (
                <button
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  className={`flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors text-center w-full ${
                    item.disabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <div className="relative w-8 h-8 flex items-center justify-center text-gray-600 mb-2">
                    {item.icon}
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {showLabels && (
                    <span className="text-xs text-gray-700 font-medium">{item.label}</span>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IconMenu; 