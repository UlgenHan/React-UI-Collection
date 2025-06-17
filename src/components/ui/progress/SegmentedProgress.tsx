import React from 'react';

interface SegmentedProgressProps {
  value: number;
  max?: number;
  segments?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  showLabels?: boolean;
}

export const SegmentedProgress: React.FC<SegmentedProgressProps> = ({
  value,
  max = 100,
  segments = 5,
  className = '',
  size = 'md',
  variant = 'default',
  showLabels = false,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const segmentWidth = 100 / segments;
  const completedSegments = Math.floor((percentage / 100) * segments);
  const partialSegmentProgress = ((percentage / 100) * segments) % 1;

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const variantClasses = {
    default: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
  };

  const variantBorderClasses = {
    default: 'border-blue-600',
    success: 'border-green-600',
    warning: 'border-yellow-600',
    error: 'border-red-600',
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`w-full bg-gray-200 rounded-full overflow-hidden flex ${sizeClasses[size]}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        {Array.from({ length: segments }).map((_, index) => {
          let segmentFillPercentage = 0;
          
          if (index < completedSegments) {
            segmentFillPercentage = 100;
          } else if (index === completedSegments) {
            segmentFillPercentage = partialSegmentProgress * 100;
          }

          return (
            <div
              key={index}
              className="relative bg-gray-200 border-r border-white last:border-r-0"
              style={{ width: `${segmentWidth}%` }}
            >
              <div
                className={`h-full ${variantClasses[variant]} transition-all duration-300 ease-out`}
                style={{ width: `${segmentFillPercentage}%` }}
              />
            </div>
          );
        })}
      </div>
      {showLabels && (
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          {Array.from({ length: segments + 1 }).map((_, index) => (
            <span key={index}>
              {Math.round((index / segments) * max)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}; 