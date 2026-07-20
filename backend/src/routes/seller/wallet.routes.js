import { Router } from "express";

import {
  getWallets,
  walletAnalytics,
} from "../../controllers/seller/wallet.controller.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.get("/", getWallets);

router.get("/analytics", walletAnalytics);

export default router;
