import React from 'react';

interface GradientProgressProps {
  value: number;
  max?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  gradient?: 'default' | 'success' | 'warning' | 'error' | 'rainbow' | 'ocean' | 'sunset';
}

export const GradientProgress: React.FC<GradientProgressProps> = ({
  value,
  max = 100,
  className = '',
  size = 'md',
  gradient = 'default',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const gradientClasses = {
    default: 'bg-gradient-to-r from-blue-500 to-blue-600',
    success: 'bg-gradient-to-r from-green-400 to-green-600',
    warning: 'bg-gradient-to-r from-yellow-400 to-orange-500',
    error: 'bg-gradient-to-r from-red-400 to-red-600',
    rainbow: 'bg-gradient-to-r from-purple-500 via-pink-500 via-red-500 via-yellow-500 via-green-500 to-blue-500',
    ocean: 'bg-gradient-to-r from-cyan-400 to-blue-500',
    sunset: 'bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500',
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
        className={`h-full transition-all duration-300 ease-out ${gradientClasses[gradient]} shadow-sm`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}; 