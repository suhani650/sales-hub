import { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaFileExport,
  FaFileImport,
  FaSyncAlt,
  FaFilter,
  FaThLarge,
  FaList,
  FaSortAmountDown,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductToolbar({
  filters = {},
  onFilterChange = () => {},
  onSearch = () => {},
  onRefresh = () => {},
  onExportExcel = () => {},
  onExportPDF = () => {},
  onImport = () => {},
  view = "table",
  onViewChange = () => {},
}) {
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Shoes",
    "Mobiles",
    "Accessories",
    "Home",
  ];

  const brands = ["All", "Apple", "Samsung", "Nike", "Adidas", "Sony", "Boat"];

  const statuses = [
    "All",
    "Approved",
    "Pending",
    "Rejected",
    "Draft",
    "Blocked",
  ];

  return (
    <div className="bg-white rounded-xl shadow border">
      {/* Top Toolbar */}

      <div className="p-5 flex flex-col xl:flex-row gap-4 justify-between">
        {/* Search */}

        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 border rounded-lg"
            value={filters.search || ""}
            onChange={(e) => {
              onSearch(e.target.value);

              onFilterChange({
                ...filters,
                search: e.target.value,
              });
            }}
          />
        </div>

        {/* Right Buttons */}

        <div className="flex flex-wrap gap-3">
          <Link
            to="/seller/products/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
          >
            <FaPlus />
            Add Product
          </Link>

          <button
            onClick={onImport}
            className="border px-4 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-50"
          >
            <FaFileImport />
            Import
          </button>

          <button
            onClick={onExportExcel}
            className="border px-4 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-50"
          >
            <FaFileExport />
            Excel
          </button>

          <button
            onClick={onExportPDF}
            className="border px-4 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-50"
          >
            PDF
          </button>

          <button
            onClick={onRefresh}
            className="border p-3 rounded-lg hover:bg-gray-50"
          >
            <FaSyncAlt />
          </button>
        </div>
      </div>

      {/* Filter Toggle */}

      <div className="px-5 pb-4 flex justify-between items-center">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-blue-600"
        >
          <FaFilter />
          Advanced Filters
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => onViewChange("table")}
            className={`p-3 rounded-lg ${
              view === "table" ? "bg-blue-600 text-white" : "border"
            }`}
          >
            <FaList />
          </button>

          <button
            onClick={() => onViewChange("grid")}
            className={`p-3 rounded-lg ${
              view === "grid" ? "bg-blue-600 text-white" : "border"
            }`}
          >
            <FaThLarge />
          </button>
        </div>
      </div>

      {/* Filters */}

      {showFilters && (
        <div className="border-t p-5 bg-gray-50">
          <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-5">
            {/* Category */}

            <div>
              <label className="font-semibold">Category</label>

              <select
                value={filters.category || "All"}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    category: e.target.value,
                  })
                }
                className="w-full mt-2 border rounded-lg p-3"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand */}

            <div>
              <label className="font-semibold">Brand</label>

              <select
                value={filters.brand || "All"}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    brand: e.target.value,
                  })
                }
                className="w-full mt-2 border rounded-lg p-3"
              >
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}

            <div>
              <label className="font-semibold">Status</label>

              <select
                value={filters.status || "All"}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    status: e.target.value,
                  })
                }
                className="w-full mt-2 border rounded-lg p-3"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}

            <div>
              <label className="font-semibold">Sort By</label>

              <select className="w-full mt-2 border rounded-lg p-3">
                <option>Newest</option>
                <option>Oldest</option>
                <option>Price Low → High</option>
                <option>Price High → Low</option>
                <option>Stock</option>
                <option>Sales</option>
                <option>Rating</option>
              </select>
            </div>

            {/* Reset */}

            <div className="flex items-end">
              <button
                onClick={() => onFilterChange({})}
                className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg py-3 flex items-center justify-center gap-2"
              >
                <FaTimes />
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Info */}

      <div className="border-t px-5 py-4 flex justify-between items-center text-sm text-gray-500">
        <div>Showing Products based on applied filters</div>

        <div className="flex items-center gap-2">
          <FaSortAmountDown />
          Sort & Filter Enabled
        </div>
      </div>
    </div>
  );
}
