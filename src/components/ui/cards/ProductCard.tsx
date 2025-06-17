import React from 'react';

export interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  badgeColor?: 'sale' | 'new' | 'hot';
  inStock?: boolean;
  onAddToCart?: () => void;
  onImageClick?: () => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  badge,
  badgeColor = 'sale',
  inStock = true,
  onAddToCart,
  onImageClick,
  className = ''
}) => {
  const badgeClasses = {
    sale: 'bg-red-500 text-white',
    new: 'bg-green-500 text-white',
    hot: 'bg-orange-500 text-white'
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 ${className}`}>
      <div className="relative group">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-200"
          onClick={onImageClick}
        />
        
        {badge && (
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 text-xs font-bold rounded ${badgeClasses[badgeColor]}`}>
              {badge}
            </span>
          </div>
        )}
        
        {!inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {name}
        </h3>
        
        {rating !== undefined && (
          <div className="flex items-center mb-3">
            <div className="flex">
              {renderStars(rating)}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {rating.toFixed(1)}
              {reviewCount && ` (${reviewCount})`}
            </span>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              ${price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {originalPrice && originalPrice > price && (
            <span className="text-sm font-medium text-red-600">
              {Math.round(((originalPrice - price) / originalPrice) * 100)}% off
            </span>
          )}
        </div>
        
        <button
          onClick={onAddToCart}
          disabled={!inStock}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
            inStock
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 