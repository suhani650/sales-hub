import prisma from "../../config/prisma.js";

// Rewards Analytics

export const rewardsAnalytics = async (req, res) => {
  try {
    const totalRewards = await prisma.rewardPoint.aggregate({
      _sum: {
        points: true,
      },
    });

    const totalCustomers = await prisma.rewardPoint.count();

    res.json({
      success: true,
      data: {
        totalPoints: totalRewards._sum.points || 0,
        totalCustomers,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Reward List

export const getRewards = async (req, res) => {
  try {
    const rewards = await prisma.rewardPoint.findMany({
      orderBy: {
        points: "desc",
      },
    });

    res.json({
      success: true,
      data: rewards,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Add Reward

export const addReward = async (req, res) => {
  try {
    const { customerId, points } = req.body;

    const reward = await prisma.rewardPoint.upsert({
      where: {
        customerId,
      },

      create: {
        customerId,
        points,
      },

      update: {
        points: {
          increment: points,
        },
      },
    });

    res.json({
      success: true,
      data: reward,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};
