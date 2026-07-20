import { Router } from "express";

import {
  getDashboardAnalytics,
  monthlyRevenue,
  topProducts,
  topCustomers,
  inventoryAnalytics,
  conversionAnalytics,
} from "../../controllers/seller/analytics.controller.js";

import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.get("/dashboard", getDashboardAnalytics);

router.get("/revenue", monthlyRevenue);

router.get("/products", topProducts);

router.get("/customers", topCustomers);

router.get("/inventory", inventoryAnalytics);

router.get("/conversion", conversionAnalytics);

export default router;
