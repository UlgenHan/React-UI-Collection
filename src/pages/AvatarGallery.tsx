import React from 'react';
import { useNavigation } from '../App';
import {
  BasicAvatar,
  BorderedAvatar,
  RoundedSquareAvatar,
  InitialsAvatar,
  StatusAvatar,
  GroupAvatar,
  ClickableAvatar,
  AvatarWithName,
  IconAvatar,
  AvatarSkeleton
} from '../components/ui/avatars';

const AvatarGallery: React.FC = () => {
  const { navigateTo } = useNavigation();

  const sampleUsers = [
    { name: 'John Doe', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    { name: 'Jane Smith', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face' },
    { name: 'Mike Johnson', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
    { name: 'Sarah Wilson', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  ];

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
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Avatar Components</h1>
              <p className="text-gray-600 mt-1">User avatar components in various styles and sizes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          
          {/* Basic Avatar */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Avatar</h2>
            <p className="text-gray-600 mb-6">Simple circular avatars in different sizes</p>
            <div className="flex items-center space-x-6">
              <div className="flex flex-col items-center space-y-2">
                <BasicAvatar 
                  src={sampleUsers[0].image} 
                  alt={sampleUsers[0].name} 
                  size="sm" 
                />
                <span className="text-sm text-gray-500">Small</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <BasicAvatar 
                  src={sampleUsers[1].image} 
                  alt={sampleUsers[1].name} 
                  size="md" 
                />
                <span className="text-sm text-gray-500">Medium</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <BasicAvatar 
                  src={sampleUsers[2].image} 
                  alt={sampleUsers[2].name} 
                  size="lg" 
                />
                <span className="text-sm text-gray-500">Large</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <BasicAvatar 
                  src={sampleUsers[3].image} 
                  alt={sampleUsers[3].name} 
                  size="xl" 
                />
                <span className="text-sm text-gray-500">Extra Large</span>
              </div>
            </div>
          </div>

          {/* Bordered Avatar */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Bordered Avatar</h2>
            <p className="text-gray-600 mb-6">Avatars with decorative borders</p>
            <div className="flex items-center space-x-6">
              <BorderedAvatar 
                src={sampleUsers[0].image} 
                alt={sampleUsers[0].name} 
                size="md" 
                borderColor="blue" 
              />
              <BorderedAvatar 
                src={sampleUsers[1].image} 
                alt={sampleUsers[1].name} 
                size="md" 
                borderColor="green" 
              />
              <BorderedAvatar 
                src={sampleUsers[2].image} 
                alt={sampleUsers[2].name} 
                size="md" 
                borderColor="purple" 
              />
              <BorderedAvatar 
                src={sampleUsers[3].image} 
                alt={sampleUsers[3].name} 
                size="md" 
                borderColor="red" 
              />
            </div>
          </div>

          {/* Rounded Square Avatar */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Rounded Square Avatar</h2>
            <p className="text-gray-600 mb-6">Square avatars with rounded corners</p>
            <div className="flex items-center space-x-6">
              <RoundedSquareAvatar 
                src={sampleUsers[0].image} 
                alt={sampleUsers[0].name} 
                size="sm" 
              />
              <RoundedSquareAvatar 
                src={sampleUsers[1].image} 
                alt={sampleUsers[1].name} 
                size="md" 
              />
              <RoundedSquareAvatar 
                src={sampleUsers[2].image} 
                alt={sampleUsers[2].name} 
                size="lg" 
              />
            </div>
          </div>

          {/* Initials Avatar */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Initials Avatar</h2>
            <p className="text-gray-600 mb-6">Avatars displaying user initials when no image is available</p>
            <div className="flex items-center space-x-6">
              <InitialsAvatar name="John Doe" size="md" backgroundColor="blue" />
              <InitialsAvatar name="Jane Smith" size="md" backgroundColor="green" />
              <InitialsAvatar name="Mike Johnson" size="md" backgroundColor="purple" />
              <InitialsAvatar name="Sarah Wilson" size="md" backgroundColor="pink" />
            </div>
          </div>

          {/* Status Avatar */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Status Avatar</h2>
            <p className="text-gray-600 mb-6">Avatars with online/offline status indicators</p>
            <div className="flex items-center space-x-6">
              <div className="flex flex-col items-center space-y-2">
                <StatusAvatar 
                  src={sampleUsers[0].image} 
                  alt={sampleUsers[0].name} 
                  size="md" 
                  status="online" 
                />
                <span className="text-sm text-gray-500">Online</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <StatusAvatar 
                  src={sampleUsers[1].image} 
                  alt={sampleUsers[1].name} 
                  size="md" 
                  status="away" 
                />
                <span className="text-sm text-gray-500">Away</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <StatusAvatar 
                  src={sampleUsers[2].image} 
                  alt={sampleUsers[2].name} 
                  size="md" 
                  status="busy" 
                />
                <span className="text-sm text-gray-500">Busy</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <StatusAvatar 
                  src={sampleUsers[3].image} 
                  alt={sampleUsers[3].name} 
                  size="md" 
                  status="offline" 
                />
                <span className="text-sm text-gray-500">Offline</span>
              </div>
            </div>
          </div>

          {/* Group Avatar */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Group Avatar</h2>
            <p className="text-gray-600 mb-6">Stacked avatars for group representation</p>
            <div className="flex items-center space-x-8">
              <div className="flex flex-col items-center space-y-2">
                <GroupAvatar 
                  users={sampleUsers.slice(0, 2)} 
                  size="md" 
                  max={2} 
                />
                <span className="text-sm text-gray-500">2 Users</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <GroupAvatar 
                  users={sampleUsers.slice(0, 3)} 
                  size="md" 
                  max={3} 
                />
                <span className="text-sm text-gray-500">3 Users</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <GroupAvatar 
                  users={sampleUsers} 
                  size="md" 
                  max={3} 
                  showCount={true} 
                />
                <span className="text-sm text-gray-500">4+ Users</span>
              </div>
            </div>
          </div>

          {/* Clickable Avatar */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Clickable Avatar</h2>
            <p className="text-gray-600 mb-6">Interactive avatars with hover and click effects</p>
            <div className="flex items-center space-x-6">
              <ClickableAvatar 
                src={sampleUsers[0].image} 
                alt={sampleUsers[0].name} 
                size="md" 
                onClick={() => console.log('Avatar clicked:', sampleUsers[0].name)}
              />
              <ClickableAvatar 
                src={sampleUsers[1].image} 
                alt={sampleUsers[1].name} 
                size="md" 
                onClick={() => console.log('Avatar clicked:', sampleUsers[1].name)}
              />
              <ClickableAvatar 
                src={sampleUsers[2].image} 
                alt={sampleUsers[2].name} 
                size="md" 
                onClick={() => console.log('Avatar clicked:', sampleUsers[2].name)}
              />
            </div>
          </div>

          {/* Avatar With Name */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Avatar With Name</h2>
            <p className="text-gray-600 mb-6">Avatars with accompanying name labels</p>
            <div className="flex items-center space-x-8">
              <AvatarWithName 
                src={sampleUsers[0].image} 
                alt={sampleUsers[0].name} 
                name={sampleUsers[0].name} 
                size="md" 
                layout="vertical" 
              />
              <AvatarWithName 
                src={sampleUsers[1].image} 
                alt={sampleUsers[1].name} 
                name={sampleUsers[1].name} 
                size="md" 
                layout="horizontal" 
              />
            </div>
          </div>

          {/* Icon Avatar */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Icon Avatar</h2>
            <p className="text-gray-600 mb-6">Avatars with icons instead of images</p>
            <div className="flex items-center space-x-6">
              <IconAvatar icon="user" size="md" backgroundColor="blue" />
              <IconAvatar icon="admin" size="md" backgroundColor="red" />
              <IconAvatar icon="guest" size="md" backgroundColor="gray" />
              <IconAvatar icon="support" size="md" backgroundColor="green" />
            </div>
          </div>

          {/* Avatar Skeleton */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Avatar Skeleton</h2>
            <p className="text-gray-600 mb-6">Loading placeholders for avatars</p>
            <div className="flex items-center space-x-6">
              <AvatarSkeleton size="sm" />
              <AvatarSkeleton size="md" />
              <AvatarSkeleton size="lg" />
              <AvatarSkeleton size="xl" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AvatarGallery; 