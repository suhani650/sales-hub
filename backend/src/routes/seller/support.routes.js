import { Router } from "express";

import {
  createTicket,
  getTickets,
  getTicket,
  updateTicketStatus,
  deleteTicket,
  ticketAnalytics,
} from "../../controllers/seller/support.controller.js";

import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.post("/", createTicket);

router.get("/", getTickets);

router.get("/analytics", ticketAnalytics);

router.get("/:id", getTicket);

router.put("/:id/status", updateTicketStatus);

router.delete("/:id", deleteTicket);

export default router;
