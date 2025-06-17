import React from 'react';

export interface ResponsiveGridContainerProps {
  children: React.ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const ResponsiveGridContainer: React.FC<ResponsiveGridContainerProps> = ({
  children,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 'md',
  padding = 'md',
  className = ''
}) => {
  const getColumnClass = (size: string, cols: number) => {
    const prefix = size === 'sm' ? '' : `${size}:`;
    return `${prefix}grid-cols-${cols}`;
  };

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  const paddingClasses = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const gridClasses = [
    columns.sm && getColumnClass('sm', columns.sm),
    columns.md && getColumnClass('md', columns.md),
    columns.lg && getColumnClass('lg', columns.lg),
    columns.xl && getColumnClass('xl', columns.xl)
  ].filter(Boolean).join(' ');

  return (
    <div className={`grid ${gridClasses} ${gapClasses[gap]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveGridContainer; 