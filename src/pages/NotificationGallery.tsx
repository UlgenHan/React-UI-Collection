import React, { useState } from 'react';
import {
  BasicNotificationDropdown,
  GroupedNotifications,
  NotificationWithIcons,
  SlidingDropdown,
  FullPageNotificationPanel,
  StickyNotificationBar,
  DarkModeNotification,
  NotificationWithTime,
  ActionableNotification,
  InteractiveNotificationCenter,
  type NotificationCenterItem
} from '../components/ui/notifications';

const NotificationGallery: React.FC = () => {
  // Sample notification data
  const [notifications, setNotifications] = useState<NotificationCenterItem[]>([
    {
      id: '1',
      title: 'Welcome to the platform!',
      message: 'Your account has been successfully created. Start exploring our features.',
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      isRead: false,
      type: 'success'
    },
    {
      id: '2',
      title: 'Security Alert',
      message: 'New login detected from Chrome on Windows. Was this you?',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      isRead: false,
      type: 'warning'
    },
    {
      id: '3',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight from 2 AM to 4 AM UTC.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRead: true,
      type: 'info'
    },
    {
      id: '4',
      title: 'Payment Failed',
      message: 'Your latest payment could not be processed. Please update your payment method.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false,
      type: 'error'
    },
    {
      id: '5',
      title: 'Profile Updated',
      message: 'Your profile information has been successfully updated.',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      isRead: true,
      type: 'success'
    },
    {
      id: '6',
      title: 'New Feature Available',
      message: 'Check out our new dashboard analytics feature. Click here to learn more.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      isRead: false,
      type: 'info'
    }
  ]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleAccept = (id: string) => {
    console.log('Accepted notification:', id);
    handleMarkAsRead(id);
  };

  const handleDeny = (id: string) => {
    console.log('Denied notification:', id);
    handleMarkAsRead(id);
  };

  const handleView = (id: string) => {
    console.log('Viewed notification:', id);
    handleMarkAsRead(id);
  };

  const handleClickItem = (notification: NotificationCenterItem) => {
    console.log('Clicked notification:', notification);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Notification Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            10 distinct notification dropdown components with different styles and functionality. 
            Click any bell icon to see the notifications in action!
          </p>
          
          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-lg mx-auto">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-2xl font-bold text-blue-600">10</div>
              <div className="text-sm text-gray-500">Components</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-2xl font-bold text-green-600">{notifications.length}</div>
              <div className="text-sm text-gray-500">Sample Notifications</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-2xl font-bold text-red-600">{notifications.filter(n => !n.isRead).length}</div>
              <div className="text-sm text-gray-500">Unread</div>
            </div>
          </div>
        </div>

        {/* Component Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 1. Basic Notification Dropdown */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Basic Dropdown</h3>
              <BasicNotificationDropdown
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onClearAll={handleClearAll}
                onClickItem={handleClickItem}
              />
            </div>
            <p className="text-sm text-gray-600">
              Minimal notification dropdown with unread badge and clean notification list.
            </p>
          </div>

          {/* 2. Grouped Notifications */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Grouped</h3>
              <GroupedNotifications
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onClearAll={handleClearAll}
                onClickItem={handleClickItem}
              />
            </div>
            <p className="text-sm text-gray-600">
              Groups notifications by type (info, warning, success, error) with navigation.
            </p>
          </div>

          {/* 3. Notification With Icons */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">With Icons</h3>
              <NotificationWithIcons
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onClearAll={handleClearAll}
                onClickItem={handleClickItem}
              />
            </div>
            <p className="text-sm text-gray-600">
              Each notification type has its own colored icon with visual indicators.
            </p>
          </div>

          {/* 4. Sliding Dropdown */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Sliding Animation</h3>
              <SlidingDropdown
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onClearAll={handleClearAll}
                onClickItem={handleClickItem}
              />
            </div>
            <p className="text-sm text-gray-600">
              Smooth slide-down animations with staggered item animations.
            </p>
          </div>

          {/* 5. Full Page Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Full Page Panel</h3>
              <FullPageNotificationPanel
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onClearAll={handleClearAll}
                onClickItem={handleClickItem}
              />
            </div>
            <p className="text-sm text-gray-600">
              Expands into full-screen modal panel. Click the expand icon in the dropdown.
            </p>
          </div>

          {/* 6. Notification With Time */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Time Focus</h3>
              <NotificationWithTime
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onClearAll={handleClearAll}
                onClickItem={handleClickItem}
              />
            </div>
            <p className="text-sm text-gray-600">
              Prominent relative timestamps with color-coded time badges.
            </p>
          </div>

          {/* 7. Dark Mode */}
          <div className="bg-gray-900 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Dark Mode</h3>
              <DarkModeNotification
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onClearAll={handleClearAll}
                onClickItem={handleClickItem}
                isDark={true}
              />
            </div>
            <p className="text-sm text-gray-300">
              Full dark theme support with proper contrast and styling.
            </p>
          </div>

          {/* 8. Actionable Notifications */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Actionable</h3>
              <ActionableNotification
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onClearAll={handleClearAll}
                onClickItem={handleClickItem}
                onAccept={handleAccept}
                onDeny={handleDeny}
                onView={handleView}
              />
            </div>
            <p className="text-sm text-gray-600">
              Action buttons (View, Accept, Deny) based on notification type.
            </p>
          </div>

          {/* 9. Interactive Center */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Interactive Center</h3>
              <InteractiveNotificationCenter
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onClearAll={handleClearAll}
                onClickItem={handleClickItem}
              />
            </div>
            <p className="text-sm text-gray-600">
              Complete center with search, filters, mark all as read, and live stats.
            </p>
          </div>
        </div>

        {/* Sticky Bar Demo Section */}
        <div className="mt-16">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sticky Notification Bar</h3>
            <p className="text-sm text-gray-600 mb-4">
              The sticky notification bar is positioned at the top of the page. Look for it above this content!
            </p>
            <div className="bg-gray-100 rounded-lg p-4">
              <StickyNotificationBar
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onClearAll={handleClearAll}
                onClickItem={handleClickItem}
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Features & Capabilities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">📱 Responsive Design</h3>
              <p className="text-sm text-gray-600">All components work seamlessly on mobile and desktop</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">♿ Accessibility</h3>
              <p className="text-sm text-gray-600">ARIA labels, keyboard navigation, screen reader support</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">🎨 Customizable</h3>
              <p className="text-sm text-gray-600">Tailwind CSS styling with theme support</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">⚡ Interactive</h3>
              <p className="text-sm text-gray-600">Click handlers, state management, real-time updates</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">🔍 Advanced Features</h3>
              <p className="text-sm text-gray-600">Search, filtering, grouping, full-page views</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">📊 Smart Indicators</h3>
              <p className="text-sm text-gray-600">Unread badges, type-specific colors, timestamps</p>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Use</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• Click any bell icon to open the notification dropdown</p>
            <p>• Try clicking on notifications to mark them as read</p>
            <p>• Use "Clear all" or "Mark all as read" buttons to manage notifications</p>
            <p>• Test different notification types and interactive features</p>
            <p>• The sticky bar demo shows a persistent notification interface</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationGallery; 