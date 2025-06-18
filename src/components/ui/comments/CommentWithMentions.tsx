import React, { useState } from 'react';

interface CommentWithMentionsProps {
  username: string;
  comment: string;
  timestamp?: string;
  avatarUrl?: string;
  likes?: number;
  onLike?: () => void;
  onReply?: () => void;
  onMentionClick?: (mentionedUser: string) => void;
  isLiked?: boolean;
  className?: string;
}

export const CommentWithMentions: React.FC<CommentWithMentionsProps> = ({
  username,
  comment,
  timestamp,
  avatarUrl,
  likes = 0,
  onLike,
  onReply,
  onMentionClick,
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

  // Function to parse mentions in comment text
  const parseCommentWithMentions = (text: string) => {
    const mentionRegex = /@(\w+)/g;
    const parts = text.split(mentionRegex);
    
    return parts.map((part, index) => {
      // Check if this part is a mention (odd indices after split)
      if (index % 2 === 1) {
        return (
          <button
            key={index}
            onClick={() => onMentionClick?.(part)}
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
            aria-label={`View profile of ${part}`}
          >
            @{part}
          </button>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

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
          
          {/* Comment with parsed mentions */}
          <p className="text-gray-700 leading-relaxed mb-3">
            {parseCommentWithMentions(comment)}
          </p>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 text-sm transition-colors ${
                liked 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-500 hover:text-red-500'
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
              className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-500 transition-colors"
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
              className="flex items-center space-x-1 text-sm text-gray-500 hover:text-purple-500 transition-colors"
              aria-label="Mention someone"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
              <span>Mention</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 