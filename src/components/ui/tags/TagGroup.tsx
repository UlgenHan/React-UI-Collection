import React from 'react';

interface Tag {
  id: string;
  label: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  onClick?: () => void;
  onClose?: () => void;
}

interface TagGroupProps {
  tags: Tag[];
  size?: 'sm' | 'md' | 'lg';
  spacing?: 'tight' | 'normal' | 'loose';
  wrap?: boolean;
  className?: string;
}

export const TagGroup: React.FC<TagGroupProps> = ({
  tags,
  size = 'md',
  spacing = 'normal',
  wrap = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const spacingClasses = {
    tight: 'gap-1',
    normal: 'gap-2',
    loose: 'gap-3',
  };

  const getVariantClasses = (variant: string = 'default') => {
    const variants = {
      default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
      primary: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      success: 'bg-green-100 text-green-800 hover:bg-green-200',
      warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      error: 'bg-red-100 text-red-800 hover:bg-red-200',
    };
    return variants[variant as keyof typeof variants] || variants.default;
  };

  const getFocusRingClass = (variant: string = 'default') => {
    const focusRings = {
      default: 'focus:ring-gray-500',
      primary: 'focus:ring-blue-500',
      success: 'focus:ring-green-500',
      warning: 'focus:ring-yellow-500',
      error: 'focus:ring-red-500',
    };
    return focusRings[variant as keyof typeof focusRings] || focusRings.default;
  };

  return (
    <div className={`
      flex items-center
      ${spacingClasses[spacing]}
      ${wrap ? 'flex-wrap' : 'flex-nowrap'}
      ${className}
    `}>
      {tags.map((tag) => (
        <span
          key={tag.id}
          className={`
            inline-flex items-center font-medium rounded-md
            ${sizeClasses[size]}
            ${getVariantClasses(tag.variant)}
            ${(tag.onClick || tag.onClose) ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1' : ''}
            ${(tag.onClick || tag.onClose) ? getFocusRingClass(tag.variant) : ''}
          `}
          onClick={tag.onClick}
          onKeyDown={tag.onClick ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              tag.onClick?.();
            }
          } : undefined}
          tabIndex={(tag.onClick || tag.onClose) ? 0 : undefined}
          role={(tag.onClick || tag.onClose) ? 'button' : undefined}
        >
          <span>{tag.label}</span>
          {tag.onClose && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                tag.onClose?.();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  tag.onClose?.();
                }
              }}
              className={`
                flex-shrink-0 ml-1 w-4 h-4 rounded-full p-0.5 hover:bg-black hover:bg-opacity-10
                focus:outline-none focus:ring-1 focus:ring-offset-1
                ${getFocusRingClass(tag.variant)}
              `}
              aria-label={`Remove ${tag.label} tag`}
            >
              <svg
                className="w-full h-full"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </span>
      ))}
    </div>
  );
}; 