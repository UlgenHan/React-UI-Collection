import React from 'react';

export interface CenteredContainerProps {
  children: React.ReactNode;
  minHeight?: 'screen' | '96' | '80' | '64' | '48';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const CenteredContainer: React.FC<CenteredContainerProps> = ({
  children,
  minHeight = 'screen',
  padding = 'md',
  className = ''
}) => {
  const heightClasses = {
    screen: 'min-h-screen',
    '96': 'min-h-96',
    '80': 'min-h-80',
    '64': 'min-h-64',
    '48': 'min-h-48'
  };

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12'
  };

  return (
    <div className={`flex items-center justify-center ${heightClasses[minHeight]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default CenteredContainer; 