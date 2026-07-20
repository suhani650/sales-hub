import { Router } from "express";

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getCatalogMeta,
} from "../../controllers/seller/product.controller.js";

import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../utils/validate.js";

import { productSchema } from "../../validators/product.validator.js";
const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.post("/", validate(productSchema), createProduct);
router.get("/", getProducts);

router.get("/search", searchProducts);

router.get("/meta/catalog", getCatalogMeta);

router.get("/:id", getProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
