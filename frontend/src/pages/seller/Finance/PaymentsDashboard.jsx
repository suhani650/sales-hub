import {
  HiOutlineCurrencyRupee,
  HiOutlineCreditCard,
  HiOutlineBanknotes,
  HiOutlineClock,
  HiOutlineArrowTrendingUp,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

const stats = [
  {
    title: "Total Revenue",
    value: "₹18.4L",
    change: "+18%",
    icon: HiOutlineCurrencyRupee,
    color: "from-emerald-500 to-green-600",
  },
  {
    title: "Successful Payments",
    value: "1,248",
    change: "+11%",
    icon: HiOutlineCheckCircle,
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Pending Payouts",
    value: "₹2.8L",
    change: "Pending",
    icon: HiOutlineClock,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Settlements",
    value: "₹15.6L",
    change: "+9%",
    icon: HiOutlineBanknotes,
    color: "from-purple-500 to-indigo-600",
  },
];

const payments = [
  {
    id: "PAY-1001",
    order: "ORD-1201",
    customer: "Rahul Sharma",
    amount: "₹4,999",
    method: "UPI",
    status: "Completed",
    date: "18 Jul 2026",
  },
  {
    id: "PAY-1002",
    order: "ORD-1202",
    customer: "Priya Verma",
    amount: "₹2,499",
    method: "Credit Card",
    status: "Pending",
    date: "17 Jul 2026",
  },
  {
    id: "PAY-1003",
    order: "ORD-1203",
    customer: "Amit Kumar",
    amount: "₹8,999",
    method: "Net Banking",
    status: "Completed",
    date: "16 Jul 2026",
  },
];

export default function PaymentsDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#071028] via-[#111936] to-[#1E1B4B] p-8">
        <div className="flex justify-between items-center flex-wrap gap-6">
          <div>
            <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 text-sm">
              Seller Payments
            </span>

            <h1 className="text-4xl font-bold text-white mt-5">
              Payments Dashboard
            </h1>

            <p className="text-slate-400 mt-3 max-w-2xl">
              Monitor transactions, settlements, payment methods and payout
              history.
            </p>
          </div>

          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 duration-300">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 hover:scale-[1.02] duration-300"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center`}
              >
                <Icon className="text-2xl text-white" />
              </div>

              <p className="text-slate-400 mt-5">{item.title}</p>

              <h2 className="text-3xl font-bold text-white mt-2">
                {item.value}
              </h2>

              <p className="text-green-400 mt-2">{item.change}</p>
            </div>
          );
        })}
      </div>

      {/* Payment Overview */}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              Recent Transactions
            </h2>

            <HiOutlineCreditCard className="text-cyan-400 text-3xl" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/50">
                <tr className="text-slate-400">
                  <th className="p-4 text-left">Payment</th>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Method</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-t border-white/10 hover:bg-white/5"
                  >
                    <td className="p-4">
                      <p className="text-white font-semibold">{payment.id}</p>

                      <p className="text-slate-500 text-sm">{payment.order}</p>
                    </td>

                    <td className="p-4 text-slate-300">{payment.customer}</td>

                    <td className="p-4 text-green-400 font-semibold">
                      {payment.amount}
                    </td>

                    <td className="p-4 text-slate-300">{payment.method}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          payment.status === "Completed"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>

                    <td className="p-4 text-slate-400">{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel */}

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-600 to-blue-700 p-6">
            <HiOutlineArrowTrendingUp className="text-5xl text-white" />

            <h3 className="text-white text-2xl font-bold mt-5">
              Monthly Growth
            </h3>

            <h2 className="text-5xl font-bold text-white mt-4">+18%</h2>

            <p className="text-cyan-100 mt-3">
              Payments increased compared to last month.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
            <h3 className="text-white text-xl font-bold">Payment Methods</h3>

            <div className="space-y-4 mt-6">
              {[
                ["UPI", "42%"],
                ["Cards", "31%"],
                ["Net Banking", "18%"],
                ["Wallet", "9%"],
              ].map(([name, value]) => (
                <div key={name} className="flex justify-between items-center">
                  <span className="text-slate-300">{name}</span>

                  <span className="text-cyan-400 font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
