import {
  FaTimes,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaHeart,
  FaGift,
  FaChartLine,
  FaClock,
  FaCrown,
} from "react-icons/fa";

import { useGetCustomerProfileQuery } from "../../../services/vendorApi";

const loyaltyTier = (points) => {
  const p = Number(points || 0);
  if (p >= 1000) return "VIP";
  if (p >= 500) return "GOLD";
  if (p >= 100) return "SILVER";
  return "BRONZE";
};

const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

export default function CustomerProfileDrawer({ open, onClose, customerId }) {
  const {
    data: customer,
    isLoading,
    isError,
  } = useGetCustomerProfileQuery(customerId, {
    skip: !open || !customerId,
  });

  if (!open) return null;

  const orders = customer?.orders ?? [];
  const lifetimeValue = orders.reduce(
    (sum, o) => sum + Number(o.grandTotal || 0),
    0,
  );

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
            <h2 className="text-2xl font-bold">Customer Profile</h2>

            <p className="text-gray-500">
              {customer ? `CUS-${customer.id}` : ""}
            </p>
          </div>

          <button onClick={onClose} className="text-xl">
            <FaTimes />
          </button>
        </div>

        {isLoading ? (
          <div className="p-16 text-center text-gray-500">Loading profile…</div>
        ) : isError ? (
          <div className="p-16 text-center text-red-500">
            Couldn't load this customer's profile.
          </div>
        ) : !customer ? (
          <div className="p-16 text-center text-gray-500">
            No customer selected.
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Profile */}

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                  <FaUser />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    {customer.user?.name || "Unknown Customer"}
                  </h2>

                  <div className="flex items-center gap-2 mt-2">
                    <FaCrown />

                    <span>{loyaltyTier(customer.loyaltyPoints)} Member</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}

            <Section title="Contact Information">
              <InfoRow
                icon={<FaEnvelope />}
                label="Email"
                value={customer.user?.email || "—"}
              />

              <InfoRow
                icon={<FaPhone />}
                label="Phone"
                value={customer.user?.phone || "Not provided"}
              />

              <InfoRow
                icon={<FaMapMarkerAlt />}
                label="Last shipping address"
                value={orders[0]?.shippingAddress || "No orders yet"}
              />
            </Section>

            {/* Stats */}

            <div className="grid grid-cols-2 gap-4">
              <StatCard
                icon={<FaShoppingBag />}
                label="Orders"
                value={orders.length}
              />

              <StatCard
                icon={<FaChartLine />}
                label="Lifetime Value"
                value={formatCurrency(lifetimeValue)}
              />

              <StatCard
                icon={<FaHeart />}
                label="Wishlist"
                value={customer.wishlist?.length ?? 0}
              />

              <StatCard
                icon={<FaGift />}
                label="Reward Points"
                value={customer.loyaltyPoints ?? 0}
              />
            </div>

            {/* Recent Orders */}

            <Section title="Recent Orders">
              {orders.length === 0 ? (
                <p className="text-gray-500">No orders yet.</p>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 5).map((order) => (
                    <div
                      key={order.id}
                      className="flex justify-between border rounded-xl p-4"
                    >
                      <div>
                        <p className="font-semibold">{order.orderNumber}</p>

                        <p className="text-sm text-gray-500">
                          {order.status} · {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <div className="font-bold">
                        {formatCurrency(order.grandTotal)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Section>

            {/* Timeline */}

            <Section title="Activity Timeline">
              <div className="space-y-4">
                <TimelineRow
                  label="Joined"
                  date={formatDate(customer.createdAt)}
                />

                {orders.length > 0 && (
                  <TimelineRow
                    label="First order"
                    date={formatDate(orders[orders.length - 1]?.createdAt)}
                  />
                )}

                {orders.length > 0 && (
                  <TimelineRow
                    label="Most recent order"
                    date={formatDate(orders[0]?.createdAt)}
                  />
                )}
              </div>
            </Section>

            {/* Actions */}

            <div className="flex flex-wrap gap-3">
              <a
                href={
                  customer.user?.email
                    ? `mailto:${customer.user.email}`
                    : undefined
                }
                className={`px-5 py-3 rounded-xl text-center ${
                  customer.user?.email
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-400 pointer-events-none"
                }`}
              >
                Send Email
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div className="border rounded-2xl p-5">
      <h3 className="font-bold text-lg mb-4">{title}</h3>

      {children}
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex gap-4 py-3 border-b last:border-none">
      <div className="text-blue-600">{icon}</div>

      <div>
        <p className="text-sm text-gray-500">{label}</p>

        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="border rounded-2xl p-4">
      <div className="text-blue-600 text-xl">{icon}</div>

      <p className="text-gray-500 mt-2">{label}</p>

      <h3 className="font-bold text-xl mt-1">{value}</h3>
    </div>
  );
}

function TimelineRow({ label, date }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
        <FaClock />
      </div>

      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
  );
}
