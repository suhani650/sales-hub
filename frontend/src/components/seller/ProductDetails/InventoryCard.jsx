import {
  FaBoxes,
  FaWarehouse,
  FaLock,
  FaArrowUp,
  FaArrowDown,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaChartLine,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function InventoryCard({ product }) {
  const {
    stock = 0,
    warehouseStock = 0,
    reservedStock = 0,
    soldQuantity = 0,
    reorderLevel = 20,
    lastStockUpdate = "N/A",
  } = product;

  const availableStock = stock - reservedStock;

  const utilization =
    warehouseStock > 0
      ? Math.min((soldQuantity / warehouseStock) * 100, 100)
      : 0;

  const status =
    stock <= 0
      ? "OUT_OF_STOCK"
      : stock <= reorderLevel
        ? "LOW_STOCK"
        : "IN_STOCK";

  const statusConfig = {
    IN_STOCK: {
      color: "bg-green-100 text-green-700",
      icon: <FaCheckCircle />,
      text: "In Stock",
    },
    LOW_STOCK: {
      color: "bg-yellow-100 text-yellow-700",
      icon: <FaExclamationTriangle />,
      text: "Low Stock",
    },
    OUT_OF_STOCK: {
      color: "bg-red-100 text-red-700",
      icon: <FaTimesCircle />,
      text: "Out of Stock",
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white rounded-2xl border shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Inventory Analytics</h2>

          <p className="text-gray-500 mt-1">
            Live warehouse inventory overview
          </p>
        </div>

        <span
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${statusConfig[status].color}`}
        >
          {statusConfig[status].icon}
          {statusConfig[status].text}
        </span>
      </div>

      {/* KPI Cards */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
        <Card
          title="Current Stock"
          value={stock}
          icon={<FaBoxes />}
          color="blue"
        />

        <Card
          title="Warehouse"
          value={warehouseStock}
          icon={<FaWarehouse />}
          color="green"
        />

        <Card
          title="Reserved"
          value={reservedStock}
          icon={<FaLock />}
          color="orange"
        />

        <Card
          title="Sold"
          value={soldQuantity}
          icon={<FaArrowUp />}
          color="purple"
        />
      </div>

      {/* Analytics */}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Stock Summary */}

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-lg mb-5">Stock Summary</h3>

          <div className="space-y-4">
            <Row label="Available Stock" value={availableStock} />

            <Row label="Warehouse" value={warehouseStock} />

            <Row label="Reserved" value={reservedStock} />

            <Row label="Reorder Level" value={reorderLevel} />

            <hr />

            <Row label="Sold Quantity" value={soldQuantity} highlight />
          </div>
        </div>

        {/* Utilization */}

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-lg mb-6">Inventory Utilization</h3>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-blue-100">
              <FaChartLine className="text-5xl text-blue-600" />
            </div>

            <h2 className="text-4xl font-bold mt-6">
              {utilization.toFixed(1)}%
            </h2>

            <p className="text-gray-500 mt-2">Inventory Used</p>

            <div className="w-full bg-gray-200 rounded-full h-4 mt-6">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all"
                style={{
                  width: `${utilization}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Last Update */}

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-lg mb-5">Inventory Details</h3>

          <div className="space-y-6">
            <div>
              <p className="text-gray-500">Last Updated</p>

              <div className="flex items-center gap-3 mt-2">
                <FaCalendarAlt className="text-blue-600" />

                <span className="font-semibold">{lastStockUpdate}</span>
              </div>
            </div>

            <div>
              <p className="text-gray-500">Stock Movement</p>

              <div className="flex items-center gap-2 mt-2 text-green-600 font-semibold">
                <FaArrowUp />
                Incoming +250 Units
              </div>

              <div className="flex items-center gap-2 mt-3 text-red-600 font-semibold">
                <FaArrowDown />
                Outgoing -84 Units
              </div>
            </div>

            <div>
              <p className="text-gray-500">Reorder Status</p>

              <p
                className={`mt-2 font-semibold ${
                  stock <= reorderLevel ? "text-red-600" : "text-green-600"
                }`}
              >
                {stock <= reorderLevel
                  ? "Reorder Required"
                  : "Inventory Healthy"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Trend */}

      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Inventory Trend</h3>

          <FaChartLine className="text-blue-600 text-2xl" />
        </div>

        <div className="h-72 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400">
          📈 Inventory Trend Chart
          <br />
          (Chart.js / Recharts Ready)
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, icon, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${colors[color]}`}
      >
        {icon}
      </div>

      <p className="text-gray-500 mt-5">{title}</p>

      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}

function Row({ label, value, highlight }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-500">{label}</span>

      <span className={`font-semibold ${highlight ? "text-blue-600" : ""}`}>
        {value}
      </span>
    </div>
  );
}
