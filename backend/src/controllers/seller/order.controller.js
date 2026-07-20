import prisma from "../../config/prisma.js";
import { notifyUser } from "../../services/notification.service.js";

// Get All Orders

export const getOrders = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const orders = await prisma.orderItem.findMany({
      where: {
        vendorId: vendor.id,
      },
      include: {
        product: { include: { images: true } },
        order: {
          include: {
            customer: { include: { user: true } },
            payments: true,
          },
        },
      },
      orderBy: {
        order: {
          createdAt: "desc",
        },
      },
    });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Orders fetch failed",
    });
  }
};

// Get Single Order

export const getOrder = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }

    const order = await prisma.order.findFirst({
      where: {
        id: Number(req.params.id),
        items: { some: { vendorId: vendor.id } },
      },
      include: {
        customer: { include: { user: true } },
        payments: true,
        items: {
          where: { vendorId: vendor.id },
          include: { product: { include: { images: true } } },
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order fetch failed",
    });
  }
};

// Update Order Status

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = [
      "PENDING",
      "CONFIRMED",
      "PACKED",
      "SHIPPED",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "CANCELLED",
      "RETURNED",
    ];

    if (!status || !validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order status." });
    }

    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }

    // A vendor may only progress the status of orders that contain at least
    // one of their own line items — never someone else's order.
    const ownsOrder = await prisma.orderItem.findFirst({
      where: { orderId: Number(req.params.id), vendorId: vendor.id },
    });

    if (!ownsOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const order = await prisma.order.update({
      where: { id: Number(req.params.id) },
      data: { status },
    });

    await prisma.activityLog.create({
      data: {
        userId: req.user.id,
        action: "ORDER_STATUS_UPDATE",
        entity: "order",
        entityId: order.id,
        ipAddress: req.ip,
      },
    });

    await notifyUser({
      userId: req.user.id,
      title: "Order Status Updated",
      body: `Order #${order.id} has been marked as ${status}.`,
      type: "ORDER",
      io: req.app.get("io"),
    });

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Status update failed",
    });
  }
};

// Shipment Tracking

export const updateTracking = async (req, res) => {
  try {
    const { trackingNumber, courierName } = req.body;

    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }

    const ownsOrder = await prisma.orderItem.findFirst({
      where: { orderId: Number(req.params.id), vendorId: vendor.id },
    });

    if (!ownsOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const order = await prisma.order.update({
      where: { id: Number(req.params.id) },
      data: {
        trackingNumber,
        courierName,
      },
    });

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Tracking update failed",
    });
  }
};

// Returns

export const getReturns = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const returns = await prisma.returnRequest.findMany({
      where: {
        vendorId: vendor.id,
      },
      include: {
        order: true,
        product: true,
      },
    });

    res.json({
      success: true,
      data: returns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Returns fetch failed",
    });
  }
};

// Refunds

export const getRefunds = async (req, res) => {
  try {
    const refunds = await prisma.refund.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: refunds,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Refund fetch failed",
    });
  }
};

// Revenue Analytics

export const revenueAnalytics = async (req, res) => {
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

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [revenue, totalOrders, todaysOrders, pendingOrders, distinctOrders] =
      await Promise.all([
        prisma.orderItem.aggregate({
          where: { vendorId: vendor.id },
          _sum: { lineTotal: true },
        }),

        prisma.orderItem.count({ where: { vendorId: vendor.id } }),

        prisma.orderItem.count({
          where: {
            vendorId: vendor.id,
            order: { createdAt: { gte: startOfToday } },
          },
        }),

        prisma.orderItem.count({
          where: {
            vendorId: vendor.id,
            order: { status: { in: ["PENDING", "CONFIRMED", "PACKED"] } },
          },
        }),

        prisma.orderItem.findMany({
          where: { vendorId: vendor.id },
          distinct: ["orderId"],
          select: { orderId: true },
        }),
      ]);

    const totalRevenue = Number(revenue._sum.lineTotal || 0);
    const totalDistinctOrders = distinctOrders.length;
    const averageOrderValue =
      totalDistinctOrders > 0 ? totalRevenue / totalDistinctOrders : 0;

    res.json({
      success: true,
      data: {
        revenue: totalRevenue,
        totalOrders,
        totalDistinctOrders,
        todaysOrders,
        pendingOrders,
        averageOrderValue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Analytics failed",
    });
  }
};
