import React from 'react';

export interface InlineFlexProps {
  children: React.ReactNode;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  className?: string;
}

const InlineFlex: React.FC<InlineFlexProps> = ({
  children,
  gap = 'sm',
  align = 'center',
  justify = 'start',
  wrap = false,
  className = ''
}) => {
  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
    xl: 'gap-4',
    '2xl': 'gap-6'
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    baseline: 'items-baseline',
    stretch: 'items-stretch'
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  };

  const wrapClass = wrap ? 'flex-wrap' : 'flex-nowrap';

  return (
    <div className={`inline-flex ${wrapClass} ${gapClasses[gap]} ${alignClasses[align]} ${justifyClasses[justify]} ${className}`}>
      {children}
    </div>
  );
};

export default InlineFlex; 