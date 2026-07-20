import prisma from "../../config/prisma.js";

export const getDashboard = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

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

    const revenue = await prisma.orderItem.aggregate({
      where: {
        vendorId: vendor.id,
      },
      _sum: {
        lineTotal: true,
      },
    });

    const customers = await prisma.order.findMany({
      where: {
        items: {
          some: {
            vendorId: vendor.id,
          },
        },
      },
      select: {
        customerId: true,
      },
      distinct: ["customerId"],
    });

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        totalCustomers: customers.length,
        totalRevenue: revenue._sum.lineTotal || 0,
        avgRating: vendor.rating,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Dashboard fetch failed",
    });
  }
};
