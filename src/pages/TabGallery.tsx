import React from 'react';
import {
  HorizontalTabs,
  VerticalTabs,
  UnderlineTabs,
  PillTabs,
  IconTabs,
  ScrollableTabs,
  CardTabs,
  SegmentedControlTabs,
  AnimatedTabs,
  ResponsiveTabs
} from '../components/ui/tabs';

const TabGallery: React.FC = () => {
  const tabComponents = [
    {
      name: 'HorizontalTabs',
      description: 'Basic horizontal tabs with content panels',
      features: ['Clean design', 'Badge support', 'Disabled states', 'Keyboard navigation'],
      component: HorizontalTabs
    },
    {
      name: 'VerticalTabs',
      description: 'Vertical tabs aligned left with stacked layout',
      features: ['Icon support', 'Descriptions', 'Flexible width', 'Sidebar style'],
      component: VerticalTabs
    },
    {
      name: 'UnderlineTabs',
      description: 'Tab items with animated underline indicator',
      features: ['Smooth animation', 'Auto-positioning', 'Count badges', 'Hover effects'],
      component: UnderlineTabs
    },
    {
      name: 'PillTabs',
      description: 'Rounded pill-style tab buttons',
      features: ['Multiple colors', 'Size variants', 'Border styles', 'Flexible layout'],
      component: PillTabs
    },
    {
      name: 'IconTabs',
      description: 'Tabs with icons and labels',
      features: ['Icon positioning', 'Badge support', 'Horizontal/vertical', 'Rich content'],
      component: IconTabs
    },
    {
      name: 'ScrollableTabs',
      description: 'Tabs that scroll horizontally on overflow',
      features: ['Auto-scroll', 'Scroll buttons', 'Active centering', 'Responsive'],
      component: ScrollableTabs
    },
    {
      name: 'CardTabs',
      description: 'Card-style panels for content display',
      features: ['Card styling', 'Border/shadow options', 'Description support', 'Clean layout'],
      component: CardTabs
    },
    {
      name: 'SegmentedControlTabs',
      description: 'iOS-style segmented control look',
      features: ['Unified background', 'Size variants', 'Full width option', 'Mobile-first'],
      component: SegmentedControlTabs
    },
    {
      name: 'AnimatedTabs',
      description: 'Smooth animated transition between panels',
      features: ['Multiple animations', 'Configurable duration', 'Transition states', 'Performance optimized'],
      component: AnimatedTabs
    },
    {
      name: 'ResponsiveTabs',
      description: 'Tabs switch to dropdown on small screens',
      features: ['Breakpoint control', 'Mobile dropdown', 'Auto-detection', 'Seamless UX'],
      component: ResponsiveTabs
    }
  ];

  const sampleTabs = [
    {
      id: 'tab1',
      label: 'Overview',
      content: <div className="p-4 text-gray-600">This is the overview content panel with key information and summaries.</div>,
      icon: <span>📊</span>
    },
    {
      id: 'tab2',
      label: 'Details',
      content: <div className="p-4 text-gray-600">Detailed information and specifications are displayed in this panel.</div>,
      icon: <span>📋</span>
    },
    {
      id: 'tab3',
      label: 'Settings',
      content: <div className="p-4 text-gray-600">Configuration options and preferences can be managed here.</div>,
      icon: <span>⚙️</span>
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Tabs Components Gallery</h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover our comprehensive collection of 10 tab components for organizing content efficiently.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Total Components</h3>
              <p className="text-2xl font-bold text-blue-600">{tabComponents.length}</p>
              <p className="text-sm text-gray-500">Tab variants</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-2">⚡ Interactive</h3>
              <p className="text-2xl font-bold text-green-600">100%</p>
              <p className="text-sm text-gray-500">Fully functional</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-2">🎨 Customizable</h3>
              <p className="text-2xl font-bold text-purple-600">✓</p>
              <p className="text-sm text-gray-500">Theme support</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {tabComponents.map((tab, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{tab.name}</h3>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Available
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{tab.description}</p>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                <ul className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                  {tab.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border rounded-lg p-6 bg-gray-50">
                <div className="min-h-[300px]">
                  {tab.name === 'HorizontalTabs' && (
                    <HorizontalTabs tabs={sampleTabs} />
                  )}
                  {tab.name === 'VerticalTabs' && (
                    <VerticalTabs 
                      tabs={sampleTabs.map(t => ({ ...t, description: 'Tab description' }))} 
                    />
                  )}
                  {tab.name === 'UnderlineTabs' && (
                    <UnderlineTabs 
                      tabs={sampleTabs.map(t => ({ ...t, count: Math.floor(Math.random() * 10) + 1 }))} 
                    />
                  )}
                  {tab.name === 'PillTabs' && (
                    <PillTabs 
                      tabs={sampleTabs.map((t, i) => ({ 
                        ...t, 
                        color: ['blue', 'green', 'purple'][i] as any 
                      }))} 
                    />
                  )}
                  {tab.name === 'IconTabs' && (
                    <IconTabs 
                      tabs={sampleTabs.map(t => ({ 
                        ...t, 
                        badge: Math.floor(Math.random() * 5) + 1
                      }))} 
                    />
                  )}
                  {tab.name === 'ScrollableTabs' && (
                    <ScrollableTabs 
                      tabs={[
                        ...sampleTabs,
                        { id: 'tab4', label: 'Analytics', content: <div className="p-4">Analytics content</div>, icon: <span>📈</span> },
                        { id: 'tab5', label: 'Reports', content: <div className="p-4">Reports content</div>, icon: <span>📊</span> },
                        { id: 'tab6', label: 'Users', content: <div className="p-4">Users content</div>, icon: <span>👥</span> },
                        { id: 'tab7', label: 'Security', content: <div className="p-4">Security content</div>, icon: <span>🔒</span> }
                      ]}
                    />
                  )}
                  {tab.name === 'CardTabs' && (
                    <CardTabs 
                      tabs={sampleTabs.map(t => ({ 
                        ...t, 
                        description: 'Card description'
                      }))} 
                    />
                  )}
                  {tab.name === 'SegmentedControlTabs' && (
                    <SegmentedControlTabs 
                      tabs={sampleTabs} 
                      fullWidth
                    />
                  )}
                  {tab.name === 'AnimatedTabs' && (
                    <AnimatedTabs 
                      tabs={sampleTabs} 
                      animationType="slide"
                    />
                  )}
                  {tab.name === 'ResponsiveTabs' && (
                    <ResponsiveTabs 
                      tabs={sampleTabs} 
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
            <pre>{`import { HorizontalTabs, IconTabs } from '@/components/ui/tabs';

const MyComponent = () => {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: <OverviewPanel />,
      icon: <ChartIcon />
    },
    {
      id: 'settings',
      label: 'Settings',
      content: <SettingsPanel />,
      icon: <CogIcon />
    }
  ];

  return (
    <IconTabs 
      tabs={tabs}
      defaultActiveTab="overview"
      onTabChange={(tabId) => console.log(tabId)}
    />
  );
};`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabGallery; 