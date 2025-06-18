import React, { useState, useRef, useEffect } from 'react';
import { Notification } from './BasicNotificationDropdown';

interface DarkModeNotificationProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onClearAll?: () => void;
  onClickItem?: (notification: Notification) => void;
  className?: string;
  isDark?: boolean;
}

export const DarkModeNotification: React.FC<DarkModeNotificationProps> = ({
  notifications = [],
  onMarkAsRead,
  onClearAll,
  onClickItem,
  className = '',
  isDark = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAsRead = (notification: Notification) => {
    if (!notification.isRead) {
      onMarkAsRead?.(notification.id);
    }
    onClickItem?.(notification);
  };

  const getTypeIcon = (type?: string) => {
    const iconClass = isDark ? 'text-gray-300' : 'text-gray-600';
    
    switch (type) {
      case 'warning':
        return (
          <div className={`${isDark ? 'bg-yellow-900' : 'bg-yellow-100'} p-2 rounded-full`}>
            <svg className={`w-4 h-4 ${isDark ? 'text-yellow-300' : 'text-yellow-600'}`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case 'success':
        return (
          <div className={`${isDark ? 'bg-green-900' : 'bg-green-100'} p-2 rounded-full`}>
            <svg className={`w-4 h-4 ${isDark ? 'text-green-300' : 'text-green-600'}`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className={`${isDark ? 'bg-red-900' : 'bg-red-100'} p-2 rounded-full`}>
            <svg className={`w-4 h-4 ${isDark ? 'text-red-300' : 'text-red-600'}`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case 'info':
        return (
          <div className={`${isDark ? 'bg-blue-900' : 'bg-blue-100'} p-2 rounded-full`}>
            <svg className={`w-4 h-4 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} p-2 rounded-full`}>
            <svg className={`w-4 h-4 ${iconClass}`} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-full transition-colors duration-200 ${
          isDark 
            ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
        }`}
        aria-label="Open notifications"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.73 21a2 2 0 01-3.46 0"
          />
        </svg>
        
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg border z-50 ${
          isDark 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          {/* Header */}
          <div className={`px-4 py-3 border-b flex items-center justify-between ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Notifications
            </h3>
            {notifications.length > 0 && (
              <button
                onClick={onClearAll}
                className={`text-sm transition-colors ${
                  isDark 
                    ? 'text-blue-400 hover:text-blue-300' 
                    : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                Clear all
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className={`px-4 py-8 text-center ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <svg className={`w-12 h-12 mx-auto mb-4 ${
                  isDark ? 'text-gray-600' : 'text-gray-300'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9z"
                  />
                </svg>
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleMarkAsRead(notification)}
                  className={`px-4 py-3 border-b cursor-pointer transition-colors flex space-x-3 ${
                    isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'
                  } ${
                    !notification.isRead 
                      ? isDark 
                        ? 'bg-gray-750 border-l-4 border-l-blue-400' 
                        : 'bg-blue-50 border-l-4 border-l-blue-500'
                      : ''
                  }`}
                >
                  {/* Type Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getTypeIcon(notification.type)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium text-sm ${
                      !notification.isRead 
                        ? isDark ? 'text-white' : 'text-gray-900'
                        : isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {notification.title}
                    </h4>
                    <p className={`text-sm mt-1 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {notification.message}
                    </p>
                    <p className={`text-xs mt-2 ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {notification.timestamp.toLocaleString()}
                    </p>
                  </div>
                  
                  {/* Unread indicator */}
                  {!notification.isRead && (
                    <div className="flex-shrink-0 mt-2">
                      <div className={`w-2 h-2 rounded-full ${
                        isDark ? 'bg-blue-400' : 'bg-blue-600'
                      }`}></div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 