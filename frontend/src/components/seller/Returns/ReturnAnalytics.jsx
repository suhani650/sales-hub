import {
  HiOutlineArrowPath,
  HiOutlineCurrencyRupee,
  HiOutlineChartBar,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";

const analytics = [
  {
    title: "Return Rate",
    value: "2.8%",
    icon: HiOutlineArrowPath,
  },
  {
    title: "Refund Amount",
    value: "₹84,250",
    icon: HiOutlineCurrencyRupee,
  },
  {
    title: "Approved Returns",
    value: "198",
    icon: HiOutlineChartBar,
  },
  {
    title: "Damaged Products",
    value: "42",
    icon: HiOutlineExclamationTriangle,
  },
];

export default function ReturnAnalytics() {
  return (
    <div className="grid lg:grid-cols-4 gap-5">
      {analytics.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-2xl border shadow-sm p-6"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Icon size={24} className="text-indigo-600" />
            </div>

            <p className="text-gray-500 mt-5">{card.title}</p>

            <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
          </div>
        );
      })}
    </div>
  );
}
