import { Router } from "express";

import {
  createShipment,
  getShipments,
  getShipment,
  updateShipmentStatus,
  shipmentAnalytics,
} from "../../controllers/seller/shipment.controller.js";

import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.post("/", createShipment);

router.get("/", getShipments);

router.get("/analytics", shipmentAnalytics);

router.get("/:id", getShipment);

router.put("/:id/status", updateShipmentStatus);

export default router;
