import {
  HiOutlineChartBar,
  HiOutlineCurrencyRupee,
  HiOutlineShoppingBag,
  HiOutlineUsers,
} from "react-icons/hi2";

const cards = [
  {
    title: "Revenue",
    value: "₹58.4L",
    icon: HiOutlineCurrencyRupee,
  },
  {
    title: "Orders",
    value: "12,486",
    icon: HiOutlineShoppingBag,
  },
  {
    title: "Customers",
    value: "4,284",
    icon: HiOutlineUsers,
  },
  {
    title: "Growth",
    value: "+18%",
    icon: HiOutlineChartBar,
  },
];

export default function PerformanceAnalytics() {
  return (
    <div className="grid lg:grid-cols-4 gap-5">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-2xl border shadow-sm p-6"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Icon className="text-indigo-600" size={24} />
            </div>

            <p className="mt-5 text-gray-500">{card.title}</p>

            <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
          </div>
        );
      })}
    </div>
  );
}
