import { Router } from "express";

import {
  getCategories,
  getCategoryStats,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../controllers/seller/category.controller.js";

import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../utils/validate.js";
import {
  categorySchema,
  categoryUpdateSchema,
} from "../../validators/category.validator.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.get("/", getCategories);

router.get("/stats", getCategoryStats);

router.post("/", validate(categorySchema), createCategory);

router.get("/:id", getCategory);

router.put("/:id", validate(categoryUpdateSchema), updateCategory);

router.delete("/:id", deleteCategory);

export default router;
