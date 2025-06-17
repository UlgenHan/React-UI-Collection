import React, { useState, useEffect } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface ResponsiveTabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  breakpoint?: number;
  className?: string;
}

const ResponsiveTabs: React.FC<ResponsiveTabsProps> = ({
  tabs,
  defaultActiveTab,
  onTabChange,
  breakpoint = 768,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (!disabled) {
      setActiveTab(tabId);
      onTabChange?.(tabId);
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [breakpoint]);

  const activeTabData = tabs.find(tab => tab.id === activeTab);
  const activeTabContent = activeTabData?.content;

  if (isMobile) {
    return (
      <div className={`w-full ${className}`}>
        <div className="relative mb-4">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-expanded={isDropdownOpen}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {activeTabData?.icon && (
                  <div className="w-5 h-5 text-gray-400">
                    {activeTabData.icon}
                  </div>
                )}
                <span>{activeTabData?.label}</span>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id, tab.disabled)}
                  disabled={tab.disabled}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : tab.disabled
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700'
                  } ${
                    tab === tabs[0] ? 'rounded-t-md' : ''
                  } ${
                    tab === tabs[tabs.length - 1] ? 'rounded-b-md' : ''
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {tab.icon && (
                      <div className={`w-5 h-5 ${
                        activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'
                      }`}>
                        {tab.icon}
                      </div>
                    )}
                    <span>{tab.label}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div>
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
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : tab.disabled
                    ? 'border-transparent text-gray-400 cursor-not-allowed'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
                <span>{tab.label}</span>
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

export default ResponsiveTabs; 