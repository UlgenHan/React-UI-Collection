import React from 'react';

interface BasicListProps {
  items: string[] | React.ReactNode[];
  className?: string;
  itemClassName?: string;
}

export const BasicList: React.FC<BasicListProps> = ({
  items,
  className = '',
  itemClassName = '',
}) => {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <li
          key={index}
          className={`text-gray-900 ${itemClassName}`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}; 