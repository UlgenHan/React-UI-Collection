import React from 'react';

export interface CardContainerProps {
  children: React.ReactNode;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  className?: string;
}

const CardContainer: React.FC<CardContainerProps> = ({
  children,
  shadow = 'md',
  rounded = 'lg',
  padding = 'md',
  border = true,
  className = ''
}) => {
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl'
  };

  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const borderClass = border ? 'border border-gray-200' : '';

  return (
    <div className={`bg-white ${shadowClasses[shadow]} ${roundedClasses[rounded]} ${paddingClasses[padding]} ${borderClass} ${className}`}>
      {children}
    </div>
  );
};

export default CardContainer; 