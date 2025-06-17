import React from 'react';
import { useNavigation } from '../App';
import {
  FlexRow,
  FlexColumn,
  CenteredFlex,
  FlexWrap,
  TwoColumnFlex,
  FlexSpacer,
  StickyFooterFlex,
  FlexWithSidebar,
  InlineFlex,
  FlexStack
} from '../components/layout/flex';

const FlexGallery: React.FC = () => {
  const { navigateTo } = useNavigation();

  const flexComponents = [
    {
      name: 'FlexRow',
      description: 'Horizontal flex container with customizable gap, justify, and align options',
      component: FlexRow,
      props: { gap: 'md', justify: 'center' },
      demoContent: Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="bg-blue-100 px-4 py-2 rounded text-sm">Item {i + 1}</div>
      ))
    },
    {
      name: 'FlexColumn',
      description: 'Vertical flex container with customizable gap and alignment',
      component: FlexColumn,
      props: { gap: 'sm', align: 'center' },
      demoContent: Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="bg-green-100 px-4 py-2 rounded text-sm">Item {i + 1}</div>
      ))
    },
    {
      name: 'CenteredFlex',
      description: 'Flex container that centers children both vertically and horizontally',
      component: CenteredFlex,
      props: { direction: 'column', minHeight: '48' },
      demoContent: (
        <div className="bg-purple-100 px-6 py-4 rounded text-center">
          <h4 className="font-medium">Centered Content</h4>
          <p className="text-sm text-gray-600">Perfectly centered</p>
        </div>
      )
    },
    {
      name: 'FlexWrap',
      description: 'Flex container with wrapping enabled and comprehensive alignment control',
      component: FlexWrap,
      props: { gap: 'sm', justify: 'center' },
      demoContent: Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="bg-yellow-100 px-3 py-2 rounded text-sm">Tag {i + 1}</div>
      ))
    },
    {
      name: 'TwoColumnFlex',
      description: 'Two column layout with adjustable width ratios and responsive behavior',
      component: TwoColumnFlex,
      props: { 
        leftWidth: '1/3',
        leftContent: <div className="bg-red-100 p-4 rounded h-24 flex items-center justify-center">Left Column</div>,
        rightContent: <div className="bg-blue-100 p-4 rounded h-24 flex items-center justify-center">Right Column</div>
      },
      demoContent: null // Special case
    },
    {
      name: 'FlexSpacer',
      description: 'Flex container that uses spacers to push content apart',
      component: FlexSpacer,
      props: { direction: 'row' },
      demoContent: [
        <div key="1" className="bg-indigo-100 px-4 py-2 rounded text-sm">Start</div>,
        <div key="2" className="bg-indigo-100 px-4 py-2 rounded text-sm">Middle</div>,
        <div key="3" className="bg-indigo-100 px-4 py-2 rounded text-sm">End</div>
      ]
    },
    {
      name: 'StickyFooterFlex',
      description: 'Flex layout with footer that sticks to the bottom',
      component: StickyFooterFlex,
      props: { 
        minHeight: '64',
        header: <div className="bg-gray-200 p-3 rounded text-center text-sm">Header</div>,
        footer: <div className="bg-gray-300 p-3 rounded text-center text-sm">Sticky Footer</div>
      },
      demoContent: (
        <div className="bg-pink-100 p-4 rounded text-center">
          <p className="text-sm">Main content area</p>
          <p className="text-xs text-gray-600 mt-2">Footer stays at bottom</p>
        </div>
      )
    },
    {
      name: 'FlexWithSidebar',
      description: 'Flex layout with sidebar and main content areas',
      component: FlexWithSidebar,
      props: { 
        sidebarWidth: 'sm',
        sidebar: <div className="bg-gray-200 p-3 rounded text-center text-sm h-24 flex items-center justify-center">Sidebar</div>
      },
      demoContent: (
        <div className="bg-teal-100 p-4 rounded h-24 flex items-center justify-center">
          Main Content
        </div>
      )
    },
    {
      name: 'InlineFlex',
      description: 'Inline flex container for horizontal layouts with tight spacing',
      component: InlineFlex,
      props: { gap: 'sm', align: 'center' },
      demoContent: [
        <span key="1" className="bg-orange-100 px-2 py-1 rounded text-xs">Badge</span>,
        <span key="2" className="bg-orange-100 px-2 py-1 rounded text-xs">Tag</span>,
        <span key="3" className="bg-orange-100 px-2 py-1 rounded text-xs">Label</span>
      ]
    },
    {
      name: 'FlexStack',
      description: 'Vertical stack with consistent gaps and optional dividers',
      component: FlexStack,
      props: { 
        gap: 'md',
        divider: <hr className="border-gray-200" />
      },
      demoContent: [
        <div key="1" className="bg-cyan-100 p-3 rounded text-sm">Stack Item 1</div>,
        <div key="2" className="bg-cyan-100 p-3 rounded text-sm">Stack Item 2</div>,
        <div key="3" className="bg-cyan-100 p-3 rounded text-sm">Stack Item 3</div>
      ]
    }
  ];

  const renderDemo = (item: any) => {
    const Component = item.component;
    const { demoContent, ...props } = item.props || {};

    // Special handling for TwoColumnFlex
    if (item.name === 'TwoColumnFlex') {
      return <Component {...props} />;
    }

    // Special handling for StickyFooterFlex
    if (item.name === 'StickyFooterFlex') {
      return <Component {...props}>{item.demoContent}</Component>;
    }

    // Special handling for FlexWithSidebar
    if (item.name === 'FlexWithSidebar') {
      return <Component {...props}>{item.demoContent}</Component>;
    }

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
            Flex Layout Components
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            10 flexible components for modern responsive layouts using CSS Flexbox
          </p>
        </div>

        {/* Component Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {flexComponents.map((item) => (
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

export default FlexGallery; 