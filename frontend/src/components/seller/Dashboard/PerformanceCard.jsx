import {
  FaTrophy,
  FaArrowUp,
  FaStar,
  FaShippingFast,
  FaUndoAlt,
  FaChartLine,
} from "react-icons/fa";

const metrics = [
  {
    title: "Seller Score",
    value: "94%",
    progress: 94,
    color: "bg-blue-500",
    icon: <FaTrophy />,
  },
  {
    title: "Customer Satisfaction",
    value: "4.8 / 5",
    progress: 96,
    color: "bg-green-500",
    icon: <FaStar />,
  },
  {
    title: "Order Fulfillment",
    value: "98%",
    progress: 98,
    color: "bg-purple-500",
    icon: <FaShippingFast />,
  },
  {
    title: "Return Rate",
    value: "2%",
    progress: 2,
    color: "bg-red-500",
    reverse: true,
    icon: <FaUndoAlt />,
  },
  {
    title: "Revenue Growth",
    value: "+18%",
    progress: 82,
    color: "bg-yellow-500",
    icon: <FaChartLine />,
  },
];

export default function PerformanceCard() {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="border-b p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
            <FaTrophy className="text-yellow-600 text-xl" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Seller Performance</h2>

            <p className="text-gray-500 text-sm">Overall business health</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-5 text-white mb-6">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">Gold Seller</h3>

              <p className="text-blue-100">Top 10% Vendors</p>
            </div>

            <FaArrowUp size={34} />
          </div>
        </div>

        <div className="space-y-6">
          {metrics.map((item) => (
            <div key={item.title}>
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">{item.icon}</span>

                  <span className="font-medium">{item.title}</span>
                </div>

                <span className="font-bold">{item.value}</span>
              </div>

              <div className="w-full h-3 rounded-full bg-gray-200">
                <div
                  className={`${item.color} h-3 rounded-full`}
                  style={{
                    width: `${item.reverse ? 100 - item.progress : item.progress}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
