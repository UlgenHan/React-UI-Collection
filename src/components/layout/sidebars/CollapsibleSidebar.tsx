import React, { useState } from 'react';
import { NavItem, LogoProps } from '../../../types';

export interface CollapsibleSidebarProps {
  logo?: LogoProps;
  navItems?: NavItem[];
  defaultCollapsed?: boolean;
  bgColor?: string;
  className?: string;
}

const CollapsibleSidebar: React.FC<CollapsibleSidebarProps> = ({
  logo = { text: 'Logo' },
  navItems = [],
  defaultCollapsed = false,
  bgColor = 'bg-white',
  className = ''
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`
      fixed left-0 top-0 h-screen border-r border-gray-200 shadow-sm z-40 transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-16' : 'w-64'} ${bgColor} ${className}
    `}>
      <div className="flex flex-col h-full">
        {/* Header with toggle */}
        <div className="flex items-center justify-between h-16 border-b border-gray-200 px-4">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              {logo.image ? (
                <img src={logo.image} alt={logo.alt || 'Logo'} className="h-8 w-auto" />
              ) : (
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {logo.text?.charAt(0) || 'L'}
                  </span>
                </div>
              )}
              <span className="text-xl font-semibold text-gray-900 truncate">{logo.text}</span>
            </div>
          )}
          
          <button
            onClick={toggleSidebar}
            className={`
              p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200
              ${isCollapsed ? 'mx-auto' : ''}
            `}
          >
            <svg 
              className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item, index) => (
              <li key={index} className="relative group">
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  className={`
                    flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${item.isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                >
                  <div className="w-5 h-5 flex-shrink-0">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  
                  {!isCollapsed && (
                    <span className="ml-3 truncate">{item.label}</span>
                  )}
                </a>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          {isCollapsed ? (
            <div className="w-6 h-6 bg-gray-300 rounded-full mx-auto"></div>
          ) : (
            <div className="text-xs text-gray-500 text-center">
              © 2024 {logo.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSidebar; 