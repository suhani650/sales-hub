import { Router } from "express";

import {
  createCoupon,
  getCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  getActiveCoupons,
  getExpiredCoupons,
  couponAnalytics,
} from "../../controllers/seller/coupon.controller.js";

import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.post("/", createCoupon);

router.get("/", getCoupons);

router.get("/analytics", couponAnalytics);

router.get("/active", getActiveCoupons);

router.get("/expired", getExpiredCoupons);

router.get("/:id", getCoupon);

router.put("/:id", updateCoupon);

router.delete("/:id", deleteCoupon);

export default router;
