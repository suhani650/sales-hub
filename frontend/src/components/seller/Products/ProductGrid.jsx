import {
  FaEye,
  FaEdit,
  FaTrash,
  FaCopy,
  FaStar,
  FaBoxOpen,
  FaCheckCircle,
  FaHeart,
} from "react-icons/fa";
import StatusBadge from "./StatusBadge";

export default function ProductGrid({
  products = [],
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onDuplicate = () => {},
}) {
  if (!products.length) {
    return (
      <div className="bg-white rounded-xl shadow border p-16 text-center">
        <FaBoxOpen className="mx-auto text-6xl text-gray-300 mb-5" />
        <h2 className="text-2xl font-bold">No Products Found</h2>
        <p className="text-gray-500 mt-2">
          Start by adding your first product.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
          {/* Image */}

          <div className="relative h-56 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />

            <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow">
              <FaHeart className="text-red-500" />
            </button>

            <div className="absolute top-3 left-3">
              <StatusBadge status={product.status} />
            </div>
          </div>

          {/* Content */}

          <div className="p-5">
            <h3 className="font-bold text-lg line-clamp-1">{product.name}</h3>

            <p className="text-gray-500 text-sm mt-1">{product.category}</p>

            <div className="flex justify-between mt-4">
              <div>
                <p className="text-xs text-gray-400">Price</p>

                <h3 className="font-bold text-blue-600">₹{product.price}</h3>
              </div>

              <div>
                <p className="text-xs text-gray-400">Stock</p>

                <h3
                  className={`font-bold ${
                    product.stock <= 10 ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {product.stock}
                </h3>
              </div>
            </div>

            {/* Rating */}

            <div className="flex justify-between items-center mt-5">
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span>{product.rating}</span>
              </div>

              <div className="flex items-center gap-1 text-green-600">
                <FaCheckCircle />
                <span>{product.sales} Sold</span>
              </div>
            </div>

            {/* Stock Progress */}

            <div className="mt-5">
              <div className="flex justify-between text-xs mb-1">
                <span>Stock</span>
                <span>{product.stock}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  style={{
                    width: `${Math.min(product.stock, 100)}%`,
                  }}
                  className={`h-2 rounded-full ${
                    product.stock <= 10 ? "bg-red-500" : "bg-green-500"
                  }`}
                />
              </div>
            </div>

            {/* Buttons */}

            <div className="grid grid-cols-4 gap-2 mt-6">
              <button
                onClick={() => onView(product)}
                className="bg-blue-100 text-blue-600 rounded-lg p-3 hover:bg-blue-600 hover:text-white transition"
              >
                <FaEye />
              </button>

              <button
                onClick={() => onEdit(product)}
                className="bg-green-100 text-green-600 rounded-lg p-3 hover:bg-green-600 hover:text-white transition"
              >
                <FaEdit />
              </button>

              <button
                onClick={() => onDuplicate(product)}
                className="bg-purple-100 text-purple-600 rounded-lg p-3 hover:bg-purple-600 hover:text-white transition"
              >
                <FaCopy />
              </button>

              <button
                onClick={() => onDelete(product)}
                className="bg-red-100 text-red-600 rounded-lg p-3 hover:bg-red-600 hover:text-white transition"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
