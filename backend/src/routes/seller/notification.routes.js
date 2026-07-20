import { Router } from "express";

import {
  getNotifications,
  getNotification,
  markAsRead,
  markAsUnread,
  markAllRead,
  deleteNotification,
  clearAllNotifications,
  notificationAnalytics,
} from "../../controllers/seller/notification.controller.js";

import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("VENDOR"));

router.get("/", getNotifications);

router.get("/analytics", notificationAnalytics);

router.put("/read-all", markAllRead);

router.delete("/", clearAllNotifications);

router.get("/:id", getNotification);

router.put("/:id/read", markAsRead);

router.put("/:id/unread", markAsUnread);

router.delete("/:id", deleteNotification);

export default router;
