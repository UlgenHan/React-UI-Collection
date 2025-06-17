import React from 'react';
import { HeaderBaseProps, ContactInfo, CTAButton } from '../../../types';

export interface ClassicHeaderProps extends HeaderBaseProps {
  contactInfo?: ContactInfo;
  ctaButton?: CTAButton;
  showContactInfo?: boolean;
}

const ClassicHeader: React.FC<ClassicHeaderProps> = ({
  logo = { text: 'Logo' },
  navItems = [],
  contactInfo,
  ctaButton,
  showContactInfo = true,
  sticky = false,
  bgColor = 'bg-white',
  className = '',
  id
}) => {
  const headerClasses = `
    ${bgColor}
    ${sticky ? 'sticky top-0 z-50 shadow-md' : ''}
    border-b border-gray-200
    ${className}
  `.trim();

  const handleLogoClick = () => {
    if (logo?.onClick) {
      logo.onClick();
    } else if (logo?.href) {
      window.location.href = logo.href;
    }
  };

  const handleCTAClick = () => {
    if (ctaButton?.onClick) {
      ctaButton.onClick();
    } else if (ctaButton?.href) {
      window.location.href = ctaButton.href;
    }
  };

  const getCtaVariantClasses = (variant: string = 'primary') => {
    const baseClasses = 'px-6 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    switch (variant) {
      case 'secondary':
        return `${baseClasses} bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500`;
      case 'outline':
        return `${baseClasses} border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500`;
      default:
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500`;
    }
  };

  return (
    <header id={id} className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            >
              {logo?.image ? (
                <img
                  src={logo.image}
                  alt={logo.alt || 'Logo'}
                  className="h-10 w-auto"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {logo?.text?.charAt(0) || 'L'}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {logo?.text}
                  </span>
                </div>
              )}
            </button>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
                className={`
                  text-sm font-medium transition-colors duration-200 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1
                  ${item.isActive ? 'text-blue-600' : 'text-gray-700'}
                `}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Contact Info */}
            {showContactInfo && contactInfo && (
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {contactInfo.phone && (
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{contactInfo.phone}</span>
                  </div>
                )}
                {contactInfo.email && (
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{contactInfo.email}</span>
                  </div>
                )}
              </div>
            )}

            {/* CTA Button */}
            {ctaButton && (
              <button
                onClick={handleCTAClick}
                className={getCtaVariantClasses(ctaButton.variant)}
              >
                {ctaButton.label}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 bg-gray-50">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-gray-100
                  ${item.isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}
                `}
              >
                {item.label}
              </a>
            ))}
            
            {/* Mobile CTA */}
            {ctaButton && (
              <div className="px-3 pt-4">
                <button
                  onClick={handleCTAClick}
                  className={`w-full ${getCtaVariantClasses(ctaButton.variant)}`}
                >
                  {ctaButton.label}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClassicHeader; 