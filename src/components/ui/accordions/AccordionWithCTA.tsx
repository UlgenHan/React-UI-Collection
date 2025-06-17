import React, { useState } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  ctaText?: string;
  ctaAction?: () => void;
  ctaVariant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  defaultOpen?: boolean;
}

interface AccordionWithCTAProps {
  items: AccordionItem[];
  onToggle?: (itemId: string, isOpen: boolean) => void;
  className?: string;
}

export const AccordionWithCTA: React.FC<AccordionWithCTAProps> = ({
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

  const getCTAVariantClasses = (variant: string = 'primary') => {
    const variants = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
      secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
      success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
      warning: 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    };
    return variants[variant as keyof typeof variants] || variants.primary;
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div key={item.id} className="border border-gray-200 rounded-lg shadow-sm">
            <button
              onClick={() => handleToggle(item.id)}
              className="w-full px-4 py-3 text-left font-medium text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-t-lg transition-colors duration-200"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <div className="flex justify-between items-center">
                <span>{item.title}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform duration-200 ${
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
                className="border-t border-gray-200 bg-gray-50"
                role="region"
                aria-labelledby={`accordion-header-${item.id}`}
              >
                <div className="px-4 py-3 text-gray-700">
                  {item.content}
                </div>
                {item.ctaText && item.ctaAction && (
                  <div className="px-4 pb-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        item.ctaAction?.();
                      }}
                      className={`
                        px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-offset-2
                        ${getCTAVariantClasses(item.ctaVariant)}
                      `}
                    >
                      {item.ctaText}
                    </button>
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