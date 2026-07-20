import { Router } from "express";

import {
  getTransactions,
  getPayouts,
  getRefunds,
  updateRefundStatus,
  getTaxReports,
  financeAnalytics,
} from "../../controllers/seller/finance.controller.js";

import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.get("/transactions", getTransactions);

router.get("/payouts", getPayouts);

router.get("/refunds", getRefunds);

router.patch("/refunds/:id/status", updateRefundStatus);

router.get("/tax-reports", getTaxReports);

router.get("/analytics", financeAnalytics);

export default router;
