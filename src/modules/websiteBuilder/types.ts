export type ComponentType = 
  // Layout Containers
  | 'section' | 'flexbox' | 'grid' | 'container' | 'card'
  // Basic UI Elements
  | 'button' | 'text' | 'image' | 'video' | 'input' | 'icon'
  // Navigation
  | 'menu' | 'tabs' | 'breadcrumb' | 'pagination'
  // Media
  | 'audio' | 'carousel' | 'gallery'
  // Form Elements
  | 'checkbox' | 'radio' | 'dropdown' | 'textarea' | 'file-upload'
  // Content
  | 'header' | 'divider' | 'spacer' | 'list' | 'table'
  // Interactive
  | 'modal' | 'tooltip' | 'accordion' | 'progress' | 'slider';

export interface ComponentProperties {
  // Common properties
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  
  // Layout properties
  width?: string | number;
  height?: string | number;
  padding?: string | number;
  margin?: string | number;
  display?: 'block' | 'flex' | 'grid' | 'inline' | 'inline-block';
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  
  // Flex properties
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string | number;
  
  // Grid properties
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridGap?: string | number;
  gridColumn?: string;
  gridRow?: string;
  
  // Background properties
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: 'cover' | 'contain' | 'auto';
  backgroundPosition?: string;
  
  // Border properties
  border?: string;
  borderRadius?: string | number;
  borderWidth?: string | number;
  borderColor?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  
  // Text properties
  text?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  fontFamily?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: string | number;
  letterSpacing?: string | number;
  
  // Button properties
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  
  // Image properties
  src?: string;
  alt?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  
  // Video properties
  videoSrc?: string;
  poster?: string;
  controls?: boolean;
  videoAutoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  
  // Input properties
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  required?: boolean;
  inputMin?: number;
  inputMax?: number;
  inputStep?: number;
  pattern?: string;
  
  // Form properties
  label?: string;
  options?: Array<{ value: string; label: string }>;
  checked?: boolean;
  value?: string | number | boolean;
  
  // Menu properties
  menuItems?: Array<{ id: string; label: string; href?: string; children?: Array<{ id: string; label: string; href?: string }> }>;
  orientation?: 'horizontal' | 'vertical';
  
  // Tabs properties
  tabs?: Array<{ id: string; label: string; content?: string }>;
  activeTab?: string;
  
  // Carousel properties
  images?: string[];
  carouselAutoplay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  
  // Audio properties
  audioSrc?: string;
  showControls?: boolean;
  
  // List properties
  listItems?: string[];
  listType?: 'ul' | 'ol';
  listStyle?: 'disc' | 'circle' | 'square' | 'decimal' | 'lower-alpha' | 'upper-alpha';
  
  // Table properties
  headers?: string[];
  rows?: string[][];
  
  // Modal properties
  title?: string;
  content?: string;
  showCloseButton?: boolean;
  
  // Accordion properties
  accordionItems?: Array<{ id: string; title: string; content: string; expanded?: boolean }>;
  
  // Progress properties
  progressValue?: number;
  progressMax?: number;
  showLabel?: boolean;
  
  // Slider properties
  sliderMin?: number;
  sliderMax?: number;
  sliderStep?: number;
  showValue?: boolean;
  
  // Icon properties
  iconName?: string;
  iconSize?: string | number;
  
  // Header properties
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  
  // Card properties
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  
  // Container properties
  maxWidth?: string;
  minHeight?: string;
  
  // Section properties
  background?: string;
  fullWidth?: boolean;
  fullHeight?: boolean;
}

export interface CanvasComponent {
  id: string;
  type: ComponentType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  properties: ComponentProperties;
  children?: CanvasComponent[];
  isSelected?: boolean;
  parentId?: string | null;
  zIndex?: number;
}

export interface ComponentDefinition {
  type: ComponentType;
  name: string;
  icon: string;
  category: 'layout' | 'ui' | 'navigation' | 'media' | 'form' | 'content' | 'interactive';
  description: string;
  defaultProperties: ComponentProperties;
  defaultSize: { width: number; height: number };
  acceptsChildren?: boolean;
  maxChildren?: number;
  minChildren?: number;
}

export interface TreeNode {
  id: string;
  type: string;
  label: string;
  children: TreeNode[];
  isExpanded: boolean;
  level: number;
  parentId?: string | null;
}

export interface GridConfig {
  size: number;
  enabled: boolean;
  snapToGrid: boolean;
}

export interface CanvasBounds {
  width: number;
  height: number;
}

export interface DragState {
  isDragging: boolean;
  componentId: string | null;
  startPosition: { x: number; y: number };
  currentPosition: { x: number; y: number };
}

export interface ResizeState {
  isResizing: boolean;
  componentId: string | null;
  handle: string | null;
  startSize: { width: number; height: number };
  currentSize: { width: number; height: number };
}

export interface SelectionState {
  selectedIds: string[];
  primarySelection: string | null;
}

export interface ClipboardState {
  copiedComponents: CanvasComponent[];
  cutComponents: CanvasComponent[];
}

export interface UndoRedoState {
  past: CanvasComponent[][];
  present: CanvasComponent[];
  future: CanvasComponent[][];
}

export interface DesignState {
  id: string;
  name: string;
  components: CanvasComponent[];
  gridConfig: GridConfig;
  canvasSize: { width: number; height: number };
  createdAt: string;
  updatedAt: string;
  version: string;
}

export interface SavedDesign {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  componentCount: number;
}

export interface ExportOptions {
  format: 'react' | 'html';
  includeTailwind: boolean;
  includeCustomCSS: boolean;
  componentName?: string;
  exportType: 'component' | 'page';
}

export interface GeneratedCode {
  code: string;
  css?: string;
  filename: string;
  language: string;
}

export interface HighlightedToken {
  text: string;
  type: 'keyword' | 'string' | 'comment' | 'function' | 'operator' | 'default';
}

export interface ComponentDropZone {
  id: string;
  bounds: { x: number; y: number; width: number; height: number };
  acceptsChildren: boolean;
  maxChildren?: number;
}

export interface ComponentDragData {
  type: ComponentType;
  source: 'sidebar' | 'canvas';
  componentId?: string;
  parentId?: string | null;
}

export interface ComponentUpdateData {
  component: CanvasComponent;
  action: 'update' | 'delete' | 'add' | 'move' | 'resize';
  oldData?: Partial<CanvasComponent>;
}

export interface CanvasEvent {
  type: 'component-add' | 'component-update' | 'component-delete' | 'component-select' | 'component-move' | 'component-resize';
  data: ComponentUpdateData;
  timestamp: number;
} 