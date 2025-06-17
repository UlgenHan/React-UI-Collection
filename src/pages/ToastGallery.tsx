import React, { useState } from 'react';
import { useNavigation } from '../App';
import {
  BasicToast,
  PositionedToast,
  IconToast,
  ActionToast,
  StackedToast,
  AnimatedToast,
  DarkModeToast,
  ProgressToast,
  ClosableToast,
  AutoDismissToast
} from '../components/ui/toasts';

const ToastGallery: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [toasts, setToasts] = useState({
    basic: false,
    positioned: false,
    icon: false,
    action: false,
    stacked: [],
    animated: false,
    dark: false,
    progress: false,
    closable: false,
    autoDismiss: false,
  });

  const showToast = (key: string, duration?: number) => {
    setToasts(prev => ({ ...prev, [key]: true }));
    if (duration) {
      setTimeout(() => {
        setToasts(prev => ({ ...prev, [key]: false }));
      }, duration);
    }
  };

  const hideToast = (key: string) => {
    setToasts(prev => ({ ...prev, [key]: false }));
  };

  const showStackedToast = () => {
    const newToast = {
      id: Date.now(),
      variant: ['success', 'info', 'warning', 'error'][Math.floor(Math.random() * 4)],
      message: `Toast message ${Date.now()}`
    };
    setToasts(prev => ({
      ...prev,
      stacked: [...prev.stacked, newToast]
    }));
  };

  const removeStackedToast = (id: number) => {
    setToasts(prev => ({
      ...prev,
      stacked: prev.stacked.filter(toast => toast.id !== id)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => navigateTo('home')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Gallery
              </button>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Toast Components</h1>
              <p className="text-gray-600 mt-1">Various toast notification components</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          
          {/* Basic Toast */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Toast</h2>
            <p className="text-gray-600 mb-6">Simple toast notifications</p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => showToast('basic', 3000)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Show Basic Toast
              </button>
            </div>
            {toasts.basic && (
              <BasicToast
                variant="info"
                message="This is a basic toast notification!"
                onClose={() => hideToast('basic')}
              />
            )}
          </div>

          {/* Positioned Toast */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Positioned Toast</h2>
            <p className="text-gray-600 mb-6">Toast with different positioning</p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => showToast('positioned', 3000)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Show Positioned Toast
              </button>
            </div>
            {toasts.positioned && (
              <PositionedToast
                variant="success"
                message="Positioned at top-right!"
                position="top-right"
                onClose={() => hideToast('positioned')}
              />
            )}
          </div>

          {/* Icon Toast */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Icon Toast</h2>
            <p className="text-gray-600 mb-6">Toast with icons</p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => showToast('icon', 3000)}
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
              >
                Show Icon Toast
              </button>
            </div>
            {toasts.icon && (
              <IconToast
                variant="warning"
                message="This toast has an icon!"
                onClose={() => hideToast('icon')}
              />
            )}
          </div>

          {/* Action Toast */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Action Toast</h2>
            <p className="text-gray-600 mb-6">Toast with action buttons</p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => showToast('action', 5000)}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Show Action Toast
              </button>
            </div>
            {toasts.action && (
              <ActionToast
                variant="info"
                message="File uploaded successfully!"
                actionLabel="View File"
                onAction={() => {
                  console.log('Action clicked');
                  hideToast('action');
                }}
                onClose={() => hideToast('action')}
              />
            )}
          </div>

          {/* Stacked Toast */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Stacked Toast</h2>
            <p className="text-gray-600 mb-6">Multiple toasts stacked together</p>
            <div className="flex flex-wrap gap-4 mb-4">
              <button
                onClick={showStackedToast}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Add Toast to Stack
              </button>
              <button
                onClick={() => setToasts(prev => ({ ...prev, stacked: [] }))}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Clear All
              </button>
            </div>
            <StackedToast
              toasts={toasts.stacked}
              onRemove={removeStackedToast}
              position="bottom-right"
            />
          </div>

          {/* Animated Toast */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Animated Toast</h2>
            <p className="text-gray-600 mb-6">Toast with smooth animations</p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => showToast('animated', 3000)}
                className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
              >
                Show Animated Toast
              </button>
            </div>
            {toasts.animated && (
              <AnimatedToast
                variant="success"
                message="Animated toast with smooth transitions!"
                animation="slideIn"
                onClose={() => hideToast('animated')}
              />
            )}
          </div>

          {/* Dark Mode Toast */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Dark Mode Toast</h2>
            <p className="text-gray-600 mb-6">Toast with dark theme</p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => showToast('dark', 3000)}
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
              >
                Show Dark Toast
              </button>
            </div>
            {toasts.dark && (
              <DarkModeToast
                variant="info"
                message="Dark theme toast notification!"
                onClose={() => hideToast('dark')}
              />
            )}
          </div>

          {/* Progress Toast */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Progress Toast</h2>
            <p className="text-gray-600 mb-6">Toast with progress indicator</p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => showToast('progress', 5000)}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                Show Progress Toast
              </button>
            </div>
            {toasts.progress && (
              <ProgressToast
                variant="info"
                message="Processing your request..."
                progress={75}
                onClose={() => hideToast('progress')}
              />
            )}
          </div>

          {/* Closable Toast */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Closable Toast</h2>
            <p className="text-gray-600 mb-6">Toast with close button</p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => showToast('closable')}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Show Closable Toast
              </button>
            </div>
            {toasts.closable && (
              <ClosableToast
                variant="error"
                message="This toast can be manually closed!"
                onClose={() => hideToast('closable')}
              />
            )}
          </div>

          {/* Auto Dismiss Toast */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Auto Dismiss Toast</h2>
            <p className="text-gray-600 mb-6">Toast that automatically dismisses</p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => showToast('autoDismiss')}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                Show Auto Dismiss Toast
              </button>
            </div>
            {toasts.autoDismiss && (
              <AutoDismissToast
                variant="success"
                message="This toast will auto-dismiss in 4 seconds!"
                timeout={4000}
                onDismiss={() => hideToast('autoDismiss')}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ToastGallery; 