import React from 'react';

export interface FluidContainerProps {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const FluidContainer: React.FC<FluidContainerProps> = ({
  children,
  padding = 'md',
  className = ''
}) => {
  const paddingClasses = {
    sm: 'px-2 sm:px-4',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12',
    xl: 'px-8 sm:px-12 lg:px-16'
  };

  return (
    <div className={`w-full ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default FluidContainer; 