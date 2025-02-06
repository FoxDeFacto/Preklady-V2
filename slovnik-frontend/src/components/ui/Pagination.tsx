import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationMeta } from '@/lib/types';

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

const Pagination = ({ meta, onPageChange }: PaginationProps) => {
  const { page, pageCount } = meta;

  const renderPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(pageCount, page + 2);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < pageCount) {
      if (endPage < pageCount - 1) {
        pages.push('...');
      }
      pages.push(pageCount);
    }

    return pages.map((pageNum, index) => {
      if (pageNum === '...') {
        return (
          <span
            key={`ellipsis-${index}`}
            className="px-3 py-2 text-gray-500"
          >
            ...
          </span>
        );
      }

      return (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum as number)}
          className={`px-3 py-2 rounded-md ${
            pageNum === page
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {pageNum}
        </button>
      );
    });
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`p-2 rounded-md ${
          page === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex items-center space-x-1">
        {renderPageNumbers()}
      </div>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount}
        className={`p-2 rounded-md ${
          page === pageCount
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;