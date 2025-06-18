import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product, Order, CartItemWithProduct } from "./types";

interface EcommerceState {
  // Cart state
  cart: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  
  // Products state
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  getProductById: (id: string) => Product | undefined;
  
  // Orders state
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  // UI state
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useEcommerceStore = create<EcommerceState>()(
  persist(
    (set, get) => ({
      // Cart state
      cart: [],
      addToCart: (productId, quantity) =>
        set((state) => {
          const existing = state.cart.find((item) => item.productId === productId);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          } else {
            return {
              cart: [...state.cart, { productId, quantity }],
            };
          }
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.productId !== productId),
        })),
      updateCartItemQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.productId === productId
              ? { ...item, quantity: Math.max(0, quantity) }
              : item
          ).filter((item) => item.quantity > 0),
        })),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const state = get();
        return state.cart.reduce((total, item) => {
          const product = state.getProductById(item.productId);
          return total + (product?.price || 0) * item.quantity;
        }, 0);
      },
      getCartItemCount: () => {
        const state = get();
        return state.cart.reduce((count, item) => count + item.quantity, 0);
      },
      
      // Products state
      products: [
        {
          id: '1',
          name: 'Wireless Bluetooth Headphones',
          description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
          category: 'Electronics',
          stock: 25,
          rating: 4.5
        },
        {
          id: '2',
          name: 'Smart Fitness Watch',
          description: 'Advanced fitness tracking with heart rate monitor and GPS.',
          price: 199.99,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
          category: 'Electronics',
          stock: 15,
          rating: 4.3
        },
        {
          id: '3',
          name: 'Organic Cotton T-Shirt',
          description: 'Comfortable and eco-friendly cotton t-shirt available in multiple colors.',
          price: 24.99,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
          category: 'Clothing',
          stock: 50,
          rating: 4.1
        },
        {
          id: '4',
          name: 'Stainless Steel Water Bottle',
          description: 'Insulated water bottle that keeps drinks cold for 24 hours.',
          price: 34.99,
          image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
          category: 'Home & Garden',
          stock: 30,
          rating: 4.7
        },
        {
          id: '5',
          name: 'Yoga Mat Premium',
          description: 'Non-slip yoga mat made from eco-friendly materials.',
          price: 49.99,
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
          category: 'Sports',
          stock: 20,
          rating: 4.4
        },
        {
          id: '6',
          name: 'Natural Face Cream',
          description: 'Hydrating face cream with organic ingredients for all skin types.',
          price: 29.99,
          image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
          category: 'Beauty',
          stock: 35,
          rating: 4.2
        },
        {
          id: '7',
          name: 'Board Game Collection',
          description: 'Family-friendly board game with strategy and fun for all ages.',
          price: 39.99,
          image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400',
          category: 'Toys',
          stock: 12,
          rating: 4.6
        },
        {
          id: '8',
          name: 'Car Phone Mount',
          description: 'Universal car phone holder with suction cup mount.',
          price: 19.99,
          image: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=400',
          category: 'Automotive',
          stock: 40,
          rating: 4.0
        }
      ],
      setProducts: (products) => set({ products }),
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),
      updateProduct: (updatedProduct) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          ),
        })),
      deleteProduct: (productId) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== productId),
        })),
      getProductById: (id) => {
        const state = get();
        return state.products.find((product) => product.id === id);
      },
      
      // Orders state
      orders: [],
      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),
      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        })),
      
      // UI state
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),
      error: null,
      setError: (error) => set({ error }),
    }),
    {
      name: "ecommerce-store",
      partialize: (state) => ({
        cart: state.cart,
        orders: state.orders,
        products: state.products,
      }),
    }
  )
);

// Helper function to get cart items with product details
export const getCartItemsWithProducts = (): CartItemWithProduct[] => {
  const state = useEcommerceStore.getState();
  return state.cart
    .map((item) => {
      const product = state.getProductById(item.productId);
      if (!product) return null;
      return { ...item, product };
    })
    .filter((item): item is CartItemWithProduct => item !== null);
}; 