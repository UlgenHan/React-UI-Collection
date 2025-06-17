import React from 'react';
import { HeaderBaseProps, ContactInfo, CTAButton } from '../../../types';

export interface MagazineHeaderProps extends HeaderBaseProps {
  tagline?: string;
  socialLinks?: Array<{ name: string; href: string; icon: React.ReactNode }>;
  searchEnabled?: boolean;
}

const MagazineHeader: React.FC<MagazineHeaderProps> = ({
  logo = { text: 'Magazine' },
  navItems = [],
  tagline = 'Your trusted news source',
  socialLinks = [],
  searchEnabled = true,
  sticky = false,
  bgColor = 'bg-white',
  className = '',
  id
}) => {
  const headerClasses = `
    ${bgColor}
    ${sticky ? 'sticky top-0 z-50 shadow-md' : ''}
    border-b-2 border-gray-900
    ${className}
  `.trim();

  return (
    <header id={id} className={headerClasses}>
      {/* Top bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              {tagline && <span className="hidden md:block">•</span>}
              {tagline && <span className="hidden md:block">{tagline}</span>}
            </div>
            <div className="flex items-center space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="hover:text-gray-300 transition-colors duration-200"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-3xl font-bold text-gray-900 font-serif">
              {logo?.text}
            </div>
          </div>

          {/* Search */}
          {searchEnabled && (
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Subscribe button */}
          <div className="hidden md:block">
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t border-gray-200">
          <div className="flex justify-center space-x-8 py-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`
                  text-sm font-medium uppercase tracking-wide transition-colors duration-200 hover:text-red-600
                  ${item.isActive ? 'text-red-600 border-b-2 border-red-600 pb-1' : 'text-gray-700'}
                `}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default MagazineHeader; 