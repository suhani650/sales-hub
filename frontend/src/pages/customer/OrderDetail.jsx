import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  HiOutlineChevronLeft,
  HiOutlineMapPin,
  HiOutlineCreditCard,
  HiOutlineCalendar,
  HiOutlineInbox,
} from "react-icons/hi2";
import { api } from "../../lib/api.js";
import GlassCard from "../../components/GlassCard.jsx";
import { useToast } from "../../context/ToastContext.jsx";

const STATUS_THEMES = {
  PENDING: { bg: "bg-amber-500/10 text-amber border-amber-500/20", label: "Pending" },
  CONFIRMED: { bg: "bg-indigo/10 text-indigo-soft border-indigo/20", label: "Confirmed" },
  PACKED: { bg: "bg-indigo/10 text-indigo-soft border-indigo/20", label: "Packed" },
  SHIPPED: { bg: "bg-blue-500/10 text-blue-400 border-blue-500/20", label: "Shipped" },
  OUT_FOR_DELIVERY: { bg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20", label: "Out For Delivery" },
  DELIVERED: { bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", label: "Delivered" },
  CANCELLED: { bg: "bg-rose-500/10 text-rose-400 border-rose-500/20", label: "Cancelled" },
  RETURNED: { bg: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20", label: "Returned" },
};

const STEPS_TIMELINE = ["PENDING", "CONFIRMED", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"];
const STEP_LABELS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  SHIPPED: "Shipped",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
};

export default function OrderDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { data: order, isLoading, isError, refetch } = useQuery({
    queryKey: ["customer-order", id],
    queryFn: () => api.get(`/customer/orders/${id}`).then((r) => r.data),
  });

  const cancelOrderMutation = useMutation({
    mutationFn: () => api.put(`/customer/orders/${id}/cancel`).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["customer-order", id]);
      queryClient.invalidateQueries(["customer-orders"]);
      queryClient.invalidateQueries(["customer-profile"]);
      showToast("Order cancelled successfully!", "success");
    },
    onError: (err) => {
      showToast(err.response?.data?.error || "Failed to cancel order.", "error");
    }
  });

  const handleCancelOrder = () => {
    if (window.confirm("Are you sure you want to cancel this order? This action cannot be undone and product stocks will be restored.")) {
      cancelOrderMutation.mutate();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-40">
        <div className="w-10 h-10 border-4 border-indigo border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="text-center py-32 space-y-4">
        <p className="text-sm text-rose-400">Order details not found or failed to load.</p>
        <Link to="/dashboard/orders" className="btn-primary px-5 py-2 text-xs">
          Back to Orders
        </Link>
      </div>
    );
  }

  // Parse values
  const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const subtotal = parseFloat(order.subtotal);
  const tax = subtotal * 0.18; // 18% GST
  const shipping = parseFloat(order.shippingTotal);
  const grandTotal = parseFloat(order.grandTotal);

  const statusTheme = STATUS_THEMES[order.status] || {
    bg: "bg-white/10 text-white border-white/20",
    label: order.status,
  };

  // Determine current timeline progress index
  const currentStepIdx = STEPS_TIMELINE.indexOf(order.status);
  const isCancelled = order.status === "CANCELLED";
  const isReturned = order.status === "RETURNED";

  return (
    <div className="space-y-8">
      {/* Header and back */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-bold text-white font-mono tracking-tight">
              {order.orderNumber}
            </h1>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${statusTheme.bg}`}>
              {statusTheme.label}
            </span>
            {order.status === "PENDING" && (
              <button
                onClick={handleCancelOrder}
                disabled={cancelOrderMutation.isLoading}
                className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] px-3 py-1 font-semibold uppercase tracking-wider rounded-lg hover:bg-rose-500/20 active:bg-rose-500/30 transition-all disabled:opacity-50"
              >
                {cancelOrderMutation.isLoading ? "Cancelling..." : "Cancel Order"}
              </button>
            )}
          </div>
          <p className="text-xs text-muted flex items-center gap-1">
            <HiOutlineCalendar size={14} className="text-indigo-soft" />
            Placed on {orderDate}
          </p>
        </div>
        <Link
          to="/dashboard/orders"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors self-start sm:self-center"
        >
          <HiOutlineChevronLeft size={14} /> Back to Orders
        </Link>
      </div>

      {/* 1. Progress tracking timeline (Only render if not Cancelled/Returned) */}
      {!isCancelled && !isReturned && (
        <GlassCard tilt={false} className="p-6">
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-2">
            
            {/* Horizontal line (desktop) */}
            <div className="absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 top-10 md:top-5 bottom-10 md:bottom-auto md:w-full h-full md:h-1 bg-white/[0.06] -z-10" />

            {/* Filled connector path (desktop) */}
            {currentStepIdx >= 0 && (
              <div 
                className="absolute hidden md:block left-0 top-5 h-1 bg-indigo-soft/70 transition-all -z-10"
                style={{ width: `${(currentStepIdx / (STEPS_TIMELINE.length - 1)) * 100}%` }}
              />
            )}

            {STEPS_TIMELINE.map((step, idx) => {
              const isActive = idx <= currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div key={step} className="flex md:flex-col items-center gap-3 md:gap-2 z-10 w-full max-w-[200px] text-center">
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                    isCurrent 
                      ? "bg-indigo border-indigo text-white shadow-glow" 
                      : isActive 
                        ? "bg-indigo-soft/20 border-indigo-soft text-indigo-soft" 
                        : "bg-panel2 border-white/10 text-muted"
                  }`}>
                    {idx + 1}
                  </div>
                  <span className={`text-[11px] font-semibold tracking-tight ${
                    isCurrent ? "text-white" : isActive ? "text-indigo-soft" : "text-muted"
                  }`}>
                    {STEP_LABELS[step]}
                  </span>
                </div>
              );
            })}
          </div>
        </GlassCard>
      )}

      {/* Cancelled Alert Box */}
      {isCancelled && (
        <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-4 text-xs text-rose-400">
          This order was cancelled. Restored quantities have been added back to catalog inventories.
        </div>
      )}

      {/* Main grids split */}
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        
        {/* Left lists (Col span 2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Purchased Items List */}
          <GlassCard tilt={false} className="p-5 sm:p-6 space-y-4">
            <h2 className="font-display font-semibold text-sm text-white flex items-center gap-2">
              <HiOutlineInbox size={18} className="text-indigo-soft" />
              Order Items
            </h2>

            <div className="divide-y divide-white/[0.05]">
              {order.items.map((item) => {
                const primaryImage = item.product.images?.[0]?.url;
                
                return (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                    {/* Item Image */}
                    <div className="w-14 h-14 rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                      {primaryImage ? (
                        <img src={primaryImage} alt={item.product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-5 h-5 border border-dashed border-white/20 rounded-full" />
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-semibold text-white truncate hover:underline">
                        <Link to={`/dashboard/products/${item.product.slug}`}>{item.product.name}</Link>
                      </h4>
                      <p className="text-[10px] text-muted mt-0.5 font-mono">
                        Qty: {item.quantity} &times; ₹{parseFloat(item.unitPrice).toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* Price */}
                    <span className="text-xs font-semibold font-mono text-white shrink-0">
                      ₹{parseFloat(item.lineTotal).toLocaleString("en-IN")}
                    </span>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Pricing breakdowns */}
          <GlassCard tilt={false} className="p-5 sm:p-6 space-y-4">
            <h3 className="font-display font-semibold text-sm text-white border-b border-white/[0.05] pb-3">
              Payment Breakdown
            </h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="font-mono text-white">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>GST (18%)</span>
                <span className="font-mono text-white">₹{tax.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping & Handling</span>
                <span className="font-mono text-indigo-soft">
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-white pt-3 border-t border-white/[0.05]">
                <span>Total Amount Paid</span>
                <span className="font-mono text-indigo-soft">₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </GlassCard>

        </div>

        {/* Right lists (Col span 1) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Shipping Detail Box */}
          <GlassCard tilt={false} className="p-5 sm:p-6 space-y-3">
            <h3 className="font-display font-semibold text-sm text-white flex items-center gap-2">
              <HiOutlineMapPin size={18} className="text-indigo-soft" />
              Delivery Details
            </h3>
            <p className="text-xs text-white leading-relaxed font-sans whitespace-pre-line">
              {order.shippingAddress}
            </p>
          </GlassCard>

          {/* Payment Detail Box */}
          <GlassCard tilt={false} className="p-5 sm:p-6 space-y-3">
            <h3 className="font-display font-semibold text-sm text-white flex items-center gap-2">
              <HiOutlineCreditCard size={18} className="text-indigo-soft" />
              Transaction Details
            </h3>
            
            <div className="space-y-2 text-xs font-mono">
              {order.payments?.map((payment) => (
                <div key={payment.id} className="space-y-1.5 pt-2 first:pt-0">
                  <div className="flex justify-between">
                    <span className="text-muted">Method</span>
                    <span className="text-white uppercase">{payment.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Status</span>
                    <span className="text-emerald-400 font-bold">{payment.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Amount</span>
                    <span className="text-indigo-soft">₹{parseFloat(payment.amount).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>

      </div>
    </div>
  );
}
