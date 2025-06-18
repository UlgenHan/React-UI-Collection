import React, { useState, useEffect } from 'react';
import { CanvasComponent, ComponentProperties } from './types';

interface PropertyPanelProps {
  selectedComponent: CanvasComponent | null;
  onComponentUpdate: (component: CanvasComponent) => void;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({
  selectedComponent,
  onComponentUpdate
}) => {
  const [localProperties, setLocalProperties] = useState<ComponentProperties>({});
  const [activeBreakpoint, setActiveBreakpoint] = useState<'sm' | 'md' | 'lg'>('md');

  useEffect(() => {
    if (selectedComponent) {
      setLocalProperties(selectedComponent.properties);
    }
  }, [selectedComponent]);

  const updateComponent = (newProperties: Partial<ComponentProperties>) => {
    if (!selectedComponent) return;

    const updatedProperties = { ...localProperties, ...newProperties };
    setLocalProperties(updatedProperties);

    const updatedComponent = {
      ...selectedComponent,
      properties: updatedProperties
    };
    onComponentUpdate(updatedComponent);
  };

  const getResponsiveValue = (property: string): string => {
    const responsiveProp = localProperties[`${property}_${activeBreakpoint}` as keyof ComponentProperties];
    const fallbackProp = localProperties[property as keyof ComponentProperties];
    return String(responsiveProp || fallbackProp || '');
  };

  const setResponsiveValue = (property: string, value: string) => {
    const responsiveKey = `${property}_${activeBreakpoint}` as keyof ComponentProperties;
    updateComponent({ [responsiveKey]: value });
  };

  if (!selectedComponent) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <div className="text-center text-gray-500">
          <p>Select a component to edit its properties</p>
        </div>
      </div>
    );
  }

  const isLayoutContainer = ['flexbox', 'grid', 'section', 'container'].includes(selectedComponent.type);

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* Component Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {selectedComponent.type.charAt(0).toUpperCase() + selectedComponent.type.slice(1)}
          </h3>
          <p className="text-sm text-gray-500">ID: {selectedComponent.id}</p>
        </div>

        {/* Responsive Breakpoint Selector */}
        {isLayoutContainer && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Responsive Controls</h4>
            <div className="flex space-x-1 mb-4">
              {(['sm', 'md', 'lg'] as const).map(breakpoint => (
                <button
                  key={breakpoint}
                  onClick={() => setActiveBreakpoint(breakpoint)}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded transition-colors ${
                    activeBreakpoint === breakpoint
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {breakpoint.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="text-xs text-gray-500 mb-4">
              Editing: <span className="font-medium">{activeBreakpoint.toUpperCase()}</span> breakpoint
            </div>
          </div>
        )}

        {/* Layout Container Properties */}
        {selectedComponent.type === 'flexbox' && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">FlexBox Properties</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Direction</label>
                <select
                  value={String(getResponsiveValue('flexDirection'))}
                  onChange={(e) => setResponsiveValue('flexDirection', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="row">Row</option>
                  <option value="column">Column</option>
                  <option value="row-reverse">Row Reverse</option>
                  <option value="column-reverse">Column Reverse</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Justify Content</label>
                <select
                  value={String(getResponsiveValue('justifyContent'))}
                  onChange={(e) => setResponsiveValue('justifyContent', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="flex-start">Start</option>
                  <option value="center">Center</option>
                  <option value="flex-end">End</option>
                  <option value="space-between">Space Between</option>
                  <option value="space-around">Space Around</option>
                  <option value="space-evenly">Space Evenly</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Align Items</label>
                <select
                  value={String(getResponsiveValue('alignItems'))}
                  onChange={(e) => setResponsiveValue('alignItems', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="stretch">Stretch</option>
                  <option value="flex-start">Start</option>
                  <option value="center">Center</option>
                  <option value="flex-end">End</option>
                  <option value="baseline">Baseline</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Gap</label>
                <input
                  type="text"
                  value={String(getResponsiveValue('gap'))}
                  onChange={(e) => setResponsiveValue('gap', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 16px, 1rem"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Flex Wrap</label>
                <select
                  value={String(getResponsiveValue('flexWrap'))}
                  onChange={(e) => setResponsiveValue('flexWrap', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="nowrap">No Wrap</option>
                  <option value="wrap">Wrap</option>
                  <option value="wrap-reverse">Wrap Reverse</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {selectedComponent.type === 'grid' && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Grid Properties</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Columns</label>
                <input
                  type="text"
                  value={String(getResponsiveValue('gridTemplateColumns'))}
                  onChange={(e) => setResponsiveValue('gridTemplateColumns', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., repeat(3, 1fr), 1fr 2fr 1fr"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Rows</label>
                <input
                  type="text"
                  value={String(getResponsiveValue('gridTemplateRows'))}
                  onChange={(e) => setResponsiveValue('gridTemplateRows', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., auto, repeat(2, 1fr)"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Gap</label>
                <input
                  type="text"
                  value={String(getResponsiveValue('gridGap'))}
                  onChange={(e) => setResponsiveValue('gridGap', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 16px, 1rem"
                />
              </div>
            </div>
          </div>
        )}

        {/* Common Properties */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Common Properties</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Width</label>
              <input
                type="text"
                value={localProperties.width || ''}
                onChange={(e) => updateComponent({ width: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 100px, 50%"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Height</label>
              <input
                type="text"
                value={localProperties.height || ''}
                onChange={(e) => updateComponent({ height: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 100px, 50%"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Padding</label>
              <input
                type="text"
                value={localProperties.padding || ''}
                onChange={(e) => updateComponent({ padding: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 16px, 1rem"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Background Color</label>
              <input
                type="color"
                value={localProperties.backgroundColor || '#ffffff'}
                onChange={(e) => updateComponent({ backgroundColor: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Border Radius</label>
              <input
                type="text"
                value={localProperties.borderRadius || ''}
                onChange={(e) => updateComponent({ borderRadius: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 8px, 0.5rem"
              />
            </div>
          </div>
        </div>

        {/* Component-specific properties */}
        {selectedComponent.type === 'button' && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Button Properties</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Text</label>
                <input
                  type="text"
                  value={localProperties.text || ''}
                  onChange={(e) => updateComponent({ text: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Button text"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Variant</label>
                <select
                  value={localProperties.variant || 'primary'}
                  onChange={(e) => updateComponent({ variant: e.target.value as any })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="outline">Outline</option>
                  <option value="ghost">Ghost</option>
                  <option value="danger">Danger</option>
                  <option value="success">Success</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Size</label>
                <select
                  value={localProperties.size || 'md'}
                  onChange={(e) => updateComponent({ size: e.target.value as any })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                </select>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localProperties.disabled || false}
                    onChange={(e) => updateComponent({ disabled: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-xs font-medium text-gray-700">Disabled</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {selectedComponent.type === 'text' && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Text Properties</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={localProperties.text || ''}
                  onChange={(e) => updateComponent({ text: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter text content..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Font Size</label>
                <input
                  type="text"
                  value={localProperties.fontSize || ''}
                  onChange={(e) => updateComponent({ fontSize: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 16px, 1rem"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
                <input
                  type="color"
                  value={localProperties.color || '#374151'}
                  onChange={(e) => updateComponent({ color: e.target.value })}
                  className="w-full h-10 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Text Align</label>
                <select
                  value={localProperties.textAlign || 'left'}
                  onChange={(e) => updateComponent({ textAlign: e.target.value as any })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                  <option value="justify">Justify</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {selectedComponent.type === 'image' && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Image Properties</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Source URL</label>
                <input
                  type="url"
                  value={localProperties.src || ''}
                  onChange={(e) => updateComponent({ src: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Alt Text</label>
                <input
                  type="text"
                  value={localProperties.alt || ''}
                  onChange={(e) => updateComponent({ alt: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Image description"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Object Fit</label>
                <select
                  value={localProperties.objectFit || 'cover'}
                  onChange={(e) => updateComponent({ objectFit: e.target.value as any })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="cover">Cover</option>
                  <option value="contain">Contain</option>
                  <option value="fill">Fill</option>
                  <option value="none">None</option>
                  <option value="scale-down">Scale Down</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {selectedComponent.type === 'input' && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Input Properties</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Placeholder</label>
                <input
                  type="text"
                  value={localProperties.placeholder || ''}
                  onChange={(e) => updateComponent({ placeholder: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={localProperties.type || 'text'}
                  onChange={(e) => updateComponent({ type: e.target.value as any })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="password">Password</option>
                  <option value="number">Number</option>
                  <option value="tel">Telephone</option>
                  <option value="url">URL</option>
                  <option value="search">Search</option>
                </select>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localProperties.required || false}
                    onChange={(e) => updateComponent({ required: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-xs font-medium text-gray-700">Required</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {selectedComponent.type === 'card' && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Card Properties</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Shadow</label>
                <select
                  value={localProperties.shadow || 'md'}
                  onChange={(e) => updateComponent({ shadow: e.target.value as any })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="none">None</option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Actions</h4>
          <div className="space-y-2">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this component?')) {
                  // This will be handled by the parent component
                  const updatedComponent = {
                    ...selectedComponent,
                    _delete: true
                  };
                  onComponentUpdate(updatedComponent);
                }
              }}
              className="w-full px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded border border-red-200 transition-colors"
            >
              Delete Component
            </button>
            <button
              onClick={() => {
                const updatedComponent = {
                  ...selectedComponent,
                  isSelected: false
                };
                onComponentUpdate(updatedComponent);
              }}
              className="w-full px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded border border-gray-200 transition-colors"
            >
              Deselect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPanel; 