import React from 'react';

interface DualRingLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

export const DualRingLoader: React.FC<DualRingLoaderProps> = ({
  size = 'md',
  color = 'border-blue-600',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`} role="status" aria-label="Loading">
      <div
        className={`absolute inset-0 rounded-full border-2 border-transparent border-t-current border-r-current animate-spin ${color}`}
      />
      <div
        className={`absolute inset-1 rounded-full border-2 border-transparent border-b-current border-l-current animate-spin ${color}`}
        style={{ animationDirection: 'reverse', animationDuration: '1s' }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}; 