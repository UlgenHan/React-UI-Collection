import React from 'react';
import { HeaderBaseProps } from '../../../types';

const SingleLineHeader: React.FC<HeaderBaseProps> = ({
  logo = { text: 'Single' },
  navItems = [],
  sticky = false,
  bgColor = 'bg-white',
  className = '',
  id
}) => {
  return (
    <header id={id} className={`${bgColor} ${sticky ? 'sticky top-0 z-50' : ''} border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="text-lg font-semibold text-gray-900">{logo?.text}</div>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`text-sm ${item.isActive ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button className="md:hidden p-1">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default SingleLineHeader; 