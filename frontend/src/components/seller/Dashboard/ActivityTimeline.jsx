import {
  FaPlusCircle,
  FaShoppingCart,
  FaTruck,
  FaMoneyBillWave,
  FaStar,
  FaUserEdit,
} from "react-icons/fa";

const activities = [
  {
    id: 1,
    icon: <FaPlusCircle className="text-blue-600" />,
    title: "New Product Added",
    description: "Smart Watch Series X added to catalog.",
    time: "10 min ago",
  },
  {
    id: 2,
    icon: <FaShoppingCart className="text-green-600" />,
    title: "New Order Received",
    description: "Order #10045 received from Rahul Sharma.",
    time: "25 min ago",
  },
  {
    id: 3,
    icon: <FaTruck className="text-purple-600" />,
    title: "Order Shipped",
    description: "Order #10031 shipped successfully.",
    time: "1 hour ago",
  },
  {
    id: 4,
    icon: <FaMoneyBillWave className="text-yellow-600" />,
    title: "Payment Received",
    description: "₹18,500 transferred to wallet.",
    time: "3 hours ago",
  },
  {
    id: 5,
    icon: <FaStar className="text-orange-500" />,
    title: "New Review",
    description: "Customer rated Smart Watch ⭐⭐⭐⭐⭐",
    time: "Yesterday",
  },
  {
    id: 6,
    icon: <FaUserEdit className="text-indigo-600" />,
    title: "Profile Updated",
    description: "Bank account details updated.",
    time: "2 Days Ago",
  },
];

export default function ActivityTimeline() {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold">Activity Timeline</h2>

        <p className="text-sm text-gray-500 mt-1">Latest seller activities</p>
      </div>

      <div className="p-6">
        <div className="relative border-l-2 border-gray-200 ml-5">
          {activities.map((activity) => (
            <div key={activity.id} className="relative mb-8 ml-8">
              <div className="absolute -left-12 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shadow">
                {activity.icon}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold">{activity.title}</h3>

                <p className="text-sm text-gray-600 mt-1">
                  {activity.description}
                </p>

                <p className="text-xs text-gray-400 mt-2">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
