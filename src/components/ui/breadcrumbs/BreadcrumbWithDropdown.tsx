import React, { useState } from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbWithDropdownProps {
  items: BreadcrumbItem[];
  maxVisibleItems?: number;
  className?: string;
}

export const BreadcrumbWithDropdown: React.FC<BreadcrumbWithDropdownProps> = ({ 
  items, 
  maxVisibleItems = 3,
  className = '' 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const shouldCollapse = items.length > maxVisibleItems;
  const hiddenItems = shouldCollapse ? items.slice(1, -1) : [];

  const getVisibleItems = () => {
    if (!shouldCollapse) return items;
    
    return [
      items[0],
      ...hiddenItems,
      items[items.length - 1]
    ];
  };

  const visibleItems = shouldCollapse 
    ? [items[0], items[items.length - 1]]
    : items;

  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {visibleItems.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && !shouldCollapse && (
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            
            {shouldCollapse && index === 1 && (
              <div className="relative">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-700 md:ml-2 transition-colors duration-200"
                  aria-label="Show hidden breadcrumb items"
                >
                  ...
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                    <div className="py-1">
                      {hiddenItems.map((hiddenItem, hiddenIndex) => (
                        <div key={hiddenIndex}>
                          {hiddenItem.href ? (
                            <a
                              href={hiddenItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              {hiddenItem.label}
                            </a>
                          ) : (
                            <span className="block px-4 py-2 text-sm text-gray-700">
                              {hiddenItem.label}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}

            {item.href && !item.isActive ? (
              <a
                href={item.href}
                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 transition-colors duration-200"
              >
                {item.label}
              </a>
            ) : (
              <span
                className={`ml-1 text-sm font-medium md:ml-2 ${
                  item.isActive
                    ? 'text-gray-500 cursor-default'
                    : 'text-gray-700'
                }`}
                aria-current={item.isActive ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}; 