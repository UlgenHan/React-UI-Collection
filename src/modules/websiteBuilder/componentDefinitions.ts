import { ComponentDefinition, ComponentType, ComponentProperties } from './types';

export const componentDefinitions: Record<ComponentType, ComponentDefinition> = {
  // Layout Containers
  section: {
    type: 'section',
    name: 'Section',
    icon: '📄',
    category: 'layout',
    description: 'Full-width section container',
    defaultProperties: {
      padding: '16px',
      backgroundColor: '#ffffff',
      fullWidth: true,
      minHeight: '200px'
    },
    defaultSize: { width: 800, height: 300 },
    acceptsChildren: true,
    maxChildren: 50
  },
  
  flexbox: {
    type: 'flexbox',
    name: 'Flexbox',
    icon: '📦',
    category: 'layout',
    description: 'Flexible layout container',
    defaultProperties: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      alignItems: 'center',
      gap: '8px',
      padding: '16px',
      backgroundColor: '#f8f9fa'
    },
    defaultSize: { width: 400, height: 200 },
    acceptsChildren: true,
    maxChildren: 20
  },
  
  grid: {
    type: 'grid',
    name: 'Grid',
    icon: '🔲',
    category: 'layout',
    description: 'CSS Grid layout container',
    defaultProperties: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridGap: '16px',
      padding: '16px',
      backgroundColor: '#f8f9fa'
    },
    defaultSize: { width: 400, height: 200 },
    acceptsChildren: true,
    maxChildren: 12
  },
  
  container: {
    type: 'container',
    name: 'Container',
    icon: '📋',
    category: 'layout',
    description: 'Centered content container',
    defaultProperties: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '16px',
      backgroundColor: '#ffffff'
    },
    defaultSize: { width: 600, height: 200 },
    acceptsChildren: true,
    maxChildren: 30
  },
  
  card: {
    type: 'card',
    name: 'Card',
    icon: '🃏',
    category: 'layout',
    description: 'Card container with shadow',
    defaultProperties: {
      padding: '16px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      shadow: 'md',
      border: '1px solid #e5e7eb'
    },
    defaultSize: { width: 300, height: 200 },
    acceptsChildren: true,
    maxChildren: 10
  },

  // Basic UI Elements
  button: {
    type: 'button',
    name: 'Button',
    icon: '🔘',
    category: 'ui',
    description: 'Interactive button element',
    defaultProperties: {
      text: 'Click me',
      variant: 'primary',
      size: 'md',
      padding: '8px 16px',
      borderRadius: '6px',
      disabled: false
    },
    defaultSize: { width: 120, height: 40 },
    acceptsChildren: false
  },
  
  text: {
    type: 'text',
    name: 'Text',
    icon: '📝',
    category: 'ui',
    description: 'Text content element',
    defaultProperties: {
      text: 'Enter your text here',
      fontSize: 16,
      color: '#374151',
      lineHeight: 1.5
    },
    defaultSize: { width: 200, height: 60 },
    acceptsChildren: false
  },
  
  image: {
    type: 'image',
    name: 'Image',
    icon: '🖼️',
    category: 'ui',
    description: 'Image element',
    defaultProperties: {
      src: 'https://via.placeholder.com/300x200',
      alt: 'Image description',
      objectFit: 'cover'
    },
    defaultSize: { width: 300, height: 200 },
    acceptsChildren: false
  },
  
  video: {
    type: 'video',
    name: 'Video',
    icon: '🎥',
    category: 'ui',
    description: 'Video player element',
    defaultProperties: {
      videoSrc: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      poster: 'https://via.placeholder.com/400x300',
      controls: true,
      videoAutoplay: false,
      loop: false,
      muted: false
    },
    defaultSize: { width: 400, height: 300 },
    acceptsChildren: false
  },
  
  input: {
    type: 'input',
    name: 'Input',
    icon: '📥',
    category: 'ui',
    description: 'Text input field',
    defaultProperties: {
      placeholder: 'Enter text...',
      type: 'text',
      required: false,
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px'
    },
    defaultSize: { width: 200, height: 40 },
    acceptsChildren: false
  },
  
  icon: {
    type: 'icon',
    name: 'Icon',
    icon: '⭐',
    category: 'ui',
    description: 'Icon element',
    defaultProperties: {
      iconName: 'star',
      iconSize: 24,
      color: '#6b7280'
    },
    defaultSize: { width: 40, height: 40 },
    acceptsChildren: false
  },

  // Navigation
  menu: {
    type: 'menu',
    name: 'Menu',
    icon: '🍔',
    category: 'navigation',
    description: 'Navigation menu',
    defaultProperties: {
      menuItems: [
        { id: '1', label: 'Home', href: '#' },
        { id: '2', label: 'About', href: '#' },
        { id: '3', label: 'Contact', href: '#' }
      ],
      orientation: 'horizontal',
      backgroundColor: '#ffffff',
      padding: '8px 16px'
    },
    defaultSize: { width: 400, height: 50 },
    acceptsChildren: false
  },
  
  tabs: {
    type: 'tabs',
    name: 'Tabs',
    icon: '📑',
    category: 'navigation',
    description: 'Tab navigation',
    defaultProperties: {
      tabs: [
        { id: '1', label: 'Tab 1', content: 'Content for tab 1' },
        { id: '2', label: 'Tab 2', content: 'Content for tab 2' },
        { id: '3', label: 'Tab 3', content: 'Content for tab 3' }
      ],
      activeTab: '1',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb'
    },
    defaultSize: { width: 400, height: 200 },
    acceptsChildren: false
  },
  
  breadcrumb: {
    type: 'breadcrumb',
    name: 'Breadcrumb',
    icon: '🍞',
    category: 'navigation',
    description: 'Breadcrumb navigation',
    defaultProperties: {
      text: 'Home > Products > Category',
      color: '#6b7280',
      fontSize: 14
    },
    defaultSize: { width: 300, height: 30 },
    acceptsChildren: false
  },
  
  pagination: {
    type: 'pagination',
    name: 'Pagination',
    icon: '📄',
    category: 'navigation',
    description: 'Page navigation',
    defaultProperties: {
      text: '1 2 3 4 5',
      textAlign: 'center',
      padding: '8px 16px'
    },
    defaultSize: { width: 300, height: 40 },
    acceptsChildren: false
  },

  // Media
  audio: {
    type: 'audio',
    name: 'Audio',
    icon: '🎵',
    category: 'media',
    description: 'Audio player',
    defaultProperties: {
      audioSrc: 'https://sample-videos.com/zip/10/mp3/SampleAudio_0.4mb.mp3',
      showControls: true,
      width: '100%'
    },
    defaultSize: { width: 300, height: 60 },
    acceptsChildren: false
  },
  
  carousel: {
    type: 'carousel',
    name: 'Carousel',
    icon: '🎠',
    category: 'media',
    description: 'Image carousel/slider',
    defaultProperties: {
      images: [
        'https://via.placeholder.com/400x300/ff6b6b/ffffff?text=Slide+1',
        'https://via.placeholder.com/400x300/4ecdc4/ffffff?text=Slide+2',
        'https://via.placeholder.com/400x300/45b7d1/ffffff?text=Slide+3'
      ],
      carouselAutoplay: false,
      interval: 3000,
      showArrows: true,
      showDots: true
    },
    defaultSize: { width: 400, height: 300 },
    acceptsChildren: false
  },
  
  gallery: {
    type: 'gallery',
    name: 'Gallery',
    icon: '🖼️',
    category: 'media',
    description: 'Image gallery grid',
    defaultProperties: {
      images: [
        'https://via.placeholder.com/200x200/ff6b6b/ffffff?text=1',
        'https://via.placeholder.com/200x200/4ecdc4/ffffff?text=2',
        'https://via.placeholder.com/200x200/45b7d1/ffffff?text=3',
        'https://via.placeholder.com/200x200/96ceb4/ffffff?text=4'
      ],
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridGap: '8px'
    },
    defaultSize: { width: 400, height: 300 },
    acceptsChildren: false
  },

  // Form Elements
  checkbox: {
    type: 'checkbox',
    name: 'Checkbox',
    icon: '☑️',
    category: 'form',
    description: 'Checkbox input',
    defaultProperties: {
      label: 'Check me',
      checked: false,
      required: false
    },
    defaultSize: { width: 150, height: 30 },
    acceptsChildren: false
  },
  
  radio: {
    type: 'radio',
    name: 'Radio',
    icon: '🔘',
    category: 'form',
    description: 'Radio button input',
    defaultProperties: {
      label: 'Option 1',
      checked: false,
      required: false
    },
    defaultSize: { width: 150, height: 30 },
    acceptsChildren: false
  },
  
  dropdown: {
    type: 'dropdown',
    name: 'Dropdown',
    icon: '📋',
    category: 'form',
    description: 'Dropdown/select input',
    defaultProperties: {
      label: 'Select option',
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' }
      ],
      required: false,
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px'
    },
    defaultSize: { width: 200, height: 40 },
    acceptsChildren: false
  },
  
  textarea: {
    type: 'textarea',
    name: 'Textarea',
    icon: '📝',
    category: 'form',
    description: 'Multi-line text input',
    defaultProperties: {
      placeholder: 'Enter your message...',
      required: false,
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px'
    },
    defaultSize: { width: 300, height: 100 },
    acceptsChildren: false
  },
  
  'file-upload': {
    type: 'file-upload',
    name: 'File Upload',
    icon: '📁',
    category: 'form',
    description: 'File upload input',
    defaultProperties: {
      label: 'Choose file',
      required: false,
      padding: '8px 12px',
      border: '2px dashed #d1d5db',
      borderRadius: '6px',
      textAlign: 'center'
    },
    defaultSize: { width: 250, height: 80 },
    acceptsChildren: false
  },

  // Content
  header: {
    type: 'header',
    name: 'Header',
    icon: '📰',
    category: 'content',
    description: 'Section header',
    defaultProperties: {
      text: 'Section Header',
      level: 2,
      fontSize: 24,
      fontWeight: 600,
      color: '#111827',
      margin: '0 0 16px 0'
    },
    defaultSize: { width: 300, height: 40 },
    acceptsChildren: false
  },
  
  divider: {
    type: 'divider',
    name: 'Divider',
    icon: '➖',
    category: 'content',
    description: 'Horizontal divider line',
    defaultProperties: {
      border: '1px solid #e5e7eb',
      margin: '16px 0'
    },
    defaultSize: { width: 400, height: 2 },
    acceptsChildren: false
  },
  
  spacer: {
    type: 'spacer',
    name: 'Spacer',
    icon: '⬜',
    category: 'content',
    description: 'Vertical spacing element',
    defaultProperties: {
      height: '20px',
      backgroundColor: 'transparent'
    },
    defaultSize: { width: 400, height: 20 },
    acceptsChildren: false
  },
  
  list: {
    type: 'list',
    name: 'List',
    icon: '📋',
    category: 'content',
    description: 'Ordered or unordered list',
    defaultProperties: {
      listItems: ['Item 1', 'Item 2', 'Item 3'],
      listType: 'ul',
      listStyle: 'disc',
      padding: '0 0 0 20px'
    },
    defaultSize: { width: 200, height: 100 },
    acceptsChildren: false
  },
  
  table: {
    type: 'table',
    name: 'Table',
    icon: '📊',
    category: 'content',
    description: 'Data table',
    defaultProperties: {
      headers: ['Name', 'Email', 'Role'],
      rows: [
        ['John Doe', 'john@example.com', 'Admin'],
        ['Jane Smith', 'jane@example.com', 'User']
      ],
      border: '1px solid #e5e7eb',
      width: '100%'
    },
    defaultSize: { width: 500, height: 150 },
    acceptsChildren: false
  },

  // Interactive
  modal: {
    type: 'modal',
    name: 'Modal',
    icon: '🪟',
    category: 'interactive',
    description: 'Modal dialog',
    defaultProperties: {
      title: 'Modal Title',
      content: 'Modal content goes here...',
      showCloseButton: true,
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '24px',
      shadow: 'lg'
    },
    defaultSize: { width: 400, height: 300 },
    acceptsChildren: true,
    maxChildren: 10
  },
  
  tooltip: {
    type: 'tooltip',
    name: 'Tooltip',
    icon: '💡',
    category: 'interactive',
    description: 'Tooltip element',
    defaultProperties: {
      text: 'Tooltip text',
      backgroundColor: '#374151',
      color: '#ffffff',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: 14
    },
    defaultSize: { width: 150, height: 40 },
    acceptsChildren: false
  },
  
  accordion: {
    type: 'accordion',
    name: 'Accordion',
    icon: '📂',
    category: 'interactive',
    description: 'Collapsible accordion',
    defaultProperties: {
      accordionItems: [
        { id: '1', title: 'Section 1', content: 'Content for section 1', expanded: true },
        { id: '2', title: 'Section 2', content: 'Content for section 2', expanded: false }
      ],
      border: '1px solid #e5e7eb',
      borderRadius: '6px'
    },
    defaultSize: { width: 400, height: 200 },
    acceptsChildren: false
  },
  
  progress: {
    type: 'progress',
    name: 'Progress',
    icon: '📈',
    category: 'interactive',
    description: 'Progress bar',
    defaultProperties: {
      progressValue: 50,
      progressMax: 100,
      showLabel: true,
      backgroundColor: '#e5e7eb',
      color: '#3b82f6',
      height: '8px',
      borderRadius: '4px'
    },
    defaultSize: { width: 300, height: 30 },
    acceptsChildren: false
  },
  
  slider: {
    type: 'slider',
    name: 'Slider',
    icon: '🎚️',
    category: 'interactive',
    description: 'Range slider input',
    defaultProperties: {
      sliderMin: 0,
      sliderMax: 100,
      sliderStep: 1,
      showValue: true,
      value: 50,
      width: '100%'
    },
    defaultSize: { width: 300, height: 40 },
    acceptsChildren: false
  }
};

export const componentCategories = [
  { id: 'layout', name: 'Layout', icon: '📐' },
  { id: 'ui', name: 'UI Elements', icon: '🎨' },
  { id: 'navigation', name: 'Navigation', icon: '🧭' },
  { id: 'media', name: 'Media', icon: '🎬' },
  { id: 'form', name: 'Forms', icon: '📝' },
  { id: 'content', name: 'Content', icon: '📄' },
  { id: 'interactive', name: 'Interactive', icon: '🖱️' }
];

export const getComponentsByCategory = (category: string) => {
  return Object.values(componentDefinitions).filter(comp => comp.category === category);
};

export const getComponentDefinition = (type: ComponentType): ComponentDefinition => {
  return componentDefinitions[type];
}; 