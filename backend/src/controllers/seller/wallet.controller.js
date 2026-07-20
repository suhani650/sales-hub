import prisma from "../../config/prisma.js";

// Wallet Analytics

export const walletAnalytics = async (req, res) => {
  try {
    const balance = await prisma.wallet.aggregate({
      _sum: {
        balance: true,
      },
    });

    const wallets = await prisma.wallet.count();

    res.json({
      success: true,
      data: {
        totalBalance: balance._sum.balance || 0,
        wallets,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Wallet List

export const getWallets = async (req, res) => {
  try {
    const wallets = await prisma.wallet.findMany();

    res.json({
      success: true,
      data: wallets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};
