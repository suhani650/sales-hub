import {
  FaTimes,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTruck,
  FaMoneyBillWave,
  FaPrint,
  FaEdit,
  FaCheckCircle,
  FaBoxOpen,
} from "react-icons/fa";

export default function OrderDetailsDrawer({
  open,
  onClose,
  order,
  onUpdateStatus,
}) {
  if (!open || !order) return null;

  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  const formatDate = (value) => {
    if (!value) return "—";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const items = order.rawItems || [];

  return (
    <>
      {/* Overlay */}

      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />

      {/* Drawer */}

      <div className="fixed right-0 top-0 h-full w-full lg:w-[700px] bg-gradient-to-br from-[#0B1120] to-[#141B2E] border-l border-white/10 z-50 overflow-y-auto shadow-2xl">
        {/* Header */}

        <div className="sticky top-0 bg-[#0B1120]/95 backdrop-blur border-b border-white/10 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {order.orderNumber || `ORD-${order.id}`}
            </h2>

            <p className="text-slate-400">Order Details</p>
          </div>

          <button
            onClick={onClose}
            className="text-xl text-slate-400 hover:text-white transition"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Actions */}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onUpdateStatus}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 font-semibold hover:shadow-[0_0_25px_rgba(34,211,238,.35)] transition"
            >
              <FaEdit />
              Update Status
            </button>

            <button
              onClick={() => window.print()}
              className="border border-white/10 bg-[#162033] text-slate-300 px-5 py-3 rounded-xl flex items-center gap-2 hover:border-cyan-500/40 transition"
            >
              <FaPrint />
              Print
            </button>
          </div>

          {/* Customer */}

          <Section title="Customer Information">
            <InfoRow
              icon={<FaUser />}
              label="Customer"
              value={order.customer}
            />

            <InfoRow
              icon={<FaEnvelope />}
              label="Email"
              value={order.customerEmail || "—"}
            />

            <InfoRow
              icon={<FaPhone />}
              label="Phone"
              value={order.customerPhone || "—"}
            />
          </Section>

          {/* Address */}

          <Section title="Delivery Address">
            <InfoRow
              icon={<FaMapMarkerAlt />}
              label="Address"
              value={order.address || "—"}
            />
          </Section>

          {/* Payment */}

          <Section title="Payment Details">
            <InfoRow
              icon={<FaMoneyBillWave />}
              label="Method"
              value={order.paymentMethod || "—"}
            />

            <InfoRow
              icon={<FaCheckCircle />}
              label="Status"
              value={order.paymentStatus || "—"}
            />

            <InfoRow
              icon={<FaMoneyBillWave />}
              label="Amount"
              value={formatCurrency(order.amount)}
            />
          </Section>

          {/* Shipping */}

          <Section title="Shipping Information">
            <InfoRow
              icon={<FaTruck />}
              label="Courier"
              value={order.courier || "—"}
            />

            <InfoRow
              icon={<FaTruck />}
              label="Tracking"
              value={order.tracking || "—"}
            />

            <InfoRow
              icon={<FaBoxOpen />}
              label="Order Status"
              value={order.status || "—"}
            />
          </Section>

          {/* Products */}

          <Section title="Ordered Products">
            <div className="space-y-4">
              {items.length === 0 && (
                <p className="text-slate-500 text-sm">No line items found.</p>
              )}

              {items.map((item) => {
                const image =
                  item.product?.images?.find((img) => img.isPrimary)?.url ||
                  item.product?.images?.[0]?.url;

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border border-white/10 bg-[#162033] rounded-xl p-4"
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={item.product?.name || ""}
                        className="w-20 h-20 rounded-lg object-cover bg-[#0F172A]"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-[#0F172A] flex items-center justify-center text-slate-600">
                        <FaBoxOpen className="text-2xl" />
                      </div>
                    )}

                    <div className="flex-1">
                      <h4 className="font-semibold text-white">
                        {item.product?.name || "Product"}
                      </h4>

                      <p className="text-slate-400 text-sm">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <div className="font-bold text-white">
                      {formatCurrency(item.lineTotal)}
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* Invoice */}

          <Section title="Invoice Summary">
            <div className="space-y-3">
              <InvoiceRow
                label="Subtotal"
                value={formatCurrency(order.subtotal)}
              />

              <InvoiceRow
                label="Discount"
                value={`- ${formatCurrency(order.discountTotal)}`}
              />

              <InvoiceRow
                label="Shipping"
                value={formatCurrency(order.shippingTotal)}
              />

              <InvoiceRow
                label="Total"
                value={formatCurrency(order.grandTotal)}
                bold
              />
            </div>
          </Section>

          {/* Meta */}

          <Section title="Order Meta">
            <InfoRow
              icon={<FaBoxOpen />}
              label="Placed On"
              value={formatDate(order.date)}
            />
          </Section>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-5">
      <h3 className="font-bold text-lg mb-5 text-white">{title}</h3>

      {children}
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex gap-4 py-3 border-b border-white/5 last:border-none">
      <div className="text-cyan-400">{icon}</div>

      <div>
        <p className="text-slate-500 text-sm">{label}</p>

        <p className="font-medium text-slate-200">{value}</p>
      </div>
    </div>
  );
}

function InvoiceRow({ label, value, bold }) {
  return (
    <div className="flex justify-between">
      <span className={bold ? "font-bold text-white" : "text-slate-400"}>
        {label}
      </span>

      <span className={bold ? "font-bold text-white" : "text-slate-300"}>
        {value}
      </span>
    </div>
  );
}
