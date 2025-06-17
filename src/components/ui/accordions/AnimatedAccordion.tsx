import React, { useState, useRef, useEffect } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

interface AnimatedAccordionProps {
  items: AccordionItem[];
  onToggle?: (itemId: string, isOpen: boolean) => void;
  className?: string;
}

export const AnimatedAccordion: React.FC<AnimatedAccordionProps> = ({
  items,
  onToggle,
  className = '',
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(items.filter(item => item.defaultOpen).map(item => item.id))
  );
  const [heights, setHeights] = useState<Record<string, number>>({});
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const newHeights: Record<string, number> = {};
    Object.entries(contentRefs.current).forEach(([id, ref]) => {
      if (ref && openItems.has(id)) {
        newHeights[id] = ref.scrollHeight;
      } else {
        newHeights[id] = 0;
      }
    });
    setHeights(newHeights);
  }, [openItems]);

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
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => handleToggle(item.id)}
              className="w-full px-4 py-3 text-left font-medium text-gray-900 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors duration-200"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <div className="flex justify-between items-center">
                <span>{item.title}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform duration-300 ease-in-out ${
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
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{ height: heights[item.id] || 0 }}
            >
              <div
                ref={(el) => (contentRefs.current[item.id] = el)}
                id={`accordion-content-${item.id}`}
                className="px-4 py-3 text-gray-700 border-t border-gray-200"
                role="region"
                aria-labelledby={`accordion-header-${item.id}`}
              >
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}; 