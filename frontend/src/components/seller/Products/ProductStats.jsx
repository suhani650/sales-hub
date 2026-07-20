import CountUp from "react-countup";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaShoppingBag,
  FaStar,
  FaRupeeSign,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

const stats = [
  {
    id: 1,
    title: "Total Products",
    value: 250,
    icon: FaBoxOpen,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    trend: "+12%",
    trendType: "up",
  },
  {
    id: 2,
    title: "Active Products",
    value: 220,
    icon: FaCheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    trend: "+8%",
    trendType: "up",
  },
  {
    id: 3,
    title: "Pending Approval",
    value: 18,
    icon: FaClock,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    trend: "-2%",
    trendType: "down",
  },
  {
    id: 4,
    title: "Rejected Products",
    value: 7,
    icon: FaTimesCircle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    trend: "-1%",
    trendType: "down",
  },
  {
    id: 5,
    title: "Products Sold",
    value: 5840,
    icon: FaShoppingBag,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    trend: "+15%",
    trendType: "up",
  },
  {
    id: 6,
    title: "Average Rating",
    value: 4.8,
    decimal: 1,
    icon: FaStar,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    trend: "+0.2",
    trendType: "up",
  },
  {
    id: 7,
    title: "Revenue",
    value: 850000,
    prefix: "₹",
    separator: ",",
    icon: FaRupeeSign,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    trend: "+20%",
    trendType: "up",
  },
  {
    id: 8,
    title: "Low Stock",
    value: 14,
    icon: FaExclamationTriangle,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    trend: "+4",
    trendType: "down",
  },
];

export default function ProductStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 border border-gray-100 p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>

                <h2 className="text-3xl font-bold mt-3 text-gray-800">
                  {item.prefix}

                  <CountUp
                    end={item.value}
                    duration={2}
                    separator={item.separator || ","}
                    decimals={item.decimal || 0}
                  />
                </h2>
              </div>

              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.iconBg}`}
              >
                <Icon className={`text-2xl ${item.iconColor}`} />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span
                className={`flex items-center gap-2 text-sm font-semibold ${
                  item.trendType === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.trendType === "up" ? <FaArrowUp /> : <FaArrowDown />}

                {item.trend}
              </span>

              <span className="text-xs text-gray-400">
                Compared to last month
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
