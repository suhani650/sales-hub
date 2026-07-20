import { motion } from "framer-motion";
import { HiOutlineChartBar, HiOutlineArrowDownTray } from "react-icons/hi2";

import SalesReport from "../../../components/seller/Reports/SalesReport";
import ReportsStats from "../../../components/seller/Reports/ReportsStats";

const stats = [
  {
    title: "Total Revenue",
    value: "₹58.4L",
    color: "bg-green-500",
  },
  {
    title: "Orders",
    value: "12,486",
    color: "bg-blue-500",
  },
  {
    title: "Products Sold",
    value: "28,932",
    color: "bg-purple-500",
  },
  {
    title: "Growth",
    value: "+18%",
    color: "bg-yellow-500",
  },
];

export default function ReportsDashboard() {
  return (
    <motion.div
      className="space-y-6 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>

          <p className="text-gray-500 mt-2">
            Analyze your business performance.
          </p>
        </div>

        <button className="bg-indigo-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <HiOutlineArrowDownTray />
          Export Reports
        </button>
      </div>

      <ReportsStats stats={stats} />

      <SalesReport />
    </motion.div>
  );
}
