import React, { useState, useRef, useEffect } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  count?: number;
}

export interface UnderlineTabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

const UnderlineTabs: React.FC<UnderlineTabsProps> = ({
  tabs,
  defaultActiveTab,
  onTabChange,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (!disabled) {
      setActiveTab(tabId);
      onTabChange?.(tabId);
    }
  };

  useEffect(() => {
    const activeTabRef = tabRefs.current[activeTab];
    if (activeTabRef) {
      setUnderlineStyle({
        width: activeTabRef.offsetWidth,
        left: activeTabRef.offsetLeft,
      });
    }
  }, [activeTab]);

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[tab.id] = el)}
              onClick={() => handleTabClick(tab.id, tab.disabled)}
              disabled={tab.disabled}
              className={`relative py-4 px-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                activeTab === tab.id
                  ? 'text-blue-600'
                  : tab.disabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-500 hover:text-gray-700'
              }`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              <div className="flex items-center space-x-2">
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full ${
                    activeTab === tab.id
                      ? 'text-blue-600 bg-blue-100'
                      : 'text-gray-600 bg-gray-100'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </div>
            </button>
          ))}
        </nav>
        
        <div
          className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out"
          style={{
            width: underlineStyle.width,
            transform: `translateX(${underlineStyle.left}px)`,
          }}
        />
      </div>
      
      <div className="mt-6">
        {activeTabContent}
      </div>
    </div>
  );
};

export default UnderlineTabs; 