import {
  FaExclamationTriangle,
  FaTrash,
  FaTimes,
  FaArchive,
} from "react-icons/fa";

export default function DeleteDialog({
  open,
  product,
  loading = false,
  onClose,
  onDelete,
  onArchive,
}) {
  if (!open || !product) return null;

  return (
    <>
      {/* Overlay */}

      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />

      {/* Modal */}

      <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden">
          {/* Header */}

          <div className="bg-red-50 border-b p-6 flex items-center gap-4">
            <div className="bg-red-100 p-4 rounded-full">
              <FaExclamationTriangle className="text-red-600" size={28} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">Delete Product</h2>

              <p className="text-gray-500">
                This action cannot be easily undone.
              </p>
            </div>
          </div>

          {/* Product */}

          <div className="p-6">
            <div className="flex gap-5">
              <img
                src={product.image}
                alt={product.name}
                className="w-28 h-28 rounded-xl object-cover border"
              />

              <div className="flex-1">
                <h3 className="text-xl font-bold">{product.name}</h3>

                <p className="text-gray-500 mt-1">SKU : {product.sku}</p>

                <p className="mt-2">
                  Category :<strong> {product.category}</strong>
                </p>

                <p>
                  Brand :<strong> {product.brand}</strong>
                </p>

                <p className="mt-2 text-blue-600 font-bold">₹{product.price}</p>
              </div>
            </div>
          </div>

          {/* Warning */}

          <div className="mx-6 bg-yellow-50 border border-yellow-300 rounded-xl p-5">
            <h4 className="font-bold mb-3">What happens if you delete?</h4>

            <ul className="space-y-2 text-sm text-gray-600 list-disc ml-5">
              <li>Product will disappear from the marketplace.</li>

              <li>Customers cannot purchase this product.</li>

              <li>Product analytics remain available in reports.</li>

              <li>Existing completed orders remain unchanged.</li>

              <li>You can archive instead of permanently deleting.</li>
            </ul>
          </div>

          {/* Actions */}

          <div className="p-6 flex flex-wrap justify-end gap-4">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 rounded-lg border flex items-center gap-2 hover:bg-gray-50"
            >
              <FaTimes />
              Cancel
            </button>

            <button
              onClick={onArchive}
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2"
            >
              <FaArchive />
              Archive Product
            </button>

            <button
              disabled={loading}
              onClick={onDelete}
              className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
            >
              <FaTrash />

              {loading ? "Deleting..." : "Delete Permanently"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
