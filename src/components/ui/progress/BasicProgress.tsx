import React from 'react';

interface BasicProgressProps {
  value: number;
  max?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const BasicProgress: React.FC<BasicProgressProps> = ({
  value,
  max = 100,
  className = '',
  size = 'md',
  variant = 'default',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

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

  return (
    <div
      className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]} ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className={`h-full transition-all duration-300 ease-out ${variantClasses[variant]}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}; 