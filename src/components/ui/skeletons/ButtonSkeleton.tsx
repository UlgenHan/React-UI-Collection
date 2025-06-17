import React from 'react';

interface ButtonSkeletonProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
  width?: string;
  animated?: boolean;
  className?: string;
}

export const ButtonSkeleton: React.FC<ButtonSkeletonProps> = ({
  size = 'md',
  variant = 'primary',
  width = 'w-24',
  animated = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg',
  };

  const variantClasses = {
    primary: 'bg-gray-300',
    secondary: 'bg-gray-200 border border-gray-300',
    outline: 'bg-transparent border-2 border-gray-300',
  };

  const animationClass = animated ? 'animate-pulse' : '';

  return (
    <div
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 ${sizeClasses[size]} ${variantClasses[variant]} ${width} ${animationClass} ${className}`}
      role="status"
      aria-label="Loading button"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}; 