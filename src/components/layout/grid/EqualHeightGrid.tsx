import React from 'react';

export interface EqualHeightGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  minHeight?: 'auto' | '32' | '48' | '64' | '80' | '96';
  className?: string;
}

const EqualHeightGrid: React.FC<EqualHeightGridProps> = ({
  children,
  columns = 3,
  gap = 'md',
  minHeight = 'auto',
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

  const heightClasses = {
    auto: '',
    '32': 'grid-rows-[min-content] min-h-32',
    '48': 'grid-rows-[min-content] min-h-48',
    '64': 'grid-rows-[min-content] min-h-64',
    '80': 'grid-rows-[min-content] min-h-80',
    '96': 'grid-rows-[min-content] min-h-96'
  };

  return (
    <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]} ${heightClasses[minHeight]} items-stretch ${className}`}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className="flex flex-col h-full">
          {child}
        </div>
      ))}
    </div>
  );
};

export default EqualHeightGrid; 