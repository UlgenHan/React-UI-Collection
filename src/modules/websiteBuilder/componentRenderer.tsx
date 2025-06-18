import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { CanvasComponent, ComponentType, ComponentProperties } from './types';

interface ComponentRendererProps {
  component: CanvasComponent;
  isSelected?: boolean;
  onSelect?: (componentId: string) => void;
  onUpdate?: (component: CanvasComponent) => void;
  children?: React.ReactNode;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  isSelected = false,
  onSelect,
  onUpdate,
  children
}) => {
  const { type, properties, id } = component;

  // Make layout containers droppable
  const { setNodeRef, isOver } = useDroppable({
    id: id,
    data: { 
      type: 'component',
      componentType: type
    }
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.(component.id);
  };

  // Helper function to generate responsive Tailwind classes
  const generateResponsiveClasses = (baseClass: string, property: string) => {
    const smValue = properties[`${property}_sm` as keyof ComponentProperties];
    const mdValue = properties[`${property}_md` as keyof ComponentProperties];
    const lgValue = properties[`${property}_lg` as keyof ComponentProperties];
    const defaultValue = properties[property as keyof ComponentProperties];

    let classes = baseClass;
    
    // Add responsive classes
    if (smValue) classes += ` sm:${smValue}`;
    if (mdValue) classes += ` md:${mdValue}`;
    if (lgValue) classes += ` lg:${lgValue}`;
    
    // Add default if no responsive values
    if (!smValue && !mdValue && !lgValue && defaultValue) {
      classes += ` ${defaultValue}`;
    }

    return classes;
  };

  const renderComponent = () => {
    switch (type) {
      // Layout Containers
      case 'section':
        return (
          <section
            ref={setNodeRef}
            className={`w-full ${isSelected ? 'ring-2 ring-blue-500' : ''} ${isOver ? 'ring-2 ring-green-400 bg-green-50' : ''}`}
            style={{
              padding: properties.padding,
              backgroundColor: properties.backgroundColor,
              minHeight: properties.minHeight,
              ...properties.style
            }}
            onClick={handleClick}
          >
            {children}
            {isOver && (
              <div className="absolute inset-0 border-2 border-dashed border-green-400 bg-green-100 bg-opacity-30 pointer-events-none" />
            )}
          </section>
        );

      case 'flexbox':
        const flexClasses = generateResponsiveClasses('flex', 'flexDirection');
        const justifyClasses = generateResponsiveClasses('', 'justifyContent');
        const alignClasses = generateResponsiveClasses('', 'alignItems');
        const gapClasses = generateResponsiveClasses('', 'gap');
        const wrapClasses = generateResponsiveClasses('', 'flexWrap');
        
        return (
          <div
            ref={setNodeRef}
            className={`${flexClasses} ${justifyClasses} ${alignClasses} ${gapClasses} ${wrapClasses} ${isSelected ? 'ring-2 ring-blue-500' : ''} ${isOver ? 'ring-2 ring-green-400 bg-green-50' : ''}`}
            style={{
              padding: properties.padding,
              backgroundColor: properties.backgroundColor,
              ...properties.style
            }}
            onClick={handleClick}
          >
            {children}
            {isOver && (
              <div className="absolute inset-0 border-2 border-dashed border-green-400 bg-green-100 bg-opacity-30 pointer-events-none" />
            )}
          </div>
        );

      case 'grid':
        const gridClasses = generateResponsiveClasses('grid', 'gridTemplateColumns');
        const gridGapClasses = generateResponsiveClasses('', 'gridGap');
        
        return (
          <div
            ref={setNodeRef}
            className={`${gridClasses} ${gridGapClasses} ${isSelected ? 'ring-2 ring-blue-500' : ''} ${isOver ? 'ring-2 ring-green-400 bg-green-50' : ''}`}
            style={{
              padding: properties.padding,
              backgroundColor: properties.backgroundColor,
              ...properties.style
            }}
            onClick={handleClick}
          >
            {children}
            {isOver && (
              <div className="absolute inset-0 border-2 border-dashed border-green-400 bg-green-100 bg-opacity-30 pointer-events-none" />
            )}
          </div>
        );

      case 'container':
        return (
          <div
            ref={setNodeRef}
            className={`mx-auto ${isSelected ? 'ring-2 ring-blue-500' : ''} ${isOver ? 'ring-2 ring-green-400 bg-green-50' : ''}`}
            style={{
              maxWidth: properties.maxWidth,
              margin: properties.margin,
              padding: properties.padding,
              backgroundColor: properties.backgroundColor,
              ...properties.style
            }}
            onClick={handleClick}
          >
            {children}
            {isOver && (
              <div className="absolute inset-0 border-2 border-dashed border-green-400 bg-green-100 bg-opacity-30 pointer-events-none" />
            )}
          </div>
        );

      case 'card':
        return (
          <div
            ref={setNodeRef}
            className={`bg-white rounded-lg border ${isSelected ? 'ring-2 ring-blue-500' : ''} ${isOver ? 'ring-2 ring-green-400 bg-green-50' : ''}`}
            style={{
              padding: properties.padding,
              backgroundColor: properties.backgroundColor,
              borderRadius: properties.borderRadius,
              border: properties.border,
              boxShadow: properties.shadow === 'sm' ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' :
                         properties.shadow === 'md' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' :
                         properties.shadow === 'lg' ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' :
                         properties.shadow === 'xl' ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)' : 'none',
              ...properties.style
            }}
            onClick={handleClick}
          >
            {children}
            {isOver && (
              <div className="absolute inset-0 border-2 border-dashed border-green-400 bg-green-100 bg-opacity-30 pointer-events-none" />
            )}
          </div>
        );

      // Basic UI Elements
      case 'button':
        const buttonClasses = `px-4 py-2 rounded transition-colors ${isSelected ? 'ring-2 ring-blue-500' : ''}`;
        const variantClasses = {
          primary: 'bg-blue-600 text-white hover:bg-blue-700',
          secondary: 'bg-gray-600 text-white hover:bg-gray-700',
          outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
          ghost: 'text-blue-600 hover:bg-blue-50',
          danger: 'bg-red-600 text-white hover:bg-red-700',
          success: 'bg-green-600 text-white hover:bg-green-700'
        };
        
        return (
          <button
            className={`${buttonClasses} ${variantClasses[properties.variant || 'primary']}`}
            style={{
              padding: properties.padding,
              borderRadius: properties.borderRadius,
              ...properties.style
            }}
            disabled={properties.disabled}
            onClick={handleClick}
          >
            {properties.text || 'Button'}
          </button>
        );

      case 'text':
        return (
          <p
            className={`${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              fontSize: properties.fontSize,
              fontWeight: properties.fontWeight,
              fontFamily: properties.fontFamily,
              color: properties.color,
              textAlign: properties.textAlign,
              lineHeight: properties.lineHeight,
              letterSpacing: properties.letterSpacing,
              ...properties.style
            }}
            onClick={handleClick}
          >
            {properties.text || 'Text content'}
          </p>
        );

      case 'image':
        return (
          <img
            src={properties.src || 'https://via.placeholder.com/300x200'}
            alt={properties.alt || 'Image'}
            className={`w-full h-full ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              objectFit: properties.objectFit,
              ...properties.style
            }}
            onClick={handleClick}
          />
        );

      case 'video':
        return (
          <video
            src={properties.videoSrc}
            poster={properties.poster}
            controls={properties.controls}
            autoPlay={properties.videoAutoplay}
            loop={properties.loop}
            muted={properties.muted}
            className={`w-full h-full ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            onClick={handleClick}
          />
        );

      case 'input':
        return (
          <input
            type={properties.type || 'text'}
            placeholder={properties.placeholder}
            required={properties.required}
            min={properties.inputMin}
            max={properties.inputMax}
            step={properties.inputStep}
            pattern={properties.pattern}
            className={`w-full ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              padding: properties.padding,
              border: properties.border,
              borderRadius: properties.borderRadius,
              ...properties.style
            }}
            onClick={handleClick}
          />
        );

      case 'icon':
        return (
          <div
            className={`flex items-center justify-center ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              fontSize: properties.iconSize,
              color: properties.color,
              ...properties.style
            }}
            onClick={handleClick}
          >
            {properties.iconName === 'star' ? '⭐' :
             properties.iconName === 'heart' ? '❤️' :
             properties.iconName === 'check' ? '✅' :
             properties.iconName === 'arrow' ? '➡️' :
             properties.iconName === 'home' ? '🏠' :
             properties.iconName === 'user' ? '👤' :
             properties.iconName === 'settings' ? '⚙️' :
             properties.iconName === 'search' ? '🔍' :
             properties.iconName === 'menu' ? '☰' :
             properties.iconName === 'close' ? '✕' :
             '⭐'}
          </div>
        );

      // Navigation
      case 'menu':
        return (
          <nav
            className={`flex ${properties.orientation === 'vertical' ? 'flex-col' : 'flex-row'} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              backgroundColor: properties.backgroundColor,
              padding: properties.padding,
              ...properties.style
            }}
            onClick={handleClick}
          >
            {properties.menuItems?.map(item => (
              <a
                key={item.id}
                href={item.href || '#'}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded"
              >
                {item.label}
              </a>
            ))}
          </nav>
        );

      case 'tabs':
        return (
          <div
            className={`${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              backgroundColor: properties.backgroundColor,
              border: properties.border,
              ...properties.style
            }}
            onClick={handleClick}
          >
            <div className="flex border-b">
              {properties.tabs?.map(tab => (
                <button
                  key={tab.id}
                  className={`px-4 py-2 ${properties.activeTab === tab.id ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-4">
              {properties.tabs?.find(tab => tab.id === properties.activeTab)?.content}
            </div>
          </div>
        );

      case 'breadcrumb':
        return (
          <nav
            className={`${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              color: properties.color,
              fontSize: properties.fontSize,
              ...properties.style
            }}
            onClick={handleClick}
          >
            {properties.text}
          </nav>
        );

      case 'pagination':
        return (
          <div
            className={`flex justify-center ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              textAlign: properties.textAlign,
              padding: properties.padding,
              ...properties.style
            }}
            onClick={handleClick}
          >
            {properties.text}
          </div>
        );

      // Media
      case 'audio':
        return (
          <audio
            src={properties.audioSrc}
            controls={properties.showControls}
            className={`w-full ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              width: properties.width,
              ...properties.style
            }}
            onClick={handleClick}
          />
        );

      case 'carousel':
        return (
          <div
            className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            onClick={handleClick}
          >
            {properties.images && properties.images.length > 0 && (
              <img
                src={properties.images[0]}
                alt="Carousel slide"
                className="w-full h-full object-cover"
              />
            )}
            {properties.showArrows && (
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <button className="bg-black bg-opacity-50 text-white p-2 rounded">‹</button>
                <button className="bg-black bg-opacity-50 text-white p-2 rounded">›</button>
              </div>
            )}
            {properties.showDots && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {properties.images?.map((_, index) => (
                  <div key={index} className="w-2 h-2 bg-white rounded-full"></div>
                ))}
              </div>
            )}
          </div>
        );

      case 'gallery':
        return (
          <div
            className={`grid ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              display: properties.display,
              gridTemplateColumns: properties.gridTemplateColumns,
              gap: properties.gridGap,
              ...properties.style
            }}
            onClick={handleClick}
          >
            {properties.images?.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ))}
          </div>
        );

      // Form Elements
      case 'checkbox':
        return (
          <label
            className={`flex items-center ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            onClick={handleClick}
          >
            <input
              type="checkbox"
              checked={properties.checked}
              required={properties.required}
              className="mr-2"
            />
            {properties.label}
          </label>
        );

      case 'radio':
        return (
          <label
            className={`flex items-center ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            onClick={handleClick}
          >
            <input
              type="radio"
              checked={properties.checked}
              required={properties.required}
              className="mr-2"
            />
            {properties.label}
          </label>
        );

      case 'dropdown':
        return (
          <select
            className={`w-full ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              padding: properties.padding,
              border: properties.border,
              borderRadius: properties.borderRadius,
              ...properties.style
            }}
            required={properties.required}
            onClick={handleClick}
          >
            <option value="">{properties.label}</option>
            {properties.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            placeholder={properties.placeholder}
            required={properties.required}
            className={`w-full ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              padding: properties.padding,
              border: properties.border,
              borderRadius: properties.borderRadius,
              ...properties.style
            }}
            onClick={handleClick}
          />
        );

      case 'file-upload':
        return (
          <div
            className={`border-2 border-dashed rounded-lg flex items-center justify-center ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              padding: properties.padding,
              border: properties.border,
              borderRadius: properties.borderRadius,
              textAlign: properties.textAlign,
              ...properties.style
            }}
            onClick={handleClick}
          >
            <input
              type="file"
              className="hidden"
              required={properties.required}
            />
            <span>{properties.label}</span>
          </div>
        );

      // Content
      case 'header':
        const HeaderTag = `h${properties.level || 1}` as keyof JSX.IntrinsicElements;
        return (
          <HeaderTag
            className={`${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              fontSize: properties.fontSize,
              fontWeight: properties.fontWeight,
              color: properties.color,
              margin: properties.margin,
              ...properties.style
            }}
            onClick={handleClick}
          >
            {properties.text || 'Header'}
          </HeaderTag>
        );

      case 'divider':
        return (
          <hr
            className={`w-full ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              border: properties.border,
              margin: properties.margin,
              ...properties.style
            }}
            onClick={handleClick}
          />
        );

      case 'spacer':
        return (
          <div
            className={`${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              height: properties.height,
              backgroundColor: properties.backgroundColor,
              ...properties.style
            }}
            onClick={handleClick}
          />
        );

      case 'list':
        const ListTag = properties.listType === 'ol' ? 'ol' : 'ul';
        return (
          <ListTag
            className={`${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              listStyle: properties.listStyle,
              padding: properties.padding,
              ...properties.style
            }}
            onClick={handleClick}
          >
            {properties.listItems?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ListTag>
        );

      case 'table':
        return (
          <table
            className={`w-full ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              border: properties.border,
              width: properties.width,
              ...properties.style
            }}
            onClick={handleClick}
          >
            <thead>
              <tr>
                {properties.headers?.map((header, index) => (
                  <th key={index} className="border px-4 py-2">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {properties.rows?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );

      // Interactive
      case 'modal':
        return (
          <div
            className={`bg-white rounded-lg shadow-lg ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              backgroundColor: properties.backgroundColor,
              borderRadius: properties.borderRadius,
              padding: properties.padding,
              boxShadow: properties.shadow === 'lg' ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none',
              ...properties.style
            }}
            onClick={handleClick}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{properties.title}</h3>
              {properties.showCloseButton && (
                <button className="text-gray-500 hover:text-gray-700">✕</button>
              )}
            </div>
            <div>{properties.content}</div>
            {children}
          </div>
        );

      case 'tooltip':
        return (
          <div
            className={`relative inline-block ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            onClick={handleClick}
          >
            <div
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-sm rounded"
              style={{
                backgroundColor: properties.backgroundColor,
                color: properties.color,
                padding: properties.padding,
                borderRadius: properties.borderRadius,
                fontSize: properties.fontSize,
                ...properties.style
              }}
            >
              {properties.text}
            </div>
            <div>Hover me</div>
          </div>
        );

      case 'accordion':
        return (
          <div
            className={`border rounded ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              border: properties.border,
              borderRadius: properties.borderRadius,
              ...properties.style
            }}
            onClick={handleClick}
          >
            {properties.accordionItems?.map(item => (
              <div key={item.id} className="border-b last:border-b-0">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50">
                  {item.title}
                </button>
                {item.expanded && (
                  <div className="px-4 py-2 bg-gray-50">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'progress':
        return (
          <div
            className={`w-full ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            onClick={handleClick}
          >
            <div
              className="w-full rounded-full"
              style={{
                backgroundColor: properties.backgroundColor,
                height: properties.height,
                borderRadius: properties.borderRadius,
                ...properties.style
              }}
            >
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: `${(properties.progressValue || 0) / (properties.progressMax || 100) * 100}%`,
                  backgroundColor: properties.color,
                  height: '100%'
                }}
              />
            </div>
            {properties.showLabel && (
              <div className="text-sm text-gray-600 mt-1">
                {properties.progressValue || 0}% of {properties.progressMax || 100}
              </div>
            )}
          </div>
        );

      case 'slider':
        return (
          <div
            className={`w-full ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            onClick={handleClick}
          >
            <input
              type="range"
              min={properties.sliderMin}
              max={properties.sliderMax}
              step={properties.sliderStep}
              value={properties.value}
              className="w-full"
              style={{
                width: properties.width,
                ...properties.style
              }}
            />
            {properties.showValue && (
              <div className="text-sm text-gray-600 mt-1">
                Value: {properties.value}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div
            className={`p-4 border border-gray-300 rounded ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            onClick={handleClick}
          >
            Unknown component type: {type}
          </div>
        );
    }
  };

  return renderComponent();
};

export default ComponentRenderer; 