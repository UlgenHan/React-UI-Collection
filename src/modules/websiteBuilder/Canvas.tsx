import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import Draggable from 'react-draggable';
import { CanvasComponent, ComponentType, ComponentDragData } from './types';
import { getComponentDefinition } from './componentDefinitions';
import ComponentRenderer from './componentRenderer';
import ResizableComponent from './ResizableComponent';
import { snapPositionToGrid, snapSizeToGrid } from './utils/gridUtils';

interface CanvasProps {
  components: CanvasComponent[];
  selectedComponentId: string | null;
  onComponentSelect: (componentId: string | null) => void;
  onComponentUpdate: (component: CanvasComponent) => void;
  onComponentAdd: (component: CanvasComponent) => void;
  onComponentDelete: (componentId: string) => void;
  gridConfig: { size: number; enabled: boolean; snapToGrid: boolean };
  canvasSize: { width: number; height: number };
}

const Canvas: React.FC<CanvasProps> = ({
  components,
  selectedComponentId,
  onComponentSelect,
  onComponentUpdate,
  onComponentAdd,
  onComponentDelete,
  gridConfig,
  canvasSize
}) => {
  // Use setNodeRef from dnd-kit only
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
    data: { type: 'canvas' }
  });

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    // Only deselect if clicking directly on canvas, not on a component
    if (e.target === e.currentTarget) {
      onComponentSelect(null);
    }
  }, [onComponentSelect]);

  const handleComponentClick = useCallback((componentId: string) => {
    onComponentSelect(componentId);
  }, [onComponentSelect]);

  const handleComponentUpdate = useCallback((component: CanvasComponent) => {
    onComponentUpdate(component);
  }, [onComponentUpdate]);

  const handleComponentDelete = useCallback((componentId: string) => {
    onComponentDelete(componentId);
  }, [onComponentDelete]);

  const handleDragStop = useCallback((componentId: string, x: number, y: number) => {
    const component = components.find(c => c.id === componentId);
    if (!component) return;

    // Snap to grid if enabled
    const snappedPosition = gridConfig.snapToGrid 
      ? snapPositionToGrid({ x, y }, gridConfig.size)
      : { x, y };

    const updatedComponent = {
      ...component,
      position: snappedPosition
    };

    onComponentUpdate(updatedComponent);
  }, [components, gridConfig, onComponentUpdate]);

  const handleResizeStop = useCallback((componentId: string, width: number, height: number) => {
    const component = components.find(c => c.id === componentId);
    if (!component) return;

    // Snap to grid if enabled
    const snappedSize = gridConfig.snapToGrid 
      ? snapSizeToGrid({ width, height }, gridConfig.size)
      : { width, height };

    const updatedComponent = {
      ...component,
      size: snappedSize
    };

    onComponentUpdate(updatedComponent);
  }, [components, gridConfig, onComponentUpdate]);

  const renderComponent = (component: CanvasComponent, parentId: string | null = null): React.ReactNode => {
    const isSelected = selectedComponentId === component.id;

    // Render children recursively
    const children = component.children?.map(child => renderComponent(child, component.id)) || [];

    const componentElement = (
      <ComponentRenderer
        component={component}
        isSelected={isSelected}
        onSelect={handleComponentClick}
        onUpdate={handleComponentUpdate}
      >
        {children}
      </ComponentRenderer>
    );

    // Only wrap in ResizableComponent if it's a top-level component
    if (parentId === null) {
      return (
        <ResizableComponent
          key={component.id}
          component={component}
          isSelected={isSelected}
          onComponentUpdate={handleComponentUpdate}
          onComponentSelect={handleComponentClick}
          canvasBounds={canvasSize}
          gridConfig={gridConfig}
        />
      );
    }

    return (
      <div key={component.id} className="relative">
        {componentElement}
      </div>
    );
  };

  // Filter top-level components (no parent)
  const topLevelComponents = components.filter(component => !component.parentId);

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedComponentId) return;

      const selectedComponent = components.find(c => c.id === selectedComponentId);
      if (!selectedComponent) return;

      const moveAmount = e.shiftKey ? 10 : 1; // Shift for larger movements
      let newPosition = { ...selectedComponent.position };

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          newPosition.y -= moveAmount;
          break;
        case 'ArrowDown':
          e.preventDefault();
          newPosition.y += moveAmount;
          break;
        case 'ArrowLeft':
          e.preventDefault();
          newPosition.x -= moveAmount;
          break;
        case 'ArrowRight':
          e.preventDefault();
          newPosition.x += moveAmount;
          break;
        case 'Delete':
        case 'Backspace':
          e.preventDefault();
          onComponentDelete(selectedComponentId);
          return;
        case 'Escape':
          e.preventDefault();
          onComponentSelect(null);
          return;
        default:
          return;
      }

      // Snap to grid if enabled
      if (gridConfig.snapToGrid) {
        newPosition = snapPositionToGrid(newPosition, gridConfig.size);
      }

      // Update component position
      const updatedComponent = {
        ...selectedComponent,
        position: newPosition
      };
      onComponentUpdate(updatedComponent);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedComponentId, components, gridConfig, onComponentSelect, onComponentUpdate, onComponentDelete]);

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div
        ref={setNodeRef}
        className="relative bg-white shadow-inner"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
          minWidth: '100%',
          minHeight: '100vh'
        }}
        onClick={handleCanvasClick}
      >
        {/* Grid Background */}
        {gridConfig.enabled && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #f0f0f0 1px, transparent 1px),
                linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
              `,
              backgroundSize: `${gridConfig.size}px ${gridConfig.size}px`
            }}
          />
        )}

        {/* Drag Over Visual Feedback */}
        {isOver && (
          <div className="absolute inset-0 z-40 pointer-events-none border-4 border-blue-400 border-dashed rounded-lg animate-pulse" />
        )}

        {/* Components */}
        {topLevelComponents.map(component => renderComponent(component))}

        {/* Empty State */}
        {components.length === 0 && !isOver && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-lg font-medium mb-2">Empty Canvas</h3>
              <p className="text-sm">Drag components from the sidebar to get started</p>
            </div>
          </div>
        )}

        {/* Canvas Info */}
        <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-lg shadow-sm text-xs text-gray-600">
          {components.length} component{components.length !== 1 ? 's' : ''}
          {gridConfig.enabled && ` • Grid: ${gridConfig.size}px`}
        </div>
      </div>
    </div>
  );
};

export default Canvas; 