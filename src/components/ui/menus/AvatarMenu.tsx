import React, { useState, useRef, useEffect } from 'react';

export interface UserInfo {
  name: string;
  email?: string;
  avatar?: string;
  role?: string;
}

export interface AvatarMenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  divider?: boolean;
  danger?: boolean;
}

export interface AvatarMenuProps {
  user: UserInfo;
  items: AvatarMenuItem[];
  showUserInfo?: boolean;
  position?: 'left' | 'right';
  className?: string;
}

const AvatarMenu: React.FC<AvatarMenuProps> = ({
  user,
  items,
  showUserInfo = true,
  position = 'right',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const positionClasses = {
    left: 'left-0',
    right: 'right-0'
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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div ref={menuRef} className={`relative inline-block ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm font-medium text-gray-600">
              {getInitials(user.name)}
            </span>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`absolute top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 transform transition-all duration-200 origin-top ${
          isOpen 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95 pointer-events-none'
        } ${positionClasses[position]}`}
      >
        {showUserInfo && (
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-medium text-gray-600">
                    {getInitials(user.name)}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                {user.email && (
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                )}
                {user.role && (
                  <p className="text-xs text-blue-600 truncate">{user.role}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {items.map((item, index) => (
          <div key={index}>
            {item.divider && <div className="border-t border-gray-100 my-1" />}
            {item.href ? (
              <a
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                  item.danger ? 'text-red-700 hover:bg-red-50' : 'text-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon && <span className="mr-3 w-4 h-4">{item.icon}</span>}
                {item.label}
              </a>
            ) : (
              <button
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className={`w-full flex items-center px-4 py-2 text-sm text-left hover:bg-gray-100 transition-colors ${
                  item.danger ? 'text-red-700 hover:bg-red-50' : 'text-gray-700'
                }`}
              >
                {item.icon && <span className="mr-3 w-4 h-4">{item.icon}</span>}
                {item.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarMenu; 