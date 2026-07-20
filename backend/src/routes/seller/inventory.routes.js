import { Router } from "express";

import {
  getInventory,
  getInventoryItem,
  updateStock,
  bulkUpdateStock,
  getLowStock,
  inventoryAnalytics,
} from "../../controllers/seller/inventory.controller.js";

import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.get("/", getInventory);

router.get("/analytics", inventoryAnalytics);

router.get("/low-stock", getLowStock);

router.post("/bulk-update", bulkUpdateStock);

router.get("/:id", getInventoryItem);

router.put("/:id", updateStock);

export default router;
