import React from 'react';

export interface FlexStackProps {
  children: React.ReactNode;
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  divider?: React.ReactNode;
  className?: string;
}

const FlexStack: React.FC<FlexStackProps> = ({
  children,
  gap = 'md',
  align = 'stretch',
  divider,
  className = ''
}) => {
  const gapClasses = {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
    '2xl': 'gap-12',
    '3xl': 'gap-16'
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  };

  const childrenArray = React.Children.toArray(children);

  if (divider) {
    return (
      <div className={`flex flex-col ${alignClasses[align]} ${className}`}>
        {childrenArray.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {index < childrenArray.length - 1 && divider}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${gapClasses[gap]} ${alignClasses[align]} ${className}`}>
      {children}
    </div>
  );
};

export default FlexStack; 