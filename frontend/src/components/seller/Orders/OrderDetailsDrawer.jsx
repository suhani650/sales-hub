import {
  FaTimes,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTruck,
  FaMoneyBillWave,
  FaPrint,
  FaDownload,
  FaEdit,
  FaCheckCircle,
} from "react-icons/fa";

export default function OrderDetailsDrawer({ open, onClose, order }) {
  if (!open) return null;

  const rawData = order || {
    id: "ORD-1001",
    status: "PROCESSING",
    customer: {
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "+91 9876543210",
    },
    address: "221 MG Road, Jaipur, Rajasthan, India",
    payment: {
      method: "UPI",
      status: "PAID",
      amount: 25999,
    },
    shipping: {
      courier: "Delhivery",
      tracking: "TRK92817281",
    },
    notes: "Customer requested fast delivery.",
    items: [
      {
        id: 1,
        name: "iPhone 16 Pro",
        qty: 1,
        price: 129999,
        image: "https://via.placeholder.com/80",
      },
      {
        id: 2,
        name: "AirPods Pro",
        qty: 1,
        price: 25999,
        image: "https://via.placeholder.com/80",
      },
    ],
    subtotal: 155998,
    shippingTotal: 0,
    grandTotal: 158498,
  };

  const data = {
    id: rawData.orderNumber || rawData.id,
    status: rawData.status,
    customer: typeof rawData.customer === "string" ? {
      name: rawData.customer,
      email: rawData.customerEmail || "",
      phone: rawData.customerPhone || "",
    } : rawData.customer || { name: "Unknown Customer", email: "", phone: "" },
    address: rawData.address,
    payment: rawData.payment ? rawData.payment : {
      method: rawData.paymentMethod || "—",
      status: rawData.paymentStatus || "PENDING",
      amount: rawData.amount || rawData.grandTotal || 0,
    },
    shipping: rawData.shipping ? rawData.shipping : {
      courier: rawData.courier || "—",
      tracking: rawData.tracking || "—",
    },
    notes: rawData.notes || "No notes provided.",
    items: rawData.rawItems ? rawData.rawItems.map(item => ({
      id: item.id,
      name: item.product?.name || "Unknown Product",
      qty: item.quantity,
      price: Number(item.unitPrice),
      image: item.product?.images?.[0]?.url 
        ? (item.product.images[0].url.startsWith("http") ? item.product.images[0].url : `http://localhost:5000${item.product.images[0].url}`)
        : "https://via.placeholder.com/80",
    })) : (rawData.items || []),
    subtotal: rawData.subtotal || 0,
    shippingTotal: rawData.shippingTotal || 0,
    grandTotal: rawData.grandTotal || 0,
  };

  return (
    <>
      {/* Overlay */}

      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Drawer */}

      <div
        className="
        fixed
        right-0
        top-0
        h-full
        w-full
        lg:w-[700px]
        bg-white
        z-50
        overflow-y-auto
        shadow-2xl
        "
      >
        {/* Header */}

        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{data.id}</h2>

            <p className="text-gray-500">Order Details</p>
          </div>

          <button onClick={onClose} className="text-xl">
            <FaTimes />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Actions */}

          <div className="flex flex-wrap gap-3">
            <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
              <FaEdit />
              Update Status
            </button>

            <button className="border px-5 py-3 rounded-xl flex items-center gap-2">
              <FaPrint />
              Print
            </button>

            <button className="border px-5 py-3 rounded-xl flex items-center gap-2">
              <FaDownload />
              Invoice PDF
            </button>
          </div>

          {/* Customer */}

          <Section title="Customer Information">
            <InfoRow
              icon={<FaUser />}
              label="Customer"
              value={data.customer.name}
            />

            <InfoRow
              icon={<FaEnvelope />}
              label="Email"
              value={data.customer.email}
            />

            <InfoRow
              icon={<FaPhone />}
              label="Phone"
              value={data.customer.phone}
            />
          </Section>

          {/* Address */}

          <Section title="Delivery Address">
            <InfoRow
              icon={<FaMapMarkerAlt />}
              label="Address"
              value={data.address}
            />
          </Section>

          {/* Payment */}

          <Section title="Payment Details">
            <InfoRow
              icon={<FaMoneyBillWave />}
              label="Method"
              value={data.payment.method}
            />

            <InfoRow
              icon={<FaCheckCircle />}
              label="Status"
              value={data.payment.status}
            />

            <InfoRow
              icon={<FaMoneyBillWave />}
              label="Amount"
              value={`₹${data.payment.amount.toLocaleString()}`}
            />
          </Section>

          {/* Shipping */}

          <Section title="Shipping Information">
            <InfoRow
              icon={<FaTruck />}
              label="Courier"
              value={data.shipping.courier}
            />

            <InfoRow
              icon={<FaTruck />}
              label="Tracking"
              value={data.shipping.tracking}
            />
          </Section>

          {/* Products */}

          <Section title="Ordered Products">
            <div className="space-y-4">
              {data.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border rounded-xl p-4"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>

                    <p className="text-gray-500">Qty: {item.qty}</p>
                  </div>

                  <div className="font-bold">
                    ₹{item.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Timeline */}

          <Section title="Tracking Timeline">
            <div className="space-y-5">
              {["Order Placed", "Payment Confirmed", "Packed", "Shipped"].map(
                (step) => (
                  <div key={step} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <FaCheckCircle />
                    </div>

                    <div>
                      <h4 className="font-semibold">{step}</h4>

                      <p className="text-sm text-gray-500">Completed</p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </Section>

          {/* Invoice */}

          <Section title="Invoice Summary">
            <div className="space-y-3">
              <InvoiceRow label="Subtotal" value={`₹${(data.subtotal || 0).toLocaleString("en-IN")}`} />

              <InvoiceRow label="Shipping" value={`₹${(data.shippingTotal || 0).toLocaleString("en-IN")}`} />

              <InvoiceRow label="Tax (18% GST)" value={`₹${((data.subtotal || 0) * 0.18).toLocaleString("en-IN")}`} />

              <InvoiceRow label="Total" value={`₹${(data.grandTotal || 0).toLocaleString("en-IN")}`} bold />
            </div>
          </Section>

          {/* Notes */}

          <Section title="Order Notes">
            <p className="text-gray-600">{data.notes}</p>
          </Section>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white border rounded-2xl p-5">
      <h3 className="font-bold text-lg mb-5">{title}</h3>

      {children}
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex gap-4 py-3 border-b last:border-none">
      <div className="text-blue-600">{icon}</div>

      <div>
        <p className="text-gray-500 text-sm">{label}</p>

        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function InvoiceRow({ label, value, bold }) {
  return (
    <div className="flex justify-between">
      <span className={bold ? "font-bold" : ""}>{label}</span>

      <span className={bold ? "font-bold" : ""}>{value}</span>
    </div>
  );
}
