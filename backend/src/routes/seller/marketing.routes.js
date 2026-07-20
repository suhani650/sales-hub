import { Router } from "express";

import {
  createCampaign,
  getCampaigns,
  getCampaign,
  updateCampaign,
  deleteCampaign,
  marketingOverview,
} from "../../controllers/seller/marketing.controller.js";

import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.post("/", createCampaign);

router.get("/", getCampaigns);

router.get("/overview", marketingOverview);

router.get("/:id", getCampaign);

router.put("/:id", updateCampaign);

router.delete("/:id", deleteCampaign);

export default router;
