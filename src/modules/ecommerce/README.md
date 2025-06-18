# E-commerce Module

A modular e-commerce application built with React, TypeScript, Tailwind CSS, and Zustand for state management.

## Structure

```
src/modules/ecommerce/
├── components/
│   ├── ProductCard.tsx        # Reusable product card component
│   └── index.ts              # Component exports
├── layout/
│   └── EcommerceLayout.tsx    # Main layout wrapper with sidebar and navigation
├── pages/
│   ├── Dashboard.tsx          # Dashboard overview page
│   ├── Products.tsx           # Product catalog page with responsive grid
│   ├── ProductDetail.tsx      # Individual product detail page
│   ├── Cart.tsx              # Shopping cart with quantity controls
│   ├── Checkout.tsx          # Checkout process page
│   └── Orders.tsx            # Order history page
├── store.ts                  # Zustand store for state management
├── types.ts                  # TypeScript type definitions
├── routes.tsx                # Route configuration
├── index.ts                  # Module exports
└── README.md                 # This file
```

## Features

- **Responsive Layout**: Mobile-first design with collapsible sidebar
- **State Management**: Zustand store with persistence for cart and orders
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Shopping Cart**: Add/remove items, quantity controls, total calculation
- **Product Catalog**: Responsive grid layout with 8 sample products
- **Product Cards**: Reusable component with ratings, categories, and cart integration
- **Navigation**: Sidebar with cart count badges and active state indicators
- **Routing**: React Router integration with nested routes

## Components

### ProductCard

A reusable product card component with the following features:

- **Product Image**: Rounded image with hover effects
- **Product Information**: Name, price, stock status
- **Star Ratings**: Visual star rating system (supports half stars)
- **Category Badges**: Small category labels
- **Cart Integration**: "In Cart" badge showing current quantity
- **Add to Cart**: Button with state management
- **Responsive Design**: Adapts to different screen sizes

```tsx
import { ProductCard } from './modules/ecommerce/components';

<ProductCard
  product={product}
  onAddToCart={(productId) => addToCart(productId, 1)}
/>
```

## State Management

The module uses Zustand for state management with the following features:

### Cart Management
- Add/remove items from cart
- Update item quantities
- Calculate cart totals
- Persistent cart storage

### Product Management
- Product catalog with 8 sample products
- Product search and filtering (extensible)
- Product details with images and ratings

### Order Management
- Order history tracking
- Order status updates
- Persistent order storage

## Types

The module includes comprehensive TypeScript types:

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  stock: number;
  rating?: number;
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}
```

## Usage

### Basic Setup

1. Import the routes into your main router:

```tsx
import { ecommerceRoutes } from './modules/ecommerce/routes';

// In your router configuration
<Routes>
  {ecommerceRoutes}
  {/* Other routes */}
</Routes>
```

2. Navigate to `/ecommerce` to access the module

### Using the Store

```tsx
import { useEcommerceStore } from './modules/ecommerce/store';

const MyComponent = () => {
  const { addToCart, getCartTotal, cart } = useEcommerceStore();
  
  const handleAddToCart = (productId: string) => {
    addToCart(productId, 1);
  };
  
  return (
    <div>
      <p>Cart Total: ${getCartTotal()}</p>
      <p>Items in Cart: {cart.length}</p>
    </div>
  );
};
```

### Using ProductCard Component

```tsx
import { ProductCard } from './modules/ecommerce/components';
import { useEcommerceStore } from './modules/ecommerce/store';

const ProductList = () => {
  const { addToCart } = useEcommerceStore();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={(productId) => addToCart(productId, 1)}
        />
      ))}
    </div>
  );
};
```

### Available Routes

- `/ecommerce` - Dashboard (default)
- `/ecommerce/dashboard` - Dashboard overview
- `/ecommerce/products` - Product catalog with responsive grid
- `/ecommerce/product/:id` - Product detail page
- `/ecommerce/cart` - Shopping cart
- `/ecommerce/checkout` - Checkout process
- `/ecommerce/orders` - Order history

### Layout Features

- **Sidebar Navigation**: Fixed left sidebar on desktop, collapsible on mobile
- **Cart Badges**: Real-time cart count display in navigation
- **Top Navigation Bar**: Header with cart icon and settings
- **Responsive Design**: Adapts to different screen sizes
- **Active State**: Visual indication of current page
- **Mobile Overlay**: Dark overlay when sidebar is open on mobile

## Sample Data

The module includes 8 sample products for demonstration:

1. **Wireless Noise-Canceling Headphones** ($299.99) - Electronics
2. **Smart Fitness Watch** ($199.99) - Electronics
3. **Premium Laptop Backpack** ($89.99) - Accessories
4. **Automatic Coffee Maker** ($159.99) - Home & Kitchen
5. **Wireless Bluetooth Speaker** ($129.99) - Electronics
6. **Ergonomic Office Chair** ($249.99) - Furniture
7. **4K Ultra HD Smart TV** ($599.99) - Electronics
8. **Professional Camera Lens** ($179.99) - Photography

## ProductCard Features

### Visual Elements
- **Product Image**: High-quality placeholder images with hover effects
- **Category Badge**: Small blue badge in top-left corner
- **In Cart Badge**: Green badge showing quantity when item is in cart
- **Star Ratings**: 5-star rating system with support for half stars
- **Price Display**: Prominent blue price styling

### Interactive Features
- **Hover Effects**: Card elevation and image scaling on hover
- **Add to Cart**: Button changes color and text when item is in cart
- **Stock Status**: Shows stock count or "Out of Stock" message
- **Navigation**: Clicking image or title navigates to product detail

### Responsive Design
- **Grid Layout**: Responsive grid that adapts to screen size
- **Mobile Optimized**: Touch-friendly buttons and spacing
- **Image Scaling**: Images scale appropriately on different devices

## Customization

### Styling
The layout uses Tailwind CSS classes for styling. You can customize:

- Colors: Modify the color classes (e.g., `bg-blue-600` to `bg-green-600`)
- Spacing: Adjust padding and margin classes
- Typography: Change font sizes and weights
- Breakpoints: Modify responsive behavior

### Store Configuration
The Zustand store can be customized:

- Add new state slices
- Modify persistence configuration
- Add middleware for logging or analytics
- Extend with additional actions

### Product Data
Replace sample products with your own data:

```tsx
import { useEcommerceStore } from './store';

const { setProducts } = useEcommerceStore();

// Load your products
setProducts(yourProductData);
```

### ProductCard Customization
Customize the ProductCard component:

```tsx
// Custom add to cart handler
<ProductCard
  product={product}
  onAddToCart={(productId) => {
    // Custom logic here
    addToCart(productId, 1);
    showNotification('Product added to cart!');
  }}
/>
```

## Dependencies

- `react-router-dom` - For routing functionality
- `zustand` - For state management
- `react` - Core React library
- `tailwindcss` - For styling

## Future Enhancements

- Add authentication and user management
- Integrate with a backend API
- Add product search and filtering
- Implement payment processing
- Add admin panel for product management
- Add product reviews and ratings
- Implement wishlist functionality
- Add inventory management
- Add discount codes and promotions
- Add product comparison feature
- Implement advanced filtering (price range, brand, etc.) 