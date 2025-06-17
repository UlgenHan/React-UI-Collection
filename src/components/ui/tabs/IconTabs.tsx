import React, { useState } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

export interface IconTabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  orientation?: 'horizontal' | 'vertical';
  iconPosition?: 'top' | 'left' | 'right';
  className?: string;
}

const IconTabs: React.FC<IconTabsProps> = ({
  tabs,
  defaultActiveTab,
  onTabChange,
  orientation = 'horizontal',
  iconPosition = 'left',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (!disabled) {
      setActiveTab(tabId);
      onTabChange?.(tabId);
    }
  };

  const getIconContainerClass = () => {
    switch (iconPosition) {
      case 'top':
        return 'flex-col items-center space-y-1';
      case 'right':
        return 'flex-row-reverse space-x-reverse space-x-2';
      default:
        return 'flex-row items-center space-x-2';
    }
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  if (orientation === 'vertical') {
    return (
      <div className={`flex ${className}`}>
        <div className="w-64 flex-shrink-0">
          <nav className="space-y-1" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id, tab.disabled)}
                disabled={tab.disabled}
                className={`w-full text-left px-3 py-3 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : tab.disabled
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                <div className={`flex ${getIconContainerClass()}`}>
                  <div className={`w-5 h-5 ${
                    activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {tab.icon}
                  </div>
                  <div className="flex-1 min-w-0 flex items-center justify-between">
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="flex-1 ml-6">
          {activeTabContent}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, tab.disabled)}
              disabled={tab.disabled}
              className={`relative py-2 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : tab.disabled
                    ? 'border-transparent text-gray-400 cursor-not-allowed'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              <div className={`flex ${getIconContainerClass()}`}>
                <div className={`w-5 h-5 ${
                  activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {tab.icon}
                </div>
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </div>
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-4">
        {activeTabContent}
      </div>
    </div>
  );
};

export default IconTabs; 