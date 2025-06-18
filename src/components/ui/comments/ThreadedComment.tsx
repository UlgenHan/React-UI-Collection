import React from 'react';

interface Reply {
  id: string;
  username: string;
  comment: string;
  timestamp?: string;
  avatarUrl?: string;
}

interface ThreadedCommentProps {
  username: string;
  comment: string;
  timestamp?: string;
  avatarUrl?: string;
  replies?: Reply[];
  level?: number;
  className?: string;
}

export const ThreadedComment: React.FC<ThreadedCommentProps> = ({
  username,
  comment,
  timestamp,
  avatarUrl,
  replies = [],
  level = 0,
  className = ''
}) => {
  const indentClass = level > 0 ? `ml-${Math.min(level * 8, 32)}` : '';
  const maxLevel = 3;

  return (
    <div className={`${indentClass} ${className}`}>
      {/* Main Comment */}
      <div className="bg-white p-4 border-l-2 border-gray-100">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`${username}'s avatar`}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium text-xs">
                  {username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-semibold text-gray-900 text-sm">{username}</span>
              {timestamp && (
                <span className="text-xs text-gray-500">{timestamp}</span>
              )}
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{comment}</p>
          </div>
        </div>
      </div>

      {/* Replies */}
      {replies.length > 0 && level < maxLevel && (
        <div className="mt-2">
          {replies.map((reply) => (
            <ThreadedComment
              key={reply.id}
              username={reply.username}
              comment={reply.comment}
              timestamp={reply.timestamp}
              avatarUrl={reply.avatarUrl}
              level={level + 1}
              className="mt-2"
            />
          ))}
        </div>
      )}
      
      {/* Show collapsed indicator for deep nesting */}
      {replies.length > 0 && level >= maxLevel && (
        <div className="ml-4 mt-2 text-xs text-gray-500">
          ... {replies.length} more replies
        </div>
      )}
    </div>
  );
}; 