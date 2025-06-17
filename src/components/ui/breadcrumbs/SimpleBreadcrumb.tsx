import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface SimpleBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const SimpleBreadcrumb: React.FC<SimpleBreadcrumbProps> = ({ 
  items, 
  className = '' 
}) => {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400" aria-hidden="true">
                &gt;
              </span>
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