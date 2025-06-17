import React, { useState } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

export interface VerticalTabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  tabWidth?: string;
  className?: string;
}

const VerticalTabs: React.FC<VerticalTabsProps> = ({
  tabs,
  defaultActiveTab,
  onTabChange,
  tabWidth = 'w-64',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (!disabled) {
      setActiveTab(tabId);
      onTabChange?.(tabId);
    }
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={`flex ${className}`}>
      <div className={`${tabWidth} flex-shrink-0`}>
        <nav className="space-y-1" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, tab.disabled)}
              disabled={tab.disabled}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : tab.disabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              <div className="flex items-start space-x-3">
                {tab.icon && (
                  <div className={`w-5 h-5 mt-0.5 ${
                    activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {tab.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{tab.label}</p>
                  {tab.description && (
                    <p className={`text-xs mt-1 ${
                      activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {tab.description}
                    </p>
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
};

export default VerticalTabs; 