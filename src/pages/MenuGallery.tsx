import React from 'react';
import {
  BasicDropdown,
  ClickDropdown,
  AvatarMenu,
  IconMenu,
  MultiLevelMenu,
  MegaMenu,
  NotificationMenu,
  ContextMenu,
  SearchableMenu,
  PopoverMenu
} from '../components/ui/menus';

const MenuGallery: React.FC = () => {
  const menuComponents = [
    {
      name: 'BasicDropdown',
      description: 'Simple hover-based dropdown with links',
      features: ['Hover activation', 'Position control', 'Icon support', 'Disabled items'],
      component: BasicDropdown
    },
    {
      name: 'ClickDropdown',
      description: 'Toggle dropdown on click with animation',
      features: ['Click activation', 'Smooth animations', 'Click outside to close', 'Auto-close options'],
      component: ClickDropdown
    },
    {
      name: 'AvatarMenu',
      description: 'User avatar with account actions',
      features: ['User info display', 'Avatar/initials', 'Account actions', 'Danger actions'],
      component: AvatarMenu
    },
    {
      name: 'IconMenu',
      description: 'Icon-only menu items for compact UIs',
      features: ['Grid layout', 'Badge support', 'Icon focus', 'Configurable columns'],
      component: IconMenu
    },
    {
      name: 'MultiLevelMenu',
      description: 'Dropdown with nested submenus',
      features: ['Hierarchical structure', 'Expand/collapse', 'Deep nesting', 'Keyboard navigation'],
      component: MultiLevelMenu
    },
    {
      name: 'MegaMenu',
      description: 'Wide dropdown with grouped categories',
      features: ['Multi-column layout', 'Category grouping', 'Rich content', 'Hover activation'],
      component: MegaMenu
    },
    {
      name: 'NotificationMenu',
      description: 'Bell icon with notification list',
      features: ['Unread badges', 'Mark as read', 'Rich notifications', 'Action buttons'],
      component: NotificationMenu
    },
    {
      name: 'ContextMenu',
      description: 'Right-click context menu',
      features: ['Right-click activation', 'Smart positioning', 'Keyboard shortcuts', 'Escape to close'],
      component: ContextMenu
    },
    {
      name: 'SearchableMenu',
      description: 'Search input to filter menu items',
      features: ['Real-time search', 'Highlight matches', 'Keyword matching', 'Empty states'],
      component: SearchableMenu
    },
    {
      name: 'PopoverMenu',
      description: 'Tooltip-like menu positioning',
      features: ['Smart placement', 'Arrow indicators', 'Auto-adjustment', 'Offset control'],
      component: PopoverMenu
    }
  ];

  const sampleItems = [
    { label: 'Profile', href: '#', icon: <span>👤</span> },
    { label: 'Settings', href: '#', icon: <span>⚙️</span> },
    { label: 'Help', href: '#', icon: <span>❓</span> },
    { label: 'Logout', href: '#', icon: <span>🚪</span>, danger: true }
  ];

  const sampleUser = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: ''
  };

  const sampleNotifications = [
    {
      id: '1',
      title: 'New message',
      message: 'You have a new message from Sarah',
      timestamp: new Date().toISOString(),
      read: false,
      type: 'info' as const
    },
    {
      id: '2',
      title: 'Update available',
      message: 'A new version is available for download',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: true,
      type: 'success' as const
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Menu Components Gallery</h1>
          <p className="text-lg text-gray-600 mb-6">
            Explore our collection of 10 interactive menu components designed for modern web applications.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Total Components</h3>
              <p className="text-2xl font-bold text-blue-600">{menuComponents.length}</p>
              <p className="text-sm text-gray-500">Menu variants</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-2">⚡ TypeScript</h3>
              <p className="text-2xl font-bold text-green-600">100%</p>
              <p className="text-sm text-gray-500">Type coverage</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-2">📱 Responsive</h3>
              <p className="text-2xl font-bold text-purple-600">✓</p>
              <p className="text-sm text-gray-500">Mobile ready</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {menuComponents.map((menu, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{menu.name}</h3>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Available
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{menu.description}</p>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                <ul className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                  {menu.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-center h-20">
                  {menu.name === 'BasicDropdown' && (
                    <BasicDropdown
                      trigger={<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Basic Menu ▼</button>}
                      items={sampleItems}
                    />
                  )}
                  {menu.name === 'ClickDropdown' && (
                    <ClickDropdown
                      trigger={<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Click Menu ▼</button>}
                      items={sampleItems}
                    />
                  )}
                  {menu.name === 'AvatarMenu' && (
                    <AvatarMenu
                      user={sampleUser}
                      items={sampleItems}
                    />
                  )}
                  {menu.name === 'IconMenu' && (
                    <IconMenu
                      trigger={<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Icons ⋯</button>}
                      items={sampleItems.map(item => ({ ...item, icon: item.icon }))}
                    />
                  )}
                  {menu.name === 'MultiLevelMenu' && (
                    <MultiLevelMenu
                      trigger={<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Multi-level ▼</button>}
                      items={[
                        { label: 'Level 1', children: sampleItems },
                        { label: 'Simple Item', onClick: () => {} }
                      ]}
                    />
                  )}
                  {menu.name === 'MegaMenu' && (
                    <MegaMenu
                      trigger={<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Mega Menu ▼</button>}
                      categories={[
                        { title: 'Account', items: sampleItems.slice(0, 2) },
                        { title: 'Support', items: sampleItems.slice(2) }
                      ]}
                    />
                  )}
                  {menu.name === 'NotificationMenu' && (
                    <NotificationMenu
                      notifications={sampleNotifications}
                    />
                  )}
                  {menu.name === 'ContextMenu' && (
                    <ContextMenu
                      items={sampleItems}
                    >
                      <div className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
                        Right-click me
                      </div>
                    </ContextMenu>
                  )}
                  {menu.name === 'SearchableMenu' && (
                    <SearchableMenu
                      trigger={<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Search Menu 🔍</button>}
                      items={sampleItems}
                    />
                  )}
                  {menu.name === 'PopoverMenu' && (
                    <PopoverMenu
                      trigger={<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Popover Menu</button>}
                      items={sampleItems}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Integration Example</h2>
          <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
            <pre>{`import { BasicDropdown, AvatarMenu } from '@/components/ui/menus';

const MyComponent = () => {
  const menuItems = [
    { label: 'Profile', href: '/profile' },
    { label: 'Settings', onClick: () => openSettings() },
    { label: 'Logout', onClick: () => logout(), danger: true }
  ];

  return (
    <BasicDropdown 
      trigger={<button>Menu</button>}
      items={menuItems}
      position="right"
    />
  );
};`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuGallery; 