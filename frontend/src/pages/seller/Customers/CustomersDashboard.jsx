import { motion } from "framer-motion";
import {
  HiOutlineUsers,
  HiOutlineUserPlus,
  HiOutlineShoppingBag,
  HiOutlineCurrencyRupee,
  HiOutlineStar,
  HiOutlineChartBar,
} from "react-icons/hi2";

import { FaDownload, FaUsers, FaCrown, FaFire } from "react-icons/fa";

import CustomerList from "../../../components/seller/Customers/CustomerList";

import {
  useGetCustomerAnalyticsQuery,
  useGetCustomerSegmentsQuery,
  useGetCustomersQuery,
  useGetActiveCouponsQuery,
} from "../../../services/vendorApi";

export default function CustomerDashboard() {
  const { data: analytics, isLoading: analyticsLoading } =
    useGetCustomerAnalyticsQuery();

  const { data: segments, isLoading: segmentsLoading } =
    useGetCustomerSegmentsQuery();

  const { data: customers = [] } = useGetCustomersQuery();

  const { data: activeCoupons = [] } = useGetActiveCouponsQuery();

  const formatCurrency = (value) => {
    const n = Number(value || 0);
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    return `₹${n.toLocaleString("en-IN")}`;
  };

  const formatCount = (value) => {
    const n = Number(value || 0);
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return String(n);
  };

  const totalRewardPoints = customers.reduce(
    (sum, c) => sum + Number(c.loyaltyPoints || 0),
    0,
  );

  const handleExportCustomers = () => {
    if (!customers.length) {
      alert("No customers to export yet.");
      return;
    }

    const header = ["Name", "Email", "Orders", "Total Spent", "Status"];

    const rows = customers.map((c) => [
      c.name,
      c.email,
      c.orders,
      c.totalSpent,
      c.status,
    ]);

    const escapeCell = (cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`;

    const csv = [header, ...rows]
      .map((row) => row.map(escapeCell).join(","))
      .join("\r\n");

    // Prefix with a UTF-8 BOM so Excel renders names/₹ correctly
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `customers-export-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    // Safari/Firefox need the link in the DOM for click() to trigger a download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const stats = analytics
    ? [
        {
          title: "Total Customers",
          value: formatCount(analytics.totalCustomers),
          color: "from-cyan-500 to-blue-600",
          icon: HiOutlineUsers,
        },
        {
          title: "New Customers",
          value: String(analytics.newCustomersThisMonth ?? 0),
          color: "from-green-500 to-emerald-600",
          icon: HiOutlineUserPlus,
        },
        {
          title: "Orders",
          value: formatCount(analytics.totalOrders),
          color: "from-orange-500 to-red-500",
          icon: HiOutlineShoppingBag,
        },
        {
          title: "Revenue",
          value: formatCurrency(analytics.totalRevenue),
          color: "from-purple-500 to-fuchsia-600",
          icon: HiOutlineCurrencyRupee,
        },
        {
          title: "Avg Rating",
          value: analytics.avgRating?.toFixed(1) ?? "0.0",
          color: "from-pink-500 to-rose-600",
          icon: HiOutlineStar,
        },
        {
          title: "Retention",
          value: `${analytics.retentionRate ?? 0}%`,
          color: "from-indigo-500 to-cyan-600",
          icon: HiOutlineChartBar,
        },
      ]
    : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-r from-[#071028] via-[#111936] to-[#1E1B4B] p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#06b6d450,transparent_45%)]"></div>

        <div className="relative flex flex-col xl:flex-row justify-between gap-10">
          <div>
            <span className="px-5 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-semibold">
              Enterprise CRM
            </span>

            <h1 className="text-5xl font-bold text-white mt-6">
              Customer Management
            </h1>

            <p className="text-slate-400 mt-5 max-w-2xl leading-8">
              Manage customer profiles, purchase history, loyalty rewards,
              analytics, retention, segmentation and customer engagement from
              one enterprise dashboard.
            </p>
          </div>

          <div className="w-[340px] rounded-3xl bg-[#0B1023] border border-cyan-500/20 p-7">
            <div className="flex items-center gap-3">
              <FaUsers className="text-cyan-400 text-2xl" />

              <h3 className="text-xl font-bold text-white">CRM Overview</h3>
            </div>

            <h2 className="text-5xl font-bold text-cyan-400 mt-6">
              {analyticsLoading ? "—" : formatCount(analytics?.totalCustomers)}
            </h2>

            <p className="text-slate-400 mt-3">Active Customers</p>

            <div className="mt-6 h-3 rounded-full bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600"
                style={{ width: `${analytics?.retentionRate ?? 0}%` }}
              />
            </div>

            <p className="text-green-400 mt-4">
              {analytics?.newCustomersThisMonth ?? 0} new customers this month
            </p>
          </div>
        </div>
      </div>
      {/* ============================
            CUSTOMER KPI CARDS
      ============================ */}

      {analyticsLoading ? (
        <div className="grid xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-44 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-br
                from-[#0F172A]
                to-[#1E293B]
                p-6
                hover:border-cyan-500/30
                hover:shadow-[0_0_30px_rgba(34,211,238,.18)]
                duration-300
                "
              >
                <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-cyan-500/10 blur-3xl"></div>

                <div className="relative flex justify-between items-start">
                  <div>
                    <p className="text-slate-400 text-sm">{item.title}</p>

                    <h2 className="text-4xl font-bold text-white mt-4">
                      {item.value}
                    </h2>
                  </div>

                  <div
                    className={`
                    w-16
                    h-16
                    rounded-2xl
                    bg-gradient-to-r
                    ${item.color}
                    flex
                    items-center
                    justify-center
                    text-white
                    text-3xl
                    shadow-xl
                    `}
                  >
                    <Icon />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
      {/* ============================
            CUSTOMER INSIGHTS
      ============================ */}

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Customer Insights */}

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-7 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,.15)] duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">Customer Insights</h3>

            <FaFire className="text-orange-400 text-2xl" />
          </div>

          <div className="space-y-5 mt-8">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Returning Customers</span>

                <span className="text-white font-semibold">
                  {analytics?.retentionRate ?? 0}%
                </span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-slate-700 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                  style={{ width: `${analytics?.retentionRate ?? 0}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">New Customers</span>

                <span className="text-white font-semibold">
                  {100 - (analytics?.retentionRate ?? 0)}%
                </span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-slate-700 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                  style={{
                    width: `${100 - (analytics?.retentionRate ?? 0)}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Repeat Purchases</span>

                <span className="text-white font-semibold">
                  {analytics?.repeatPurchaseRate ?? 0}%
                </span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-slate-700 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
                  style={{ width: `${analytics?.repeatPurchaseRate ?? 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Loyalty */}

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-7 hover:border-green-500/30 hover:shadow-[0_0_30px_rgba(34,197,94,.15)] duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">Loyalty Program</h3>

            <FaCrown className="text-yellow-400 text-2xl" />
          </div>

          <div className="grid grid-cols-2 gap-5 mt-8">
            <div className="rounded-2xl bg-slate-800/50 p-5">
              <p className="text-slate-400 text-sm">Gold Members</p>

              <h2 className="text-3xl text-yellow-400 font-bold mt-2">
                {segmentsLoading ? "—" : (segments?.gold ?? 0)}
              </h2>
            </div>

            <div className="rounded-2xl bg-slate-800/50 p-5">
              <p className="text-slate-400 text-sm">Silver Members</p>

              <h2 className="text-3xl text-white font-bold mt-2">
                {segmentsLoading ? "—" : (segments?.silver ?? 0)}
              </h2>
            </div>

            <div className="rounded-2xl bg-slate-800/50 p-5">
              <p className="text-slate-400 text-sm">Reward Points</p>

              <h2 className="text-3xl text-green-400 font-bold mt-2">
                {formatCount(totalRewardPoints)}
              </h2>
            </div>

            <div className="rounded-2xl bg-slate-800/50 p-5">
              <p className="text-slate-400 text-sm">Active Offers</p>

              <h2 className="text-3xl text-cyan-400 font-bold mt-2">
                {activeCoupons.length}
              </h2>
            </div>
          </div>
        </div>

        {/* Quick Actions */}

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-7 hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,.18)] duration-300">
          <h3 className="text-2xl font-bold text-white">Quick Actions</h3>

          <div className="space-y-4 mt-8">
            <button
              onClick={handleExportCustomers}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-[1.02] duration-300"
            >
              Export Customers
            </button>
          </div>
        </div>
      </div>
      {/* ============================
            CUSTOMER LIST
      ============================ */}

      <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 shadow-[0_10px_40px_rgba(0,0,0,.35)]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Customer Directory
            </h2>

            <p className="text-slate-400 mt-2">
              View complete customer information, order history, loyalty status
              and engagement.
            </p>
          </div>

          <button
            onClick={handleExportCustomers}
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 duration-300"
          >
            <FaDownload />
            Export Customer List
          </button>
        </div>

        <CustomerList />
      </div>

      {/* ============================
            FOOTER
      ============================ */}

      <div className="rounded-[32px] border border-white/10 bg-gradient-to-r from-[#0F172A] to-[#1E293B] p-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-white text-2xl font-bold">Customer Summary</h3>

            <p className="text-slate-400 mt-4 leading-7">
              Keep track of your customers, monitor purchasing behaviour,
              improve retention and build long-term relationships with advanced
              CRM analytics.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-800/40 p-6">
            <p className="text-slate-400">Active Customers</p>

            <h2 className="text-4xl text-cyan-400 font-bold mt-3">
              {analyticsLoading ? "—" : formatCount(analytics?.totalCustomers)}
            </h2>

            <div className="mt-5 h-2 rounded-full bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                style={{ width: `${analytics?.retentionRate ?? 0}%` }}
              ></div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-800/40 p-6">
            <p className="text-slate-400">Customer Retention</p>

            <h2 className="text-4xl text-green-400 font-bold mt-3">
              {analyticsLoading ? "—" : `${analytics?.retentionRate ?? 0}%`}
            </h2>

            <div className="mt-5 h-2 rounded-full bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
                style={{ width: `${analytics?.retentionRate ?? 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
