import React from 'react';

interface ListItem {
  id?: string | number;
  text: string;
  badge?: {
    text: string | number;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  };
}

interface ListWithBadgesProps {
  items: ListItem[];
  onClick?: (item: ListItem, index: number) => void;
  className?: string;
  itemClassName?: string;
}

export const ListWithBadges: React.FC<ListWithBadgesProps> = ({
  items,
  onClick,
  className = '',
  itemClassName = '',
}) => {
  const getBadgeClasses = (variant: string = 'default') => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    
    const variantClasses = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
    };

    return `${baseClasses} ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.default}`;
  };

  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <li
          key={item.id || index}
          onClick={onClick ? () => onClick(item, index) : undefined}
          className={`
            flex items-center justify-between px-4 py-3 rounded-lg
            ${onClick ? 'cursor-pointer hover:bg-gray-50 transition-colors duration-150' : ''}
            ${itemClassName}
          `}
        >
          <span className="text-gray-900">{item.text}</span>
          {item.badge && (
            <span className={getBadgeClasses(item.badge.variant)}>
              {item.badge.text}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}; 