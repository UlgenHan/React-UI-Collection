import React from 'react';

interface ListItem {
  id?: string | number;
  title: string;
  description?: string;
  image?: string;
  metadata?: Record<string, any>;
}

interface CardListProps {
  items: ListItem[];
  onItemClick?: (item: ListItem, index: number) => void;
  showImage?: boolean;
  className?: string;
  cardClassName?: string;
}

export const CardList: React.FC<CardListProps> = ({
  items,
  onItemClick,
  showImage = true,
  className = '',
  cardClassName = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <div
          key={item.id || index}
          onClick={onItemClick ? () => onItemClick(item, index) : undefined}
          className={`
            bg-white rounded-lg border border-gray-200 shadow-sm
            ${onItemClick ? 'cursor-pointer hover:shadow-md transition-shadow duration-200' : ''}
            ${cardClassName}
          `}
          tabIndex={onItemClick ? 0 : undefined}
          onKeyDown={(e) => {
            if (onItemClick && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              onItemClick(item, index);
            }
          }}
        >
          <div className="p-6">
            <div className="flex items-start space-x-4">
              {showImage && item.image && (
                <div className="flex-shrink-0">
                  <img
                    className="w-12 h-12 rounded-lg object-cover"
                    src={item.image}
                    alt=""
                  />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {item.title}
                </h3>
                
                {item.description && (
                  <p className="mt-2 text-gray-600 text-sm">
                    {item.description}
                  </p>
                )}
                
                {item.metadata && Object.keys(item.metadata).length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {Object.entries(item.metadata).map(([key, value]) => (
                      <span
                        key={key}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {key}: {value}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              {onItemClick && (
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-gray-400"
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
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {items.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A9.971 9.971 0 0124 24c4.004 0 7.625 2.347 9.287 6m-9.287-6c4.004 0 7.625 2.347 9.287 6M15 12a3 3 0 11-6 0 3 3 0 016 0zm8 0a3 3 0 11-6 0 3 3 0 016 0zm8 0a3 3 0 11-6 0 3 3 0 016 0z"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No items</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding some items to the list.</p>
          </div>
        </div>
      )}
    </div>
  );
}; 