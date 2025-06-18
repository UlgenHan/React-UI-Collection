import React, { useState } from 'react';
import { useNavigation } from '../App';
import {
  SimpleComment,
  CommentWithAvatar,
  ThreadedComment,
  CommentWithActions,
  DarkModeComment,
  CardStyleComment,
  CommentWithMentions,
  CommentWithEmojis,
  InlineCommentForm,
  InteractiveComment
} from '../components';

const CommentGallery: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null);

  // Sample data for demos
  const sampleAvatars = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  ];

  const sampleReplies = [
    {
      id: '1',
      username: 'Alice Johnson',
      comment: 'Great point! I totally agree with your perspective.',
      timestamp: '5m ago',
      avatarUrl: sampleAvatars[1]
    },
    {
      id: '2', 
      username: 'Bob Wilson',
      comment: 'Thanks for sharing this insight. Very helpful!',
      timestamp: '3m ago',
      avatarUrl: sampleAvatars[2]
    }
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
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Comment Components</h1>
              <p className="text-gray-600 mt-1">Interactive comment system components for user discussions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          
          {/* Simple Comment */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Simple Comment</h2>
            <p className="text-gray-600 mb-6">Minimal comment component with username and text</p>
            <div className="border rounded-lg overflow-hidden">
              <SimpleComment
                username="John Doe"
                comment="This is a simple comment example. Clean and minimal design perfect for basic comment sections."
                timestamp="2 hours ago"
              />
            </div>
          </div>

          {/* Comment with Avatar */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Comment with Avatar</h2>
            <p className="text-gray-600 mb-6">Comment with profile picture support</p>
            <div className="border rounded-lg overflow-hidden">
              <CommentWithAvatar
                username="Sarah Smith"
                comment="This comment includes a profile picture. Great for personalized discussions and user identification."
                timestamp="1 hour ago"
                avatarUrl={sampleAvatars[0]}
              />
            </div>
          </div>

          {/* Comment with Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Comment with Actions</h2>
            <p className="text-gray-600 mb-6">Interactive comment with like, reply, and share buttons</p>
            <div className="border rounded-lg overflow-hidden">
              <CommentWithActions
                username="Emma Davis"
                comment="This comment has interactive action buttons. Users can like, reply, and share the comment."
                timestamp="45 minutes ago"
                avatarUrl={sampleAvatars[2]}
                likes={24}
                onLike={() => console.log('Liked!')}
                onReply={() => setShowReplyForm('actions')}
              />
              {showReplyForm === 'actions' && (
                <InlineCommentForm
                  onSubmit={(comment) => {
                    console.log('Reply:', comment);
                    setShowReplyForm(null);
                  }}
                  onCancel={() => setShowReplyForm(null)}
                  autoFocus
                />
              )}
            </div>
          </div>

          {/* Interactive Comment */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Interactive Comment</h2>
            <p className="text-gray-600 mb-6">Advanced hover effects, animations, and interactive features</p>
            <div className="border rounded-lg overflow-hidden">
              <InteractiveComment
                username="Ryan Miller"
                comment="This is the most advanced comment component with hover effects, animated like bursts, author badges, and interactive menus. Try hovering and clicking!"
                timestamp="10 minutes ago"
                avatarUrl={sampleAvatars[3]}
                likes={67}
                isAuthor={true}
                onLike={() => console.log('Interactive liked!')}
                onReply={() => console.log('Interactive reply!')}
                onShare={() => console.log('Interactive shared!')}
              />
            </div>
          </div>

          {/* Card Style Comment */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Card Style Comment</h2>
            <p className="text-gray-600 mb-6">Elevated card layout with shadows and hover effects</p>
            <div>
              <CardStyleComment
                username="Lisa Wang"
                comment="This is a card-style comment with elevated design, shadows, and smooth hover effects. Perfect for modern UI designs."
                timestamp="1 hour ago"
                avatarUrl={sampleAvatars[0]}
                likes={32}
                onLike={() => console.log('Card liked!')}
                onReply={() => console.log('Card reply!')}
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Comment System Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">💬 Rich Interactions</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Like and reaction system</li>
                <li>• Threaded replies</li>
                <li>• @mention support</li>
                <li>• Emoji reactions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🎨 Design Variants</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Card-style layout</li>
                <li>• Dark mode support</li>
                <li>• Avatar integration</li>
                <li>• Hover animations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">⚡ Performance</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• TypeScript support</li>
                <li>• Accessible components</li>
                <li>• Responsive design</li>
                <li>• Keyboard shortcuts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentGallery; 