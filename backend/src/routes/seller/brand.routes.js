import { Router } from "express";

import {
  getBrands,
  getBrandStats,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../../controllers/seller/brand.controller.js";

import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../utils/validate.js";
import {
  brandSchema,
  brandUpdateSchema,
} from "../../validators/brand.validator.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.get("/", getBrands);

router.get("/stats", getBrandStats);

router.post("/", validate(brandSchema), createBrand);

router.get("/:id", getBrand);

router.put("/:id", validate(brandUpdateSchema), updateBrand);

router.delete("/:id", deleteBrand);

export default router;
