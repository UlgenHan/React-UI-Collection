import React from 'react';
import { NavItem, LogoProps } from '../../../types';

export interface SidebarWithUserProfileProps {
  logo?: LogoProps;
  navItems?: NavItem[];
  userProfile?: {
    name: string;
    email?: string;
    avatar?: string;
    role?: string;
    status?: 'online' | 'offline' | 'away';
  };
  quickActions?: {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    href?: string;
    variant?: 'primary' | 'secondary';
  }[];
  bgColor?: string;
  className?: string;
}

const SidebarWithUserProfile: React.FC<SidebarWithUserProfileProps> = ({
  logo = { text: 'Logo' },
  navItems = [],
  userProfile = { name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Product Manager', status: 'online' },
  quickActions = [],
  bgColor = 'bg-white',
  className = ''
}) => {
  const defaultQuickActions = [
    {
      label: 'Profile',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      href: '/profile',
      variant: 'secondary' as const,
      onClick: undefined
    },
    {
      label: 'Messages',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      href: '/messages',
      variant: 'primary' as const,
      onClick: undefined
    }
  ];

  const actions = quickActions.length > 0 ? quickActions : defaultQuickActions;

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-400';
      case 'away':
        return 'bg-yellow-400';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className={`fixed left-0 top-0 h-screen w-64 ${bgColor} border-r border-gray-200 shadow-sm z-40 ${className}`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
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

        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="text-center">
            {/* Avatar */}
            <div className="relative inline-block mb-4">
              {userProfile.avatar ? (
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-16 h-16 rounded-full object-cover mx-auto"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-lg">
                    {userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
              )}
              
              {/* Status indicator */}
              {userProfile.status && (
                <div className={`absolute bottom-1 right-1 w-4 h-4 ${getStatusColor(userProfile.status)} rounded-full border-2 border-white`}></div>
              )}
            </div>

            {/* User Info */}
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {userProfile.name}
            </h3>
            {userProfile.role && (
              <p className="text-sm text-blue-600 font-medium mb-1">
                {userProfile.role}
              </p>
            )}
            {userProfile.email && (
              <p className="text-xs text-gray-500 mb-4">
                {userProfile.email}
              </p>
            )}

            {/* Quick Actions */}
            <div className="flex space-x-2 justify-center">
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
                  className={`
                    inline-flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-colors duration-200
                    ${action.variant === 'primary' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {action.icon && (
                    <span className="mr-1">
                      {action.icon}
                    </span>
                  )}
                  {action.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
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

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            © 2024 {logo.text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarWithUserProfile; 