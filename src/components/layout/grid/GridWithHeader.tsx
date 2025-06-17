import React from 'react';

export interface GridWithHeaderProps {
  header: React.ReactNode;
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  headerGap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const GridWithHeader: React.FC<GridWithHeaderProps> = ({
  header,
  children,
  columns = 3,
  gap = 'md',
  headerGap = 'md',
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

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  const headerGapClasses = {
    none: 'mb-0',
    sm: 'mb-2',
    md: 'mb-4',
    lg: 'mb-6',
    xl: 'mb-8'
  };

  return (
    <div className={className}>
      {/* Header */}
      <div className={`w-full ${headerGapClasses[headerGap]}`}>
        {header}
      </div>
      
      {/* Grid Content */}
      <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]}`}>
        {children}
      </div>
    </div>
  );
};

export default GridWithHeader; 