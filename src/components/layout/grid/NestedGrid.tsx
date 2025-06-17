import React from 'react';

export interface NestedGridProps {
  children: React.ReactNode;
  outerColumns?: 1 | 2 | 3 | 4;
  innerColumns?: 1 | 2 | 3 | 4;
  outerGap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  innerGap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const NestedGrid: React.FC<NestedGridProps> = ({
  children,
  outerColumns = 2,
  innerColumns = 2,
  outerGap = 'lg',
  innerGap = 'md',
  className = ''
}) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  };

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <div className={`grid ${columnClasses[outerColumns]} ${gapClasses[outerGap]} ${className}`}>
      {childrenArray.map((child, outerIndex) => (
        <div key={outerIndex} className={`grid ${columnClasses[innerColumns]} ${gapClasses[innerGap]}`}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default NestedGrid; 