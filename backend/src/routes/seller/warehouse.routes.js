import { Router } from "express";

import {
  getWarehouses,
  getWarehouse,
  warehouseAnalytics,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
} from "../../controllers/seller/warehouse.controller.js";

import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.post("/", createWarehouse);

router.get("/", getWarehouses);

router.get("/analytics", warehouseAnalytics);

router.get("/:id", getWarehouse);

router.put("/:id", updateWarehouse);

router.delete("/:id", deleteWarehouse);

export default router;
