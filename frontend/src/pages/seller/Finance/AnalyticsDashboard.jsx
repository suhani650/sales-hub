import {
  HiOutlineChartBar,
  HiOutlineArrowTrendingUp,
  HiOutlineCurrencyRupee,
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiOutlineStar,
} from "react-icons/hi2";

const stats = [
  {
    title: "Total Sales",
    value: "₹28.6L",
    growth: "+18%",
    icon: HiOutlineCurrencyRupee,
    color: "from-emerald-500 to-green-600",
  },
  {
    title: "Orders",
    value: "2,846",
    growth: "+12%",
    icon: HiOutlineShoppingBag,
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Customers",
    value: "8,482",
    growth: "+9%",
    icon: HiOutlineUsers,
    color: "from-purple-500 to-indigo-600",
  },
  {
    title: "Average Rating",
    value: "4.9",
    growth: "+0.3",
    icon: HiOutlineStar,
    color: "from-orange-500 to-red-500",
  },
];

const products = [
  {
    name: "Apple Watch Series 10",
    sales: "842",
    revenue: "₹8.4L",
  },
  {
    name: "iPhone 17",
    sales: "620",
    revenue: "₹12.8L",
  },
  {
    name: "AirPods Pro",
    sales: "512",
    revenue: "₹4.2L",
  },
  {
    name: "MacBook Air",
    sales: "210",
    revenue: "₹18.6L",
  },
];

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <div className="rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-[#071028] via-[#111936] to-[#1E1B4B] p-8">
        <div className="flex justify-between items-center flex-wrap gap-6">
          <div>
            <span className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/20 text-cyan-300 text-sm">
              Seller Analytics
            </span>

            <h1 className="text-5xl font-bold text-white mt-5">
              Analytics Dashboard
            </h1>

            <p className="text-slate-400 mt-4 max-w-3xl leading-8">
              Analyze your sales performance, customer growth, top products and
              revenue insights in real time.
            </p>
          </div>

          <div className="rounded-3xl bg-[#0B1023] border border-cyan-500/20 p-8 w-[320px]">
            <div className="flex items-center gap-3">
              <HiOutlineChartBar className="text-3xl text-cyan-400" />

              <h3 className="text-white text-xl font-bold">Performance</h3>
            </div>

            <h2 className="text-5xl font-bold text-cyan-400 mt-6">+18%</h2>

            <p className="text-slate-400 mt-3">Monthly Business Growth</p>
          </div>
        </div>
      </div>

      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 hover:scale-[1.02] duration-300"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center`}
              >
                <Icon className="text-3xl text-white" />
              </div>

              <p className="text-slate-400 mt-5">{item.title}</p>

              <h2 className="text-4xl font-bold text-white mt-2">
                {item.value}
              </h2>

              <p className="text-green-400 mt-2">{item.growth}</p>
            </div>
          );
        })}
      </div>
      {/* Charts Section */}

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}

        <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Revenue Trend</h2>

              <p className="text-slate-400 mt-1">Last 6 Months Performance</p>
            </div>

            <HiOutlineArrowTrendingUp className="text-4xl text-cyan-400" />
          </div>

          <div className="h-80 rounded-2xl border border-dashed border-cyan-500/30 bg-[#111827] flex flex-col items-center justify-center">
            <HiOutlineChartBar className="text-7xl text-cyan-400 opacity-70" />

            <p className="text-slate-400 mt-4">
              Revenue Chart (Chart.js / Recharts)
            </p>
          </div>
        </div>

        {/* Sales Distribution */}

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
          <h2 className="text-2xl text-white font-bold">Sales Distribution</h2>

          <div className="mt-8 flex justify-center">
            <div className="w-56 h-56 rounded-full border-[18px] border-cyan-500 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div>
                  <h2 className="text-4xl font-bold text-white">68%</h2>

                  <p className="text-slate-400 text-center">Sales</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-300">Electronics</span>

              <span className="text-cyan-400">48%</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-300">Fashion</span>

              <span className="text-pink-400">26%</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-300">Accessories</span>

              <span className="text-green-400">18%</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-300">Others</span>

              <span className="text-orange-400">8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Business Insights */}

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 p-6">
          <h3 className="text-white text-lg">Best Selling Day</h3>

          <h2 className="text-white text-4xl font-bold mt-5">Saturday</h2>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 p-6">
          <h3 className="text-white text-lg">Returning Customers</h3>

          <h2 className="text-white text-4xl font-bold mt-5">72%</h2>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-6">
          <h3 className="text-white text-lg">Conversion Rate</h3>

          <h2 className="text-white text-4xl font-bold mt-5">4.8%</h2>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
          <h3 className="text-white text-lg">Repeat Orders</h3>

          <h2 className="text-white text-4xl font-bold mt-5">1,286</h2>
        </div>
      </div>
      {/* ===========================
          TOP PRODUCTS + REGIONS
      =========================== */}

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Top Products */}

        <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">
              Top Selling Products
            </h2>

            <p className="text-slate-400 mt-2">
              Highest performing products this month
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#111827]">
                <tr className="text-slate-400">
                  <th className="p-4 text-left">Product</th>

                  <th className="p-4 text-left">Units Sold</th>

                  <th className="p-4 text-left">Revenue</th>
                </tr>
              </thead>

              <tbody>
                {products.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="p-4 font-semibold text-white">
                      {item.name}
                    </td>

                    <td className="p-4 text-cyan-400">{item.sales}</td>

                    <td className="p-4 text-green-400 font-semibold">
                      {item.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Region Sales */}

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
          <h2 className="text-2xl text-white font-bold">Region Wise Sales</h2>

          <div className="space-y-6 mt-8">
            {[
              ["Delhi", "92%"],
              ["Mumbai", "85%"],
              ["Bangalore", "78%"],
              ["Hyderabad", "66%"],
              ["Pune", "54%"],
            ].map(([city, value]) => (
              <div key={city}>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300">{city}</span>

                  <span className="text-cyan-400">{value}</span>
                </div>

                <div className="h-2 rounded-full bg-slate-700">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                    style={{ width: value }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===========================
          PERFORMANCE SUMMARY
      =========================== */}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 p-8">
          <h3 className="text-white text-xl">Revenue Growth</h3>

          <h2 className="text-5xl font-bold text-white mt-5">+18%</h2>

          <p className="text-cyan-100 mt-4">Better than previous month.</p>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 p-8">
          <h3 className="text-white text-xl">Customer Satisfaction</h3>

          <h2 className="text-5xl font-bold text-white mt-5">4.9★</h2>

          <p className="text-green-100 mt-4">Excellent customer feedback.</p>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-purple-500 to-indigo-600 p-8">
          <h3 className="text-white text-xl">Overall Performance</h3>

          <h2 className="text-5xl font-bold text-white mt-5">96%</h2>

          <p className="text-purple-100 mt-4">Marketplace performance score.</p>
        </div>
      </div>
    </div>
  );
}
