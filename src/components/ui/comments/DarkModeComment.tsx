import React, { useState } from 'react';

interface DarkModeCommentProps {
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

export const DarkModeComment: React.FC<DarkModeCommentProps> = ({
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
    <div className={`bg-gray-800 p-4 border-b border-gray-700 ${className}`}>
      <div className="flex space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${username}'s avatar`}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-600"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center ring-2 ring-gray-500">
              <span className="text-gray-200 font-medium text-sm">
                {username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        
        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-semibold text-gray-100">{username}</span>
            {timestamp && (
              <span className="text-sm text-gray-400">{timestamp}</span>
            )}
          </div>
          <p className="text-gray-200 leading-relaxed mb-3">{comment}</p>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 text-sm transition-colors ${
                liked 
                  ? 'text-red-400 hover:text-red-300' 
                  : 'text-gray-400 hover:text-red-400'
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
              <span>{likeCount}</span>
            </button>
            
            <button
              onClick={onReply}
              className="flex items-center space-x-1 text-sm text-gray-400 hover:text-blue-400 transition-colors"
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
              <span>Reply</span>
            </button>
            
            <button
              className="flex items-center space-x-1 text-sm text-gray-400 hover:text-gray-300 transition-colors"
              aria-label="More options"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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