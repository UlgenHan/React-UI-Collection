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
import BreadcrumbGallery from './pages/BreadcrumbGallery';
import PaginationGallery from './pages/PaginationGallery';
import DatePickerGallery from './pages/DatePickerGallery';
import FileUploadGallery from './pages/FileUploadGallery';
import SearchGallery from './pages/SearchGallery';
import RatingGallery from './pages/RatingGallery';
import AlertGallery from './pages/AlertGallery';
import ToastGallery from './pages/ToastGallery';
import LoaderGallery from './pages/LoaderGallery';
import ButtonGallery from './pages/ButtonGallery';
import AvatarGallery from './pages/AvatarGallery';
import BadgeGallery from './pages/BadgeGallery';
import MediaGallery from './pages/MediaGallery';
import ChatGallery from './pages/ChatGallery';
import MapGallery from './pages/MapGallery';
import CommentGallery from './pages/CommentGallery';
import NotificationGallery from './pages/NotificationGallery';
import DataGridGallery from './pages/DataGridGallery';
import ProgramTimelineGallery from './pages/ProgramTimelineGallery';
import TimelineEditorGallery from './pages/TimelineEditorGallery';

type Page = 'home' | 'headers' | 'sidebars' | 'footers' | 'containers' | 'grid' | 'flex' | 'sections' | 'cards' | 'modals' | 'menus' | 'tabs' | 'breadcrumbs' | 'pagination' | 'date-pickers' | 'file-uploads' | 'search' | 'rating' | 'alerts' | 'toasts' | 'loaders' | 'buttons' | 'avatars' | 'badges' | 'media' | 'chat' | 'maps' | 'comments' | 'notifications' | 'datagrid' | 'program-timeline' | 'timeline-editor';

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
    if (path === '/timeline-editor-gallery') {
      setCurrentPage('timeline-editor');
    } else if (path === '/program-timeline-gallery') {
      setCurrentPage('program-timeline');
    } else if (path === '/headers') {
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
    } else if (path === '/breadcrumbs') {
      setCurrentPage('breadcrumbs');
    } else if (path === '/pagination') {
      setCurrentPage('pagination');
    } else if (path === '/date-pickers') {
      setCurrentPage('date-pickers');
    } else if (path === '/file-uploads') {
      setCurrentPage('file-uploads');
    } else if (path === '/search') {
      setCurrentPage('search');
    } else if (path === '/rating') {
      setCurrentPage('rating');
    } else if (path === '/alerts') {
      setCurrentPage('alerts');
    } else if (path === '/toasts') {
      setCurrentPage('toasts');
    } else if (path === '/loaders') {
      setCurrentPage('loaders');
    } else if (path === '/buttons') {
      setCurrentPage('buttons');
    } else if (path === '/avatars') {
      setCurrentPage('avatars');
    } else if (path === '/badges') {
      setCurrentPage('badges');
    } else if (path === '/media') {
      setCurrentPage('media');
    } else if (path === '/chat') {
      setCurrentPage('chat');
    } else if (path === '/maps') {
      setCurrentPage('maps');
    } else if (path === '/comments') {
      setCurrentPage('comments');
    } else if (path === '/notifications') {
      setCurrentPage('notifications');
    } else if (path === '/datagrid') {
      setCurrentPage('datagrid');
    } else {
      setCurrentPage('home');
    }
  }, []);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    const path = page === 'home' ? '/' : page === 'timeline-editor' ? '/timeline-editor-gallery' : page === 'program-timeline' ? '/program-timeline-gallery' : `/${page}`;
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
      case 'breadcrumbs':
        return <BreadcrumbGallery />;
      case 'pagination':
        return <PaginationGallery />;
      case 'date-pickers':
        return <DatePickerGallery />;
      case 'file-uploads':
        return <FileUploadGallery />;
      case 'search':
        return <SearchGallery />;
      case 'rating':
        return <RatingGallery />;
      case 'alerts':
        return <AlertGallery />;
      case 'toasts':
        return <ToastGallery />;
      case 'loaders':
        return <LoaderGallery />;
      case 'buttons':
        return <ButtonGallery />;
      case 'avatars':
        return <AvatarGallery />;
      case 'badges':
        return <BadgeGallery />;
      case 'media':
        return <MediaGallery />;
      case 'chat':
        return <ChatGallery />;
      case 'maps':
        return <MapGallery />;
      case 'comments':
        return <CommentGallery />;
      case 'notifications':
        return <NotificationGallery />;
      case 'datagrid':
        return <DataGridGallery />;
      case 'program-timeline':
        return <ProgramTimelineGallery />;
      case 'timeline-editor':
        return <TimelineEditorGallery />;
      case 'home':
      default:
        return <ComponentGallery />;
    }
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo }}>
      <div className="App">
        <nav className="p-4 bg-gray-100 border-b flex gap-4">
          <button onClick={() => navigateTo('timeline-editor')} className="text-blue-600 hover:underline">Timeline Editor Gallery</button>
        </nav>
        {renderCurrentPage()}
      </div>
    </NavigationContext.Provider>
  );
};

export default App; 