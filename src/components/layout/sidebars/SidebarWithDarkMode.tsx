import React, { useState, useEffect } from 'react';
import { NavItem, LogoProps } from '../../../types';

export interface SidebarWithDarkModeProps {
  logo?: LogoProps;
  navItems?: NavItem[];
  width?: string;
  className?: string;
}

const SidebarWithDarkMode: React.FC<SidebarWithDarkModeProps> = ({
  logo = { text: 'Logo' },
  navItems = [],
  width = 'w-64',
  className = ''
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`fixed left-0 top-0 h-screen ${width} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-sm z-40 transition-colors duration-200 ${className}`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            {logo.image ? (
              <img src={logo.image} alt={logo.alt || 'Logo'} className="h-8 w-auto" />
            ) : (
              <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {logo.text?.charAt(0) || 'L'}
                </span>
              </div>
            )}
            <span className="text-xl font-semibold text-gray-900 dark:text-white">{logo.text}</span>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg 
                className="w-4 h-4 text-gray-500 dark:text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isDarkMode ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                )}
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {isDarkMode ? 'Dark' : 'Light'} Mode
              </span>
            </div>
            
            <button
              onClick={toggleDarkMode}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${isDarkMode ? 'bg-blue-600' : 'bg-gray-200'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                  ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
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
                      ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700 dark:border-blue-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    }
                  `}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Theme Status & Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Theme:</span>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {isDarkMode ? 'Dark' : 'Light'}
              </span>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            © 2024 {logo.text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarWithDarkMode; 