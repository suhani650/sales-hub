import { useMemo, useState } from "react";

import CampaignFilters from "../../../components/seller/Marketing/CampaignFilters";
import CampaignTable from "../../../components/seller/Marketing/CampaignTable";
import CreateCampaignModal from "../../../components/seller/Marketing/CreateCampaignModal";
import CampaignAnalytics from "../../../components/seller/Marketing/CampaignAnalytics";

import {
  useGetCampaignsQuery,
  useGetMarketingOverviewQuery,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
  useDeleteCampaignMutation,
} from "../../../services/vendorApi";

import { FaBullhorn, FaEnvelope, FaSms, FaBell, FaPlus } from "react-icons/fa";

const DEFAULT_FILTERS = {
  search: "",
  type: "",
  status: "",
  audience: "",
  startDate: "",
  endDate: "",
};

export default function MarketingManagement() {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [showModal, setShowModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // ---------- Real data, from the backend ----------
  const { data: campaignsData, isLoading: campaignsLoading } =
    useGetCampaignsQuery();

  const { data: overview } = useGetMarketingOverviewQuery();

  const [createCampaign, { isLoading: creating }] = useCreateCampaignMutation();
  const [updateCampaign, { isLoading: updating }] = useUpdateCampaignMutation();
  const [deleteCampaign] = useDeleteCampaignMutation();

  const campaigns = campaignsData || [];

  // ---------- KPI cards, derived from the marketing overview endpoint ----------
  const channelSent = (channel) =>
    overview?.channelStats?.find((c) => c.channel === channel)?.sent ?? 0;

  const stats = [
    {
      title: "Campaigns",
      value: overview ? overview.totalCampaigns.toLocaleString("en-IN") : "…",
      icon: <FaBullhorn />,
      color: "from-indigo-500 to-blue-600",
    },
    {
      title: "Emails Sent",
      value: overview ? channelSent("EMAIL").toLocaleString("en-IN") : "…",
      icon: <FaEnvelope />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "SMS Sent",
      value: overview ? channelSent("SMS").toLocaleString("en-IN") : "…",
      icon: <FaSms />,
      color: "from-emerald-500 to-green-600",
    },
    {
      title: "Push Sent",
      value: overview ? channelSent("PUSH").toLocaleString("en-IN") : "…",
      icon: <FaBell />,
      color: "from-orange-500 to-yellow-500",
    },
  ];

  // ---------- Client-side filtering over the real campaign list ----------
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((c) => {
      if (
        filters.search &&
        !c.name.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      if (filters.type && c.campaignType !== filters.type) return false;
      if (filters.status && c.status !== filters.status) return false;
      if (filters.audience && c.audienceType !== filters.audience) return false;
      if (
        filters.startDate &&
        new Date(c.createdAt) < new Date(filters.startDate)
      )
        return false;
      if (filters.endDate && new Date(c.createdAt) > new Date(filters.endDate))
        return false;
      return true;
    });
  }, [campaigns, filters]);

  // ---------- Actions ----------
  const openCreateModal = () => {
    setEditingCampaign(null);
    setShowModal(true);
  };

  const openEditModal = (campaign) => {
    setEditingCampaign(campaign);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCampaign(null);
  };

  const handleSubmit = async (payload) => {
    try {
      if (editingCampaign) {
        await updateCampaign({ id: editingCampaign.id, ...payload }).unwrap();
      } else {
        await createCampaign(payload).unwrap();
      }
      closeModal();
    } catch (err) {
      alert(err?.data?.message || "Something went wrong. Please try again.");
    }
  };

  const handleStart = async (campaign) => {
    try {
      await updateCampaign({ id: campaign.id, status: "ACTIVE" }).unwrap();
    } catch (err) {
      alert(err?.data?.message || "Could not activate campaign.");
    }
  };

  const handlePause = async (campaign) => {
    try {
      await updateCampaign({ id: campaign.id, status: "PAUSED" }).unwrap();
    } catch (err) {
      alert(err?.data?.message || "Could not pause campaign.");
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

  const handleExport = () => {
    if (filteredCampaigns.length === 0) return;

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

    const rows = filteredCampaigns.map((c) =>
      header.map((key) => JSON.stringify(c[key] ?? "")).join(","),
    );

    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "campaigns.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen space-y-6 overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-pink-600/20 blur-[160px]" />
        <div className="absolute right-0 top-10 h-[420px] w-[420px] rounded-full bg-indigo-600/20 blur-[160px]" />
      </div>

      <div className="relative z-10 space-y-6">
        {/* Header */}

        <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div>
            <h1 className="text-3xl font-bold">Marketing Suite</h1>
            <p className="mt-2 text-white/60">
              Campaigns, Promotions & Growth Automation
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 px-5 py-3 font-semibold text-white transition hover:from-indigo-500 hover:to-pink-500"
          >
            <FaPlus />
            Create Campaign
          </button>
        </div>

        {/* KPI Cards */}

        <div className="grid gap-5 xl:grid-cols-4 md:grid-cols-2">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r text-xl text-white ${item.color}`}
              >
                {item.icon}
              </div>

              <p className="mt-4 text-white/60">{item.title}</p>
              <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
            </div>
          ))}
        </div>

        {/* Tabs */}

        <div className="flex gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
          <button
            onClick={() => setActiveTab("campaigns")}
            className={`rounded-xl px-5 py-3 transition ${
              activeTab === "campaigns"
                ? "bg-gradient-to-r from-indigo-600 to-pink-600 text-white"
                : "text-white/60 hover:bg-white/5"
            }`}
          >
            Campaigns
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`rounded-xl px-5 py-3 transition ${
              activeTab === "analytics"
                ? "bg-gradient-to-r from-indigo-600 to-pink-600 text-white"
                : "text-white/60 hover:bg-white/5"
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Campaigns Tab */}

        {activeTab === "campaigns" && (
          <>
            <CampaignFilters
              filters={filters}
              setFilters={setFilters}
              onExport={handleExport}
              onReset={() => setFilters(DEFAULT_FILTERS)}
            />

            <CampaignTable
              campaigns={filteredCampaigns}
              loading={campaignsLoading}
              onStart={handleStart}
              onPause={handlePause}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          </>
        )}

        {/* Analytics Tab */}

        {activeTab === "analytics" && <CampaignAnalytics />}

        {/* Create / Edit Campaign */}

        <CreateCampaignModal
          open={showModal}
          onClose={closeModal}
          editingCampaign={editingCampaign}
          submitting={creating || updating}
          onSaveDraft={handleSubmit}
          onLaunch={handleSubmit}
        />
      </div>
    </div>
  );
}
