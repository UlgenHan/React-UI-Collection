// Shared component types
export interface BaseComponentProps {
  className?: string;
  id?: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  onClick?: () => void;
  isActive?: boolean;
}

// Contact types
export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
}

// CTA types
export interface CTAButton {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
}

// Logo types
export interface LogoProps {
  text?: string;
  image?: string;
  alt?: string;
  href?: string;
  onClick?: () => void;
}

// Header specific types
export interface HeaderBaseProps extends BaseComponentProps {
  logo?: LogoProps;
  navItems?: NavItem[];
  sticky?: boolean;
  bgColor?: string;
}

// Layout types
export interface LayoutProps extends BaseComponentProps {
  children: React.ReactNode;
} 