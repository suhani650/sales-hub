import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import {
  getCustomerProfile,
  getProducts,
  getCategories,
} from "../controllers/customer.controller.js";

const router = Router();

router.get("/profile", requireAuth, requireRole("CUSTOMER"), getCustomerProfile);
router.get("/products", requireAuth, requireRole("CUSTOMER"), getProducts);
router.get("/categories", requireAuth, requireRole("CUSTOMER"), getCategories);

export default router;
