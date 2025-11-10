
interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalCount: number;
};

const Pagination = ({ page, setPage, totalCount }: PaginationProps) => {
  return (
    <div className="flex space-x-4 justify-center mt-4">
      <button disabled={page === 0} className="bg-green-900 text-white px-4 py-2 rounded mt-4 ml-4 mb-4 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed" onClick={() => setPage(page > 0 ? page - 1 : 0)}>−</button>
      <span className="self-center text-green-900">Page {page + 1}</span>
      <button disabled={totalCount < (page + 1) * 10} className="bg-green-900 text-white px-4 py-2 rounded mt-4 mb-4 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed" onClick={() => setPage(page + 1)}>+</button>
    </div>
  );
};

export default Pagination;
