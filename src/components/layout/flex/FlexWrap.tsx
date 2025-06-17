import React from 'react';

export interface FlexWrapProps {
  children: React.ReactNode;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'stretch';
  alignContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  className?: string;
}

const FlexWrap: React.FC<FlexWrapProps> = ({
  children,
  gap = 'md',
  justify = 'start',
  align = 'center',
  alignContent = 'start',
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

  const contentClasses = {
    start: 'content-start',
    center: 'content-center',
    end: 'content-end',
    between: 'content-between',
    around: 'content-around',
    evenly: 'content-evenly'
  };

  return (
    <div className={`flex flex-wrap ${gapClasses[gap]} ${justifyClasses[justify]} ${alignClasses[align]} ${contentClasses[alignContent]} ${className}`}>
      {children}
    </div>
  );
};

export default FlexWrap; 