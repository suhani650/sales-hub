import { motion } from "framer-motion";
import ReturnsStats from "../../../components/seller/Returns/ReturnsStats";
import ReturnRequests from "../../../components/seller/Returns/ReturnRequests";
import { HiOutlineArrowDownTray, HiOutlineArrowPath } from "react-icons/hi2";

const stats = [
  {
    title: "Total Returns",
    value: "286",
    color: "bg-indigo-500",
    growth: "+12%",
  },
  {
    title: "Pending Approval",
    value: "42",
    color: "bg-yellow-500",
    growth: "+5%",
  },
  {
    title: "Approved",
    value: "198",
    color: "bg-green-500",
    growth: "+15%",
  },
  {
    title: "Rejected",
    value: "46",
    color: "bg-red-500",
    growth: "-3%",
  },
];

export default function ReturnsDashboard() {
  return (
    <motion.div
      className="space-y-6 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Returns & Refunds</h1>

          <p className="text-gray-500 mt-2">
            Manage return requests and customer refunds.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="border rounded-xl px-5 py-3 flex gap-2 items-center">
            <HiOutlineArrowDownTray />
            Export
          </button>

          <button className="bg-indigo-600 text-white rounded-xl px-5 py-3 flex gap-2 items-center">
            <HiOutlineArrowPath />
            Refresh
          </button>
        </div>
      </div>

      <ReturnsStats stats={stats} />

      <ReturnRequests />
    </motion.div>
  );
}
