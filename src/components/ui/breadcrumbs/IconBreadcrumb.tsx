import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
  icon?: React.ReactNode;
}

interface IconBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const IconBreadcrumb: React.FC<IconBreadcrumbProps> = ({ 
  items, 
  className = '' 
}) => {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
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
            <div className="flex items-center">
              {item.icon && (
                <span className="w-4 h-4 mr-2 text-gray-500">
                  {item.icon}
                </span>
              )}
              {item.href && !item.isActive ? (
                <a
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={`text-sm font-medium ${
                    item.isActive
                      ? 'text-gray-500 cursor-default'
                      : 'text-gray-700'
                  }`}
                  aria-current={item.isActive ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}; 