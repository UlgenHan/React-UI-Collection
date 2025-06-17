import React, { useState } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

interface DarkAccordionProps {
  items: AccordionItem[];
  onToggle?: (itemId: string, isOpen: boolean) => void;
  className?: string;
}

export const DarkAccordion: React.FC<DarkAccordionProps> = ({
  items,
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
      onToggle?.(itemId, false);
    } else {
      newOpenItems.add(itemId);
      onToggle?.(itemId, true);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className={`space-y-2 bg-gray-900 p-4 rounded-lg ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div key={item.id} className="border border-gray-700 rounded-lg bg-gray-800">
            <button
              onClick={() => handleToggle(item.id)}
              className="w-full px-4 py-3 text-left font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-inset rounded-lg transition-colors duration-200"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <div className="flex justify-between items-center">
                <span>{item.title}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform duration-200 text-gray-300 ${
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
                className="px-4 py-3 text-gray-300 border-t border-gray-700 bg-gray-900"
                role="region"
                aria-labelledby={`accordion-header-${item.id}`}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}; 