import React from 'react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime?: string;
  image?: string;
  category?: string;
  tags?: string[];
  slug: string;
}

export interface BlogPreviewSectionProps {
  title?: string;
  subtitle?: string;
  posts: BlogPost[];
  layout?: 'grid' | 'list';
  columns?: 1 | 2 | 3;
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showReadTime?: boolean;
  showCategory?: boolean;
  showTags?: boolean;
  backgroundColor?: 'white' | 'gray-50' | 'gray-100';
  onPostClick?: (post: BlogPost) => void;
  className?: string;
}

const BlogPreviewSection: React.FC<BlogPreviewSectionProps> = ({
  title,
  subtitle,
  posts,
  layout = 'grid',
  columns = 3,
  showExcerpt = true,
  showAuthor = true,
  showReadTime = true,
  showCategory = true,
  showTags = false,
  backgroundColor = 'white',
  onPostClick,
  className = ''
}) => {
  const backgroundClasses = {
    white: 'bg-white',
    'gray-50': 'bg-gray-50',
    'gray-100': 'bg-gray-100'
  };

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePostClick = (post: BlogPost) => {
    if (onPostClick) {
      onPostClick(post);
    }
  };

  const PostCard: React.FC<{ post: BlogPost }> = ({ post }) => (
    <article
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer ${
        layout === 'list' ? 'flex' : ''
      }`}
      onClick={() => handlePostClick(post)}
    >
      {post.image && (
        <div className={`${layout === 'list' ? 'w-1/3 flex-shrink-0' : 'aspect-video'} overflow-hidden`}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className={`p-6 ${layout === 'list' ? 'flex-1' : ''}`}>
        {showCategory && post.category && (
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
              {post.category}
            </span>
          </div>
        )}
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200">
          {post.title}
        </h3>
        
        {showExcerpt && (
          <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        )}
        
        {showTags && post.tags && post.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {showAuthor && (
              <div className="flex items-center">
                {post.author.avatar && (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}
                <span>{post.author.name}</span>
              </div>
            )}
            
            {showReadTime && post.readTime && (
              <span>{post.readTime}</span>
            )}
          </div>
          
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </div>
        
        <div className="mt-4">
          <span className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
            Read more →
          </span>
        </div>
      </div>
    </article>
  );

  return (
    <section className={`py-16 md:py-24 ${backgroundClasses[backgroundColor]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {subtitle && (
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide mb-4">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
          </div>
        )}

        {/* Blog Posts */}
        <div className={`${layout === 'grid' ? `grid ${columnClasses[columns]} gap-8` : 'space-y-8'}`}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection; 