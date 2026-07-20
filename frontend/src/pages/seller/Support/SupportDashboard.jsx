import { motion } from "framer-motion";
import { HiOutlineLifebuoy, HiOutlinePlus } from "react-icons/hi2";

import SupportStats from "../../../components/seller/Support/SupportStats";
import Tickets from "../../../components/seller/Support/Tickets";

const stats = [
  {
    title: "Total Tickets",
    value: "248",
    color: "bg-indigo-500",
  },
  {
    title: "Open",
    value: "24",
    color: "bg-yellow-500",
  },
  {
    title: "Resolved",
    value: "206",
    color: "bg-green-500",
  },
  {
    title: "High Priority",
    value: "18",
    color: "bg-red-500",
  },
];

export default function SupportDashboard() {
  return (
    <motion.div
      className="space-y-6 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Support Center</h1>

          <p className="text-gray-500 mt-2">
            Manage support tickets and customer queries.
          </p>
        </div>

        <button className="bg-indigo-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <HiOutlinePlus />
          New Ticket
        </button>
      </div>

      <SupportStats stats={stats} />

      <Tickets />
    </motion.div>
  );
}
