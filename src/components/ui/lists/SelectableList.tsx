import React, { useState } from 'react';

interface ListItem {
  id: string | number;
  text: string;
  disabled?: boolean;
}

interface SelectableListProps {
  items: ListItem[];
  selectedId?: string | number;
  onSelectionChange?: (id: string | number) => void;
  multiSelect?: boolean;
  selectedIds?: (string | number)[];
  className?: string;
  itemClassName?: string;
}

export const SelectableList: React.FC<SelectableListProps> = ({
  items,
  selectedId,
  onSelectionChange,
  multiSelect = false,
  selectedIds = [],
  className = '',
  itemClassName = '',
}) => {
  const [internalSelected, setInternalSelected] = useState<string | number | undefined>(selectedId);
  const [internalMultiSelected, setInternalMultiSelected] = useState<(string | number)[]>(selectedIds);

  const currentSelected = onSelectionChange ? selectedId : internalSelected;
  const currentMultiSelected = onSelectionChange ? selectedIds : internalMultiSelected;

  const handleItemClick = (id: string | number) => {
    if (multiSelect) {
      const newSelected = currentMultiSelected.includes(id)
        ? currentMultiSelected.filter(selectedId => selectedId !== id)
        : [...currentMultiSelected, id];
      
      if (onSelectionChange) {
        onSelectionChange(id);
      } else {
        setInternalMultiSelected(newSelected);
      }
    } else {
      if (onSelectionChange) {
        onSelectionChange(id);
      } else {
        setInternalSelected(id);
      }
    }
  };

  const isSelected = (id: string | number) => {
    return multiSelect
      ? currentMultiSelected.includes(id)
      : currentSelected === id;
  };

  return (
    <ul className={`space-y-1 ${className}`}>
      {items.map((item) => (
        <li
          key={item.id}
          onClick={item.disabled ? undefined : () => handleItemClick(item.id)}
          className={`
            px-4 py-3 rounded-lg cursor-pointer transition-colors duration-150
            ${isSelected(item.id)
              ? 'bg-blue-100 text-blue-900 border border-blue-200'
              : 'text-gray-900 hover:bg-gray-100'
            }
            ${item.disabled
              ? 'opacity-50 cursor-not-allowed hover:bg-transparent'
              : ''
            }
            ${itemClassName}
          `}
          role="option"
          aria-selected={isSelected(item.id)}
          tabIndex={item.disabled ? -1 : 0}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !item.disabled) {
              e.preventDefault();
              handleItemClick(item.id);
            }
          }}
        >
          <div className="flex items-center justify-between">
            <span>{item.text}</span>
            {isSelected(item.id) && (
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}; 