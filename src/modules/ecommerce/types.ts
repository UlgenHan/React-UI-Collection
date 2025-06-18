export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  stock: number;
  rating?: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

// Extended types for enhanced functionality
export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface OrderWithDetails extends Order {
  items: CartItemWithProduct[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Filter and search types
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
}

export interface SearchParams {
  query: string;
  filters: ProductFilters;
  sortBy?: 'name' | 'price' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
} 