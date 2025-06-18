import React from 'react';

interface SimpleCommentProps {
  username: string;
  comment: string;
  timestamp?: string;
  className?: string;
}

export const SimpleComment: React.FC<SimpleCommentProps> = ({
  username,
  comment,
  timestamp,
  className = ''
}) => {
  return (
    <div className={`bg-white p-4 border-b border-gray-200 ${className}`}>
      <div className="flex items-center space-x-2 mb-2">
        <span className="font-semibold text-gray-900">{username}</span>
        {timestamp && (
          <span className="text-sm text-gray-500">{timestamp}</span>
        )}
      </div>
      <p className="text-gray-700 leading-relaxed">{comment}</p>
    </div>
  );
}; 