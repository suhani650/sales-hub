import prisma from "../../config/prisma.js";

// Create Referral

export const createReferral = async (req, res) => {
  try {
    const { referrerId } = req.body;

    const referral = await prisma.referral.create({
      data: {
        referrerId,
        referralCode: Math.random().toString(36).substring(2, 10).toUpperCase(),
      },
    });

    res.status(201).json({
      success: true,
      data: referral,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Get Referrals

export const getReferrals = async (req, res) => {
  try {
    const referrals = await prisma.referral.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: referrals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};
