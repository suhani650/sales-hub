import { motion } from "framer-motion";
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineShoppingBag,
  HiOutlineCurrencyRupee,
  HiOutlineStar,
} from "react-icons/hi2";

export default function CustomerDetails() {
  const customer = {
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "+91 9876543210",
    address: "New Delhi, India",
    orders: 18,
    spent: "₹48,250",
    rating: "4.9",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-6"
    >
      <div className="bg-white rounded-2xl shadow border p-6">
        <div className="flex items-center gap-5">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt=""
            className="w-24 h-24 rounded-full"
          />

          <div>
            <h2 className="text-3xl font-bold">{customer.name}</h2>

            <div className="grid md:grid-cols-2 gap-3 mt-5">
              <Info icon={<HiOutlineEnvelope />} value={customer.email} />
              <Info icon={<HiOutlinePhone />} value={customer.phone} />
              <Info icon={<HiOutlineMapPin />} value={customer.address} />
              <Info
                icon={<HiOutlineShoppingBag />}
                value={`${customer.orders} Orders`}
              />
              <Info icon={<HiOutlineCurrencyRupee />} value={customer.spent} />
              <Info
                icon={<HiOutlineStar />}
                value={`${customer.rating} Rating`}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Info({ icon, value }) {
  return (
    <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
      <div className="text-indigo-600">{icon}</div>
      <span>{value}</span>
    </div>
  );
}
