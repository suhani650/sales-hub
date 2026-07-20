import dashboardRepository from "../../repositories/seller/dashboard.repository.js";

class DashboardService {
  async getDashboard(userId) {
    const vendor = await dashboardRepository.getVendorByUserId(userId);

    if (!vendor) {
      throw new Error("Vendor account not found.");
    }

    const vendorId = vendor.id;

    const [
      totalProducts,
      activeProducts,
      totalOrders,
      pendingOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
      lowStockProducts,
      totalReviews,
      unreadNotifications,
    ] = await Promise.all([
      dashboardRepository.totalProducts(vendorId),
      dashboardRepository.activeProducts(vendorId),
      dashboardRepository.totalOrders(vendorId),
      dashboardRepository.pendingOrders(vendorId),
      dashboardRepository.deliveredOrders(vendorId),
      dashboardRepository.cancelledOrders(vendorId),
      dashboardRepository.totalRevenue(vendorId),
      dashboardRepository.lowStockProducts(vendorId),
      dashboardRepository.totalReviews(vendorId),
      dashboardRepository.unreadNotifications(userId),
    ]);

    return {
      vendor: {
        id: vendor.id,
        storeName: vendor.storeName,
        status: vendor.status,
        rating: vendor.rating,
      },

      stats: {
        totalProducts,
        activeProducts,
        totalOrders,
        pendingOrders,
        deliveredOrders,
        cancelledOrders,
        totalRevenue,
        lowStockProducts,
        totalReviews,
        unreadNotifications,
      },
    };
  }
}

export default new DashboardService();
