import React, { useState, useRef, useEffect } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface ScrollableTabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  showScrollButtons?: boolean;
  className?: string;
}

const ScrollableTabs: React.FC<ScrollableTabsProps> = ({
  tabs,
  defaultActiveTab,
  onTabChange,
  showScrollButtons = true,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (!disabled) {
      setActiveTab(tabId);
      onTabChange?.(tabId);
    }
  };

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  useEffect(() => {
    const activeTabElement = scrollRef.current?.querySelector(`[data-tab-id="${activeTab}"]`) as HTMLElement;
    if (activeTabElement && scrollRef.current) {
      const container = scrollRef.current;
      const elementLeft = activeTabElement.offsetLeft;
      const elementRight = elementLeft + activeTabElement.offsetWidth;
      const containerLeft = container.scrollLeft;
      const containerRight = containerLeft + container.clientWidth;

      if (elementLeft < containerLeft) {
        container.scrollTo({ left: elementLeft - 20, behavior: 'smooth' });
      } else if (elementRight > containerRight) {
        container.scrollTo({ left: elementRight - container.clientWidth + 20, behavior: 'smooth' });
      }
    }
  }, [activeTab]);

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={`w-full ${className}`}>
      <div className="relative border-b border-gray-200">
        {showScrollButtons && showLeftScroll && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-0 bottom-0 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 px-2 flex items-center transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide -mb-px"
          onScroll={checkScrollButtons}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <nav className="flex space-x-8 px-2" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                data-tab-id={tab.id}
                onClick={() => handleTabClick(tab.id, tab.disabled)}
                disabled={tab.disabled}
                className={`flex-shrink-0 py-2 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : tab.disabled
                      ? 'border-transparent text-gray-400 cursor-not-allowed'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                <div className="flex items-center space-x-2 whitespace-nowrap">
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
        
        {showScrollButtons && showRightScroll && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-0 bottom-0 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 px-2 flex items-center transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="mt-4">
        {activeTabContent}
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ScrollableTabs; 