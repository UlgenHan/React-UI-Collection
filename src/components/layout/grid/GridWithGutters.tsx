import React from 'react';

export interface GridWithGuttersProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gutterX?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  gutterY?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

const GridWithGutters: React.FC<GridWithGuttersProps> = ({
  children,
  columns = 3,
  gutterX = 'md',
  gutterY = 'md',
  className = ''
}) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
  };

  const gutterXClasses = {
    none: 'gap-x-0',
    sm: 'gap-x-2',
    md: 'gap-x-4',
    lg: 'gap-x-6',
    xl: 'gap-x-8',
    '2xl': 'gap-x-12'
  };

  const gutterYClasses = {
    none: 'gap-y-0',
    sm: 'gap-y-2',
    md: 'gap-y-4',
    lg: 'gap-y-6',
    xl: 'gap-y-8',
    '2xl': 'gap-y-12'
  };

  return (
    <div className={`grid ${columnClasses[columns]} ${gutterXClasses[gutterX]} ${gutterYClasses[gutterY]} ${className}`}>
      {children}
    </div>
  );
};

export default GridWithGutters; 