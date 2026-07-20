import { Router } from "express";

import {
  getOrders,
  getOrder,
  updateOrderStatus,
  updateTracking,
  getReturns,
  getRefunds,
  revenueAnalytics,
} from "../../controllers/seller/order.controller.js";

import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.get("/", getOrders);

router.get("/analytics", revenueAnalytics);

router.get("/returns", getReturns);

router.get("/refunds", getRefunds);

router.get("/:id", getOrder);

router.put("/:id/status", updateOrderStatus);

router.put("/:id/tracking", updateTracking);

export default router;
