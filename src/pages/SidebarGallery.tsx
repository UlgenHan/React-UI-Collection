import React from 'react';
import { useNavigation } from '../App';
import {
  BasicSidebar,
  CollapsibleSidebar,
  SidebarWithIcons,
  SidebarWithHeaderFooter,
  SidebarWithUserProfile,
  SidebarWithSubmenus,
  HoverExpandSidebar,
  SidebarWithTabs,
  RightAlignedSidebar,
  SidebarWithDarkMode,
  SlideInMenuSidebar
} from '../components/layout/sidebars';

const SidebarGallery: React.FC = () => {
  const { navigateTo } = useNavigation();

  const sampleNavItems = [
    { label: 'Dashboard', href: '/dashboard', isActive: true },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Projects', href: '/projects' },
    { label: 'Team', href: '/team' },
    { label: 'Settings', href: '/settings' }
  ];

  const sampleNavItemsWithIcons = [
    { label: 'Dashboard', href: '/dashboard', iconType: 'dashboard' as const, isActive: true },
    { label: 'Users', href: '/users', iconType: 'users' as const },
    { label: 'Analytics', href: '/analytics', iconType: 'analytics' as const },
    { label: 'Documents', href: '/documents', iconType: 'documents' as const },
    { label: 'Messages', href: '/messages', iconType: 'messages' as const },
    { label: 'Settings', href: '/settings', iconType: 'settings' as const }
  ];

  const sampleNavItemsWithSubmenus = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      isActive: true,
      submenu: [
        { label: 'Overview', href: '/dashboard/overview', isActive: true },
        { label: 'Analytics', href: '/dashboard/analytics' },
        { label: 'Reports', href: '/dashboard/reports' }
      ]
    },
    {
      label: 'Projects',
      href: '/projects',
      submenu: [
        { label: 'All Projects', href: '/projects/all' },
        { label: 'Active', href: '/projects/active' },
        { label: 'Completed', href: '/projects/completed' }
      ]
    },
    {
      label: 'Team',
      href: '/team',
      submenu: [
        { label: 'Members', href: '/team/members' },
        { label: 'Roles', href: '/team/roles' },
        { label: 'Permissions', href: '/team/permissions' }
      ]
    }
  ];

  const sidebars = [
    {
      id: 'basic',
      name: 'Basic Sidebar',
      description: 'Simple vertical navigation with clean design',
      component: (
        <BasicSidebar
          logo={{ text: 'Basic' }}
          navItems={sampleNavItems}
          className="relative"
        />
      )
    },
    {
      id: 'collapsible',
      name: 'Collapsible Sidebar',
      description: 'Toggle to expand/collapse with smooth animations',
      component: (
        <CollapsibleSidebar
          logo={{ text: 'Collapsible' }}
          navItems={sampleNavItemsWithIcons}
          defaultCollapsed={false}
          className="relative"
        />
      )
    },
    {
      id: 'with-icons',
      name: 'Sidebar with Icons',
      description: 'Enhanced navigation with icons and tooltips',
      component: (
        <SidebarWithIcons
          logo={{ text: 'Icons' }}
          navItems={sampleNavItemsWithIcons}
          className="relative"
        />
      )
    },
    {
      id: 'header-footer',
      name: 'Header & Footer Sidebar',
      description: 'Organized layout with distinct sections',
      component: (
        <SidebarWithHeaderFooter
          logo={{ text: 'Layout' }}
          navItems={sampleNavItems}
          userInfo={{
            name: 'John Doe',
            email: 'john@example.com',
            role: 'Admin'
          }}
          className="relative"
        />
      )
    },
    {
      id: 'user-profile',
      name: 'User Profile Sidebar',
      description: 'Prominent user profile with quick actions',
      component: (
        <SidebarWithUserProfile
          logo={{ text: 'Profile' }}
          navItems={sampleNavItems}
          userProfile={{
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            role: 'Product Manager',
            status: 'online'
          }}
          className="relative"
        />
      )
    },
    {
      id: 'submenus',
      name: 'Sidebar with Submenus',
      description: 'Expandable navigation with nested items',
      component: (
        <SidebarWithSubmenus
          logo={{ text: 'Nested' }}
          navItems={sampleNavItemsWithSubmenus}
          className="relative"
        />
      )
    },
    {
      id: 'hover-expand',
      name: 'Hover Expand Sidebar',
      description: 'Space-saving design that expands on hover',
      component: (
        <HoverExpandSidebar
          logo={{ text: 'Hover' }}
          navItems={sampleNavItemsWithIcons}
          className="relative"
        />
      )
    },
    {
      id: 'tabs',
      name: 'Sidebar with Tabs',
      description: 'Switchable content sections with tabs',
      component: (
        <SidebarWithTabs
          logo={{ text: 'Tabs' }}
          className="relative"
        />
      )
    },
    {
      id: 'right-aligned',
      name: 'Right Aligned Sidebar',
      description: 'Navigation positioned on the right side',
      component: (
        <RightAlignedSidebar
          logo={{ text: 'Right' }}
          navItems={sampleNavItems}
          className="relative"
        />
      )
    },
    {
      id: 'dark-mode',
      name: 'Dark Mode Sidebar',
      description: 'Built-in theme toggle with dark mode support',
      component: (
        <SidebarWithDarkMode
          logo={{ text: 'Theme' }}
          navItems={sampleNavItems}
          className="relative"
        />
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Sidebar Components
              </h1>
              <p className="text-lg text-gray-600">
                10 reusable sidebar components with different layouts and features
              </p>
            </div>
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m0 0h11a2 2 0 012 2v10a2 2 0 01-2 2H3" />
              </svg>
              Back to Component Gallery
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">10</div>
              <div className="text-sm text-gray-600">Sidebar Variants</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
              <div className="text-sm text-gray-600">TypeScript</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">Responsive</div>
              <div className="text-sm text-gray-600">Mobile Ready</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">Tailwind</div>
              <div className="text-sm text-gray-600">CSS Framework</div>
            </div>
          </div>

          {/* Sidebar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sidebars.map((sidebar) => (
              <div key={sidebar.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {sidebar.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {sidebar.description}
                  </p>
                </div>
                <div className="relative bg-gray-50" style={{ height: '400px', overflow: 'hidden' }}>
                  <div className="absolute inset-0">
                    {sidebar.component}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Use These Components?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              All sidebar components are built with React + TypeScript + Tailwind CSS. 
              Copy the code and customize them for your projects.
            </p>
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Explore More Components
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarGallery; 