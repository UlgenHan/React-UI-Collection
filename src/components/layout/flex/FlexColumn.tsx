import React from 'react';

export interface FlexColumnProps {
  children: React.ReactNode;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
}

const FlexColumn: React.FC<FlexColumnProps> = ({
  children,
  gap = 'md',
  justify = 'start',
  align = 'stretch',
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
    stretch: 'items-stretch'
  };

  return (
    <div className={`flex flex-col ${gapClasses[gap]} ${justifyClasses[justify]} ${alignClasses[align]} ${className}`}>
      {children}
    </div>
  );
};

export default FlexColumn; 