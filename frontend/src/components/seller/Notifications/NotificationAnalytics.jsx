import {
  HiOutlineBell,
  HiOutlineEnvelope,
  HiOutlineDevicePhoneMobile,
  HiOutlineChartBar,
} from "react-icons/hi2";

const cards = [
  {
    title: "Total Sent",
    value: "12,486",
    icon: HiOutlineBell,
  },
  {
    title: "Emails",
    value: "8,248",
    icon: HiOutlineEnvelope,
  },
  {
    title: "Push",
    value: "4,238",
    icon: HiOutlineDevicePhoneMobile,
  },
  {
    title: "Read Rate",
    value: "92%",
    icon: HiOutlineChartBar,
  },
];

export default function NotificationAnalytics() {
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
