import { Link } from "react-router-dom";
import {
  FaEye,
  FaPrint,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

const orders = [
  {
    id: "#1001",
    customer: "Rahul Sharma",
    product: "Smart Watch",
    quantity: 2,
    amount: "₹5,998",
    payment: "Paid",
    status: "Processing",
    date: "16 Jul 2026",
  },
  {
    id: "#1002",
    customer: "Priya Verma",
    product: "Bluetooth Earbuds",
    quantity: 1,
    amount: "₹5,499",
    payment: "Paid",
    status: "Delivered",
    date: "15 Jul 2026",
  },
  {
    id: "#1003",
    customer: "Amit Kumar",
    product: "Laptop Bag",
    quantity: 3,
    amount: "₹5,697",
    payment: "Pending",
    status: "Packed",
    date: "15 Jul 2026",
  },
  {
    id: "#1004",
    customer: "Sneha Gupta",
    product: "Gaming Mouse",
    quantity: 1,
    amount: "₹1,999",
    payment: "Paid",
    status: "Shipped",
    date: "14 Jul 2026",
  },
  {
    id: "#1005",
    customer: "Rohit Singh",
    product: "Wireless Keyboard",
    quantity: 2,
    amount: "₹3,998",
    payment: "Refund",
    status: "Cancelled",
    date: "13 Jul 2026",
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Processing":
      return "bg-yellow-100 text-yellow-700";
    case "Packed":
      return "bg-purple-100 text-purple-700";
    case "Shipped":
      return "bg-blue-100 text-blue-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getPaymentBadge = (payment) => {
  switch (payment) {
    case "Paid":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Refund":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function RecentOrders() {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="flex justify-between items-center border-b p-6">
        <div>
          <h2 className="text-xl font-semibold">Recent Orders</h2>

          <p className="text-sm text-gray-500 mt-1">Latest customer orders</p>
        </div>

        <Link
          to="/seller/orders"
          className="text-blue-600 font-medium hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4">Order ID</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Product</th>
              <th className="text-center p-4">Qty</th>
              <th className="text-right p-4">Amount</th>
              <th className="text-center p-4">Payment</th>
              <th className="text-center p-4">Status</th>
              <th className="text-center p-4">Date</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 font-semibold">{order.id}</td>

                <td className="p-4">{order.customer}</td>

                <td className="p-4">{order.product}</td>

                <td className="text-center">{order.quantity}</td>

                <td className="text-right font-semibold">{order.amount}</td>

                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getPaymentBadge(
                      order.payment,
                    )}`}
                  >
                    {order.payment}
                  </span>
                </td>

                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getStatusBadge(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="text-center">{order.date}</td>

                <td>
                  <div className="flex justify-center gap-2">
                    <button className="p-2 rounded bg-blue-100 hover:bg-blue-200 text-blue-600">
                      <FaEye />
                    </button>

                    <button className="p-2 rounded bg-green-100 hover:bg-green-200 text-green-600">
                      <FaPrint />
                    </button>

                    <button className="p-2 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-700">
                      <FaTruck />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center p-5 border-t">
        <p className="text-sm text-gray-500">Showing 5 of 150 Orders</p>

        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
            Previous
          </button>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            1
          </button>

          <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
            2
          </button>

          <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
            3
          </button>

          <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
