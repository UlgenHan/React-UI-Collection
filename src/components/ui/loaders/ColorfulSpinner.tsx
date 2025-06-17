import React from 'react';

interface ColorfulSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gradient' | 'rainbow' | 'pulse';
  className?: string;
}

export const ColorfulSpinner: React.FC<ColorfulSpinnerProps> = ({
  size = 'md',
  variant = 'gradient',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const variantClasses = {
    gradient: 'border-transparent border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-red-500',
    rainbow: 'border-transparent border-t-red-500 border-r-yellow-500 border-b-green-500 border-l-blue-500',
    pulse: 'border-gray-300 border-t-transparent bg-gradient-to-r from-blue-500 to-purple-500',
  };

  if (variant === 'pulse') {
    return (
      <div className={`relative ${sizeClasses[size]} ${className}`} role="status" aria-label="Loading">
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-ping opacity-75`} />
        <div className={`relative ${sizeClasses[size]} rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse`} />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div
      className={`animate-spin rounded-full border-4 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}; 