import { useState } from "react";
import {
  HiOutlineEye,
  HiOutlinePrinter,
  HiOutlineTruck,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";

export default function OrdersList() {
  const [orders] = useState([
    {
      id: "#100245",
      customer: "Rahul Sharma",
      date: "17 Jul 2026",
      total: "₹8,240",
      payment: "Paid",
      status: "Delivered",
    },
    {
      id: "#100246",
      customer: "Priya Verma",
      date: "17 Jul 2026",
      total: "₹2,480",
      payment: "Pending",
      status: "Processing",
    },
    {
      id: "#100247",
      customer: "Amit Kumar",
      date: "16 Jul 2026",
      total: "₹5,120",
      payment: "Paid",
      status: "Shipped",
    },
  ]);

  const badge = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Shipped":
        return "bg-purple-100 text-purple-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm">
      <div className="p-6 border-b flex justify-between flex-wrap gap-3">
        <h2 className="text-xl font-bold">Orders</h2>

        <div className="relative">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-3 text-gray-400" />

          <input
            placeholder="Search order..."
            className="border rounded-xl pl-10 py-2 pr-4"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left">Order</th>
              <th className="text-left">Customer</th>
              <th className="text-left">Date</th>
              <th className="text-left">Total</th>
              <th className="text-left">Payment</th>
              <th className="text-left">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-slate-50">
                <td className="p-4 font-semibold">{order.id}</td>

                <td>{order.customer}</td>

                <td>{order.date}</td>

                <td className="font-semibold text-green-600">{order.total}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${badge(order.payment)}`}
                  >
                    {order.payment}
                  </span>
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${badge(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  <div className="flex justify-center gap-3">
                    <button className="text-indigo-600">
                      <HiOutlineEye size={20} />
                    </button>

                    <button className="text-green-600">
                      <HiOutlineTruck size={20} />
                    </button>

                    <button className="text-orange-600">
                      <HiOutlinePrinter size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
