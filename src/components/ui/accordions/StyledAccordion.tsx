import React, { useState } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

interface StyledAccordionProps {
  items: AccordionItem[];
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onToggle?: (itemId: string, isOpen: boolean) => void;
  className?: string;
}

export const StyledAccordion: React.FC<StyledAccordionProps> = ({
  items,
  variant = 'primary',
  size = 'md',
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

  const getVariantClasses = () => {
    const variants = {
      primary: 'border-blue-200 bg-blue-50',
      secondary: 'border-gray-200 bg-gray-50',
      success: 'border-green-200 bg-green-50',
      warning: 'border-yellow-200 bg-yellow-50',
      danger: 'border-red-200 bg-red-50',
    };
    return variants[variant];
  };

  const getHeaderVariantClasses = () => {
    const variants = {
      primary: 'bg-blue-100 hover:bg-blue-200 text-blue-900 focus:ring-blue-500',
      secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500',
      success: 'bg-green-100 hover:bg-green-200 text-green-900 focus:ring-green-500',
      warning: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-900 focus:ring-yellow-500',
      danger: 'bg-red-100 hover:bg-red-200 text-red-900 focus:ring-red-500',
    };
    return variants[variant];
  };

  const getSizeClasses = () => {
    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-6 py-4 text-lg',
    };
    return sizes[size];
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div
            key={item.id}
            className={`border-2 rounded-xl shadow-lg ${getVariantClasses()}`}
          >
            <button
              onClick={() => handleToggle(item.id)}
              className={`w-full text-left font-semibold rounded-t-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${getSizeClasses()} ${getHeaderVariantClasses()}`}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <div className="flex justify-between items-center">
                <span>{item.title}</span>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${
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
                className={`text-gray-700 border-t-2 border-opacity-30 ${getSizeClasses()}`}
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