import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface SlashBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const SlashBreadcrumb: React.FC<SlashBreadcrumbProps> = ({ 
  items, 
  className = '' 
}) => {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400 font-medium" aria-hidden="true">
                /
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
          </li>
        ))}
      </ol>
    </nav>
  );
}; 