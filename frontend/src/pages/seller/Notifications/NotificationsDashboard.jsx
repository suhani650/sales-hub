import { motion } from "framer-motion";
import { HiOutlineBell, HiOutlineArrowPath } from "react-icons/hi2";

import NotificationCenter from "../../../components/seller/Notifications/NotificationCenter";
import NotificationStats from "../../../components/seller/Notifications/NotificationStats";

const stats = [
  {
    title: "Total Notifications",
    value: "12,486",
    color: "bg-indigo-500",
  },
  {
    title: "Unread",
    value: "42",
    color: "bg-red-500",
  },
  {
    title: "Email Sent",
    value: "8,248",
    color: "bg-green-500",
  },
  {
    title: "Push Notifications",
    value: "4,238",
    color: "bg-yellow-500",
  },
];

export default function NotificationsDashboard() {
  return (
    <motion.div
      className="space-y-6 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>

          <p className="text-gray-500 mt-2">
            Manage seller notifications and alerts.
          </p>
        </div>

        <button className="bg-indigo-600 text-white rounded-xl px-5 py-3 flex items-center gap-2">
          <HiOutlineArrowPath />
          Refresh
        </button>
      </div>

      <NotificationStats stats={stats} />

      <NotificationCenter />
    </motion.div>
  );
}
