import React, { useState, useEffect } from 'react';
import { HeaderBaseProps } from '../../../types';

export interface StickyHeaderProps extends HeaderBaseProps {
  scrollThreshold?: number;
  compactHeight?: string;
  normalHeight?: string;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({
  logo = { text: 'Sticky' },
  navItems = [],
  scrollThreshold = 100,
  compactHeight = 'h-12',
  normalHeight = 'h-20',
  bgColor = 'bg-white',
  className = '',
  id
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold]);

  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${bgColor}
    ${isScrolled ? `${compactHeight} shadow-lg` : `${normalHeight} shadow-sm`}
    border-b border-gray-200
    ${className}
  `.trim();

  const logoClasses = `
    font-bold text-gray-900 transition-all duration-300
    ${isScrolled ? 'text-lg' : 'text-2xl'}
  `;

  const navLinkClasses = `
    px-3 py-2 rounded-md font-medium transition-all duration-200 hover:text-blue-600 hover:bg-gray-50
    ${isScrolled ? 'text-xs' : 'text-sm'}
  `;

  return (
    <>
      <header id={id} className={headerClasses}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className={logoClasses}>
                {logo?.text}
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:block">
              <div className="flex items-center space-x-4">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className={`
                      ${navLinkClasses}
                      ${item.isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}
                    `}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                <svg className={`transition-all duration-300 ${isScrolled ? 'h-4 w-4' : 'h-6 w-6'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div 
            className="h-full bg-blue-600 transition-all duration-150"
            style={{ 
              width: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%` 
            }}
          ></div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className={isScrolled ? compactHeight : normalHeight}></div>
    </>
  );
};

export default StickyHeader; 