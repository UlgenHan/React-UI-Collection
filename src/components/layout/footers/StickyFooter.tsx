import React from 'react';
import { NavItem } from '../../../types';

export interface StickyFooterProps {
  links?: NavItem[];
  companyName?: string;
  year?: number;
  bgColor?: string;
  className?: string;
}

const StickyFooter: React.FC<StickyFooterProps> = ({
  links = [],
  companyName = 'Your Company',
  year = new Date().getFullYear(),
  bgColor = 'bg-white',
  className = ''
}) => {
  const defaultLinks: NavItem[] = [
    { label: 'About', href: '/about' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Contact', href: '/contact' }
  ];

  const navigationLinks = links.length > 0 ? links : defaultLinks;

  return (
    <footer className={`fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 shadow-lg ${bgColor} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex flex-col sm:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-sm text-gray-600 mb-2 sm:mb-0">
            © {year} {companyName}. All rights reserved.
          </div>
          
          {/* Navigation Links */}
          <nav className="flex space-x-6">
            {navigationLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default StickyFooter; 