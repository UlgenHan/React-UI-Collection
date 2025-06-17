import React from 'react';

export interface FlexWithSidebarProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  sidebarWidth?: 'sm' | 'md' | 'lg' | 'xl';
  sidebarPosition?: 'left' | 'right';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
  className?: string;
}

const FlexWithSidebar: React.FC<FlexWithSidebarProps> = ({
  sidebar,
  children,
  sidebarWidth = 'md',
  sidebarPosition = 'left',
  gap = 'md',
  responsive = true,
  className = ''
}) => {
  const sidebarWidthClasses = {
    sm: 'w-48',
    md: 'w-64',
    lg: 'w-80',
    xl: 'w-96'
  };

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  const responsiveClass = responsive ? 'flex-col lg:flex-row' : 'flex-row';

  const sidebarElement = (
    <aside className={`flex-shrink-0 ${responsive ? 'w-full lg:' : ''}${sidebarWidthClasses[sidebarWidth]}`}>
      {sidebar}
    </aside>
  );

  const mainElement = (
    <main className="flex-1 min-w-0">
      {children}
    </main>
  );

  return (
    <div className={`flex ${responsiveClass} ${gapClasses[gap]} ${className}`}>
      {sidebarPosition === 'left' ? (
        <>
          {sidebarElement}
          {mainElement}
        </>
      ) : (
        <>
          {mainElement}
          {sidebarElement}
        </>
      )}
    </div>
  );
};

export default FlexWithSidebar; 