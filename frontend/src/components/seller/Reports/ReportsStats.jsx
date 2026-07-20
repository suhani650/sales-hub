import { motion } from "framer-motion";

export default function ReportsStats({ stats }) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
      {stats.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl border shadow-sm p-6"
        >
          <div className={`w-14 h-14 rounded-xl ${item.color}`}></div>

          <p className="mt-5 text-gray-500">{item.title}</p>

          <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
        </motion.div>
      ))}
    </div>
  );
}
