import React, { useState, useRef, useEffect } from 'react';
import { Notification } from './BasicNotificationDropdown';

interface ActionableNotificationProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onClearAll?: () => void;
  onClickItem?: (notification: Notification) => void;
  onAccept?: (id: string) => void;
  onDeny?: (id: string) => void;
  onView?: (id: string) => void;
  className?: string;
}

export const ActionableNotification: React.FC<ActionableNotificationProps> = ({
  notifications = [],
  onMarkAsRead,
  onClearAll,
  onClickItem,
  onAccept,
  onDeny,
  onView,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [processingAction, setProcessingAction] = useState<string | null>(null);
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

  const handleAction = async (actionType: 'accept' | 'deny' | 'view', notificationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProcessingAction(`${actionType}-${notificationId}`);

    // Simulate async action
    setTimeout(() => {
      switch (actionType) {
        case 'accept':
          onAccept?.(notificationId);
          break;
        case 'deny':
          onDeny?.(notificationId);
          break;
        case 'view':
          onView?.(notificationId);
          break;
      }
      setProcessingAction(null);
    }, 500);
  };

  const handleMarkAsRead = (notification: Notification) => {
    if (!notification.isRead) {
      onMarkAsRead?.(notification.id);
    }
    onClickItem?.(notification);
  };

  const getActionButtons = (notification: Notification) => {
    const baseButtonClass = "px-3 py-1 text-xs font-medium rounded transition-colors";
    const isProcessing = (actionType: string) => processingAction === `${actionType}-${notification.id}`;

    switch (notification.type) {
      case 'warning':
        return (
          <div className="flex space-x-2">
            <button
              onClick={(e) => handleAction('view', notification.id, e)}
              disabled={isProcessing('view')}
              className={`${baseButtonClass} bg-yellow-100 text-yellow-800 hover:bg-yellow-200 disabled:opacity-50`}
            >
              {isProcessing('view') ? 'Loading...' : 'Review'}
            </button>
            <button
              onClick={(e) => handleAction('accept', notification.id, e)}
              disabled={isProcessing('accept')}
              className={`${baseButtonClass} bg-green-100 text-green-800 hover:bg-green-200 disabled:opacity-50`}
            >
              {isProcessing('accept') ? 'Loading...' : 'Acknowledge'}
            </button>
          </div>
        );
      case 'info':
        return (
          <div className="flex space-x-2">
            <button
              onClick={(e) => handleAction('view', notification.id, e)}
              disabled={isProcessing('view')}
              className={`${baseButtonClass} bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50`}
            >
              {isProcessing('view') ? 'Loading...' : 'View Details'}
            </button>
          </div>
        );
      case 'success':
        return (
          <div className="flex space-x-2">
            <button
              onClick={(e) => handleAction('view', notification.id, e)}
              disabled={isProcessing('view')}
              className={`${baseButtonClass} bg-green-100 text-green-800 hover:bg-green-200 disabled:opacity-50`}
            >
              {isProcessing('view') ? 'Loading...' : 'View'}
            </button>
          </div>
        );
      case 'error':
        return (
          <div className="flex space-x-2">
            <button
              onClick={(e) => handleAction('view', notification.id, e)}
              disabled={isProcessing('view')}
              className={`${baseButtonClass} bg-red-100 text-red-800 hover:bg-red-200 disabled:opacity-50`}
            >
              {isProcessing('view') ? 'Loading...' : 'Details'}
            </button>
            <button
              onClick={(e) => handleAction('accept', notification.id, e)}
              disabled={isProcessing('accept')}
              className={`${baseButtonClass} bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50`}
            >
              {isProcessing('accept') ? 'Loading...' : 'Retry'}
            </button>
          </div>
        );
      default:
        return (
          <div className="flex space-x-2">
            <button
              onClick={(e) => handleAction('accept', notification.id, e)}
              disabled={isProcessing('accept')}
              className={`${baseButtonClass} bg-green-100 text-green-800 hover:bg-green-200 disabled:opacity-50`}
            >
              {isProcessing('accept') ? 'Loading...' : 'Accept'}
            </button>
            <button
              onClick={(e) => handleAction('deny', notification.id, e)}
              disabled={isProcessing('deny')}
              className={`${baseButtonClass} bg-red-100 text-red-800 hover:bg-red-200 disabled:opacity-50`}
            >
              {isProcessing('deny') ? 'Loading...' : 'Deny'}
            </button>
          </div>
        );
    }
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
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900">Action Required</h3>
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
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

          {/* Notification List */}
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
                <p>No pending actions</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-4 border-b border-gray-100 ${
                    !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="space-y-3">
                    {/* Notification Content */}
                    <div 
                      onClick={() => handleMarkAsRead(notification)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <h4 className={`font-medium text-sm ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full ml-2 mt-1"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {notification.timestamp.toLocaleString()}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        notification.type === 'warning' 
                          ? 'bg-yellow-100 text-yellow-700'
                          : notification.type === 'error'
                          ? 'bg-red-100 text-red-700'
                          : notification.type === 'success'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {notification.type || 'action'}
                      </span>
                      
                      {getActionButtons(notification)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{notifications.filter(n => !n.isRead).length} items need attention</span>
                <div className="flex items-center space-x-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Click items to mark as read</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 