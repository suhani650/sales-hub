import {
  FaShoppingCart,
  FaRupeeSign,
  FaEye,
  FaHeart,
  FaPercentage,
  FaChartLine,
  FaGlobeAsia,
  FaBoxOpen,
  FaArrowTrendUp,
  FaCalendarAlt,
} from "react-icons/fa6";

export default function SalesAnalytics({ product }) {
  const {
    orders = 0,
    revenue = 0,
    views = 0,
    wishlist = 0,
    soldQuantity = 0,
    conversionRate = 0,
    growth = 0,
    bestMonth = "N/A",
    topRegions = [
      {
        name: "Delhi",
        sales: 420,
      },
      {
        name: "Mumbai",
        sales: 385,
      },
      {
        name: "Bangalore",
        sales: 310,
      },
      {
        name: "Hyderabad",
        sales: 260,
      },
    ],
  } = product;

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Sales Analytics</h2>

            <p className="text-gray-500 mt-1">Product performance insights</p>
          </div>

          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            Live Analytics
          </div>
        </div>
      </div>

      {/* KPI Cards */}

      <div className="grid lg:grid-cols-3 xl:grid-cols-6 md:grid-cols-2 gap-5">
        <StatCard
          title="Orders"
          value={orders}
          icon={<FaShoppingCart />}
          color="blue"
        />

        <StatCard
          title="Revenue"
          value={`₹${revenue}`}
          icon={<FaRupeeSign />}
          color="green"
        />

        <StatCard title="Views" value={views} icon={<FaEye />} color="purple" />

        <StatCard
          title="Wishlist"
          value={wishlist}
          icon={<FaHeart />}
          color="pink"
        />

        <StatCard
          title="Units Sold"
          value={soldQuantity}
          icon={<FaBoxOpen />}
          color="orange"
        />

        <StatCard
          title="Conversion"
          value={`${conversionRate}%`}
          icon={<FaPercentage />}
          color="indigo"
        />
      </div>

      {/* Analytics Grid */}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales Chart */}

        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Monthly Sales</h3>

            <FaChartLine className="text-blue-600 text-2xl" />
          </div>

          <div className="h-80 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
            📈 Monthly Sales Chart
            <br />
            (Chart.js / Recharts Ready)
          </div>
        </div>

        {/* Growth */}

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-lg mb-6">Growth</h3>

          <div className="flex justify-center">
            <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center">
              <FaArrowTrendUp className="text-5xl text-green-600" />
            </div>
          </div>

          <h2 className="text-5xl font-bold text-center mt-6 text-green-600">
            {growth}%
          </h2>

          <p className="text-center text-gray-500 mt-2">Monthly Growth</p>

          <div className="mt-8">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{
                  width: `${Math.min(growth, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Regions */}

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <FaGlobeAsia className="text-blue-600 text-xl" />

            <h3 className="font-bold text-lg">Top Selling Regions</h3>
          </div>

          <div className="space-y-5">
            {topRegions.map((region, index) => (
              <div
                key={region.name}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>
                    <h4 className="font-semibold">{region.name}</h4>

                    <p className="text-sm text-gray-500">
                      {region.sales} Orders
                    </p>
                  </div>
                </div>

                <div className="font-bold text-blue-600">#{index + 1}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold text-lg mb-6">Performance Summary</h3>

          <div className="space-y-5">
            <SummaryRow
              icon={<FaShoppingCart />}
              label="Total Orders"
              value={orders}
            />

            <SummaryRow
              icon={<FaRupeeSign />}
              label="Revenue"
              value={`₹${revenue}`}
            />

            <SummaryRow
              icon={<FaPercentage />}
              label="Conversion Rate"
              value={`${conversionRate}%`}
            />

            <SummaryRow
              icon={<FaCalendarAlt />}
              label="Best Month"
              value={bestMonth}
            />

            <SummaryRow
              icon={<FaArrowTrendUp />}
              label="Growth"
              value={`${growth}%`}
              success
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    pink: "bg-pink-100 text-pink-600",
    orange: "bg-orange-100 text-orange-600",
    indigo: "bg-indigo-100 text-indigo-600",
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

function SummaryRow({ icon, label, value, success }) {
  return (
    <div className="flex justify-between items-center border-b pb-3">
      <div className="flex items-center gap-3">
        <div
          className={`text-xl ${success ? "text-green-600" : "text-blue-600"}`}
        >
          {icon}
        </div>

        <span className="text-gray-600">{label}</span>
      </div>

      <span className={`font-bold ${success ? "text-green-600" : ""}`}>
        {value}
      </span>
    </div>
  );
}
