import React from 'react';

export interface SplitScreenContainerProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  divider?: boolean;
  minHeight?: 'auto' | 'screen' | '96' | '80' | '64';
  className?: string;
}

const SplitScreenContainer: React.FC<SplitScreenContainerProps> = ({
  leftContent,
  rightContent,
  gap = 'md',
  divider = false,
  minHeight = 'auto',
  className = ''
}) => {
  const gapClasses = {
    none: '',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  const heightClasses = {
    auto: '',
    screen: 'min-h-screen',
    '96': 'min-h-96',
    '80': 'min-h-80',
    '64': 'min-h-64'
  };

  return (
    <div className={`flex flex-col md:flex-row ${gapClasses[gap]} ${heightClasses[minHeight]} ${className}`}>
      <div className="flex-1 min-w-0">
        {leftContent}
      </div>
      
      {divider && (
        <div className="hidden md:block w-px bg-gray-200 flex-shrink-0" />
      )}
      
      <div className="flex-1 min-w-0">
        {rightContent}
      </div>
    </div>
  );
};

export default SplitScreenContainer; 