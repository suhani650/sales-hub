import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import {
  getCustomerProfile,
  getCategories,
  updateCustomerProfile,
  uploadAvatar,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/customer.controller.js";
import { uploadAvatar as multerUpload } from "../utils/uploads.js";
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
  updateCartItemQuantity,
} from "../controllers/cart.controller.js";
import {
  createOrder,
  getCustomerOrders,
  getOrderById,
  cancelOrder,
} from "../controllers/order.controller.js";

const router = Router();

router.get("/profile", requireAuth, requireRole("CUSTOMER"), getCustomerProfile);
router.get("/products", requireAuth, requireRole("CUSTOMER"), getProducts);
router.get("/products/:slug", requireAuth, requireRole("CUSTOMER"), getProductBySlug);
router.post("/products/:id/reviews", requireAuth, requireRole("CUSTOMER"), submitReview);
router.get("/categories", requireAuth, requireRole("CUSTOMER"), getCategories);

// Cart management
router.get("/cart", requireAuth, requireRole("CUSTOMER"), getCart);
router.post("/cart", requireAuth, requireRole("CUSTOMER"), addToCart);
router.put("/cart/:id", requireAuth, requireRole("CUSTOMER"), updateCartItemQuantity);
router.delete("/cart/:id", requireAuth, requireRole("CUSTOMER"), removeFromCart);

// Orders management
router.post("/orders", requireAuth, requireRole("CUSTOMER"), createOrder);
router.get("/orders", requireAuth, requireRole("CUSTOMER"), getCustomerOrders);
router.get("/orders/:id", requireAuth, requireRole("CUSTOMER"), getOrderById);
router.put("/orders/:id/cancel", requireAuth, requireRole("CUSTOMER"), cancelOrder);

// Profile management
router.put("/profile", requireAuth, requireRole("CUSTOMER"), updateCustomerProfile);
router.post("/profile/avatar", requireAuth, requireRole("CUSTOMER"), multerUpload, uploadAvatar);

// Address Book management
router.get("/addresses", requireAuth, requireRole("CUSTOMER"), getAddresses);
router.post("/addresses", requireAuth, requireRole("CUSTOMER"), addAddress);
router.put("/addresses/:id", requireAuth, requireRole("CUSTOMER"), updateAddress);
router.delete("/addresses/:id", requireAuth, requireRole("CUSTOMER"), deleteAddress);

export default router;
