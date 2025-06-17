import React, { useState } from 'react';
import {
  BasicPagination,
  CompactPagination,
  EllipsisPagination,
  IconPagination,
  RoundedPagination,
  BorderedPagination,
  InputPagination,
  PaginationWithSummary,
  StickyFooterPagination,
  AnimatedPagination
} from '../components/ui/pagination';
import { useNavigation } from '../App';

const PaginationGallery: React.FC = () => {
  const { navigateTo } = useNavigation();
  
  // State for different pagination components
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(3);
  const [currentPage3, setCurrentPage3] = useState(5);
  const [currentPage4, setCurrentPage4] = useState(2);
  const [currentPage5, setCurrentPage5] = useState(1);
  const [currentPage6, setCurrentPage6] = useState(4);
  const [currentPage7, setCurrentPage7] = useState(1);
  const [currentPage8, setCurrentPage8] = useState(1);
  const [currentPage9, setCurrentPage9] = useState(2);
  const [currentPage10, setCurrentPage10] = useState(1);

  const totalPages = 10;
  const totalItems = 150;
  const itemsPerPage = 15;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateTo('home')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Gallery
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Pagination Components</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
          
          {/* Basic Pagination */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Pagination</h2>
            <p className="text-gray-600 mb-6">Previous/Next + page numbers</p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <BasicPagination
                currentPage={currentPage1}
                totalPages={totalPages}
                onPageChange={setCurrentPage1}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Current page: {currentPage1}</p>
          </section>

          {/* Compact Pagination */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Compact Pagination</h2>
            <p className="text-gray-600 mb-6">Minimal pagination with only arrows and a few page numbers</p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <CompactPagination
                currentPage={currentPage2}
                totalPages={totalPages}
                onPageChange={setCurrentPage2}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Current page: {currentPage2}</p>
          </section>

          {/* Ellipsis Pagination */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Ellipsis Pagination</h2>
            <p className="text-gray-600 mb-6">Collapses long lists with ellipsis (...)</p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <EllipsisPagination
                currentPage={currentPage3}
                totalPages={20}
                onPageChange={setCurrentPage3}
                maxVisiblePages={7}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Current page: {currentPage3} (out of 20 pages)</p>
          </section>

          {/* Icon Pagination */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Icon Pagination</h2>
            <p className="text-gray-600 mb-6">Arrow icons instead of text</p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <IconPagination
                currentPage={currentPage4}
                totalPages={totalPages}
                onPageChange={setCurrentPage4}
                showFirstLast={true}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Current page: {currentPage4}</p>
          </section>

          {/* Rounded Pagination */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Rounded Pagination</h2>
            <p className="text-gray-600 mb-6">Circle buttons for each page</p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <RoundedPagination
                currentPage={currentPage5}
                totalPages={totalPages}
                onPageChange={setCurrentPage5}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Current page: {currentPage5}</p>
          </section>

          {/* Bordered Pagination */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Bordered Pagination</h2>
            <p className="text-gray-600 mb-6">Page buttons with strong border and hover effects</p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <BorderedPagination
                currentPage={currentPage6}
                totalPages={8}
                onPageChange={setCurrentPage6}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Current page: {currentPage6}</p>
          </section>

          {/* Input Pagination */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Input Pagination</h2>
            <p className="text-gray-600 mb-6">Input box to jump to a specific page</p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <InputPagination
                currentPage={currentPage7}
                totalPages={totalPages}
                onPageChange={setCurrentPage7}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Current page: {currentPage7}</p>
          </section>

          {/* Pagination with Summary */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Pagination with Summary</h2>
            <p className="text-gray-600 mb-6">Displays total pages and item range</p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <PaginationWithSummary
                currentPage={currentPage8}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage8}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Current page: {currentPage8}</p>
          </section>

          {/* Sticky Footer Pagination */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sticky Footer Pagination</h2>
            <p className="text-gray-600 mb-6">Pagination bar fixed to bottom of the screen (demo without sticky)</p>
            <div className="border rounded-lg bg-gray-50 overflow-hidden">
              <div className="p-4 h-32 flex items-center justify-center text-gray-500">
                Content area (scroll down to see sticky pagination)
              </div>
              <div className="relative">
                <StickyFooterPagination
                  currentPage={currentPage9}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage9}
                  showSummary={true}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  className="relative"
                />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Current page: {currentPage9}</p>
          </section>

          {/* Animated Pagination */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Animated Pagination</h2>
            <p className="text-gray-600 mb-6">Smooth transitions when switching pages</p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <AnimatedPagination
                currentPage={currentPage10}
                totalPages={totalPages}
                onPageChange={setCurrentPage10}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Current page: {currentPage10}</p>
          </section>

          {/* Usage Examples */}
          <section className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Usage Examples</h2>
            <div className="space-y-4">
              <div className="bg-white rounded p-4">
                <h3 className="font-medium text-gray-900 mb-2">Basic Implementation</h3>
                <pre className="text-sm text-gray-600 bg-gray-100 p-3 rounded overflow-x-auto">
{`import { BasicPagination } from '@/components/ui';

<BasicPagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => setCurrentPage(page)}
/>`}
                </pre>
              </div>
              
              <div className="bg-white rounded p-4">
                <h3 className="font-medium text-gray-900 mb-2">With Summary</h3>
                <pre className="text-sm text-gray-600 bg-gray-100 p-3 rounded overflow-x-auto">
{`import { PaginationWithSummary } from '@/components/ui';

<PaginationWithSummary
  currentPage={1}
  totalPages={10}
  totalItems={150}
  itemsPerPage={15}
  onPageChange={(page) => setCurrentPage(page)}
/>`}
                </pre>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PaginationGallery; 