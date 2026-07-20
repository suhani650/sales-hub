import {
  FaChartLine,
  FaBullseye,
  FaEnvelope,
  FaSms,
  FaBell,
  FaGift,
  FaUsers,
  FaDownload,
  FaPaperPlane,
} from "react-icons/fa";

import {
  useGetMarketingOverviewQuery,
  useGetCustomerAnalyticsQuery,
  useGetCouponAnalyticsQuery,
} from "../../../services/vendorApi";

const CHANNEL_ICONS = {
  EMAIL: FaEnvelope,
  SMS: FaSms,
  PUSH: FaBell,
  COUPON: FaGift,
};

const formatCount = (value) => {
  const n = Number(value || 0);
  if (n >= 100000) return `${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
};

export default function MarketingAnalytics() {
  const {
    data: overview,
    isLoading: overviewLoading,
    isError: overviewError,
  } = useGetMarketingOverviewQuery();

  const { data: customerAnalytics } = useGetCustomerAnalyticsQuery();

  const { data: couponAnalytics } = useGetCouponAnalyticsQuery();

  const channelStats = overview?.channelStats ?? [];

  const handleExport = () => {
    if (!channelStats.length) {
      alert("No campaign data to export yet.");
      return;
    }

    const header = [
      "Channel",
      "Campaigns",
      "Sent",
      "Opens",
      "Clicks",
      "Open Rate",
      "Click Rate",
    ];

    const rows = channelStats.map((c) => [
      c.channel,
      c.campaigns,
      c.sent,
      c.opens,
      c.clicks,
      `${c.openRate}%`,
      `${c.clickRate}%`,
    ]);

    const escapeCell = (cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`;

    const csv = [header, ...rows]
      .map((row) => row.map(escapeCell).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `marketing-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Marketing Analytics
            </h2>
            <p className="text-slate-400 mt-2">
              Live engagement stats from your campaigns and coupons.
            </p>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-105 duration-300"
          >
            <FaDownload />
            Export Report
          </button>
        </div>
      </div>

      {overviewError ? (
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-10 text-center text-red-400">
          Couldn't load marketing analytics.
        </div>
      ) : (
        <>
          {/* KPI */}

          <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
            <KpiCard
              title="Total Sent"
              value={overviewLoading ? "—" : formatCount(overview?.totalSent)}
              icon={<FaPaperPlane />}
            />

            <KpiCard
              title="Open Rate"
              value={
                overviewLoading ? "—" : `${overview?.overallOpenRate ?? 0}%`
              }
              icon={<FaChartLine />}
            />

            <KpiCard
              title="Click Rate"
              value={
                overviewLoading ? "—" : `${overview?.overallClickRate ?? 0}%`
              }
              icon={<FaBullseye />}
            />

            <KpiCard
              title="Customer Reach"
              value={formatCount(customerAnalytics?.totalCustomers)}
              icon={<FaUsers />}
            />
          </div>

          {/* Engagement Funnel */}

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
            <h3 className="font-bold text-xl text-white mb-5">
              Campaign Engagement Funnel
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
              <FunnelCard
                title="Sent"
                value={formatCount(overview?.totalSent)}
              />
              <FunnelCard
                title="Opened"
                value={formatCount(overview?.totalOpens)}
              />
              <FunnelCard
                title="Clicked"
                value={formatCount(overview?.totalClicks)}
              />
            </div>
          </div>

          {/* Channel Performance */}

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <h3 className="font-bold text-xl text-white">
                Channel Performance
              </h3>
            </div>

            {overviewLoading ? (
              <div className="p-10 text-center text-slate-400">Loading…</div>
            ) : !channelStats.length ? (
              <div className="p-10 text-center text-slate-400">
                No campaigns sent yet.
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-[#111827]">
                  <tr className="text-slate-400 text-sm">
                    <th className="p-4 text-left">Channel</th>
                    <th className="p-4 text-left">Sent</th>
                    <th className="p-4 text-left">Open Rate</th>
                    <th className="p-4 text-left">Click Rate</th>
                  </tr>
                </thead>

                <tbody>
                  {channelStats.map((item) => (
                    <tr key={item.channel} className="border-t border-white/10">
                      <td className="p-4 text-white font-semibold">
                        {item.channel}
                      </td>
                      <td className="p-4 text-slate-300">
                        {formatCount(item.sent)}
                      </td>
                      <td className="p-4 text-emerald-400 font-semibold">
                        {item.openRate}%
                      </td>
                      <td className="p-4 text-cyan-400 font-semibold">
                        {item.clickRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Analytics Modules (per-channel sent volume) */}

          <div className="grid md:grid-cols-4 gap-5">
            {["EMAIL", "SMS", "PUSH", "COUPON"].map((channel) => {
              const Icon = CHANNEL_ICONS[channel];
              const stat = channelStats.find((c) => c.channel === channel);
              return (
                <AnalyticsCard
                  key={channel}
                  title={channel}
                  value={formatCount(stat?.sent)}
                  icon={<Icon />}
                />
              );
            })}
          </div>

          {/* Coupon Performance (real, from coupon table) */}

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
            <div className="flex items-center gap-3 mb-5">
              <FaGift className="text-pink-400 text-2xl" />
              <h3 className="font-bold text-xl text-white">
                Coupon Performance
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div className="border border-white/10 rounded-xl p-5">
                <h4 className="font-semibold text-slate-400">Total Coupons</h4>
                <p className="text-pink-400 text-2xl font-bold mt-3">
                  {couponAnalytics?.totalCoupons ?? 0}
                </p>
              </div>

              <div className="border border-white/10 rounded-xl p-5">
                <h4 className="font-semibold text-slate-400">Active Coupons</h4>
                <p className="text-emerald-400 text-2xl font-bold mt-3">
                  {couponAnalytics?.activeCoupons ?? 0}
                </p>
              </div>

              <div className="border border-white/10 rounded-xl p-5">
                <h4 className="font-semibold text-slate-400">
                  Total Redemptions
                </h4>
                <p className="text-cyan-400 text-2xl font-bold mt-3">
                  {formatCount(couponAnalytics?.totalRedemptions)}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function KpiCard({ title, value, icon }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
      <div className="text-3xl text-pink-400">{icon}</div>
      <p className="text-slate-400 mt-3">{title}</p>
      <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
    </div>
  );
}

function FunnelCard({ title, value }) {
  return (
    <div className="bg-slate-800/50 border border-white/10 rounded-xl p-5 text-center">
      <h4 className="font-semibold text-slate-400">{title}</h4>
      <p className="text-2xl font-bold text-white mt-3">{value}</p>
    </div>
  );
}

function AnalyticsCard({ title, value, icon }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 text-center">
      <div className="flex justify-center text-3xl text-purple-400">{icon}</div>
      <h4 className="font-bold text-white mt-3">{title}</h4>
      <p className="text-2xl font-bold text-slate-300 mt-2">{value}</p>
    </div>
  );
}
