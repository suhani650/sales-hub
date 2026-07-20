import {
  HiOutlineBell,
  HiOutlineEnvelope,
  HiOutlineShoppingBag,
  HiOutlineTruck,
} from "react-icons/hi2";

const notifications = [
  {
    id: 1,
    icon: HiOutlineShoppingBag,
    title: "New Order Received",
    message: "Order #ORD10248 has been placed.",
    time: "2 min ago",
  },
  {
    id: 2,
    icon: HiOutlineTruck,
    title: "Shipment Delivered",
    message: "Shipment #SHIP1021 delivered successfully.",
    time: "18 min ago",
  },
  {
    id: 3,
    icon: HiOutlineEnvelope,
    title: "Customer Message",
    message: "A customer replied to your order.",
    time: "1 hour ago",
  },
  {
    id: 4,
    icon: HiOutlineBell,
    title: "Low Stock Alert",
    message: "Wireless Mouse stock is running low.",
    time: "Today",
  },
];

export default function NotificationCenter() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Notification Center</h2>
      </div>

      <div>
        {notifications.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="flex gap-5 items-start border-b p-5 hover:bg-gray-50"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Icon className="text-indigo-600" size={22} />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>

                <p className="text-gray-500 mt-1">{item.message}</p>
              </div>

              <span className="text-sm text-gray-400">{item.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
