import { useEffect, useState } from "react";
import {
  FaEye,
  FaPrint,
  FaEdit,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaInbox,
} from "react-icons/fa";

const PAGE_SIZE = 10;

export default function OrdersTable({
  orders = [],
  loading = false,
  onView,
  onStatus,
}) {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [orders.length]);

  const pageOrders = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const selectAll = () => {
    const pageIds = pageOrders.map((o) => o.id);
    const allSelected = pageIds.every((id) => selected.includes(id));

    if (allSelected) {
      setSelected((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelected((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  const formatDate = (value) => {
    if (!value) return "—";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="rounded-[28px] overflow-hidden border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] shadow-[0_15px_40px_rgba(0,0,0,.35)]">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-white">Orders</h2>
        <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold">
          {selected.length} Selected
        </div>
      </div>

      {loading ? (
        <div className="p-16 text-center text-slate-400">Loading orders…</div>
      ) : orders.length === 0 ? (
        <div className="p-16 flex flex-col items-center gap-4 text-center">
          <FaInbox className="text-4xl text-slate-600" />
          <p className="text-slate-400">
            No orders match your current filters.
          </p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1300px]">
              <thead className="bg-[#182338] text-slate-300">
                <tr>
                  <th className="p-4">
                    <input
                      type="checkbox"
                      checked={
                        pageOrders.length > 0 &&
                        pageOrders.every((o) => selected.includes(o.id))
                      }
                      onChange={selectAll}
                    />
                  </th>

                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-xs">
                    Order
                  </th>

                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-xs">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-xs">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-xs">
                    Items
                  </th>

                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-xs">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-xs">
                    Payment
                  </th>

                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-xs">
                    Delivery
                  </th>

                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-xs">
                    Tracking
                  </th>

                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-xs">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-xs">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {pageOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-white/5 hover:bg-cyan-500/5 transition-all duration-300"
                  >
                    <td className="px-6 py-5 text-slate-300">
                      <input
                        type="checkbox"
                        checked={selected.includes(order.id)}
                        onChange={() => toggleSelect(order.id)}
                      />
                    </td>
                    <td className="px-6 py-5 text-slate-300">
                      <div className="flex items-center gap-3">
                        {order.paymentStatus === "PENDING" && (
                          <FaStar
                            className="text-yellow-500"
                            title="Payment pending"
                          />
                        )}

                        <span className="font-semibold text-white">
                          {order.orderNumber || order.id}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-slate-300">
                      {order.customer}
                    </td>
                    <td className="px-6 py-5 font-bold text-white">
                      {formatCurrency(order.amount)}
                    </td>
                    <td className="px-6 py-5 text-slate-300">{order.items}</td>
                    <td className="px-6 py-5 text-slate-300">
                      <StatusBadge value={order.status} />
                    </td>
                    <td className="px-6 py-5 text-slate-300">
                      <StatusBadge value={order.paymentStatus} />
                    </td>
                    <td className="px-6 py-5 text-slate-300">
                      <StatusBadge value={order.deliveryStatus} />
                    </td>
                    <td className="px-6 py-5 text-cyan-400">
                      {order.tracking}
                    </td>
                    <td className="px-6 py-5 text-slate-300">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-6 py-5 text-slate-300">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onView?.(order)}
                          className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition"
                          title="View order"
                        >
                          <FaEye />
                        </button>

                        <button
                          onClick={() => onStatus?.(order)}
                          className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition"
                          title="Update status"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => window.print()}
                          className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition"
                          title="Print order"
                        >
                          <FaPrint />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap gap-4 justify-between items-center p-5 border-t border-white/10">
            <p className="text-sm text-slate-400">
              Showing {(page - 1) * PAGE_SIZE + 1}-
              {Math.min(page * PAGE_SIZE, orders.length)} of {orders.length}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center text-slate-300 disabled:opacity-30 hover:border-cyan-500/40 transition"
              >
                <FaChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(Math.max(0, page - 3), Math.max(0, page - 3) + 5)
                .map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-lg font-semibold transition ${
                      p === page
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                        : "border border-white/10 text-slate-300 hover:border-cyan-500/40"
                    }`}
                  >
                    {p}
                  </button>
                ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center text-slate-300 disabled:opacity-30 hover:border-cyan-500/40 transition"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const STATUS_STYLES = {
  PENDING: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  CONFIRMED: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
  PACKED: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
  SHIPPED: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  OUT_FOR_DELIVERY:
    "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  DELIVERED: "bg-green-500/10 text-green-400 border border-green-500/20",
  CANCELLED: "bg-red-500/10 text-red-400 border border-red-500/20",
  RETURNED: "bg-red-500/10 text-red-400 border border-red-500/20",
  SUCCESS: "bg-green-500/10 text-green-400 border border-green-500/20",
  FAILED: "bg-red-500/10 text-red-400 border border-red-500/20",
  REFUNDED: "bg-slate-500/10 text-slate-300 border border-slate-500/20",
  READY: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
};

function StatusBadge({ value }) {
  if (!value) return <span className="text-slate-500">—</span>;

  const style =
    STATUS_STYLES[value] ||
    "bg-slate-500/10 text-slate-300 border border-slate-500/20";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${style}`}
    >
      {String(value).replaceAll("_", " ")}
    </span>
  );
}
