import prisma from "../../config/prisma.js";

// Create Campaign

export const createCampaign = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const campaign = await prisma.marketingCampaign.create({
      data: {
        vendorId: vendor.id,
        ...req.body,
      },
    });

    res.status(201).json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Campaign creation failed",
    });
  }
};

// Get Campaigns

export const getCampaigns = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const campaigns = await prisma.marketingCampaign.findMany({
      where: {
        vendorId: vendor.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: campaigns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Get Campaign

export const getCampaign = async (req, res) => {
  try {
    const campaign = await prisma.marketingCampaign.findUnique({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Update Campaign

export const updateCampaign = async (req, res) => {
  try {
    const campaign = await prisma.marketingCampaign.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    res.json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Delete Campaign

export const deleteCampaign = async (req, res) => {
  try {
    await prisma.marketingCampaign.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Marketing Overview (all figures scoped to this vendor's own campaigns)

export const marketingOverview = async (req, res) => {
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

    const campaigns = await prisma.marketingCampaign.findMany({
      where: { vendorId: vendor.id },
    });

    const totalCampaigns = campaigns.length;

    const activeCampaigns = campaigns.filter(
      (c) => c.status === "ACTIVE",
    ).length;

    const statusBreakdown = campaigns.reduce((acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    }, {});

    const totals = campaigns.reduce(
      (acc, c) => {
        acc.sent += c.sentCount || 0;
        acc.opens += c.openCount || 0;
        acc.clicks += c.clickCount || 0;
        return acc;
      },
      { sent: 0, opens: 0, clicks: 0 },
    );

    const byChannel = {};

    for (const c of campaigns) {
      const key = c.campaignType || "OTHER";

      if (!byChannel[key]) {
        byChannel[key] = {
          channel: key,
          campaigns: 0,
          sent: 0,
          opens: 0,
          clicks: 0,
        };
      }

      byChannel[key].campaigns += 1;
      byChannel[key].sent += c.sentCount || 0;
      byChannel[key].opens += c.openCount || 0;
      byChannel[key].clicks += c.clickCount || 0;
    }

    const channelStats = Object.values(byChannel).map((c) => ({
      ...c,
      openRate: c.sent > 0 ? Math.round((c.opens / c.sent) * 100) : 0,
      clickRate: c.sent > 0 ? Math.round((c.clicks / c.sent) * 100) : 0,
    }));

    res.json({
      success: true,
      data: {
        totalCampaigns,
        activeCampaigns,
        statusBreakdown,
        totalSent: totals.sent,
        totalOpens: totals.opens,
        totalClicks: totals.clicks,
        overallOpenRate:
          totals.sent > 0 ? Math.round((totals.opens / totals.sent) * 100) : 0,
        overallClickRate:
          totals.sent > 0 ? Math.round((totals.clicks / totals.sent) * 100) : 0,
        channelStats,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Overview failed",
    });
  }
};
