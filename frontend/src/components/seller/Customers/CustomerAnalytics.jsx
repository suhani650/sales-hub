import {
  HiOutlineUsers,
  HiOutlineCurrencyRupee,
  HiOutlineShoppingBag,
  HiOutlineStar,
} from "react-icons/hi2";

const cards = [
  {
    title: "Lifetime Value",
    value: "₹84,500",
    icon: HiOutlineCurrencyRupee,
  },
  {
    title: "Total Orders",
    value: "42",
    icon: HiOutlineShoppingBag,
  },
  {
    title: "Loyalty Score",
    value: "94%",
    icon: HiOutlineStar,
  },
  {
    title: "Referrals",
    value: "18",
    icon: HiOutlineUsers,
  },
];

export default function CustomerAnalytics() {
  return (
    <div className="grid lg:grid-cols-4 gap-5">
      {cards.map((item, index) => {
        const Icon = item.icon;

        return (
          <div key={index} className="bg-white border rounded-2xl shadow p-5">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Icon className="text-indigo-600" size={24} />
            </div>

            <p className="mt-5 text-gray-500">{item.title}</p>

            <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
          </div>
        );
      })}
    </div>
  );
}
