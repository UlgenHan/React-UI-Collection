import React, { useState, useRef, useEffect, useCallback } from 'react';

export interface ContextMenuItem {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
  shortcut?: string;
  danger?: boolean;
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  children: React.ReactNode;
  className?: string;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  children,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;

    // Adjust position if menu would go off-screen
    const menuWidth = 200; // Approximate menu width
    const menuHeight = items.length * 40; // Approximate menu height
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let adjustedX = x;
    let adjustedY = y;

    if (x + menuWidth > windowWidth) {
      adjustedX = x - menuWidth;
    }

    if (y + menuHeight > windowHeight) {
      adjustedY = y - menuHeight;
    }

    setPosition({ x: adjustedX, y: adjustedY });
    setIsOpen(true);
  }, [items.length]);

  const handleItemClick = (item: ContextMenuItem) => {
    if (!item.disabled) {
      item.onClick?.();
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleGlobalContextMenu = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('contextmenu', handleGlobalContextMenu);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('contextmenu', handleGlobalContextMenu);
    };
  }, [isOpen]);

  return (
    <>
      <div
        ref={containerRef}
        onContextMenu={handleContextMenu}
        className={`${className}`}
      >
        {children}
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className="fixed bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-[9999] min-w-[200px]"
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          {items.map((item, index) => (
            <div key={index}>
              {item.divider ? (
                <div className="border-t border-gray-100 my-1" />
              ) : (
                <button
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm text-left hover:bg-gray-100 transition-colors ${
                    item.disabled 
                      ? 'opacity-50 cursor-not-allowed' 
                      : item.danger 
                        ? 'text-red-700 hover:bg-red-50' 
                        : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    {item.icon && <span className="mr-3 w-4 h-4">{item.icon}</span>}
                    {item.label}
                  </div>
                  {item.shortcut && (
                    <span className="text-xs text-gray-400 ml-4">{item.shortcut}</span>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ContextMenu; 