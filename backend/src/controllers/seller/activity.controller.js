import prisma from "../../config/prisma.js";

export const getActivities = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const activities = await prisma.activityTimeline.findMany({
      where: {
        vendorId: String(vendor.id),
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 50,
    });

    res.json({
      success: true,

      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};
