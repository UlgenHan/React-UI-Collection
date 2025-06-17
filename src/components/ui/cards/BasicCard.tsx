import React from 'react';

export interface BasicCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  backgroundColor?: 'white' | 'gray-50' | 'gray-100';
  className?: string;
  onClick?: () => void;
}

const BasicCard: React.FC<BasicCardProps> = ({
  title,
  description,
  children,
  padding = 'md',
  border = true,
  shadow = 'sm',
  rounded = 'lg',
  backgroundColor = 'white',
  className = '',
  onClick
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

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
    xl: 'rounded-xl'
  };

  const backgroundClasses = {
    white: 'bg-white',
    'gray-50': 'bg-gray-50',
    'gray-100': 'bg-gray-100'
  };

  return (
    <div
      className={`
        ${backgroundClasses[backgroundColor]}
        ${paddingClasses[padding]}
        ${border ? 'border border-gray-200' : ''}
        ${shadowClasses[shadow]}
        ${roundedClasses[rounded]}
        ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow duration-200' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      
      {description && (
        <p className="text-gray-600 leading-relaxed mb-4">
          {description}
        </p>
      )}
      
      {children}
    </div>
  );
};

export default BasicCard; 