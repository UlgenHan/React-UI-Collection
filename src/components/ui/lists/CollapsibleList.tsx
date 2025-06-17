import React, { useState } from 'react';

interface SubItem {
  id?: string | number;
  text: string;
}

interface ListItem {
  id: string | number;
  text: string;
  subItems?: SubItem[];
  expanded?: boolean;
}

interface CollapsibleListProps {
  items: ListItem[];
  defaultExpanded?: boolean;
  onToggle?: (id: string | number, expanded: boolean) => void;
  className?: string;
  itemClassName?: string;
  subItemClassName?: string;
}

export const CollapsibleList: React.FC<CollapsibleListProps> = ({
  items,
  defaultExpanded = false,
  onToggle,
  className = '',
  itemClassName = '',
  subItemClassName = '',
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string | number>>(
    new Set(
      items
        .filter(item => item.expanded ?? defaultExpanded)
        .map(item => item.id)
    )
  );

  const toggleItem = (id: string | number) => {
    const newExpanded = new Set(expandedItems);
    const wasExpanded = newExpanded.has(id);
    
    if (wasExpanded) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    
    setExpandedItems(newExpanded);
    onToggle?.(id, !wasExpanded);
  };

  return (
    <ul className={`space-y-1 ${className}`}>
      {items.map((item) => {
        const isExpanded = expandedItems.has(item.id);
        const hasSubItems = item.subItems && item.subItems.length > 0;
        
        return (
          <li key={item.id}>
            <div
              onClick={hasSubItems ? () => toggleItem(item.id) : undefined}
              className={`
                flex items-center justify-between px-4 py-3 rounded-lg
                ${hasSubItems ? 'cursor-pointer hover:bg-gray-50' : ''}
                transition-colors duration-150
                ${itemClassName}
              `}
              role={hasSubItems ? 'button' : undefined}
              tabIndex={hasSubItems ? 0 : undefined}
              onKeyDown={(e) => {
                if (hasSubItems && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  toggleItem(item.id);
                }
              }}
            >
              <span className="text-gray-900">{item.text}</span>
              {hasSubItems && (
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                    isExpanded ? 'rotate-90' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </div>
            
            {hasSubItems && isExpanded && (
              <ul className="mt-2 ml-6 space-y-1">
                {item.subItems!.map((subItem, subIndex) => (
                  <li
                    key={subItem.id || subIndex}
                    className={`px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150 ${subItemClassName}`}
                  >
                    {subItem.text}
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}; 