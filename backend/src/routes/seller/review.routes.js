import { Router } from "express";

import {
  getReviews,
  getReview,
  replyReview,
  deleteReview,
  ratingBreakdown,
  reviewAnalytics,
} from "../../controllers/seller/review.controller.js";

import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.get("/", getReviews);

router.get("/analytics", reviewAnalytics);

router.get("/breakdown", ratingBreakdown);

router.get("/:id", getReview);

router.put("/:id/reply", replyReview);

router.delete("/:id", deleteReview);

export default router;
