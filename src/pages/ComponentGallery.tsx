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
      name: 'Date Pickers',
      description: 'Date and time selection components with calendars and ranges',
      count: 10,
      available: true,
      route: 'date-pickers'
    },
    {
      name: 'File Uploads',
      description: 'File upload components with drag & drop, progress, and validation',
      count: 10,
      available: true,
      route: 'file-uploads'
    },
    {
      name: 'Search',
      description: 'Search input components with various styles and functionality',
      count: 10,
      available: true,
      route: 'search'
    },
    {
      name: 'Rating',
      description: 'Star rating components for user feedback and reviews',
      count: 10,
      available: true,
      route: 'rating'
    },
    {
      name: 'Alerts',
      description: 'Alert and notification components for user feedback',
      count: 10,
      available: true,
      route: 'alerts'
    },
    {
      name: 'Toasts',
      description: 'Toast notification components with positioning and animations',
      count: 10,
      available: true,
      route: 'toasts'
    },
    {
      name: 'Loaders',
      description: 'Loading spinners and progress indicators',
      count: 10,
      available: true,
      route: 'loaders'
    },
    {
      name: 'Buttons',
      description: 'Interactive button components with various styles and states',
      count: 10,
      available: true,
      route: 'buttons'
    },
    {
      name: 'Avatars',
      description: 'User avatar components with different styles and status indicators',
      count: 10,
      available: true,
      route: 'avatars'
    },
    {
      name: 'Badges',
      description: 'Badge and label components for status and information display',
      count: 10,
      available: true,
      route: 'badges'
    },
    {
      name: 'Forms',
      description: 'Input forms, validation, and interactive form elements',
      count: 0,
      available: false,
      route: 'forms'
    },
    {
      name: 'Breadcrumbs',
      description: 'Navigation breadcrumb components with various styles and separators',
      count: 10,
      available: true,
      route: 'breadcrumbs'
    },
    {
      name: 'Pagination',
      description: 'Pagination components for data navigation and page browsing',
      count: 10,
      available: true,
      route: 'pagination'
    },
    {
      name: 'Display',
      description: 'Tables, lists, and data display components',
      count: 0,
      available: false,
      route: 'display'
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
                onClick={() => category.available && navigateTo(category.route as any)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <button
              onClick={() => navigateTo('search')}
              className="p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
            >
              <h3 className="font-semibold text-blue-900 mb-1">Search Gallery</h3>
              <p className="text-sm text-blue-700">Browse all search components</p>
            </button>
            <button
              onClick={() => navigateTo('rating')}
              className="p-4 text-left bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors duration-200"
            >
              <h3 className="font-semibold text-yellow-900 mb-1">Rating Gallery</h3>
              <p className="text-sm text-yellow-700">Browse all rating components</p>
            </button>
            <button
              onClick={() => navigateTo('alerts')}
              className="p-4 text-left bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
            >
              <h3 className="font-semibold text-red-900 mb-1">Alert Gallery</h3>
              <p className="text-sm text-red-700">Browse all alert components</p>
            </button>
            <button
              onClick={() => navigateTo('toasts')}
              className="p-4 text-left bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
            >
              <h3 className="font-semibold text-indigo-900 mb-1">Toast Gallery</h3>
              <p className="text-sm text-indigo-700">Browse all toast components</p>
            </button>
            <button
              onClick={() => navigateTo('loaders')}
              className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Loader Gallery</h3>
              <p className="text-sm text-gray-700">Browse all loader components</p>
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