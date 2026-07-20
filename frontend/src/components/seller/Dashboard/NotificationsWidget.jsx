import {
  FaShoppingCart,
  FaBoxOpen,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaCheckCircle,
  FaBell,
  FaTrash,
} from "react-icons/fa";

const notifications = [
  {
    id: 1,
    type: "order",
    title: "New Order Received",
    message: "Order #10045 has been placed.",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    type: "approval",
    title: "Product Approved",
    message: "Wireless Earbuds approved by Admin.",
    time: "15 min ago",
    unread: true,
  },
  {
    id: 3,
    type: "payment",
    title: "Payment Released",
    message: "₹25,000 credited to your wallet.",
    time: "1 hour ago",
    unread: false,
  },
  {
    id: 4,
    type: "stock",
    title: "Low Stock Alert",
    message: "Gaming Mouse stock is below 5.",
    time: "3 hours ago",
    unread: false,
  },
  {
    id: 5,
    type: "success",
    title: "Profile Updated",
    message: "Company profile updated successfully.",
    time: "Yesterday",
    unread: false,
  },
];

const getIcon = (type) => {
  switch (type) {
    case "order":
      return <FaShoppingCart className="text-blue-600" />;
    case "approval":
      return <FaBoxOpen className="text-green-600" />;
    case "payment":
      return <FaMoneyBillWave className="text-purple-600" />;
    case "stock":
      return <FaExclamationTriangle className="text-red-600" />;
    default:
      return <FaCheckCircle className="text-green-600" />;
  }
};

export default function NotificationsWidget() {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="flex justify-between items-center border-b p-6">
        <div className="flex items-center gap-2">
          <FaBell className="text-yellow-500" />

          <h2 className="text-xl font-semibold">Notifications</h2>
        </div>

        <button className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm">
          <FaTrash />
          Clear All
        </button>
      </div>

      <div className="max-h-[420px] overflow-y-auto">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`flex gap-4 p-5 border-b hover:bg-gray-50 transition ${
              item.unread ? "bg-blue-50" : ""
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              {getIcon(item.type)}
            </div>

            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-semibold">{item.title}</h4>

                {item.unread && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 mt-2"></span>
                )}
              </div>

              <p className="text-sm text-gray-600 mt-1">{item.message}</p>

              <p className="text-xs text-gray-400 mt-2">{item.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 text-center border-t">
        <button className="text-blue-600 hover:underline font-medium">
          View All Notifications
        </button>
      </div>
    </div>
  );
}
