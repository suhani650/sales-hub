import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import {
  getCustomerProfile,
  getCategories,
} from "../controllers/customer.controller.js";
import {
  getProducts,
  getProductBySlug,
} from "../controllers/product.controller.js";
import {
  submitReview,
} from "../controllers/review.controller.js";
import {
  getCart,
  addToCart,
  removeFromCart,
} from "../controllers/cart.controller.js";

const router = Router();

router.get("/profile", requireAuth, requireRole("CUSTOMER"), getCustomerProfile);
router.get("/products", requireAuth, requireRole("CUSTOMER"), getProducts);
router.get("/products/:slug", requireAuth, requireRole("CUSTOMER"), getProductBySlug);
router.post("/products/:id/reviews", requireAuth, requireRole("CUSTOMER"), submitReview);
router.get("/categories", requireAuth, requireRole("CUSTOMER"), getCategories);

// Cart management
router.get("/cart", requireAuth, requireRole("CUSTOMER"), getCart);
router.post("/cart", requireAuth, requireRole("CUSTOMER"), addToCart);
router.delete("/cart/:id", requireAuth, requireRole("CUSTOMER"), removeFromCart);

export default router;
