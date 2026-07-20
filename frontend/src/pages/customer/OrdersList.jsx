import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineChevronRight,
  HiOutlineCalendar,
  HiOutlineCurrencyRupee,
} from "react-icons/hi2";
import { api } from "../../lib/api.js";
import GlassCard from "../../components/GlassCard.jsx";

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

export default function OrdersList() {
  const [filter, setFilter] = useState("ALL"); // ALL | ACTIVE | COMPLETED | CANCELLED
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: orders, isLoading, isError, refetch } = useQuery({
    queryKey: ["customer-orders"],
    queryFn: () => api.get("/customer/orders").then((r) => r.data),
  });

  // Reset page when filter selection updates
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-40">
        <div className="w-10 h-10 border-4 border-indigo border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-32 space-y-4">
        <p className="text-sm text-rose-400">Failed to load your orders history.</p>
        <button onClick={() => refetch()} className="btn-primary px-5 py-2 text-xs">
          Retry Load
        </button>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-32 space-y-5 max-w-sm mx-auto">
        <div className="w-14 h-14 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/10 text-muted">
          <HiOutlineClipboardDocumentList size={26} />
        </div>
        <div className="space-y-1">
          <h2 className="font-display font-semibold text-lg text-white">No orders yet</h2>
          <p className="text-xs text-muted leading-relaxed">
            Your shopping logs are empty. Place your first order to track shipping status and invoices!
          </p>
        </div>
        <Link to="/dashboard/shop" className="btn-primary px-6 py-2.5 text-xs font-semibold">
          Explore Shop
        </Link>
      </div>
    );
  }

  // Filter orders list client-side
  const filteredOrders = orders.filter((order) => {
    if (filter === "ALL") return true;
    if (filter === "ACTIVE") {
      return ["PENDING", "CONFIRMED", "PACKED", "SHIPPED", "OUT_FOR_DELIVERY"].includes(order.status);
    }
    if (filter === "COMPLETED") {
      return order.status === "DELIVERED";
    }
    if (filter === "CANCELLED") {
      return ["CANCELLED", "RETURNED"].includes(order.status);
    }
    return true;
  });

  // Calculate pagination boundaries
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      {/* Header and filter selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">My Orders</h1>
          <p className="text-xs text-muted mt-1">Track shipping updates, review invoices, and view order receipts</p>
        </div>

        {/* Categories selector dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted font-bold uppercase tracking-wider whitespace-nowrap">Filter Status:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-panel2 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo/50 cursor-pointer appearance-none pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:18px] bg-[right_8px_center] bg-no-repeat"
          >
            <option value="ALL" className="bg-panel text-white">All Orders</option>
            <option value="ACTIVE" className="bg-panel text-white">Active Orders</option>
            <option value="COMPLETED" className="bg-panel text-white">Completed / Delivered</option>
            <option value="CANCELLED" className="bg-panel text-white">Cancelled / Returned</option>
          </select>
        </div>
      </div>

      {/* Orders Grid */}
      {paginatedOrders.length === 0 ? (
        <div className="text-center py-20 text-muted text-xs">
          No orders found matching the selected status filter.
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedOrders.map((order) => {
            const statusTheme = STATUS_THEMES[order.status] || {
              bg: "bg-white/10 text-white border-white/20",
              label: order.status,
            };
            const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

            return (
              <GlassCard key={order.id} tilt={false} className="p-5 sm:p-6 transition-all hover:border-white/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Details info */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm font-semibold text-white tracking-tight font-mono">
                        {order.orderNumber}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusTheme.bg}`}>
                        {statusTheme.label}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                      <span className="inline-flex items-center gap-1">
                        <HiOutlineCalendar size={14} className="text-indigo-soft" />
                        {orderDate}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono">
                        <HiOutlineCurrencyRupee size={14} className="text-indigo-soft" />
                        ₹{parseFloat(order.grandTotal).toLocaleString("en-IN")}
                      </span>
                      <span className="text-[11px] bg-white/[0.03] px-2 py-0.5 rounded border border-white/5 font-medium">
                        {order.items.length} {order.items.length === 1 ? "item" : "items"}
                      </span>
                    </div>

                    {/* Items preview snippet */}
                    <div className="text-[11px] text-muted line-clamp-1">
                      Items: {order.items.map((i) => `${i.product.name} (x${i.quantity})`).join(", ")}
                    </div>

                    {/* Image thumbnails row */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      {order.items.map((item) => {
                        const imgUrl = item.product.images?.[0]?.url;
                        return (
                          <div 
                            key={item.id} 
                            title={`${item.product.name} (x${item.quantity})`}
                            className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/10 overflow-hidden flex items-center justify-center shrink-0 hover:border-indigo-soft/50 transition-colors"
                          >
                            {imgUrl ? (
                              <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-3.5 h-3.5 border border-dashed border-white/20 rounded-full" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Navigation CTA button */}
                  <div className="flex items-center justify-end">
                    <Link
                      to={`/dashboard/orders/${order.id}`}
                      className="inline-flex items-center gap-1.5 text-xs text-indigo-soft hover:text-white hover:underline transition-colors font-semibold group"
                    >
                      View Details
                      <HiOutlineChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6 border-t border-white/[0.04]">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 border border-white/10 rounded-xl bg-panel2/50 hover:bg-panel2 text-xs font-semibold text-muted hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            Previous
          </button>
          <span className="text-xs text-muted font-semibold font-mono px-3">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-2 border border-white/10 rounded-xl bg-panel2/50 hover:bg-panel2 text-xs font-semibold text-muted hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
