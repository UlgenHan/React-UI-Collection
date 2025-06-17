import React, { createContext, useContext, useState, useEffect } from 'react';
import ComponentGallery from './pages/ComponentGallery';
import HeaderGallery from './pages/HeaderGallery';
import SidebarGallery from './pages/SidebarGallery';
import FooterGallery from './pages/FooterGallery';
import ContainerGallery from './pages/ContainerGallery';
import GridGallery from './pages/GridGallery';
import FlexGallery from './pages/FlexGallery';
import SectionGallery from './pages/SectionGallery';
import CardGallery from './pages/CardGallery';
import ModalGallery from './pages/ModalGallery';
import MenuGallery from './pages/MenuGallery';
import TabGallery from './pages/TabGallery';

type Page = 'home' | 'headers' | 'sidebars' | 'footers' | 'containers' | 'grid' | 'flex' | 'sections' | 'cards' | 'modals' | 'menus' | 'tabs';

interface NavigationContextType {
  currentPage: Page;
  navigateTo: (page: Page) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Initialize page from URL
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/headers') {
      setCurrentPage('headers');
    } else if (path === '/sidebars') {
      setCurrentPage('sidebars');
    } else if (path === '/footers') {
      setCurrentPage('footers');
    } else if (path === '/containers') {
      setCurrentPage('containers');
    } else if (path === '/grid') {
      setCurrentPage('grid');
    } else if (path === '/flex') {
      setCurrentPage('flex');
    } else if (path === '/sections') {
      setCurrentPage('sections');
    } else if (path === '/cards') {
      setCurrentPage('cards');
    } else if (path === '/modals') {
      setCurrentPage('modals');
    } else if (path === '/menus') {
      setCurrentPage('menus');
    } else if (path === '/tabs') {
      setCurrentPage('tabs');
    } else {
      setCurrentPage('home');
    }
  }, []);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    const path = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', path);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'headers':
        return <HeaderGallery />;
      case 'sidebars':
        return <SidebarGallery />;
      case 'footers':
        return <FooterGallery />;
      case 'containers':
        return <ContainerGallery />;
      case 'grid':
        return <GridGallery />;
      case 'flex':
        return <FlexGallery />;
      case 'sections':
        return <SectionGallery />;
      case 'cards':
        return <CardGallery />;
      case 'modals':
        return <ModalGallery />;
      case 'menus':
        return <MenuGallery />;
      case 'tabs':
        return <TabGallery />;
      case 'home':
      default:
        return <ComponentGallery />;
    }
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo }}>
      <div className="App">
        {renderCurrentPage()}
      </div>
    </NavigationContext.Provider>
  );
};

export default App; 