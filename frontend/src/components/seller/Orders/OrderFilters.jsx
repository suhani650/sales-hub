import { FaSearch, FaDownload, FaUndo, FaCalendarAlt } from "react-icons/fa";

export default function OrderFilters({
  filters,
  setFilters,
  onExport,
  onReset,
}) {
  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 shadow-[0_15px_40px_rgba(0,0,0,.35)]">
      <div className="grid xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 gap-4">
        {/* Order Search */}

        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Order ID"
            value={filters.orderId}
            onChange={(e) => handleChange("orderId", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#162033] pl-11 pr-4 py-3 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
          />
        </div>

        {/* Customer Search */}

        <input
          type="text"
          placeholder="Customer Name"
          value={filters.customer}
          onChange={(e) => handleChange("customer", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#162033] px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
        />

        {/* Order Status */}

        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#162033] px-4 py-3 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
        >
          <option value="">All Orders</option>

          <option value="PENDING">Pending</option>

          <option value="CONFIRMED">Confirmed</option>

          <option value="PACKED">Packed</option>

          <option value="SHIPPED">Shipped</option>

          <option value="OUT_FOR_DELIVERY">Out For Delivery</option>

          <option value="DELIVERED">Delivered</option>

          <option value="CANCELLED">Cancelled</option>

          <option value="RETURNED">Returned</option>
        </select>

        {/* Payment Status */}

        <select
          value={filters.paymentStatus}
          onChange={(e) => handleChange("paymentStatus", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#162033] px-4 py-3 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
        >
          <option value="">Payment Status</option>

          <option value="SUCCESS">Paid</option>

          <option value="PENDING">Pending</option>

          <option value="FAILED">Failed</option>

          <option value="REFUNDED">Refunded</option>
        </select>

        {/* Delivery Status */}

        <select
          value={filters.deliveryStatus}
          onChange={(e) => handleChange("deliveryStatus", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#162033] px-4 py-3 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
        >
          <option value="">Delivery Status</option>

          <option value="READY">Ready</option>

          <option value="OUT_FOR_DELIVERY">Out For Delivery</option>

          <option value="DELIVERED">Delivered</option>

          <option value="RETURNED">Returned</option>
        </select>

        {/* Date */}

        <div className="relative">
          <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="date"
            value={filters.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#162033] pl-11 pr-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
          />
        </div>
      </div>

      {/* Actions */}

      <div className="flex flex-wrap items-center justify-end gap-4 mt-8 border-t border-white/10 pt-6">
        <button
          onClick={onReset}
          className="
px-6
py-3
rounded-xl
border
border-white/10
bg-[#162033]
text-slate-300
flex
items-center
gap-2
hover:border-cyan-500
hover:text-cyan-400
hover:bg-cyan-500/10
transition-all
duration-300
"
        >
          <FaUndo />
          Reset
        </button>

        <button
          onClick={onExport}
          className="
px-6
py-3
rounded-xl
bg-gradient-to-r
from-cyan-500
to-blue-600
text-white
font-semibold
flex
items-center
gap-2
hover:scale-105
hover:shadow-[0_0_25px_rgba(34,211,238,.35)]
transition-all
duration-300
"
        >
          <FaDownload />
          Export Orders
        </button>
      </div>
    </div>
  );
}
