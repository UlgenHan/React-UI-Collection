import React, { useState } from 'react';
import { NavItem, LogoProps } from '../../../types';

export interface SidebarWithSubmenusProps {
  logo?: LogoProps;
  navItems?: NavItemWithSubmenu[];
  bgColor?: string;
  className?: string;
}

export interface NavItemWithSubmenu extends NavItem {
  submenu?: NavItem[];
  icon?: React.ReactNode;
}

const SidebarWithSubmenus: React.FC<SidebarWithSubmenusProps> = ({
  logo = { text: 'Logo' },
  navItems = [],
  bgColor = 'bg-white',
  className = ''
}) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleSubmenu = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const defaultIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  return (
    <div className={`fixed left-0 top-0 h-screen w-64 ${bgColor} border-r border-gray-200 shadow-sm z-40 ${className}`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
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
            <span className="text-xl font-semibold text-gray-900">{logo.text}</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-4">
            {navItems.map((item, index) => (
              <li key={index}>
                {/* Main nav item */}
                <div
                  className={`
                    flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer
                    ${item.isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                  onClick={() => {
                    if (item.submenu && item.submenu.length > 0) {
                      toggleSubmenu(index);
                    } else if (item.onClick) {
                      item.onClick();
                    } else if (item.href) {
                      window.location.href = item.href;
                    }
                  }}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-3">
                      {item.icon || defaultIcon}
                    </div>
                    <span className="truncate">{item.label}</span>
                  </div>
                  
                  {/* Expand/collapse icon for items with submenus */}
                  {item.submenu && item.submenu.length > 0 && (
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        expandedItems.includes(index) ? 'rotate-90' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>

                {/* Submenu */}
                {item.submenu && item.submenu.length > 0 && (
                  <div className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${expandedItems.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                  `}>
                    <ul className="mt-1 ml-6 space-y-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <a
                            href={subItem.href}
                            onClick={(e) => {
                              if (subItem.onClick) {
                                e.preventDefault();
                                subItem.onClick();
                              }
                            }}
                            className={`
                              flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                              ${subItem.isActive 
                                ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-2 border-transparent'
                              }
                            `}
                          >
                            <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 flex-shrink-0"></div>
                            <span className="truncate">{subItem.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            © 2024 {logo.text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarWithSubmenus; 