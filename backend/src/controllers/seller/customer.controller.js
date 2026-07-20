import prisma from "../../config/prisma.js";

// Get All Customers (scoped to this vendor's buyers, with real order stats)

export const getCustomers = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }

    const orderItems = await prisma.orderItem.findMany({
      where: { vendorId: vendor.id },
      include: {
        order: {
          include: {
            customer: { include: { user: true } },
          },
        },
      },
    });

    const map = new Map();

    for (const item of orderItems) {
      const order = item.order;
      if (!order?.customer) continue;

      const cId = order.customer.id;
      const lineTotal = Number(item.lineTotal || 0);

      const existing = map.get(cId);

      if (existing) {
        existing.totalSpent += lineTotal;
        existing.orderIds.add(order.id);
        if (new Date(order.createdAt) > new Date(existing.lastOrderAt)) {
          existing.lastOrderAt = order.createdAt;
        }
      } else {
        map.set(cId, {
          id: cId,
          name: order.customer.user?.name || "Unknown Customer",
          email: order.customer.user?.email || "",
          loyaltyPoints: order.customer.loyaltyPoints || 0,
          totalSpent: lineTotal,
          orderIds: new Set([order.id]),
          lastOrderAt: order.createdAt,
        });
      }
    }

    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const customers = Array.from(map.values())
      .map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        loyaltyPoints: c.loyaltyPoints,
        orders: c.orderIds.size,
        totalSpent: c.totalSpent,
        lastOrderAt: c.lastOrderAt,
        status:
          c.loyaltyPoints >= 500
            ? "VIP"
            : new Date(c.lastOrderAt) >= ninetyDaysAgo
              ? "Active"
              : "Inactive",
      }))
      .sort((a, b) => b.totalSpent - a.totalSpent);

    res.json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Customers fetch failed",
    });
  }
};

// Customer Profile

export const getCustomerProfile = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }

    const customerId = Number(req.params.id);

    const hasBoughtFromVendor = await prisma.orderItem.findFirst({
      where: {
        vendorId: vendor.id,
        order: { customerId },
      },
      select: { id: true },
    });

    if (!hasBoughtFromVendor) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
      include: {
        user: true,
        orders: {
          orderBy: { createdAt: "desc" },
        },
        wishlist: true,
        reviews: true,
      },
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Customer fetch failed",
    });
  }
};

// Purchase History

export const getPurchaseHistory = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        customerId: Number(req.params.id),
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "History fetch failed",
    });
  }
};

// Top Customers

export const getTopCustomers = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }

    const customers = await prisma.orderItem.groupBy({
      by: ["customerId"],
      where: {
        vendorId: vendor.id,
      },
      _sum: {
        lineTotal: true,
      },
      orderBy: {
        _sum: {
          lineTotal: "desc",
        },
      },
      take: 10,
    });

    res.json({
      success: true,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Top customers fetch failed",
    });
  }
};

// Customer Segments (bucketed by real loyaltyPoints, scoped to this
// vendor's own buyers — not the whole platform)

export const getSegments = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }

    const vendorCustomers = await prisma.orderItem.findMany({
      where: { vendorId: vendor.id },
      distinct: ["customerId"],
      select: {
        order: {
          select: {
            customer: { select: { loyaltyPoints: true } },
          },
        },
      },
    });

    const points = vendorCustomers
      .map((row) => row.order?.customer?.loyaltyPoints ?? 0)
      .filter((p) => p !== null && p !== undefined);

    const segments = { vip: 0, gold: 0, silver: 0, bronze: 0 };

    for (const p of points) {
      if (p >= 1000) segments.vip += 1;
      else if (p >= 500) segments.gold += 1;
      else if (p >= 100) segments.silver += 1;
      else segments.bronze += 1;
    }

    res.json({
      success: true,
      data: segments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Segments fetch failed",
    });
  }
};

// CRM Analytics (all figures scoped to this vendor's own customers/orders)

export const customerAnalytics = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }

    const orderItems = await prisma.orderItem.findMany({
      where: { vendorId: vendor.id },
      select: {
        lineTotal: true,
        orderId: true,
        order: {
          select: {
            customerId: true,
            createdAt: true,
          },
        },
      },
    });

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const customerOrderIds = new Map(); // customerId -> Set(orderId)
    const customerFirstOrder = new Map(); // customerId -> earliest date
    const orderIds = new Set();
    let totalRevenue = 0;

    for (const item of orderItems) {
      totalRevenue += Number(item.lineTotal || 0);

      const cId = item.order.customerId;
      const date = item.order.createdAt;

      orderIds.add(item.orderId);

      if (!customerOrderIds.has(cId)) customerOrderIds.set(cId, new Set());
      customerOrderIds.get(cId).add(item.orderId);

      const firstSeen = customerFirstOrder.get(cId);
      if (!firstSeen || new Date(date) < new Date(firstSeen)) {
        customerFirstOrder.set(cId, date);
      }
    }

    const totalCustomers = customerOrderIds.size;

    const returningCustomers = Array.from(customerOrderIds.values()).filter(
      (set) => set.size > 1,
    ).length;

    const retentionRate =
      totalCustomers > 0
        ? Math.round((returningCustomers / totalCustomers) * 100)
        : 0;

    const newCustomersThisMonth = Array.from(
      customerFirstOrder.values(),
    ).filter((date) => new Date(date) >= startOfMonth).length;

    const repeatPurchaseRate =
      orderIds.size > 0
        ? Math.round(((orderIds.size - totalCustomers) / orderIds.size) * 100)
        : 0;

    res.json({
      success: true,
      data: {
        totalCustomers,
        newCustomersThisMonth,
        totalOrders: orderIds.size,
        totalRevenue,
        avgRating: Number(vendor.rating || 0),
        retentionRate,
        repeatPurchaseRate: Math.max(0, repeatPurchaseRate),
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Analytics failed",
    });
  }
};
