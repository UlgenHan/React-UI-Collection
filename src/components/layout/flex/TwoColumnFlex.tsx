import React from 'react';

export interface TwoColumnFlexProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  leftWidth?: '1/4' | '1/3' | '1/2' | '2/3' | '3/4';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  responsive?: boolean;
  className?: string;
}

const TwoColumnFlex: React.FC<TwoColumnFlexProps> = ({
  leftContent,
  rightContent,
  leftWidth = '1/2',
  gap = 'md',
  align = 'start',
  responsive = true,
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

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  };

  const getWidthClasses = (width: string) => {
    switch (width) {
      case '1/4': return { left: 'w-1/4', right: 'w-3/4' };
      case '1/3': return { left: 'w-1/3', right: 'w-2/3' };
      case '1/2': return { left: 'w-1/2', right: 'w-1/2' };
      case '2/3': return { left: 'w-2/3', right: 'w-1/3' };
      case '3/4': return { left: 'w-3/4', right: 'w-1/4' };
      default: return { left: 'w-1/2', right: 'w-1/2' };
    }
  };

  const widths = getWidthClasses(leftWidth);
  const responsiveClass = responsive ? 'flex-col md:flex-row' : 'flex-row';

  return (
    <div className={`flex ${responsiveClass} ${gapClasses[gap]} ${alignClasses[align]} ${className}`}>
      <div className={`${responsive ? 'w-full md:' : ''}${widths.left} min-w-0`}>
        {leftContent}
      </div>
      <div className={`${responsive ? 'w-full md:' : ''}${widths.right} min-w-0`}>
        {rightContent}
      </div>
    </div>
  );
};

export default TwoColumnFlex; 