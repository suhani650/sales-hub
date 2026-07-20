import {
  HiOutlineTruck,
  HiOutlineClock,
  HiOutlineCurrencyRupee,
  HiOutlineCheckBadge,
} from "react-icons/hi2";

const cards = [
  {
    title: "Avg Delivery",
    value: "2.8 Days",
    icon: HiOutlineClock,
  },
  {
    title: "Shipping Cost",
    value: "₹2.45 L",
    icon: HiOutlineCurrencyRupee,
  },
  {
    title: "Delivered",
    value: "2018",
    icon: HiOutlineCheckBadge,
  },
  {
    title: "Courier Score",
    value: "98.9%",
    icon: HiOutlineTruck,
  },
];

export default function ShippingAnalytics() {
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

            <p className="text-gray-500 mt-5">{card.title}</p>

            <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
          </div>
        );
      })}
    </div>
  );
}
