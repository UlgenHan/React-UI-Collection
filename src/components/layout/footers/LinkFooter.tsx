import React from 'react';
import { NavItem } from '../../../types';

export interface LinkColumn {
  title: string;
  links: NavItem[];
}

export interface LinkFooterProps {
  columns?: LinkColumn[];
  companyName?: string;
  year?: number;
  bgColor?: string;
  className?: string;
}

const LinkFooter: React.FC<LinkFooterProps> = ({
  columns = [],
  companyName = 'Your Company',
  year = new Date().getFullYear(),
  bgColor = 'bg-white',
  className = ''
}) => {
  const defaultColumns: LinkColumn[] = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Blog', href: '/blog' },
        { label: 'Press', href: '/press' }
      ]
    },
    {
      title: 'Products',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'API', href: '/api' },
        { label: 'Documentation', href: '/docs' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Status', href: '/status' },
        { label: 'Community', href: '/community' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'GDPR', href: '/gdpr' }
      ]
    }
  ];

  const footerColumns = columns.length > 0 ? columns : defaultColumns;

  return (
    <footer className={`py-12 border-t border-gray-200 ${bgColor} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerColumns.map((column, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
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
          ))}
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            © {year} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LinkFooter; 