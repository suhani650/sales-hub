import { Router } from "express";

import { exportProducts } from "../../controllers/seller/export.controller.js";

import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.get("/products", exportProducts);

export default router;
