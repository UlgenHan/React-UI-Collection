import React, { useState } from 'react';

interface NestedAccordionItem {
  id: string;
  title: string;
  content?: React.ReactNode;
  children?: NestedAccordionItem[];
  defaultOpen?: boolean;
}

interface NestedAccordionProps {
  items: NestedAccordionItem[];
  level?: number;
  onToggle?: (itemId: string, isOpen: boolean, level: number) => void;
  className?: string;
}

export const NestedAccordion: React.FC<NestedAccordionProps> = ({
  items,
  level = 0,
  onToggle,
  className = '',
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(items.filter(item => item.defaultOpen).map(item => item.id))
  );

  const handleToggle = (itemId: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
      onToggle?.(itemId, false, level);
    } else {
      newOpenItems.add(itemId);
      onToggle?.(itemId, true, level);
    }
    setOpenItems(newOpenItems);
  };

  const getIndentClass = () => {
    const indents = ['', 'ml-4', 'ml-8', 'ml-12'];
    return indents[level] || 'ml-16';
  };

  const getBorderClass = () => {
    if (level === 0) return 'border border-gray-200';
    if (level === 1) return 'border border-gray-300';
    return 'border border-gray-400';
  };

  const getBackgroundClass = () => {
    if (level === 0) return 'bg-gray-50 hover:bg-gray-100';
    if (level === 1) return 'bg-gray-100 hover:bg-gray-200';
    return 'bg-gray-200 hover:bg-gray-300';
  };

  return (
    <div className={`space-y-2 ${getIndentClass()} ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        const hasChildren = item.children && item.children.length > 0;
        
        return (
          <div key={item.id} className={`rounded-lg ${getBorderClass()}`}>
            <button
              onClick={() => handleToggle(item.id)}
              className={`w-full px-4 py-3 text-left font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-lg transition-colors duration-200 ${getBackgroundClass()}`}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {hasChildren && (
                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                      {item.children!.length}
                    </span>
                  )}
                  <span className={level > 0 ? 'text-sm' : ''}>{item.title}</span>
                </div>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            {isOpen && (
              <div
                id={`accordion-content-${item.id}`}
                className="border-t border-gray-200"
                role="region"
                aria-labelledby={`accordion-header-${item.id}`}
              >
                {item.content && (
                  <div className="px-4 py-3 text-gray-700 text-sm">
                    {item.content}
                  </div>
                )}
                {hasChildren && (
                  <div className="p-2">
                    <NestedAccordion
                      items={item.children!}
                      level={level + 1}
                      onToggle={onToggle}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}; 