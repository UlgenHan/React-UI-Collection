import React, { useState, useRef, useEffect } from 'react';

interface InteractiveCommentProps {
  username: string;
  comment: string;
  timestamp?: string;
  avatarUrl?: string;
  likes?: number;
  onLike?: () => void;
  onReply?: () => void;
  onShare?: () => void;
  isLiked?: boolean;
  isAuthor?: boolean;
  className?: string;
}

export const InteractiveComment: React.FC<InteractiveCommentProps> = ({
  username,
  comment,
  timestamp,
  avatarUrl,
  likes = 0,
  onLike,
  onReply,
  onShare,
  isLiked = false,
  isAuthor = false,
  className = ''
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [animateLike, setAnimateLike] = useState(false);
  const likeButtonRef = useRef<HTMLButtonElement>(null);

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
    
    // Trigger like animation
    setAnimateLike(true);
    setTimeout(() => setAnimateLike(false), 600);
    
    onLike?.();
  };

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMenu && !(event.target as Element).closest('.comment-menu')) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  return (
    <div 
      className={`relative bg-white p-4 border-b border-gray-200 transition-all duration-200 hover:bg-gray-50 group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover indicator line */}
      <div 
        className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 transition-opacity duration-200 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="flex space-x-3">
        {/* Avatar with hover effect */}
        <div className="flex-shrink-0 relative">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${username}'s avatar`}
              className={`w-10 h-10 rounded-full object-cover transition-all duration-200 ${
                isHovered ? 'ring-2 ring-blue-500 ring-offset-2 transform scale-105' : ''
              }`}
            />
          ) : (
            <div 
              className={`w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center transition-all duration-200 ${
                isHovered ? 'ring-2 ring-blue-500 ring-offset-2 transform scale-105' : ''
              }`}
            >
              <span className="text-white font-medium text-sm">
                {username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          
          {/* Author badge */}
          {isAuthor && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900">{username}</span>
              {isAuthor && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                  Author
                </span>
              )}
              {timestamp && (
                <span className="text-sm text-gray-500">{timestamp}</span>
              )}
            </div>
            
            {/* More options menu */}
            <div className="relative comment-menu">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className={`p-1 rounded-full text-gray-400 transition-all duration-200 ${
                  isHovered || showMenu ? 'opacity-100 hover:bg-gray-200' : 'opacity-0'
                }`}
                aria-label="More options"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              
              {showMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Copy link
                  </button>
                  <button 
                    onClick={onShare}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Share
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Report
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-3">{comment}</p>
          
          {/* Interactive Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              ref={likeButtonRef}
              onClick={handleLike}
              className={`relative flex items-center space-x-1 text-sm transition-all duration-200 group/like ${
                liked 
                  ? 'text-red-500' 
                  : 'text-gray-500 hover:text-red-500'
              }`}
              aria-label={liked ? 'Unlike comment' : 'Like comment'}
            >
              <div className="relative">
                <svg 
                  className={`w-4 h-4 transition-all duration-200 ${
                    liked ? 'fill-current scale-110' : 'group-hover/like:scale-110'
                  } ${animateLike ? 'animate-bounce' : ''}`}
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
                
                {/* Like burst animation */}
                {animateLike && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-red-500 rounded-full animate-ping"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-10px)`,
                          animationDelay: `${i * 100}ms`,
                          animationDuration: '600ms'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <span className={`font-medium transition-all duration-200 ${
                animateLike ? 'animate-pulse' : ''
              }`}>
                {likeCount}
              </span>
            </button>
            
            <button
              onClick={onReply}
              className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-500 transition-all duration-200 hover:scale-105"
              aria-label="Reply to comment"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              <span>Reply</span>
            </button>
            
            <button
              onClick={onShare}
              className="flex items-center space-x-1 text-sm text-gray-500 hover:text-green-500 transition-all duration-200 hover:scale-105"
              aria-label="Share comment"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 