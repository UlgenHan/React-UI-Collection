import React, { useState } from 'react';
import { useNavigation } from '../App';
import {
  BasicAlert,
  ClosableAlert,
  IconAlert,
  OutlinedAlert,
  DismissableAlert,
  AnimatedAlert,
  DarkAlert,
  StackedAlerts,
  InlineAlert,
  AlertWithCTA
} from '../components/ui/alerts';

const AlertGallery: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [alerts, setAlerts] = useState({
    closable: true,
    dismissable: true,
    animated: true,
    stacked: [
      { id: 1, type: 'success', message: 'Operation completed successfully!' },
      { id: 2, type: 'warning', message: 'Please review your settings.' },
      { id: 3, type: 'error', message: 'An error occurred while processing.' }
    ]
  });

  const handleCloseAlert = (key: string) => {
    setAlerts(prev => ({ ...prev, [key]: false }));
  };

  const handleDismissAlert = (key: string) => {
    setAlerts(prev => ({ ...prev, [key]: false }));
  };

  const handleRemoveStackedAlert = (id: number) => {
    setAlerts(prev => ({
      ...prev,
      stacked: prev.stacked.filter(alert => alert.id !== id)
    }));
  };

  const resetAlerts = () => {
    setAlerts({
      closable: true,
      dismissable: true,
      animated: true,
      stacked: [
        { id: 1, type: 'success', message: 'Operation completed successfully!' },
        { id: 2, type: 'warning', message: 'Please review your settings.' },
        { id: 3, type: 'error', message: 'An error occurred while processing.' }
      ]
    });
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
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Alert Components</h1>
              <p className="text-gray-600 mt-1">Various alert and notification components</p>
            </div>
            <button
              onClick={resetAlerts}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Reset All Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          
          {/* Basic Alert */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Alert</h2>
            <p className="text-gray-600 mb-6">Simple alert messages in different variants</p>
            <div className="space-y-4">
              <BasicAlert variant="success" message="This is a success alert message!" />
              <BasicAlert variant="info" message="This is an info alert message!" />
              <BasicAlert variant="warning" message="This is a warning alert message!" />
              <BasicAlert variant="error" message="This is an error alert message!" />
            </div>
          </div>

          {/* Closable Alert */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Closable Alert</h2>
            <p className="text-gray-600 mb-6">Alert with close button</p>
            <div className="space-y-4">
              {alerts.closable && (
                <ClosableAlert
                  variant="info"
                  message="This alert can be closed by clicking the X button."
                  onClose={() => handleCloseAlert('closable')}
                />
              )}
              {!alerts.closable && (
                <p className="text-gray-500 italic">Alert was closed. Click "Reset All Alerts" to show again.</p>
              )}
            </div>
          </div>

          {/* Icon Alert */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Icon Alert</h2>
            <p className="text-gray-600 mb-6">Alert messages with icons</p>
            <div className="space-y-4">
              <IconAlert variant="success" message="Successfully completed the operation!" />
              <IconAlert variant="info" message="Here's some helpful information for you." />
              <IconAlert variant="warning" message="Please be careful with this action." />
              <IconAlert variant="error" message="Something went wrong. Please try again." />
            </div>
          </div>

          {/* Outlined Alert */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Outlined Alert</h2>
            <p className="text-gray-600 mb-6">Alert with outline style</p>
            <div className="space-y-4">
              <OutlinedAlert variant="success" message="This is an outlined success alert!" />
              <OutlinedAlert variant="info" message="This is an outlined info alert!" />
              <OutlinedAlert variant="warning" message="This is an outlined warning alert!" />
              <OutlinedAlert variant="error" message="This is an outlined error alert!" />
            </div>
          </div>

          {/* Dismissable Alert */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Dismissable Alert</h2>
            <p className="text-gray-600 mb-6">Alert that auto-dismisses after a timeout</p>
            <div className="space-y-4">
              {alerts.dismissable && (
                <DismissableAlert
                  variant="warning"
                  message="This alert will automatically dismiss in 5 seconds."
                  timeout={5000}
                  onDismiss={() => handleDismissAlert('dismissable')}
                />
              )}
              {!alerts.dismissable && (
                <p className="text-gray-500 italic">Alert was dismissed. Click "Reset All Alerts" to show again.</p>
              )}
            </div>
          </div>

          {/* Animated Alert */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Animated Alert</h2>
            <p className="text-gray-600 mb-6">Alert with entrance and exit animations</p>
            <div className="space-y-4">
              {alerts.animated && (
                <AnimatedAlert
                  variant="success"
                  message="This alert has smooth animations!"
                  animation="slideIn"
                  onClose={() => handleCloseAlert('animated')}
                />
              )}
              {!alerts.animated && (
                <p className="text-gray-500 italic">Alert was closed. Click "Reset All Alerts" to show again.</p>
              )}
            </div>
          </div>

          {/* Dark Alert */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Dark Alert</h2>
            <p className="text-gray-600 mb-6">Alert with dark theme styling</p>
            <div className="space-y-4">
              <DarkAlert variant="success" message="Dark theme success alert!" />
              <DarkAlert variant="info" message="Dark theme info alert!" />
              <DarkAlert variant="warning" message="Dark theme warning alert!" />
              <DarkAlert variant="error" message="Dark theme error alert!" />
            </div>
          </div>

          {/* Stacked Alerts */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Stacked Alerts</h2>
            <p className="text-gray-600 mb-6">Multiple alerts stacked together</p>
            <div className="space-y-4">
              <StackedAlerts
                alerts={alerts.stacked}
                onRemove={handleRemoveStackedAlert}
              />
              {alerts.stacked.length === 0 && (
                <p className="text-gray-500 italic">All alerts removed. Click "Reset All Alerts" to show again.</p>
              )}
            </div>
          </div>

          {/* Inline Alert */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Inline Alert</h2>
            <p className="text-gray-600 mb-6">Compact alert for inline usage</p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Username:</span>
                <input
                  type="text"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter username"
                />
                <InlineAlert variant="error" message="Username is required" />
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Email:</span>
                <input
                  type="email"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter email"
                />
                <InlineAlert variant="success" message="Valid email" />
              </div>
            </div>
          </div>

          {/* Alert With CTA */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Alert With CTA</h2>
            <p className="text-gray-600 mb-6">Alert with call-to-action buttons</p>
            <div className="space-y-4">
              <AlertWithCTA
                variant="info"
                title="Update Available"
                message="A new version of the application is available. Would you like to update now?"
                primaryAction={{
                  label: "Update Now",
                  onClick: () => console.log("Update clicked")
                }}
                secondaryAction={{
                  label: "Later",
                  onClick: () => console.log("Later clicked")
                }}
              />
              <AlertWithCTA
                variant="warning"
                title="Unsaved Changes"
                message="You have unsaved changes. Do you want to save them before leaving?"
                primaryAction={{
                  label: "Save Changes",
                  onClick: () => console.log("Save clicked")
                }}
                secondaryAction={{
                  label: "Discard",
                  onClick: () => console.log("Discard clicked")
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AlertGallery; 