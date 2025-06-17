import React from 'react';

export interface ContentWithSidebarProps {
  mainContent: React.ReactNode;
  sidebarContent: React.ReactNode;
  sidebarPosition?: 'left' | 'right';
  sidebarWidth?: '1/4' | '1/3' | '2/5';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  backgroundColor?: 'white' | 'gray-50' | 'gray-100';
  className?: string;
}

const ContentWithSidebar: React.FC<ContentWithSidebarProps> = ({
  mainContent,
  sidebarContent,
  sidebarPosition = 'right',
  sidebarWidth = '1/3',
  gap = 'lg',
  backgroundColor = 'white',
  className = ''
}) => {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  };

  const backgroundClasses = {
    white: 'bg-white',
    'gray-50': 'bg-gray-50',
    'gray-100': 'bg-gray-100'
  };

  const getWidthClasses = (width: string) => {
    switch (width) {
      case '1/4': return { sidebar: 'lg:w-1/4', main: 'lg:w-3/4' };
      case '1/3': return { sidebar: 'lg:w-1/3', main: 'lg:w-2/3' };
      case '2/5': return { sidebar: 'lg:w-2/5', main: 'lg:w-3/5' };
      default: return { sidebar: 'lg:w-1/3', main: 'lg:w-2/3' };
    }
  };

  const widths = getWidthClasses(sidebarWidth);

  const sidebarElement = (
    <aside className={`w-full ${widths.sidebar}`}>
      <div className="lg:sticky lg:top-8">
        {sidebarContent}
      </div>
    </aside>
  );

  const mainElement = (
    <main className={`w-full ${widths.main}`}>
      {mainContent}
    </main>
  );

  return (
    <section className={`py-16 md:py-24 ${backgroundClasses[backgroundColor]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col lg:flex-row ${gapClasses[gap]}`}>
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
      </div>
    </section>
  );
};

export default ContentWithSidebar; 