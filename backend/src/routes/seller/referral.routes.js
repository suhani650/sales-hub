import { Router } from "express";

import {
  createReferral,
  getReferrals,
} from "../../controllers/seller/referral.controller.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.post("/", createReferral);

router.get("/", getReferrals);

export default router;
