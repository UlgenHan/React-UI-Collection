import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface RoundedBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const RoundedBreadcrumb: React.FC<RoundedBreadcrumbProps> = ({ 
  items, 
  className = '' 
}) => {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <svg
                className="w-5 h-5 text-gray-400 mx-2"
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
            <div
              className={`
                px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200
                ${
                  item.isActive
                    ? 'bg-blue-100 text-blue-800'
                    : item.href
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-100 text-gray-700'
                }
              `}
            >
              {item.href && !item.isActive ? (
                <a
                  href={item.href}
                  className="block w-full h-full"
                  aria-current={item.isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              ) : (
                <span aria-current={item.isActive ? 'page' : undefined}>
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