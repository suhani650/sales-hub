import { prisma } from "../config/prisma.js";

export async function submitReview(req, res) {
  const { id } = req.params; // Product ID
  const { rating, comment } = req.body;

  try {
    const customer = await prisma.customer.findUnique({
      where: { userId: req.user.id },
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer profile not found." });
    }

    const productId = parseInt(id);
    const parsedRating = parseInt(rating);

    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5." });
    }

    // Submit review and recalculate metrics in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create review
      const review = await tx.review.create({
        data: {
          productId,
          customerId: customer.id,
          rating: parsedRating,
          comment,
        },
      });

      // 2. Fetch all reviews for this product
      const reviews = await tx.review.findMany({
        where: { productId },
        select: { rating: true },
      });

      // 3. Compute new average rating
      const ratingCount = reviews.length;
      const ratingSum = reviews.reduce((sum, r) => sum + r.rating, 0);
      const ratingAvg = ratingCount > 0 ? ratingSum / ratingCount : 0.0;

      // 4. Update product metrics
      await tx.product.update({
        where: { id: productId },
        data: {
          ratingAvg,
          ratingCount,
        },
      });

      return review;
    });

    res.json({ message: "Review submitted successfully.", review: result });
  } catch (err) {
    console.error("Error submitting review:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}
