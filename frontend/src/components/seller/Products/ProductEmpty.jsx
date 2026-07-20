import {
  FaBoxOpen,
  FaPlus,
  FaSyncAlt,
  FaFileImport,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductEmpty({
  title = "No Products Found",
  message = "You haven't added any products yet. Start by creating your first product.",
  onRefresh = () => {},
  onImport = () => {},
  onClearFilters = () => {},
}) {
  return (
    <div className="bg-white rounded-2xl shadow border">
      <div className="py-20 px-8 text-center">
        {/* Icon */}

        <div className="mx-auto w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center">
          <FaBoxOpen size={60} className="text-blue-600" />
        </div>

        {/* Heading */}

        <h2 className="mt-8 text-3xl font-bold text-gray-800">{title}</h2>

        <p className="mt-4 max-w-2xl mx-auto text-gray-500">{message}</p>

        {/* Buttons */}

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link
            to="/seller/products/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
          >
            <FaPlus />
            Add First Product
          </Link>

          <button
            onClick={onImport}
            className="border px-6 py-3 rounded-xl hover:bg-gray-100 flex items-center gap-2 transition"
          >
            <FaFileImport />
            Import Products
          </button>

          <button
            onClick={onRefresh}
            className="border px-6 py-3 rounded-xl hover:bg-gray-100 flex items-center gap-2 transition"
          >
            <FaSyncAlt />
            Refresh
          </button>

          <button
            onClick={onClearFilters}
            className="border px-6 py-3 rounded-xl hover:bg-gray-100 flex items-center gap-2 transition"
          >
            <FaSearch />
            Clear Filters
          </button>
        </div>

        {/* Tips */}

        <div className="mt-14 max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="border rounded-xl p-6">
            <h3 className="font-bold text-lg">📦 Add Products</h3>

            <p className="text-gray-500 mt-2">
              Create products with images, pricing, inventory, SKU, variants and
              specifications.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="font-bold text-lg">🛒 Start Selling</h3>

            <p className="text-gray-500 mt-2">
              After admin approval, your products become available to customers.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="font-bold text-lg">📈 Track Performance</h3>

            <p className="text-gray-500 mt-2">
              Monitor sales, inventory, earnings, reviews, and analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
