import React from 'react';

export interface SectionContainerProps {
  children: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  backgroundColor?: 'white' | 'gray-50' | 'gray-100' | 'blue-50' | 'transparent';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  spacing = 'lg',
  backgroundColor = 'transparent',
  padding = 'md',
  className = ''
}) => {
  const spacingClasses = {
    sm: 'py-4',
    md: 'py-8',
    lg: 'py-12',
    xl: 'py-16',
    '2xl': 'py-24'
  };

  const backgroundClasses = {
    white: 'bg-white',
    'gray-50': 'bg-gray-50',
    'gray-100': 'bg-gray-100',
    'blue-50': 'bg-blue-50',
    transparent: 'bg-transparent'
  };

  const paddingClasses = {
    sm: 'px-4',
    md: 'px-6 lg:px-8',
    lg: 'px-8 lg:px-12',
    xl: 'px-12 lg:px-16'
  };

  return (
    <section className={`${spacingClasses[spacing]} ${backgroundClasses[backgroundColor]} ${paddingClasses[padding]} ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export default SectionContainer; 