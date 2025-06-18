import React, { useState, useRef, useEffect } from 'react';
import { Notification } from './BasicNotificationDropdown';

interface GroupedNotificationsProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onClearAll?: () => void;
  onClickItem?: (notification: Notification) => void;
  className?: string;
}

export const GroupedNotifications: React.FC<GroupedNotificationsProps> = ({
  notifications = [],
  onMarkAsRead,
  onClearAll,
  onClickItem,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Group notifications by type
  const groupedNotifications = notifications.reduce((groups, notification) => {
    const type = notification.type || 'general';
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);

  const getGroupIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  const getGroupLabel = (type: string) => {
    switch (type) {
      case 'warning':
        return 'Warnings';
      case 'success':
        return 'Success';
      case 'error':
        return 'Errors';
      case 'info':
        return 'Information';
      default:
        return 'General';
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveGroup(null);
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

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors duration-200"
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
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {activeGroup && (
                <button
                  onClick={() => setActiveGroup(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <h3 className="text-lg font-semibold text-gray-900">
                {activeGroup ? getGroupLabel(activeGroup) : 'Notifications'}
              </h3>
            </div>
            {notifications.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Content */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9z"
                  />
                </svg>
                <p>No notifications yet</p>
              </div>
            ) : activeGroup ? (
              // Show notifications for active group
              groupedNotifications[activeGroup]?.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleMarkAsRead(notification)}
                  className={`px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <h4 className={`font-medium text-sm ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                    {notification.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {notification.timestamp.toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              // Show groups
              Object.entries(groupedNotifications).map(([type, groupNotifications]) => {
                const unreadInGroup = groupNotifications.filter(n => !n.isRead).length;
                return (
                  <div
                    key={type}
                    onClick={() => setActiveGroup(type)}
                    className="px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{getGroupIcon(type)}</span>
                      <div>
                        <h4 className="font-medium text-sm text-gray-900">{getGroupLabel(type)}</h4>
                        <p className="text-xs text-gray-500">
                          {groupNotifications.length} notification{groupNotifications.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {unreadInGroup > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {unreadInGroup}
                        </span>
                      )}
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 