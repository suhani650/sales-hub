import { useMemo, useState } from "react";

import OrderFilters from "../../../components/seller/Orders/OrderFilters";
import OrdersTable from "../../../components/seller/Orders/OrdersTable";
import OrderDetailsDrawer from "../../../components/seller/Orders/OrderDetailsDrawer";
import OrderStatusModal from "../../../components/seller/Orders/OrderStatusModal";
import OrderAnalytics from "../../../components/seller/Orders/OrderAnalytics";

import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../services/vendorApi";

// The API returns one row per order-item (scoped to this vendor). Multiple
// items can belong to the same order, so we group them into order-level
// rows for the table/UI.
function groupOrderItems(orderItems = []) {
  const map = new Map();

  for (const item of orderItems) {
    const order = item.order;
    if (!order) continue;

    const existing = map.get(order.id);
    const lineTotal = Number(item.lineTotal || 0);
    const latestPayment = order.payments?.[order.payments.length - 1];

    if (existing) {
      existing.amount += lineTotal;
      existing.items += item.quantity || 1;
      existing.rawItems.push(item);
    } else {
      map.set(order.id, {
        id: order.id,
        orderNumber: order.orderNumber || `ORD-${order.id}`,
        customer: order.customer?.user?.name || "Unknown Customer",
        customerEmail: order.customer?.user?.email || "",
        customerPhone: order.customer?.user?.phone || "",
        amount: lineTotal,
        items: item.quantity || 1,
        status: order.status,
        paymentStatus: latestPayment?.status || "PENDING",
        paymentMethod: latestPayment?.provider || "—",
        deliveryStatus: order.trackingNumber
          ? order.status === "DELIVERED"
            ? "DELIVERED"
            : "OUT_FOR_DELIVERY"
          : order.status === "DELIVERED"
            ? "DELIVERED"
            : "READY",
        tracking: order.trackingNumber || "—",
        courier: order.courierName || "—",
        address: order.shippingAddress,
        subtotal: Number(order.subtotal || 0),
        shippingTotal: Number(order.shippingTotal || 0),
        discountTotal: Number(order.discountTotal || 0),
        grandTotal: Number(order.grandTotal || 0),
        date: order.createdAt,
        rawItems: [item],
      });
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
}

export default function OrderManagement() {
  const [filters, setFilters] = useState({
    orderId: "",
    customer: "",
    status: "",
    paymentStatus: "",
    deliveryStatus: "",
    date: "",
  });

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("orders");

  const {
    data: rawOrderItems,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetOrdersQuery();

  const [updateOrderStatus, { isLoading: isUpdatingStatus }] =
    useUpdateOrderStatusMutation();

  const groupedOrders = useMemo(
    () => groupOrderItems(rawOrderItems),
    [rawOrderItems],
  );

  const filteredOrders = useMemo(() => {
    return groupedOrders.filter((order) => {
      if (
        filters.orderId &&
        !order.orderNumber
          .toLowerCase()
          .includes(filters.orderId.trim().toLowerCase()) &&
        !String(order.id).includes(filters.orderId.trim())
      )
        return false;

      if (
        filters.customer &&
        !order.customer
          .toLowerCase()
          .includes(filters.customer.trim().toLowerCase())
      )
        return false;

      if (filters.status && order.status !== filters.status) return false;

      if (
        filters.paymentStatus &&
        order.paymentStatus !== filters.paymentStatus
      )
        return false;

      if (
        filters.deliveryStatus &&
        order.deliveryStatus !== filters.deliveryStatus
      )
        return false;

      if (filters.date) {
        const orderDate = new Date(order.date).toISOString().slice(0, 10);
        if (orderDate !== filters.date) return false;
      }

      return true;
    });
  }, [groupedOrders, filters]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const handleUpdateStatus = async ({ id, status }) => {
    try {
      await updateOrderStatus({ id, status }).unwrap();
      setStatusModalOpen(false);
    } catch (error) {
      console.error("Status Update Failed", error);
    }
  };

  const handleExportOrders = () => {
    if (!filteredOrders.length) return;

    const header = [
      "Order",
      "Customer",
      "Amount",
      "Items",
      "Status",
      "Payment",
      "Delivery",
      "Tracking",
      "Date",
    ];

    const rows = filteredOrders.map((o) => [
      o.orderNumber,
      o.customer,
      o.amount,
      o.items,
      o.status,
      o.paymentStatus,
      o.deliveryStatus,
      o.tracking,
      new Date(o.date).toLocaleDateString("en-IN"),
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `orders-export-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleResetFilters = () => {
    setFilters({
      orderId: "",
      customer: "",
      status: "",
      paymentStatus: "",
      deliveryStatus: "",
      date: "",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="relative overflow-hidden rounded-[30px] border border-cyan-500/20 bg-gradient-to-r from-[#071028] via-[#111936] to-[#1E1B4B] p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#06b6d430,transparent_40%)]" />

        <div className="relative z-10 flex flex-wrap justify-between items-center gap-6">
          <div>
            <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm border border-cyan-500/30">
              Seller Orders
            </span>

            <h1 className="text-4xl font-bold text-white mt-5">
              Order Management
            </h1>

            <p className="text-slate-400 mt-3">
              Manage customer orders, payments, deliveries and order analytics.
            </p>
          </div>

          <div className="bg-[#0F172A] border border-cyan-500/20 rounded-3xl px-8 py-6 text-center">
            <p className="text-slate-400 text-sm">Total Orders</p>

            <h2 className="text-5xl font-bold text-cyan-400 mt-2">
              {isLoading ? "—" : groupedOrders.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Tabs */}

      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-2 flex gap-3">
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex-1 py-4 rounded-2xl font-semibold duration-300 ${
            activeTab === "orders"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
              : "bg-[#1E293B] text-slate-400 hover:bg-[#243146]"
          }`}
        >
          Orders
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex-1 py-4 rounded-2xl font-semibold duration-300 ${
            activeTab === "analytics"
              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
              : "bg-[#1E293B] text-slate-400 hover:bg-[#243146]"
          }`}
        >
          Analytics
        </button>
      </div>

      {/* Content */}

      {activeTab === "orders" && (
        <div className="space-y-6">
          <div className="rounded-[30px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
            <OrderFilters
              filters={filters}
              setFilters={setFilters}
              onExport={handleExportOrders}
              onReset={handleResetFilters}
            />
          </div>

          {isError ? (
            <div className="rounded-[30px] border border-red-500/20 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-10 text-center">
              <p className="text-red-400 font-semibold">
                Couldn't load orders from the server.
              </p>
              <button
                onClick={refetch}
                className="mt-4 px-6 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="rounded-[30px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
              <OrdersTable
                orders={filteredOrders}
                loading={isLoading || isFetching}
                onView={handleViewOrder}
                onStatus={(order) => {
                  setSelectedOrder(order);
                  setStatusModalOpen(true);
                }}
              />
            </div>
          )}
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="rounded-[30px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
          <OrderAnalytics />
        </div>
      )}

      <OrderDetailsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        order={selectedOrder}
        onUpdateStatus={() => {
          setDrawerOpen(false);
          setStatusModalOpen(true);
        }}
      />

      <OrderStatusModal
        open={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        order={selectedOrder}
        onSave={handleUpdateStatus}
        saving={isUpdatingStatus}
      />
    </div>
  );
}
