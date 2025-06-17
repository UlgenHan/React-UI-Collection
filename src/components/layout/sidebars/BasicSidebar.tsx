import React from 'react';
import { NavItem, LogoProps } from '../../../types';

export interface BasicSidebarProps {
  logo?: LogoProps;
  navItems?: NavItem[];
  width?: string;
  bgColor?: string;
  className?: string;
}

const BasicSidebar: React.FC<BasicSidebarProps> = ({
  logo = { text: 'Logo' },
  navItems = [],
  width = 'w-64',
  bgColor = 'bg-white',
  className = ''
}) => {
  return (
    <div className={`fixed left-0 top-0 h-screen ${width} ${bgColor} border-r border-gray-200 shadow-sm z-40 ${className}`}>
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
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                    ${item.isActive 
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  {item.label}
                </a>
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

export default BasicSidebar; 