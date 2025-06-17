import React, { useState } from 'react';
import { useNavigation } from '../App';
import {
  BasicSpinner,
  DualRingLoader,
  DotBounceLoader,
  PulseCircleLoader,
  BarLoader,
  TextWithSpinner,
  ButtonSpinner,
  RingDashLoader,
  OverlayLoader,
  ColorfulSpinner
} from '../components/ui/loaders';

const LoaderGallery: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [showOverlay, setShowOverlay] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    button1: false,
    button2: false,
    button3: false,
  });

  const handleButtonClick = (buttonKey: keyof typeof loadingStates) => {
    setLoadingStates(prev => ({ ...prev, [buttonKey]: true }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [buttonKey]: false }));
    }, 3000);
  };

  const showOverlayLoader = () => {
    setShowOverlay(true);
    setTimeout(() => {
      setShowOverlay(false);
    }, 3000);
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
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Loader Components</h1>
              <p className="text-gray-600 mt-1">Various loading spinners and indicators</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          
          {/* Basic Spinner */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Spinner</h2>
            <p className="text-gray-600 mb-6">Simple spinning loader in different sizes</p>
            <div className="flex items-center justify-center space-x-8">
              <div className="flex flex-col items-center space-y-2">
                <BasicSpinner size="sm" />
                <span className="text-sm text-gray-500">Small</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <BasicSpinner size="md" />
                <span className="text-sm text-gray-500">Medium</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <BasicSpinner size="lg" />
                <span className="text-sm text-gray-500">Large</span>
              </div>
            </div>
          </div>

          {/* Dual Ring Loader */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Dual Ring Loader</h2>
            <p className="text-gray-600 mb-6">Double ring spinning loader</p>
            <div className="flex items-center justify-center space-x-8">
              <div className="flex flex-col items-center space-y-2">
                <DualRingLoader size="sm" color="blue" />
                <span className="text-sm text-gray-500">Small Blue</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <DualRingLoader size="md" color="green" />
                <span className="text-sm text-gray-500">Medium Green</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <DualRingLoader size="lg" color="purple" />
                <span className="text-sm text-gray-500">Large Purple</span>
              </div>
            </div>
          </div>

          {/* Dot Bounce Loader */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Dot Bounce Loader</h2>
            <p className="text-gray-600 mb-6">Bouncing dots loader animation</p>
            <div className="flex items-center justify-center space-x-8">
              <div className="flex flex-col items-center space-y-2">
                <DotBounceLoader size="sm" />
                <span className="text-sm text-gray-500">Small</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <DotBounceLoader size="md" />
                <span className="text-sm text-gray-500">Medium</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <DotBounceLoader size="lg" />
                <span className="text-sm text-gray-500">Large</span>
              </div>
            </div>
          </div>

          {/* Pulse Circle Loader */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Pulse Circle Loader</h2>
            <p className="text-gray-600 mb-6">Pulsing circle loader</p>
            <div className="flex items-center justify-center space-x-8">
              <div className="flex flex-col items-center space-y-2">
                <PulseCircleLoader size="sm" color="red" />
                <span className="text-sm text-gray-500">Small Red</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <PulseCircleLoader size="md" color="blue" />
                <span className="text-sm text-gray-500">Medium Blue</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <PulseCircleLoader size="lg" color="green" />
                <span className="text-sm text-gray-500">Large Green</span>
              </div>
            </div>
          </div>

          {/* Bar Loader */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Bar Loader</h2>
            <p className="text-gray-600 mb-6">Animated bar loader</p>
            <div className="flex flex-col items-center space-y-6">
              <div className="w-full max-w-xs">
                <div className="flex flex-col items-center space-y-2">
                  <BarLoader width="100%" height="sm" />
                  <span className="text-sm text-gray-500">Small Height</span>
                </div>
              </div>
              <div className="w-full max-w-xs">
                <div className="flex flex-col items-center space-y-2">
                  <BarLoader width="100%" height="md" />
                  <span className="text-sm text-gray-500">Medium Height</span>
                </div>
              </div>
              <div className="w-full max-w-xs">
                <div className="flex flex-col items-center space-y-2">
                  <BarLoader width="100%" height="lg" />
                  <span className="text-sm text-gray-500">Large Height</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text With Spinner */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Text With Spinner</h2>
            <p className="text-gray-600 mb-6">Loading text with spinner</p>
            <div className="flex flex-col items-center space-y-4">
              <TextWithSpinner text="Loading..." size="sm" />
              <TextWithSpinner text="Processing your request..." size="md" />
              <TextWithSpinner text="Please wait while we fetch your data..." size="lg" />
            </div>
          </div>

          {/* Button Spinner */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Button Spinner</h2>
            <p className="text-gray-600 mb-6">Loading buttons with integrated spinners</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <ButtonSpinner
                loading={loadingStates.button1}
                onClick={() => handleButtonClick('button1')}
                variant="primary"
                size="sm"
              >
                {loadingStates.button1 ? 'Loading...' : 'Small Button'}
              </ButtonSpinner>
              <ButtonSpinner
                loading={loadingStates.button2}
                onClick={() => handleButtonClick('button2')}
                variant="secondary"
                size="md"
              >
                {loadingStates.button2 ? 'Processing...' : 'Medium Button'}
              </ButtonSpinner>
              <ButtonSpinner
                loading={loadingStates.button3}
                onClick={() => handleButtonClick('button3')}
                variant="outline"
                size="lg"
              >
                {loadingStates.button3 ? 'Submitting...' : 'Large Button'}
              </ButtonSpinner>
            </div>
          </div>

          {/* Ring Dash Loader */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Ring Dash Loader</h2>
            <p className="text-gray-600 mb-6">Dashed ring loader with rotation</p>
            <div className="flex items-center justify-center space-x-8">
              <div className="flex flex-col items-center space-y-2">
                <RingDashLoader size="sm" />
                <span className="text-sm text-gray-500">Small</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <RingDashLoader size="md" />
                <span className="text-sm text-gray-500">Medium</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <RingDashLoader size="lg" />
                <span className="text-sm text-gray-500">Large</span>
              </div>
            </div>
          </div>

          {/* Overlay Loader */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Overlay Loader</h2>
            <p className="text-gray-600 mb-6">Full screen overlay loader</p>
            <div className="text-center">
              <button
                onClick={showOverlayLoader}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Show Overlay Loader (3s)
              </button>
              <p className="text-sm text-gray-500 mt-2">
                Click to see full screen overlay loader
              </p>
            </div>
            {showOverlay && (
              <OverlayLoader
                message="Loading, please wait..."
                backdrop="dark"
              />
            )}
          </div>

          {/* Colorful Spinner */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Colorful Spinner</h2>
            <p className="text-gray-600 mb-6">Multi-colored animated spinner</p>
            <div className="flex items-center justify-center space-x-8">
              <div className="flex flex-col items-center space-y-2">
                <ColorfulSpinner size="sm" theme="rainbow" />
                <span className="text-sm text-gray-500">Small Rainbow</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <ColorfulSpinner size="md" theme="gradient" />
                <span className="text-sm text-gray-500">Medium Gradient</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <ColorfulSpinner size="lg" theme="neon" />
                <span className="text-sm text-gray-500">Large Neon</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoaderGallery; 