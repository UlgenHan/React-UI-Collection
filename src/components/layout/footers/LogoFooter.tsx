import React from 'react';
import { LogoProps, NavItem } from '../../../types';

export interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
}

export interface LogoFooterProps {
  logo?: LogoProps;
  companyName?: string;
  year?: number;
  links?: NavItem[];
  contactInfo?: ContactInfo;
  bgColor?: string;
  className?: string;
}

const LogoFooter: React.FC<LogoFooterProps> = ({
  logo = { text: 'Your Company' },
  companyName = 'Your Company',
  year = new Date().getFullYear(),
  links = [],
  contactInfo,
  bgColor = 'bg-white',
  className = ''
}) => {
  const defaultLinks: NavItem[] = [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' }
  ];

  const navigationLinks = links.length > 0 ? links : defaultLinks;

  const defaultContactInfo: ContactInfo = {
    address: '123 Business St, City, State 12345',
    phone: '+1 (555) 123-4567',
    email: 'contact@yourcompany.com'
  };

  const contact = contactInfo || defaultContactInfo;

  return (
    <footer className={`py-12 border-t border-gray-200 ${bgColor} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Logo and Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              {logo.image ? (
                <img src={logo.image} alt={logo.alt || 'Logo'} className="h-10 w-auto" />
              ) : (
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {logo.text?.charAt(0) || 'L'}
                  </span>
                </div>
              )}
              <span className="text-xl font-bold text-gray-900">
                {logo.text || companyName}
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Building the future with innovative solutions and exceptional service. 
              We're committed to delivering quality products that make a difference.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
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
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <div className="space-y-3">
              {contact.address && (
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm text-gray-600">{contact.address}</p>
                </div>
              )}
              
              {contact.phone && (
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${contact.phone}`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    {contact.phone}
                  </a>
                </div>
              )}
              
              {contact.email && (
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${contact.email}`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    {contact.email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            © {year} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LogoFooter; 