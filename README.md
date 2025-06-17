# UI Component Library

A modern React component library built with TypeScript, Vite, and Tailwind CSS.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build the library:
```bash
npm run build
```

## Components

### Header

A responsive header component with logo, navigation, and mobile hamburger menu.

#### Features

- ✅ Logo area (text, image, or React element)
- ✅ Navigation links with hover states
- ✅ Mobile hamburger menu that toggles navigation
- ✅ Responsive design (collapses on small screens)
- ✅ Optional sticky behavior on scroll
- ✅ Customizable styling with Tailwind CSS
- ✅ TypeScript support
- ✅ Accessibility features (ARIA labels, keyboard navigation)

#### Usage

```tsx
import { Header, NavItem } from 'ui-component-library';

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

// Basic usage
<Header
  logo="My Logo"
  navItems={navItems}
/>

// Advanced usage with custom logo and callbacks
<Header
  logo={
    <div className="flex items-center space-x-2">
      <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
      <span>Company Name</span>
    </div>
  }
  navItems={navItems.map(item => ({
    ...item,
    onClick: () => console.log(`Clicked: ${item.label}`)
  }))}
  sticky={true}
  bgColor="bg-blue-600"
  onLogoClick={() => console.log('Logo clicked')}
  className="shadow-lg"
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `React.ReactNode` | `"Logo"` | Logo content - can be text, image, or React element |
| `navItems` | `NavItem[]` | `[]` | Array of navigation items |
| `sticky` | `boolean` | `false` | Whether the header should stick to top on scroll |
| `className` | `string` | `""` | Additional CSS classes |
| `bgColor` | `string` | `"bg-white"` | Background color class |
| `onLogoClick` | `() => void` | `undefined` | Logo click handler |

#### NavItem Interface

```tsx
interface NavItem {
  label: string;
  href: string;
  onClick?: () => void;
}
```

## Development

The component library uses:

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting

## Project Structure

```
src/
├── components/
│   └── Header.tsx          # Header component
├── index.ts                # Main export file
├── index.css               # Tailwind CSS imports
├── App.tsx                 # Demo application
└── main.tsx                # Vite entry point
```

## Responsive Behavior

- **Desktop (md+)**: Logo on left, navigation links on right
- **Mobile (< md)**: Logo on left, hamburger menu on right
- **Mobile menu**: Slides down below header when toggled
- **Sticky**: Optional shadow appears when scrolled

## Accessibility

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Focus management
- Semantic HTML structure

## Customization

The Header component is fully customizable with Tailwind CSS classes:

```tsx
// Custom styling examples
<Header
  bgColor="bg-gradient-to-r from-blue-600 to-purple-600"
  className="border-b-4 border-yellow-400"
  // ... other props
/>
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features
- CSS Grid and Flexbox 