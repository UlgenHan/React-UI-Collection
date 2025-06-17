import React from 'react';

interface AvatarUser {
  id: string;
  src?: string;
  alt?: string;
  name: string;
}

interface GroupAvatarProps {
  users: AvatarUser[];
  maxVisible?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  overlap?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

export const GroupAvatar: React.FC<GroupAvatarProps> = ({
  users,
  maxVisible = 4,
  size = 'md',
  overlap = true,
  borderColor = 'border-white',
  backgroundColor = 'bg-blue-500',
  textColor = 'text-white',
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  const overlapClasses = {
    xs: '-ml-1',
    sm: '-ml-1.5',
    md: '-ml-2',
    lg: '-ml-2.5',
    xl: '-ml-3',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const visibleUsers = users.slice(0, maxVisible);
  const remainingCount = users.length - maxVisible;

  return (
    <div className={`flex items-center ${className}`}>
      {visibleUsers.map((user, index) => (
        <div
          key={user.id}
          className={`
            relative rounded-full overflow-hidden border-2 ${borderColor}
            ${sizeClasses[size]}
            ${overlap && index > 0 ? overlapClasses[size] : ''}
          `}
          style={{ zIndex: visibleUsers.length - index }}
        >
          {user.src ? (
            <img
              src={user.src}
              alt={user.alt || user.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-full h-full ${backgroundColor} ${textColor} flex items-center justify-center font-medium">
                      ${getInitials(user.name)}
                    </div>
                  `;
                }
              }}
            />
          ) : (
            <div className={`w-full h-full ${backgroundColor} ${textColor} flex items-center justify-center font-medium`}>
              {getInitials(user.name)}
            </div>
          )}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={`
            relative rounded-full border-2 ${borderColor} bg-gray-500 ${textColor}
            flex items-center justify-center font-medium
            ${sizeClasses[size]}
            ${overlap ? overlapClasses[size] : ''}
          `}
          style={{ zIndex: 0 }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}; 