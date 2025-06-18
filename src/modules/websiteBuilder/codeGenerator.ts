import { CanvasComponent, ComponentType, ComponentProperties } from './types';

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

export class CodeGenerator {
  private componentCounter = 0;

  // Generate code based on canvas components
  generateCode(components: CanvasComponent[], options: ExportOptions): GeneratedCode {
    this.componentCounter = 0;
    
    if (options.format === 'react') {
      return this.generateReactCode(components, options);
    } else {
      return this.generateHTMLCode(components, options);
    }
  }

  // Generate React JSX code
  private generateReactCode(components: CanvasComponent[], options: ExportOptions): GeneratedCode {
    const componentName = options.componentName || 'ExportedWebsite';
    const exportType = options.exportType;
    
    let code = '';
    
    if (exportType === 'component') {
      code += `import React from 'react';\n\n`;
      code += `interface ${componentName}Props {\n`;
      code += `  className?: string;\n`;
      code += `}\n\n`;
      code += `const ${componentName}: React.FC<${componentName}Props> = ({ className = '' }) => {\n`;
      code += `  return (\n`;
      code += `    <div className={\`relative w-full h-full \${className}\`}>\n`;
    } else {
      code += `import React from 'react';\n\n`;
      code += `const ${componentName}: React.FC = () => {\n`;
      code += `  return (\n`;
      code += `    <div className="min-h-screen bg-white">\n`;
    }

    // Generate component JSX
    const componentJSX = this.generateComponentJSX(components, options);
    code += componentJSX;

    if (exportType === 'component') {
      code += `    </div>\n`;
    } else {
      code += `    </div>\n`;
    }
    
    code += `  );\n`;
    code += `};\n\n`;
    code += `export default ${componentName};\n`;

    // Generate CSS if needed
    let css = '';
    if (options.includeCustomCSS) {
      css = this.generateCustomCSS(components);
    }

    return {
      code,
      css,
      filename: `${componentName}.tsx`,
      language: 'typescript'
    };
  }

  // Generate HTML code
  private generateHTMLCode(components: CanvasComponent[], options: ExportOptions): GeneratedCode {
    let code = '<!DOCTYPE html>\n';
    code += '<html lang="en">\n';
    code += '<head>\n';
    code += '  <meta charset="UTF-8">\n';
    code += '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
    code += '  <title>Exported Website</title>\n';
    
    if (options.includeTailwind) {
      code += '  <script src="https://cdn.tailwindcss.com"></script>\n';
    }
    
    if (options.includeCustomCSS) {
      code += '  <style>\n';
      code += this.generateCustomCSS(components);
      code += '  </style>\n';
    }
    
    code += '</head>\n';
    code += '<body class="bg-white">\n';
    code += '  <div class="relative w-full min-h-screen">\n';
    
    // Generate HTML elements
    const htmlElements = this.generateHTMLElements(components, options);
    code += htmlElements;
    
    code += '  </div>\n';
    code += '</body>\n';
    code += '</html>';

    return {
      code,
      filename: 'exported-website.html',
      language: 'html'
    };
  }

  // Generate JSX for components
  private generateComponentJSX(components: CanvasComponent[], options: ExportOptions): string {
    if (components.length === 0) {
      return '      <div className="text-gray-500 text-center py-8">No components to display</div>\n';
    }

    let jsx = '';
    
    // Sort components by position (top to bottom, left to right)
    const sortedComponents = [...components].sort((a, b) => {
      if (Math.abs(a.position.y - b.position.y) < 10) {
        return a.position.x - b.position.x;
      }
      return a.position.y - b.position.y;
    });

    for (const component of sortedComponents) {
      jsx += this.generateSingleComponentJSX(component, options);
    }

    return jsx;
  }

  // Generate JSX for a single component
  private generateSingleComponentJSX(component: CanvasComponent, options: ExportOptions): string {
    const { type, properties, position, size } = component;
    const componentId = `component-${++this.componentCounter}`;
    
    // Generate positioning styles
    const positionStyles = this.generatePositionStyles(position, size, options);
    
    // Generate component-specific JSX
    const componentJSX = this.generateComponentByType(type, properties, componentId);
    
    return `      <div className="${positionStyles}">\n        ${componentJSX}\n      </div>\n`;
  }

  // Generate HTML elements
  private generateHTMLElements(components: CanvasComponent[], options: ExportOptions): string {
    if (components.length === 0) {
      return '    <div class="text-gray-500 text-center py-8">No components to display</div>\n';
    }

    let html = '';
    
    // Sort components by position
    const sortedComponents = [...components].sort((a, b) => {
      if (Math.abs(a.position.y - b.position.y) < 10) {
        return a.position.x - b.position.x;
      }
      return a.position.y - b.position.y;
    });

    for (const component of sortedComponents) {
      html += this.generateSingleHTMLElement(component, options);
    }

    return html;
  }

  // Generate HTML for a single component
  private generateSingleHTMLElement(component: CanvasComponent, options: ExportOptions): string {
    const { type, properties, position, size } = component;
    
    // Generate positioning styles
    const positionStyles = this.generatePositionStyles(position, size, options);
    
    // Generate component-specific HTML
    const componentHTML = this.generateHTMLByType(type, properties);
    
    return `    <div class="${positionStyles}">\n      ${componentHTML}\n    </div>\n`;
  }

  // Generate positioning styles
  private generatePositionStyles(position: { x: number; y: number }, size: { width: number; height: number }, options: ExportOptions): string {
    const baseClasses = 'absolute';
    
    if (options.format === 'react') {
      return `${baseClasses} left-[${position.x}px] top-[${position.y}px] w-[${size.width}px] h-[${size.height}px]`;
    } else {
      return `${baseClasses} left-[${position.x}px] top-[${position.y}px] w-[${size.width}px] h-[${size.height}px]`;
    }
  }

  // Generate component JSX by type
  private generateComponentByType(type: ComponentType, properties: ComponentProperties, componentId: string): string {
    switch (type) {
      case 'button':
        return this.generateButtonJSX(properties);
      case 'header':
        return this.generateHeaderJSX(properties);
      case 'text':
        return this.generateTextJSX(properties);
      case 'image':
        return this.generateImageJSX(properties);
      case 'container':
        return this.generateContainerJSX(properties);
      case 'input':
        return this.generateInputJSX(properties);
      case 'card':
        return this.generateCardJSX(properties);
      case 'divider':
        return this.generateDividerJSX(properties);
      case 'spacer':
        return this.generateSpacerJSX(properties);
      case 'icon':
        return this.generateIconJSX(properties);
      default:
        return `<div className="text-red-500">Unknown component type: ${type}</div>`;
    }
  }

  // Generate HTML by type
  private generateHTMLByType(type: ComponentType, properties: ComponentProperties): string {
    switch (type) {
      case 'button':
        return this.generateButtonHTML(properties);
      case 'header':
        return this.generateHeaderHTML(properties);
      case 'text':
        return this.generateTextHTML(properties);
      case 'image':
        return this.generateImageHTML(properties);
      case 'container':
        return this.generateContainerHTML(properties);
      case 'input':
        return this.generateInputHTML(properties);
      case 'card':
        return this.generateCardHTML(properties);
      case 'divider':
        return this.generateDividerHTML(properties);
      case 'spacer':
        return this.generateSpacerHTML(properties);
      case 'icon':
        return this.generateIconHTML(properties);
      default:
        return `<div class="text-red-500">Unknown component type: ${type}</div>`;
    }
  }

  // Button component generators
  private generateButtonJSX(properties: ComponentProperties): string {
    const { text = 'Button', variant = 'primary', size = 'md' } = properties;
    const variantClasses = this.getButtonVariantClasses(variant);
    const sizeClasses = this.getButtonSizeClasses(size);
    
    return `<button className="${variantClasses} ${sizeClasses} rounded transition-colors">${text}</button>`;
  }

  private generateButtonHTML(properties: ComponentProperties): string {
    const { text = 'Button', variant = 'primary', size = 'md' } = properties;
    const variantClasses = this.getButtonVariantClasses(variant);
    const sizeClasses = this.getButtonSizeClasses(size);
    
    return `<button class="${variantClasses} ${sizeClasses} rounded transition-colors">${text}</button>`;
  }

  // Header component generators
  private generateHeaderJSX(properties: ComponentProperties): string {
    const { text = 'Header', level = 1 } = properties;
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    
    return `<${Tag} className="font-bold text-gray-900">${text}</${Tag}>`;
  }

  private generateHeaderHTML(properties: ComponentProperties): string {
    const { text = 'Header', level = 1 } = properties;
    
    return `<h${level} class="font-bold text-gray-900">${text}</h${level}>`;
  }

  // Text component generators
  private generateTextJSX(properties: ComponentProperties): string {
    const { text = 'Text content' } = properties;
    
    return `<p className="text-gray-700 leading-relaxed">${text}</p>`;
  }

  private generateTextHTML(properties: ComponentProperties): string {
    const { text = 'Text content' } = properties;
    
    return `<p class="text-gray-700 leading-relaxed">${text}</p>`;
  }

  // Image component generators
  private generateImageJSX(properties: ComponentProperties): string {
    const { src = 'https://via.placeholder.com/300x200', alt = 'Image' } = properties;
    
    return `<img src="${src}" alt="${alt}" className="w-full h-full object-cover rounded" />`;
  }

  private generateImageHTML(properties: ComponentProperties): string {
    const { src = 'https://via.placeholder.com/300x200', alt = 'Image' } = properties;
    
    return `<img src="${src}" alt="${alt}" class="w-full h-full object-cover rounded" />`;
  }

  // Container component generators
  private generateContainerJSX(properties: ComponentProperties): string {
    const { layout = 'block', direction = 'column' } = properties;
    const layoutClasses = this.getContainerLayoutClasses(layout, direction);
    
    return `<div className="${layoutClasses} w-full h-full">\n        {/* Container content */}\n      </div>`;
  }

  private generateContainerHTML(properties: ComponentProperties): string {
    const { layout = 'block', direction = 'column' } = properties;
    const layoutClasses = this.getContainerLayoutClasses(layout, direction);
    
    return `<div class="${layoutClasses} w-full h-full">\n      <!-- Container content -->\n    </div>`;
  }

  // Input component generators
  private generateInputJSX(properties: ComponentProperties): string {
    const { placeholder = 'Enter text...', type = 'text' } = properties;
    
    return `<input type="${type}" placeholder="${placeholder}" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />`;
  }

  private generateInputHTML(properties: ComponentProperties): string {
    const { placeholder = 'Enter text...', type = 'text' } = properties;
    
    return `<input type="${type}" placeholder="${placeholder}" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />`;
  }

  // Card component generators
  private generateCardJSX(properties: ComponentProperties): string {
    const { text = 'Card content', padding = 'md', shadow = 'md' } = properties;
    const paddingClasses = this.getCardPaddingClasses(padding);
    const shadowClasses = this.getCardShadowClasses(shadow);
    
    return `<div className="${paddingClasses} ${shadowClasses} bg-white rounded-lg border border-gray-200">\n        <div className="text-gray-700">${text}</div>\n      </div>`;
  }

  private generateCardHTML(properties: ComponentProperties): string {
    const { text = 'Card content', padding = 'md', shadow = 'md' } = properties;
    const paddingClasses = this.getCardPaddingClasses(padding);
    const shadowClasses = this.getCardShadowClasses(shadow);
    
    return `<div class="${paddingClasses} ${shadowClasses} bg-white rounded-lg border border-gray-200">\n      <div class="text-gray-700">${text}</div>\n    </div>`;
  }

  // Divider component generators
  private generateDividerJSX(properties: ComponentProperties): string {
    return `<hr className="w-full border-t border-gray-300" />`;
  }

  private generateDividerHTML(properties: ComponentProperties): string {
    return `<hr class="w-full border-t border-gray-300" />`;
  }

  // Spacer component generators
  private generateSpacerJSX(properties: ComponentProperties): string {
    return `<div className="w-full h-full bg-gray-100" />`;
  }

  private generateSpacerHTML(properties: ComponentProperties): string {
    return `<div class="w-full h-full bg-gray-100"></div>`;
  }

  // Icon component generators
  private generateIconJSX(properties: ComponentProperties): string {
    const { text = '⭐' } = properties;
    
    return `<div className="flex items-center justify-center w-full h-full text-2xl">${text}</div>`;
  }

  private generateIconHTML(properties: ComponentProperties): string {
    const { text = '⭐' } = properties;
    
    return `<div class="flex items-center justify-center w-full h-full text-2xl">${text}</div>`;
  }

  // Helper methods for generating CSS classes
  private getButtonVariantClasses(variant: string): string {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 text-white hover:bg-blue-700';
      case 'secondary':
        return 'bg-gray-600 text-white hover:bg-gray-700';
      case 'outline':
        return 'border border-blue-600 text-blue-600 hover:bg-blue-50';
      case 'ghost':
        return 'text-blue-600 hover:bg-blue-50';
      default:
        return 'bg-blue-600 text-white hover:bg-blue-700';
    }
  }

  private getButtonSizeClasses(size: string): string {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-6 py-3 text-base';
      default:
        return 'px-4 py-2 text-sm';
    }
  }

  private getContainerLayoutClasses(layout: string, direction: string): string {
    switch (layout) {
      case 'flex':
        return `flex ${direction === 'row' ? 'flex-row' : 'flex-col'}`;
      case 'grid':
        return 'grid grid-cols-1';
      case 'block':
      default:
        return 'block';
    }
  }

  private getCardPaddingClasses(padding: string): string {
    switch (padding) {
      case 'sm':
        return 'p-3';
      case 'md':
        return 'p-4';
      case 'lg':
        return 'p-6';
      default:
        return 'p-4';
    }
  }

  private getCardShadowClasses(shadow: string): string {
    switch (shadow) {
      case 'sm':
        return 'shadow-sm';
      case 'md':
        return 'shadow-md';
      case 'lg':
        return 'shadow-lg';
      default:
        return 'shadow-md';
    }
  }

  // Generate custom CSS for components
  private generateCustomCSS(components: CanvasComponent[]): string {
    let css = '';
    
    // Add any custom styles here if needed
    css += '/* Custom styles for exported components */\n';
    css += '.exported-component {\n';
    css += '  position: relative;\n';
    css += '}\n\n';
    
    return css;
  }
}

// Export singleton instance
export const codeGenerator = new CodeGenerator(); 