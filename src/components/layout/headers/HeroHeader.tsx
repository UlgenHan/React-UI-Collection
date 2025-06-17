import React from 'react';
import { HeaderBaseProps, CTAButton } from '../../../types';

export interface HeroHeaderProps extends HeaderBaseProps {
  heroTitle?: string;
  heroSubtitle?: string;
  backgroundImage?: string;
  ctaButtons?: CTAButton[];
  overlayOpacity?: number;
}

const HeroHeader: React.FC<HeroHeaderProps> = ({
  logo = { text: 'Hero' },
  navItems = [],
  heroTitle = 'Welcome to Our Platform',
  heroSubtitle = 'Experience the difference with our innovative solutions',
  backgroundImage,
  ctaButtons = [],
  overlayOpacity = 0.6,
  sticky = false,
  bgColor = 'bg-transparent',
  className = '',
  id
}) => {
  const backgroundStyle = backgroundImage 
    ? { backgroundImage: `url(${backgroundImage})` }
    : { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' };

  return (
    <header 
      id={id} 
      className={`relative min-h-screen bg-cover bg-center ${className}`}
      style={backgroundStyle}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      ></div>

      {/* Navigation */}
      <nav className={`relative z-10 ${sticky ? 'sticky top-0' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="text-2xl font-bold text-white">
                {logo?.text}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className={`
                      px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                      ${item.isActive 
                        ? 'bg-white bg-opacity-20 text-white' 
                        : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                      }
                    `}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-white hover:text-gray-300 p-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {heroTitle}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
            {heroSubtitle}
          </p>

          {/* CTA Buttons */}
          {ctaButtons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {ctaButtons.map((cta, index) => (
                <button
                  key={index}
                  onClick={cta.onClick}
                  className={`
                    px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105
                    ${cta.variant === 'outline' 
                      ? 'border-2 border-white text-white hover:bg-white hover:text-gray-900' 
                      : 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg'
                    }
                  `}
                >
                  {cta.label}
                </button>
              ))}
            </div>
          )}

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroHeader; 