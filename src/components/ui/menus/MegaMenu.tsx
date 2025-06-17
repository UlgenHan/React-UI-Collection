import React, { useState, useRef, useEffect } from 'react';

export interface MegaMenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  description?: string;
  icon?: React.ReactNode;
}

export interface MegaMenuCategory {
  title: string;
  items: MegaMenuItem[];
  featured?: boolean;
}

export interface MegaMenuProps {
  trigger: React.ReactNode;
  categories: MegaMenuCategory[];
  columns?: number;
  width?: 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const MegaMenu: React.FC<MegaMenuProps> = ({
  trigger,
  categories,
  columns = 3,
  width = 'lg',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const widthClasses = {
    md: 'w-96',
    lg: 'w-[32rem]',
    xl: 'w-[48rem]',
    full: 'w-screen max-w-6xl'
  };

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
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

  const handleItemClick = (item: MegaMenuItem) => {
    item.onClick?.();
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className={`relative inline-block ${className}`}>
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        aria-expanded={isOpen}
      >
        {trigger}
      </button>

      <div
        className={`absolute top-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-50 transform transition-all duration-200 origin-top ${
          isOpen 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95 pointer-events-none'
        } ${widthClasses[width]} left-1/2 -translate-x-1/2`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className={`grid gap-8 p-6 ${gridCols[Math.min(columns, 4) as keyof typeof gridCols]}`}>
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <h3 className={`font-semibold text-gray-900 pb-2 border-b border-gray-200 ${
                category.featured ? 'text-blue-600' : ''
              }`}>
                {category.title}
              </h3>
              <div className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="block p-2 rounded-lg hover:bg-gray-100 transition-colors group"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex items-start space-x-3">
                          {item.icon && (
                            <div className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors mt-0.5">
                              {item.icon}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              {item.label}
                            </p>
                            {item.description && (
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </a>
                    ) : (
                      <button
                        onClick={() => handleItemClick(item)}
                        className="w-full text-left p-2 rounded-lg hover:bg-gray-100 transition-colors group"
                      >
                        <div className="flex items-start space-x-3">
                          {item.icon && (
                            <div className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors mt-0.5">
                              {item.icon}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              {item.label}
                            </p>
                            {item.description && (
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu; 