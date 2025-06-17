import React from 'react';

interface ListItem {
  id?: string | number;
  text: string;
}

interface ScrollableListProps {
  items: ListItem[];
  height?: string;
  onItemClick?: (item: ListItem, index: number) => void;
  className?: string;
  itemClassName?: string;
}

export const ScrollableList: React.FC<ScrollableListProps> = ({
  items,
  height = '300px',
  onItemClick,
  className = '',
  itemClassName = '',
}) => {
  return (
    <div
      className={`overflow-y-auto border border-gray-200 rounded-lg ${className}`}
      style={{ height }}
    >
      <ul className="divide-y divide-gray-200">
        {items.map((item, index) => (
          <li
            key={item.id || index}
            onClick={onItemClick ? () => onItemClick(item, index) : undefined}
            className={`
              px-4 py-3 text-gray-900
              ${onItemClick ? 'cursor-pointer hover:bg-gray-50 transition-colors duration-150' : ''}
              ${itemClassName}
            `}
            tabIndex={onItemClick ? 0 : undefined}
            onKeyDown={(e) => {
              if (onItemClick && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onItemClick(item, index);
              }
            }}
          >
            {item.text}
          </li>
        ))}
      </ul>
      
      {items.length === 0 && (
        <div className="flex items-center justify-center h-full text-gray-500">
          <span>No items to display</span>
        </div>
      )}
    </div>
  );
}; 