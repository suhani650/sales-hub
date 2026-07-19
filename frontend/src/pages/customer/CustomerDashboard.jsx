import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { api } from "../../lib/api.js";
import GlassCard from "../../components/GlassCard.jsx";
import SkeletonCard from "../../components/SkeletonCard.jsx";

const STATUS_STYLES = {
  PENDING: "bg-amber/15 text-amber",
  CONFIRMED: "bg-indigo/15 text-indigo-soft",
  SHIPPED: "bg-cyan/15 text-cyan",
  DELIVERED: "bg-emerald-500/15 text-emerald-400",
  CANCELLED: "bg-rose-500/15 text-rose-400",
};

export default function CustomerDashboard() {
  const user = useSelector((s) => s.auth.user);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["customer-profile"],
    queryFn: () => api.get("/customer/profile").then((r) => r.data),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="w-48 h-8 bg-panel/50 rounded-xl animate-pulse" />
        <div className="grid md:grid-cols-2 gap-6">
          <SkeletonCard className="h-32" />
          <SkeletonCard className="h-32" />
        </div>
        <SkeletonCard className="h-80" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center py-12">
        <GlassCard className="max-w-md p-8 text-center space-y-4">
          <h2 className="font-display text-xl font-bold text-rose-400">Unable to load overview</h2>
          <p className="text-sm text-muted">There was an issue fetching your account overview details.</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1"
      >
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Welcome back, <span className="text-indigo-soft">{user?.name || "Customer"}</span>
        </h1>
        <p className="text-sm text-muted">Here is the status of your account logs and orders</p>
      </motion.div>

      {/* Top Cards row */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Total Orders Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <GlassCard className="p-6 relative overflow-hidden flex items-center justify-between h-32">
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider">Total Orders</p>
              <p className="text-3xl font-display font-bold text-indigo-soft mt-1">{data.orders.length}</p>
            </div>
            <div className="p-3 bg-indigo/15 rounded-xl text-indigo-soft">
              <HiOutlineClipboardDocumentList size={24} />
            </div>
          </GlassCard>
        </motion.div>

        {/* Member Since Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <GlassCard className="p-6 relative overflow-hidden flex items-center justify-between h-32">
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider">Member Since</p>
              <p className="text-lg font-display font-bold text-white mt-1">
                {new Date(data.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="p-3 bg-sky/15 rounded-xl text-sky">
              <HiOutlineCalendarDays size={24} />
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Order History */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <GlassCard className="p-6">
          <h2 className="font-display font-semibold text-lg mb-6">Recent Orders</h2>
          
          {data.orders.length === 0 ? (
            <div className="text-center py-12 text-muted">
              <p className="text-sm">You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-white/[0.06] text-muted text-xs font-semibold uppercase">
                    <th className="pb-4">Order ID</th>
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Total</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {data.orders.map((o) => (
                    <tr key={o.id} className="group hover:bg-white/[0.01]">
                      <td className="py-4 font-mono font-medium text-white">{o.orderNumber}</td>
                      <td className="py-4 text-muted">
                        {new Date(o.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-4 font-semibold text-white">
                        ₹{(o.grandTotal / 100).toLocaleString("en-IN")}
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-2.5 py-1 text-[10px] font-bold rounded-lg ${
                            STATUS_STYLES[o.status] || "bg-panel2 text-muted"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
