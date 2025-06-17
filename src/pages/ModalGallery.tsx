import React from 'react';
import { useNavigation } from '../App';

const ModalGallery: React.FC = () => {
  const { navigateTo } = useNavigation();

  const modals = [
    {
      name: 'Basic Modal',
      description: 'Centered modal with title, content, close button, and background overlay',
      features: ['Multiple sizes', 'Overlay controls', 'Keyboard navigation', 'Customizable styling']
    },
    {
      name: 'Fullscreen Modal',
      description: 'Modal that covers entire viewport for immersive experiences or complex forms',
      features: ['Full viewport coverage', 'Header options', 'Background themes', 'Immersive experience']
    },
    {
      name: 'Bottom Sheet Modal',
      description: 'Modal that slides up from bottom like mobile drawer, great for mobile interfaces',
      features: ['Mobile-friendly', 'Drag handle', 'Height options', 'Smooth animations']
    },
    {
      name: 'Image Preview Modal',
      description: 'Modal for displaying large images with close button and optional zoom controls',
      features: ['Zoom functionality', 'Image captions', 'Drag to pan', 'Keyboard shortcuts']
    },
    {
      name: 'Form Modal',
      description: 'Modal containing comprehensive form with inputs, validation, and submit button',
      features: ['Form validation', 'Multiple field types', 'Error handling', 'Submission states']
    },
    {
      name: 'Confirmation Modal',
      description: 'Modal asking user to confirm an action with Cancel and Confirm buttons',
      features: ['Multiple variants', 'Icon support', 'Loading states', 'Custom styling']
    },
    {
      name: 'Animated Modal',
      description: 'Modal with entrance/exit animations using Tailwind CSS transitions',
      features: ['Multiple animations', 'Duration controls', 'Smooth transitions', 'Custom effects']
    },
    {
      name: 'Multi-Step Modal',
      description: 'Modal guiding users through sequence of steps with progress indicators',
      features: ['Progress tracking', 'Step navigation', 'Validation per step', 'Skip options']
    },
    {
      name: 'Side Panel Modal',
      description: 'Modal that slides in from left or right, often used for settings',
      features: ['Left/right positioning', 'Width controls', 'Overlay options', 'Mobile responsive']
    },
    {
      name: 'Alert Modal',
      description: 'Modal displaying alert or error message with simple dismiss button',
      features: ['Auto-close option', 'Type variants', 'Progress indicator', 'Keyboard support']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigateTo('home')}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              ← Back to Gallery
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Modal Components</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Modal Components</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive modal dialogs for user interaction - from simple alerts to complex workflows
          </p>
          <div className="mt-6 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {modals.length} Components Available
          </div>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modals.map((modal, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{modal.name}</h3>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  Available
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {modal.description}
              </p>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900">Key Features:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {modal.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{modals.length}</div>
            <div className="text-gray-600">Modal Components</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">Accessibility Ready</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
            <div className="text-gray-600">Interaction Patterns</div>
          </div>
        </div>

        {/* Integration Example */}
        <div className="mt-16 bg-gray-900 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Easy Integration</h2>
          <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`import { BasicModal, ConfirmationModal } from '../components/ui/modals';

// Use in your React component
<BasicModal
  isOpen={isOpen}
  onClose={handleClose}
  title="Modal Title"
  size="md"
>
  Modal content here
</BasicModal>

<ConfirmationModal
  isOpen={confirmOpen}
  onClose={handleCancel}
  onConfirm={handleConfirm}
  title="Delete Item"
  message="Are you sure you want to delete this item?"
  variant="danger"
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalGallery; 