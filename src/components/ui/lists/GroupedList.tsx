import React from 'react';

interface ListItem {
  id?: string | number;
  text: string;
}

interface ListGroup {
  title: string;
  items: ListItem[];
}

interface GroupedListProps {
  groups: ListGroup[];
  onItemClick?: (item: ListItem, groupIndex: number, itemIndex: number) => void;
  className?: string;
  groupClassName?: string;
  itemClassName?: string;
}

export const GroupedList: React.FC<GroupedListProps> = ({
  groups,
  onItemClick,
  className = '',
  groupClassName = '',
  itemClassName = '',
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className={groupClassName}>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
            {group.title}
          </h3>
          <ul className="space-y-1">
            {group.items.map((item, itemIndex) => (
              <li
                key={item.id || itemIndex}
                onClick={onItemClick ? () => onItemClick(item, groupIndex, itemIndex) : undefined}
                className={`
                  px-4 py-3 rounded-lg text-gray-700
                  ${onItemClick ? 'cursor-pointer hover:bg-gray-50 transition-colors duration-150' : ''}
                  ${itemClassName}
                `}
                tabIndex={onItemClick ? 0 : undefined}
                onKeyDown={(e) => {
                  if (onItemClick && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onItemClick(item, groupIndex, itemIndex);
                  }
                }}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}; 