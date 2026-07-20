import {
  FaTimes,
  FaEdit,
  FaTrash,
  FaCopy,
  FaCheckCircle,
  FaClock,
  FaStar,
  FaBoxOpen,
  FaWarehouse,
  FaShippingFast,
  FaTag,
  FaRupeeSign,
  FaLayerGroup,
} from "react-icons/fa";

export default function ProductDrawer({
  open,
  product,
  onClose,
  onEdit,
  onDelete,
  onDuplicate,
}) {
  if (!open || !product) return null;

  const variants = product.variants || [];
  const images = product.images || [product.image];

  return (
    <>
      {/* Backdrop */}

      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Drawer */}

      <div className="fixed top-0 right-0 w-full md:w-[650px] h-screen bg-white shadow-2xl z-50 overflow-y-auto">
        {/* Header */}

        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Product Details</h2>

            <p className="text-gray-500">#{product.id}</p>
          </div>

          <button onClick={onClose} className="text-2xl">
            <FaTimes />
          </button>
        </div>

        {/* Images */}

        <div className="p-6">
          <img
            src={images[0]}
            alt=""
            className="w-full h-80 rounded-xl object-cover border"
          />

          <div className="grid grid-cols-4 gap-3 mt-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                className="h-20 w-full rounded-lg border object-cover cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}

        <div className="px-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>

            <p className="text-gray-500 mt-2">
              {product.description || "No description available"}
            </p>
          </div>

          {/* Price */}

          <div className="grid grid-cols-2 gap-5">
            <div className="bg-blue-50 rounded-xl p-5">
              <div className="flex items-center gap-2">
                <FaRupeeSign />
                Price
              </div>

              <h2 className="text-3xl font-bold mt-2">₹{product.price}</h2>
            </div>

            <div className="bg-green-50 rounded-xl p-5">
              <div className="flex items-center gap-2">
                <FaBoxOpen />
                Stock
              </div>

              <h2 className="text-3xl font-bold mt-2">{product.stock}</h2>
            </div>
          </div>

          {/* Information */}

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-5">Product Information</h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>SKU</span>
                <strong>{product.sku}</strong>
              </div>

              <div className="flex justify-between">
                <span>Brand</span>
                <strong>{product.brand}</strong>
              </div>

              <div className="flex justify-between">
                <span>Category</span>
                <strong>{product.category}</strong>
              </div>

              <div className="flex justify-between">
                <span>Status</span>

                <span className="text-green-600 flex items-center gap-2">
                  <FaCheckCircle />

                  {product.status}
                </span>
              </div>
            </div>
          </div>

          {/* Analytics */}

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-5">Sales Analytics</h3>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-gray-500">Sales</p>

                <h2 className="text-2xl font-bold">{product.sales}</h2>
              </div>

              <div>
                <p className="text-gray-500">Rating</p>

                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FaStar className="text-yellow-400" />

                  {product.rating}
                </h2>
              </div>
            </div>
          </div>

          {/* Variants */}

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
              <FaLayerGroup />
              Variants
            </h3>

            {variants.length === 0 ? (
              <p>No Variants</p>
            ) : (
              <div className="space-y-3">
                {variants.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg p-4 flex justify-between"
                  >
                    <div>
                      <h4 className="font-semibold">
                        {item.color} / {item.size}
                      </h4>

                      <p className="text-sm text-gray-500">SKU : {item.sku}</p>
                    </div>

                    <div className="text-right">
                      <h4 className="font-bold">₹{item.price}</h4>

                      <p>Stock : {item.stock}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Shipping */}

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
              <FaShippingFast />
              Shipping
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Weight</span>
                <strong>{product.weight || 0} KG</strong>
              </div>

              <div className="flex justify-between">
                <span>Warehouse</span>
                <strong>{product.warehouse || "Main Warehouse"}</strong>
              </div>

              <div className="flex justify-between">
                <span>Shipping Class</span>
                <strong>{product.shippingClass || "Standard"}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="sticky bottom-0 bg-white border-t p-6">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={onEdit}
              className="bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <FaEdit />
              Edit
            </button>

            <button
              onClick={onDuplicate}
              className="bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <FaCopy />
              Duplicate
            </button>

            <button
              onClick={onDelete}
              className="bg-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <FaTrash />
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
