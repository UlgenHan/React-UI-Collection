import React, { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, DragOverlay } from '@dnd-kit/core';
import Canvas from './Canvas';
import ComponentSidebar from './ComponentSidebar';
import PropertyPanel from './PropertyPanel';
import ComponentTree from './ComponentTree';
import SaveLoadPanel from './SaveLoadPanel';
import ExportModal from './ExportModal';
import { CanvasComponent, ComponentType } from './types';
import { useUndoRedo } from './useUndoRedo';
import { designStateManager, DesignState } from './designStateManager';
import { getComponentDefinition } from './componentDefinitions';
import { snapPositionToGrid } from './utils/gridUtils';

const WebsiteBuilder: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [gridConfig, setGridConfig] = useState({ size: 20, enabled: false, snapToGrid: false });
  const [currentDesignId, setCurrentDesignId] = useState<string | null>(null);
  const [showSaveLoadPanel, setShowSaveLoadPanel] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  
  // Use undo/redo hook
  const {
    components,
    updateComponents,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory
  } = useUndoRedo();

  // Load initial state on mount
  useEffect(() => {
    loadInitialState();
  }, []);

  const loadInitialState = async () => {
    try {
      // Try to load current design first
      const currentDesignId = designStateManager.getCurrentDesignId();
      if (currentDesignId) {
        const design = await designStateManager.loadDesign(currentDesignId);
        updateComponents(design.components);
        setGridConfig({ 
          size: design.gridConfig.size, 
          enabled: design.gridConfig.enabled, 
          snapToGrid: design.gridConfig.enabled 
        });
        setCanvasSize(design.canvasSize);
        setCurrentDesignId(design.id);
        return;
      }

      // Try to load auto-save if no current design
      const autoSave = designStateManager.loadAutoSave();
      if (autoSave) {
        updateComponents(autoSave.components);
        // Handle legacy gridConfig structure
        const legacyGridConfig = autoSave.gridConfig;
        setGridConfig({ 
          size: legacyGridConfig.size, 
          enabled: legacyGridConfig.enabled, 
          snapToGrid: legacyGridConfig.enabled 
        });
        setCanvasSize(autoSave.canvasSize);
        setCurrentDesignId('auto-save');
        return;
      }

      // Load legacy data if available (for backward compatibility)
      const savedComponents = localStorage.getItem('website-builder-components');
      if (savedComponents) {
        try {
          const parsedComponents = JSON.parse(savedComponents);
          updateComponents(parsedComponents);
        } catch (error) {
          console.error('Error loading legacy components:', error);
        }
      }

      const savedGridConfig = localStorage.getItem('website-builder-grid-config');
      if (savedGridConfig) {
        try {
          const legacyGridConfig = JSON.parse(savedGridConfig);
          setGridConfig({ ...legacyGridConfig, snapToGrid: legacyGridConfig.enabled });
        } catch (error) {
          console.error('Error loading legacy grid config:', error);
        }
      }
    } catch (error) {
      console.error('Error loading initial state:', error);
    }
  };

  // Handle loading a design
  const handleLoadDesign = (design: DesignState) => {
    updateComponents(design.components);
    // Handle legacy gridConfig structure
    const legacyGridConfig = design.gridConfig;
    setGridConfig({ 
      size: legacyGridConfig.size, 
      enabled: legacyGridConfig.enabled, 
      snapToGrid: legacyGridConfig.enabled 
    });
    setCanvasSize(design.canvasSize);
    setSelectedComponentId(null);
    setCurrentDesignId(design.id);
    clearHistory();
  };

  // Handle adding a new component
  const handleComponentAdd = (newComponent: CanvasComponent) => {
    const updatedComponents = [...components, newComponent];
    updateComponents(updatedComponents);
    setSelectedComponentId(newComponent.id);
  };

  // Handle component selection
  const handleComponentSelect = (componentId: string | null) => {
    setSelectedComponentId(componentId);
  };

  // Handle component update
  const handleComponentUpdate = (updatedComponent: CanvasComponent) => {
    // Check if this is a delete operation
    if ('_delete' in updatedComponent) {
      const { _delete, ...componentToDelete } = updatedComponent;
      const updatedComponents = components.filter(comp => comp.id !== componentToDelete.id);
      updateComponents(updatedComponents);
      setSelectedComponentId(null);
      return;
    }

    const updatedComponents = components.map(comp => 
      comp.id === updatedComponent.id ? updatedComponent : comp
    );
    updateComponents(updatedComponents);
  };

  // Handle component deletion
  const handleComponentDelete = (componentId: string) => {
    const updatedComponents = components.filter(comp => comp.id !== componentId);
    updateComponents(updatedComponents);
    setSelectedComponentId(null);
  };

  // Handle component selection from sidebar
  const handleComponentSelectFromSidebar = (componentType: ComponentType) => {
    console.log('Selected component type:', componentType);
  };

  // Clear all components
  const handleClearCanvas = () => {
    if (window.confirm('Are you sure you want to clear the canvas? This action cannot be undone.')) {
      updateComponents([]);
      setSelectedComponentId(null);
      setCurrentDesignId(null);
      clearHistory();
      designStateManager.clearAutoSave();
    }
  };

  // Export canvas as JSON
  const handleExportCanvas = () => {
    const canvasData = {
      components,
      gridConfig,
      canvasSize,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const dataStr = JSON.stringify(canvasData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `website-canvas-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  // Toggle grid
  const toggleGrid = () => {
    setGridConfig(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  // Toggle grid snapping
  const toggleGridSnapping = () => {
    setGridConfig(prev => ({ ...prev, snapToGrid: !prev.snapToGrid }));
  };

  // Update grid size
  const updateGridSize = (size: number) => {
    setGridConfig(prev => ({ ...prev, size }));
  };

  // Get selected component
  const selectedComponent = components.find(comp => comp.id === selectedComponentId) || null;

  // dnd-kit drag event handlers
  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    setDragOverId(over?.id as string || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragId(null);
    setDragOverId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Handle dropping from sidebar to canvas
    if (activeId.startsWith('sidebar-')) {
      const componentType = activeId.replace('sidebar-', '') as ComponentType;
      const componentDef = getComponentDefinition(componentType);
      
      if (!componentDef) return;

      // Get drop position relative to canvas
      const canvasElement = document.querySelector('[data-droppable-id="canvas"]') as HTMLElement;
      if (!canvasElement) return;

      const rect = canvasElement.getBoundingClientRect();
      const mouseEvent = event.activatorEvent as MouseEvent;
      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;

      // Snap to grid if enabled
      const snappedPosition = gridConfig.snapToGrid 
        ? snapPositionToGrid({ x, y }, gridConfig.size)
        : { x, y };

      const newComponent: CanvasComponent = {
        id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: componentType,
        position: snappedPosition,
        size: componentDef.defaultSize,
        properties: { ...componentDef.defaultProperties },
        children: [],
        isSelected: false,
        parentId: overId === 'canvas' ? null : overId,
        zIndex: components.length
      };

      handleComponentAdd(newComponent);
      setSelectedComponentId(newComponent.id);
    }
    // Handle moving existing components
    else if (activeId.startsWith('component-')) {
      const component = components.find(c => c.id === activeId);
      if (!component) return;

      // If dropping on canvas, make it top-level
      if (overId === 'canvas') {
        const updatedComponent = { ...component, parentId: null };
        handleComponentUpdate(updatedComponent);
      }
      // If dropping on another component that accepts children
      else if (overId.startsWith('component-')) {
        const targetComponent = components.find(c => c.id === overId);
        if (targetComponent?.type) {
          const targetComponentDef = getComponentDefinition(targetComponent.type);
          if (targetComponentDef?.acceptsChildren) {
            const updatedComponent = { ...component, parentId: overId };
            handleComponentUpdate(updatedComponent);
          }
        }
      }
    }
  };

  // Get active drag data for overlay
  const getActiveDragData = () => {
    if (!activeDragId) return null;
    
    if (activeDragId.startsWith('sidebar-')) {
      const componentType = activeDragId.replace('sidebar-', '') as ComponentType;
      const componentDef = getComponentDefinition(componentType);
      return componentDef;
    }
    
    if (activeDragId.startsWith('component-')) {
      return components.find(c => c.id === activeDragId) || null;
    }
    
    return null;
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {/* Main builder UI */}
      <div className="h-screen bg-gray-100 flex">
        {/* Component Sidebar */}
        <ComponentSidebar onComponentSelect={handleComponentSelectFromSidebar} />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Website Builder</h1>
                <p className="text-sm text-gray-600">Drag and drop components to create your website</p>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Design Manager Button */}
                <button
                  onClick={() => setShowSaveLoadPanel(!showSaveLoadPanel)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    showSaveLoadPanel 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title="Design Manager"
                >
                  💾 Design Manager
                </button>

                {/* Export Code Button */}
                <button
                  onClick={() => setShowExportModal(true)}
                  disabled={components.length === 0}
                  className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Export as Code"
                >
                  📤 Export Code
                </button>

                {/* Grid controls */}
                <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
                  <button
                    onClick={toggleGrid}
                    className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                      gridConfig.enabled 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    title="Toggle grid"
                  >
                    Grid
                  </button>
                  <button
                    onClick={toggleGridSnapping}
                    className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                      gridConfig.snapToGrid 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    title="Toggle grid snapping"
                  >
                    Snap
                  </button>
                  {gridConfig.enabled && (
                    <select
                      value={gridConfig.size}
                      onChange={(e) => updateGridSize(Number(e.target.value))}
                      className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
                    >
                      <option value={10}>10px</option>
                      <option value={20}>20px</option>
                      <option value={50}>50px</option>
                      <option value={100}>100px</option>
                    </select>
                  )}
                </div>

                {/* Undo/Redo buttons */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={undo}
                    disabled={!canUndo}
                    className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Undo (Ctrl+Z)"
                  >
                    ↩️ Undo
                  </button>
                  <button
                    onClick={redo}
                    disabled={!canRedo}
                    className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Redo (Ctrl+Y)"
                  >
                    ↪️ Redo
                  </button>
                </div>
                
                <button
                  onClick={handleClearCanvas}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Clear Canvas
                </button>
                <button
                  onClick={handleExportCanvas}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Export JSON
                </button>
                <div className="text-sm text-gray-500">
                  {components.length} components
                </div>
              </div>
            </div>
          </header>

          {/* Canvas Area */}
          <div className="flex-1 overflow-hidden">
            <Canvas
              components={components}
              selectedComponentId={selectedComponentId}
              onComponentSelect={handleComponentSelect}
              onComponentUpdate={handleComponentUpdate}
              onComponentAdd={handleComponentAdd}
              onComponentDelete={handleComponentDelete}
              gridConfig={gridConfig}
              canvasSize={canvasSize}
            />
          </div>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 px-6 py-3">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>
                <span className="font-medium">Canvas Size:</span> {canvasSize.width}x{canvasSize.height}px
              </div>
              <div>
                <span className="font-medium">Selected:</span> {selectedComponentId ? 'Component' : 'None'}
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium">Auto-save:</span> {components.length > 0 ? 'Active' : 'Inactive'}
                <span className="text-gray-400">|</span>
                <span>History: {canUndo ? 'Undo available' : 'No undo'}</span>
                {currentDesignId && (
                  <>
                    <span className="text-gray-400">|</span>
                    <span className="text-blue-600">Design: {currentDesignId === 'auto-save' ? 'Auto-saved' : 'Saved'}</span>
                  </>
                )}
                {gridConfig.enabled && (
                  <>
                    <span className="text-gray-400">|</span>
                    <span className="text-green-600">Grid: {gridConfig.size}px</span>
                  </>
                )}
                {gridConfig.snapToGrid && (
                  <>
                    <span className="text-gray-400">|</span>
                    <span className="text-blue-600">Snap: On</span>
                  </>
                )}
              </div>
            </div>
          </footer>
        </div>

        {/* Component Tree Panel */}
        <ComponentTree
          components={components}
          selectedComponentId={selectedComponentId}
          onComponentSelect={handleComponentSelect}
          onComponentUpdate={handleComponentUpdate}
        />

        {/* Save/Load Panel */}
        {showSaveLoadPanel && (
          <SaveLoadPanel
            components={components}
            gridConfig={gridConfig}
            onLoadDesign={handleLoadDesign}
            onClearCanvas={handleClearCanvas}
          />
        )}

        {/* Export Modal */}
        <ExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          components={components}
        />

        {/* Properties Panel */}
        <PropertyPanel
          selectedComponent={selectedComponent}
          onComponentUpdate={handleComponentUpdate}
        />
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeDragId ? (
          <div className="bg-white border-2 border-blue-400 rounded-lg shadow-lg p-4 opacity-80">
            <div className="text-sm font-medium text-gray-900">
              {activeDragId.startsWith('sidebar-') 
                ? (getActiveDragData() as any)?.name || 'Component'
                : 'Moving component'
              }
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default WebsiteBuilder; 