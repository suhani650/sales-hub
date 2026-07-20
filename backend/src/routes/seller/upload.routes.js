import { Router } from "express";

import upload from "../../middleware/upload.js";

import {
  uploadSingle,
  uploadMultiple,
} from "../../controllers/seller/upload.controller.js";

import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.post(
  "/single",

  upload.single("image"),

  uploadSingle,
);

router.post(
  "/multiple",

  upload.array("images", 10),

  uploadMultiple,
);

export default router;
