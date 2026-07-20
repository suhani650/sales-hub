import { useState } from "react";
import {
  FaStore,
  FaStar,
  FaBox,
  FaShoppingBag,
  FaUsers,
  FaGlobe,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEdit,
  FaSpinner,
} from "react-icons/fa";

import StorePolicies from "../../../components/seller/Store/StorePolicies";
import StoreContactInfo from "../../../components/seller/Store/StoreContactInfo";
import StorePerformance from "../../../components/seller/Store/StorePerformance";
import StoreBranding from "../../../components/seller/Store/StoreBranding";
import StoreSEO from "../../../components/seller/Store/StoreSEO";

import {
  useGetSellerProfileQuery,
  useGetVendorDashboardQuery,
  useGetOrderAnalyticsQuery,
  useGetCustomerAnalyticsQuery,
  useGetReviewAnalyticsQuery,
  useGetReturnsQuery,
} from "../../../services/vendorApi";

function formatINR(value) {
  const n = Number(value) || 0;
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function StoreDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: vendor, isLoading: vendorLoading } = useGetSellerProfileQuery();
  const { data: dashboard, isLoading: dashLoading } =
    useGetVendorDashboardQuery();
  const { data: orderAnalytics } = useGetOrderAnalyticsQuery();
  const { data: customerAnalytics } = useGetCustomerAnalyticsQuery();
  const { data: reviewAnalytics } = useGetReviewAnalyticsQuery();
  const { data: returns } = useGetReturnsQuery();

  const returnRate =
    orderAnalytics?.totalDistinctOrders > 0 && returns
      ? ((returns.length / orderAnalytics.totalDistinctOrders) * 100).toFixed(1)
      : null;

  const social = vendor?.socialLinks || {};
  const address = [vendor?.address, vendor?.city, vendor?.state]
    .filter(Boolean)
    .join(", ");

  const isLoading = vendorLoading || dashLoading;

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <FaSpinner className="animate-spin text-3xl text-indigo-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="h-52 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />

        <div className="relative p-6">
          <div className="absolute -top-14 left-6 flex h-28 w-28 items-center justify-center rounded-2xl border border-white/10 bg-slate-900 text-4xl text-indigo-400 shadow-lg">
            <FaStore />
          </div>

          <div className="mt-12 flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {vendor?.storeName || vendor?.businessName || "Your Store"}
              </h1>

              <p className="mt-2 text-white/50">
                @{vendor?.storeSlug || "your-store"}
              </p>

              <div className="mt-3 flex items-center gap-2 text-yellow-400">
                <FaStar />
                <span className="font-semibold">
                  {Number(vendor?.rating || 0).toFixed(1)}
                </span>
                <span className="text-white/50">
                  ({reviewAnalytics?.totalReviews ?? 0} Reviews)
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                setActiveTab(activeTab === "overview" ? "branding" : "overview")
              }
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-3 font-semibold text-white transition hover:from-pink-600 hover:to-purple-700"
            >
              <FaEdit />
              {activeTab === "overview" ? "Edit Store" : "Back to Overview"}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
        <button
          onClick={() => setActiveTab("overview")}
          className={`rounded-xl px-5 py-2 font-medium transition ${
            activeTab === "overview"
              ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10"
          }`}
        >
          Overview
        </button>

        <button
          onClick={() => setActiveTab("branding")}
          className={`rounded-xl px-5 py-2 font-medium transition ${
            activeTab === "branding"
              ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10"
          }`}
        >
          Store Branding
        </button>
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <>
          {/* KPI */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Products"
              value={dashboard?.totalProducts?.toLocaleString("en-IN") ?? 0}
              icon={<FaBox />}
            />

            <StatCard
              title="Orders"
              value={dashboard?.totalOrders?.toLocaleString("en-IN") ?? 0}
              icon={<FaShoppingBag />}
            />

            <StatCard
              title="Customers"
              value={dashboard?.totalCustomers?.toLocaleString("en-IN") ?? 0}
              icon={<FaUsers />}
            />

            <StatCard
              title="Rating"
              value={Number(vendor?.rating || 0).toFixed(1)}
              icon={<FaStar />}
            />
          </div>

          {/* Store Info */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className="mb-5 text-xl font-bold text-white">
                Store Information
              </h2>

              <InfoRow label="Store Name" value={vendor?.storeName || "—"} />
              <InfoRow label="Website" value={vendor?.website || "Not set"} />
              <InfoRow label="Email" value={vendor?.user?.email || "—"} />
              <InfoRow label="Phone" value={vendor?.phone || "Not set"} />
              <InfoRow label="Address" value={address || "Not set"} last />
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className="mb-5 text-xl font-bold text-white">
                Social Media
              </h2>

              <div className="space-y-4">
                <SocialLink
                  icon={<FaFacebook />}
                  name="Facebook"
                  link={social.facebook}
                />
                <SocialLink
                  icon={<FaInstagram />}
                  name="Instagram"
                  link={social.instagram}
                />
                <SocialLink
                  icon={<FaTwitter />}
                  name="Twitter"
                  link={social.twitter}
                />
                <SocialLink
                  icon={<FaGlobe />}
                  name="Website"
                  link={vendor?.website}
                />
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="mb-5 text-xl font-bold text-white">
              Store Performance
            </h2>

            <div className="grid gap-5 md:grid-cols-4">
              <PerformanceCard
                title="Avg Order Value"
                value={
                  orderAnalytics
                    ? formatINR(orderAnalytics.averageOrderValue)
                    : "…"
                }
              />

              <PerformanceCard
                title="Repeat Customers"
                value={
                  customerAnalytics
                    ? `${customerAnalytics.repeatPurchaseRate}%`
                    : "…"
                }
              />

              <PerformanceCard
                title="Retention Rate"
                value={
                  customerAnalytics
                    ? `${customerAnalytics.retentionRate}%`
                    : "…"
                }
              />

              <PerformanceCard
                title="Return Rate"
                value={returnRate !== null ? `${returnRate}%` : "…"}
              />
            </div>
          </div>
        </>
      )}

      {/* Branding Tab */}
      {activeTab === "branding" && (
        <div className="space-y-6">
          <StorePerformance />
          <StoreContactInfo />
          <StorePolicies />
          <StoreSEO />
          <StoreBranding />
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="text-3xl text-indigo-400">{icon}</div>
      <p className="mt-4 text-white/60">{title}</p>
      <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
    </div>
  );
}

function InfoRow({ label, value, last }) {
  return (
    <div
      className={`flex justify-between py-3 ${
        last ? "" : "border-b border-white/10"
      }`}
    >
      <span className="text-white/50">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

function SocialLink({ icon, name, link }) {
  const content = (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/20 p-4 transition hover:bg-white/10">
      <div className="text-2xl text-indigo-400">{icon}</div>
      <div>
        <p className="font-medium text-white">{name}</p>
        <p className="text-xs text-white/40">{link ? link : "Not connected"}</p>
      </div>
    </div>
  );

  if (!link) return content;

  const href = link.startsWith("http") ? link : `https://${link}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}

function PerformanceCard({ title, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5">
      <p className="text-white/50">{title}</p>
      <h3 className="mt-2 text-2xl font-bold text-white">{value}</h3>
    </div>
  );
}
