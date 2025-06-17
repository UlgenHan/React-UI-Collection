import React, { useState } from 'react';
import { HeaderBaseProps } from '../../../types';

export interface HeaderWithNotificationProps extends HeaderBaseProps {
  notificationCount?: number;
  showAlert?: boolean;
  alertMessage?: string;
}

const HeaderWithNotification: React.FC<HeaderWithNotificationProps> = ({
  logo = { text: 'Notify' },
  navItems = [],
  notificationCount = 3,
  showAlert = true,
  alertMessage = 'New updates available!',
  sticky = false,
  bgColor = 'bg-white',
  className = '',
  id
}) => {
  const [isAlertVisible, setIsAlertVisible] = useState(showAlert);

  return (
    <>
      {/* Alert Banner */}
      {isAlertVisible && (
        <div className="bg-blue-600 text-white px-4 py-2 text-center text-sm">
          <span>{alertMessage}</span>
          <button 
            onClick={() => setIsAlertVisible(false)}
            className="ml-4 text-blue-200 hover:text-white"
          >
            ×
          </button>
        </div>
      )}

      <header id={id} className={`${bgColor} ${sticky ? 'sticky top-0 z-50' : ''} shadow-sm ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold text-gray-900">{logo?.text}</div>
            
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`text-sm font-medium ${item.isActive ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19H6.5A2.5 2.5 0 014 16.5v-9A2.5 2.5 0 016.5 5h9A2.5 2.5 0 0118 7.5V11" />
                </svg>
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
              
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderWithNotification; 