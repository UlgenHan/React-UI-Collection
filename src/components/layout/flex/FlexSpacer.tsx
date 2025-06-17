import React from 'react';

export interface FlexSpacerProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
}

const FlexSpacer: React.FC<FlexSpacerProps> = ({
  children,
  direction = 'row',
  align = 'center',
  className = ''
}) => {
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  };

  const directionClass = direction === 'row' ? 'flex-row' : 'flex-col';

  const childrenArray = React.Children.toArray(children);

  return (
    <div className={`flex ${directionClass} ${alignClasses[align]} ${className}`}>
      {childrenArray.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < childrenArray.length - 1 && (
            <div className="flex-1" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FlexSpacer; 