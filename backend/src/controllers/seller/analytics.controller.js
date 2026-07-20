import prisma from "../../config/prisma.js";

// Dashboard Analytics

export const getDashboardAnalytics = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const totalProducts = await prisma.product.count({
      where: {
        vendorId: vendor.id,
      },
    });

    const totalOrders = await prisma.orderItem.count({
      where: {
        vendorId: vendor.id,
      },
    });

    const totalCustomers = await prisma.order.findMany({
      where: {
        items: {
          some: {
            vendorId: vendor.id,
          },
        },
      },
      distinct: ["customerId"],
    });

    const revenue = await prisma.orderItem.aggregate({
      where: {
        vendorId: vendor.id,
      },
      _sum: {
        lineTotal: true,
      },
    });

    res.json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        totalCustomers: totalCustomers.length,
        revenue: revenue._sum.lineTotal || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Analytics failed",
    });
  }
};

// Monthly Revenue

export const monthlyRevenue = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    // Pull the raw line items for the trailing 12 months and aggregate
    // them by calendar month in JS — grouping directly by `createdAt`
    // (the previous approach) produced one bucket per exact timestamp
    // instead of one bucket per month, which is useless for a chart.
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
    twelveMonthsAgo.setDate(1);
    twelveMonthsAgo.setHours(0, 0, 0, 0);

    const items = await prisma.orderItem.findMany({
      where: {
        vendorId: vendor.id,
        order: {
          createdAt: { gte: twelveMonthsAgo },
        },
      },
      select: {
        order: {
          select: {
            createdAt: true,
          },
        },
        lineTotal: true,
      },
    });

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const buckets = new Map();
    for (let i = 0; i < 12; i++) {
      const d = new Date(twelveMonthsAgo);
      d.setMonth(d.getMonth() + i);
      buckets.set(`${d.getFullYear()}-${d.getMonth()}`, {
        name: monthNames[d.getMonth()],
        sales: 0,
      });
    }

    for (const item of items) {
      const d = new Date(item.order.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (buckets.has(key)) {
        buckets.get(key).sales += Number(item.lineTotal);
      }
    }

    res.json({
      success: true,
      data: Array.from(buckets.values()),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Top Products

export const topProducts = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const grouped = await prisma.orderItem.groupBy({
      by: ["productId"],
      where: {
        vendorId: vendor.id,
      },
      _sum: {
        quantity: true,
        lineTotal: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 10,
    });

    const productIds = grouped.map((g) => g.productId);

    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { images: true, category: true },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    const data = grouped.map((g) => {
      const product = productMap.get(g.productId);
      return {
        productId: g.productId,
        name: product?.name ?? "Deleted product",
        image: product?.images?.[0]?.url ?? null,
        category: product?.category?.name ?? null,
        ratingAvg: product?.ratingAvg ?? 0,
        unitsSold: g._sum.quantity || 0,
        revenue: g._sum.lineTotal || 0,
      };
    });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Top Customers

export const topCustomers = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

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
    });
  }
};

// Inventory Analytics

export const inventoryAnalytics = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const totalStock = await prisma.inventory.aggregate({
      where: {
        vendorId: vendor.id,
      },
      _sum: {
        quantity: true,
      },
    });

    const lowStock = await prisma.inventory.count({
      where: {
        vendorId: vendor.id,
        quantity: {
          lte: 10,
        },
      },
    });

    res.json({
      success: true,
      data: {
        totalStock: totalStock._sum.quantity || 0,
        lowStock,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Conversion Analytics

export const conversionAnalytics = async (req, res) => {
  try {
    const visitors = 10000;
    const buyers = 1200;

    const rate = ((buyers / visitors) * 100).toFixed(2);

    res.json({
      success: true,
      data: {
        visitors,
        buyers,
        conversionRate: rate,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};
