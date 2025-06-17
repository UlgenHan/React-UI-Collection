import React from 'react';

export interface MasonryGridProps {
  children: React.ReactNode;
  columns?: {
    base?: 1 | 2 | 3 | 4 | 5;
    sm?: 1 | 2 | 3 | 4 | 5;
    md?: 1 | 2 | 3 | 4 | 5;
    lg?: 1 | 2 | 3 | 4 | 5;
    xl?: 1 | 2 | 3 | 4 | 5;
  };
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({
  children,
  columns = { base: 1, sm: 2, md: 2, lg: 3, xl: 4 },
  gap = 'md',
  className = ''
}) => {
  const getColumnCountClass = (breakpoint: string, cols: number) => {
    const prefix = breakpoint === 'base' ? 'columns-' : `${breakpoint}:columns-`;
    return `${prefix}${cols}`;
  };

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  const columnClasses = [
    columns.base && getColumnCountClass('base', columns.base),
    columns.sm && getColumnCountClass('sm', columns.sm),
    columns.md && getColumnCountClass('md', columns.md),
    columns.lg && getColumnCountClass('lg', columns.lg),
    columns.xl && getColumnCountClass('xl', columns.xl)
  ].filter(Boolean).join(' ');

  return (
    <div className={`${columnClasses} ${gapClasses[gap]} ${className}`}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className="break-inside-avoid mb-4">
          {child}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid; 