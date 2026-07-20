import { useState } from "react";
import {
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaRobot,
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
  FaBoxes,
  FaGlobe,
  FaLightbulb,
  FaBullseye,
  FaDownload,
  FaSyncAlt,
  FaCalendarAlt,
  FaChartBar,
  FaChartPie,
  FaFilePdf,
  FaFileExcel,
} from "react-icons/fa";

/*
=========================================================
RTK Query (Enable Later)
=========================================================

import {
   useGetBusinessInsightsQuery,
   useGetRevenueForecastQuery,
   useExportAnalyticsMutation,
} from "../../../redux/api/analyticsApi";

*/

const dashboardStats = [
  {
    title: "Revenue",
    value: "₹18.6 Cr",
    growth: "+18%",
    icon: <FaDollarSign />,
    color: "bg-green-500",
  },
  {
    title: "Orders",
    value: "48,420",
    growth: "+12%",
    icon: <FaShoppingCart />,
    color: "bg-blue-500",
  },
  {
    title: "Customers",
    value: "24,185",
    growth: "+9%",
    icon: <FaUsers />,
    color: "bg-purple-500",
  },
  {
    title: "Products",
    value: "1,268",
    growth: "+6%",
    icon: <FaBoxes />,
    color: "bg-orange-500",
  },
];

const aiInsights = [
  "Sales likely to increase by 14% next month.",
  "Electronics category showing highest growth.",
  "North India demand is rising rapidly.",
  "Restock top-selling products this week.",
  "Launch festival offers for better conversion.",
];

export default function BusinessInsights() {
  const [period, setPeriod] = useState("Monthly");

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-700 p-8 text-white">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold">Business Insights</h1>

            <p className="mt-2 text-blue-100">
              Enterprise AI Analytics Dashboard
            </p>
          </div>

          <div className="flex gap-3">
            <button className="bg-white text-indigo-700 px-5 py-3 rounded-xl flex items-center gap-2 font-semibold">
              <FaSyncAlt />
              Refresh
            </button>

            <button className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl flex items-center gap-2 font-semibold">
              <FaDownload />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
        {dashboardStats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-3xl border p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between">
              <div
                className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl`}
              >
                {item.icon}
              </div>

              <span className="flex items-center gap-1 text-green-600 font-semibold">
                <FaArrowUp />

                {item.growth}
              </span>
            </div>

            <p className="text-gray-500 mt-5">{item.title}</p>

            <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>
      {/* ========================================================= */}
      {/* Analytics Dashboard */}
      {/* ========================================================= */}

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Revenue Forecast */}

        <div className="xl:col-span-2 bg-white rounded-3xl border overflow-hidden">
          <div className="border-b p-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">Revenue Forecast</h2>

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="border rounded-xl px-4 py-2"
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Yearly</option>
            </select>
          </div>

          <div className="p-8">
            <div className="h-72 rounded-2xl border-2 border-dashed border-indigo-300 flex flex-col items-center justify-center">
              <FaChartLine className="text-7xl text-indigo-500 mb-5" />

              <h3 className="text-2xl font-bold">Revenue Forecast Chart</h3>

              <p className="text-gray-500 mt-3">
                Recharts / ApexCharts Integration
              </p>
            </div>
          </div>
        </div>

        {/* AI Insights */}

        <div className="space-y-6">
          <div className="rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 text-white p-6">
            <div className="flex items-center gap-3">
              <FaRobot className="text-3xl" />

              <h2 className="text-xl font-bold">AI Business Insights</h2>
            </div>

            <div className="space-y-4 mt-6">
              {aiInsights.map((item) => (
                <div key={item} className="bg-white/10 rounded-xl p-4">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Summary */}

          <div className="bg-white rounded-3xl border p-6">
            <h3 className="font-bold mb-5">Quick Summary</h3>

            <div className="space-y-5">
              <SummaryCard
                icon={<FaDollarSign />}
                title="Monthly Revenue"
                value="₹2.48 Cr"
              />

              <SummaryCard
                icon={<FaShoppingCart />}
                title="Orders Today"
                value="864"
              />

              <SummaryCard
                icon={<FaUsers />}
                title="New Customers"
                value="542"
              />

              <SummaryCard
                icon={<FaBoxes />}
                title="Inventory Health"
                value="94%"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* Analytics Grid */}
      {/* ========================================================= */}

      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <AnalyticsCard
          icon={<FaChartBar />}
          title="Sales Trend"
          value="+18%"
          subtitle="Compared to last month"
          color="bg-blue-500"
        />

        <AnalyticsCard
          icon={<FaChartPie />}
          title="Product Performance"
          value="92%"
          subtitle="Top Products Growing"
          color="bg-green-500"
        />

        <AnalyticsCard
          icon={<FaGlobe />}
          title="Region Growth"
          value="+26%"
          subtitle="North India Leads"
          color="bg-purple-500"
        />

        <AnalyticsCard
          icon={<FaBullseye />}
          title="Goal Achievement"
          value="87%"
          subtitle="Quarterly Target"
          color="bg-orange-500"
        />
      </div>
      {/* ========================================================= */}
      {/* Product Performance & Region Analytics */}
      {/* ========================================================= */}

      <div className="grid xl:grid-cols-2 gap-6">
        {/* Product Performance */}

        <div className="bg-white rounded-3xl border overflow-hidden">
          <div className="border-b p-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">Product Performance</h2>

            <button className="text-indigo-600 font-semibold">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-4">Product</th>

                  <th className="text-left p-4">Sales</th>

                  <th className="text-left p-4">Revenue</th>

                  <th className="text-left p-4">Growth</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-semibold">iPhone 16 Pro</td>

                  <td className="p-4">3,482</td>

                  <td className="p-4">₹4.2 Cr</td>

                  <td className="p-4 text-green-600 font-semibold">+22%</td>
                </tr>

                <tr className="border-b">
                  <td className="p-4 font-semibold">Samsung S26</td>

                  <td className="p-4">2,984</td>

                  <td className="p-4">₹3.5 Cr</td>

                  <td className="p-4 text-green-600">+17%</td>
                </tr>

                <tr>
                  <td className="p-4 font-semibold">AirPods Pro</td>

                  <td className="p-4">6,452</td>

                  <td className="p-4">₹2.8 Cr</td>

                  <td className="p-4 text-green-600">+28%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Region Sales */}

        <div className="bg-white rounded-3xl border overflow-hidden">
          <div className="border-b p-6">
            <h2 className="text-xl font-bold">Region-wise Sales</h2>
          </div>

          <div className="divide-y">
            <RegionCard region="North India" value="₹6.8 Cr" growth="+24%" />

            <RegionCard region="South India" value="₹5.4 Cr" growth="+18%" />

            <RegionCard region="West India" value="₹3.9 Cr" growth="+12%" />

            <RegionCard region="East India" value="₹2.5 Cr" growth="+9%" />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* Customer Analytics */}
      {/* ========================================================= */}

      <div className="grid xl:grid-cols-3 gap-6">
        <AnalyticsInfo
          title="Returning Customers"
          value="78%"
          subtitle="Higher than last month"
        />

        <AnalyticsInfo
          title="New Customers"
          value="22%"
          subtitle="Growing steadily"
        />

        <AnalyticsInfo
          title="Average Order Value"
          value="₹4,860"
          subtitle="Up by 11%"
        />
      </div>

      {/* ========================================================= */}
      {/* AI Recommendation Panel */}
      {/* ========================================================= */}

      <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-700 rounded-3xl p-8 text-white">
        <div className="flex items-center gap-4">
          <FaRobot className="text-4xl" />

          <div>
            <h2 className="text-2xl font-bold">AI Recommendations</h2>

            <p className="text-blue-100 mt-1">
              Smart recommendations generated using sales trends, customer
              behavior and inventory prediction.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-8">
          <div className="bg-white/10 rounded-xl p-5">
            ✅ Increase Ads for Electronics Category
          </div>

          <div className="bg-white/10 rounded-xl p-5">
            📦 Restock AirPods Pro Inventory
          </div>

          <div className="bg-white/10 rounded-xl p-5">
            🎯 Launch Weekend Discount Campaign
          </div>

          <div className="bg-white/10 rounded-xl p-5">
            🌍 Expand Delivery in Tier-2 Cities
          </div>
        </div>
      </div>
      {/* ========================================================= */}
      {/* Growth Forecast */}
      {/* ========================================================= */}

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Growth Forecast</h2>

            <FaChartLine className="text-indigo-600 text-2xl" />
          </div>

          <div className="mt-6 space-y-4">
            <ForecastRow title="Revenue Growth" value="+18%" />

            <ForecastRow title="Customer Growth" value="+12%" />

            <ForecastRow title="Order Growth" value="+16%" />

            <ForecastRow title="Profit Margin" value="+9%" />
          </div>
        </div>

        <div className="bg-white rounded-3xl border p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Inventory Prediction</h2>

            <FaBoxes className="text-orange-500 text-2xl" />
          </div>

          <div className="mt-6 space-y-4">
            <ForecastRow title="High Demand" value="42 Items" />

            <ForecastRow title="Low Stock" value="16 Items" />

            <ForecastRow title="Out of Stock" value="4 Items" />

            <ForecastRow title="Restock Today" value="8 Items" />
          </div>
        </div>

        <div className="bg-white rounded-3xl border p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Profit Summary</h2>

            <FaDollarSign className="text-green-600 text-2xl" />
          </div>

          <div className="mt-6 space-y-4">
            <ForecastRow title="Revenue" value="₹18.6 Cr" />

            <ForecastRow title="Expenses" value="₹10.2 Cr" />

            <ForecastRow title="Net Profit" value="₹8.4 Cr" />

            <ForecastRow title="Profit Margin" value="45%" />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* Export Section */}
      {/* ========================================================= */}

      <div className="bg-white rounded-3xl border p-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
          <div>
            <h2 className="text-2xl font-bold">Export Analytics</h2>

            <p className="text-gray-500 mt-2">
              Download complete business analytics reports.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="bg-red-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">
              <FaFilePdf />
              Export PDF
            </button>

            <button className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">
              <FaFileExcel />
              Export Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================= */
/* Components */
/* ========================================================= */

function AnalyticsCard({ icon, title, value, subtitle, color }) {
  return (
    <div className="bg-white rounded-3xl border p-6">
      <div
        className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl`}
      >
        {icon}
      </div>

      <h3 className="font-bold mt-5">{title}</h3>

      <h2 className="text-3xl font-bold mt-2">{value}</h2>

      <p className="text-gray-500 mt-2">{subtitle}</p>
    </div>
  );
}

function SummaryCard({ icon, title, value }) {
  return (
    <div className="flex justify-between items-center border rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className="text-indigo-600 text-xl">{icon}</div>

        <span>{title}</span>
      </div>

      <span className="font-bold">{value}</span>
    </div>
  );
}

function RegionCard({ region, value, growth }) {
  return (
    <div className="flex justify-between items-center p-5">
      <div>
        <h4 className="font-semibold">{region}</h4>

        <p className="text-gray-500">{value}</p>
      </div>

      <span className="text-green-600 font-bold">{growth}</span>
    </div>
  );
}

function AnalyticsInfo({ title, value, subtitle }) {
  return (
    <div className="bg-white rounded-3xl border p-6">
      <h3 className="text-gray-500">{title}</h3>

      <h2 className="text-4xl font-bold mt-3">{value}</h2>

      <p className="text-green-600 mt-3">{subtitle}</p>
    </div>
  );
}

function ForecastRow({ title, value }) {
  return (
    <div className="flex justify-between border-b pb-3">
      <span>{title}</span>

      <span className="font-bold text-indigo-600">{value}</span>
    </div>
  );
}
