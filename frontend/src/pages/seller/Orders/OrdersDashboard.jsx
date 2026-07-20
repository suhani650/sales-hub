import { motion } from "framer-motion";
import OrdersStats from "../../../components/seller/Orders/OrdersStats";
import OrdersList from "../../../components/seller/Orders/OrdersList";
import { HiOutlineArrowDownTray, HiOutlinePlus } from "react-icons/hi2";

const stats = [
  {
    title: "Total Orders",
    value: "5,482",
    growth: "+18%",
    color: "bg-indigo-500",
  },
  {
    title: "Pending",
    value: "248",
    growth: "+6%",
    color: "bg-yellow-500",
  },
  {
    title: "Processing",
    value: "124",
    growth: "+4%",
    color: "bg-blue-500",
  },
  {
    title: "Shipped",
    value: "884",
    growth: "+12%",
    color: "bg-purple-500",
  },
  {
    title: "Delivered",
    value: "4,026",
    growth: "+15%",
    color: "bg-green-500",
  },
  {
    title: "Cancelled",
    value: "52",
    growth: "-2%",
    color: "bg-red-500",
  },
];

export default function OrdersDashboard() {
  return (
    <motion.div
      className="space-y-6 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Orders Management</h1>

          <p className="text-gray-500 mt-2">
            Track, process and manage all customer orders.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="border rounded-xl px-5 py-3 flex items-center gap-2">
            <HiOutlineArrowDownTray size={20} />
            Export
          </button>

          <button className="bg-indigo-600 text-white rounded-xl px-5 py-3 flex items-center gap-2">
            <HiOutlinePlus size={20} />
            New Order
          </button>
        </div>
      </div>

      <OrdersStats stats={stats} />

      <OrdersList />
    </motion.div>
  );
}
