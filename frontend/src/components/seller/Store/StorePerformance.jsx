import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import {
  FaChartLine,
  FaStar,
  FaUsers,
  FaShoppingBag,
  FaDownload,
  FaSpinner,
} from "react-icons/fa";

import {
  useGetVendorDashboardQuery,
  useGetMonthlyRevenueQuery,
  useGetOrdersQuery,
  useGetTopProductsQuery,
  useGetReviewAnalyticsQuery,
  useGetReviewBreakdownQuery,
  useGetConversionAnalyticsQuery,
  useGetOrderAnalyticsQuery,
  useGetCustomerAnalyticsQuery,
} from "../../../services/vendorApi";

/* ===========================================================
   All numbers on this page come from the real backend. The
   original mockup also had "Bounce Rate" and "Customer
   Satisfaction" tiles with no supporting table anywhere in the
   schema, so — same as the main seller dashboard — those were
   swapped for real metrics (Retention Rate, New Customers This
   Month) instead of inventing numbers for them.
=========================================================== */

const COLORS = ["#10b981", "#6366f1", "#f59e0b", "#ef4444", "#6b7280"];

function formatINR(value) {
  const n = Number(value) || 0;
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function SkeletonBlock({ className }) {
  return (
    <div className={`animate-pulse rounded-2xl bg-white/10 ${className}`} />
  );
}

function toCSVValue(value) {
  const str = String(value ?? "");
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

export default function StorePerformance() {
  const [exporting, setExporting] = useState(false);

  const { data: dashboard, isLoading: dashLoading } =
    useGetVendorDashboardQuery();

  const { data: monthlySales, isLoading: salesLoading } =
    useGetMonthlyRevenueQuery();

  const { data: ordersResponse, isLoading: ordersLoading } =
    useGetOrdersQuery();

  const { data: topProductsData, isLoading: topProductsLoading } =
    useGetTopProductsQuery();

  const { data: reviewAnalytics } = useGetReviewAnalyticsQuery();
  const { data: reviewBreakdown, isLoading: reviewLoading } =
    useGetReviewBreakdownQuery();
  const { data: conversion } = useGetConversionAnalyticsQuery();
  const { data: orderAnalytics } = useGetOrderAnalyticsQuery();
  const { data: customerAnalytics } = useGetCustomerAnalyticsQuery();

  const orders = ordersResponse || [];
  const topProducts = topProductsData || [];

  // ---------- Sales Growth: real monthly revenue, last 6 months ----------
  const salesData = useMemo(() => {
    if (!monthlySales) return [];
    return monthlySales.slice(-6).map((m) => ({
      month: m.name,
      sales: m.sales,
    }));
  }, [monthlySales]);

  // ---------- Customer Growth: distinct customers per month, derived from real orders ----------
  const customerGrowth = useMemo(() => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      months.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        month: d.toLocaleDateString("en-US", { month: "short" }),
        customers: new Set(),
      });
    }
    const monthMap = new Map(months.map((m) => [m.key, m]));

    orders.forEach((item) => {
      const date = item.order?.createdAt;
      const customerId = item.order?.customerId;
      if (!date || !customerId) return;
      const d = new Date(date);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (monthMap.has(key)) monthMap.get(key).customers.add(customerId);
    });

    return months.map((m) => ({ month: m.month, customers: m.customers.size }));
  }, [orders]);

  // ---------- Review breakdown, real counts per rating ----------
  const reviewData = useMemo(() => {
    if (!reviewBreakdown) return [];
    return [
      { name: "5 Star", value: reviewBreakdown.fiveStar || 0 },
      { name: "4 Star", value: reviewBreakdown.fourStar || 0 },
      { name: "3 Star", value: reviewBreakdown.threeStar || 0 },
      { name: "2 Star", value: reviewBreakdown.twoStar || 0 },
      { name: "1 Star", value: reviewBreakdown.oneStar || 0 },
    ].filter((r) => r.value > 0);
  }, [reviewBreakdown]);

  const storeRating = dashboard?.avgRating ?? reviewAnalytics?.averageRating;

  function handleExport() {
    setExporting(true);
    try {
      const rows = [
        ["Metric", "Value"],
        ["Store Rating", Number(storeRating || 0).toFixed(1)],
        ["Total Customers", dashboard?.totalCustomers ?? 0],
        ["Orders", dashboard?.totalOrders ?? 0],
        ["Conversion Rate", `${conversion?.conversionRate ?? 0}%`],
        ["Avg Order Value", formatINR(orderAnalytics?.averageOrderValue)],
        ["Repeat Customers", `${customerAnalytics?.repeatPurchaseRate ?? 0}%`],
        ["Retention Rate", `${customerAnalytics?.retentionRate ?? 0}%`],
        [
          "New Customers This Month",
          customerAnalytics?.newCustomersThisMonth ?? 0,
        ],
        [],
        ["Product", "Units Sold", "Revenue"],
        ...topProducts.map((p) => [p.name, p.unitsSold, p.revenue]),
      ];

      const csv = rows.map((row) => row.map(toCSVValue).join(",")).join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `store-performance-${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Store Performance</h2>

          <p className="text-white/60 mt-2">Analytics & Growth Intelligence</p>
        </div>

        <button
          onClick={handleExport}
          disabled={exporting}
          className="rounded-xl bg-gradient-to-r from-pink-500 to-red-500 px-5 py-3 flex items-center gap-2 font-semibold text-white transition hover:from-pink-600 hover:to-red-600 disabled:opacity-60"
        >
          {exporting ? <FaSpinner className="animate-spin" /> : <FaDownload />}
          Export Report
        </button>
      </div>

      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        <KpiCard
          title="Store Rating"
          value={dashLoading ? "…" : Number(storeRating || 0).toFixed(1)}
          icon={<FaStar />}
        />

        <KpiCard
          title="Total Customers"
          value={
            dashLoading
              ? "…"
              : (dashboard?.totalCustomers ?? 0).toLocaleString("en-IN")
          }
          icon={<FaUsers />}
        />

        <KpiCard
          title="Orders"
          value={
            dashLoading
              ? "…"
              : (dashboard?.totalOrders ?? 0).toLocaleString("en-IN")
          }
          icon={<FaShoppingBag />}
        />

        <KpiCard
          title="Conversion Rate"
          value={conversion ? `${conversion.conversionRate}%` : "…"}
          icon={<FaChartLine />}
        />
      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
        >
          <h3 className="font-bold text-xl mb-5 text-white">Sales Growth</h3>

          <div className="h-[320px]">
            {salesLoading ? (
              <SkeletonBlock className="h-full w-full" />
            ) : (
              <ResponsiveContainer>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" />
                  <XAxis dataKey="month" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip
                    formatter={(v) => formatINR(v)}
                    contentStyle={{
                      background: "#0B1225",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 12,
                      color: "#fff",
                    }}
                  />
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#8B5CF6"
                    strokeWidth={4}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
        >
          <h3 className="font-bold text-xl mb-5 text-white">Customer Growth</h3>

          <div className="h-[320px]">
            {ordersLoading ? (
              <SkeletonBlock className="h-full w-full" />
            ) : (
              <ResponsiveContainer>
                <BarChart data={customerGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" />
                  <XAxis dataKey="month" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip
                    contentStyle={{
                      background: "#0B1225",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 12,
                      color: "#fff",
                    }}
                  />

                  <Bar
                    dataKey="customers"
                    fill="#06B6D4"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>
      </div>

      {/* Reviews */}

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
        >
          <h3 className="font-bold text-xl mb-5 text-white">
            Review Analytics
          </h3>

          <div className="h-[320px]">
            {reviewLoading ? (
              <SkeletonBlock className="h-full w-full" />
            ) : reviewData.length === 0 ? (
              <p className="flex h-full items-center justify-center text-white/40 text-sm">
                No reviews yet.
              </p>
            ) : (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={reviewData}
                    dataKey="value"
                    outerRadius={110}
                    label
                  >
                    {reviewData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      background: "#0B1225",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 12,
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
        >
          <h3 className="font-bold text-xl mb-5 text-white">
            Performance Metrics
          </h3>

          <div className="space-y-5">
            <Metric
              label="Conversion Rate"
              value={conversion ? `${conversion.conversionRate}%` : "…"}
            />

            <Metric
              label="Avg Order Value"
              value={
                orderAnalytics
                  ? formatINR(orderAnalytics.averageOrderValue)
                  : "…"
              }
            />

            <Metric
              label="Repeat Customers"
              value={
                customerAnalytics
                  ? `${customerAnalytics.repeatPurchaseRate}%`
                  : "…"
              }
            />

            <Metric
              label="Retention Rate"
              value={
                customerAnalytics ? `${customerAnalytics.retentionRate}%` : "…"
              }
            />

            <Metric
              label="New Customers This Month"
              value={customerAnalytics?.newCustomersThisMonth ?? "…"}
            />
          </div>
        </motion.div>
      </div>

      {/* Top Products */}

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="font-bold text-xl text-white">Top Selling Products</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-white/60">
                <th className="p-4">Product</th>

                <th className="p-4">Units Sold</th>

                <th className="p-4">Revenue</th>
              </tr>
            </thead>

            <tbody>
              {topProductsLoading && (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-white/40">
                    Loading products…
                  </td>
                </tr>
              )}

              {!topProductsLoading && topProducts.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-white/40">
                    No sales data yet.
                  </td>
                </tr>
              )}

              {!topProductsLoading &&
                topProducts.map((product) => (
                  <tr
                    key={product.productId}
                    className="border-t border-white/10 text-white hover:bg-white/5"
                  >
                    <td className="p-4">{product.name}</td>

                    <td className="p-4 font-semibold">{product.unitsSold}</td>

                    <td className="p-4 text-emerald-400 font-semibold">
                      {formatINR(product.revenue)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-2xl text-white">
        {icon}
      </div>

      <p className="text-white/60 mt-4">{title}</p>

      <h3 className="text-3xl font-black mt-2 text-white">{value}</h3>
    </motion.div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="flex justify-between border-b border-white/10 pb-3 text-white">
      <span className="text-white/70">{label}</span>

      <span className="font-bold">{value}</span>
    </div>
  );
}
