import {
  FaTicketAlt,
  FaPercentage,
  FaRupeeSign,
  FaShoppingCart,
  FaUsers,
  FaCalendarAlt,
  FaChartLine,
  FaRobot,
  FaPlus,
  FaPlay,
} from "react-icons/fa";

const stats = [
  {
    title: "Active Coupons",
    value: "148",
    icon: <FaTicketAlt />,
    color: "bg-blue-500",
  },
  {
    title: "Redemptions",
    value: "48,920",
    icon: <FaShoppingCart />,
    color: "bg-green-500",
  },
  {
    title: "Revenue",
    value: "₹4.82 Cr",
    icon: <FaRupeeSign />,
    color: "bg-emerald-500",
  },
  {
    title: "Conversion",
    value: "28.6%",
    icon: <FaChartLine />,
    color: "bg-purple-500",
  },
];

const coupons = [
  {
    code: "MEGA50",
    type: "50% OFF",
    usage: "18,420",
    revenue: "₹84L",
    status: "Active",
  },
  {
    code: "WELCOME500",
    type: "₹500 OFF",
    usage: "9,880",
    revenue: "₹41L",
    status: "Scheduled",
  },
  {
    code: "FESTIVAL20",
    type: "20% OFF",
    usage: "24,120",
    revenue: "₹1.26Cr",
    status: "Running",
  },
];

const targeting = [
  "VIP Customers",
  "New Customers",
  "Returning Buyers",
  "High Value Orders",
  "Abandoned Cart",
];

export default function CouponCampaigns() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white rounded-3xl border p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
              <FaTicketAlt className="text-orange-600 text-2xl" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">Coupon Campaigns</h2>

              <p className="text-gray-500">
                Enterprise Coupon & Promotion Manager
              </p>
            </div>
          </div>

          <button className="bg-orange-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
            <FaPlus />
            Create Coupon
          </button>
        </div>
      </div>

      {/* KPI */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((item) => (
          <div key={item.title} className="bg-white rounded-2xl border p-5">
            <div
              className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl`}
            >
              {item.icon}
            </div>

            <p className="text-gray-500 mt-4">{item.title}</p>

            <h3 className="text-2xl font-bold mt-2">{item.value}</h3>
          </div>
        ))}
      </div>

      {/* Main */}

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Coupons */}

        <div className="xl:col-span-2 bg-white rounded-3xl border">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold">Active Coupon Campaigns</h3>
          </div>

          <div className="divide-y">
            {coupons.map((coupon) => (
              <div key={coupon.code} className="p-6">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-bold text-lg">{coupon.code}</h4>

                    <p className="text-gray-500 mt-1">{coupon.type}</p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                    {coupon.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-5">
                  <Metric label="Usage" value={coupon.usage} />

                  <Metric label="Revenue" value={coupon.revenue} />

                  <Metric label="Discount" value={coupon.type} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}

        <div className="space-y-6">
          {/* AI */}

          <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl text-white p-6">
            <div className="flex items-center gap-3">
              <FaRobot className="text-2xl" />

              <h3 className="text-xl font-bold">AI Coupon Insights</h3>
            </div>

            <div className="space-y-4 mt-6">
              <AIItem label="Best Discount" value="20%" />

              <AIItem label="Expected Redemption" value="31%" />

              <AIItem label="Revenue Forecast" value="₹5.8 Cr" />

              <AIItem label="Suggested Launch" value="Friday 7 PM" />
            </div>
          </div>

          {/* Targeting */}

          <div className="bg-white rounded-3xl border p-6">
            <div className="flex items-center gap-2 mb-5">
              <FaUsers className="text-orange-600" />

              <h3 className="font-bold">Customer Targeting</h3>
            </div>

            <div className="space-y-3">
              {targeting.map((group) => (
                <div
                  key={group}
                  className="flex justify-between items-center border rounded-xl p-3"
                >
                  <span>{group}</span>

                  <button className="text-orange-600">
                    <FaPlay />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}

          <div className="bg-white rounded-3xl border p-6">
            <h3 className="font-bold mb-4">Quick Actions</h3>

            <div className="space-y-3">
              <Action icon={<FaPercentage />} text="Percentage Discount" />

              <Action icon={<FaRupeeSign />} text="Flat Discount" />

              <Action icon={<FaCalendarAlt />} text="Schedule Coupon" />

              <Action icon={<FaShoppingCart />} text="Cart Rules" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <h4 className="text-xl font-bold mt-2">{value}</h4>
    </div>
  );
}

function AIItem({ label, value }) {
  return (
    <div className="flex justify-between border-b border-white/20 pb-2">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function Action({ icon, text }) {
  return (
    <button className="w-full flex items-center gap-3 border rounded-xl p-3 hover:bg-orange-50 transition">
      <span className="text-orange-600">{icon}</span>
      {text}
    </button>
  );
}
