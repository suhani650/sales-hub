import { motion } from "framer-motion";
import { HiOutlineTruck, HiOutlineArrowDownTray } from "react-icons/hi2";

import ShippingStats from "../../../components/seller/Shipping/ShippingStats";
import ShipmentList from "../../../components/seller/Shipping/ShipmentList";

const stats = [
  {
    title: "Total Shipments",
    value: "2,486",
    color: "bg-blue-500",
    growth: "+12%",
  },
  {
    title: "In Transit",
    value: "324",
    color: "bg-yellow-500",
    growth: "+6%",
  },
  {
    title: "Delivered",
    value: "2,018",
    color: "bg-green-500",
    growth: "+18%",
  },
  {
    title: "Delayed",
    value: "52",
    color: "bg-red-500",
    growth: "-2%",
  },
];

export default function ShippingDashboard() {
  return (
    <motion.div
      className="space-y-6 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Shipping & Logistics</h1>

          <p className="text-gray-500 mt-2">
            Manage shipments, courier partners and deliveries.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="border rounded-xl px-5 py-3 flex items-center gap-2">
            <HiOutlineArrowDownTray />
            Export
          </button>

          <button className="bg-indigo-600 text-white rounded-xl px-5 py-3 flex items-center gap-2">
            <HiOutlineTruck />
            Create Shipment
          </button>
        </div>
      </div>

      <ShippingStats stats={stats} />

      <ShipmentList />
    </motion.div>
  );
}
