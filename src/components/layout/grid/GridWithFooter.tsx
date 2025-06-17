import React from 'react';

export interface GridWithFooterProps {
  footer: React.ReactNode;
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  footerGap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const GridWithFooter: React.FC<GridWithFooterProps> = ({
  footer,
  children,
  columns = 3,
  gap = 'md',
  footerGap = 'md',
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

  const footerGapClasses = {
    none: 'mt-0',
    sm: 'mt-2',
    md: 'mt-4',
    lg: 'mt-6',
    xl: 'mt-8'
  };

  return (
    <div className={className}>
      {/* Grid Content */}
      <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]}`}>
        {children}
      </div>
      
      {/* Footer */}
      <div className={`w-full ${footerGapClasses[footerGap]}`}>
        {footer}
      </div>
    </div>
  );
};

export default GridWithFooter; 