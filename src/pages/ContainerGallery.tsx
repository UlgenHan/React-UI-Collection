import React from 'react';
import { useNavigation } from '../App';
import {
  BasicContainer,
  FluidContainer,
  CenteredContainer,
  ResponsiveGridContainer,
  CardContainer,
  SectionContainer,
  SidebarContainer,
  SplitScreenContainer,
  ModalContainer,
  ScrollContainer
} from '../components/layout/containers';

const ContainerGallery: React.FC = () => {
  const { navigateTo } = useNavigation();

  const containerComponents = [
    {
      name: 'BasicContainer',
      description: 'Simple fixed max-width container with horizontal centering and padding',
      component: BasicContainer,
      demoContent: <div className="bg-blue-100 p-4 rounded">Basic container content with centered layout and max-width constraints.</div>
    },
    {
      name: 'FluidContainer',
      description: 'Full-width container with responsive horizontal padding that adapts to screen size',
      component: FluidContainer,
      demoContent: <div className="bg-green-100 p-4 rounded">Fluid container spans full width with responsive padding for all screen sizes.</div>
    },
    {
      name: 'CenteredContainer',
      description: 'Container that centers content both vertically and horizontally',
      component: CenteredContainer,
      demoContent: <div className="bg-purple-100 p-6 rounded text-center">Perfectly centered content in both directions</div>
    },
    {
      name: 'ResponsiveGridContainer',
      description: 'Container with responsive grid layout supporting 2-4 columns based on screen size',
      component: ResponsiveGridContainer,
      demoContent: (
        <>
          <div className="bg-red-100 p-4 rounded">Item 1</div>
          <div className="bg-yellow-100 p-4 rounded">Item 2</div>
          <div className="bg-blue-100 p-4 rounded">Item 3</div>
          <div className="bg-green-100 p-4 rounded">Item 4</div>
        </>
      )
    },
    {
      name: 'CardContainer',
      description: 'Container styled as a card with shadow, border radius, and padding',
      component: CardContainer,
      demoContent: <div className="text-gray-700">This content is wrapped in a beautiful card with shadow and rounded corners.</div>
    },
    {
      name: 'SectionContainer',
      description: 'Wrapper for page sections with vertical spacing and background color options',
      component: SectionContainer,
      demoContent: <div className="text-center"><h3 className="text-xl font-bold mb-2">Section Title</h3><p>This is a page section with proper spacing and background.</p></div>
    },
    {
      name: 'SidebarContainer',
      description: 'Container with sidebar and main content area side by side',
      component: SidebarContainer,
      demoContent: null, // Special handling needed
      specialDemo: true
    },
    {
      name: 'SplitScreenContainer',
      description: 'Container split into two equal vertical halves for comparisons',
      component: SplitScreenContainer,
      demoContent: null, // Special handling needed
      specialDemo: true
    },
    {
      name: 'ModalContainer',
      description: 'Fixed positioned container centered on screen with background overlay',
      component: ModalContainer,
      demoContent: <div className="text-center"><h3 className="text-lg font-bold mb-2">Modal Content</h3><p>This is a modal dialog with overlay background.</p></div>,
      specialDemo: true
    },
    {
      name: 'ScrollContainer',
      description: 'Container with fixed height and vertical scroll for scrollable content',
      component: ScrollContainer,
      demoContent: (
        <div className="space-y-2">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="bg-gray-100 p-2 rounded">Scrollable item {i + 1}</div>
          ))}
        </div>
      )
    }
  ];

  const renderDemo = (item: any) => {
    const Component = item.component;

    if (item.name === 'SidebarContainer') {
      return (
        <Component
          sidebar={<div className="bg-gray-200 p-4 rounded">Sidebar Content</div>}
          className="h-32"
        >
          <div className="bg-blue-100 p-4 rounded">Main Content Area</div>
        </Component>
      );
    }

    if (item.name === 'SplitScreenContainer') {
      return (
        <Component
          leftContent={<div className="bg-blue-100 p-4 rounded h-24 flex items-center justify-center">Left Side</div>}
          rightContent={<div className="bg-green-100 p-4 rounded h-24 flex items-center justify-center">Right Side</div>}
          minHeight="auto"
        />
      );
    }

    if (item.name === 'ModalContainer') {
      return (
        <div className="relative h-40 bg-gray-100 rounded flex items-center justify-center">
          <div className="text-gray-500 text-sm">Modal preview (normally overlays entire screen)</div>
          <div className="absolute inset-4">
            <Component isOpen={true} className="relative">
              {item.demoContent}
            </Component>
          </div>
        </div>
      );
    }

    if (item.name === 'CenteredContainer') {
      return (
        <Component minHeight="48" className="bg-gray-50 rounded">
          {item.demoContent}
        </Component>
      );
    }

    return (
      <Component>
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
            Container Components
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            10 versatile container components for layout structure and content organization
          </p>
        </div>

        {/* Component Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {containerComponents.map((item) => (
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

export default ContainerGallery; 