import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineMegaphone,
  HiOutlineBolt,
  HiOutlinePaperAirplane,
  HiOutlineEnvelopeOpen,
  HiOutlineCursorArrowRays,
  HiOutlineTicket,
} from "react-icons/hi2";
import {
  FaBullhorn,
  FaEnvelope,
  FaSms,
  FaBell,
  FaGift,
  FaPlus,
} from "react-icons/fa";

import CreateCampaignModal from "../../../components/seller/Marketing/CreateCampaignModal";

import CampaignManagement from "../../../components/seller/Marketing/CampaignManagement";
import EmailMarketing from "../../../components/seller/Marketing/EmailMarketing";
import SMSMarketing from "../../../components/seller/Marketing/SMSMarketing";
import PushNotificationCenter from "../../../components/seller/Marketing/PushNotificationCenter";
import AudienceSegmentation from "../../../components/seller/Marketing/AudienceSegmentation";
import CouponManagement from "../../../components/seller/Marketing/CouponManagement";
import MarketingAnalytics from "../../../components/seller/Marketing/MarketingAnalytics";

import {
  useGetMarketingOverviewQuery,
  useGetCampaignsQuery,
  useCreateCampaignMutation,
  useGetActiveCouponsQuery,
  useGetCustomerAnalyticsQuery,
} from "../../../services/vendorApi";

const CHANNEL_ICONS = {
  EMAIL: FaEnvelope,
  SMS: FaSms,
  PUSH: FaBell,
  COUPON: FaGift,
};

const STATUS_STYLES = {
  ACTIVE: "bg-emerald-500/20 text-emerald-400",
  LAUNCHED: "bg-emerald-500/20 text-emerald-400",
  DRAFT: "bg-slate-500/20 text-slate-300",
  SCHEDULED: "bg-amber-500/20 text-amber-400",
  COMPLETED: "bg-cyan-500/20 text-cyan-400",
};

const formatCount = (value) => {
  const n = Number(value || 0);
  if (n >= 100000) return `${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
};

export default function MarketingDashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: overview,
    isLoading: overviewLoading,
    isError: overviewError,
  } = useGetMarketingOverviewQuery();

  const { data: campaigns = [], isLoading: campaignsLoading } =
    useGetCampaignsQuery();

  const { data: activeCoupons = [] } = useGetActiveCouponsQuery();

  const { data: customerAnalytics } = useGetCustomerAnalyticsQuery();

  const [createCampaign, { isLoading: creating }] = useCreateCampaignMutation();

  const handleSave = async (form, status) => {
    try {
      await createCampaign({
        name: form.name,
        campaignType: form.type,
        audienceType: form.audience,
        subject: form.subject,
        content: form.content,
        scheduledAt: form.scheduleDate ? new Date(form.scheduleDate) : null,
        status: status === "LAUNCHED" ? "ACTIVE" : "DRAFT",
      }).unwrap();

      setModalOpen(false);
    } catch (err) {
      alert("Couldn't save the campaign. Please try again.");
    }
  };

  const stats = overview
    ? [
        {
          title: "Total Campaigns",
          value: String(overview.totalCampaigns ?? 0),
          color: "from-pink-500 to-rose-600",
          icon: HiOutlineMegaphone,
        },
        {
          title: "Active Campaigns",
          value: String(overview.activeCampaigns ?? 0),
          color: "from-purple-500 to-fuchsia-600",
          icon: HiOutlineBolt,
        },
        {
          title: "Total Reach (Sent)",
          value: formatCount(overview.totalSent),
          color: "from-cyan-500 to-blue-600",
          icon: HiOutlinePaperAirplane,
        },
        {
          title: "Overall Open Rate",
          value: `${overview.overallOpenRate ?? 0}%`,
          color: "from-orange-500 to-amber-600",
          icon: HiOutlineEnvelopeOpen,
        },
      ]
    : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Hero */}

      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-r from-[#1a0b2e] via-[#241238] to-[#3b0f2f] p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#ec489950,transparent_45%)]"></div>

        <div className="relative flex flex-col xl:flex-row justify-between gap-10">
          <div>
            <span className="px-5 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-sm font-semibold">
              Marketing Command Center
            </span>

            <h1 className="text-5xl font-bold text-white mt-6">
              Marketing & Campaigns
            </h1>

            <p className="text-slate-400 mt-5 max-w-2xl leading-8">
              Launch email, SMS and push campaigns, track engagement and manage
              coupons — all backed by your live store data.
            </p>

            <button
              onClick={() => setModalOpen(true)}
              className="mt-6 flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-105 duration-300"
            >
              <FaPlus />
              Create Campaign
            </button>
          </div>

          <div className="w-[340px] rounded-3xl bg-[#170a22] border border-pink-500/20 p-7">
            <div className="flex items-center gap-3">
              <FaBullhorn className="text-pink-400 text-2xl" />
              <h3 className="text-xl font-bold text-white">Engagement</h3>
            </div>

            <h2 className="text-5xl font-bold text-pink-400 mt-6">
              {overviewLoading ? "—" : `${overview?.overallClickRate ?? 0}%`}
            </h2>

            <p className="text-slate-400 mt-3">Overall Click Rate</p>

            <div className="mt-6 h-3 rounded-full bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600"
                style={{ width: `${overview?.overallClickRate ?? 0}%` }}
              />
            </div>

            <p className="text-slate-400 mt-4">
              {formatCount(overview?.totalClicks)} total clicks from{" "}
              {formatCount(overview?.totalSent)} sent
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}

      {overviewLoading ? (
        <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] animate-pulse"
            />
          ))}
        </div>
      ) : overviewError ? (
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-10 text-center text-red-400">
          Couldn't load marketing overview.
        </div>
      ) : (
        <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 hover:border-pink-500/30 hover:shadow-[0_0_30px_rgba(236,72,153,.18)] duration-300"
              >
                <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-pink-500/10 blur-3xl"></div>

                <div className="relative flex justify-between items-start">
                  <div>
                    <p className="text-slate-400 text-sm">{item.title}</p>
                    <h2 className="text-4xl font-bold text-white mt-4">
                      {item.value}
                    </h2>
                  </div>

                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-3xl shadow-xl`}
                  >
                    <Icon />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Channel Performance + Modules */}

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-7">
          <h3 className="text-2xl font-bold text-white mb-6">
            Channel Performance
          </h3>

          {overviewLoading ? (
            <p className="text-slate-400">Loading…</p>
          ) : !overview?.channelStats?.length ? (
            <div className="py-10 text-center text-slate-400">
              No campaigns sent yet. Create one to see channel performance here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="text-slate-400 text-sm border-b border-white/10">
                    <th className="text-left py-3">Channel</th>
                    <th className="text-left py-3">Campaigns</th>
                    <th className="text-left py-3">Sent</th>
                    <th className="text-left py-3">Open Rate</th>
                    <th className="text-left py-3">Click Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {overview.channelStats.map((row) => {
                    const Icon =
                      CHANNEL_ICONS[row.channel] || HiOutlineMegaphone;
                    return (
                      <tr key={row.channel} className="border-b border-white/5">
                        <td className="py-4 text-white font-semibold flex items-center gap-2">
                          <Icon className="text-pink-400" />
                          {row.channel}
                        </td>
                        <td className="py-4 text-slate-300">{row.campaigns}</td>
                        <td className="py-4 text-slate-300">
                          {formatCount(row.sent)}
                        </td>
                        <td className="py-4 text-emerald-400 font-semibold">
                          {row.openRate}%
                        </td>
                        <td className="py-4 text-cyan-400 font-semibold">
                          {row.clickRate}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-7">
          <h3 className="text-2xl font-bold text-white mb-6">Quick Stats</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-800/50 p-5">
              <HiOutlineTicket className="text-pink-400 text-xl mb-2" />
              <p className="text-slate-400 text-sm">Active Coupons</p>
              <h2 className="text-2xl text-white font-bold mt-1">
                {activeCoupons.length}
              </h2>
            </div>

            <div className="rounded-2xl bg-slate-800/50 p-5">
              <HiOutlineMegaphone className="text-purple-400 text-xl mb-2" />
              <p className="text-slate-400 text-sm">Draft Campaigns</p>
              <h2 className="text-2xl text-white font-bold mt-1">
                {overview?.statusBreakdown?.DRAFT ?? 0}
              </h2>
            </div>

            <div className="rounded-2xl bg-slate-800/50 p-5">
              <HiOutlineCursorArrowRays className="text-cyan-400 text-xl mb-2" />
              <p className="text-slate-400 text-sm">Total Clicks</p>
              <h2 className="text-2xl text-white font-bold mt-1">
                {formatCount(overview?.totalClicks)}
              </h2>
            </div>

            <div className="rounded-2xl bg-slate-800/50 p-5">
              <FaBullhorn className="text-orange-400 text-xl mb-2" />
              <p className="text-slate-400 text-sm">Customer Reach</p>
              <h2 className="text-2xl text-white font-bold mt-1">
                {formatCount(customerAnalytics?.totalCustomers)}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns table */}

      <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 shadow-[0_10px_40px_rgba(0,0,0,.35)]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white">All Campaigns</h2>
            <p className="text-slate-400 mt-2">
              Every campaign you've created, live from your account.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-105 duration-300"
          >
            <FaPlus />
            New Campaign
          </button>
        </div>

        {campaignsLoading ? (
          <div className="p-10 text-center text-slate-400">
            Loading campaigns…
          </div>
        ) : campaigns.length === 0 ? (
          <div className="p-10 text-center text-slate-400">
            No campaigns yet — create your first one above.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-[#111827]">
                <tr className="text-slate-400 text-sm">
                  <th className="text-left px-6 py-4">Campaign</th>
                  <th className="text-left px-6 py-4">Channel</th>
                  <th className="text-left px-6 py-4">Audience</th>
                  <th className="text-left px-6 py-4">Sent</th>
                  <th className="text-left px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr
                    key={c.id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="px-6 py-5 text-white font-semibold">
                      {c.name}
                    </td>
                    <td className="px-6 py-5 text-slate-300">
                      {c.campaignType}
                    </td>
                    <td className="px-6 py-5 text-slate-300">
                      {c.audienceType}
                    </td>
                    <td className="px-6 py-5 text-slate-300">{c.sentCount}</td>
                    <td className="px-6 py-5">
                      <span
                        className={`px-4 py-2 rounded-full text-xs font-semibold ${
                          STATUS_STYLES[c.status] ||
                          "bg-slate-500/20 text-slate-300"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Existing marketing tools (each manages its own data) */}

      <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaBullhorn className="text-pink-400 text-2xl" />
          <h2 className="text-2xl font-bold text-white">Marketing Tools</h2>
        </div>
        <MarketingAnalytics />
        <CouponManagement />
        <AudienceSegmentation />
        <PushNotificationCenter />
        <SMSMarketing />
        <EmailMarketing />
        <CampaignManagement />
      </div>

      <CreateCampaignModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaveDraft={(form) => handleSave(form, "DRAFT")}
        onLaunch={(form) => handleSave(form, "LAUNCHED")}
      />
    </motion.div>
  );
}
