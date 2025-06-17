import React, { useState, useRef, useEffect } from 'react';

export interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: MenuItem[];
}

export interface MultiLevelMenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  position?: 'left' | 'right';
  className?: string;
}

const MultiLevelMenu: React.FC<MultiLevelMenuProps> = ({
  trigger,
  items,
  position = 'left',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<Set<string>>(new Set());
  const menuRef = useRef<HTMLDivElement>(null);

  const positionClasses = {
    left: 'left-0',
    right: 'right-0'
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setOpenSubMenus(new Set());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubMenuToggle = (path: string) => {
    const newOpenSubMenus = new Set(openSubMenus);
    if (newOpenSubMenus.has(path)) {
      newOpenSubMenus.delete(path);
    } else {
      newOpenSubMenus.add(path);
    }
    setOpenSubMenus(newOpenSubMenus);
  };

  const handleItemClick = (item: MenuItem) => {
    if (!item.disabled && !item.children) {
      item.onClick?.();
      setIsOpen(false);
      setOpenSubMenus(new Set());
    }
  };

  const renderMenuItem = (item: MenuItem, level: number = 0, path: string = '') => {
    const itemPath = `${path}-${item.label}`;
    const hasChildren = item.children && item.children.length > 0;
    const isSubMenuOpen = openSubMenus.has(itemPath);

    return (
      <div key={itemPath} className="relative">
        {item.href && !hasChildren ? (
          <a
            href={item.href}
            className={`flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors ${
              item.disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{ paddingLeft: `${16 + level * 16}px` }}
            onClick={(e) => {
              if (item.disabled) {
                e.preventDefault();
              } else {
                setIsOpen(false);
                setOpenSubMenus(new Set());
              }
            }}
          >
            <div className="flex items-center">
              {item.icon && <span className="mr-3">{item.icon}</span>}
              {item.label}
            </div>
          </a>
        ) : (
          <button
            onClick={() => {
              if (hasChildren) {
                handleSubMenuToggle(itemPath);
              } else {
                handleItemClick(item);
              }
            }}
            disabled={item.disabled && !hasChildren}
            className={`w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left transition-colors ${
              item.disabled && !hasChildren ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{ paddingLeft: `${16 + level * 16}px` }}
          >
            <div className="flex items-center">
              {item.icon && <span className="mr-3">{item.icon}</span>}
              {item.label}
            </div>
            {hasChildren && (
              <svg
                className={`w-4 h-4 transition-transform ${
                  isSubMenuOpen ? 'rotate-90' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        )}

        {hasChildren && isSubMenuOpen && (
          <div className="bg-gray-50">
            {item.children?.map(child => renderMenuItem(child, level + 1, itemPath))}
          </div>
        )}
      </div>
    );
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
        className={`absolute top-full mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 transform transition-all duration-200 origin-top max-h-96 overflow-y-auto ${
          isOpen 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95 pointer-events-none'
        } ${positionClasses[position]}`}
      >
        {items.map(item => renderMenuItem(item))}
      </div>
    </div>
  );
};

export default MultiLevelMenu; 