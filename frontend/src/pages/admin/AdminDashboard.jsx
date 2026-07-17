import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import {
  HiOutlineBuildingStorefront,
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiOutlineCurrencyRupee,
} from "react-icons/hi2";
import { api } from "../../lib/api.js";
import KpiCard from "../../components/admin/KpiCard.jsx";
import GlassCard from "../../components/GlassCard.jsx";
import SkeletonCard from "../../components/SkeletonCard.jsx";

const STATUS_STYLES = {
  PENDING: "bg-amber/15 text-amber",
  CONFIRMED: "bg-indigo/15 text-indigo-soft",
  SHIPPED: "bg-cyan/15 text-cyan",
  DELIVERED: "bg-emerald-500/15 text-emerald-400",
  CANCELLED: "bg-red-500/15 text-red-400",
};

export default function AdminDashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: () => api.get("/admin/dashboard").then((r) => r.data),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Overview</h1>
          <p className="text-sm text-muted mt-1">Last 30 days across all vendors</p>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <GlassCard tilt={false} className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-medium">Revenue trend</h2>
              <span className="text-xs font-mono text-muted">30 days</span>
            </div>
            <SkeletonCard className="h-72" />
          </GlassCard>

          <GlassCard tilt={false}>
            <h2 className="font-display font-medium mb-6">Pending approvals</h2>
            <SkeletonCard className="h-72" />
          </GlassCard>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Overview</h1>
          <p className="text-sm text-muted mt-1">Last 30 days across all vendors</p>
        </div>
        <GlassCard tilt={false} className="text-sm text-amber">
          Couldn't load dashboard data. Is the backend running on :5000?
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Overview</h1>
          <p className="text-sm text-muted mt-1">Last 30 days across all vendors</p>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={HiOutlineCurrencyRupee} label="Revenue (30d)" value={data.kpis.revenue30d} prefix="₹" accent="cyan" />
        <KpiCard icon={HiOutlineBuildingStorefront} label="Active vendors" value={data.kpis.activeVendors} accent="indigo" />
        <KpiCard icon={HiOutlineShoppingBag} label="Products live" value={data.kpis.products} accent="amber" />
        <KpiCard icon={HiOutlineUsers} label="Customers" value={data.kpis.customers} accent="indigo" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue trend */}
        <GlassCard tilt={false} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-medium">Revenue trend</h2>
            <span className="text-xs font-mono text-muted">30 days</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data.revenueTrend}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5B6EF5" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#5B6EF5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A2033" vertical={false} />
              <XAxis dataKey="date" stroke="#8890AC" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#8890AC" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: "#131826", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12 }}
                labelStyle={{ color: "#8890AC" }}
              />
              <Area type="monotone" dataKey="total" stroke="#5B6EF5" strokeWidth={2} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Pending vendor approvals */}
        <GlassCard tilt={false}>
          <h2 className="font-display font-medium mb-6">Pending approvals</h2>
          {data.kpis.pendingVendors === 0 ? (
            <p className="text-sm text-muted">All vendors are reviewed. Nothing waiting.</p>
          ) : (
            <p className="text-sm text-ink">
              <span className="text-amber font-mono text-2xl">{data.kpis.pendingVendors}</span> vendor
              {data.kpis.pendingVendors > 1 ? "s" : ""} waiting on review.
            </p>
          )}
        </GlassCard>
      </div>

      {/* Recent orders */}
      <GlassCard tilt={false} className="p-0 overflow-hidden">
        <div className="p-6 pb-0">
          <h2 className="font-display font-medium mb-4">Recent orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted border-b border-white/[0.06]">
                <th className="px-6 py-3 font-normal">Order</th>
                <th className="px-6 py-3 font-normal">Customer</th>
                <th className="px-6 py-3 font-normal">Status</th>
                <th className="px-6 py-3 font-normal text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.recentOrders.map((o, i) => (
                <motion.tr
                  key={o.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-xs text-muted">{o.orderNumber}</td>
                  <td className="px-6 py-4">{o.customerName}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full ${STATUS_STYLES[o.status] ?? "bg-panel2"}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono">₹{Number(o.grandTotal).toLocaleString("en-IN")}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
