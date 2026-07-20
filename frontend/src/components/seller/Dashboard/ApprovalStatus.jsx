import { FaCheckCircle, FaClock, FaTimesCircle, FaBan } from "react-icons/fa";

const summary = [
  {
    title: "Approved",
    value: 230,
    icon: <FaCheckCircle />,
    color: "bg-green-500",
    percent: 92,
  },
  {
    title: "Pending",
    value: 12,
    icon: <FaClock />,
    color: "bg-yellow-500",
    percent: 5,
  },
  {
    title: "Rejected",
    value: 6,
    icon: <FaTimesCircle />,
    color: "bg-red-500",
    percent: 2,
  },
  {
    title: "Blocked",
    value: 2,
    icon: <FaBan />,
    color: "bg-gray-700",
    percent: 1,
  },
];

const recentApprovals = [
  {
    product: "Smart Watch",
    status: "Approved",
    date: "Today",
  },
  {
    product: "Gaming Mouse",
    status: "Pending",
    date: "Today",
  },
  {
    product: "Laptop Bag",
    status: "Rejected",
    date: "Yesterday",
  },
  {
    product: "Bluetooth Speaker",
    status: "Approved",
    date: "Yesterday",
  },
];

export default function ApprovalStatus() {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold">Product Approval Status</h2>

        <p className="text-sm text-gray-500 mt-1">Admin approval overview</p>
      </div>

      <div className="p-5 space-y-5">
        {summary.map((item) => (
          <div key={item.title}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${item.color}`}
                >
                  {item.icon}
                </div>

                <div>
                  <h4 className="font-semibold">{item.title}</h4>

                  <p className="text-xs text-gray-500">{item.value} Products</p>
                </div>
              </div>

              <span className="font-bold">{item.percent}%</span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className={`${item.color} h-2 rounded-full`}
                style={{
                  width: `${item.percent}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-5">
        <h3 className="font-semibold mb-4">Recent Approval Requests</h3>

        <div className="space-y-4">
          {recentApprovals.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{item.product}</h4>

                <p className="text-xs text-gray-500">{item.date}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  item.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : item.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
