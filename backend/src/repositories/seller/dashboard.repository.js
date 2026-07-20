import prisma from "../../config/prisma.js";

class DashboardRepository {
  async getVendorByUserId(userId) {
    return prisma.vendor.findUnique({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    });
  }

  async totalProducts(vendorId) {
    return prisma.product.count({
      where: {
        vendorId,
        deletedAt: null,
      },
    });
  }

  async activeProducts(vendorId) {
    return prisma.product.count({
      where: {
        vendorId,
        status: "ACTIVE",
        deletedAt: null,
      },
    });
  }

  async totalOrders(vendorId) {
    return prisma.orderItem.count({
      where: {
        vendorId,
      },
    });
  }

  async pendingOrders(vendorId) {
    return prisma.orderItem.count({
      where: {
        vendorId,
        order: {
          status: "PENDING",
        },
      },
    });
  }

  async deliveredOrders(vendorId) {
    return prisma.orderItem.count({
      where: {
        vendorId,
        order: {
          status: "DELIVERED",
        },
      },
    });
  }

  async cancelledOrders(vendorId) {
    return prisma.orderItem.count({
      where: {
        vendorId,
        order: {
          status: "CANCELLED",
        },
      },
    });
  }

  async totalRevenue(vendorId) {
    const revenue = await prisma.orderItem.aggregate({
      where: {
        vendorId,
        order: {
          status: "DELIVERED",
        },
      },
      _sum: {
        lineTotal: true,
      },
    });

    return revenue._sum.lineTotal || 0;
  }

  async lowStockProducts(vendorId) {
    return prisma.inventory.count({
      where: {
        vendorId,
        quantity: {
          lte: 5,
        },
      },
    });
  }

  async totalReviews(vendorId) {
    return prisma.review.count({
      where: {
        product: {
          vendorId,
        },
      },
    });
  }

  async unreadNotifications(userId) {
    return prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }
}

export default new DashboardRepository();
