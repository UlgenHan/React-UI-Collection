import React from 'react';
import { useNavigation } from '../App';
import {
  BasicCard,
  ImageCard,
  ProfileCard,
  ProductCard,
  HoverEffectCard,
  OverlayCard,
  HorizontalCard,
  CTACard,
  StatisticCard,
  ExpandableCard
} from '../components/ui/cards';

const CardGallery: React.FC = () => {
  const { navigateTo } = useNavigation();

  const cards = [
    {
      name: 'BasicCard',
      title: 'Basic Card',
      description: 'Simple card with title, description, padding, border, and clean minimal layout',
      features: ['Customizable padding', 'Border options', 'Shadow variations', 'Background colors'],
      component: BasicCard
    },
    {
      name: 'ImageCard',
      title: 'Image Card',
      description: 'Card with image at top followed by content for blog previews and product highlights',
      features: ['Image positioning', 'Badges with colors', 'Hover effects', 'Responsive images'],
      component: ImageCard
    },
    {
      name: 'ProfileCard',
      title: 'Profile Card',
      description: 'User profile card with avatar, name, role, and social links for team sections',
      features: ['Avatar support', 'Social links', 'Bio sections', 'Role/company info'],
      component: ProfileCard
    },
    {
      name: 'ProductCard',
      title: 'Product Card',
      description: 'E-commerce product card with image, name, price, rating, and Add to Cart button',
      features: ['Product ratings', 'Price formatting', 'Stock status', 'Cart functionality'],
      component: ProductCard
    },
    {
      name: 'HoverEffectCard',
      title: 'Hover Effect Card',
      description: 'Interactive card with hover effects like shadow, transform for engaging UIs',
      features: ['Multiple effects', 'Intensity levels', 'Smooth transitions', 'Custom animations'],
      component: HoverEffectCard
    },
    {
      name: 'OverlayCard',
      title: 'Overlay Card',
      description: 'Card with image background and text overlay using gradient overlays',
      features: ['Gradient overlays', 'Text positioning', 'Color customization', 'Opacity controls'],
      component: OverlayCard
    },
    {
      name: 'HorizontalCard',
      title: 'Horizontal Card',
      description: 'Side-by-side layout with image and content, responsive mobile stacking',
      features: ['Horizontal layout', 'Mobile responsive', 'Image positioning', 'Content alignment'],
      component: HorizontalCard
    },
    {
      name: 'CTACard',
      title: 'CTA Card',
      description: 'Call-to-action card with short message and action button for promotions',
      features: ['Multiple variants', 'Background patterns', 'Button styles', 'Icon support'],
      component: CTACard
    },
    {
      name: 'StatisticCard',
      title: 'Statistic Card',
      description: 'Metric display card with title and icon for dashboards and analytics',
      features: ['Icon integration', 'Color themes', 'Change indicators', 'Loading states'],
      component: StatisticCard
    },
    {
      name: 'ExpandableCard',
      title: 'Expandable Card',
      description: 'Collapsible card with expandable content and toggle button functionality',
      features: ['Smooth animations', 'Toggle controls', 'Preview content', 'Expansion modes'],
      component: ExpandableCard
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigateTo('home')}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              ← Back to Gallery
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Card Components</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Card Components</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Versatile card components for content display - from simple cards to complex product layouts
          </p>
          <div className="mt-6 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {cards.length} Components Available
          </div>
        </div>

        {/* Components Grid */}
        <div className="space-y-12">
          {cards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Description Section */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-gray-900">{card.title}</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                      Available
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {card.description}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-900">Key Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      {card.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Preview Section */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Live Preview:</h4>
                  <div className="flex items-center justify-center min-h-[300px]">
                    {card.name === 'BasicCard' && (
                      <BasicCard
                        title="Sample Card Title"
                        description="This is a preview of the basic card component with sample content to demonstrate its appearance and functionality."
                        className="max-w-sm"
                      />
                    )}
                    {card.name === 'ImageCard' && (
                      <ImageCard
                        title="Beautiful Landscape"
                        description="Explore the stunning beauty of nature with this captivating image that showcases the perfect harmony of colors and composition."
                        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                        badge="Featured"
                        className="max-w-sm"
                      />
                    )}
                    {card.name === 'ProfileCard' && (
                      <ProfileCard
                        name="Sarah Johnson"
                        role="Senior Designer"
                        company="Design Studio"
                        bio="Passionate about creating beautiful and functional user experiences that make a difference."
                        avatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                        socialLinks={{
                          twitter: 'https://twitter.com',
                          linkedin: 'https://linkedin.com',
                          github: 'https://github.com'
                        }}
                        className="max-w-sm"
                      />
                    )}
                    {card.name === 'ProductCard' && (
                      <ProductCard
                        name="Premium Headphones"
                        price={199.99}
                        originalPrice={249.99}
                        image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                        rating={4.5}
                        reviewCount={128}
                        badge="Best Seller"
                        inStock={true}
                        onAddToCart={() => alert('Added to cart!')}
                        className="max-w-sm"
                      />
                    )}
                    {card.name === 'HoverEffectCard' && (
                      <HoverEffectCard
                        title="Interactive Card"
                        description="Hover over this card to see the beautiful transformation effects in action."
                        hoverEffect="lift"
                        className="max-w-sm"
                      />
                    )}
                    {card.name === 'OverlayCard' && (
                      <OverlayCard
                        title="Mountain Adventure"
                        description="Discover breathtaking mountain trails and unforgettable experiences."
                        backgroundImage="https://images.unsplash.com/photo-1464822759844-d150baec3634?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                        overlayColor="blue"
                        className="max-w-sm h-64"
                      />
                    )}
                    {card.name === 'HorizontalCard' && (
                      <HorizontalCard
                        title="Technology News"
                        description="Stay updated with the latest developments in technology and innovation."
                        image="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                        className="max-w-lg"
                      />
                    )}
                    {card.name === 'CTACard' && (
                      <CTACard
                        title="Join Our Newsletter"
                        message="Get the latest updates and exclusive offers delivered to your inbox."
                        buttonText="Subscribe Now"
                        onButtonClick={() => alert('Subscribed!')}
                        variant="primary"
                        className="max-w-sm"
                      />
                    )}
                    {card.name === 'StatisticCard' && (
                      <StatisticCard
                        title="Total Sales"
                        value="$124,532"
                        change={{
                          value: 12.5,
                          type: "increase",
                          period: "this month"
                        }}
                        icon={<span>💰</span>}
                        className="max-w-sm"
                      />
                    )}
                    {card.name === 'ExpandableCard' && (
                      <ExpandableCard
                        title="Expandable Content"
                        previewContent="Click to expand and see more detailed information about this card component."
                        expandedContent={
                          <div className="space-y-3">
                            <p>This is the expanded content that provides more detailed information about the topic.</p>
                            <p>You can include any type of content here: text, images, lists, or even other components.</p>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              <li>Feature one explanation</li>
                              <li>Feature two details</li>
                              <li>Additional information</li>
                            </ul>
                          </div>
                        }
                        className="max-w-sm"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{cards.length}</div>
            <div className="text-gray-600">Card Components</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">TypeScript Coverage</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
            <div className="text-gray-600">Styling Options</div>
          </div>
        </div>

        {/* Integration Example */}
        <div className="mt-16 bg-gray-900 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Easy Integration</h2>
          <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`import { BasicCard, ProductCard } from '../components/ui/cards';

// Use in your React component
<BasicCard
  title="Card Title"
  content="Card description here"
  className="shadow-lg"
/>

<ProductCard
  name="Product Name"
  price={29.99}
  image="/product.jpg"
  rating={4.5}
  onAddToCart={handleAddToCart}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardGallery; 