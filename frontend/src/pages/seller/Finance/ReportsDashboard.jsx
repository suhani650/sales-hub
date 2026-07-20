import {
  HiOutlineDocumentChartBar,
  HiOutlineArrowDownTray,
  HiOutlineCalendarDays,
  HiOutlineCurrencyRupee,
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiOutlineChartBar,
} from "react-icons/hi2";

const reportCards = [
  {
    title: "Sales Report",
    value: "₹28.4L",
    growth: "+18%",
    icon: HiOutlineCurrencyRupee,
    color: "from-emerald-500 to-green-600",
  },
  {
    title: "Orders Report",
    value: "2,846",
    growth: "+12%",
    icon: HiOutlineShoppingBag,
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Customers",
    value: "8,462",
    growth: "+9%",
    icon: HiOutlineUsers,
    color: "from-purple-500 to-indigo-600",
  },
  {
    title: "Analytics",
    value: "96%",
    growth: "+4%",
    icon: HiOutlineChartBar,
    color: "from-orange-500 to-red-500",
  },
];

export default function ReportsDashboard() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <div className="rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-[#071028] via-[#111936] to-[#1E1B4B] p-8">
        <div className="flex justify-between items-center flex-wrap gap-8">
          <div>
            <span className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/20 text-cyan-300 text-sm">
              Enterprise Reports
            </span>

            <h1 className="text-5xl font-bold text-white mt-5">
              Reports Dashboard
            </h1>

            <p className="text-slate-400 mt-4 max-w-3xl leading-8">
              Generate business reports, export sales, inventory, customers,
              orders and financial reports with one click.
            </p>
          </div>

          <button className="px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold flex items-center gap-3 hover:scale-105 duration-300">
            <HiOutlineArrowDownTray className="text-2xl" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
        {reportCards.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 hover:scale-[1.02] duration-300"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center`}
              >
                <Icon className="text-3xl text-white" />
              </div>

              <p className="text-slate-400 mt-5">{item.title}</p>

              <h2 className="text-4xl text-white font-bold mt-2">
                {item.value}
              </h2>

              <p className="text-green-400 mt-2">{item.growth}</p>
            </div>
          );
        })}
      </div>

      {/* Report Generator */}

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-8">
          <div className="flex items-center gap-4">
            <HiOutlineDocumentChartBar className="text-cyan-400 text-4xl" />

            <div>
              <h2 className="text-2xl font-bold text-white">Generate Report</h2>

              <p className="text-slate-400">
                Select report type & export format
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <select className="bg-[#111827] border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-500">
              <option>Sales Report</option>

              <option>Orders Report</option>

              <option>Customers Report</option>

              <option>Inventory Report</option>

              <option>Payments Report</option>
            </select>

            <select className="bg-[#111827] border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-500">
              <option>PDF</option>

              <option>Excel</option>

              <option>CSV</option>
            </select>

            <input
              type="date"
              className="bg-[#111827] border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-500"
            />

            <input
              type="date"
              className="bg-[#111827] border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-500"
            />
          </div>

          <button className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 duration-300">
            Generate Report
          </button>
        </div>

        {/* Quick Reports */}

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-8">
          <h2 className="text-2xl text-white font-bold">Quick Reports</h2>

          <div className="space-y-4 mt-8">
            {[
              "Today's Sales",
              "Weekly Orders",
              "Monthly Revenue",
              "Inventory Stock",
              "Customer Report",
              "Tax Summary",
            ].map((item) => (
              <button
                key={item}
                className="w-full rounded-xl bg-slate-800 hover:bg-cyan-600 transition p-4 text-left text-white"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* ===========================
            RECENT REPORTS
      =========================== */}

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Recent Reports */}

        <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Recent Generated Reports
              </h2>

              <p className="text-slate-400 mt-2">Recently exported reports</p>
            </div>

            <button className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white duration-300">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#111827]">
                <tr>
                  <th className="p-4 text-left text-slate-400">Report</th>

                  <th className="p-4 text-left text-slate-400">Date</th>

                  <th className="p-4 text-left text-slate-400">Format</th>

                  <th className="p-4 text-left text-slate-400">Size</th>

                  <th className="p-4 text-center text-slate-400">Status</th>
                </tr>
              </thead>

              <tbody>
                {[
                  ["Sales Report", "18 Jul 2026", "PDF", "2.8 MB", "Completed"],
                  [
                    "Inventory Report",
                    "17 Jul 2026",
                    "Excel",
                    "1.4 MB",
                    "Completed",
                  ],
                  ["Customers", "17 Jul 2026", "CSV", "842 KB", "Completed"],
                  [
                    "Orders Report",
                    "16 Jul 2026",
                    "PDF",
                    "3.5 MB",
                    "Completed",
                  ],
                  ["Payments", "15 Jul 2026", "Excel", "1.8 MB", "Completed"],
                ].map((row, index) => (
                  <tr
                    key={index}
                    className="border-t border-white/10 hover:bg-white/5 duration-300"
                  >
                    <td className="p-4 text-white font-medium">{row[0]}</td>

                    <td className="p-4 text-slate-300">{row[1]}</td>

                    <td className="p-4 text-cyan-400">{row[2]}</td>

                    <td className="p-4 text-green-400">{row[3]}</td>

                    <td className="p-4 text-center">
                      <span className="px-4 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                        {row[4]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analytics */}

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
          <h2 className="text-2xl text-white font-bold">Report Analytics</h2>

          <div className="space-y-6 mt-8">
            <div>
              <div className="flex justify-between">
                <span className="text-slate-400">PDF Reports</span>

                <span className="text-cyan-400">72%</span>
              </div>

              <div className="h-2 rounded-full bg-slate-700 mt-2">
                <div className="h-2 w-[72%] rounded-full bg-cyan-500"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <span className="text-slate-400">Excel Reports</span>

                <span className="text-green-400">58%</span>
              </div>

              <div className="h-2 rounded-full bg-slate-700 mt-2">
                <div className="h-2 w-[58%] rounded-full bg-green-500"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <span className="text-slate-400">CSV Reports</span>

                <span className="text-orange-400">38%</span>
              </div>

              <div className="h-2 rounded-full bg-slate-700 mt-2">
                <div className="h-2 w-[38%] rounded-full bg-orange-500"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <span className="text-slate-400">Auto Reports</span>

                <span className="text-purple-400">90%</span>
              </div>

              <div className="h-2 rounded-full bg-slate-700 mt-2">
                <div className="h-2 w-[90%] rounded-full bg-purple-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===========================
            SCHEDULE + DOWNLOADS
      =========================== */}

      <div className="grid xl:grid-cols-2 gap-6">
        {/* Scheduled */}

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-8">
          <div className="flex items-center gap-4">
            <HiOutlineCalendarDays className="text-cyan-400 text-4xl" />

            <div>
              <h2 className="text-2xl font-bold text-white">
                Scheduled Reports
              </h2>

              <p className="text-slate-400">Automatic report generation</p>
            </div>
          </div>

          <div className="space-y-5 mt-8">
            {[
              "Daily Sales Report • 09:00 AM",
              "Weekly Revenue • Monday",
              "Monthly Tax Report • 1st Date",
              "Inventory Summary • Friday",
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-slate-800 p-5 hover:bg-slate-700 duration-300"
              >
                <p className="text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Download History */}

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-8">
          <h2 className="text-2xl text-white font-bold">Download History</h2>

          <div className="mt-8 space-y-6">
            {[
              "Sales Report Downloaded",
              "Inventory Export",
              "Customer CSV",
              "GST Report",
              "Payment Summary",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-cyan-400"></div>

                <div>
                  <h4 className="text-white font-medium">{item}</h4>

                  <p className="text-slate-500 text-sm">
                    Today • 10:{index}5 AM
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===========================
            FOOTER SUMMARY
      =========================== */}

      <div className="rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 p-8">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <h2 className="text-5xl font-bold text-white">248</h2>

            <p className="text-cyan-100 mt-3">Reports Generated</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-white">98%</h2>

            <p className="text-cyan-100 mt-3">Success Rate</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-white">8.2GB</h2>

            <p className="text-cyan-100 mt-3">Exported Data</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-white">24×7</h2>

            <p className="text-cyan-100 mt-3">Auto Backup</p>
          </div>
        </div>
      </div>
    </div>
  );
}
