import React, { useEffect } from 'react';
import { useEcommerceStore } from '../store';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

const Products: React.FC = () => {
  const { products, setProducts, addToCart } = useEcommerceStore();

  // Expanded mock products data
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Wireless Noise-Canceling Headphones',
      description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life',
      price: 299.99,
      image: 'https://via.placeholder.com/400x300?text=Wireless+Headphones',
      category: 'Electronics',
      stock: 15,
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      description: 'Advanced fitness tracking with heart rate monitor and GPS',
      price: 199.99,
      image: 'https://via.placeholder.com/400x300?text=Smart+Watch',
      category: 'Electronics',
      stock: 8,
      rating: 4.6,
    },
    {
      id: '3',
      name: 'Premium Laptop Backpack',
      description: 'Water-resistant laptop backpack with multiple compartments and USB charging port',
      price: 89.99,
      image: 'https://via.placeholder.com/400x300?text=Laptop+Backpack',
      category: 'Accessories',
      stock: 25,
      rating: 4.4,
    },
    {
      id: '4',
      name: 'Automatic Coffee Maker',
      description: 'Programmable coffee maker with built-in grinder and thermal carafe',
      price: 159.99,
      image: 'https://via.placeholder.com/400x300?text=Coffee+Maker',
      category: 'Home & Kitchen',
      stock: 12,
      rating: 4.7,
    },
    {
      id: '5',
      name: 'Wireless Bluetooth Speaker',
      description: 'Portable waterproof speaker with 360-degree sound and 20-hour battery',
      price: 129.99,
      image: 'https://via.placeholder.com/400x300?text=Bluetooth+Speaker',
      category: 'Electronics',
      stock: 18,
      rating: 4.5,
    },
    {
      id: '6',
      name: 'Ergonomic Office Chair',
      description: 'Adjustable office chair with lumbar support and breathable mesh back',
      price: 249.99,
      image: 'https://via.placeholder.com/400x300?text=Office+Chair',
      category: 'Furniture',
      stock: 6,
      rating: 4.9,
    },
    {
      id: '7',
      name: '4K Ultra HD Smart TV',
      description: '55-inch 4K smart TV with HDR and built-in streaming apps',
      price: 599.99,
      image: 'https://via.placeholder.com/400x300?text=4K+Smart+TV',
      category: 'Electronics',
      stock: 4,
      rating: 4.8,
    },
    {
      id: '8',
      name: 'Professional Camera Lens',
      description: '50mm f/1.8 prime lens for DSLR cameras with autofocus',
      price: 179.99,
      image: 'https://via.placeholder.com/400x300?text=Camera+Lens',
      category: 'Photography',
      stock: 10,
      rating: 4.6,
    },
  ];

  useEffect(() => {
    // Load mock products if none exist
    if (products.length === 0) {
      setProducts(mockProducts);
    }
  }, [products.length, setProducts]);

  const handleAddToCart = (productId: string) => {
    addToCart(productId, 1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
            <p className="text-gray-600">Browse our collection of high-quality products</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Showing {products.length} products</p>
          </div>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Products will appear here once they are loaded.</p>
        </div>
      )}
    </div>
  );
};

export default Products; 