import React, { useState, useRef, useEffect } from 'react';
import { Notification } from './BasicNotificationDropdown';

interface StickyNotificationBarProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onClearAll?: () => void;
  onClickItem?: (notification: Notification) => void;
  className?: string;
}

export const StickyNotificationBar: React.FC<StickyNotificationBarProps> = ({
  notifications = [],
  onMarkAsRead,
  onClearAll,
  onClickItem,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const latestNotification = notifications.filter(n => !n.isRead)[0] || notifications[0];

  const handleMarkAsRead = (notification: Notification) => {
    if (!notification.isRead) {
      onMarkAsRead?.(notification.id);
    }
    onClickItem?.(notification);
  };

  const handleToggleExpanded = () => {
    if (isMinimized) {
      setIsMinimized(false);
    }
    setIsExpanded(!isExpanded);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
    setIsMinimized(true);
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      {/* Sticky Notification Bar */}
      <div 
        className={`bg-white border-b border-gray-200 shadow-sm transition-all duration-300 ${
          isMinimized ? 'h-12' : isExpanded ? 'h-auto max-h-96' : 'h-16'
        }`}
        ref={barRef}
      >
        {/* Main Bar Content */}
        <div 
          className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={handleToggleExpanded}
        >
          <div className="flex items-center space-x-3">
            {/* Bell Icon */}
            <div className="relative">
              <svg 
                className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${
                  unreadCount > 0 ? 'animate-pulse' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
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
            </div>

            {/* Content */}
            {!isMinimized && (
              <div className="flex-1 min-w-0">
                {unreadCount > 0 ? (
                  <div>
                    <h4 className="font-medium text-sm text-gray-900 truncate">
                      {latestNotification?.title || 'New notification'}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-medium text-sm text-gray-700">All caught up!</h4>
                    <p className="text-xs text-gray-500">No new notifications</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {!isMinimized && notifications.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClearAll?.();
                }}
                className="text-xs text-blue-600 hover:text-blue-800 transition-colors px-2 py-1 rounded hover:bg-blue-50"
              >
                Clear all
              </button>
            )}
            
            <button
              onClick={handleMinimize}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Minimize"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>

            {!isMinimized && (
              <button
                onClick={handleToggleExpanded}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label={isExpanded ? "Collapse" : "Expand"}
              >
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Expanded Notification List */}
        {isExpanded && !isMinimized && (
          <div className="border-t border-gray-200 max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <svg className="w-8 h-8 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9z"
                  />
                </svg>
                <p className="text-sm">No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleMarkAsRead(notification)}
                  className={`px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      !notification.isRead ? 'bg-blue-600' : 'bg-gray-300'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium text-sm ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {notification.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Spacer to prevent content from being hidden behind sticky bar */}
      <div className={`transition-all duration-300 ${
        isMinimized ? 'h-12' : isExpanded ? 'h-auto' : 'h-16'
      }`}></div>
    </div>
  );
}; 