import React from 'react';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  animated?: boolean;
  className?: string;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 4,
  showHeader = true,
  animated = true,
  className = '',
}) => {
  const animationClass = animated ? 'animate-pulse' : '';

  return (
    <div className={`w-full ${className}`} role="status" aria-label="Loading table">
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        {showHeader && (
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns }).map((_, index) => (
                <div
                  key={index}
                  className={`h-4 bg-gray-300 rounded w-3/4 ${animationClass}`}
                />
              ))}
            </div>
          </div>
        )}
        
        <div className="divide-y divide-gray-200">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="px-6 py-4">
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <div
                    key={colIndex}
                    className={`h-4 bg-gray-300 rounded ${
                      colIndex === 0 ? 'w-full' : 'w-2/3'
                    } ${animationClass}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}; 