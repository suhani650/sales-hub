import { useLocation, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineCheckCircle,
  HiOutlineShoppingBag,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import GlassCard from "../../components/GlassCard.jsx";

export default function CheckoutSuccess() {
  const location = useLocation();
  const state = location.state || {};
  const { orderNumber, grandTotal } = state;

  // Fallback if accessed directly without completing checkout
  if (!orderNumber) {
    return <Navigate to="/dashboard/shop" replace />;
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <GlassCard tilt={true} className="p-8 text-center space-y-6">
          {/* Animated Success Check */}
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="text-indigo"
            >
              <HiOutlineCheckCircle size={72} className="text-indigo-soft drop-shadow-glow" />
            </motion.div>
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-2xl font-bold text-white tracking-tight">
              Order Placed Successfully!
            </h1>
            <p className="text-xs text-muted">
              Thank you for shopping with us. Your payment has been processed and your order is now pending confirmation.
            </p>
          </div>

          {/* Details */}
          <div className="bg-panel2/50 border border-white/10 rounded-2xl p-4 text-xs space-y-3 font-mono">
            <div className="flex justify-between">
              <span className="text-muted">Order Number</span>
              <span className="text-white font-semibold">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Amount Paid</span>
              <span className="text-indigo-soft font-bold">
                ₹{parseFloat(grandTotal).toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Estimated Delivery</span>
              <span className="text-white">3-5 business days</span>
            </div>
          </div>

          {/* Redirections */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link
              to="/dashboard"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-xs font-semibold text-white bg-panel/30 transition-colors"
            >
              <HiOutlineClipboardDocumentList size={16} />
              View Orders Log
            </Link>
            <Link
              to="/dashboard/shop"
              className="flex-1 btn-primary text-xs font-semibold flex items-center justify-center gap-2"
            >
              <HiOutlineShoppingBag size={16} />
              Continue Shopping
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
