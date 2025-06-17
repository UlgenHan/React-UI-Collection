import React from 'react';

export interface FlexRowProps {
  children: React.ReactNode;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  wrap?: boolean;
  className?: string;
}

const FlexRow: React.FC<FlexRowProps> = ({
  children,
  gap = 'md',
  justify = 'start',
  align = 'center',
  wrap = false,
  className = ''
}) => {
  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
    '2xl': 'gap-12'
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline'
  };

  const wrapClass = wrap ? 'flex-wrap' : 'flex-nowrap';

  return (
    <div className={`flex ${wrapClass} ${gapClasses[gap]} ${justifyClasses[justify]} ${alignClasses[align]} ${className}`}>
      {children}
    </div>
  );
};

export default FlexRow; 