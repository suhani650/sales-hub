// src/pages/seller/SellerDashboard.jsx

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  FaArrowUp,
  FaArrowRight,
  FaBoxOpen,
  FaBoxes,
  FaBullhorn,
  FaChartLine,
  FaChartPie,
  FaTruck,
  FaExclamationTriangle,
  FaMoneyBillWave,
  FaShoppingBag,
  FaShoppingCart,
  FaStore,
  FaUsers,
  FaWallet,
} from "react-icons/fa";

import {
  useGetVendorDashboardQuery,
  useGetMonthlyRevenueQuery,
  useGetOrdersQuery,
  useGetTopProductsQuery,
  useGetProductsQuery,
  useGetInventoryAnalyticsQuery,
  useGetLowStockItemsQuery,
  useGetActivitiesQuery,
} from "../../services/vendorApi";

/* ===========================================================
   Everything below is pulled from the real backend. A few
   widgets from the original mockup (AI insights, achievements,
   "monthly target", visitor/conversion stats) had no supporting
   table anywhere in the schema, so rather than invent numbers
   for them, they've been removed. Ask if you'd like those built
   as real features (they'd each need their own data source).
=========================================================== */

const PIE_COLORS = [
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#F59E0B",
  "#10B981",
  "#F43F5E",
];

const quickLinks = [
  {
    title: "Products",
    path: "/seller/products",
    icon: FaBoxes,
    color: "from-indigo-500 to-blue-600",
  },
  {
    title: "Orders",
    path: "/seller/orders",
    icon: FaShoppingBag,
    color: "from-pink-500 to-red-500",
  },
  {
    title: "Customers",
    path: "/seller/customers",
    icon: FaUsers,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Marketing",
    path: "/seller/marketing",
    icon: FaBullhorn,
    color: "from-orange-500 to-yellow-500",
  },
  {
    title: "Finance",
    path: "/seller/finance",
    icon: FaWallet,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Store",
    path: "/seller/store",
    icon: FaStore,
    color: "from-purple-500 to-pink-600",
  },
];

const STATUS_STYLE = {
  DELIVERED: "bg-emerald-500/20 text-emerald-400",
  CANCELLED: "bg-red-500/20 text-red-400",
  RETURNED: "bg-red-500/20 text-red-400",
  PENDING: "bg-yellow-500/20 text-yellow-400",
  CONFIRMED: "bg-blue-500/20 text-blue-400",
  PACKED: "bg-blue-500/20 text-blue-400",
  SHIPPED: "bg-cyan-500/20 text-cyan-400",
  OUT_FOR_DELIVERY: "bg-cyan-500/20 text-cyan-400",
};

function formatINR(value) {
  const n = Number(value) || 0;
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function timeAgo(dateString) {
  if (!dateString) return "";
  const diffMs = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

function SkeletonBlock({ className }) {
  return (
    <div className={`animate-pulse rounded-2xl bg-white/10 ${className}`} />
  );
}

export default function SellerDashboard() {
  const currentUser = useSelector((state) => state.auth.user);

  const { data: dashboard, isLoading: dashLoading } =
    useGetVendorDashboardQuery(undefined, {
      pollingInterval: 30000,
    });

  const { data: monthlySales, isLoading: salesLoading } =
    useGetMonthlyRevenueQuery();

  const { data: ordersResponse, isLoading: ordersLoading } = useGetOrdersQuery(
    undefined,
    {
      pollingInterval: 30000,
    },
  );

  const { data: topProductsData, isLoading: topProductsLoading } =
    useGetTopProductsQuery();

  const { data: productsResponse } = useGetProductsQuery({ limit: 100 });

  const { data: inventoryAnalytics, isLoading: inventoryLoading } =
    useGetInventoryAnalyticsQuery();

  const { data: lowStockResponse, isLoading: lowStockLoading } =
    useGetLowStockItemsQuery();

  const { data: activitiesResponse, isLoading: activitiesLoading } =
    useGetActivitiesQuery();

  const orders = ordersResponse?.data || [];
  const products = productsResponse?.data || [];
  const lowStockItems = lowStockResponse || [];
  const activities = activitiesResponse?.data || [];

  // ---------- KPI cards (real, from /seller/dashboard) ----------
  const stats = useMemo(
    () => [
      {
        title: "Total Revenue",
        value: dashboard ? formatINR(dashboard.totalRevenue) : "…",
        icon: FaMoneyBillWave,
        color: "from-pink-500 to-red-500",
      },
      {
        title: "Orders",
        value: dashboard ? dashboard.totalOrders.toLocaleString("en-IN") : "…",
        icon: FaShoppingCart,
        color: "from-indigo-500 to-blue-500",
      },
      {
        title: "Customers",
        value: dashboard
          ? dashboard.totalCustomers.toLocaleString("en-IN")
          : "…",
        icon: FaUsers,
        color: "from-cyan-500 to-sky-500",
      },
      {
        title: "Products",
        value: dashboard
          ? dashboard.totalProducts.toLocaleString("en-IN")
          : "…",
        icon: FaBoxOpen,
        color: "from-orange-500 to-yellow-500",
      },
    ],
    [dashboard],
  );

  // ---------- Real month-over-month revenue growth, from the fixed monthly-revenue endpoint ----------
  const revenueGrowth = useMemo(() => {
    if (!monthlySales || monthlySales.length < 2) return null;
    const last = monthlySales[monthlySales.length - 1].sales;
    const prev = monthlySales[monthlySales.length - 2].sales;
    if (!prev) return null;
    return (((last - prev) / prev) * 100).toFixed(1);
  }, [monthlySales]);

  // ---------- Last 7 days revenue, derived from real order items ----------
  const last7DaysRevenue = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push({
        key: d.toDateString(),
        day: d.toLocaleDateString("en-US", { weekday: "short" }),
        value: 0,
      });
    }
    const dayMap = new Map(days.map((d) => [d.key, d]));

    orders.forEach((item) => {
      const key = new Date(item.createdAt).toDateString();
      if (dayMap.has(key)) {
        dayMap.get(key).value += Number(item.lineTotal || 0);
      }
    });

    return days;
  }, [orders]);

  const totalLast7Days = last7DaysRevenue.reduce((sum, d) => sum + d.value, 0);
  const priorPeriodEstimate = orders.length
    ? orders.reduce((sum, i) => sum + Number(i.lineTotal || 0), 0) /
      Math.max(orders.length, 1)
    : 0;

  // ---------- Category distribution + inventory-per-category, derived from the products list ----------
  const categoryBreakdown = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      const name = p.category?.name || "Uncategorized";
      const stock = p.inventory?.quantity || 0;
      if (!map.has(name)) map.set(name, { name, count: 0, stock: 0 });
      map.get(name).count += 1;
      map.get(name).stock += stock;
    });
    return Array.from(map.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [products]);

  const totalCategoryCount =
    categoryBreakdown.reduce((sum, c) => sum + c.count, 0) || 1;
  const totalCategoryStock =
    categoryBreakdown.reduce((sum, c) => sum + c.stock, 0) || 1;

  const recentOrders = orders.slice(0, 6);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-pink-600/30 blur-[180px]" />
        <div className="absolute right-0 top-20 h-[480px] w-[480px] rounded-full bg-indigo-600/30 blur-[180px]" />
        <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-cyan-600/20 blur-[180px]" />
      </div>

      <div className="relative z-10 space-y-6 p-4 lg:p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10"
        >
          <div className="flex flex-col lg:flex-row justify-between gap-10">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full bg-pink-500/20 px-5 py-2 text-pink-300">
                <FaStore />
                Enterprise Seller Dashboard
              </div>

              <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-black">
                Welcome Back
                {currentUser?.name ? `, ${currentUser.name.split(" ")[0]}` : ""}{" "}
                👋
              </h1>

              <p className="mt-5 max-w-2xl text-lg text-white/70">
                Manage products, orders, finance, marketing, inventory and
                analytics from one dashboard.
              </p>

              <div className="mt-10 flex gap-5">
                <Link to="/seller/finance">
                  <button className="rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 px-8 py-4 font-bold">
                    View Analytics
                  </button>
                </Link>
                <Link to="/seller/products/add">
                  <button className="rounded-2xl border border-white/20 bg-white/5 px-8 py-4">
                    Add Product
                  </button>
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-[1px]">
              <div className="w-full lg:w-[360px] rounded-3xl bg-[#0B1225] p-8">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Total Revenue</span>
                  <FaChartLine size={28} className="text-pink-400" />
                </div>

                {dashLoading ? (
                  <SkeletonBlock className="mt-6 h-10 w-40" />
                ) : (
                  <h2 className="mt-6 text-3xl lg:text-4xl font-black">
                    {formatINR(dashboard?.totalRevenue)}
                  </h2>
                )}

                <div className="mt-5 flex items-center gap-2 text-green-400">
                  {revenueGrowth !== null ? (
                    <>
                      <FaArrowUp
                        className={revenueGrowth < 0 ? "rotate-180" : ""}
                      />
                      {revenueGrowth}% vs last month
                    </>
                  ) : (
                    <span className="text-white/40">
                      Not enough monthly data yet
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ====================================================== */}
        {/* KPI Cards */}
        {/* ====================================================== */}

        <div className="grid gap-7 xl:grid-cols-4 md:grid-cols-2">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                whileHover={{ y: -8, scale: 1.03 }}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color}`}
                >
                  <Icon size={28} />
                </div>

                <p className="mt-8 text-white/60">{item.title}</p>
                <h2 className="mt-2 text-4xl font-black">
                  {dashLoading ? "…" : item.value}
                </h2>
              </motion.div>
            );
          })}
        </div>

        {/* ====================================================== */}
        {/* Quick Links + Revenue */}
        {/* ====================================================== */}

        <div className="grid gap-8 xl:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-7"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Quick Actions</h2>
              <FaArrowRight className="text-pink-400" />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-5">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.title} to={item.path}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -6 }}
                      className={`rounded-3xl bg-gradient-to-br ${item.color} p-[1px]`}
                    >
                      <div className="rounded-3xl bg-[#0B1225] p-6">
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color}`}
                        >
                          <Icon size={24} className="text-white" />
                        </div>
                        <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                        <p className="mt-2 text-sm text-white/60">
                          Manage {item.title}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="xl:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Revenue Overview</h2>
                <p className="mt-2 text-white/60">
                  Last 7 Days (from real orders)
                </p>
              </div>

              <div className="rounded-full bg-white/10 px-5 py-2 text-white/80 text-sm">
                {formatINR(totalLast7Days)} total
              </div>
            </div>

            <div className="mt-8 h-[340px]">
              {ordersLoading ? (
                <SkeletonBlock className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={last7DaysRevenue}>
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8B5CF6"
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8B5CF6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip formatter={(v) => formatINR(v)} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8B5CF6"
                      strokeWidth={4}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>
        </div>

        {/* ====================================================== */}
        {/* Sales & Categories */}
        {/* ====================================================== */}

        <div className="grid gap-8 xl:grid-cols-3">
          <motion.div
            whileHover={{ y: -6 }}
            className="xl:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Monthly Sales</h2>
                <p className="mt-2 text-white/60">Last 12 Months</p>
              </div>
              <FaChartLine size={28} className="text-pink-400" />
            </div>

            <div className="mt-8 h-[340px]">
              {salesLoading ? (
                <SkeletonBlock className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlySales || []}>
                    <XAxis dataKey="name" stroke="#CBD5E1" />
                    <YAxis stroke="#CBD5E1" />
                    <Tooltip formatter={(v) => formatINR(v)} />
                    <Bar
                      dataKey="sales"
                      fill="#8B5CF6"
                      radius={[12, 12, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Categories</h2>
              <FaChartPie className="text-cyan-400" />
            </div>

            <div className="mt-8 h-[260px]">
              {categoryBreakdown.length === 0 ? (
                <p className="flex h-full items-center justify-center text-white/40 text-sm">
                  No products yet
                </p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryBreakdown}
                      innerRadius={70}
                      outerRadius={95}
                      dataKey="count"
                    >
                      {categoryBreakdown.map((item, index) => (
                        <Cell
                          key={index}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="mt-8 space-y-4">
              {categoryBreakdown.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-4 w-4 rounded-full"
                      style={{
                        background: PIE_COLORS[index % PIE_COLORS.length],
                      }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <strong>
                    {Math.round((item.count / totalCategoryCount) * 100)}%
                  </strong>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ====================================================== */}
        {/* Top Products + Inventory */}
        {/* ====================================================== */}

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold">Top Selling Products</h2>
                <p className="mt-1 text-sm text-white/60">By units sold</p>
              </div>
              <Link to="/seller/products">
                <button className="rounded-xl bg-white/10 px-4 py-2 hover:bg-white/20">
                  View All
                </button>
              </Link>
            </div>

            <div className="divide-y divide-white/10">
              {topProductsLoading && (
                <div className="p-6 space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <SkeletonBlock key={i} className="h-16 w-full" />
                  ))}
                </div>
              )}

              {!topProductsLoading &&
                (!topProductsData || topProductsData.length === 0) && (
                  <p className="p-6 text-center text-white/40">
                    No sales data yet.
                  </p>
                )}

              {!topProductsLoading &&
                topProductsData?.map((item) => (
                  <motion.div
                    key={item.productId}
                    whileHover={{ backgroundColor: "rgba(255,255,255,.04)" }}
                    className="flex items-center justify-between p-6"
                  >
                    <div className="flex items-center gap-5">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-2xl object-cover"
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center">
                          <FaBoxOpen className="text-white/40" />
                        </div>
                      )}

                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="mt-1 text-sm text-white/50">
                          {item.category || "—"}
                        </p>
                        <div className="mt-3 flex items-center gap-5 text-xs">
                          <span className="text-emerald-400">
                            {item.unitsSold} Units
                          </span>
                          {item.ratingAvg > 0 && (
                            <span className="text-yellow-400">
                              ⭐ {item.ratingAvg}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <h3 className="text-2xl font-bold">
                        {formatINR(item.revenue)}
                      </h3>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="border-b border-white/10 px-6 py-5">
              <h2 className="text-xl font-bold">Inventory Status</h2>
            </div>

            <div className="space-y-6 p-6">
              {inventoryLoading ? (
                <SkeletonBlock className="h-32 w-full" />
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-2xl font-black">
                        {inventoryAnalytics?.totalItems ?? 0}
                      </p>
                      <p className="mt-1 text-xs text-white/60">Total SKUs</p>
                    </div>
                    <div className="rounded-2xl bg-yellow-500/10 p-4">
                      <p className="text-2xl font-black text-yellow-400">
                        {inventoryAnalytics?.lowStock ?? 0}
                      </p>
                      <p className="mt-1 text-xs text-white/60">Low Stock</p>
                    </div>
                    <div className="rounded-2xl bg-red-500/10 p-4">
                      <p className="text-2xl font-black text-red-400">
                        {inventoryAnalytics?.outOfStock ?? 0}
                      </p>
                      <p className="mt-1 text-xs text-white/60">Out of Stock</p>
                    </div>
                  </div>

                  {categoryBreakdown.map((item, index) => {
                    const pct = Math.round(
                      (item.stock / totalCategoryStock) * 100,
                    );
                    return (
                      <div key={item.name}>
                        <div className="mb-2 flex justify-between text-sm">
                          <span className="text-white/70">{item.name}</span>
                          <span className="font-semibold">
                            {item.stock} units
                          </span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pct}%`,
                              background: PIE_COLORS[index % PIE_COLORS.length],
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* Recent Orders */}
        {/* ====================================================== */}

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div>
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <p className="mt-1 text-sm text-white/60">
                Latest Customer Orders
              </p>
            </div>
            <Link to="/seller/orders">
              <button className="rounded-xl bg-indigo-600 px-5 py-2 hover:bg-indigo-500">
                View Orders
              </button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-left text-white/60">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {ordersLoading && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-white/40"
                    >
                      Loading orders…
                    </td>
                  </tr>
                )}

                {!ordersLoading && recentOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-white/40"
                    >
                      No orders yet.
                    </td>
                  </tr>
                )}

                {!ordersLoading &&
                  recentOrders.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="px-6 py-5">
                        #{item.order?.orderNumber ?? item.orderId}
                      </td>
                      <td className="px-6 py-5">
                        {item.order?.customer?.user?.name ?? "—"}
                      </td>
                      <td className="px-6 py-5">{item.product?.name ?? "—"}</td>
                      <td className="px-6 py-5 font-semibold text-emerald-400">
                        {formatINR(item.lineTotal)}
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            STATUS_STYLE[item.order?.status] ||
                            "bg-slate-500/20 text-slate-400"
                          }`}
                        >
                          {item.order?.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ====================================================== */}
        {/* Activity | Low Stock Alerts */}
        {/* ====================================================== */}

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="border-b border-white/10 px-6 py-5">
              <h2 className="text-xl font-bold">Recent Activity</h2>
            </div>

            <div className="space-y-5 p-6">
              {activitiesLoading && <SkeletonBlock className="h-24 w-full" />}

              {!activitiesLoading && activities.length === 0 && (
                <p className="text-white/40 text-sm">No recent activity.</p>
              )}

              {!activitiesLoading &&
                activities.slice(0, 6).map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="mt-2 h-3 w-3 rounded-full bg-indigo-500 shrink-0" />
                    <div>
                      <p>{item.description}</p>
                      <span className="text-xs text-white/50">
                        {timeAgo(item.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="border-b border-white/10 px-6 py-5">
              <h2 className="text-xl font-bold">Low Stock Alerts</h2>
            </div>

            <div className="space-y-4 p-6">
              {lowStockLoading && <SkeletonBlock className="h-24 w-full" />}

              {!lowStockLoading && lowStockItems.length === 0 && (
                <p className="text-white/40 text-sm">
                  Everything is well stocked 🎉
                </p>
              )}

              {!lowStockLoading &&
                lowStockItems.slice(0, 6).map((item) => (
                  <div key={item.id} className="rounded-2xl bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                      <FaExclamationTriangle className="text-yellow-400 shrink-0" />
                      <p className="text-white">
                        {item.product?.name ?? "Product"} — only {item.quantity}{" "}
                        left
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* Quick Action Tiles */}
        {/* ====================================================== */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="mb-6 text-2xl font-bold">Quick Actions</h2>

          <div className="grid gap-5 lg:grid-cols-6 md:grid-cols-3 grid-cols-2">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} to={item.path}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.05 }}
                    className="flex flex-col items-center gap-4 rounded-2xl bg-white/5 p-6 transition hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600"
                  >
                    <Icon size={34} className="text-indigo-300" />
                    <span>{item.title}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
