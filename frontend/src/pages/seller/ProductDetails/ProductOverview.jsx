import {
  FaBoxOpen,
  FaTag,
  FaBarcode,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaPauseCircle,
  FaEye,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";

export default function ProductOverview({ product }) {
  const statusColors = {
    ACTIVE: "bg-green-100 text-green-700",
    DRAFT: "bg-yellow-100 text-yellow-700",
    PENDING: "bg-orange-100 text-orange-700",
    REJECTED: "bg-red-100 text-red-700",
    ARCHIVED: "bg-gray-100 text-gray-700",
  };

  const statusIcons = {
    ACTIVE: <FaCheckCircle />,
    DRAFT: <FaPauseCircle />,
    PENDING: <FaClock />,
    REJECTED: <FaTimesCircle />,
    ARCHIVED: <FaPauseCircle />,
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image */}

        <div className="w-full lg:w-80 flex-shrink-0">
          <img
            src={
              product.thumbnail ||
              "https://via.placeholder.com/500x500?text=Product"
            }
            alt={product.name}
            className="w-full h-80 object-cover rounded-xl border"
          />
        </div>

        {/* Details */}

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                statusColors[product.status] || "bg-gray-100 text-gray-700"
              }`}
            >
              {statusIcons[product.status]}
              {product.status || "ACTIVE"}
            </span>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
              {product.category}
            </span>

            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm">
              {product.brand}
            </span>
          </div>

          <h1 className="text-4xl font-bold mt-5">{product.name}</h1>

          <p className="text-gray-500 mt-4 leading-7">{product.description}</p>

          {/* Product Info */}

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
            <InfoCard icon={<FaBoxOpen />} label="SKU" value={product.sku} />

            <InfoCard
              icon={<FaBarcode />}
              label="Barcode"
              value={product.barcode || "-"}
            />

            <InfoCard icon={<FaTag />} label="Brand" value={product.brand} />

            <InfoCard
              icon={<FaCalendarAlt />}
              label="Created"
              value={product.createdAt}
            />

            <InfoCard
              icon={<FaClock />}
              label="Updated"
              value={product.updatedAt}
            />

            <InfoCard
              icon={<FaShoppingCart />}
              label="Orders"
              value={product.orders || 0}
            />
          </div>

          {/* Stats */}

          <div className="grid grid-cols-3 gap-5 mt-8">
            <StatCard
              icon={<FaEye />}
              value={product.views || 0}
              label="Views"
              color="text-blue-600"
            />

            <StatCard
              icon={<FaHeart />}
              value={product.wishlist || 0}
              label="Wishlist"
              color="text-pink-600"
            />

            <StatCard
              icon={<FaShoppingCart />}
              value={product.sales || 0}
              label="Sales"
              color="text-green-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="border rounded-xl p-4">
      <div className="flex items-center gap-3 text-blue-600 text-lg">
        {icon}

        <span className="font-semibold">{label}</span>
      </div>

      <p className="mt-3 text-gray-700 font-medium break-all">{value || "-"}</p>
    </div>
  );
}

function StatCard({ icon, value, label, color }) {
  return (
    <div className="bg-gray-50 rounded-xl p-5 text-center border">
      <div className={`text-3xl mb-3 flex justify-center ${color}`}>{icon}</div>

      <h3 className="text-2xl font-bold">{value}</h3>

      <p className="text-gray-500 mt-1">{label}</p>
    </div>
  );
}
