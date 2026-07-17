import { prisma } from "../config/prisma.js";

/** GET /api/admin/dashboard — headline KPIs + revenue trend for the Super Admin console. */
export async function getDashboard(req, res) {
  const [vendorCount, activeVendorCount, productCount, customerCount, pendingVendorCount] =
    await Promise.all([
      prisma.vendor.count(),
      prisma.vendor.count({ where: { status: "APPROVED" } }),
      prisma.product.count({ where: { deletedAt: null } }),
      prisma.customer.count(),
      prisma.vendor.count({ where: { status: "PENDING" } }),
    ]);

  const orders = await prisma.order.findMany({
    where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
    select: { grandTotal: true, status: true, createdAt: true },
  });

  const revenue30d = orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, o) => sum + Number(o.grandTotal), 0);

  // Bucket revenue by day for the trend chart.
  const byDay = {};
  for (const o of orders) {
    if (o.status === "CANCELLED") continue;
    const day = o.createdAt.toISOString().slice(0, 10);
    byDay[day] = (byDay[day] || 0) + Number(o.grandTotal);
  }
  const revenueTrend = Object.entries(byDay)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, total]) => ({ date, total }));

  const recentOrders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
    include: { customer: { include: { user: true } } },
  });

  res.json({
    kpis: {
      vendors: vendorCount,
      activeVendors: activeVendorCount,
      pendingVendors: pendingVendorCount,
      products: productCount,
      customers: customerCount,
      revenue30d,
      orders30d: orders.length,
    },
    revenueTrend,
    recentOrders: recentOrders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customer.user.name,
      status: o.status,
      grandTotal: o.grandTotal,
      createdAt: o.createdAt,
    })),
  });
}

/** GET /api/admin/vendors */
export async function listVendors(req, res) {
  const { status } = req.query;
  const vendors = await prisma.vendor.findMany({
    where: status ? { status } : undefined,
    include: { user: true, _count: { select: { products: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(vendors);
}

/** PATCH /api/admin/vendors/:id/status  { status: "APPROVED" | "SUSPENDED" | "REJECTED" } */
export async function updateVendorStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  const allowed = ["PENDING", "APPROVED", "SUSPENDED", "REJECTED"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: "Invalid status value." });
  }

  const vendor = await prisma.vendor.update({ where: { id: Number(id) }, data: { status } });

  await prisma.activityLog.create({
    data: {
      userId: req.user.id,
      action: "VENDOR_STATUS_UPDATE",
      entity: "vendor",
      entityId: vendor.id,
      meta: JSON.stringify({ status }),
      ipAddress: req.ip,
    },
  });

  res.json(vendor);
}

/** GET /api/admin/orders */
export async function listOrders(req, res) {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { customer: { include: { user: true } }, items: true },
  });
  res.json(orders);
}

/** GET /api/admin/products */
export async function listProducts(req, res) {
  const products = await prisma.product.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { vendor: true, category: true, images: { where: { isPrimary: true }, take: 1 } },
  });
  res.json(products);
}

/** GET /api/admin/activity-logs */
export async function listActivityLogs(req, res) {
  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { user: true },
  });
  res.json(logs);
}
