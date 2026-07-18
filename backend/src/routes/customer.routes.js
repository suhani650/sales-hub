import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { getCustomerProfile } from "../controllers/customer.controller.js";

const router = Router();

router.get("/profile", requireAuth, requireRole("CUSTOMER"), getCustomerProfile);

export default router;
