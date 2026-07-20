import { useState } from "react";
import {
  FaShoppingCart,
  FaClock,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaMoneyBillWave,
  FaChartLine,
  FaDownload,
} from "react-icons/fa";

import OrderFilters from "../../../components/seller/Orders/OrderFilters";

export default function OrderDashboard() {
  const [filters, setFilters] = useState({
    orderId: "",
    customer: "",
    status: "",
    paymentStatus: "",
    deliveryStatus: "",
    date: "",
  });

  const stats = [
    {
      title: "Total Orders",
      value: 1248,
      icon: <FaShoppingCart />,
      color: "blue",
    },
    {
      title: "New Orders",
      value: 86,
      icon: <FaClock />,
      color: "purple",
    },
    {
      title: "Processing",
      value: 142,
      icon: <FaChartLine />,
      color: "orange",
    },
    {
      title: "Shipped",
      value: 326,
      icon: <FaTruck />,
      color: "indigo",
    },
    {
      title: "Delivered",
      value: 640,
      icon: <FaCheckCircle />,
      color: "green",
    },
    {
      title: "Cancelled",
      value: 54,
      icon: <FaTimesCircle />,
      color: "red",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-10245",
      customer: "Rahul Sharma",
      product: "iPhone 16 Pro",
      amount: "₹1,29,999",
      status: "Delivered",
    },
    {
      id: "#ORD-10246",
      customer: "Priya Singh",
      product: "MacBook Air",
      amount: "₹89,999",
      status: "Processing",
    },
    {
      id: "#ORD-10247",
      customer: "Amit Patel",
      product: "Wireless Headphones",
      amount: "₹4,999",
      status: "Shipped",
    },
    {
      id: "#ORD-10248",
      customer: "Neha Gupta",
      product: "Smart Watch",
      amount: "₹7,999",
      status: "Cancelled",
    },
  ];

  const resetFilters = () => {
    setFilters({
      orderId: "",
      customer: "",
      status: "",
      paymentStatus: "",
      deliveryStatus: "",
      date: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="
          bg-white
          rounded-2xl
          border
          shadow-sm
          p-6
          flex
          justify-between
          items-center
        "
      >
        <div>
          <h1 className="text-3xl font-bold">Order Dashboard</h1>

          <p className="text-gray-500 mt-2">
            Manage and monitor all seller orders
          </p>
        </div>

        <button
          className="
            bg-blue-600
            text-white
            px-5
            py-3
            rounded-xl
            flex
            gap-2
            items-center
          "
        >
          <FaDownload />
          Export Orders
        </button>
      </div>

      {/* Filters */}
      <OrderFilters
        filters={filters}
        setFilters={setFilters}
        onExport={() => console.log("Export Orders")}
        onReset={resetFilters}
      />

      {/* Statistics */}
      <div
        className="
          grid
          xl:grid-cols-6
          lg:grid-cols-3
          md:grid-cols-2
          gap-5
        "
      >
        {stats.map((item, index) => (
          <StatCard key={index} {...item} />
        ))}
      </div>

      {/* Revenue + Chart */}
      <div
        className="
          grid
          lg:grid-cols-3
          gap-6
        "
      >
        <div
          className="
            bg-white
            border
            rounded-2xl
            shadow-sm
            p-6
          "
        >
          <FaMoneyBillWave
            className="
              text-green-600
              text-3xl
            "
          />

          <p className="text-gray-500 mt-5">Total Revenue</p>

          <h2
            className="
              text-4xl
              font-bold
              mt-2
            "
          >
            ₹48,25,600
          </h2>

          <p
            className="
              text-green-600
              mt-4
            "
          >
            ↑ 18.5% this month
          </p>
        </div>

        <div
          className="
            lg:col-span-2
            bg-white
            border
            rounded-2xl
            shadow-sm
            p-6
          "
        >
          <div className="flex justify-between">
            <h3 className="font-bold text-lg">Sales Performance</h3>

            <FaChartLine
              className="
                text-blue-600
                text-xl
              "
            />
          </div>

          <div
            className="
              h-72
              mt-6
              border-2
              border-dashed
              rounded-xl
              flex
              items-center
              justify-center
              text-gray-400
            "
          >
            📈 Sales Chart
            <br />
            (Chart.js Ready)
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div
        className="
          bg-white
          border
          rounded-2xl
          shadow-sm
          overflow-hidden
        "
      >
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Recent Orders</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Order ID</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="
                    border-t
                    hover:bg-gray-50
                  "
                >
                  <td className="p-4 font-semibold">{order.id}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4">{order.product}</td>
                  <td className="p-4 font-bold">{order.amount}</td>

                  <td className="p-4">
                    <Status status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    indigo: "bg-indigo-100 text-indigo-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-5">
      <div
        className={`
          w-14
          h-14
          rounded-xl
          flex
          items-center
          justify-center
          text-2xl
          ${colors[color]}
        `}
      >
        {icon}
      </div>

      <p className="text-gray-500 mt-4">{title}</p>

      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}

function Status({ status }) {
  const map = {
    Delivered: "bg-green-100 text-green-600",
    Processing: "bg-orange-100 text-orange-600",
    Shipped: "bg-blue-100 text-blue-600",
    Cancelled: "bg-red-100 text-red-600",
  };

  return (
    <span
      className={`
        px-3
        py-2
        rounded-full
        font-semibold
        text-sm
        ${map[status]}
      `}
    >
      {status}
    </span>
  );
}
