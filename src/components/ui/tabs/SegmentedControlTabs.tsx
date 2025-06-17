import React, { useState } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface SegmentedControlTabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

const SegmentedControlTabs: React.FC<SegmentedControlTabsProps> = ({
  tabs,
  defaultActiveTab,
  onTabChange,
  size = 'md',
  fullWidth = false,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (!disabled) {
      setActiveTab(tabId);
      onTabChange?.(tabId);
    }
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3'
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={`w-full ${className}`}>
      <div className={`inline-flex bg-gray-100 rounded-lg p-1 ${fullWidth ? 'w-full' : ''}`}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id, tab.disabled)}
            disabled={tab.disabled}
            className={`${sizeClasses[size]} font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 ${
              fullWidth ? 'flex-1' : ''
            } ${
              index === 0 ? 'rounded-l-md' : ''
            } ${
              index === tabs.length - 1 ? 'rounded-r-md' : ''
            } ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : tab.disabled
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900'
            }`}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            <div className="flex items-center justify-center space-x-2">
              {tab.icon && (
                <div className={`w-4 h-4 ${
                  activeTab === tab.id ? 'text-gray-700' : 'text-gray-400'
                }`}>
                  {tab.icon}
                </div>
              )}
              <span>{tab.label}</span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-6">
        {activeTabContent}
      </div>
    </div>
  );
};

export default SegmentedControlTabs; 