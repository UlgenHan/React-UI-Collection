import React from 'react';

interface VerticalProgressProps {
  value: number;
  max?: number;
  height?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  showPercentage?: boolean;
  label?: string;
}

export const VerticalProgress: React.FC<VerticalProgressProps> = ({
  value,
  max = 100,
  height = 200,
  className = '',
  size = 'md',
  variant = 'default',
  showPercentage = false,
  label,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'w-2',
    md: 'w-3',
    lg: 'w-4',
  };

  const variantClasses = {
    default: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {label && (
        <div className="mb-2 text-sm font-medium text-gray-700 text-center">
          {label}
        </div>
      )}
      <div
        className={`bg-gray-200 rounded-full overflow-hidden flex flex-col-reverse ${sizeClasses[size]}`}
        style={{ height: `${height}px` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={`w-full transition-all duration-300 ease-out ${variantClasses[variant]}`}
          style={{ height: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="mt-2 text-sm text-gray-500 text-center">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
}; 