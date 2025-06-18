import React, { useState } from 'react';

interface EmojiReaction {
  emoji: string;
  count: number;
  reacted: boolean;
}

interface CommentWithEmojisProps {
  username: string;
  comment: string;
  timestamp?: string;
  avatarUrl?: string;
  likes?: number;
  onLike?: () => void;
  onReply?: () => void;
  onReaction?: (emoji: string) => void;
  reactions?: EmojiReaction[];
  isLiked?: boolean;
  className?: string;
}

export const CommentWithEmojis: React.FC<CommentWithEmojisProps> = ({
  username,
  comment,
  timestamp,
  avatarUrl,
  likes = 0,
  onLike,
  onReply,
  onReaction,
  reactions = [],
  isLiked = false,
  className = ''
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [commentReactions, setCommentReactions] = useState<EmojiReaction[]>(reactions);

  const commonEmojis = ['👍', '❤️', '😂', '😮', '😢', '😡'];

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
    onLike?.();
  };

  const handleReaction = (emoji: string) => {
    setCommentReactions(prev => {
      const existing = prev.find(r => r.emoji === emoji);
      if (existing) {
        return prev.map(r => 
          r.emoji === emoji 
            ? { ...r, count: r.reacted ? r.count - 1 : r.count + 1, reacted: !r.reacted }
            : r
        ).filter(r => r.count > 0);
      } else {
        return [...prev, { emoji, count: 1, reacted: true }];
      }
    });
    onReaction?.(emoji);
    setShowEmojiPicker(false);
  };

  // Function to parse emojis in comment text
  const parseCommentWithEmojis = (text: string) => {
    // Simple emoji regex - matches Unicode emoji characters
    const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;
    const parts = text.split(emojiRegex);
    
    return parts.map((part, index) => {
      if (emojiRegex.test(part)) {
        return (
          <span key={index} className="text-lg inline-block mx-0.5 animate-pulse">
            {part}
          </span>
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
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
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
          
          {/* Comment with emoji parsing */}
          <p className="text-gray-700 leading-relaxed mb-3">
            {parseCommentWithEmojis(comment)}
          </p>

          {/* Emoji Reactions */}
          {commentReactions.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {commentReactions.map((reaction, index) => (
                <button
                  key={index}
                  onClick={() => handleReaction(reaction.emoji)}
                  className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm transition-all ${
                    reaction.reacted
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{reaction.emoji}</span>
                  <span className="text-xs font-medium">{reaction.count}</span>
                </button>
              ))}
            </div>
          )}
          
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

            {/* Emoji Reaction Picker */}
            <div className="relative">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="flex items-center space-x-1 text-sm text-gray-500 hover:text-yellow-500 transition-colors"
                aria-label="Add reaction"
              >
                <span className="text-base">😊</span>
                <span>React</span>
              </button>
              
              {showEmojiPicker && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
                  <div className="flex space-x-1">
                    {commonEmojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleReaction(emoji)}
                        className="text-lg p-1 hover:bg-gray-100 rounded transition-colors"
                        aria-label={`React with ${emoji}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 