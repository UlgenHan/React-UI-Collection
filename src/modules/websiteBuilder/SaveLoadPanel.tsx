import React, { useState, useEffect, useRef } from 'react';
import { CanvasComponent } from './types';
import { designStateManager, SavedDesign, DesignState } from './designStateManager';

interface SaveLoadPanelProps {
  components: CanvasComponent[];
  gridConfig: { size: number; enabled: boolean };
  onLoadDesign: (design: DesignState) => void;
  onClearCanvas: () => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
}

const SaveLoadPanel: React.FC<SaveLoadPanelProps> = ({
  components,
  gridConfig,
  onLoadDesign,
  onClearCanvas
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
  const [currentDesignId, setCurrentDesignId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [saveName, setSaveName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved designs on mount
  useEffect(() => {
    loadSavedDesigns();
    setCurrentDesignId(designStateManager.getCurrentDesignId());
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (components.length > 0) {
      designStateManager.autoSave(components, gridConfig);
    }
  }, [components, gridConfig]);

  const loadSavedDesigns = () => {
    const designs = designStateManager.listSavedDesigns();
    setSavedDesigns(designs);
  };

  const addNotification = (type: 'success' | 'error' | 'info', message: string, duration = 3000) => {
    const id = Date.now().toString();
    const notification: Notification = { id, type, message, duration };
    setNotifications(prev => [...prev, notification]);

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleSaveDesign = async () => {
    if (!saveName.trim()) {
      addNotification('error', 'Please enter a design name');
      return;
    }

    setIsLoading(true);
    try {
      const designId = await designStateManager.saveDesign(saveName, components, gridConfig);
      setCurrentDesignId(designId);
      loadSavedDesigns();
      setSaveName('');
      setShowSaveDialog(false);
      addNotification('success', `Design "${saveName}" saved successfully`);
    } catch (error) {
      addNotification('error', 'Failed to save design');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadDesign = async (designId: string) => {
    setIsLoading(true);
    try {
      const design = await designStateManager.loadDesign(designId);
      onLoadDesign(design);
      setCurrentDesignId(designId);
      setShowLoadDialog(false);
      addNotification('success', `Design "${design.name}" loaded successfully`);
    } catch (error) {
      addNotification('error', 'Failed to load design');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDesign = async (designId: string, designName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${designName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await designStateManager.deleteDesign(designId);
      if (currentDesignId === designId) {
        setCurrentDesignId(null);
      }
      loadSavedDesigns();
      addNotification('success', `Design "${designName}" deleted successfully`);
    } catch (error) {
      addNotification('error', 'Failed to delete design');
    }
  };

  const handleExportDesign = async (designId: string, designName: string) => {
    try {
      const jsonData = await designStateManager.exportDesign(designId);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${designName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
      link.click();
      URL.revokeObjectURL(url);
      addNotification('success', `Design "${designName}" exported successfully`);
    } catch (error) {
      addNotification('error', 'Failed to export design');
    }
  };

  const handleImportDesign = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const design = await designStateManager.importDesign(text);
      onLoadDesign(design);
      setCurrentDesignId(design.id);
      loadSavedDesigns();
      addNotification('success', `Design "${design.name}" imported successfully`);
    } catch (error) {
      addNotification('error', 'Failed to import design. Please check the file format.');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleLoadAutoSave = () => {
    const autoSave = designStateManager.loadAutoSave();
    if (autoSave) {
      onLoadDesign(autoSave);
      addNotification('success', 'Auto-saved design restored');
    } else {
      addNotification('info', 'No auto-saved design found');
    }
  };

  const handleClearAutoSave = () => {
    designStateManager.clearAutoSave();
    addNotification('success', 'Auto-save cleared');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <>
      {/* Main Panel */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Design Manager</h3>
          
          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={() => setShowSaveDialog(true)}
              disabled={isLoading || components.length === 0}
              className="w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              💾 Save Design
            </button>
            
            <button
              onClick={() => setShowLoadDialog(true)}
              disabled={isLoading}
              className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📂 Load Design
            </button>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📥 Import Design
            </button>
            
            <button
              onClick={handleLoadAutoSave}
              disabled={isLoading}
              className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🔄 Restore Auto-save
            </button>
          </div>

          {/* Current Design Info */}
          {currentDesignId && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900">Current Design</div>
              <div className="text-xs text-blue-700">
                {savedDesigns.find(d => d.id === currentDesignId)?.name || 'Unknown'}
              </div>
            </div>
          )}

          {/* Auto-save Status */}
          <div className="mt-3 text-xs text-gray-500">
            Auto-save: {components.length > 0 ? 'Active' : 'Inactive'}
          </div>
        </div>

        {/* Saved Designs List */}
        <div className="flex-1 overflow-y-auto p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Saved Designs</h4>
          
          {savedDesigns.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-2xl mb-2">📁</div>
              <div className="text-sm">No saved designs</div>
              <div className="text-xs">Save your first design to get started</div>
            </div>
          ) : (
            <div className="space-y-2">
              {savedDesigns.map(design => (
                <div
                  key={design.id}
                  className={`p-3 rounded-lg border transition-colors ${
                    currentDesignId === design.id
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {design.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {design.componentCount} components • {formatDate(design.updatedAt)}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 ml-2">
                      <button
                        onClick={() => handleLoadDesign(design.id)}
                        disabled={isLoading}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Load design"
                      >
                        📂
                      </button>
                      <button
                        onClick={() => handleExportDesign(design.id, design.name)}
                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                        title="Export design"
                      >
                        📤
                      </button>
                      <button
                        onClick={() => handleDeleteDesign(design.id, design.name)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete design"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{savedDesigns.length} saved designs</span>
            <button
              onClick={handleClearAutoSave}
              className="text-red-500 hover:text-red-700"
            >
              Clear Auto-save
            </button>
          </div>
        </div>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Save Design</h3>
            <input
              type="text"
              placeholder="Enter design name..."
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex items-center justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDesign}
                disabled={isLoading || !saveName.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Load Dialog */}
      {showLoadDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Load Design</h3>
            {savedDesigns.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No saved designs available
              </div>
            ) : (
              <div className="space-y-2">
                {savedDesigns.map(design => (
                  <div
                    key={design.id}
                    className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer"
                    onClick={() => handleLoadDesign(design.id)}
                  >
                    <div className="text-sm font-medium text-gray-900">{design.name}</div>
                    <div className="text-xs text-gray-500">
                      {design.componentCount} components • {formatDate(design.updatedAt)}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4">
              <button
                onClick={() => setShowLoadDialog(false)}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input for import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImportDesign}
        className="hidden"
      />

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`px-4 py-3 rounded-lg shadow-lg max-w-sm transition-all ${
              notification.type === 'success'
                ? 'bg-green-500 text-white'
                : notification.type === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm">{notification.message}</span>
              <button
                onClick={() => removeNotification(notification.id)}
                className="ml-2 text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SaveLoadPanel; 