import React from 'react';

export interface CenteredFlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  minHeight?: 'auto' | 'screen' | '96' | '80' | '64' | '48';
  className?: string;
}

const CenteredFlex: React.FC<CenteredFlexProps> = ({
  children,
  direction = 'column',
  gap = 'md',
  minHeight = 'auto',
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

  const heightClasses = {
    auto: '',
    screen: 'min-h-screen',
    '96': 'min-h-96',
    '80': 'min-h-80',
    '64': 'min-h-64',
    '48': 'min-h-48'
  };

  const directionClass = direction === 'row' ? 'flex-row' : 'flex-col';

  return (
    <div className={`flex ${directionClass} items-center justify-center ${gapClasses[gap]} ${heightClasses[minHeight]} ${className}`}>
      {children}
    </div>
  );
};

export default CenteredFlex; 