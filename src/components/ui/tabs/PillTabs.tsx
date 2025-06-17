import React, { useState } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray';
}

export interface PillTabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const PillTabs: React.FC<PillTabsProps> = ({
  tabs,
  defaultActiveTab,
  onTabChange,
  size = 'md',
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
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const colorClasses = {
    blue: {
      active: 'bg-blue-100 text-blue-800 border-blue-200',
      inactive: 'text-blue-600 hover:bg-blue-50 border-blue-200'
    },
    green: {
      active: 'bg-green-100 text-green-800 border-green-200',
      inactive: 'text-green-600 hover:bg-green-50 border-green-200'
    },
    red: {
      active: 'bg-red-100 text-red-800 border-red-200',
      inactive: 'text-red-600 hover:bg-red-50 border-red-200'
    },
    yellow: {
      active: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      inactive: 'text-yellow-600 hover:bg-yellow-50 border-yellow-200'
    },
    purple: {
      active: 'bg-purple-100 text-purple-800 border-purple-200',
      inactive: 'text-purple-600 hover:bg-purple-50 border-purple-200'
    },
    gray: {
      active: 'bg-gray-100 text-gray-800 border-gray-300',
      inactive: 'text-gray-600 hover:bg-gray-50 border-gray-300'
    }
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const color = tab.color || 'blue';
          const colorClass = colorClasses[color];
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, tab.disabled)}
              disabled={tab.disabled}
              className={`${sizeClasses[size]} font-medium rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                activeTab === tab.id
                  ? colorClass.active
                  : tab.disabled
                    ? 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed opacity-50'
                    : `${colorClass.inactive} bg-white hover:shadow-sm`
              }`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      
      <div className="mt-6">
        {activeTabContent}
      </div>
    </div>
  );
};

export default PillTabs; 