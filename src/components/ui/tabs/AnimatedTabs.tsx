import React, { useState, useEffect } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface AnimatedTabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  animationType?: 'slide' | 'fade' | 'scale';
  animationDuration?: number;
  className?: string;
}

const AnimatedTabs: React.FC<AnimatedTabsProps> = ({
  tabs,
  defaultActiveTab,
  onTabChange,
  animationType = 'slide',
  animationDuration = 300,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayContent, setDisplayContent] = useState(
    tabs.find(tab => tab.id === activeTab)?.content
  );

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (!disabled && tabId !== activeTab && !isAnimating) {
      setIsAnimating(true);
      setActiveTab(tabId);
      onTabChange?.(tabId);
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setDisplayContent(tabs.find(tab => tab.id === activeTab)?.content);
        setIsAnimating(false);
      }, animationDuration / 2);

      return () => clearTimeout(timer);
    }
  }, [activeTab, isAnimating, tabs, animationDuration]);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-300 ease-in-out';
    
    switch (animationType) {
      case 'fade':
        return `${baseClasses} ${isAnimating ? 'opacity-0' : 'opacity-100'}`;
      case 'scale':
        return `${baseClasses} ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`;
      case 'slide':
      default:
        return `${baseClasses} ${isAnimating ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, tab.disabled)}
              disabled={tab.disabled || isAnimating}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : tab.disabled
                    ? 'border-transparent text-gray-400 cursor-not-allowed'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } ${
                isAnimating ? 'cursor-wait' : ''
              }`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              <div className="flex items-center space-x-2">
                {tab.icon && (
                  <div className={`w-5 h-5 transition-colors duration-200 ${
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
      
      <div className="mt-4 overflow-hidden">
        <div 
          className={getAnimationClasses()}
          style={{ transitionDuration: `${animationDuration}ms` }}
        >
          {displayContent}
        </div>
      </div>
    </div>
  );
};

export default AnimatedTabs; 