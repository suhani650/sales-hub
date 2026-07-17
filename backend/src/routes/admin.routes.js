import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import {
  getDashboard,
  listVendors,
  updateVendorStatus,
  listOrders,
  listProducts,
  listActivityLogs,
} from "../controllers/admin.controller.js";

const router = Router();

router.use(requireAuth, requireRole("SUPER_ADMIN"));

router.get("/dashboard", getDashboard);
router.get("/vendors", listVendors);
router.patch("/vendors/:id/status", updateVendorStatus);
router.get("/orders", listOrders);
router.get("/products", listProducts);
router.get("/activity-logs", listActivityLogs);

export default router;
