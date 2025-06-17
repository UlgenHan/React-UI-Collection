import React from 'react';

export interface ScrollContainerProps {
  children: React.ReactNode;
  height?: 'auto' | '32' | '48' | '64' | '80' | '96' | 'screen';
  maxHeight?: 'none' | '32' | '48' | '64' | '80' | '96' | 'screen';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  scrollbarStyle?: 'default' | 'thin' | 'hidden';
  className?: string;
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({
  children,
  height = '64',
  maxHeight = 'none',
  padding = 'md',
  scrollbarStyle = 'default',
  className = ''
}) => {
  const heightClasses = {
    auto: 'h-auto',
    '32': 'h-32',
    '48': 'h-48',
    '64': 'h-64',
    '80': 'h-80',
    '96': 'h-96',
    screen: 'h-screen'
  };

  const maxHeightClasses = {
    none: '',
    '32': 'max-h-32',
    '48': 'max-h-48',
    '64': 'max-h-64',
    '80': 'max-h-80',
    '96': 'max-h-96',
    screen: 'max-h-screen'
  };

  const paddingClasses = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const scrollbarClasses = {
    default: 'overflow-y-auto',
    thin: 'overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100',
    hidden: 'overflow-y-auto scrollbar-hide'
  };

  return (
    <div className={`
      ${heightClasses[height]} 
      ${maxHeightClasses[maxHeight]} 
      ${paddingClasses[padding]} 
      ${scrollbarClasses[scrollbarStyle]} 
      ${className}
    `}>
      {children}
    </div>
  );
};

export default ScrollContainer; 