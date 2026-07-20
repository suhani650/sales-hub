import { Router } from "express";

import {
  createInvoice,
  getInvoices,
  getInvoice,
  deleteInvoice,
  invoiceAnalytics,
} from "../../controllers/seller/invoice.controller.js";

import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.post("/", createInvoice);

router.get("/", getInvoices);

router.get("/analytics", invoiceAnalytics);

router.get("/:id", getInvoice);

router.delete("/:id", deleteInvoice);

export default router;
