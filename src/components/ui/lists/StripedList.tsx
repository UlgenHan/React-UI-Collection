import React from 'react';

interface ListItem {
  id?: string | number;
  text: string;
}

interface StripedListProps {
  items: ListItem[];
  onItemClick?: (item: ListItem, index: number) => void;
  evenColor?: string;
  oddColor?: string;
  className?: string;
  itemClassName?: string;
}

export const StripedList: React.FC<StripedListProps> = ({
  items,
  onItemClick,
  evenColor = 'bg-white',
  oddColor = 'bg-gray-50',
  className = '',
  itemClassName = '',
}) => {
  return (
    <ul className={`divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      {items.map((item, index) => (
        <li
          key={item.id || index}
          onClick={onItemClick ? () => onItemClick(item, index) : undefined}
          className={`
            px-4 py-3 text-gray-900
            ${index % 2 === 0 ? evenColor : oddColor}
            ${onItemClick ? 'cursor-pointer hover:bg-blue-50 transition-colors duration-150' : ''}
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
      
      {items.length === 0 && (
        <div className="px-4 py-8 text-center text-gray-500">
          <p>No items to display</p>
        </div>
      )}
    </ul>
  );
}; 