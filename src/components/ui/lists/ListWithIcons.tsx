import React from 'react';

interface ListItem {
  id?: string | number;
  text: string;
  icon?: React.ReactNode;
}

interface ListWithIconsProps {
  items: ListItem[];
  defaultIcon?: React.ReactNode;
  className?: string;
  itemClassName?: string;
}

export const ListWithIcons: React.FC<ListWithIconsProps> = ({
  items,
  defaultIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  className = '',
  itemClassName = '',
}) => {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, index) => (
        <li
          key={item.id || index}
          className={`flex items-center space-x-3 text-gray-900 ${itemClassName}`}
        >
          <span className="flex-shrink-0 text-gray-500">
            {item.icon || defaultIcon}
          </span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}; 