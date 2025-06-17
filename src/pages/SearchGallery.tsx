import React, { useState } from 'react';
import { useNavigation } from '../App';
import {
  BasicSearchBar,
  SearchWithButton,
  RoundedSearchBar,
  ExpandableSearchBar,
  SearchWithClear,
  DarkModeSearchBar,
  SearchWithDropdown,
  StickySearchBar,
  AnimatedSearchBar,
  SearchBarWithSuggestions
} from '../components/ui/inputs/search';

const SearchGallery: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});
  const [isAnimatedOpen, setIsAnimatedOpen] = useState(false);

  const handleSearchChange = (key: string, value: string) => {
    setSearchValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = (key: string, value: string) => {
    console.log(`Search ${key}:`, value);
  };

  const sampleSuggestions = [
    { id: '1', text: 'React components', category: 'Framework' },
    { id: '2', text: 'JavaScript tutorials', category: 'Language' },
    { id: '3', text: 'CSS animations', category: 'Styling' },
    { id: '4', text: 'TypeScript guide', category: 'Language' },
    { id: '5', text: 'UI design patterns', category: 'Design' },
  ];

  const searchOptions = [
    { value: 'all', label: 'All' },
    { value: 'components', label: 'Components' },
    { value: 'tutorials', label: 'Tutorials' },
    { value: 'documentation', label: 'Documentation' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => navigateTo('home')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Gallery
              </button>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Search Components</h1>
              <p className="text-gray-600 mt-1">Various search input designs and functionality</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          
          {/* Basic Search Bar */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Search Bar</h2>
            <p className="text-gray-600 mb-6">Simple search input with search icon inside</p>
            <div className="flex justify-center">
              <BasicSearchBar
                placeholder="Search..."
                value={searchValues.basic || ''}
                onChange={(value) => handleSearchChange('basic', value)}
                onSearch={(value) => handleSearch('basic', value)}
              />
            </div>
          </div>

          {/* Search With Button */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Search With Button</h2>
            <p className="text-gray-600 mb-6">Search input with dedicated search button</p>
            <div className="flex justify-center">
              <SearchWithButton
                placeholder="Search..."
                value={searchValues.button || ''}
                onChange={(value) => handleSearchChange('button', value)}
                onSearch={(value) => handleSearch('button', value)}
                buttonText="Search"
              />
            </div>
          </div>

          {/* Rounded Search Bar */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Rounded Search Bar</h2>
            <p className="text-gray-600 mb-6">Pill-shaped search input in different sizes</p>
            <div className="flex flex-col items-center space-y-4">
              <RoundedSearchBar
                placeholder="Small search..."
                size="sm"
                value={searchValues.roundedSm || ''}
                onChange={(value) => handleSearchChange('roundedSm', value)}
                onSearch={(value) => handleSearch('roundedSm', value)}
              />
              <RoundedSearchBar
                placeholder="Medium search..."
                size="md"
                value={searchValues.roundedMd || ''}
                onChange={(value) => handleSearchChange('roundedMd', value)}
                onSearch={(value) => handleSearch('roundedMd', value)}
              />
              <RoundedSearchBar
                placeholder="Large search..."
                size="lg"
                value={searchValues.roundedLg || ''}
                onChange={(value) => handleSearchChange('roundedLg', value)}
                onSearch={(value) => handleSearch('roundedLg', value)}
              />
            </div>
          </div>

          {/* Expandable Search Bar */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Expandable Search Bar</h2>
            <p className="text-gray-600 mb-6">Search bar that expands on focus</p>
            <div className="flex justify-center">
              <ExpandableSearchBar
                placeholder="Click to expand..."
                value={searchValues.expandable || ''}
                onChange={(value) => handleSearchChange('expandable', value)}
                onSearch={(value) => handleSearch('expandable', value)}
              />
            </div>
          </div>

          {/* Search With Clear */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Search With Clear</h2>
            <p className="text-gray-600 mb-6">Search input with clear (X) button</p>
            <div className="flex justify-center">
              <SearchWithClear
                placeholder="Type to see clear button..."
                value={searchValues.clear || ''}
                onChange={(value) => handleSearchChange('clear', value)}
                onSearch={(value) => handleSearch('clear', value)}
                onClear={() => handleSearchChange('clear', '')}
              />
            </div>
          </div>

          {/* Dark Mode Search Bar */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Dark Mode Search Bar</h2>
            <p className="text-gray-600 mb-6">Search bar with light and dark theme support</p>
            <div className="flex flex-col items-center space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Light Mode</p>
                <DarkModeSearchBar
                  placeholder="Light theme search..."
                  dark={false}
                  value={searchValues.lightMode || ''}
                  onChange={(value) => handleSearchChange('lightMode', value)}
                  onSearch={(value) => handleSearch('lightMode', value)}
                />
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <p className="text-sm text-gray-300 mb-2">Dark Mode</p>
                <DarkModeSearchBar
                  placeholder="Dark theme search..."
                  dark={true}
                  value={searchValues.darkMode || ''}
                  onChange={(value) => handleSearchChange('darkMode', value)}
                  onSearch={(value) => handleSearch('darkMode', value)}
                />
              </div>
            </div>
          </div>

          {/* Search With Dropdown */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Search With Dropdown</h2>
            <p className="text-gray-600 mb-6">Search input with category selection dropdown</p>
            <div className="flex justify-center">
              <SearchWithDropdown
                placeholder="Search in category..."
                options={searchOptions}
                value={searchValues.dropdown || ''}
                onChange={(value) => handleSearchChange('dropdown', value)}
                onSearch={(value, category) => console.log(`Search in ${category}:`, value)}
              />
            </div>
          </div>

          {/* Animated Search Bar */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Animated Search Bar</h2>
            <p className="text-gray-600 mb-6">Search bar with slide/fade animation on toggle</p>
            <div className="flex justify-center">
              <AnimatedSearchBar
                placeholder="Animated search..."
                isOpen={isAnimatedOpen}
                onToggle={setIsAnimatedOpen}
                animation="slideDown"
                value={searchValues.animated || ''}
                onChange={(value) => handleSearchChange('animated', value)}
                onSearch={(value) => handleSearch('animated', value)}
              />
            </div>
          </div>

          {/* Search With Suggestions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Search With Suggestions</h2>
            <p className="text-gray-600 mb-6">Search bar that shows suggestions on typing</p>
            <div className="flex justify-center">
              <SearchBarWithSuggestions
                placeholder="Type to see suggestions..."
                suggestions={sampleSuggestions}
                showCategories={true}
                value={searchValues.suggestions || ''}
                onChange={(value) => handleSearchChange('suggestions', value)}
                onSearch={(value) => handleSearch('suggestions', value)}
                onSuggestionSelect={(suggestion) => {
                  handleSearchChange('suggestions', suggestion.text);
                  console.log('Selected suggestion:', suggestion);
                }}
              />
            </div>
          </div>

          {/* Sticky Search Bar */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sticky Search Bar</h2>
            <p className="text-gray-600 mb-6">Search bar that sticks to top when scrolling</p>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">
                Scroll down to see the sticky search bar appear at the top
              </p>
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Scroll content area</p>
              </div>
            </div>
            <StickySearchBar
              placeholder="Sticky search..."
              showOnScroll={true}
              scrollThreshold={100}
              value={searchValues.sticky || ''}
              onChange={(value) => handleSearchChange('sticky', value)}
              onSearch={(value) => handleSearch('sticky', value)}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default SearchGallery; 