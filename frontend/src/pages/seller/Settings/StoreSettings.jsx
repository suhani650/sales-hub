import { motion } from "framer-motion";
import { HiOutlineCog6Tooth, HiOutlineArrowDownTray } from "react-icons/hi2";

import StoreProfile from "../../../components/seller/Settings/StoreProfile";
import BusinessInformation from "../../../components/seller/Settings/BusinessInformation";

export default function StoreSettings() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-6"
    >
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Store Settings</h1>

          <p className="text-gray-500 mt-2">
            Configure your seller account and business settings.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="border rounded-xl px-5 py-3 flex items-center gap-2">
            <HiOutlineArrowDownTray />
            Backup
          </button>

          <button className="bg-indigo-600 text-white rounded-xl px-5 py-3 flex items-center gap-2">
            <HiOutlineCog6Tooth />
            Save Changes
          </button>
        </div>
      </div>

      <StoreProfile />

      <BusinessInformation />
    </motion.div>
  );
}
