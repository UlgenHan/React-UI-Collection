import React from 'react';

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'pending' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showDot = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const statusConfig = {
    online: { text: 'Online', classes: 'bg-green-100 text-green-800', dotColor: 'bg-green-400' },
    offline: { text: 'Offline', classes: 'bg-gray-100 text-gray-800', dotColor: 'bg-gray-400' },
    pending: { text: 'Pending', classes: 'bg-yellow-100 text-yellow-800', dotColor: 'bg-yellow-400' },
    success: { text: 'Success', classes: 'bg-green-100 text-green-800', dotColor: 'bg-green-400' },
    error: { text: 'Error', classes: 'bg-red-100 text-red-800', dotColor: 'bg-red-400' },
    warning: { text: 'Warning', classes: 'bg-yellow-100 text-yellow-800', dotColor: 'bg-yellow-400' },
    info: { text: 'Info', classes: 'bg-blue-100 text-blue-800', dotColor: 'bg-blue-400' },
  };

  const config = statusConfig[status];
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : 'w-2.5 h-2.5';

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${sizeClasses[size]}
        ${config.classes}
        ${className}
      `}
    >
      {showDot && (
        <span className={`${dotSize} ${config.dotColor} rounded-full mr-1.5`} />
      )}
      {config.text}
    </span>
  );
}; 