import React from 'react';
import { useNavigation } from '../App';
import {
  BasicGrid,
  ResponsiveGrid,
  MasonryGrid,
  GridWithHeader,
  GridWithFooter,
  AutoFitGrid,
  GridWithGutters,
  NestedGrid,
  EqualHeightGrid,
  CardGrid
} from '../components/layout/grid';

const GridGallery: React.FC = () => {
  const { navigateTo } = useNavigation();

  const gridComponents = [
    {
      name: 'BasicGrid',
      description: 'Simple grid with customizable columns and gap spacing',
      component: BasicGrid,
      props: { columns: 3 },
      demoContent: Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="bg-blue-100 p-3 rounded text-center text-sm">Item {i + 1}</div>
      ))
    },
    {
      name: 'ResponsiveGrid',
      description: 'Grid that adjusts columns based on screen size (1-4 columns)',
      component: ResponsiveGrid,
      props: {},
      demoContent: Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="bg-green-100 p-3 rounded text-center text-sm">Item {i + 1}</div>
      ))
    },
    {
      name: 'MasonryGrid',
      description: 'Masonry style grid using CSS columns for Pinterest-like layouts',
      component: MasonryGrid,
      props: { columns: { base: 2, md: 3 } },
      demoContent: Array.from({ length: 6 }, (_, i) => {
        const heights = ['h-16', 'h-20', 'h-24', 'h-12', 'h-28', 'h-16'];
        return (
          <div key={i} className={`bg-purple-100 p-3 rounded text-center text-sm ${heights[i]}`}>
            Card {i + 1}
          </div>
        );
      })
    },
    {
      name: 'GridWithHeader',
      description: 'Grid layout with header spanning all columns',
      component: GridWithHeader,
      props: { 
        columns: 3,
        header: <div className="bg-gray-200 p-3 rounded text-center font-medium">Grid Header</div>
      },
      demoContent: Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="bg-yellow-100 p-3 rounded text-center text-sm">Item {i + 1}</div>
      ))
    },
    {
      name: 'GridWithFooter',
      description: 'Grid layout with footer spanning all columns',
      component: GridWithFooter,
      props: { 
        columns: 3,
        footer: <div className="bg-gray-200 p-3 rounded text-center font-medium">Grid Footer</div>
      },
      demoContent: Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="bg-red-100 p-3 rounded text-center text-sm">Item {i + 1}</div>
      ))
    },
    {
      name: 'AutoFitGrid',
      description: 'Grid using CSS auto-fit and minmax for fluid responsive columns',
      component: AutoFitGrid,
      props: { minColumnWidth: '200px' },
      demoContent: Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="bg-indigo-100 p-3 rounded text-center text-sm">Auto Item {i + 1}</div>
      ))
    },
    {
      name: 'GridWithGutters',
      description: 'Grid with separate X and Y gutter spacing controls',
      component: GridWithGutters,
      props: { columns: 3, gutterX: 'lg', gutterY: 'sm' },
      demoContent: Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="bg-pink-100 p-3 rounded text-center text-sm">Item {i + 1}</div>
      ))
    },
    {
      name: 'NestedGrid',
      description: 'Grid inside grid for complex nested layouts',
      component: NestedGrid,
      props: { outerColumns: 2, innerColumns: 2 },
      demoContent: Array.from({ length: 2 }, (_, outerIndex) => (
        <div key={outerIndex} className="space-y-2">
          {Array.from({ length: 4 }, (_, innerIndex) => (
            <div key={innerIndex} className="bg-teal-100 p-2 rounded text-center text-xs">
              {outerIndex + 1}.{innerIndex + 1}
            </div>
          ))}
        </div>
      ))
    },
    {
      name: 'EqualHeightGrid',
      description: 'Grid ensuring all items have equal height within rows',
      component: EqualHeightGrid,
      props: { columns: 3 },
      demoContent: Array.from({ length: 6 }, (_, i) => {
        const content = i % 2 === 0 ? 'Short content' : 'This is much longer content that would normally make this item taller than others';
        return (
          <div key={i} className="bg-orange-100 p-3 rounded text-center text-sm">
            {content}
          </div>
        );
      })
    },
    {
      name: 'CardGrid',
      description: 'Grid optimized for card components with built-in styling',
      component: CardGrid,
      props: { columns: 3 },
      demoContent: Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="text-center">
          <h4 className="font-medium text-gray-900 mb-2">Card {i + 1}</h4>
          <p className="text-gray-600 text-sm">Card content with automatic styling</p>
        </div>
      ))
    }
  ];

  const renderDemo = (item: any) => {
    const Component = item.component;
    const { demoContent, ...props } = item.props || {};
    
    return (
      <Component {...props}>
        {item.demoContent}
      </Component>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Component Gallery
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Grid Layout Components
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            10 powerful grid components for complex layouts and responsive design
          </p>
        </div>

        {/* Component Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {gridComponents.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Component Info */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>

              {/* Component Demo */}
              <div className="p-6 bg-gray-50">
                <div className="bg-white rounded border border-gray-200 p-4">
                  {renderDemo(item)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridGallery; 