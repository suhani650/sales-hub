import { Router } from "express";

import {
  getProfile,
  updateProfile,
  updateBranding,
  updateBankDetails,
  updateTaxDetails,
  updatePreferences,
  updatePolicies,
  updateSEO,
  changePassword,
  submitKYC,
} from "../../controllers/seller/profile.controller.js";

import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.get("/", getProfile);

router.put("/", updateProfile);

router.put("/branding", updateBranding);

router.put("/bank", updateBankDetails);

router.put("/tax", updateTaxDetails);

router.put("/preferences", updatePreferences);

router.put("/policies", updatePolicies);

router.put("/seo", updateSEO);

router.put("/password", changePassword);

router.post("/kyc", submitKYC);

export default router;
