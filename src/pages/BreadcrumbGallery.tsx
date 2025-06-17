import React from 'react';
import {
  SimpleBreadcrumb,
  ChevronBreadcrumb,
  IconBreadcrumb,
  SlashBreadcrumb,
  ArrowBreadcrumb,
  CollapsedBreadcrumb,
  BreadcrumbWithDropdown,
  RoundedBreadcrumb,
  TopbarBreadcrumb,
  VerticalBreadcrumb
} from '../components/ui/breadcrumbs';
import { useNavigation } from '../App';

// Sample breadcrumb data
const sampleBreadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Smartphones', isActive: true }
];

const longBreadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Categories', href: '/categories' },
  { label: 'Electronics', href: '/categories/electronics' },
  { label: 'Mobile Devices', href: '/categories/electronics/mobile' },
  { label: 'Smartphones', href: '/categories/electronics/mobile/smartphones' },
  { label: 'Apple', href: '/categories/electronics/mobile/smartphones/apple' },
  { label: 'iPhone 15 Pro Max', isActive: true }
];

const iconBreadcrumbs = [
  { 
    label: 'Home', 
    href: '/',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
      </svg>
    )
  },
  { 
    label: 'Products', 
    href: '/products',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM6 9a1 1 0 112 0v6H6V9zm6 0a1 1 0 112 0v6h-2V9z" clipRule="evenodd"/>
      </svg>
    )
  },
  { 
    label: 'Electronics', 
    href: '/products/electronics',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd"/>
      </svg>
    )
  },
  { label: 'Smartphones', isActive: true }
];

const BreadcrumbGallery: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateTo('home')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Gallery
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Breadcrumb Components</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
          
          {/* Simple Breadcrumb */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Simple Breadcrumb</h2>
            <p className="text-gray-600 mb-6">Text-based breadcrumb with &gt; separator</p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <SimpleBreadcrumb items={sampleBreadcrumbs} />
            </div>
          </section>

          {/* Chevron Breadcrumb */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Chevron Breadcrumb</h2>
            <p className="text-gray-600 mb-6">Uses chevron icons between items</p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <ChevronBreadcrumb items={sampleBreadcrumbs} />
            </div>
          </section>

          {/* Icon Breadcrumb */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Icon Breadcrumb</h2>
            <p className="text-gray-600 mb-6">Items include optional icons</p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <IconBreadcrumb items={iconBreadcrumbs} />
            </div>
          </section>

          {/* Slash Breadcrumb */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Slash Breadcrumb</h2>
            <p className="text-gray-600 mb-6">Uses slashes (/) as separators</p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <SlashBreadcrumb items={sampleBreadcrumbs} />
            </div>
          </section>

          {/* Arrow Breadcrumb */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Arrow Breadcrumb</h2>
            <p className="text-gray-600 mb-6">Horizontal arrow UI with hover effects</p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <ArrowBreadcrumb items={sampleBreadcrumbs} />
            </div>
          </section>

          {/* Collapsed Breadcrumb */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Collapsed Breadcrumb</h2>
            <p className="text-gray-600 mb-6">Middle items collapsed with ellipsis (...)</p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <CollapsedBreadcrumb items={longBreadcrumbs} maxVisibleItems={3} />
            </div>
          </section>

          {/* Breadcrumb with Dropdown */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Breadcrumb with Dropdown</h2>
            <p className="text-gray-600 mb-6">Dropdown on middle items for deep paths</p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <BreadcrumbWithDropdown items={longBreadcrumbs} maxVisibleItems={3} />
            </div>
          </section>

          {/* Rounded Breadcrumb */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Rounded Breadcrumb</h2>
            <p className="text-gray-600 mb-6">Pills-style rounded breadcrumb items</p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <RoundedBreadcrumb items={sampleBreadcrumbs} />
            </div>
          </section>

          {/* Topbar Breadcrumb */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Topbar Breadcrumb</h2>
            <p className="text-gray-600 mb-6">Breadcrumb in a sticky top bar</p>
            <div className="border rounded-lg bg-gray-50 overflow-hidden">
              <TopbarBreadcrumb items={sampleBreadcrumbs} sticky={false} />
            </div>
          </section>

          {/* Vertical Breadcrumb */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Vertical Breadcrumb</h2>
            <p className="text-gray-600 mb-6">Breadcrumb displayed vertically (for sidebars)</p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="max-w-xs">
                <VerticalBreadcrumb items={sampleBreadcrumbs} />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default BreadcrumbGallery; 