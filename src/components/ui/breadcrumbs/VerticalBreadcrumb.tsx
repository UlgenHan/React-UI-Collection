import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface VerticalBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const VerticalBreadcrumb: React.FC<VerticalBreadcrumbProps> = ({ 
  items, 
  className = '' 
}) => {
  return (
    <nav className={`flex flex-col ${className}`} aria-label="Breadcrumb">
      <ol className="flex flex-col space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex flex-col">
            <div className="flex items-center">
              {index > 0 && (
                <div className="flex flex-col items-center mr-2">
                  <div className="w-px h-4 bg-gray-300"></div>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
              <div className="flex items-center">
                <div
                  className={`
                    w-2 h-2 rounded-full mr-3
                    ${
                      item.isActive
                        ? 'bg-blue-500'
                        : 'bg-gray-300'
                    }
                  `}
                ></div>
                {item.href && !item.isActive ? (
                  <a
                    href={item.href}
                    className={`
                      text-sm font-medium transition-colors duration-200
                      ${
                        item.isActive
                          ? 'text-blue-600 cursor-default'
                          : 'text-gray-700 hover:text-blue-600'
                      }
                    `}
                    aria-current={item.isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    className={`
                      text-sm font-medium
                      ${
                        item.isActive
                          ? 'text-blue-600 cursor-default'
                          : 'text-gray-700'
                      }
                    `}
                    aria-current={item.isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </div>
            </div>
            {index < items.length - 1 && (
              <div className="w-px h-4 bg-gray-300 ml-1 mt-2"></div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}; 