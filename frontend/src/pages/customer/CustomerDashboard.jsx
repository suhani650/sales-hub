import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineSquares2X2,
  HiOutlineCurrencyRupee,
  HiOutlineGift,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";
import { api, setAccessToken } from "../../lib/api.js";
import { clearUser } from "../../store/authSlice.js";
import { useToast } from "../../context/ToastContext.jsx";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["customer-profile"],
    queryFn: () => api.get("/customer/profile").then((r) => r.data),
  });

  async function handleLogout() {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error(err);
    }
    setAccessToken(null);
    dispatch(clearUser());
    showToast("Successfully logged out.", "info");
    navigate("/login");
  }

  function handleCopyReferral(code) {
    if (!code) return;
    navigator.clipboard.writeText(code);
    showToast("Referral code copied to clipboard!", "success");
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-mesh px-6 py-12 flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-display font-semibold text-lg">
              <HiOutlineSquares2X2 className="text-indigo" size={22} />
              SALESHUB
            </div>
            <div className="w-24 h-9 bg-panel/50 rounded-xl animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <SkeletonCard className="h-44" />
            <SkeletonCard className="h-44" />
          </div>
          <SkeletonCard className="h-80" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-mesh flex items-center justify-center px-6">
        <GlassCard className="max-w-md p-8 text-center space-y-4">
          <h2 className="font-display text-xl font-bold text-rose-400">Unable to load dashboard</h2>
          <p className="text-sm text-muted">There was an issue fetching your customer profile details.</p>
          <button onClick={handleLogout} className="btn-primary flex items-center gap-2 mx-auto">
            <HiOutlineArrowLeftOnRectangle size={16} /> Log Out
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mesh px-6 py-12 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-8">
        
        {/* Header Block */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-display font-semibold text-lg">
            <HiOutlineSquares2X2 className="text-indigo" size={22} />
            SALESHUB
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 border border-white/10 bg-panel/40 hover:bg-panel hover:text-rose-400 rounded-xl transition-all cursor-pointer"
          >
            <HiOutlineArrowLeftOnRectangle size={16} /> Log Out
          </button>
        </div>

        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-1"
        >
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Hello, <span className="text-sky">{user?.name || "Customer"}</span>
          </h1>
          <p className="text-sm text-muted">Welcome to your customer portal</p>
        </motion.div>

        {/* Top Cards row */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Rewards Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <GlassCard className="p-6 relative overflow-hidden flex flex-col justify-between h-44">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted uppercase tracking-wider">Rewards Points</p>
                  <p className="text-4xl font-display font-bold text-sky mt-2">{data.points} pts</p>
                </div>
                <div className="p-3 bg-sky/15 rounded-xl text-sky">
                  <HiOutlineGift size={24} />
                </div>
              </div>
              <p className="text-xs text-muted">Collect points on every purchase to redeem discount coupons.</p>
            </GlassCard>
          </motion.div>

          {/* Referral Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <GlassCard className="p-6 relative overflow-hidden flex flex-col justify-between h-44">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted uppercase tracking-wider">Referral Program</p>
                  <div
                    onClick={() => handleCopyReferral(data.referralCode)}
                    className="flex items-center gap-2 bg-panel2/60 border border-white/10 hover:border-indigo/50 hover:bg-panel2 px-3 py-2 rounded-xl mt-3 cursor-pointer transition-all w-fit"
                  >
                    <span className="font-mono text-sm text-white font-semibold tracking-wider">
                      {data.referralCode}
                    </span>
                    <HiOutlineClipboardDocumentCheck size={16} className="text-indigo-soft" />
                  </div>
                </div>
                <div className="p-3 bg-indigo/15 rounded-xl text-indigo-soft">
                  <HiOutlineCurrencyRupee size={24} />
                </div>
              </div>
              <p className="text-xs text-muted">Click code to copy. Share code to earn 100 points on their first order!</p>
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
    </div>
  );
}
