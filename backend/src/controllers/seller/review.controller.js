import prisma from "../../config/prisma.js";

// Get All Reviews

export const getReviews = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const reviews = await prisma.review.findMany({
      where: {
        product: {
          vendorId: vendor.id,
        },
      },
      include: {
        customer: true,
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Reviews fetch failed",
    });
  }
};

// Get Single Review

export const getReview = async (req, res) => {
  try {
    const review = await prisma.review.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        customer: true,
        product: true,
      },
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Review fetch failed",
    });
  }
};

// Reply To Review

export const replyReview = async (req, res) => {
  try {
    const { reply } = req.body;

    const review = await prisma.review.update({
      where: {
        id: req.params.id,
      },
      data: {
        sellerReply: reply,
        repliedAt: new Date(),
      },
    });

    res.json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Reply failed",
    });
  }
};

// Delete Review

export const deleteReview = async (req, res) => {
  try {
    await prisma.review.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      success: true,
      message: "Review deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};

// Rating Breakdown

export const ratingBreakdown = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const oneStar = await prisma.review.count({
      where: {
        rating: 1,
        product: {
          vendorId: vendor.id,
        },
      },
    });

    const twoStar = await prisma.review.count({
      where: {
        rating: 2,
        product: {
          vendorId: vendor.id,
        },
      },
    });

    const threeStar = await prisma.review.count({
      where: {
        rating: 3,
        product: {
          vendorId: vendor.id,
        },
      },
    });

    const fourStar = await prisma.review.count({
      where: {
        rating: 4,
        product: {
          vendorId: vendor.id,
        },
      },
    });

    const fiveStar = await prisma.review.count({
      where: {
        rating: 5,
        product: {
          vendorId: vendor.id,
        },
      },
    });

    res.json({
      success: true,
      data: {
        oneStar,
        twoStar,
        threeStar,
        fourStar,
        fiveStar,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Breakdown failed",
    });
  }
};

// Review Analytics

export const reviewAnalytics = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const totalReviews = await prisma.review.count({
      where: {
        product: {
          vendorId: vendor.id,
        },
      },
    });

    const average = await prisma.review.aggregate({
      where: {
        product: {
          vendorId: vendor.id,
        },
      },
      _avg: {
        rating: true,
      },
    });

    res.json({
      success: true,
      data: {
        totalReviews,
        averageRating: average._avg.rating || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Analytics failed",
    });
  }
};
