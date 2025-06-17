import React from 'react';

interface IconProgressProps {
  value: number;
  max?: number;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end' | 'center';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const IconProgress: React.FC<IconProgressProps> = ({
  value,
  max = 100,
  icon,
  iconPosition = 'end',
  className = '',
  size = 'md',
  variant = 'default',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const variantClasses = {
    default: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
  };

  const defaultIcon = (
    <svg
      className={iconSizeClasses[size]}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  );

  const getIconPosition = () => {
    if (iconPosition === 'start') return '4px';
    if (iconPosition === 'center') return '50%';
    return `calc(${percentage}% - 24px)`;
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}
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
      {(icon || percentage > 0) && (
        <div
          className="absolute top-1/2 transform -translate-y-1/2 text-white flex items-center justify-center transition-all duration-300 ease-out"
          style={{
            left: getIconPosition(),
            transform: iconPosition === 'center' ? 'translate(-50%, -50%)' : 'translateY(-50%)',
          }}
        >
          {icon || defaultIcon}
        </div>
      )}
    </div>
  );
}; 