import React, { useState, useRef, useEffect } from 'react';
import { Notification } from './BasicNotificationDropdown';

interface FullPageNotificationPanelProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onClearAll?: () => void;
  onClickItem?: (notification: Notification) => void;
  className?: string;
}

export const FullPageNotificationPanel: React.FC<FullPageNotificationPanelProps> = ({
  notifications = [],
  onMarkAsRead,
  onClearAll,
  onClickItem,
  className = ''
}) => {
  const [isFullPage, setIsFullPage] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Close dropdown when clicking outside (only when not in full page mode)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isFullPage && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFullPage]);

  // Prevent body scroll when full page is open
  useEffect(() => {
    if (isFullPage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFullPage]);

  const handleMarkAsRead = (notification: Notification) => {
    if (!notification.isRead) {
      onMarkAsRead?.(notification.id);
    }
    onClickItem?.(notification);
  };

  const handleExpandToFullPage = () => {
    setIsDropdownOpen(false);
    setIsFullPage(true);
  };

  const handleCloseFullPage = () => {
    setIsFullPage(false);
  };

  const NotificationList = ({ isFullPageMode = false }: { isFullPageMode?: boolean }) => (
    <div className={`${isFullPageMode ? 'h-full' : 'max-h-96'} overflow-y-auto`}>
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
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => handleMarkAsRead(notification)}
            className={`px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
            } ${isFullPageMode ? 'py-4' : ''}`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${!notification.isRead ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <div className="flex-1">
                <h4 className={`font-medium text-sm ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                  {notification.title}
                </h4>
                <p className={`text-sm text-gray-600 mt-1 ${isFullPageMode ? 'text-base' : ''}`}>
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {notification.timestamp.toLocaleString()}
                </p>
              </div>
              {!notification.isRead && (
                <div className="flex-shrink-0">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <>
      <div className={`relative ${className}`} ref={dropdownRef}>
        {/* Bell Icon Button */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleExpandToFullPage}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  title="Expand to full page"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                </button>
                {notifications.length > 0 && (
                  <button
                    onClick={onClearAll}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>

            <NotificationList />
          </div>
        )}
      </div>

      {/* Full Page Overlay */}
      {isFullPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-full max-h-screen flex flex-col">
            {/* Full Page Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50 rounded-t-lg">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9z"
                  />
                </svg>
                <h2 className="text-xl font-semibold text-gray-900">All Notifications</h2>
                <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full">
                  {notifications.length} total
                </span>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                    {unreadCount} unread
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-3">
                {notifications.length > 0 && (
                  <button
                    onClick={onClearAll}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={handleCloseFullPage}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close full page view"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Full Page Content */}
            <div className="flex-1 overflow-hidden">
              <NotificationList isFullPageMode={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 