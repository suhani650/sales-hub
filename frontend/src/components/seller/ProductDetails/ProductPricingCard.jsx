import {
  FaRupeeSign,
  FaPercentage,
  FaChartLine,
  FaMoneyBillWave,
  FaReceipt,
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
} from "react-icons/fa";

export default function ProductPricingCard({ product }) {
  const {
    price = 0,
    salePrice = 0,
    costPrice = 0,
    gst = 18,
    revenue = 0,
    lastPriceUpdate = "N/A",
  } = product;

  const discount =
    price > 0 && salePrice > 0
      ? Math.round(((price - salePrice) / price) * 100)
      : 0;

  const sellingPrice = salePrice || price;

  const profit = sellingPrice - costPrice;

  const profitMargin =
    sellingPrice > 0 ? ((profit / sellingPrice) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Pricing Analytics</h2>

            <p className="text-gray-500 mt-1">Complete pricing overview</p>
          </div>

          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            Live Pricing
          </div>
        </div>
      </div>

      {/* KPI Cards */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
        <Card
          icon={<FaRupeeSign />}
          title="Selling Price"
          value={`₹${sellingPrice}`}
          color="blue"
        />

        <Card
          icon={<FaMoneyBillWave />}
          title="Cost Price"
          value={`₹${costPrice}`}
          color="orange"
        />

        <Card
          icon={<FaPercentage />}
          title="Discount"
          value={`${discount}%`}
          color="green"
        />

        <Card
          icon={<FaReceipt />}
          title="GST"
          value={`${gst}%`}
          color="purple"
        />
      </div>

      {/* Analytics */}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Price Breakdown */}

        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-5">Price Breakdown</h3>

          <div className="space-y-4">
            <Row label="MRP" value={`₹${price}`} />

            <Row label="Sale Price" value={`₹${salePrice}`} />

            <Row label="Cost Price" value={`₹${costPrice}`} />

            <Row label="GST" value={`${gst}%`} />

            <hr />

            <Row label="Profit" value={`₹${profit}`} highlight={profit >= 0} />
          </div>
        </div>

        {/* Profit */}

        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-6">Profit Analysis</h3>

          <div className="text-center">
            <div
              className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${
                profit >= 0 ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {profit >= 0 ? (
                <FaArrowUp className="text-4xl text-green-600" />
              ) : (
                <FaArrowDown className="text-4xl text-red-600" />
              )}
            </div>

            <h2 className="text-4xl font-bold mt-6">₹{profit}</h2>

            <p className="text-gray-500 mt-2">Estimated Profit</p>

            <div className="mt-6">
              <div className="w-full bg-gray-200 h-4 rounded-full">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{
                    width: `${Math.min(profitMargin, 100)}%`,
                  }}
                />
              </div>

              <p className="mt-3 font-semibold">{profitMargin}% Margin</p>
            </div>
          </div>
        </div>

        {/* Revenue */}

        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-5">Revenue</h3>

          <div className="space-y-6">
            <div>
              <p className="text-gray-500">Total Revenue</p>

              <h2 className="text-4xl font-bold text-green-600 mt-2">
                ₹{revenue}
              </h2>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <FaCalendarAlt />

              <span>Last Updated</span>
            </div>

            <p className="font-semibold">{lastPriceUpdate}</p>
          </div>
        </div>
      </div>

      {/* Price Trend */}

      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">Price Trend</h3>

          <FaChartLine className="text-blue-600 text-2xl" />
        </div>

        <div className="h-56 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-400">
          📈 Price Trend Chart
          <br />
          (Chart.js / Recharts API Ready)
        </div>
      </div>
    </div>
  );
}

function Card({ icon, title, value, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6">
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

      <span className={`font-semibold ${highlight ? "text-green-600" : ""}`}>
        {value}
      </span>
    </div>
  );
}
