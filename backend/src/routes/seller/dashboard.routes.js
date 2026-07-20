import { Router } from "express";

import { getDashboard } from "../../controllers/seller/dashboard.controller.js";

import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, requireRole("VENDOR"), getDashboard);

export default router;
