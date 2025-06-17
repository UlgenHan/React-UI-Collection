import React from 'react';

interface ListAction {
  label: string;
  onClick: (item: ListItem, index: number) => void;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

interface ListItem {
  id?: string | number;
  text: string;
  actions?: ListAction[];
}

interface ListWithActionsProps {
  items: ListItem[];
  defaultActions?: ListAction[];
  onItemClick?: (item: ListItem, index: number) => void;
  className?: string;
  itemClassName?: string;
}

export const ListWithActions: React.FC<ListWithActionsProps> = ({
  items,
  defaultActions = [],
  onItemClick,
  className = '',
  itemClassName = '',
}) => {
  const getActionButtonClasses = (variant: string = 'secondary') => {
    const baseClasses = 'px-3 py-1 text-xs font-medium rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };

    return `${baseClasses} ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.secondary}`;
  };

  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item, index) => {
        const actions = item.actions || defaultActions;
        
        return (
          <li
            key={item.id || index}
            className={`
              flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-200
              ${onItemClick ? 'cursor-pointer hover:bg-gray-50' : ''}
              transition-colors duration-150
              ${itemClassName}
            `}
          >
            <div
              onClick={onItemClick ? () => onItemClick(item, index) : undefined}
              className="flex-1 mr-4"
            >
              <span className="text-gray-900">{item.text}</span>
            </div>
            
            {actions.length > 0 && (
              <div className="flex items-center space-x-2">
                {actions.map((action, actionIndex) => (
                  <button
                    key={actionIndex}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!action.disabled) {
                        action.onClick(item, index);
                      }
                    }}
                    disabled={action.disabled}
                    className={`
                      ${getActionButtonClasses(action.variant)}
                      ${action.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    title={action.label}
                    aria-label={action.label}
                  >
                    {action.icon ? (
                      <span className="flex items-center">
                        <span className="mr-1">{action.icon}</span>
                        {action.label}
                      </span>
                    ) : (
                      action.label
                    )}
                  </button>
                ))}
              </div>
            )}
          </li>
        );
      })}
      
      {items.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No items to display</p>
        </div>
      )}
    </ul>
  );
}; 