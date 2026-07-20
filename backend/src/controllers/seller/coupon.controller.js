import prisma from "../../config/prisma.js";

// Create Coupon

export const createCoupon = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const {
      code,
      discountType,
      discountValue,
      minOrderAmount,
      usageLimit,
      endDate,
    } = req.body;

    const coupon = await prisma.coupon.create({
      data: {
        vendorId: vendor.id,
        code,
        type: discountType,
        value: discountValue,
        minOrderAmt: minOrderAmount || 0,
        maxUses: usageLimit || 0,
        expiresAt: endDate ? new Date(endDate) : null,
      },
    });

    res.status(201).json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Coupon creation failed",
    });
  }
};

// Get Coupons

export const getCoupons = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const coupons = await prisma.coupon.findMany({
      where: {
        vendorId: vendor.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: coupons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Coupons fetch failed",
    });
  }
};

// Get Coupon

export const getCoupon = async (req, res) => {
  try {
    const coupon = await prisma.coupon.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    res.json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Coupon fetch failed",
    });
  }
};

// Update Coupon

export const updateCoupon = async (req, res) => {
  try {
    const coupon = await prisma.coupon.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Coupon update failed",
    });
  }
};

// Delete Coupon

export const deleteCoupon = async (req, res) => {
  try {
    await prisma.coupon.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      success: true,
      message: "Coupon deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};

// Active Coupons

export const getActiveCoupons = async (req, res) => {
  try {
    const now = new Date();

    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const coupons = await prisma.coupon.findMany({
      where: {
        vendorId: vendor.id,
        isActive: true,
        OR: [{ expiresAt: null }, { expiresAt: { gte: now } }],
      },
    });

    res.json({
      success: true,
      data: coupons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Active coupons failed",
    });
  }
};

// Expired Coupons

export const getExpiredCoupons = async (req, res) => {
  try {
    const now = new Date();

    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const coupons = await prisma.coupon.findMany({
      where: {
        vendorId: vendor.id,
        expiresAt: {
          lt: now,
        },
      },
    });

    res.json({
      success: true,
      data: coupons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Expired coupons failed",
    });
  }
};

// Coupon Analytics

export const couponAnalytics = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const totalCoupons = await prisma.coupon.count({
      where: {
        vendorId: vendor.id,
      },
    });

    const activeCoupons = await prisma.coupon.count({
      where: {
        vendorId: vendor.id,
        isActive: true,
      },
    });

    const redemptions = await prisma.coupon.aggregate({
      where: {
        vendorId: vendor.id,
      },
      _sum: {
        usedCount: true,
      },
    });

    res.json({
      success: true,
      data: {
        totalCoupons,
        activeCoupons,
        totalRedemptions: redemptions._sum.usedCount || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Analytics failed",
    });
  }
};
