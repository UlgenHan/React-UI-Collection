import React, { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
  category?: string;
  defaultOpen?: boolean;
}

interface FAQAccordionProps {
  items: FAQItem[];
  showCategories?: boolean;
  onToggle?: (itemId: string, isOpen: boolean) => void;
  className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  showCategories = false,
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

  const groupedItems = showCategories
    ? items.reduce((acc, item) => {
        const category = item.category || 'General';
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
      }, {} as Record<string, FAQItem[]>)
    : { All: items };

  return (
    <div className={`space-y-6 ${className}`}>
      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <div key={category}>
          {showCategories && (
            <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
              {category}
            </h3>
          )}
          <div className="space-y-2">
            {categoryItems.map((item) => {
              const isOpen = openItems.has(item.id);
              return (
                <div key={item.id} className="border border-gray-200 rounded-lg shadow-sm">
                  <button
                    onClick={() => handleToggle(item.id)}
                    className="w-full px-5 py-4 text-left font-medium text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-lg transition-colors duration-200"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                          Q
                        </span>
                        <span className="text-base leading-relaxed">{item.question}</span>
                      </div>
                      <svg
                        className={`flex-shrink-0 w-5 h-5 transform transition-transform duration-200 text-gray-400 mt-1 ${
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
                      id={`faq-answer-${item.id}`}
                      className="px-5 py-4 text-gray-700 border-t border-gray-100 bg-gray-50"
                      role="region"
                      aria-labelledby={`faq-question-${item.id}`}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          A
                        </span>
                        <div className="text-base leading-relaxed">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}; 