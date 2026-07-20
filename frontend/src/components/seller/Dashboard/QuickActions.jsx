import { Link } from "react-router-dom";
import {
  FaPlus,
  FaBoxOpen,
  FaClipboardList,
  FaWarehouse,
  FaUsers,
  FaChartLine,
  FaGift,
  FaComments,
} from "react-icons/fa";

const actions = [
  {
    title: "Add Product",
    icon: <FaPlus size={24} />,
    path: "/seller/products/add",
    color: "bg-blue-500",
  },
  {
    title: "Products",
    icon: <FaBoxOpen size={24} />,
    path: "/seller/products",
    color: "bg-green-500",
  },
  {
    title: "Orders",
    icon: <FaClipboardList size={24} />,
    path: "/seller/orders",
    color: "bg-yellow-500",
  },
  {
    title: "Inventory",
    icon: <FaWarehouse size={24} />,
    path: "/seller/inventory",
    color: "bg-purple-500",
  },
  {
    title: "Customers",
    icon: <FaUsers size={24} />,
    path: "/seller/customers",
    color: "bg-pink-500",
  },
  {
    title: "Analytics",
    icon: <FaChartLine size={24} />,
    path: "/seller/analytics",
    color: "bg-indigo-500",
  },
  {
    title: "Offers",
    icon: <FaGift size={24} />,
    path: "/seller/offers",
    color: "bg-orange-500",
  },
  {
    title: "Support",
    icon: <FaComments size={24} />,
    path: "/seller/chat",
    color: "bg-red-500",
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {actions.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className="group rounded-xl border hover:shadow-lg transition-all p-5 hover:-translate-y-1"
          >
            <div
              className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-all`}
            >
              {item.icon}
            </div>

            <h3 className="font-semibold">{item.title}</h3>

            <p className="text-sm text-gray-500 mt-1">Open Module</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
