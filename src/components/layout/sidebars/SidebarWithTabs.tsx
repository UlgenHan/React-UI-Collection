import React, { useState } from 'react';
import { NavItem, LogoProps } from '../../../types';

export interface SidebarWithTabsProps {
  logo?: LogoProps;
  tabs?: TabItem[];
  bgColor?: string;
  className?: string;
}

export interface TabItem {
  id: string;
  label: string;
  navItems: NavItem[];
  icon?: React.ReactNode;
}

const SidebarWithTabs: React.FC<SidebarWithTabsProps> = ({
  logo = { text: 'Logo' },
  tabs = [],
  bgColor = 'bg-white',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<string>(tabs.length > 0 ? tabs[0].id : '');

  const defaultTabs: TabItem[] = [
    {
      id: 'main',
      label: 'Main',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      navItems: [
        { label: 'Dashboard', href: '/dashboard', isActive: true },
        { label: 'Analytics', href: '/analytics' },
        { label: 'Reports', href: '/reports' },
        { label: 'Calendar', href: '/calendar' }
      ]
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      navItems: [
        { label: 'Users', href: '/admin/users' },
        { label: 'Roles', href: '/admin/roles' },
        { label: 'Settings', href: '/admin/settings' },
        { label: 'Security', href: '/admin/security' }
      ]
    }
  ];

  const tabItems = tabs.length > 0 ? tabs : defaultTabs;
  const currentTab = tabItems.find(tab => tab.id === activeTab) || tabItems[0];

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

        {/* Tabs */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${activeTab === tab.id 
                    ? 'bg-white text-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                {tab.icon && (
                  <span className="mr-1">
                    {tab.icon}
                  </span>
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation for Active Tab */}
        <nav className="flex-1 py-4">
          <div className="px-4 mb-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {currentTab.label} Navigation
            </h3>
          </div>
          
          <ul className="space-y-1 px-4">
            {currentTab.navItems.map((item, index) => (
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

        {/* Footer with active tab indicator */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">Active View:</span>
            <span className="text-xs font-medium text-blue-600">{currentTab.label}</span>
          </div>
          <div className="text-xs text-gray-500 text-center">
            © 2024 {logo.text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarWithTabs; 