# Website Builder Module

A drag-and-drop website builder with a visual canvas interface for creating websites using React components.

## Features

### 🎨 Visual Canvas
- Large workspace with grid background for precise component placement
- Drop zone with visual feedback during drag operations
- Component selection with visual highlighting and selection indicators
- Empty state with helpful instructions
- Keyboard shortcuts for enhanced productivity

### 📦 Component Library
- **Basic Elements**: Buttons, Headers, Text, Images
- **Layout Components**: Containers, Cards, Dividers, Spacers
- **Form Elements**: Input fields
- **Media**: Icons

### 🌳 Component Hierarchy Tree
- **Hierarchical View**: Displays all components in a nested tree structure
- **Smart Nesting**: Automatically detects parent-child relationships based on positioning
- **Synchronized Selection**: Click tree nodes to select components on canvas
- **Expand/Collapse**: Toggle visibility of nested components
- **Search & Filter**: Find components by name or type
- **Context Menu**: Right-click for copy, cut, paste, duplicate, delete
- **Keyboard Navigation**: Arrow keys for tree navigation
- **Visual Indicators**: Icons, badges, and selection highlighting

### 💾 Design State Management
- **Multiple Saved Designs**: Save and manage multiple design versions
- **Auto-Save**: Automatic saving with debouncing (2-second delay)
- **Design Persistence**: Designs persist across browser sessions
- **Import/Export**: Export designs as JSON files and import from files
- **Design Manager Panel**: Comprehensive UI for managing saved designs
- **Backward Compatibility**: Loads legacy localStorage data
- **Current Design Tracking**: Shows active design status
- **Design Metadata**: Creation dates, component counts, and versioning

### 📤 Code Export & Generation
- **React JSX Export**: Generate TypeScript React components with proper interfaces
- **HTML Export**: Generate standalone HTML with Tailwind CSS
- **Component vs Page Export**: Export as reusable component or full page
- **Syntax Highlighting**: Code display with language-specific highlighting
- **Live Preview**: Preview exported HTML in iframe
- **Copy to Clipboard**: One-click code copying
- **File Download**: Download generated code as .tsx or .html files
- **Custom CSS Export**: Separate CSS file generation
- **Code Formatting**: Clean, readable code output

### 🎯 Component Selection & Editing
- Click to select components with visual feedback
- Property panel for real-time editing of component properties
- Position and size controls for precise positioning
- Component-specific property editors (text, variants, sizes, etc.)
- Delete components with confirmation

### 🖱️ Drag & Resize
- **Drag to Reposition**: Smooth dragging of components within canvas boundaries
- **Resize Handles**: 8 resize handles (corners and edges) for precise sizing
- **Live Updates**: Real-time position and size updates during drag/resize
- **Constraints**: Minimum and maximum size limits for usability
- **Visual Feedback**: Size indicators and position tooltips during operations

### 🔲 Grid Snapping
- **Toggle Grid**: Enable/disable grid snapping with visual feedback
- **Grid Sizes**: Multiple grid sizes (10px, 20px, 50px, 100px)
- **Snap to Grid**: Components snap to grid lines during drag and resize
- **Keyboard Grid**: Arrow key movement respects grid settings
- **Visual Grid**: Grid lines visible on canvas background

### 💾 Auto-Save & Export
- Automatic saving to localStorage
- Export canvas as JSON file
- Clear canvas functionality with confirmation
- Undo/Redo functionality with keyboard shortcuts

### ⌨️ Keyboard Shortcuts
- `ESC`: Deselect component
- `Delete`: Remove selected component
- `Ctrl+Z` / `Cmd+Z`: Undo
- `Ctrl+Y` / `Cmd+Y`: Redo
- `Arrow Keys`: Move selected component (with grid snapping)
- `Shift + Arrow Keys`: Move by larger increments
- `Enter` / `Space`: Select tree node
- `Arrow Right`: Expand tree node
- `Arrow Left`: Collapse tree node

## Usage

### Basic Setup

```tsx
import { WebsiteBuilder } from './modules/websiteBuilder';

function App() {
  return <WebsiteBuilder />;
}
```

### Individual Components

```tsx
import { 
  Canvas, 
  ComponentSidebar, 
  PropertyPanel, 
  ComponentTree,
  SaveLoadPanel,
  ExportModal,
  ResizableComponent 
} from './modules/websiteBuilder';

function CustomBuilder() {
  const [components, setComponents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [gridConfig, setGridConfig] = useState({ size: 20, enabled: false });

  return (
    <div className="flex">
      <ComponentSidebar />
      <Canvas 
        components={components}
        selectedComponentId={selectedId}
        onComponentAdd={setComponents}
        onComponentSelect={setSelectedId}
        onUndo={undo}
        onRedo={redo}
        gridConfig={gridConfig}
      />
      <ComponentTree
        components={components}
        selectedComponentId={selectedId}
        onComponentSelect={setSelectedId}
        onComponentUpdate={updateComponent}
      />
      <SaveLoadPanel
        components={components}
        gridConfig={gridConfig}
        onLoadDesign={handleLoadDesign}
        onClearCanvas={handleClearCanvas}
      />
      <ExportModal
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        components={components}
      />
      <PropertyPanel
        selectedComponent={selectedComponent}
        onComponentUpdate={updateComponent}
      />
    </div>
  );
}
```

### Code Export Usage

```tsx
import { codeGenerator } from './modules/websiteBuilder';

// Export as React component
const exportReactComponent = () => {
  const options = {
    format: 'react',
    includeTailwind: true,
    includeCustomCSS: false,
    componentName: 'MyWebsite',
    exportType: 'component'
  };
  
  const result = codeGenerator.generateCode(components, options);
  console.log(result.code); // Generated React JSX
  console.log(result.filename); // MyWebsite.tsx
};

// Export as HTML
const exportHTML = () => {
  const options = {
    format: 'html',
    includeTailwind: true,
    includeCustomCSS: true,
    exportType: 'page'
  };
  
  const result = codeGenerator.generateCode(components, options);
  console.log(result.code); // Generated HTML
  console.log(result.css); // Custom CSS if any
};

// Export modal usage
const [showExport, setShowExport] = useState(false);

<ExportModal
  isOpen={showExport}
  onClose={() => setShowExport(false)}
  components={components}
/>
```

### Design State Management

```tsx
import { designStateManager } from './modules/websiteBuilder';

// Save a design
const saveDesign = async () => {
  try {
    const designId = await designStateManager.saveDesign(
      'My Website Design',
      components,
      gridConfig
    );
    console.log('Design saved with ID:', designId);
  } catch (error) {
    console.error('Failed to save design:', error);
  }
};

// Load a design
const loadDesign = async (designId: string) => {
  try {
    const design = await designStateManager.loadDesign(designId);
    setComponents(design.components);
    setGridConfig(design.gridConfig);
  } catch (error) {
    console.error('Failed to load design:', error);
  }
};

// List all saved designs
const savedDesigns = designStateManager.listSavedDesigns();

// Export design as JSON
const exportDesign = async (designId: string) => {
  try {
    const jsonData = await designStateManager.exportDesign(designId);
    // Handle file download
  } catch (error) {
    console.error('Failed to export design:', error);
  }
};

// Import design from JSON
const importDesign = async (jsonData: string) => {
  try {
    const design = await designStateManager.importDesign(jsonData);
    setComponents(design.components);
    setGridConfig(design.gridConfig);
  } catch (error) {
    console.error('Failed to import design:', error);
  }
};

// Auto-save functionality
useEffect(() => {
  if (components.length > 0) {
    designStateManager.autoSave(components, gridConfig);
  }
}, [components, gridConfig]);

// Load auto-saved state
const autoSave = designStateManager.loadAutoSave();
if (autoSave) {
  // Restore auto-saved design
}
```

### Component Tree Usage

```tsx
import { ComponentTree } from './modules/websiteBuilder';

function TreeExample() {
  const [components, setComponents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const handleComponentUpdate = (updatedComponent) => {
    // Handle component updates, deletions, duplications
    if ('_delete' in updatedComponent) {
      // Remove component
      setComponents(prev => prev.filter(c => c.id !== updatedComponent.id));
    } else {
      // Update or add component
      setComponents(prev => {
        const existing = prev.find(c => c.id === updatedComponent.id);
        if (existing) {
          return prev.map(c => c.id === updatedComponent.id ? updatedComponent : c);
        } else {
          return [...prev, updatedComponent];
        }
      });
    }
  };

  return (
    <ComponentTree
      components={components}
      selectedComponentId={selectedId}
      onComponentSelect={setSelectedId}
      onComponentUpdate={handleComponentUpdate}
    />
  );
}
```

### Context Menu Usage

```tsx
import { ContextMenu } from './modules/websiteBuilder';

function ContextMenuExample() {
  const [contextMenu, setContextMenu] = useState(null);

  return (
    <div onContextMenu={(e) => {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY });
    }}>
      <ContextMenu
        x={contextMenu?.x || 0}
        y={contextMenu?.y || 0}
        onClose={() => setContextMenu(null)}
        onDelete={() => console.log('Delete')}
        onDuplicate={() => console.log('Duplicate')}
        onCopy={() => console.log('Copy')}
        onCut={() => console.log('Cut')}
        onPaste={() => console.log('Paste')}
        canPaste={true}
      />
    </div>
  );
}
```

### Drag & Resize Example

```tsx
import { ResizableComponent } from './modules/websiteBuilder';

function CustomComponent() {
  const component = {
    id: 'my-component',
    type: 'button',
    position: { x: 100, y: 100 },
    size: { width: 120, height: 40 },
    properties: { text: 'Click me' },
    isSelected: false
  };

  return (
    <ResizableComponent
      component={component}
      isSelected={true}
      onComponentUpdate={handleUpdate}
      onComponentSelect={handleSelect}
      canvasBounds={{ width: 800, height: 600 }}
      gridConfig={{ size: 20, enabled: true }}
    />
  );
}
```

## Code Export Features

### Export Formats
- **React JSX (TSX)**: Generate TypeScript React components with proper interfaces
- **HTML with Tailwind**: Generate standalone HTML files with Tailwind CSS CDN
- **Component vs Page**: Export as reusable component or complete page

### Export Options
- **Component Name**: Customize the generated component name
- **Export Type**: Choose between component (reusable) or page (standalone)
- **Tailwind CSS**: Include Tailwind CSS classes and CDN
- **Custom CSS**: Generate separate CSS file for custom styles

### Code Generation Features
- **Proper Positioning**: Absolute positioning with exact coordinates
- **Component Mapping**: Each canvas component maps to appropriate JSX/HTML
- **Property Handling**: All component properties are preserved
- **TypeScript Support**: Full TypeScript interfaces for React components
- **Responsive Design**: Maintains responsive behavior

### Export Modal Features
- **Live Preview**: Preview HTML exports in iframe
- **Syntax Highlighting**: Code display with language-specific colors
- **Copy to Clipboard**: One-click code copying
- **File Download**: Download as .tsx or .html files
- **CSS Download**: Separate CSS file download
- **Real-time Generation**: Code updates as options change

### Generated Code Examples

#### React Component Export
```tsx
import React from 'react';

interface MyWebsiteProps {
  className?: string;
}

const MyWebsite: React.FC<MyWebsiteProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <div className="absolute left-[100px] top-[100px] w-[120px] h-[40px]">
        <button className="bg-blue-600 text-white px-4 py-2 rounded transition-colors">
          Click me
        </button>
      </div>
      <div className="absolute left-[250px] top-[100px] w-[200px] h-[60px]">
        <h1 className="font-bold text-gray-900">Welcome</h1>
      </div>
    </div>
  );
};

export default MyWebsite;
```

#### HTML Export
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Website</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white">
  <div class="relative w-full min-h-screen">
    <div class="absolute left-[100px] top-[100px] w-[120px] h-[40px]">
      <button class="bg-blue-600 text-white px-4 py-2 rounded transition-colors">
        Click me
      </button>
    </div>
    <div class="absolute left-[250px] top-[100px] w-[200px] h-[60px]">
      <h1 class="font-bold text-gray-900">Welcome</h1>
    </div>
  </div>
</body>
</html>
```

## Design State Management Features

### Save/Load Functionality
- **Named Designs**: Save designs with custom names for easy identification
- **Multiple Versions**: Maintain multiple design versions simultaneously
- **Design Metadata**: Track creation dates, modification times, and component counts
- **Current Design Tracking**: Always know which design is currently active
- **Design List**: View all saved designs with metadata and quick actions

### Auto-Save System
- **Debounced Auto-Save**: Automatically saves changes after 2 seconds of inactivity
- **Auto-Save Recovery**: Restore work from auto-saved state on page reload
- **Auto-Save Management**: Clear auto-save data when no longer needed
- **Auto-Save Status**: Visual indicators show auto-save activity

### Import/Export Features
- **JSON Export**: Export designs as downloadable JSON files
- **File Import**: Import designs from JSON files with validation
- **Design Validation**: Ensures imported designs have required structure
- **Import Naming**: Automatically names imported designs with timestamps

### Design Manager Panel
- **Save Dialog**: Modal dialog for naming and saving designs
- **Load Dialog**: Browse and select from saved designs
- **Design Actions**: Load, export, and delete designs with confirmation
- **Current Design Info**: Shows active design and auto-save status
- **Design Count**: Displays total number of saved designs

### Backward Compatibility
- **Legacy Data Loading**: Automatically migrates old localStorage data
- **Graceful Fallback**: Handles missing or corrupted data gracefully
- **Data Migration**: Preserves existing work when upgrading

## Component Types & Properties

### Button
- **Variants**: primary, secondary, outline, ghost
- **Sizes**: sm, md, lg
- **Properties**: text, variant, size

### Header
- **Levels**: h1-h6
- **Properties**: text, level

### Text
- **Properties**: text content

### Image
- **Properties**: src, alt

### Container
- **Layouts**: flex, grid, block
- **Directions**: row, column
- **Properties**: layout, direction

### Input
- **Types**: text, email, password, number
- **Properties**: placeholder, type

### Card
- **Padding**: sm, md, lg
- **Shadows**: sm, md, lg
- **Properties**: text, padding, shadow

### Divider
- Horizontal line separator

### Spacer
- Vertical spacing element

### Icon
- **Properties**: text (icon character)

## Data Structure

### CanvasComponent
```typescript
interface CanvasComponent {
  id: string;
  type: ComponentType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  properties: ComponentProperties;
  isSelected: boolean;
}
```

### DesignState
```typescript
interface DesignState {
  id: string;
  name: string;
  components: CanvasComponent[];
  gridConfig: { size: number; enabled: boolean };
  canvasSize: { width: number; height: number };
  createdAt: string;
  updatedAt: string;
  version: string;
}
```

### SavedDesign
```typescript
interface SavedDesign {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  componentCount: number;
}
```

### ExportOptions
```typescript
interface ExportOptions {
  format: 'react' | 'html';
  includeTailwind: boolean;
  includeCustomCSS: boolean;
  componentName?: string;
  exportType: 'component' | 'page';
}
```

### GeneratedCode
```typescript
interface GeneratedCode {
  code: string;
  css?: string;
  filename: string;
  language: string;
}
```

### TreeNode
```typescript
interface TreeNode {
  id: string;
  type: string;
  label: string;
  children: TreeNode[];
  isExpanded: boolean;
  level: number;
}
```

### ComponentProperties
```typescript
interface ComponentProperties {
  text?: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  src?: string;
  alt?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  layout?: 'flex' | 'grid' | 'block';
  direction?: 'row' | 'column';
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg';
}
```

### GridConfig
```typescript
interface GridConfig {
  size: number;      // Grid size in pixels
  enabled: boolean;  // Whether grid snapping is enabled
}
```

## API Reference

### Canvas Props
- `components`: Array of CanvasComponent
- `selectedComponentId`: Currently selected component ID
- `onComponentAdd`: Callback when component is added
- `onComponentSelect`: Callback when component is selected
- `onComponentUpdate`: Callback when component is updated
- `onUndo`: Callback for undo action
- `onRedo`: Callback for redo action
- `gridConfig`: Grid configuration object

### ComponentSidebar Props
- `onComponentDragStart`: Callback when drag starts

### PropertyPanel Props
- `selectedComponent`: Currently selected component or null
- `onComponentUpdate`: Callback when component properties are updated

### ResizableComponent Props
- `component`: CanvasComponent to render
- `isSelected`: Whether component is selected
- `onComponentUpdate`: Callback when component is updated
- `onComponentSelect`: Callback when component is selected
- `canvasBounds`: Canvas dimensions
- `gridConfig`: Grid configuration for snapping

### useUndoRedo Hook
```typescript
const {
  components,
  updateComponents,
  undo,
  redo,
  canUndo,
  canRedo,
  clearHistory
} = useUndoRedo(initialComponents);
```

### useResize Hook
```typescript
const {
  isResizing,
  handleResizeStart
} = useResize({
  onResize: handleResize,
  minSize: { width: 50, height: 30 },
  maxSize: { width: 800, height: 600 },
  canvasBounds: { width: 800, height: 600 },
  gridConfig: { size: 20, enabled: false }
});
```

## Grid Utilities

### Grid Functions
```typescript
// Snap a single value to grid
const snappedValue = snapToGrid(value, gridSize);

// Snap position to grid
const snappedPosition = snapPositionToGrid(position, gridSize);

// Snap size to grid
const snappedSize = snapSizeToGrid(size, gridSize);

// Get grid lines for visual display
const gridLines = getGridLines(canvasSize, gridSize);

// Check if value is near grid line
const isNear = isNearGridLine(value, gridSize, threshold);
```

## Local Storage

The Website Builder automatically saves canvas state to localStorage:
- `website-builder-components`: Component array with positions and properties
- `website-builder-grid-config`: Grid configuration settings
- Auto-save on every change
- Load on component mount

## Export Format

```json
{
  "components": [...],
  "gridConfig": {
    "size": 20,
    "enabled": true
  },
  "exportDate": "2024-01-01T00:00:00.000Z",
  "version": "1.0"
}
```

## Property Panel Features

### Position & Size Controls
- X, Y coordinates for precise positioning
- Width and height controls for component sizing
- Real-time updates on canvas
- Grid snapping integration

### Component-Specific Properties
- **Button**: Text, variant, size
- **Header**: Text, heading level
- **Text**: Content textarea
- **Image**: Source URL, alt text
- **Input**: Placeholder, input type
- **Card**: Content, padding, shadow
- **Container**: Layout type, direction
- **Icon**: Icon character

### Actions
- Delete component with confirmation
- Deselect component
- Visual feedback for all actions

## Drag & Resize Features

### Resize Handles
- **Corner handles**: Resize from corners (8 handles total)
- **Edge handles**: Resize from edges (4 handles)
- **Visual feedback**: Hover states and cursor changes
- **Size constraints**: Minimum 50×30px, maximum 800×600px

### Drag Behavior
- **Smooth dragging**: Using react-draggable library
- **Boundary constraints**: Components stay within canvas
- **Grid snapping**: Optional snapping to grid lines
- **Keyboard movement**: Arrow keys for precise positioning

### Visual Indicators
- **Selection ring**: Blue ring around selected components
- **Resize handles**: Blue squares at corners and edges
- **Size tooltip**: Shows dimensions during resize
- **Position tooltip**: Shows coordinates during drag

## Future Enhancements

- [ ] Component resizing handles with aspect ratio lock
- [ ] Component repositioning by dragging with snap guides
- [ ] Component templates and presets
- [ ] Real-time collaboration
- [ ] Code generation from canvas
- [ ] Responsive design preview
- [ ] Component library extensions
- [ ] Layer management
- [ ] Component grouping
- [ ] Advanced styling options
- [ ] Alignment guides
- [ ] Component rotation
- [ ] Multi-select functionality

## Browser Support

- Modern browsers with HTML5 Drag & Drop API support
- LocalStorage for data persistence
- CSS Grid and Flexbox for layout
- Keyboard event handling
- Mouse event handling for resize operations

## Dependencies

- React 18+
- TypeScript
- Tailwind CSS
- react-draggable for smooth dragging
- Custom resize hooks for resize functionality

## Additional Notes

- The Website Builder uses localStorage for data persistence.
- The grid snapping feature allows components to snap to grid lines during drag and resize operations.
- The drag and resize features provide smooth and precise component manipulation.
- The grid utilities help with grid snapping calculations.
- The property panel features allow for component property editing and deletion.
- The drag and resize features provide visual feedback and constraints during resize operations.
- The future enhancements list includes potential improvements and new features.
- The browser support section mentions the requirements for the Website Builder to function correctly.
- The dependencies section lists the necessary libraries and frameworks for the Website Builder.
- The additional notes section provides additional information about the Website Builder's functionality. 