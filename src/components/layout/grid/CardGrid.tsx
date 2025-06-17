import React from 'react';

export interface CardGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  cardPadding?: 'sm' | 'md' | 'lg' | 'xl';
  cardShadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  cardRounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const CardGrid: React.FC<CardGridProps> = ({
  children,
  columns = 3,
  gap = 'md',
  cardPadding = 'md',
  cardShadow = 'md',
  cardRounded = 'lg',
  className = ''
}) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
  };

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
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

  return (
    <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]} ${className}`}>
      {React.Children.map(children, (child, index) => (
        <div 
          key={index} 
          className={`bg-white border border-gray-200 ${paddingClasses[cardPadding]} ${shadowClasses[cardShadow]} ${roundedClasses[cardRounded]} transition-shadow duration-200 hover:shadow-lg`}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default CardGrid; 