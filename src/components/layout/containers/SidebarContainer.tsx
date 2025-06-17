import React from 'react';

export interface SidebarContainerProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  sidebarWidth?: 'sm' | 'md' | 'lg' | 'xl';
  sidebarPosition?: 'left' | 'right';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SidebarContainer: React.FC<SidebarContainerProps> = ({
  sidebar,
  children,
  sidebarWidth = 'md',
  sidebarPosition = 'left',
  gap = 'md',
  className = ''
}) => {
  const sidebarWidthClasses = {
    sm: 'w-48',
    md: 'w-64',
    lg: 'w-80',
    xl: 'w-96'
  };

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  const sidebarElement = (
    <aside className={`flex-shrink-0 ${sidebarWidthClasses[sidebarWidth]}`}>
      {sidebar}
    </aside>
  );

  const mainElement = (
    <main className="flex-1 min-w-0">
      {children}
    </main>
  );

  return (
    <div className={`flex ${gapClasses[gap]} ${className}`}>
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

export default SidebarContainer; 