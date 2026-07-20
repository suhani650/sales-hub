import { useMemo, useState } from "react";
import {
  FaSms,
  FaUsers,
  FaBullseye,
  FaPaperPlane,
  FaChartLine,
  FaPlus,
  FaMagic,
  FaPlay,
  FaPause,
  FaTrash,
  FaSpinner,
} from "react-icons/fa";

import {
  useGetCampaignsQuery,
  useGetMarketingOverviewQuery,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
  useDeleteCampaignMutation,
} from "../../../services/vendorApi";

const EMPTY_FORM = {
  name: "",
  audienceType: "ALL",
  scheduledAt: "",
  content: "",
};

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SMSMarketing() {
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: campaignsData, isLoading: campaignsLoading } =
    useGetCampaignsQuery();
  const { data: overview } = useGetMarketingOverviewQuery();

  const [createCampaign, { isLoading: creating }] = useCreateCampaignMutation();
  const [updateCampaign] = useUpdateCampaignMutation();
  const [deleteCampaign] = useDeleteCampaignMutation();

  const smsCampaigns = useMemo(
    () => (campaignsData || []).filter((c) => c.campaignType === "SMS"),
    [campaignsData],
  );

  const smsChannel = overview?.channelStats?.find((c) => c.channel === "SMS");

  const statusCounts = useMemo(() => {
    return smsCampaigns.reduce((acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    }, {});
  }, [smsCampaigns]);

  const updateField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleAIGenerate = () => {
    const title = form.name || "your order";
    updateField(
      "content",
      `Hi! ${title} is calling — grab this offer before it ends. Reply STOP to opt out.`,
    );
  };

  const handleScheduleSMS = async () => {
    if (!form.name.trim()) return;

    const scheduledAt = form.scheduledAt
      ? new Date(form.scheduledAt).toISOString()
      : null;

    const status =
      scheduledAt && new Date(scheduledAt) > new Date()
        ? "SCHEDULED"
        : "ACTIVE";

    try {
      await createCampaign({
        name: form.name,
        campaignType: "SMS",
        audienceType: form.audienceType,
        content: form.content || form.name,
        scheduledAt,
        status,
      }).unwrap();

      setForm(EMPTY_FORM);
    } catch (err) {
      alert(err?.data?.message || "Could not schedule SMS campaign.");
    }
  };

  const handleToggleStatus = async (campaign) => {
    try {
      await updateCampaign({
        id: campaign.id,
        status: campaign.status === "ACTIVE" ? "PAUSED" : "ACTIVE",
      }).unwrap();
    } catch (err) {
      alert(err?.data?.message || "Could not update campaign.");
    }
  };

  const handleDelete = async (campaign) => {
    if (!window.confirm(`Delete campaign "${campaign.name}"?`)) return;
    try {
      await deleteCampaign(campaign.id).unwrap();
    } catch (err) {
      alert(err?.data?.message || "Could not delete campaign.");
    }
  };

  return (
    <div className="space-y-6 text-white">
      {/* Header */}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">SMS Marketing Studio</h2>

            <p className="mt-2 text-white/60">
              Bulk SMS Campaigns & Mobile Customer Engagement
            </p>
          </div>

          <a
            href="#sms-builder"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 px-5 py-3 font-semibold text-white transition hover:from-indigo-500 hover:to-pink-500"
          >
            <FaPlus />
            Create SMS Campaign
          </a>
        </div>
      </div>

      {/* KPI */}

      <div className="grid gap-5 xl:grid-cols-4 md:grid-cols-2">
        <StatCard
          title="SMS Campaigns"
          value={smsCampaigns.length}
          icon={<FaSms />}
        />
        <StatCard
          title="Reach (Sent)"
          value={(smsChannel?.sent ?? 0).toLocaleString("en-IN")}
          icon={<FaUsers />}
        />
        <StatCard
          title="Open Rate"
          value={`${smsChannel?.openRate ?? 0}%`}
          icon={<FaPaperPlane />}
        />
        <StatCard
          title="CTR"
          value={`${smsChannel?.clickRate ?? 0}%`}
          icon={<FaBullseye />}
        />
      </div>

      {/* Campaign Builder */}

      <div
        id="sms-builder"
        className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
      >
        <h3 className="mb-5 text-xl font-bold">SMS Campaign Builder</h3>

        <div className="grid gap-5 lg:grid-cols-2">
          <input
            type="text"
            placeholder="Campaign Name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-white/30 outline-none focus:border-indigo-400"
          />

          <select
            value={form.audienceType}
            onChange={(e) => updateField("audienceType", e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-indigo-400"
          >
            <option className="bg-[#0B1225]" value="ALL">
              All Customers
            </option>
            <option className="bg-[#0B1225]" value="VIP">
              VIP Customers
            </option>
            <option className="bg-[#0B1225]" value="LOYAL">
              Loyal Customers
            </option>
            <option className="bg-[#0B1225]" value="NEW">
              New Customers
            </option>
            <option className="bg-[#0B1225]" value="INACTIVE">
              Inactive Customers
            </option>
          </select>

          <input
            type="datetime-local"
            value={form.scheduledAt}
            onChange={(e) => updateField("scheduledAt", e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-indigo-400 [color-scheme:dark]"
          />

          <div className="flex items-center rounded-xl border border-white/10 bg-white/5 p-3 text-white/50">
            Leave schedule empty to send immediately
          </div>
        </div>

        <textarea
          rows="5"
          placeholder="Write SMS Content..."
          value={form.content}
          onChange={(e) => updateField("content", e.target.value)}
          className="mt-5 w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder-white/30 outline-none focus:border-indigo-400"
        />

        <div className="mt-5 flex gap-3">
          <button
            onClick={handleAIGenerate}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-500"
          >
            <FaMagic />
            AI Generate SMS
          </button>

          <button
            onClick={handleScheduleSMS}
            disabled={creating || !form.name.trim()}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {creating && <FaSpinner className="animate-spin" />}
            Schedule SMS
          </button>
        </div>
      </div>

      {/* Campaign Performance */}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="border-b border-white/10 p-5">
          <h3 className="text-xl font-bold">SMS Campaign Performance</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 text-white/60">
              <tr>
                <th className="p-4 text-left">Campaign</th>
                <th className="p-4 text-left">Audience</th>
                <th className="p-4 text-left">Sent / Opens / Clicks</th>
                <th className="p-4 text-left">Scheduled</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Actions</th>
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

              {!campaignsLoading && smsCampaigns.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-white/40">
                    No SMS campaigns yet. Build one above.
                  </td>
                </tr>
              )}

              {!campaignsLoading &&
                smsCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-t border-white/5">
                    <td className="p-4">{campaign.name}</td>

                    <td className="p-4 text-white/70">
                      {campaign.audienceType}
                    </td>

                    <td className="p-4 text-white/70">
                      {campaign.sentCount ?? 0} / {campaign.openCount ?? 0} /{" "}
                      {campaign.clickCount ?? 0}
                    </td>

                    <td className="p-4 text-white/70">
                      {formatDate(campaign.scheduledAt)}
                    </td>

                    <td className="p-4">
                      <StatusBadge value={campaign.status} />
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleToggleStatus(campaign)}
                          title={
                            campaign.status === "ACTIVE" ? "Pause" : "Activate"
                          }
                          className={`rounded-lg p-2 transition ${
                            campaign.status === "ACTIVE"
                              ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                              : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                          }`}
                        >
                          {campaign.status === "ACTIVE" ? (
                            <FaPause />
                          ) : (
                            <FaPlay />
                          )}
                        </button>

                        <button
                          onClick={() => handleDelete(campaign)}
                          title="Delete"
                          className="rounded-lg bg-red-500/20 p-2 text-red-400 transition hover:bg-red-500/30"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Breakdown */}

      <div className="grid gap-5 md:grid-cols-4">
        <AnalyticsCard
          title="Active"
          value={statusCounts.ACTIVE || 0}
          icon={<FaPaperPlane />}
        />
        <AnalyticsCard
          title="Scheduled"
          value={statusCounts.SCHEDULED || 0}
          icon={<FaSms />}
        />
        <AnalyticsCard
          title="Paused"
          value={statusCounts.PAUSED || 0}
          icon={<FaPause />}
        />
        <AnalyticsCard
          title="Completed"
          value={statusCounts.COMPLETED || 0}
          icon={<FaChartLine />}
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="text-3xl text-indigo-400">{icon}</div>
      <p className="mt-3 text-white/60">{title}</p>
      <h3 className="mt-2 text-3xl font-bold">{value}</h3>
    </div>
  );
}

function AnalyticsCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl">
      <div className="flex justify-center text-3xl text-purple-400">{icon}</div>
      <h4 className="mt-4 font-bold">{title}</h4>
      <p className="mt-2 text-2xl font-bold">{value}</p>
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
