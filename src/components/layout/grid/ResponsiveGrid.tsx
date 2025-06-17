import React from 'react';

export interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: {
    base?: 1 | 2 | 3 | 4;
    sm?: 1 | 2 | 3 | 4;
    md?: 1 | 2 | 3 | 4;
    lg?: 1 | 2 | 3 | 4;
    xl?: 1 | 2 | 3 | 4;
  };
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns = { base: 1, sm: 2, md: 2, lg: 3, xl: 4 },
  gap = 'md',
  className = ''
}) => {
  const getColumnClass = (breakpoint: string, cols: number) => {
    const prefix = breakpoint === 'base' ? '' : `${breakpoint}:`;
    return `${prefix}grid-cols-${cols}`;
  };

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  const responsiveClasses = [
    columns.base && getColumnClass('base', columns.base),
    columns.sm && getColumnClass('sm', columns.sm),
    columns.md && getColumnClass('md', columns.md),
    columns.lg && getColumnClass('lg', columns.lg),
    columns.xl && getColumnClass('xl', columns.xl)
  ].filter(Boolean).join(' ');

  return (
    <div className={`grid ${responsiveClasses} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveGrid; 