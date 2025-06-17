import React, { useState } from 'react';
import { NavItem, LogoProps } from '../../../types';

export interface SlideInMenuSidebarProps {
  logo?: LogoProps;
  navItems?: NavItem[];
  isOpen?: boolean;
  onToggle?: () => void;
  bgColor?: string;
  className?: string;
}

const SlideInMenuSidebar: React.FC<SlideInMenuSidebarProps> = ({
  logo = { text: 'Logo' },
  navItems = [],
  isOpen: controlledIsOpen,
  onToggle,
  bgColor = 'bg-white',
  className = ''
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const toggleMenu = onToggle || (() => setInternalIsOpen(!internalIsOpen));

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 lg:hidden"
      >
        <svg 
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Backdrop */}
      <div 
        className={`
          fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        onClick={toggleMenu}
      />

      {/* Sidebar */}
      <div 
        className={`
          fixed right-0 top-0 h-screen w-80 ${bgColor} shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          ${className}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
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
            
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 py-6 px-6 overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li 
                  key={index}
                  className={`transform transition-all duration-300 delay-${index * 100}`}
                  style={{
                    transform: isOpen ? 'translateX(0)' : 'translateX(100px)',
                    opacity: isOpen ? 1 : 0,
                    transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
                  }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                      toggleMenu(); // Close menu after clicking
                    }}
                    className={`
                      flex items-center px-4 py-4 text-lg font-medium rounded-xl transition-all duration-200 group
                      ${item.isActive 
                        ? 'bg-blue-50 text-blue-700 shadow-sm' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-4 w-full">
                      <div className="w-2 h-2 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      <span className="text-base">{item.label}</span>
                      <div className="ml-auto">
                        <svg 
                          className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transform group-hover:translate-x-1 transition-all duration-200" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">
                © 2024 {logo.text}
              </div>
              <div className="text-xs text-gray-400">
                Slide-in Navigation Menu
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlideInMenuSidebar; 