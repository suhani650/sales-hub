import { Router } from "express";

import {
  getCustomers,
  getCustomerProfile,
  getPurchaseHistory,
  getTopCustomers,
  getSegments,
  customerAnalytics,
} from "../../controllers/seller/customer.controller.js";

import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.get("/", getCustomers);

router.get("/analytics", customerAnalytics);

router.get("/segments", getSegments);

router.get("/top", getTopCustomers);

router.get("/:id", getCustomerProfile);

router.get("/:id/history", getPurchaseHistory);

export default router;
