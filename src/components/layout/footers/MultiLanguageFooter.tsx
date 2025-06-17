import React, { useState } from 'react';
import { NavItem } from '../../../types';

export interface Language {
  code: string;
  name: string;
  flag?: string;
}

export interface MultiLanguageFooterProps {
  links?: NavItem[];
  companyName?: string;
  year?: number;
  languages?: Language[];
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
  bgColor?: string;
  className?: string;
}

const MultiLanguageFooter: React.FC<MultiLanguageFooterProps> = ({
  links = [],
  companyName = 'Your Company',
  year = new Date().getFullYear(),
  languages = [],
  currentLanguage = 'en',
  onLanguageChange,
  bgColor = 'bg-white',
  className = ''
}) => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const defaultLanguages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' }
  ];

  const defaultLinks: NavItem[] = [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Support', href: '/support' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' }
  ];

  const availableLanguages = languages.length > 0 ? languages : defaultLanguages;
  const navigationLinks = links.length > 0 ? links : defaultLinks;
  const selectedLanguage = availableLanguages.find(lang => lang.code === currentLanguage) || availableLanguages[0];

  const handleLanguageSelect = (langCode: string) => {
    setIsLanguageDropdownOpen(false);
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }
  };

  return (
    <footer className={`py-12 border-t border-gray-200 ${bgColor} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">{companyName}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We serve customers worldwide with localized solutions and support. 
              Choose your preferred language to get started.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
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

          {/* Language Selector */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Language
            </h3>
            
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-3 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 w-full max-w-xs"
              >
                <span className="text-lg">{selectedLanguage.flag}</span>
                <span className="flex-1 text-left">{selectedLanguage.name}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <div className="py-2">
                    {availableLanguages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageSelect(language.code)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors duration-200 ${
                          currentLanguage === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{language.flag}</span>
                        <span>{language.name}</span>
                        {currentLanguage === language.code && (
                          <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Select your preferred language
            </p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 sm:mb-0">
              © {year} {companyName}. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-gray-500">
                Available in {availableLanguages.length} languages
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isLanguageDropdownOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsLanguageDropdownOpen(false)}
        />
      )}
    </footer>
  );
};

export default MultiLanguageFooter; 