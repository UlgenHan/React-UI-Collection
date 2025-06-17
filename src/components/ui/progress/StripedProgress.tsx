import React from 'react';

interface StripedProgressProps {
  value: number;
  max?: number;
  animated?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const StripedProgress: React.FC<StripedProgressProps> = ({
  value,
  max = 100,
  animated = true,
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

  const stripeStyle = {
    backgroundImage: `linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    )`,
    backgroundSize: '1rem 1rem',
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
        className={`h-full transition-all duration-300 ease-out ${variantClasses[variant]} ${
          animated ? 'animate-pulse' : ''
        }`}
        style={{
          width: `${percentage}%`,
          ...stripeStyle,
          animation: animated ? 'progress-stripes 1s linear infinite' : undefined,
        }}
      />
      <style jsx>{`
        @keyframes progress-stripes {
          0% {
            background-position: 1rem 0;
          }
          100% {
            background-position: 0 0;
          }
        }
      `}</style>
    </div>
  );
}; 