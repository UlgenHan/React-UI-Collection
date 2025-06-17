import React from 'react';
import { NavItem, LogoProps } from '../../../types';

export interface SidebarWithHeaderFooterProps {
  logo?: LogoProps;
  navItems?: NavItem[];
  userInfo?: {
    name: string;
    email?: string;
    avatar?: string;
    role?: string;
  };
  footerActions?: {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    href?: string;
  }[];
  bgColor?: string;
  className?: string;
}

const SidebarWithHeaderFooter: React.FC<SidebarWithHeaderFooterProps> = ({
  logo = { text: 'Logo' },
  navItems = [],
  userInfo = { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  footerActions = [],
  bgColor = 'bg-white',
  className = ''
}) => {
  const defaultFooterActions = [
    {
      label: 'Settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      href: '/settings'
    },
    {
      label: 'Logout',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      onClick: () => console.log('Logout clicked')
    }
  ];

  const actions = footerActions.length > 0 ? footerActions : defaultFooterActions;

  return (
    <div className={`fixed left-0 top-0 h-screen w-64 ${bgColor} border-r border-gray-200 shadow-sm z-40 ${className}`}>
      <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className="border-b border-gray-200 p-4">
          {/* Logo */}
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2">
              {logo.image ? (
                <img src={logo.image} alt={logo.alt || 'Logo'} className="h-8 w-auto" />
              ) : (
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {logo.text?.charAt(0) || 'L'}
                  </span>
                </div>
              )}
              <span className="text-xl font-semibold text-gray-900">{logo.text}</span>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {userInfo.avatar ? (
                  <img
                    src={userInfo.avatar}
                    alt={userInfo.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-sm">
                      {userInfo.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {userInfo.name}
                </p>
                {userInfo.email && (
                  <p className="text-xs text-gray-500 truncate">
                    {userInfo.email}
                  </p>
                )}
                {userInfo.role && (
                  <p className="text-xs text-blue-600 font-medium">
                    {userInfo.role}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                    ${item.isActive 
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Section */}
        <div className="border-t border-gray-200 p-4">
          <div className="space-y-2">
            {actions.map((action, index) => (
              <a
                key={index}
                href={action.href}
                onClick={(e) => {
                  if (action.onClick) {
                    e.preventDefault();
                    action.onClick();
                  }
                }}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
              >
                {action.icon && (
                  <div className="flex-shrink-0 mr-3 text-gray-400">
                    {action.icon}
                  </div>
                )}
                {action.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-500 text-center">
              © 2024 {logo.text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarWithHeaderFooter; 