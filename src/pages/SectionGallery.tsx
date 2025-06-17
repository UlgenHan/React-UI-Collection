import React from 'react';
import { useNavigation } from '../App';

const SectionGallery: React.FC = () => {
  const { navigateTo } = useNavigation();

  const sections = [
    {
      name: 'Hero Section',
      description: 'Large banner with background image/video, headline, subheadline, and CTA buttons',
      features: ['Background video/image support', 'Multiple CTAs', 'Customizable alignment', 'Responsive design']
    },
    {
      name: 'Feature Section',
      description: 'Multiple feature blocks in grid/flex layout with icons, titles, and descriptions',
      features: ['Icon positioning options', 'Grid/flex layouts', 'Column controls', 'Background variations']
    },
    {
      name: 'Content with Sidebar',
      description: 'Two-column layout with main content and sidebar, responsive stacking',
      features: ['Sidebar positioning', 'Width controls', 'Sticky positioning', 'Mobile responsive']
    },
    {
      name: 'Testimonial Section',
      description: 'Carousel or grid of user testimonials with photos, names, and quotes',
      features: ['Carousel/grid modes', 'Star ratings', 'Autoplay option', 'Navigation controls']
    },
    {
      name: 'Pricing Section',
      description: 'Pricing plan cards with names, prices, features lists, and CTA buttons',
      features: ['Featured plan highlighting', 'Billing toggles', 'Feature comparisons', 'Custom styling']
    },
    {
      name: 'FAQ Section',
      description: 'Accordion-style FAQ with expand/collapse functionality',
      features: ['Single/multiple expansion', 'Smooth animations', 'Search functionality', 'Icon customization']
    },
    {
      name: 'Gallery Section',
      description: 'Image gallery with grid/masonry layout and lightbox feature',
      features: ['Grid/masonry layouts', 'Lightbox modal', 'Image captions', 'Responsive design']
    },
    {
      name: 'Blog Preview Section',
      description: 'Grid/list of blog posts with titles, excerpts, and read more links',
      features: ['Grid/list layouts', 'Author information', 'Categories & tags', 'Read time estimates']
    },
    {
      name: 'Call to Action Section',
      description: 'Bold section with strong message and CTA button, full-width background',
      features: ['Background options', 'Gradient support', 'Multiple CTAs', 'Decorative elements']
    },
    {
      name: 'Contact Section',
      description: 'Contact form with input fields, submit button, and contact info display',
      features: ['Form validation', 'Contact information', 'Social links', 'Map integration']
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
            <h1 className="text-xl font-semibold text-gray-900">Section Components</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Section Components</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete page sections ready to use - from hero banners to contact forms
          </p>
          <div className="mt-6 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {sections.length} Components Available
          </div>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{section.name}</h3>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  Available
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {section.description}
              </p>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900">Key Features:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {section.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{sections.length}</div>
            <div className="text-gray-600">Section Components</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">TypeScript Coverage</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
            <div className="text-gray-600">Customization Options</div>
          </div>
        </div>

        {/* Integration Example */}
        <div className="mt-16 bg-gray-900 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Easy Integration</h2>
          <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`import { HeroSection, FeatureSection } from '../components/layout/sections';

// Use in your React component
<HeroSection
  title="Welcome to Our Platform"
  subtitle="Premium Experience"
  primaryCTA={{ text: "Get Started", onClick: handleClick }}
  backgroundImage="/hero-bg.jpg"
/>

<FeatureSection
  title="Amazing Features"
  features={features}
  columns={3}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionGallery; 