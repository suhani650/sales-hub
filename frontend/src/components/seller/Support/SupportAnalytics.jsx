import {
  HiOutlineTicket,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";

const analytics = [
  {
    title: "Open Tickets",
    value: "24",
    icon: HiOutlineTicket,
  },
  {
    title: "Resolved",
    value: "206",
    icon: HiOutlineCheckCircle,
  },
  {
    title: "Avg Response",
    value: "2.1 hrs",
    icon: HiOutlineClock,
  },
  {
    title: "Escalated",
    value: "8",
    icon: HiOutlineExclamationTriangle,
  },
];

export default function SupportAnalytics() {
  return (
    <div className="grid lg:grid-cols-4 gap-5">
      {analytics.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-2xl border shadow-sm p-6"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Icon size={24} className="text-indigo-600" />
            </div>

            <p className="mt-5 text-gray-500">{item.title}</p>

            <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
          </div>
        );
      })}
    </div>
  );
}
