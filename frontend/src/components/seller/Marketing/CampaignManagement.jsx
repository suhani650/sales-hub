import { useMemo, useState } from "react";
import {
  FaBullhorn,
  FaPlus,
  FaCalendarAlt,
  FaUsers,
  FaEnvelope,
  FaSms,
  FaBell,
  FaChartLine,
  FaDownload,
} from "react-icons/fa";

import {
  useGetCampaignsQuery,
  useGetMarketingOverviewQuery,
  useCreateCampaignMutation,
} from "../../../services/vendorApi";

import CreateCampaignModal from "./CreateCampaignModal";

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function CampaignManagement() {
  const [showModal, setShowModal] = useState(false);

  const { data: campaignsData, isLoading: campaignsLoading } =
    useGetCampaignsQuery();
  const { data: overview } = useGetMarketingOverviewQuery();

  const [createCampaign, { isLoading: creating }] = useCreateCampaignMutation();

  const campaigns = campaignsData || [];

  const audienceSegmentCount = useMemo(
    () => new Set(campaigns.map((c) => c.audienceType)).size,
    [campaigns],
  );

  const channelCount = (channel) =>
    overview?.channelStats?.find((c) => c.channel === channel)?.campaigns ?? 0;

  const handleSubmit = async (payload) => {
    try {
      await createCampaign(payload).unwrap();
      setShowModal(false);
    } catch (err) {
      alert(err?.data?.message || "Could not create campaign.");
    }
  };

  const handleExport = () => {
    if (campaigns.length === 0) return;

    const header = [
      "id",
      "name",
      "campaignType",
      "audienceType",
      "status",
      "sentCount",
      "openCount",
      "clickCount",
      "createdAt",
    ];

    const rows = campaigns.map((c) =>
      header.map((key) => JSON.stringify(c[key] ?? "")).join(","),
    );

    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "all-campaigns.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 text-white">
      {/* Header */}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Campaign Management</h2>

            <p className="mt-2 text-white/60">
              Create, Manage & Optimize Marketing Campaigns
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 px-5 py-3 font-semibold text-white transition hover:from-indigo-500 hover:to-pink-500"
          >
            <FaPlus />
            Create Campaign
          </button>
        </div>
      </div>

      {/* KPI */}

      <div className="grid gap-5 xl:grid-cols-4 md:grid-cols-2">
        <KpiCard
          title="Active Campaigns"
          value={overview?.activeCampaigns ?? 0}
          icon={<FaBullhorn />}
        />
        <KpiCard
          title="Scheduled"
          value={overview?.statusBreakdown?.SCHEDULED ?? 0}
          icon={<FaCalendarAlt />}
        />
        <KpiCard
          title="Audience Segments Used"
          value={audienceSegmentCount}
          icon={<FaUsers />}
        />
        <KpiCard
          title="Total Campaigns"
          value={overview?.totalCampaigns ?? 0}
          icon={<FaChartLine />}
        />
      </div>

      {/* Campaign Channels */}

      <div className="grid gap-5 md:grid-cols-3">
        <ChannelCard
          title="Email Campaigns"
          value={channelCount("EMAIL")}
          icon={<FaEnvelope />}
        />
        <ChannelCard
          title="SMS Campaigns"
          value={channelCount("SMS")}
          icon={<FaSms />}
        />
        <ChannelCard
          title="Push Campaigns"
          value={channelCount("PUSH")}
          icon={<FaBell />}
        />
      </div>

      {/* Campaign Table */}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <h3 className="text-xl font-bold">Campaign List</h3>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 text-indigo-300 transition hover:text-indigo-200"
          >
            <FaDownload />
            Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 text-white/60">
              <tr>
                <th className="p-4 text-left">Campaign</th>
                <th className="p-4 text-left">Channel</th>
                <th className="p-4 text-left">Audience</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Sent / Opens / Clicks</th>
                <th className="p-4 text-left">Created</th>
              </tr>
            </thead>

            <tbody>
              {campaignsLoading && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-white/40">
                    Loading campaigns…
                  </td>
                </tr>
              )}

              {!campaignsLoading && campaigns.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-white/40">
                    No campaigns yet.
                  </td>
                </tr>
              )}

              {!campaignsLoading &&
                campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-t border-white/5">
                    <td className="p-4">{campaign.name}</td>

                    <td className="p-4 text-white/70">
                      {campaign.campaignType}
                    </td>

                    <td className="p-4 text-white/70">
                      {campaign.audienceType}
                    </td>

                    <td className="p-4">
                      <StatusBadge value={campaign.status} />
                    </td>

                    <td className="p-4 text-white/70">
                      {campaign.sentCount ?? 0} / {campaign.openCount ?? 0} /{" "}
                      {campaign.clickCount ?? 0}
                    </td>

                    <td className="p-4 text-white/70">
                      {formatDate(campaign.createdAt)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Engagement by Channel */}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="mb-5 flex items-center gap-3">
          <FaChartLine className="text-2xl text-emerald-400" />
          <h3 className="text-xl font-bold">Engagement by Channel</h3>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {(overview?.channelStats?.length
            ? overview.channelStats
            : [{ channel: "—", sent: 0, openRate: 0, clickRate: 0 }]
          ).map((item) => (
            <AnalyticsCard
              key={item.channel}
              title={`${item.channel} Sent`}
              value={item.sent.toLocaleString("en-IN")}
              sub={`${item.openRate}% open · ${item.clickRate}% click`}
            />
          ))}
        </div>
      </div>

      <CreateCampaignModal
        open={showModal}
        onClose={() => setShowModal(false)}
        submitting={creating}
        onSaveDraft={handleSubmit}
        onLaunch={handleSubmit}
      />
    </div>
  );
}

function KpiCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="text-3xl text-indigo-400">{icon}</div>
      <p className="mt-3 text-white/60">{title}</p>
      <h3 className="mt-2 text-3xl font-bold">{value}</h3>
    </div>
  );
}

function ChannelCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl">
      <div className="flex justify-center text-3xl text-purple-400">{icon}</div>
      <h4 className="mt-4 font-bold">{title}</h4>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function AnalyticsCard({ title, value, sub }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
      <h4 className="font-semibold text-white/80">{title}</h4>
      <p className="mt-3 text-3xl font-bold text-emerald-400">{value}</p>
      {sub && <p className="mt-2 text-xs text-white/50">{sub}</p>}
    </div>
  );
}

function StatusBadge({ value }) {
  const colors = {
    DRAFT: "bg-white/10 text-white/60",
    SCHEDULED: "bg-blue-500/20 text-blue-400",
    ACTIVE: "bg-emerald-500/20 text-emerald-400",
    COMPLETED: "bg-purple-500/20 text-purple-400",
    PAUSED: "bg-yellow-500/20 text-yellow-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${
        colors[value] || "bg-white/10 text-white/60"
      }`}
    >
      {value}
    </span>
  );
}
