import React from 'react';

interface CommentWithAvatarProps {
  username: string;
  comment: string;
  timestamp?: string;
  avatarUrl?: string;
  className?: string;
}

export const CommentWithAvatar: React.FC<CommentWithAvatarProps> = ({
  username,
  comment,
  timestamp,
  avatarUrl,
  className = ''
}) => {
  return (
    <div className={`bg-white p-4 border-b border-gray-200 ${className}`}>
      <div className="flex space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${username}'s avatar`}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium text-sm">
                {username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        
        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-semibold text-gray-900">{username}</span>
            {timestamp && (
              <span className="text-sm text-gray-500">{timestamp}</span>
            )}
          </div>
          <p className="text-gray-700 leading-relaxed">{comment}</p>
        </div>
      </div>
    </div>
  );
}; 