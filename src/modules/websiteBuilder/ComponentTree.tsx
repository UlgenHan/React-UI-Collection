import React, { useState, useEffect, useRef } from 'react';
import { CanvasComponent } from './types';
import ContextMenu from './ContextMenu';

interface TreeNode {
  id: string;
  type: string;
  label: string;
  children: TreeNode[];
  isExpanded: boolean;
  level: number;
}

interface ComponentTreeProps {
  components: CanvasComponent[];
  selectedComponentId: string | null;
  onComponentSelect: (componentId: string | null) => void;
  onComponentUpdate: (component: CanvasComponent) => void;
}

const ComponentTree: React.FC<ComponentTreeProps> = ({
  components,
  selectedComponentId,
  onComponentSelect,
  onComponentUpdate
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    nodeId: string;
  } | null>(null);
  const [clipboard, setClipboard] = useState<CanvasComponent | null>(null);
  const treeRef = useRef<HTMLDivElement>(null);

  // Convert flat components array to hierarchical tree structure
  const buildTree = (): TreeNode[] => {
    const componentMap = new Map<string, CanvasComponent>();
    const childrenMap = new Map<string, string[]>();

    // Create maps for efficient lookup
    components.forEach(component => {
      componentMap.set(component.id, component);
      childrenMap.set(component.id, []);
    });

    // Build hierarchical structure based on positioning
    const rootNodes: TreeNode[] = [];
    const processed = new Set<string>();

    components.forEach(component => {
      if (processed.has(component.id)) return;

      const node: TreeNode = {
        id: component.id,
        type: component.type,
        label: getComponentLabel(component),
        children: [],
        isExpanded: expandedNodes.has(component.id),
        level: 0
      };

      // Find children (components that are positioned within this component's bounds)
      const children = findChildren(component, components);
      children.forEach(childId => {
        if (!processed.has(childId)) {
          const childComponent = componentMap.get(childId);
          if (childComponent) {
            const childNode: TreeNode = {
              id: childId,
              type: childComponent.type,
              label: getComponentLabel(childComponent),
              children: [],
              isExpanded: expandedNodes.has(childId),
              level: node.level + 1
            };
            node.children.push(childNode);
            processed.add(childId);
          }
        }
      });

      if (!processed.has(component.id)) {
        rootNodes.push(node);
        processed.add(component.id);
      }
    });

    return rootNodes;
  };

  // Find components that are positioned within another component's bounds
  const findChildren = (parent: CanvasComponent, allComponents: CanvasComponent[]): string[] => {
    return allComponents
      .filter(component => component.id !== parent.id)
      .filter(component => {
        const parentBounds = {
          left: parent.position.x,
          right: parent.position.x + parent.size.width,
          top: parent.position.y,
          bottom: parent.position.y + parent.size.height
        };

        const childCenter = {
          x: component.position.x + component.size.width / 2,
          y: component.position.y + component.size.height / 2
        };

        return (
          childCenter.x >= parentBounds.left &&
          childCenter.x <= parentBounds.right &&
          childCenter.y >= parentBounds.top &&
          childCenter.y <= parentBounds.bottom
        );
      })
      .map(component => component.id);
  };

  // Get a readable label for a component
  const getComponentLabel = (component: CanvasComponent): string => {
    const baseLabel = component.type.charAt(0).toUpperCase() + component.type.slice(1);
    
    if (component.properties.text) {
      return `${baseLabel}: ${component.properties.text.slice(0, 20)}${component.properties.text.length > 20 ? '...' : ''}`;
    }
    
    return `${baseLabel} (${component.id.slice(0, 8)})`;
  };

  // Filter tree nodes based on search term
  const filterTree = (nodes: TreeNode[], term: string): TreeNode[] => {
    if (!term) return nodes;

    return nodes
      .map(node => {
        const matchesSearch = node.label.toLowerCase().includes(term.toLowerCase()) ||
                             node.type.toLowerCase().includes(term.toLowerCase());
        
        const filteredChildren = filterTree(node.children, term);
        const hasMatchingChildren = filteredChildren.length > 0;

        if (matchesSearch || hasMatchingChildren) {
          return {
            ...node,
            children: filteredChildren,
            isExpanded: hasMatchingChildren ? true : node.isExpanded
          };
        }
        return null;
      })
      .filter((node): node is TreeNode => node !== null);
  };

  // Toggle node expansion
  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  // Handle node click
  const handleNodeClick = (nodeId: string) => {
    onComponentSelect(nodeId);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, node: TreeNode) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleNodeClick(node.id);
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (node.children.length > 0 && !node.isExpanded) {
          toggleNode(node.id);
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (node.isExpanded) {
          toggleNode(node.id);
        }
        break;
      case 'Delete':
        e.preventDefault();
        handleDeleteComponent(node.id);
        break;
    }
  };

  // Handle context menu
  const handleContextMenu = (e: React.MouseEvent, nodeId: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      nodeId
    });
  };

  // Close context menu
  const closeContextMenu = () => {
    setContextMenu(null);
  };

  // Delete component
  const handleDeleteComponent = (nodeId: string) => {
    const component = components.find(comp => comp.id === nodeId);
    if (component) {
      const componentToDelete = { ...component, _delete: true };
      onComponentUpdate(componentToDelete);
    }
  };

  // Duplicate component
  const handleDuplicateComponent = (nodeId: string) => {
    const component = components.find(comp => comp.id === nodeId);
    if (component) {
      const duplicatedComponent: CanvasComponent = {
        ...component,
        id: `${component.type}-${Date.now()}`,
        position: {
          x: component.position.x + 20,
          y: component.position.y + 20
        }
      };
      onComponentUpdate(duplicatedComponent);
    }
  };

  // Copy component
  const handleCopyComponent = (nodeId: string) => {
    const component = components.find(comp => comp.id === nodeId);
    if (component) {
      setClipboard(component);
    }
  };

  // Cut component
  const handleCutComponent = (nodeId: string) => {
    const component = components.find(comp => comp.id === nodeId);
    if (component) {
      setClipboard(component);
      handleDeleteComponent(nodeId);
    }
  };

  // Paste component
  const handlePasteComponent = () => {
    if (clipboard) {
      const pastedComponent: CanvasComponent = {
        ...clipboard,
        id: `${clipboard.type}-${Date.now()}`,
        position: {
          x: clipboard.position.x + 20,
          y: clipboard.position.y + 20
        }
      };
      onComponentUpdate(pastedComponent);
    }
  };

  // Build and filter the tree
  const treeNodes = buildTree();
  const filteredNodes = filterTree(treeNodes, searchTerm);

  // Render a single tree node
  const renderNode = (node: TreeNode): React.ReactNode => {
    const isSelected = selectedComponentId === node.id;
    const hasChildren = node.children.length > 0;

    return (
      <div key={node.id} className="select-none group">
        <div
          className={`
            flex items-center px-2 py-1 rounded cursor-pointer transition-colors
            ${isSelected 
              ? 'bg-blue-100 text-blue-900 border border-blue-300' 
              : 'hover:bg-gray-100 text-gray-700'
            }
            ${node.level > 0 ? 'ml-4' : ''}
          `}
          style={{ paddingLeft: `${node.level * 16 + 8}px` }}
          onClick={() => handleNodeClick(node.id)}
          onKeyDown={(e) => handleKeyDown(e, node)}
          onContextMenu={(e) => handleContextMenu(e, node.id)}
          tabIndex={0}
          role="treeitem"
          aria-expanded={hasChildren ? node.isExpanded : undefined}
          aria-selected={isSelected}
        >
          {/* Expand/collapse arrow */}
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(node.id);
              }}
              className="w-4 h-4 mr-1 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-transform"
              style={{
                transform: node.isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'
              }}
            >
              ▶
            </button>
          )}
          
          {/* Component icon */}
          <span className="w-4 h-4 mr-2 flex items-center justify-center text-gray-500">
            {getComponentIcon(node.type)}
          </span>
          
          {/* Component label */}
          <span className="flex-1 text-sm font-medium truncate">
            {node.label}
          </span>
          
          {/* Component type badge */}
          <span className="ml-2 px-1.5 py-0.5 text-xs bg-gray-200 text-gray-600 rounded">
            {node.type}
          </span>
          
          {/* Delete button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteComponent(node.id);
            }}
            className="ml-2 w-4 h-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Delete component"
          >
            ×
          </button>
        </div>
        
        {/* Render children */}
        {hasChildren && node.isExpanded && (
          <div className="ml-2 border-l border-gray-200">
            {node.children.map(child => renderNode(child))}
          </div>
        )}
      </div>
    );
  };

  // Get icon for component type
  const getComponentIcon = (type: string): string => {
    const icons: Record<string, string> = {
      button: '🔘',
      header: '📝',
      text: '📄',
      image: '🖼️',
      container: '📦',
      input: '📝',
      card: '🃏',
      divider: '➖',
      spacer: '⬜',
      icon: '⭐'
    };
    return icons[type] || '📄';
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Component Tree</h3>
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
        
        {/* Component count */}
        <div className="mt-2 text-xs text-gray-500">
          {filteredNodes.length} of {components.length} components
        </div>
      </div>

      {/* Tree content */}
      <div 
        ref={treeRef}
        className="flex-1 overflow-y-auto p-2"
        role="tree"
        aria-label="Component hierarchy"
      >
        {filteredNodes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? 'No components match your search' : 'No components on canvas'}
          </div>
        ) : (
          <div className="space-y-1">
            {filteredNodes.map(node => renderNode(node))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Use arrow keys to navigate</span>
          <span>Right-click for options</span>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={closeContextMenu}
          onDelete={() => handleDeleteComponent(contextMenu.nodeId)}
          onDuplicate={() => handleDuplicateComponent(contextMenu.nodeId)}
          onCopy={() => handleCopyComponent(contextMenu.nodeId)}
          onCut={() => handleCutComponent(contextMenu.nodeId)}
          onPaste={handlePasteComponent}
          canPaste={!!clipboard}
        />
      )}
    </div>
  );
};

export default ComponentTree; 