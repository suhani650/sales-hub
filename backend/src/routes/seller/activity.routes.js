import { Router } from "express";

import { getActivities } from "../../controllers/seller/activity.controller.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.get("/", getActivities);

export default router;
