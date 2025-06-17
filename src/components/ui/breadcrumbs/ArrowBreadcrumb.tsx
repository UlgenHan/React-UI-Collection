import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface ArrowBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const ArrowBreadcrumb: React.FC<ArrowBreadcrumbProps> = ({ 
  items, 
  className = '' 
}) => {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <div
              className={`
                flex items-center px-3 py-2 text-sm font-medium
                ${index < items.length - 1 ? 'pr-8' : ''}
                ${index > 0 ? 'pl-8' : ''}
                relative
                ${
                  item.isActive
                    ? 'bg-blue-100 text-blue-800'
                    : item.href
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200'
                    : 'bg-gray-100 text-gray-700'
                }
              `}
              style={{
                clipPath: index === 0 
                  ? 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)'
                  : index === items.length - 1
                  ? 'polygon(20px 0, 100% 0, 100% 100%, 20px 100%, 0 50%)'
                  : 'polygon(20px 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 20px 100%, 0 50%)'
              }}
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