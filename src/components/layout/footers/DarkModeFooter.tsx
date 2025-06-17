import React, { useState, useEffect } from 'react';
import { NavItem } from '../../../types';

export interface DarkModeFooterProps {
  links?: NavItem[];
  companyName?: string;
  year?: number;
  className?: string;
}

const DarkModeFooter: React.FC<DarkModeFooterProps> = ({
  links = [],
  companyName = 'Your Company',
  year = new Date().getFullYear(),
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

  const defaultLinks: NavItem[] = [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Contact', href: '/contact' }
  ];

  const navigationLinks = links.length > 0 ? links : defaultLinks;

  return (
    <footer className={`py-12 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{companyName}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Building innovative solutions with cutting-edge technology. 
              We're committed to excellence and customer satisfaction in everything we do.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.onClick) {
                        e.preventDefault();
                        link.onClick();
                      }
                    }}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Theme Toggle */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Preferences
            </h3>
            
            <div className="flex items-center justify-between max-w-xs">
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
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
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

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Switch between light and dark themes
            </p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
              © {year} {companyName}. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {isDarkMode ? 'Dark' : 'Light'} theme active
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DarkModeFooter; 