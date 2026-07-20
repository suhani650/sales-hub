import {
  FaHeart,
  FaShoppingCart,
  FaChartLine,
  FaFire,
  FaUsers,
  FaRobot,
  FaEnvelope,
  FaBell,
} from "react-icons/fa";

export default function WishlistAnalytics() {
  const topProducts = [
    {
      id: 1,
      product: "Apple AirPods Pro",
      wishlists: 2840,
      conversions: "42%",
      revenue: "₹12.4L",
    },
    {
      id: 2,
      product: "Samsung Galaxy Watch",
      wishlists: 2180,
      conversions: "38%",
      revenue: "₹8.8L",
    },
    {
      id: 3,
      product: "Sony Headphones",
      wishlists: 1820,
      conversions: "34%",
      revenue: "₹6.2L",
    },
  ];

  const aiInsights = [
    {
      title: "High Purchase Intent",
      customers: 1240,
      confidence: "94%",
    },
    {
      title: "Likely To Convert",
      customers: 860,
      confidence: "88%",
    },
    {
      title: "Wishlist Abandonment Risk",
      customers: 420,
      confidence: "82%",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-3xl font-bold">Wishlist Intelligence Platform</h2>

        <p className="text-gray-500 mt-2">
          Customer Wishlist Behavior & Conversion Analytics
        </p>
      </div>

      {/* KPI Cards */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        <StatCard title="Wishlist Items" value="28,420" icon={<FaHeart />} />

        <StatCard title="Conversions" value="8,240" icon={<FaShoppingCart />} />

        <StatCard title="Conversion Rate" value="29%" icon={<FaChartLine />} />

        <StatCard title="Revenue Impact" value="₹42.8L" icon={<FaFire />} />
      </div>

      {/* Top Wishlisted Products */}

      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold">Most Wishlisted Products</h3>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Wishlists</th>
              <th className="p-4 text-left">Conversion</th>
              <th className="p-4 text-left">Revenue</th>
            </tr>
          </thead>

          <tbody>
            {topProducts.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-4 font-medium">{item.product}</td>

                <td className="p-4">{item.wishlists}</td>

                <td className="p-4 text-blue-600 font-semibold">
                  {item.conversions}
                </td>

                <td className="p-4 text-green-600 font-semibold">
                  {item.revenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Insights */}

      <div className="grid lg:grid-cols-4 gap-5">
        <InsightCard
          title="Wishlist Customers"
          value="5,620"
          icon={<FaUsers />}
        />

        <InsightCard title="Trending Products" value="124" icon={<FaFire />} />

        <InsightCard
          title="Recovery Campaigns"
          value="42"
          icon={<FaEnvelope />}
        />

        <InsightCard title="Wishlist Alerts" value="1,240" icon={<FaBell />} />
      </div>

      {/* AI Intent Detection */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaRobot className="text-2xl text-blue-600" />

          <h3 className="text-xl font-bold">AI Purchase Intent Detection</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {aiInsights.map((item) => (
            <div key={item.title} className="border rounded-2xl p-5">
              <h4 className="font-bold">{item.title}</h4>

              <p className="text-gray-500 mt-2">Customers: {item.customers}</p>

              <p className="text-blue-600 font-semibold mt-2">
                Confidence: {item.confidence}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Opportunities */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-5">
          Revenue Opportunity Analytics
        </h3>

        <div className="grid md:grid-cols-4 gap-4">
          <RevenueCard title="Potential Revenue" value="₹18.4L" />

          <RevenueCard title="Missed Opportunities" value="₹4.2L" />

          <RevenueCard title="Recovery Revenue" value="₹2.8L" />

          <RevenueCard title="Projected Revenue" value="₹24.6L" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <div className="text-3xl text-pink-500">{icon}</div>

      <p className="text-gray-500 mt-4">{title}</p>

      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function InsightCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-2xl p-6 text-center">
      <div className="text-3xl text-blue-600 flex justify-center">{icon}</div>

      <h4 className="font-bold mt-4">{title}</h4>

      <p className="text-gray-500 mt-2">{value}</p>
    </div>
  );
}

function RevenueCard({ title, value }) {
  return (
    <div className="border rounded-xl p-5 text-center">
      <p className="text-gray-500">{title}</p>

      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}
