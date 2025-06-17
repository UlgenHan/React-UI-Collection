import React from 'react';

interface PulseCircleLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

export const PulseCircleLoader: React.FC<PulseCircleLoaderProps> = ({
  size = 'md',
  color = 'bg-blue-600',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`} role="status" aria-label="Loading">
      <div className={`absolute inset-0 ${color} rounded-full animate-ping opacity-75`} />
      <div className={`relative ${sizeClasses[size]} ${color} rounded-full animate-pulse`} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}; 