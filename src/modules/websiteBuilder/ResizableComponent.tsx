import React, { useState, useRef, useCallback } from 'react';
import Draggable from 'react-draggable';
import { CanvasComponent } from './types';
import ComponentRenderer from './componentRenderer';
import { useResize } from './useResize';
import { snapToGrid, snapPositionToGrid } from './utils/gridUtils';

interface ResizableComponentProps {
  component: CanvasComponent;
  isSelected: boolean;
  onComponentUpdate: (component: CanvasComponent) => void;
  onComponentSelect: (componentId: string) => void;
  canvasBounds: { width: number; height: number };
  gridConfig?: { size: number; enabled: boolean; snapToGrid: boolean };
}

const ResizableComponent: React.FC<ResizableComponentProps> = ({
  component,
  isSelected,
  onComponentUpdate,
  onComponentSelect,
  canvasBounds,
  gridConfig = { size: 20, enabled: false, snapToGrid: false }
}) => {
  const componentRef = useRef<HTMLDivElement>(null);

  // Handle resize
  const handleResize = useCallback((width: number, height: number, x: number, y: number) => {
    const updatedComponent: CanvasComponent = {
      ...component,
      position: { x, y },
      size: { width, height }
    };
    onComponentUpdate(updatedComponent);
  }, [component, onComponentUpdate]);

  const { isResizing, handleResizeStart } = useResize({
    onResize: handleResize,
    minSize: { width: 50, height: 30 },
    maxSize: { width: 800, height: 600 },
    canvasBounds,
    gridConfig
  });

  // Handle drag end with grid snapping
  const handleDragEnd = useCallback((e: any, data: any) => {
    let newX = Math.max(0, Math.min(data.x, canvasBounds.width - component.size.width));
    let newY = Math.max(0, Math.min(data.y, canvasBounds.height - component.size.height));

    // Apply grid snapping if enabled
    if (gridConfig.snapToGrid) {
      const snappedPosition = snapPositionToGrid({ x: newX, y: newY }, gridConfig.size);
      newX = snappedPosition.x;
      newY = snappedPosition.y;
    }

    const updatedComponent: CanvasComponent = {
      ...component,
      position: { x: newX, y: newY }
    };

    onComponentUpdate(updatedComponent);
  }, [component, canvasBounds, onComponentUpdate, gridConfig]);

  // Handle component click
  const handleComponentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onComponentSelect(component.id);
  }, [component.id, onComponentSelect]);

  // Handle keyboard navigation with grid snapping
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isSelected) return;

    const STEP = e.shiftKey ? (gridConfig.enabled ? gridConfig.size : 10) : (gridConfig.enabled ? gridConfig.size : 1);
    let newX = component.position.x;
    let newY = component.position.y;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        newX = Math.max(0, newX - STEP);
        break;
      case 'ArrowRight':
        e.preventDefault();
        newX = Math.min(canvasBounds.width - component.size.width, newX + STEP);
        break;
      case 'ArrowUp':
        e.preventDefault();
        newY = Math.max(0, newY - STEP);
        break;
      case 'ArrowDown':
        e.preventDefault();
        newY = Math.min(canvasBounds.height - component.size.height, newY + STEP);
        break;
    }

    // Apply grid snapping for keyboard movement
    if (gridConfig.snapToGrid) {
      newX = snapToGrid(newX, gridConfig.size);
      newY = snapToGrid(newY, gridConfig.size);
    }

    if (newX !== component.position.x || newY !== component.position.y) {
      const updatedComponent: CanvasComponent = {
        ...component,
        position: { x: newX, y: newY }
      };
      onComponentUpdate(updatedComponent);
    }
  }, [isSelected, component, canvasBounds, onComponentUpdate, gridConfig]);

  return (
    <Draggable
      position={{ x: component.position.x, y: component.position.y }}
      onStop={handleDragEnd}
      bounds="parent"
      disabled={isResizing}
      grid={gridConfig.snapToGrid ? [gridConfig.size, gridConfig.size] : undefined}
    >
      <div
        ref={componentRef}
        className={`
          absolute cursor-move transition-all duration-200
          ${isSelected 
            ? 'ring-2 ring-blue-500 ring-offset-2 shadow-lg' 
            : 'hover:ring-1 hover:ring-gray-400'
          }
          ${isResizing ? 'ring-2 ring-green-500' : ''}
        `}
        style={{
          width: component.size.width,
          height: component.size.height,
          zIndex: isSelected ? 10 : 1
        }}
        onClick={handleComponentClick}
        onKeyDown={handleKeyDown}
        tabIndex={isSelected ? 0 : -1}
      >
        {/* Rendered component */}
        <div className="w-full h-full">
          <ComponentRenderer
            component={component}
            isSelected={isSelected}
            onSelect={onComponentSelect}
            onUpdate={onComponentUpdate}
          />
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm" />
        )}

        {/* Resize handles */}
        {isSelected && (
          <>
            {/* Corner handles */}
            <div
              className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 border border-white rounded cursor-nw-resize hover:bg-blue-600 transition-colors"
              onMouseDown={(e) => handleResizeStart(e, 'top-left', component.size, component.position)}
            />
            <div
              className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 border border-white rounded cursor-ne-resize hover:bg-blue-600 transition-colors"
              onMouseDown={(e) => handleResizeStart(e, 'top-right', component.size, component.position)}
            />
            <div
              className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 border border-white rounded cursor-sw-resize hover:bg-blue-600 transition-colors"
              onMouseDown={(e) => handleResizeStart(e, 'bottom-left', component.size, component.position)}
            />
            <div
              className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 border border-white rounded cursor-se-resize hover:bg-blue-600 transition-colors"
              onMouseDown={(e) => handleResizeStart(e, 'bottom-right', component.size, component.position)}
            />

            {/* Edge handles */}
            <div
              className="absolute top-1/2 -left-1 w-3 h-3 bg-blue-500 border border-white rounded cursor-w-resize transform -translate-y-1/2 hover:bg-blue-600 transition-colors"
              onMouseDown={(e) => handleResizeStart(e, 'left', component.size, component.position)}
            />
            <div
              className="absolute top-1/2 -right-1 w-3 h-3 bg-blue-500 border border-white rounded cursor-e-resize transform -translate-y-1/2 hover:bg-blue-600 transition-colors"
              onMouseDown={(e) => handleResizeStart(e, 'right', component.size, component.position)}
            />
            <div
              className="absolute -top-1 left-1/2 w-3 h-3 bg-blue-500 border border-white rounded cursor-n-resize transform -translate-x-1/2 hover:bg-blue-600 transition-colors"
              onMouseDown={(e) => handleResizeStart(e, 'top', component.size, component.position)}
            />
            <div
              className="absolute -bottom-1 left-1/2 w-3 h-3 bg-blue-500 border border-white rounded cursor-s-resize transform -translate-x-1/2 hover:bg-blue-600 transition-colors"
              onMouseDown={(e) => handleResizeStart(e, 'bottom', component.size, component.position)}
            />
          </>
        )}

        {/* Size indicator during resize */}
        {isResizing && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-50">
            {component.size.width} × {component.size.height}
            {gridConfig.enabled && (
              <div className="text-blue-300">Grid: {gridConfig.size}px</div>
            )}
          </div>
        )}

        {/* Delete button */}
        {isSelected && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('Are you sure you want to delete this component?')) {
                const updatedComponent = {
                  ...component,
                  _delete: true
                };
                onComponentUpdate(updatedComponent);
              }
            }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full border-2 border-white shadow-sm hover:bg-red-600 transition-colors flex items-center justify-center text-xs font-bold"
            title="Delete component"
          >
            ×
          </button>
        )}
      </div>
    </Draggable>
  );
};

export default ResizableComponent; 