import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface TopbarBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  sticky?: boolean;
}

export const TopbarBreadcrumb: React.FC<TopbarBreadcrumbProps> = ({ 
  items, 
  className = '',
  sticky = true
}) => {
  return (
    <div
      className={`
        w-full bg-white border-b border-gray-200 shadow-sm
        ${sticky ? 'sticky top-0 z-40' : ''}
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex py-3" aria-label="Breadcrumb">
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
      </div>
    </div>
  );
}; 