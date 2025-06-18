import React, { useState } from 'react';

interface CardStyleCommentProps {
  username: string;
  comment: string;
  timestamp?: string;
  avatarUrl?: string;
  likes?: number;
  onLike?: () => void;
  onReply?: () => void;
  isLiked?: boolean;
  className?: string;
}

export const CardStyleComment: React.FC<CardStyleCommentProps> = ({
  username,
  comment,
  timestamp,
  avatarUrl,
  likes = 0,
  onLike,
  onReply,
  isLiked = false,
  className = ''
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
    onLike?.();
  };

  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-100 p-5 mb-4 hover:shadow-lg transition-shadow duration-200 ${className}`}>
      <div className="flex space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${username}'s avatar`}
              className="w-12 h-12 rounded-full object-cover shadow-sm"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white font-semibold text-lg">
                {username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        
        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900">{username}</span>
              {timestamp && (
                <span className="text-sm text-gray-500">• {timestamp}</span>
              )}
            </div>
          </div>
          
          {/* Comment Text */}
          <p className="text-gray-700 leading-relaxed mb-4">{comment}</p>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                  liked 
                    ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-red-500'
                }`}
                aria-label={liked ? 'Unlike comment' : 'Like comment'}
              >
                <svg 
                  className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} 
                  fill={liked ? 'currentColor' : 'none'} 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
                <span className="font-medium">{likeCount}</span>
              </button>
              
              <button
                onClick={onReply}
                className="flex items-center space-x-2 px-3 py-1 rounded-full text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                aria-label="Reply to comment"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" 
                  />
                </svg>
                <span className="font-medium">Reply</span>
              </button>
            </div>
            
            {/* More Options */}
            <button
              className="p-1 rounded-full text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all duration-200"
              aria-label="More options"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 