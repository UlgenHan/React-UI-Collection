import React from 'react';
import { useNavigation } from '../App';
import {
  SimpleFooter,
  LinkFooter,
  SocialFooter,
  NewsletterFooter,
  LogoFooter,
  SplitFooter,
  StickyFooter,
  DarkModeFooter,
  MultiLanguageFooter,
  ContactInfoFooter
} from '../components/layout/footers';

const FooterGallery: React.FC = () => {
  const { navigateTo } = useNavigation();

  const footers = [
    {
      name: 'Simple Footer',
      description: 'Basic footer with copyright text centered, minimalistic and clean',
      component: SimpleFooter,
      props: {}
    },
    {
      name: 'Link Footer',
      description: 'Footer with multiple columns of navigation links (Company, Products, Support)',
      component: LinkFooter,
      props: {}
    },
    {
      name: 'Social Footer',
      description: 'Footer including social media icons with links in horizontal layout',
      component: SocialFooter,
      props: {}
    },
    {
      name: 'Newsletter Footer',
      description: 'Footer with newsletter subscription input and submit button with validation',
      component: NewsletterFooter,
      props: {}
    },
    {
      name: 'Logo Footer',
      description: 'Footer with company logo on the left, links and contact info on the right',
      component: LogoFooter,
      props: {}
    },
    {
      name: 'Split Footer',
      description: 'Two horizontal sections - top: links and info, bottom: copyright and legal',
      component: SplitFooter,
      props: {}
    },
    {
      name: 'Sticky Footer',
      description: 'Footer fixed at the bottom of viewport, always visible even if page content is short',
      component: StickyFooter,
      props: {}
    },
    {
      name: 'Dark Mode Footer',
      description: 'Footer designed to support dark mode styling with toggle button to switch themes',
      component: DarkModeFooter,
      props: {}
    },
    {
      name: 'Multi Language Footer',
      description: 'Footer with language selector dropdown and basic links and copyright',
      component: MultiLanguageFooter,
      props: {}
    },
    {
      name: 'Contact Info Footer',
      description: 'Footer focused on contact details with address, phone, email, and map link',
      component: ContactInfoFooter,
      props: {}
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Footer Gallery</h1>
            <p className="text-gray-600">
              {footers.length} footer components for different use cases and layouts
            </p>
          </div>
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Component Gallery
          </button>
        </div>

        {/* Footer Components Grid */}
        <div className="space-y-12">
          {footers.map((footer, index) => {
            const FooterComponent = footer.component;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Header Info */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {footer.name}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
                        {footer.description}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Ready to use
                    </span>
                  </div>
                </div>

                {/* Footer Preview */}
                <div className="bg-gray-50">
                  <div className="max-h-96 overflow-y-auto">
                    <FooterComponent 
                      {...footer.props}
                      className="border-0"
                    />
                  </div>
                </div>

                {/* Usage Info */}
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>TypeScript • Responsive • Customizable</span>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Production Ready
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Component Gallery
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterGallery; 