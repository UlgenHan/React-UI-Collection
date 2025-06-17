import React from 'react';

interface PositionedBadgeProps {
  children: React.ReactNode;
  badge: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  offset?: 'none' | 'sm' | 'md';
  className?: string;
}

export const PositionedBadge: React.FC<PositionedBadgeProps> = ({
  children,
  badge,
  position = 'top-right',
  offset = 'sm',
  className = '',
}) => {
  const positionClasses = {
    'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
    'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
    'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
  };

  const offsetClasses = {
    none: '',
    sm: position.includes('right') ? '-mr-1' : position.includes('left') ? '-ml-1' : '',
    md: position.includes('right') ? '-mr-2' : position.includes('left') ? '-ml-2' : '',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {children}
      <span
        className={`
          absolute transform z-10
          ${positionClasses[position]}
          ${offsetClasses[offset]}
        `}
      >
        {badge}
      </span>
    </div>
  );
}; 