import React, { useState } from 'react';
import { useNavigation } from '../App';
import {
  BasicBadge,
  CountBadge,
  StatusBadge,
  OutlineBadge,
  RoundedBadge,
  IconBadge,
  DismissibleBadge,
  PositionedBadge,
  GradientBadge,
  DotBadge
} from '../components/ui/badges';

const BadgeGallery: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [badges, setBadges] = useState({
    dismissible1: true,
    dismissible2: true,
    dismissible3: true,
  });

  const handleDismiss = (key: string) => {
    setBadges(prev => ({ ...prev, [key]: false }));
  };

  const resetBadges = () => {
    setBadges({
      dismissible1: true,
      dismissible2: true,
      dismissible3: true,
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
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Badge Components</h1>
              <p className="text-gray-600 mt-1">Various badge and label components for status and information</p>
            </div>
            <button
              onClick={resetBadges}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Reset Badges
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          
          {/* Basic Badge */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Badge</h2>
            <p className="text-gray-600 mb-6">Simple badges in different colors and sizes</p>
            <div className="flex flex-wrap items-center gap-4">
              <BasicBadge variant="primary" size="sm">Primary</BasicBadge>
              <BasicBadge variant="secondary" size="sm">Secondary</BasicBadge>
              <BasicBadge variant="success" size="md">Success</BasicBadge>
              <BasicBadge variant="warning" size="md">Warning</BasicBadge>
              <BasicBadge variant="error" size="lg">Error</BasicBadge>
              <BasicBadge variant="info" size="lg">Info</BasicBadge>
            </div>
          </div>

          {/* Count Badge */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Count Badge</h2>
            <p className="text-gray-600 mb-6">Badges for displaying numbers and counts</p>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Notifications</span>
                <CountBadge count={5} variant="primary" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Messages</span>
                <CountBadge count={12} variant="success" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Alerts</span>
                <CountBadge count={3} variant="error" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Updates</span>
                <CountBadge count={99} variant="warning" max={99} />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Items</span>
                <CountBadge count={150} variant="info" max={99} />
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Status Badge</h2>
            <p className="text-gray-600 mb-6">Badges for indicating status states</p>
            <div className="flex flex-wrap items-center gap-4">
              <StatusBadge status="online">Online</StatusBadge>
              <StatusBadge status="offline">Offline</StatusBadge>
              <StatusBadge status="away">Away</StatusBadge>
              <StatusBadge status="busy">Busy</StatusBadge>
              <StatusBadge status="pending">Pending</StatusBadge>
              <StatusBadge status="approved">Approved</StatusBadge>
              <StatusBadge status="rejected">Rejected</StatusBadge>
            </div>
          </div>

          {/* Outline Badge */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Outline Badge</h2>
            <p className="text-gray-600 mb-6">Badges with outline style</p>
            <div className="flex flex-wrap items-center gap-4">
              <OutlineBadge variant="primary">Primary</OutlineBadge>
              <OutlineBadge variant="secondary">Secondary</OutlineBadge>
              <OutlineBadge variant="success">Success</OutlineBadge>
              <OutlineBadge variant="warning">Warning</OutlineBadge>
              <OutlineBadge variant="error">Error</OutlineBadge>
              <OutlineBadge variant="info">Info</OutlineBadge>
            </div>
          </div>

          {/* Rounded Badge */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Rounded Badge</h2>
            <p className="text-gray-600 mb-6">Badges with different border radius options</p>
            <div className="flex flex-wrap items-center gap-4">
              <RoundedBadge variant="primary" roundness="none">No Radius</RoundedBadge>
              <RoundedBadge variant="secondary" roundness="sm">Small</RoundedBadge>
              <RoundedBadge variant="success" roundness="md">Medium</RoundedBadge>
              <RoundedBadge variant="warning" roundness="lg">Large</RoundedBadge>
              <RoundedBadge variant="error" roundness="full">Pill</RoundedBadge>
            </div>
          </div>

          {/* Icon Badge */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Icon Badge</h2>
            <p className="text-gray-600 mb-6">Badges with icons</p>
            <div className="flex flex-wrap items-center gap-4">
              <IconBadge variant="primary" icon="star">Featured</IconBadge>
              <IconBadge variant="success" icon="check">Verified</IconBadge>
              <IconBadge variant="warning" icon="warning">Warning</IconBadge>
              <IconBadge variant="error" icon="x">Error</IconBadge>
              <IconBadge variant="info" icon="info">Info</IconBadge>
              <IconBadge variant="secondary" icon="heart">Favorite</IconBadge>
            </div>
          </div>

          {/* Dismissible Badge */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Dismissible Badge</h2>
            <p className="text-gray-600 mb-6">Badges that can be dismissed by users</p>
            <div className="flex flex-wrap items-center gap-4">
              {badges.dismissible1 && (
                <DismissibleBadge 
                  variant="primary" 
                  onDismiss={() => handleDismiss('dismissible1')}
                >
                  Dismissible
                </DismissibleBadge>
              )}
              {badges.dismissible2 && (
                <DismissibleBadge 
                  variant="success" 
                  onDismiss={() => handleDismiss('dismissible2')}
                >
                  Can Close
                </DismissibleBadge>
              )}
              {badges.dismissible3 && (
                <DismissibleBadge 
                  variant="warning" 
                  onDismiss={() => handleDismiss('dismissible3')}
                >
                  Removable
                </DismissibleBadge>
              )}
              {!badges.dismissible1 && !badges.dismissible2 && !badges.dismissible3 && (
                <p className="text-gray-500 italic">All badges dismissed. Click "Reset Badges" to show again.</p>
              )}
            </div>
          </div>

          {/* Positioned Badge */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Positioned Badge</h2>
            <p className="text-gray-600 mb-6">Badges positioned relative to other elements</p>
            <div className="flex items-center space-x-8">
              <div className="relative">
                <button className="px-4 py-2 bg-gray-200 rounded-md">
                  Inbox
                </button>
                <PositionedBadge 
                  count={5} 
                  variant="error" 
                  position="top-right" 
                />
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <PositionedBadge 
                  count={3} 
                  variant="success" 
                  position="bottom-right" 
                />
              </div>
              <div className="relative">
                <span className="text-gray-700">Profile</span>
                <PositionedBadge 
                  count={1} 
                  variant="warning" 
                  position="top-left" 
                />
              </div>
            </div>
          </div>

          {/* Gradient Badge */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Gradient Badge</h2>
            <p className="text-gray-600 mb-6">Badges with gradient backgrounds</p>
            <div className="flex flex-wrap items-center gap-4">
              <GradientBadge gradient="blue">Blue Gradient</GradientBadge>
              <GradientBadge gradient="purple">Purple Gradient</GradientBadge>
              <GradientBadge gradient="green">Green Gradient</GradientBadge>
              <GradientBadge gradient="orange">Orange Gradient</GradientBadge>
              <GradientBadge gradient="pink">Pink Gradient</GradientBadge>
              <GradientBadge gradient="rainbow">Rainbow</GradientBadge>
            </div>
          </div>

          {/* Dot Badge */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Dot Badge</h2>
            <p className="text-gray-600 mb-6">Small dot indicators for minimal status display</p>
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <DotBadge variant="success" />
                <span className="text-gray-700">Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <DotBadge variant="warning" />
                <span className="text-gray-700">Away</span>
              </div>
              <div className="flex items-center space-x-2">
                <DotBadge variant="error" />
                <span className="text-gray-700">Busy</span>
              </div>
              <div className="flex items-center space-x-2">
                <DotBadge variant="secondary" />
                <span className="text-gray-700">Offline</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BadgeGallery; 