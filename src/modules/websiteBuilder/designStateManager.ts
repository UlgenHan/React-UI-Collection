import { CanvasComponent } from './types';

export interface DesignState {
  id: string;
  name: string;
  components: CanvasComponent[];
  gridConfig: { size: number; enabled: boolean };
  canvasSize: { width: number; height: number };
  createdAt: string;
  updatedAt: string;
  version: string;
}

export interface SavedDesign {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  componentCount: number;
}

export interface DesignStateManager {
  saveDesign: (name: string, components: CanvasComponent[], gridConfig: any, canvasSize?: any) => Promise<string>;
  loadDesign: (id: string) => Promise<DesignState>;
  deleteDesign: (id: string) => Promise<void>;
  listSavedDesigns: () => SavedDesign[];
  exportDesign: (id: string) => Promise<string>;
  importDesign: (jsonData: string) => Promise<DesignState>;
  autoSave: (components: CanvasComponent[], gridConfig: any) => void;
  loadAutoSave: () => DesignState | null;
  clearAutoSave: () => void;
}

const STORAGE_KEYS = {
  DESIGNS: 'website-builder-designs',
  AUTO_SAVE: 'website-builder-auto-save',
  CURRENT_DESIGN: 'website-builder-current-design'
};

const VERSION = '1.0.0';

class DesignStateManagerImpl implements DesignStateManager {
  private autoSaveTimeout: number | null = null;
  private autoSaveDebounceMs = 2000; // 2 seconds

  // Save a design with a given name
  async saveDesign(
    name: string, 
    components: CanvasComponent[], 
    gridConfig: any, 
    canvasSize: any = { width: 800, height: 600 }
  ): Promise<string> {
    try {
      const designId = `design-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const now = new Date().toISOString();
      
      const designState: DesignState = {
        id: designId,
        name,
        components: this.serializeComponents(components),
        gridConfig,
        canvasSize,
        createdAt: now,
        updatedAt: now,
        version: VERSION
      };

      // Get existing designs
      const existingDesigns = this.getDesignsMap();
      existingDesigns[designId] = designState;
      
      // Save to localStorage
      localStorage.setItem(STORAGE_KEYS.DESIGNS, JSON.stringify(existingDesigns));
      
      // Set as current design
      localStorage.setItem(STORAGE_KEYS.CURRENT_DESIGN, designId);
      
      return designId;
    } catch (error) {
      console.error('Error saving design:', error);
      throw new Error('Failed to save design');
    }
  }

  // Load a design by ID
  async loadDesign(id: string): Promise<DesignState> {
    try {
      const designs = this.getDesignsMap();
      const design = designs[id];
      
      if (!design) {
        throw new Error('Design not found');
      }

      // Update last accessed time
      design.updatedAt = new Date().toISOString();
      designs[id] = design;
      localStorage.setItem(STORAGE_KEYS.DESIGNS, JSON.stringify(designs));
      
      // Set as current design
      localStorage.setItem(STORAGE_KEYS.CURRENT_DESIGN, id);
      
      return {
        ...design,
        components: this.deserializeComponents(design.components)
      };
    } catch (error) {
      console.error('Error loading design:', error);
      throw new Error('Failed to load design');
    }
  }

  // Delete a design
  async deleteDesign(id: string): Promise<void> {
    try {
      const designs = this.getDesignsMap();
      delete designs[id];
      localStorage.setItem(STORAGE_KEYS.DESIGNS, JSON.stringify(designs));
      
      // Clear current design if it was the deleted one
      const currentDesignId = localStorage.getItem(STORAGE_KEYS.CURRENT_DESIGN);
      if (currentDesignId === id) {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_DESIGN);
      }
    } catch (error) {
      console.error('Error deleting design:', error);
      throw new Error('Failed to delete design');
    }
  }

  // List all saved designs
  listSavedDesigns(): SavedDesign[] {
    try {
      const designs = this.getDesignsMap();
      return Object.values(designs).map(design => ({
        id: design.id,
        name: design.name,
        createdAt: design.createdAt,
        updatedAt: design.updatedAt,
        componentCount: design.components.length
      })).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    } catch (error) {
      console.error('Error listing designs:', error);
      return [];
    }
  }

  // Export design as JSON string
  async exportDesign(id: string): Promise<string> {
    try {
      const design = await this.loadDesign(id);
      return JSON.stringify(design, null, 2);
    } catch (error) {
      console.error('Error exporting design:', error);
      throw new Error('Failed to export design');
    }
  }

  // Import design from JSON string
  async importDesign(jsonData: string): Promise<DesignState> {
    try {
      const designData = JSON.parse(jsonData);
      
      // Validate the design data
      if (!designData.components || !designData.gridConfig) {
        throw new Error('Invalid design format');
      }

      // Generate new ID and timestamps
      const designId = `imported-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const now = new Date().toISOString();
      
      const designState: DesignState = {
        id: designId,
        name: designData.name || `Imported Design ${new Date().toLocaleDateString()}`,
        components: this.serializeComponents(designData.components),
        gridConfig: designData.gridConfig,
        canvasSize: designData.canvasSize || { width: 800, height: 600 },
        createdAt: now,
        updatedAt: now,
        version: VERSION
      };

      // Save the imported design
      const existingDesigns = this.getDesignsMap();
      existingDesigns[designId] = designState;
      localStorage.setItem(STORAGE_KEYS.DESIGNS, JSON.stringify(existingDesigns));
      
      return {
        ...designState,
        components: this.deserializeComponents(designState.components)
      };
    } catch (error) {
      console.error('Error importing design:', error);
      throw new Error('Failed to import design');
    }
  }

  // Auto-save current state with debouncing
  autoSave(components: CanvasComponent[], gridConfig: any): void {
    if (this.autoSaveTimeout) {
      clearTimeout(this.autoSaveTimeout);
    }

    this.autoSaveTimeout = window.setTimeout(() => {
      try {
        const autoSaveData = {
          components: this.serializeComponents(components),
          gridConfig,
          timestamp: new Date().toISOString(),
          version: VERSION
        };
        
        localStorage.setItem(STORAGE_KEYS.AUTO_SAVE, JSON.stringify(autoSaveData));
      } catch (error) {
        console.error('Error auto-saving:', error);
      }
    }, this.autoSaveDebounceMs);
  }

  // Load auto-saved state
  loadAutoSave(): DesignState | null {
    try {
      const autoSaveData = localStorage.getItem(STORAGE_KEYS.AUTO_SAVE);
      if (!autoSaveData) return null;

      const parsed = JSON.parse(autoSaveData);
      return {
        id: 'auto-save',
        name: 'Auto-saved Design',
        components: this.deserializeComponents(parsed.components),
        gridConfig: parsed.gridConfig,
        canvasSize: { width: 800, height: 600 },
        createdAt: parsed.timestamp,
        updatedAt: parsed.timestamp,
        version: parsed.version
      };
    } catch (error) {
      console.error('Error loading auto-save:', error);
      return null;
    }
  }

  // Clear auto-saved state
  clearAutoSave(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTO_SAVE);
  }

  // Get current design ID
  getCurrentDesignId(): string | null {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_DESIGN);
  }

  // Update existing design
  async updateDesign(id: string, components: CanvasComponent[], gridConfig: any): Promise<void> {
    try {
      const designs = this.getDesignsMap();
      const design = designs[id];
      
      if (!design) {
        throw new Error('Design not found');
      }

      design.components = this.serializeComponents(components);
      design.gridConfig = gridConfig;
      design.updatedAt = new Date().toISOString();
      
      designs[id] = design;
      localStorage.setItem(STORAGE_KEYS.DESIGNS, JSON.stringify(designs));
    } catch (error) {
      console.error('Error updating design:', error);
      throw new Error('Failed to update design');
    }
  }

  // Private helper methods
  private getDesignsMap(): Record<string, DesignState> {
    try {
      const designsJson = localStorage.getItem(STORAGE_KEYS.DESIGNS);
      return designsJson ? JSON.parse(designsJson) : {};
    } catch (error) {
      console.error('Error reading designs from localStorage:', error);
      return {};
    }
  }

  private serializeComponents(components: CanvasComponent[]): any[] {
    return components.map(component => ({
      ...component,
      // Ensure all properties are serializable
      properties: { ...component.properties }
    }));
  }

  private deserializeComponents(components: any[]): CanvasComponent[] {
    return components.map(component => ({
      ...component,
      // Ensure proper typing
      properties: { ...component.properties }
    }));
  }
}

// Export singleton instance
export const designStateManager = new DesignStateManagerImpl(); 