import React from 'react';
import { useNavigation } from '../App';

const ComponentGallery: React.FC = () => {
  const { navigateTo } = useNavigation();

  const categories = [
    {
      name: 'Headers',
      description: 'Navigation headers with logos, menus, and call-to-action buttons',
      count: 10,
      available: true,
      route: 'headers'
    },
    {
      name: 'Sidebars',
      description: 'Navigation sidebars with collapsible menus and user profiles',
      count: 10,
      available: true,
      route: 'sidebars'
    },
    {
      name: 'Footers',
      description: 'Footer components with links, contact info, and social media',
      count: 10,
      available: true,
      route: 'footers'
    },
    {
      name: 'Sections',
      description: 'Complete page sections from hero banners to contact forms',
      count: 10,
      available: true,
      route: 'sections'
    },
    {
      name: 'Cards',
      description: 'Versatile card components for content display and interaction',
      count: 10,
      available: true,
      route: 'cards'
    },
    {
      name: 'Modals',
      description: 'Modal dialogs and popups for user interaction and workflows',
      count: 10,
      available: true,
      route: 'modals'
    },
    {
      name: 'Menus',
      description: 'Interactive dropdown menus, context menus, and navigation components',
      count: 10,
      available: true,
      route: 'menus'
    },
    {
      name: 'Tabs',
      description: 'Tab components for organizing content with various styles and layouts',
      count: 10,
      available: true,
      route: 'tabs'
    },
    {
      name: 'Containers',
      description: 'Layout containers for content organization and structure',
      count: 10,
      available: true,
      route: 'containers'
    },
    {
      name: 'Grid Layouts',
      description: 'CSS Grid components for complex responsive layouts',
      count: 10,
      available: true,
      route: 'grid'
    },
    {
      name: 'Flex Layouts',
      description: 'Flexbox components for modern responsive designs',
      count: 10,
      available: true,
      route: 'flex'
    },
    {
      name: 'Forms',
      description: 'Input forms, validation, and interactive form elements',
      count: 0,
      available: false,
      route: 'forms'
    },
    {
      name: 'Navigation',
      description: 'Breadcrumbs, pagination, and navigation components',
      count: 0,
      available: false,
      route: 'navigation'
    },
    {
      name: 'Display',
      description: 'Tables, lists, and data display components',
      count: 0,
      available: false,
      route: 'display'
    },
    {
      name: 'Feedback',
      description: 'Alerts, notifications, and user feedback components',
      count: 0,
      available: false,
      route: 'feedback'
    },
    {
      name: 'Media',
      description: 'Image galleries, videos, and media display components',
      count: 0,
      available: false,
      route: 'media'
    }
  ];

  const totalComponents = categories.reduce((sum, cat) => sum + cat.count, 0);
  const availableCategories = categories.filter(cat => cat.available).length;
  const plannedCategories = categories.filter(cat => !cat.available).length;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            UI Component Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive collection of reusable React components built with TypeScript and Tailwind CSS
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{totalComponents}</div>
            <div className="text-gray-600">Total Components</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{availableCategories}</div>
            <div className="text-gray-600">Categories Available</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{plannedCategories}</div>
            <div className="text-gray-600">Categories Planned</div>
          </div>
        </div>

        {/* Component Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    category.available
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {category.available ? `${category.count} components` : 'Coming soon'}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {category.description}
              </p>
              
              <button
                onClick={() => category.available && navigateTo(category.route)}
                disabled={!category.available}
                className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  category.available
                    ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {category.available ? 'View →' : 'Coming Soon'}
              </button>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigateTo('menus')}
              className="p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
            >
              <h3 className="font-semibold text-blue-900 mb-1">Menu Gallery</h3>
              <p className="text-sm text-blue-700">Browse all menu components</p>
            </button>
            <button
              onClick={() => navigateTo('tabs')}
              className="p-4 text-left bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
            >
              <h3 className="font-semibold text-indigo-900 mb-1">Tab Gallery</h3>
              <p className="text-sm text-indigo-700">Browse all tab components</p>
            </button>
            <button
              onClick={() => navigateTo('sections')}
              className="p-4 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200"
            >
              <h3 className="font-semibold text-green-900 mb-1">Section Gallery</h3>
              <p className="text-sm text-green-700">Browse all section components</p>
            </button>
            <button
              onClick={() => navigateTo('modals')}
              className="p-4 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200"
            >
              <h3 className="font-semibold text-purple-900 mb-1">Modal Gallery</h3>
              <p className="text-sm text-purple-700">Browse all modal components</p>
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">TypeScript Ready</h3>
            <p className="text-gray-600">Fully typed components with excellent developer experience</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Responsive Design</h3>
            <p className="text-gray-600">Mobile-first components that work on all screen sizes</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Customizable</h3>
            <p className="text-gray-600">Easy to customize with Tailwind CSS utility classes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentGallery; 