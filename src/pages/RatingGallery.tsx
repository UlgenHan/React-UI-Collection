import React, { useState } from 'react';
import { useNavigation } from '../App';
import {
  BasicRating,
  ReadOnlyRating,
  HalfStarRating,
  ColorfulRating,
  TextWithRating,
  CompactRating,
  CustomIconsRating,
  AnimatedRating,
  ClickableStarsRating,
  ReviewRating
} from '../components/ui/inputs/rating';

const RatingGallery: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [ratings, setRatings] = useState<Record<string, number>>({
    basic: 3,
    half: 3.5,
    colorful: 4,
    text: 2,
    compact: 5,
    hearts: 3,
    animated: 4,
    clickable: 2,
  });

  const handleRatingChange = (key: string, value: number) => {
    setRatings(prev => ({ ...prev, [key]: value }));
  };

  const handleReviewSubmit = async (rating: number, review?: string) => {
    console.log('Review submitted:', { rating, review });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

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
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Rating Components</h1>
              <p className="text-gray-600 mt-1">Various star rating components for user feedback</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          
          {/* Basic Rating */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Rating</h2>
            <p className="text-gray-600 mb-6">Interactive 5-star rating selector</p>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-500">Small</p>
                <BasicRating
                  size="sm"
                  value={ratings.basic}
                  onChange={(value) => handleRatingChange('basic', value)}
                />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-500">Medium</p>
                <BasicRating
                  size="md"
                  value={ratings.basic}
                  onChange={(value) => handleRatingChange('basic', value)}
                />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-500">Large</p>
                <BasicRating
                  size="lg"
                  value={ratings.basic}
                  onChange={(value) => handleRatingChange('basic', value)}
                />
              </div>
              <p className="text-sm text-gray-600">Current rating: {ratings.basic}/5</p>
            </div>
          </div>

          {/* Read Only Rating */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Read Only Rating</h2>
            <p className="text-gray-600 mb-6">Display rating without interaction</p>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <ReadOnlyRating value={4.2} showValue={false} />
                <p className="text-sm text-gray-500">Without value text</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <ReadOnlyRating value={3.8} showValue={true} />
                <p className="text-sm text-gray-500">With value text</p>
              </div>
            </div>
          </div>

          {/* Half Star Rating */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Half Star Rating</h2>
            <p className="text-gray-600 mb-6">Rating with half-star increments</p>
            <div className="flex flex-col items-center space-y-4">
              <HalfStarRating
                value={ratings.half}
                onChange={(value) => handleRatingChange('half', value)}
                allowHalf={true}
              />
              <p className="text-sm text-gray-600">Current rating: {ratings.half}/5</p>
            </div>
          </div>

          {/* Colorful Rating */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Colorful Rating</h2>
            <p className="text-gray-600 mb-6">Rating with different color schemes</p>
            <div className="flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-500">Default</p>
                <ColorfulRating
                  colorScheme="default"
                  value={ratings.colorful}
                  onChange={(value) => handleRatingChange('colorful', value)}
                />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-500">Rainbow</p>
                <ColorfulRating
                  colorScheme="rainbow"
                  value={ratings.colorful}
                  onChange={(value) => handleRatingChange('colorful', value)}
                />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-500">Warm</p>
                <ColorfulRating
                  colorScheme="warm"
                  value={ratings.colorful}
                  onChange={(value) => handleRatingChange('colorful', value)}
                />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-500">Cool</p>
                <ColorfulRating
                  colorScheme="cool"
                  value={ratings.colorful}
                  onChange={(value) => handleRatingChange('colorful', value)}
                />
              </div>
            </div>
          </div>

          {/* Text With Rating */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Text With Rating</h2>
            <p className="text-gray-600 mb-6">Rating with descriptive text</p>
            <div className="flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-500">Text on Right</p>
                <TextWithRating
                  value={ratings.text}
                  onChange={(value) => handleRatingChange('text', value)}
                  textPosition="right"
                />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-500">Text on Left</p>
                <TextWithRating
                  value={ratings.text}
                  onChange={(value) => handleRatingChange('text', value)}
                  textPosition="left"
                />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-500">Text Below</p>
                <TextWithRating
                  value={ratings.text}
                  onChange={(value) => handleRatingChange('text', value)}
                  textPosition="bottom"
                />
              </div>
            </div>
          </div>

          {/* Compact Rating */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Compact Rating</h2>
            <p className="text-gray-600 mb-6">Small inline rating for lists and cards</p>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Product A</span>
                <CompactRating
                  value={ratings.compact}
                  onChange={(value) => handleRatingChange('compact', value)}
                  showValue={true}
                />
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Product B</span>
                <CompactRating
                  value={4}
                  readOnly={true}
                  showValue={true}
                />
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Product C</span>
                <CompactRating
                  value={3}
                  readOnly={true}
                  showValue={false}
                />
              </div>
            </div>
          </div>

          {/* Custom Icons Rating */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Custom Icons Rating</h2>
            <p className="text-gray-600 mb-6">Rating with custom icons instead of stars</p>
            <div className="flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-500">Hearts</p>
                <CustomIconsRating
                  icon="heart"
                  value={ratings.hearts}
                  onChange={(value) => handleRatingChange('hearts', value)}
                />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-500">Thumbs Up</p>
                <CustomIconsRating
                  icon="thumb"
                  value={3}
                  readOnly={true}
                />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-500">Fire</p>
                <CustomIconsRating
                  icon="fire"
                  value={4}
                  readOnly={true}
                />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-500">Diamond</p>
                <CustomIconsRating
                  icon="diamond"
                  value={5}
                  readOnly={true}
                />
              </div>
            </div>
          </div>

          {/* Animated Rating */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Animated Rating</h2>
            <p className="text-gray-600 mb-6">Rating with animations on interaction</p>
            <div className="flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-500">Bounce Animation</p>
                <AnimatedRating
                  animation="bounce"
                  value={ratings.animated}
                  onChange={(value) => handleRatingChange('animated', value)}
                />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-500">Scale Animation</p>
                <AnimatedRating
                  animation="scale"
                  value={ratings.animated}
                  onChange={(value) => handleRatingChange('animated', value)}
                />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-500">Pulse Animation</p>
                <AnimatedRating
                  animation="pulse"
                  value={ratings.animated}
                  onChange={(value) => handleRatingChange('animated', value)}
                />
              </div>
            </div>
          </div>

          {/* Clickable Stars Rating */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Clickable Stars Rating</h2>
            <p className="text-gray-600 mb-6">Rating with custom click callbacks and clear option</p>
            <div className="flex flex-col items-center space-y-4">
              <ClickableStarsRating
                value={ratings.clickable}
                onChange={(value) => handleRatingChange('clickable', value)}
                onStarClick={(starIndex, currentValue) => {
                  console.log(`Clicked star ${starIndex + 1}, new value: ${currentValue}`);
                }}
                onStarHover={(starIndex) => {
                  console.log(`Hovering star ${starIndex + 1}`);
                }}
                allowClear={true}
              />
              <p className="text-sm text-gray-600">
                Current rating: {ratings.clickable}/5 
                {ratings.clickable > 0 && ' (Click same star to clear)'}
              </p>
            </div>
          </div>

          {/* Review Rating */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Rating</h2>
            <p className="text-gray-600 mb-6">Complete review form with rating and text</p>
            <div className="max-w-md mx-auto">
              <ReviewRating
                required={true}
                showReviewText={true}
                onSubmit={handleReviewSubmit}
                labels={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}
                submitButtonText="Submit Review"
                reviewPlaceholder="Tell us about your experience..."
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RatingGallery; 