import React, { useState } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

export interface CardTabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  cardBorder?: boolean;
  cardShadow?: boolean;
  className?: string;
}

const CardTabs: React.FC<CardTabsProps> = ({
  tabs,
  defaultActiveTab,
  onTabChange,
  cardBorder = true,
  cardShadow = true,
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
    <div className={`w-full ${className}`}>
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id, tab.disabled)}
            disabled={tab.disabled}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              activeTab === tab.id
                ? `bg-blue-50 text-blue-700 ${cardBorder ? 'border border-blue-200' : ''} ${cardShadow ? 'shadow-sm' : ''}`
                : tab.disabled
                  ? 'text-gray-400 bg-gray-50 cursor-not-allowed opacity-50'
                  : `text-gray-600 bg-white hover:bg-gray-50 hover:text-gray-900 ${cardBorder ? 'border border-gray-200' : ''} ${cardShadow ? 'hover:shadow-sm' : ''}`
            }`}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            <div className="flex items-center space-x-2">
              {tab.icon && (
                <div className={`w-5 h-5 ${
                  activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {tab.icon}
                </div>
              )}
              <div className="text-left">
                <div>{tab.label}</div>
                {tab.description && (
                  <div className={`text-xs mt-1 ${
                    activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {tab.description}
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <div className={`bg-white rounded-lg p-6 ${
        cardBorder ? 'border border-gray-200' : ''
      } ${
        cardShadow ? 'shadow-sm' : ''
      }`}>
        {activeTabContent}
      </div>
    </div>
  );
};

export default CardTabs; 