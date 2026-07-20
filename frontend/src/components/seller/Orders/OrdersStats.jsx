import { motion } from "framer-motion";

export default function OrdersStats({ stats }) {
  return (
    <div className="grid xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 gap-5">
      {stats.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -5 }}
          className="bg-white border rounded-2xl shadow-sm p-5"
        >
          <div className={`w-14 h-14 rounded-xl ${item.color}`}></div>

          <p className="text-gray-500 mt-5">{item.title}</p>

          <h2 className="text-3xl font-bold mt-2">{item.value}</h2>

          <span className="text-green-600 text-sm font-semibold">
            {item.growth}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
