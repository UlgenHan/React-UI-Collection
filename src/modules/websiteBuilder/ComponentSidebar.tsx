import React, { useState } from 'react';
import { useDraggable, DragOverlay } from '@dnd-kit/core';
import { componentDefinitions, componentCategories, getComponentsByCategory } from './componentDefinitions';
import { ComponentType } from './types';

interface ComponentSidebarProps {
  onComponentSelect: (componentType: ComponentType) => void;
}

const SidebarDraggableItem: React.FC<{ component: any }> = ({ component }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${component.type}`,
    data: {
      type: component.type,
      source: 'sidebar',
      defaultProps: component.defaultProps || {},
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={() => component.onComponentSelect?.(component.type)}
      className={`group relative p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer bg-white ${isDragging ? 'opacity-50' : ''}`}
      style={{ pointerEvents: isDragging ? 'none' : undefined }}
    >
      {/* Component Icon */}
      <div className="text-2xl mb-2 text-center group-hover:scale-110 transition-transform">
        {component.icon}
      </div>
      {/* Component Name */}
      <div className="text-xs font-medium text-gray-900 text-center truncate">
        {component.name}
      </div>
      {/* Component Description */}
      <div className="text-xs text-gray-500 text-center mt-1 line-clamp-2">
        {component.description}
      </div>
      {/* Drag Indicator */}
      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      </div>
      {/* Accepts Children Indicator */}
      {component.acceptsChildren && (
        <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-2 h-2 bg-green-500 rounded-full" title="Accepts children"></div>
        </div>
      )}
    </div>
  );
};

const ComponentSidebar: React.FC<ComponentSidebarProps> = ({ onComponentSelect }) => {
  const [activeCategory, setActiveCategory] = useState('layout');

  const components = getComponentsByCategory(activeCategory);

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Components</h2>
        <p className="text-sm text-gray-500">Drag components to canvas</p>
      </div>
      {/* Category Tabs */}
      <div className="flex border-b border-gray-200">
        {componentCategories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <span className="mr-1">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
      {/* Component List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {components.map(component => (
            <SidebarDraggableItem key={component.type} component={{ ...component, onComponentSelect }} />
          ))}
        </div>
        {/* Empty State */}
        {components.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-2xl mb-2">📦</div>
            <p className="text-sm">No components in this category</p>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500 text-center">
          <p>Total: {Object.keys(componentDefinitions).length} components</p>
          <p className="mt-1">Click to add, drag to position</p>
        </div>
      </div>
    </div>
  );
};

export default ComponentSidebar; 