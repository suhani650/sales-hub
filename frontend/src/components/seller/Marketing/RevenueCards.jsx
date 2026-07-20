import {
  FaRupeeSign,
  FaArrowUp,
  FaBullseye,
  FaWallet,
  FaUsers,
  FaGem,
  FaRobot,
  FaChartLine,
} from "react-icons/fa";

const revenueCards = [
  {
    title: "Campaign Revenue",
    value: "₹8.42 Cr",
    growth: "+24%",
    icon: <FaRupeeSign />,
    color: "bg-green-500",
  },
  {
    title: "Marketing Spend",
    value: "₹1.74 Cr",
    growth: "+8%",
    icon: <FaWallet />,
    color: "bg-red-500",
  },
  {
    title: "ROI",
    value: "486%",
    growth: "+18%",
    icon: <FaBullseye />,
    color: "bg-blue-500",
  },
  {
    title: "ROAS",
    value: "5.8x",
    growth: "+14%",
    icon: <FaChartLine />,
    color: "bg-purple-500",
  },
  {
    title: "CPA",
    value: "₹184",
    growth: "-6%",
    icon: <FaUsers />,
    color: "bg-orange-500",
  },
  {
    title: "CLV",
    value: "₹18,240",
    growth: "+12%",
    icon: <FaGem />,
    color: "bg-pink-500",
  },
];

const monthlyRevenue = [
  { month: "Jan", revenue: "₹48L" },
  { month: "Feb", revenue: "₹55L" },
  { month: "Mar", revenue: "₹64L" },
  { month: "Apr", revenue: "₹72L" },
  { month: "May", revenue: "₹81L" },
  { month: "Jun", revenue: "₹94L" },
];

export default function RevenueCards() {
  return (
    <div className="space-y-6">
      {/* Revenue Cards */}

      <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">
        {revenueCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-3xl border shadow-sm p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <div
                className={`${card.color} w-14 h-14 rounded-2xl text-white flex items-center justify-center text-2xl`}
              >
                {card.icon}
              </div>

              <div className="flex items-center gap-1 text-green-600 font-semibold">
                <FaArrowUp />
                {card.growth}
              </div>
            </div>

            <p className="text-gray-500 mt-6">{card.title}</p>

            <h2 className="text-3xl font-bold mt-2">{card.value}</h2>

            <div className="mt-5 h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className={`${card.color} h-full`}
                style={{
                  width: `${70 + Math.floor(Math.random() * 25)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Trend + AI */}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border p-6">
          <h3 className="text-xl font-bold mb-6">Monthly Revenue Trend</h3>

          <div className="space-y-4">
            {monthlyRevenue.map((item) => (
              <div key={item.month} className="flex items-center gap-4">
                <div className="w-12 font-semibold">{item.month}</div>

                <div className="flex-1 h-3 rounded-full bg-gray-200">
                  <div
                    className="h-3 rounded-full bg-green-500"
                    style={{
                      width: `${55 + Math.floor(Math.random() * 40)}%`,
                    }}
                  />
                </div>

                <div className="font-semibold text-green-600">
                  {item.revenue}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl text-white p-8">
          <div className="flex items-center gap-3">
            <FaRobot className="text-4xl" />

            <h2 className="text-2xl font-bold">AI Revenue Forecast</h2>
          </div>

          <div className="mt-8 space-y-5">
            <ForecastItem label="Predicted Revenue" value="₹10.8 Cr" />

            <ForecastItem label="Expected ROI" value="512%" />

            <ForecastItem label="Recommended Budget" value="₹2.1 Cr" />

            <ForecastItem label="Forecast Accuracy" value="96.4%" />
          </div>

          <button className="mt-8 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
            View AI Report
          </button>
        </div>
      </div>
    </div>
  );
}

function ForecastItem({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b border-white/20 pb-3">
      <span className="text-blue-100">{label}</span>

      <span className="font-bold text-lg">{value}</span>
    </div>
  );
}
