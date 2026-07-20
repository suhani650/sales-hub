import { Router } from "express";
import {
  rewardsAnalytics,
  getRewards,
  addReward,
} from "../../controllers/seller/loyalty.controller.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.get("/", getRewards);

router.post("/", addReward);

router.get("/analytics", rewardsAnalytics);

export default router;
