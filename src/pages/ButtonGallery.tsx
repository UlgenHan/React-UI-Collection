import React, { useState } from 'react';
import { useNavigation } from '../App';
import {
  PrimaryButton,
  SecondaryButton,
  OutlineButton,
  GhostButton,
  DangerButton,
  DisabledButton,
  LoadingButton,
  IconButton,
  RoundedButton,
  GradientButton
} from '../components/ui/buttons';

const ButtonGallery: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const handleLoadingClick = (key: string) => {
    setLoadingStates(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [key]: false }));
    }, 2000);
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
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Button Components</h1>
              <p className="text-gray-600 mt-1">Various button styles and interactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          
          {/* Primary Button */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Primary Button</h2>
            <p className="text-gray-600 mb-6">Main action buttons in different sizes</p>
            <div className="flex flex-wrap items-center gap-4">
              <PrimaryButton size="sm" onClick={() => console.log('Small primary clicked')}>
                Small
              </PrimaryButton>
              <PrimaryButton size="md" onClick={() => console.log('Medium primary clicked')}>
                Medium
              </PrimaryButton>
              <PrimaryButton size="lg" onClick={() => console.log('Large primary clicked')}>
                Large
              </PrimaryButton>
            </div>
          </div>

          {/* Secondary Button */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Secondary Button</h2>
            <p className="text-gray-600 mb-6">Secondary action buttons</p>
            <div className="flex flex-wrap items-center gap-4">
              <SecondaryButton size="sm" onClick={() => console.log('Small secondary clicked')}>
                Small
              </SecondaryButton>
              <SecondaryButton size="md" onClick={() => console.log('Medium secondary clicked')}>
                Medium
              </SecondaryButton>
              <SecondaryButton size="lg" onClick={() => console.log('Large secondary clicked')}>
                Large
              </SecondaryButton>
            </div>
          </div>

          {/* Outline Button */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Outline Button</h2>
            <p className="text-gray-600 mb-6">Outlined buttons with transparent background</p>
            <div className="flex flex-wrap items-center gap-4">
              <OutlineButton size="sm" onClick={() => console.log('Small outline clicked')}>
                Small
              </OutlineButton>
              <OutlineButton size="md" onClick={() => console.log('Medium outline clicked')}>
                Medium
              </OutlineButton>
              <OutlineButton size="lg" onClick={() => console.log('Large outline clicked')}>
                Large
              </OutlineButton>
            </div>
          </div>

          {/* Ghost Button */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Ghost Button</h2>
            <p className="text-gray-600 mb-6">Minimal buttons with hover effects</p>
            <div className="flex flex-wrap items-center gap-4">
              <GhostButton size="sm" onClick={() => console.log('Small ghost clicked')}>
                Small
              </GhostButton>
              <GhostButton size="md" onClick={() => console.log('Medium ghost clicked')}>
                Medium
              </GhostButton>
              <GhostButton size="lg" onClick={() => console.log('Large ghost clicked')}>
                Large
              </GhostButton>
            </div>
          </div>

          {/* Danger Button */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Danger Button</h2>
            <p className="text-gray-600 mb-6">Warning buttons for destructive actions</p>
            <div className="flex flex-wrap items-center gap-4">
              <DangerButton size="sm" onClick={() => console.log('Small danger clicked')}>
                Delete
              </DangerButton>
              <DangerButton size="md" onClick={() => console.log('Medium danger clicked')}>
                Remove
              </DangerButton>
              <DangerButton size="lg" onClick={() => console.log('Large danger clicked')}>
                Destroy
              </DangerButton>
            </div>
          </div>

          {/* Disabled Button */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Disabled Button</h2>
            <p className="text-gray-600 mb-6">Buttons in disabled state</p>
            <div className="flex flex-wrap items-center gap-4">
              <DisabledButton size="sm">Small Disabled</DisabledButton>
              <DisabledButton size="md">Medium Disabled</DisabledButton>
              <DisabledButton size="lg">Large Disabled</DisabledButton>
            </div>
          </div>

          {/* Loading Button */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Loading Button</h2>
            <p className="text-gray-600 mb-6">Buttons with loading states</p>
            <div className="flex flex-wrap items-center gap-4">
              <LoadingButton
                size="sm"
                loading={loadingStates.small}
                onClick={() => handleLoadingClick('small')}
              >
                {loadingStates.small ? 'Loading...' : 'Small Load'}
              </LoadingButton>
              <LoadingButton
                size="md"
                loading={loadingStates.medium}
                onClick={() => handleLoadingClick('medium')}
              >
                {loadingStates.medium ? 'Processing...' : 'Medium Load'}
              </LoadingButton>
              <LoadingButton
                size="lg"
                loading={loadingStates.large}
                onClick={() => handleLoadingClick('large')}
              >
                {loadingStates.large ? 'Submitting...' : 'Large Load'}
              </LoadingButton>
            </div>
          </div>

          {/* Icon Button */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Icon Button</h2>
            <p className="text-gray-600 mb-6">Buttons with icons</p>
            <div className="flex flex-wrap items-center gap-4">
              <IconButton
                size="sm"
                icon="plus"
                onClick={() => console.log('Add clicked')}
              >
                Add Item
              </IconButton>
              <IconButton
                size="md"
                icon="download"
                onClick={() => console.log('Download clicked')}
              >
                Download
              </IconButton>
              <IconButton
                size="lg"
                icon="search"
                onClick={() => console.log('Search clicked')}
              >
                Search
              </IconButton>
            </div>
          </div>

          {/* Rounded Button */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Rounded Button</h2>
            <p className="text-gray-600 mb-6">Buttons with rounded corners</p>
            <div className="flex flex-wrap items-center gap-4">
              <RoundedButton
                size="sm"
                roundness="sm"
                onClick={() => console.log('Small rounded clicked')}
              >
                Small Round
              </RoundedButton>
              <RoundedButton
                size="md"
                roundness="md"
                onClick={() => console.log('Medium rounded clicked')}
              >
                Medium Round
              </RoundedButton>
              <RoundedButton
                size="lg"
                roundness="full"
                onClick={() => console.log('Large rounded clicked')}
              >
                Pill Button
              </RoundedButton>
            </div>
          </div>

          {/* Gradient Button */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Gradient Button</h2>
            <p className="text-gray-600 mb-6">Buttons with gradient backgrounds</p>
            <div className="flex flex-wrap items-center gap-4">
              <GradientButton
                size="sm"
                gradient="blue"
                onClick={() => console.log('Blue gradient clicked')}
              >
                Blue Gradient
              </GradientButton>
              <GradientButton
                size="md"
                gradient="purple"
                onClick={() => console.log('Purple gradient clicked')}
              >
                Purple Gradient
              </GradientButton>
              <GradientButton
                size="lg"
                gradient="rainbow"
                onClick={() => console.log('Rainbow gradient clicked')}
              >
                Rainbow Gradient
              </GradientButton>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ButtonGallery; 