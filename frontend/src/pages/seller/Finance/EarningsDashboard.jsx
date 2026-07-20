import {
  FaWallet,
  FaRupeeSign,
  FaMoneyCheckAlt,
  FaUniversity,
  FaArrowUp,
  FaArrowDown,
  FaDownload,
  FaChartLine,
} from "react-icons/fa";

export default function EarningsDashboard() {
  const stats = [
    {
      title: "Total Earnings",
      value: "₹24.86 L",
      icon: <FaWallet />,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "This Month",
      value: "₹3.42 L",
      icon: <FaRupeeSign />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Pending Settlement",
      value: "₹84,260",
      icon: <FaMoneyCheckAlt />,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Bank Transfers",
      value: "248",
      icon: <FaUniversity />,
      color: "from-purple-500 to-pink-600",
    },
  ];

  const settlements = [
    {
      id: "SET-1001",
      date: "15 Jul 2026",
      amount: "₹48,250",
      status: "Completed",
    },
    {
      id: "SET-1002",
      date: "10 Jul 2026",
      amount: "₹39,870",
      status: "Completed",
    },
    {
      id: "SET-1003",
      date: "05 Jul 2026",
      amount: "₹82,430",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}

      <div className="rounded-[32px] border border-white/10 bg-gradient-to-r from-[#071028] via-[#111936] to-[#1E1B4B] p-8">
        <div className="flex flex-col xl:flex-row justify-between gap-8">
          <div>
            <span className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-semibold">
              Seller Finance Center
            </span>

            <h1 className="text-5xl font-bold text-white mt-5">
              Earnings Dashboard
            </h1>

            <p className="text-slate-300 mt-5 leading-8 max-w-3xl">
              Track earnings, settlements, commissions, withdrawals and payment
              history in one place.
            </p>
          </div>

          <button className="h-fit px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 duration-300 flex items-center gap-3">
            <FaDownload />
            Export Report
          </button>
        </div>
      </div>

      {/* Statistics */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6"
          >
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-2xl`}
            >
              {item.icon}
            </div>

            <p className="text-slate-400 mt-5">{item.title}</p>

            <h2 className="text-3xl font-bold text-white mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Main */}

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Settlements */}

        <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
          <h2 className="text-2xl font-bold text-white mb-6">
            Recent Settlements
          </h2>

          <div className="space-y-5">
            {settlements.map((item) => (
              <div
                key={item.id}
                className="border border-white/10 rounded-2xl p-5 hover:border-cyan-500 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-semibold">{item.id}</h3>

                    <p className="text-slate-400 mt-2">{item.date}</p>
                  </div>

                  <div className="text-right">
                    <h3 className="text-2xl font-bold text-green-400">
                      {item.amount}
                    </h3>

                    <span
                      className={`inline-block mt-2 px-4 py-1 rounded-full text-sm ${
                        item.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-orange-500/20 text-orange-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings Summary */}

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
            <div className="flex items-center gap-3">
              <FaChartLine className="text-cyan-400 text-2xl" />

              <h2 className="text-xl font-bold text-white">Growth Overview</h2>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="w-40 h-40 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex flex-col items-center justify-center">
                <h2 className="text-5xl font-bold text-white">+18%</h2>

                <p className="text-white">Monthly Growth</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
            <h2 className="text-xl font-bold text-white mb-6">
              Earnings Breakdown
            </h2>

            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Revenue</span>

                <span className="flex items-center gap-2 text-green-400 font-semibold">
                  <FaArrowUp />
                  ₹24.86 L
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-300">Commission</span>

                <span className="flex items-center gap-2 text-red-400 font-semibold">
                  <FaArrowDown />
                  ₹1.84 L
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-300">Net Profit</span>

                <span className="text-cyan-400 font-bold">₹23.02 L</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-300">Pending</span>

                <span className="text-orange-400 font-bold">₹84,260</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
