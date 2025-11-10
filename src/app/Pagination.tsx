
interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalCount: number;
};

const Pagination = ({ page, setPage, totalCount }: PaginationProps) => {
  const isFirstPage = page === 0;
  const isLastPage = totalCount < (page + 1) * 10;
  const totalPages = Math.ceil(totalCount / 10);
  return (
    <div className="flex space-x-4 justify-center mt-4" role="navigation">
      <button 
        disabled={isFirstPage} 
        className="bg-green-900 text-white px-4 py-2 rounded mt-4 ml-4 mb-4 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed" 
        onClick={() => setPage(page - 1)}
        aria-label="Previous page"
        aria-disabled={isFirstPage}
      >
        Previous
      </button>
      <span className="self-center text-green-900" aria-current="page" role="status">
        Page {page + 1} of {totalPages}
      </span>
      <button 
        disabled={isLastPage} 
        className="bg-green-900 text-white px-4 py-2 rounded mt-4 mb-4 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed" 
        onClick={() => setPage(page + 1)}
        aria-label="Next page"
        aria-disabled={isLastPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
