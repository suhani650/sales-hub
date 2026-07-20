import { motion } from "framer-motion";
import { HiOutlineBanknotes, HiOutlineArrowDownTray } from "react-icons/hi2";

import WalletStats from "../../../components/seller/Wallet/WalletStats";
import Transactions from "../../../components/seller/Wallet/Transactions";

const stats = [
  {
    title: "Available Balance",
    value: "₹2,48,520",
    growth: "+18%",
    color: "bg-green-500",
  },
  {
    title: "Pending Payout",
    value: "₹48,220",
    growth: "+6%",
    color: "bg-yellow-500",
  },
  {
    title: "This Month",
    value: "₹8,82,400",
    growth: "+15%",
    color: "bg-indigo-500",
  },
  {
    title: "Lifetime Earnings",
    value: "₹58.4L",
    growth: "+24%",
    color: "bg-purple-500",
  },
];

export default function WalletDashboard() {
  return (
    <motion.div
      className="space-y-6 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Wallet & Payouts</h1>

          <p className="text-gray-500 mt-2">
            Manage wallet balance and payout requests.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="border rounded-xl px-5 py-3 flex items-center gap-2">
            <HiOutlineArrowDownTray />
            Export
          </button>

          <button className="bg-indigo-600 text-white rounded-xl px-5 py-3 flex items-center gap-2">
            <HiOutlineBanknotes />
            Withdraw
          </button>
        </div>
      </div>

      <WalletStats stats={stats} />

      <Transactions />
    </motion.div>
  );
}
