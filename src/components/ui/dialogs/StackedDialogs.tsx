import React, { useEffect } from 'react';

interface Dialog {
  id: string;
  title: string;
  content: React.ReactNode;
  onConfirm?: () => void;
  onClose?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

interface StackedDialogsProps {
  dialogs: Dialog[];
  onCloseDialog: (dialogId: string) => void;
  className?: string;
}

export const StackedDialogs: React.FC<StackedDialogsProps> = ({
  dialogs,
  onCloseDialog,
  className = '',
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dialogs.length > 0) {
        const topDialog = dialogs[dialogs.length - 1];
        if (topDialog.onClose) {
          topDialog.onClose();
        } else {
          onCloseDialog(topDialog.id);
        }
      }
    };

    if (dialogs.length > 0) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (dialogs.length === 0) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [dialogs, onCloseDialog]);

  if (dialogs.length === 0) return null;

  return (
    <>
      {dialogs.map((dialog, index) => {
        const isTopDialog = index === dialogs.length - 1;
        const zIndex = 50 + index;
        
        const handleBackdropClick = () => {
          if (dialog.onClose) {
            dialog.onClose();
          } else {
            onCloseDialog(dialog.id);
          }
        };

        const handleConfirm = () => {
          if (dialog.onConfirm) {
            dialog.onConfirm();
          }
        };

        return (
          <div
            key={dialog.id}
            className={`fixed inset-0 flex items-center justify-center p-4 ${
              isTopDialog ? 'bg-black bg-opacity-50' : 'bg-black bg-opacity-20'
            }`}
            style={{ zIndex }}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`stacked-dialog-title-${dialog.id}`}
          >
            <div
              className={`bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto transform transition-all ${
                isTopDialog ? 'scale-100' : 'scale-95'
              } ${className}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                transform: `scale(${1 - index * 0.02}) translateY(${index * 4}px)`,
              }}
            >
              <div className="p-6">
                <h2
                  id={`stacked-dialog-title-${dialog.id}`}
                  className="text-lg font-semibold text-gray-900 mb-4"
                >
                  {dialog.title}
                </h2>
                <div className="text-gray-600 mb-6">
                  {dialog.content}
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
                {(dialog.showCancel !== false) && (
                  <button
                    onClick={handleBackdropClick}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {dialog.cancelText || 'Cancel'}
                  </button>
                )}
                {dialog.onConfirm && (
                  <button
                    onClick={handleConfirm}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {dialog.confirmText || 'Confirm'}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}; 