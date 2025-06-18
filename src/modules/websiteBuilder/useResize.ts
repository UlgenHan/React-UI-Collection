import { useState, useCallback, useEffect } from 'react';
import { snapToGrid, snapPositionToGrid, snapSizeToGrid } from './utils/gridUtils';

interface ResizeState {
  isResizing: boolean;
  direction: string;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  startLeft: number;
  startTop: number;
}

interface UseResizeProps {
  onResize: (width: number, height: number, x: number, y: number) => void;
  minSize?: { width: number; height: number };
  maxSize?: { width: number; height: number };
  canvasBounds: { width: number; height: number };
  gridConfig?: { size: number; enabled: boolean };
}

export const useResize = ({
  onResize,
  minSize = { width: 50, height: 30 },
  maxSize = { width: 800, height: 600 },
  canvasBounds,
  gridConfig = { size: 20, enabled: false }
}: UseResizeProps) => {
  const [resizeState, setResizeState] = useState<ResizeState>({
    isResizing: false,
    direction: '',
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    startLeft: 0,
    startTop: 0
  });

  const handleResizeStart = useCallback((e: React.MouseEvent, direction: string, currentSize: { width: number; height: number }, currentPosition: { x: number; y: number }) => {
    e.preventDefault();
    e.stopPropagation();
    
    setResizeState({
      isResizing: true,
      direction,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: currentSize.width,
      startHeight: currentSize.height,
      startLeft: currentPosition.x,
      startTop: currentPosition.y
    });
  }, []);

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!resizeState.isResizing) return;

    const deltaX = e.clientX - resizeState.startX;
    const deltaY = e.clientY - resizeState.startY;

    let newWidth = resizeState.startWidth;
    let newHeight = resizeState.startHeight;
    let newX = resizeState.startLeft;
    let newY = resizeState.startTop;

    const { direction } = resizeState;

    // Calculate new dimensions based on resize direction
    if (direction.includes('right')) {
      newWidth = Math.max(minSize.width, Math.min(maxSize.width, resizeState.startWidth + deltaX));
    }
    if (direction.includes('left')) {
      const widthChange = deltaX;
      newWidth = Math.max(minSize.width, Math.min(maxSize.width, resizeState.startWidth - widthChange));
      newX = resizeState.startLeft + (resizeState.startWidth - newWidth);
    }
    if (direction.includes('bottom')) {
      newHeight = Math.max(minSize.height, Math.min(maxSize.height, resizeState.startHeight + deltaY));
    }
    if (direction.includes('top')) {
      const heightChange = deltaY;
      newHeight = Math.max(minSize.height, Math.min(maxSize.height, resizeState.startHeight - heightChange));
      newY = resizeState.startTop + (resizeState.startHeight - newHeight);
    }

    // Apply grid snapping if enabled
    if (gridConfig.enabled) {
      const snappedSize = snapSizeToGrid({ width: newWidth, height: newHeight }, gridConfig.size);
      const snappedPosition = snapPositionToGrid({ x: newX, y: newY }, gridConfig.size);
      
      newWidth = snappedSize.width;
      newHeight = snappedSize.height;
      newX = snappedPosition.x;
      newY = snappedPosition.y;
    }

    // Constrain to canvas bounds
    newX = Math.max(0, Math.min(newX, canvasBounds.width - newWidth));
    newY = Math.max(0, Math.min(newY, canvasBounds.height - newHeight));

    onResize(newWidth, newHeight, newX, newY);
  }, [resizeState, minSize, maxSize, canvasBounds, onResize, gridConfig]);

  const handleResizeEnd = useCallback(() => {
    setResizeState(prev => ({ ...prev, isResizing: false }));
  }, []);

  // Add/remove global mouse event listeners
  useEffect(() => {
    if (resizeState.isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [resizeState.isResizing, handleResizeMove, handleResizeEnd]);

  return {
    isResizing: resizeState.isResizing,
    handleResizeStart
  };
}; 