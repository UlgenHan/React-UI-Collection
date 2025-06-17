import React from 'react';
import {
  ClassicHeader,
  MagazineHeader,
  HeroHeader,
  StickyHeader,
  HamburgerHeader,
  TwoTierHeader,
  VerticalNavHeader,
  SlideInMenuHeader,
  SingleLineHeader,
  HeaderWithNotification,
} from '../components/layout/headers';
import { NavItem, ContactInfo, CTAButton } from '../types';
import { useNavigation } from '../App';

const HeaderGallery: React.FC = () => {
  const { navigateTo } = useNavigation();
  const navItems: NavItem[] = [
    { label: 'Home', href: '/', isActive: true },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' },
  ];

  const contactInfo: ContactInfo = {
    phone: '(555) 123-4567',
    email: 'hello@company.com',
  };

  const ctaButton: CTAButton = {
    label: 'Get Started',
    variant: 'primary',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m0 0h18" />
            </svg>
            Back to Component Gallery
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Header Component Gallery
          </h1>
          <p className="text-lg text-gray-600">
            Explore 10 different header components for your React projects
          </p>
        </div>

        <div className="space-y-16">
          {/* Classic Header */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Classic Header</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <ClassicHeader
                logo={{ text: 'Classic' }}
                navItems={navItems}
                contactInfo={contactInfo}
                ctaButton={ctaButton}
              />
              <div className="h-20 bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Page content</p>
              </div>
            </div>
          </section>

          {/* Magazine Header */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Magazine Header</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <MagazineHeader
                logo={{ text: 'Magazine' }}
                navItems={navItems}
                tagline="Your trusted news source"
              />
              <div className="h-20 bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Page content</p>
              </div>
            </div>
          </section>

          {/* Hero Header */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hero Header</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-96">
                <HeroHeader
                  logo={{ text: 'Hero' }}
                  navItems={navItems}
                  heroTitle="Welcome to Our Platform"
                  heroSubtitle="Experience the difference"
                  ctaButtons={[ctaButton]}
                />
              </div>
            </div>
          </section>

          {/* Sticky Header */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sticky Header</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <StickyHeader
                logo={{ text: 'Sticky' }}
                navItems={navItems}
              />
              <div className="h-96 bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Scroll to see sticky behavior</p>
              </div>
            </div>
          </section>

          {/* Hamburger Header */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hamburger Header</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <HamburgerHeader
                logo={{ text: 'Hamburger' }}
                navItems={navItems}
              />
              <div className="h-20 bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Click hamburger menu</p>
              </div>
            </div>
          </section>

          {/* Two Tier Header */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Two Tier Header</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <TwoTierHeader
                logo={{ text: 'TwoTier' }}
                navItems={navItems}
                topNavItems={[
                  { label: 'Support', href: '/support' },
                  { label: 'Blog', href: '/blog' },
                ]}
                contactInfo={contactInfo}
                announcement="New product launch this month!"
              />
              <div className="h-20 bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Page content</p>
              </div>
            </div>
          </section>

          {/* Vertical Nav Header */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Vertical Nav Header</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-96 relative">
                <VerticalNavHeader
                  logo={{ text: 'Vertical' }}
                  navItems={navItems}
                />
              </div>
            </div>
          </section>

          {/* Slide In Menu Header */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Slide In Menu Header</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <SlideInMenuHeader
                logo={{ text: 'SlideIn' }}
                navItems={navItems}
              />
              <div className="h-20 bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Click menu for slide animation</p>
              </div>
            </div>
          </section>

          {/* Single Line Header */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Single Line Header</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <SingleLineHeader
                logo={{ text: 'Single' }}
                navItems={navItems}
              />
              <div className="h-20 bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Minimal design</p>
              </div>
            </div>
          </section>

          {/* Header With Notification */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Header With Notification</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <HeaderWithNotification
                logo={{ text: 'Notify' }}
                navItems={navItems}
                notificationCount={5}
                alertMessage="System maintenance scheduled for tonight"
              />
              <div className="h-20 bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Interactive notifications</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HeaderGallery; 