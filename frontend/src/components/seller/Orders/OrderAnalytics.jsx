import {
  FaShoppingCart,
  FaRupeeSign,
  FaChartLine,
  FaHourglassHalf,
} from "react-icons/fa";

import { useGetOrderAnalyticsQuery } from "../../../services/vendorApi";

export default function OrderAnalytics() {
  const { data, isLoading, isError } = useGetOrderAnalyticsQuery();

  if (isLoading) {
    return (
      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-48 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-10 text-center text-red-400">
        Couldn't load order analytics from the server.
      </div>
    );
  }

  const formatCurrency = (value) =>
    value >= 100000
      ? `₹${(value / 100000).toFixed(2)} L`
      : `₹${Number(value || 0).toLocaleString("en-IN")}`;

  const cards = [
    {
      title: "Today's Orders",
      value: String(data.todaysOrders ?? 0),
      icon: <FaShoppingCart />,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(data.revenue),
      icon: <FaRupeeSign />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Average Order",
      value: formatCurrency(data.averageOrderValue),
      icon: <FaChartLine />,
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Pending Orders",
      value: String(data.pendingOrders ?? 0),
      icon: <FaHourglassHalf />,
      color: "from-orange-500 to-red-500",
    },
  ];

  const totalOrders = data.totalDistinctOrders || 1;
  const completionRate = Math.min(
    100,
    Math.round(((totalOrders - (data.pendingOrders || 0)) / totalOrders) * 100),
  );

  return (
    <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-gradient-to-br
          from-[#0F172A]
          to-[#1E293B]
          p-6
          transition-all
          duration-300
          hover:-translate-y-2
          hover:border-cyan-500/40
          hover:shadow-[0_0_30px_rgba(34,211,238,.18)]
          "
        >
          {/* Glow */}
          <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-cyan-500/10 blur-3xl"></div>

          <div className="relative flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">{card.title}</p>

              <h2 className="text-4xl font-bold text-white mt-3">
                {card.value}
              </h2>
            </div>

            <div
              className={`
              w-16
              h-16
              rounded-2xl
              flex
              items-center
              justify-center
              text-2xl
              text-white
              bg-gradient-to-r
              ${card.color}
              shadow-lg
              `}
            >
              {card.icon}
            </div>
          </div>

          {/* Bottom Progress */}
          <div className="mt-8">
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span>Fulfilled</span>

              <span>{completionRate}%</span>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${card.color}`}
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
