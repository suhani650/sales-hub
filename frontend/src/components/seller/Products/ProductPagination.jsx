import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function ProductPagination({
  currentPage = 1,
  totalPages = 10,
  totalRecords = 250,
  pageSize = 10,
  onPageChange = () => {},
  onPageSizeChange = () => {},
}) {
  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalRecords);

  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm p-5 mt-6">
      {/* Top */}

      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-600">
          Showing
          <span className="font-semibold mx-1">{startRecord}</span>-
          <span className="font-semibold mx-1">{endRecord}</span>
          of
          <span className="font-semibold mx-1">{totalRecords}</span>
          Products
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm">Rows per page</span>

          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="border rounded-lg px-3 py-2"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* Bottom */}

      <div className="flex flex-wrap justify-center lg:justify-between items-center gap-5 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center gap-2 border px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-100"
        >
          <FaAngleLeft />
          Previous
        </button>

        <div className="flex flex-wrap justify-center gap-2">
          {getPages().map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-4 py-2">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 rounded-lg transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "border hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center gap-2 border px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-100"
        >
          Next
          <FaAngleRight />
        </button>
      </div>

      {/* Jump to page */}

      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-3">
          <span className="text-sm">Go to page</span>

          <input
            type="number"
            min={1}
            max={totalPages}
            className="border rounded-lg w-20 px-3 py-2 text-center"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const page = Number(e.target.value);

                if (page >= 1 && page <= totalPages) {
                  onPageChange(page);
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
