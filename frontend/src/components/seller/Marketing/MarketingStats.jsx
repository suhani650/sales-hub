import {
  FaEnvelope,
  FaSms,
  FaBell,
  FaUsers,
  FaChartLine,
  FaRupeeSign,
  FaBullseye,
  FaWallet,
  FaRobot,
  FaStar,
  FaArrowUp,
} from "react-icons/fa";

const stats = [
  {
    title: "Email Campaigns",
    value: "248",
    growth: "+18%",
    icon: <FaEnvelope />,
    color: "bg-blue-500",
  },
  {
    title: "SMS Campaigns",
    value: "124",
    growth: "+12%",
    icon: <FaSms />,
    color: "bg-green-500",
  },
  {
    title: "Push Campaigns",
    value: "84",
    growth: "+9%",
    icon: <FaBell />,
    color: "bg-purple-500",
  },
  {
    title: "Audience Reach",
    value: "2.4M",
    growth: "+28%",
    icon: <FaUsers />,
    color: "bg-orange-500",
  },
  {
    title: "Conversion Rate",
    value: "18.6%",
    growth: "+3.4%",
    icon: <FaChartLine />,
    color: "bg-cyan-500",
  },
  {
    title: "Marketing Revenue",
    value: "₹8.42Cr",
    growth: "+34%",
    icon: <FaRupeeSign />,
    color: "bg-emerald-500",
  },
  {
    title: "ROI",
    value: "486%",
    growth: "+22%",
    icon: <FaBullseye />,
    color: "bg-pink-500",
  },
  {
    title: "Marketing Spend",
    value: "₹1.74Cr",
    growth: "+8%",
    icon: <FaWallet />,
    color: "bg-red-500",
  },
  {
    title: "AI Score",
    value: "96%",
    growth: "+6%",
    icon: <FaRobot />,
    color: "bg-indigo-500",
  },
  {
    title: "Engagement",
    value: "92%",
    growth: "+11%",
    icon: <FaStar />,
    color: "bg-yellow-500",
  },
];

export default function MarketingStats() {
  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 gap-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-3xl border shadow-sm p-6 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">
            <div
              className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl`}
            >
              {item.icon}
            </div>

            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <FaArrowUp />
              {item.growth}
            </div>
          </div>

          <h3 className="text-gray-500 text-sm mt-6">{item.title}</h3>

          <h2 className="text-3xl font-bold mt-2">{item.value}</h2>

          <div className="mt-5 h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className={`h-full ${item.color}`}
              style={{
                width: `${Math.floor(Math.random() * 35 + 60)}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
