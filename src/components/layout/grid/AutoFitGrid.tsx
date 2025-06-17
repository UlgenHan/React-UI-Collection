import React from 'react';

export interface AutoFitGridProps {
  children: React.ReactNode;
  minColumnWidth?: '200px' | '250px' | '300px' | '350px' | '400px';
  maxColumnWidth?: '1fr' | '400px' | '500px' | '600px';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const AutoFitGrid: React.FC<AutoFitGridProps> = ({
  children,
  minColumnWidth = '250px',
  maxColumnWidth = '1fr',
  gap = 'md',
  className = ''
}) => {
  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  const gridStyle = {
    gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}, ${maxColumnWidth}))`
  };

  return (
    <div 
      className={`grid ${gapClasses[gap]} ${className}`}
      style={gridStyle}
    >
      {children}
    </div>
  );
};

export default AutoFitGrid; 