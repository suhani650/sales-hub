import prisma from "../../config/prisma.js";
import { NOTIFICATION_TYPES } from "../../services/notification.service.js";

// GET /api/seller/notifications
// Supports ?type=ORDER&unread=true&page=1&limit=20
export const getNotifications = async (req, res) => {
  try {
    const { type, unread, page = 1, limit = 20 } = req.query;

    const where = {
      userId: req.user.id,
      ...(type && type !== "ALL" ? { type } : {}),
      ...(unread === "true" ? { isRead: false } : {}),
    };

    const take = Math.min(Number(limit) || 20, 100);
    const skip = (Math.max(Number(page) || 1, 1) - 1) * take;

    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      prisma.notification.count({ where }),
    ]);

    res.json({
      success: true,
      count: notifications.length,
      total,
      page: Number(page) || 1,
      totalPages: Math.max(Math.ceil(total / take), 1),
      data: notifications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Notifications fetch failed",
    });
  }
};

// GET /api/seller/notifications/:id
export const getNotification = async (req, res) => {
  try {
    const notification = await prisma.notification.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user.id,
      },
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.json({
      success: true,
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Notification fetch failed",
    });
  }
};

// PUT /api/seller/notifications/:id/read
export const markAsRead = async (req, res) => {
  try {
    const existing = await prisma.notification.findFirst({
      where: { id: Number(req.params.id), userId: req.user.id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    const notification = await prisma.notification.update({
      where: { id: existing.id },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    res.json({
      success: true,
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Mark read failed",
    });
  }
};

// PUT /api/seller/notifications/:id/unread
export const markAsUnread = async (req, res) => {
  try {
    const existing = await prisma.notification.findFirst({
      where: { id: Number(req.params.id), userId: req.user.id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    const notification = await prisma.notification.update({
      where: { id: existing.id },
      data: {
        isRead: false,
        readAt: null,
      },
    });

    res.json({
      success: true,
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Mark unread failed",
    });
  }
};

// PUT /api/seller/notifications/read-all
export const markAllRead = async (req, res) => {
  try {
    const { type } = req.query;

    await prisma.notification.updateMany({
      where: {
        userId: req.user.id,
        isRead: false,
        ...(type && type !== "ALL" ? { type } : {}),
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    res.json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Bulk update failed",
    });
  }
};

// DELETE /api/seller/notifications/:id
export const deleteNotification = async (req, res) => {
  try {
    const existing = await prisma.notification.findFirst({
      where: { id: Number(req.params.id), userId: req.user.id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    await prisma.notification.delete({
      where: { id: existing.id },
    });

    res.json({
      success: true,
      message: "Notification deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};

// DELETE /api/seller/notifications  (clears all of the current user's notifications)
export const clearAllNotifications = async (req, res) => {
  try {
    const { type } = req.query;

    await prisma.notification.deleteMany({
      where: {
        userId: req.user.id,
        ...(type && type !== "ALL" ? { type } : {}),
      },
    });

    res.json({
      success: true,
      message: "Notifications cleared",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Clear failed",
    });
  }
};

// GET /api/seller/notifications/analytics
export const notificationAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    const [total, unread, read, byType] = await Promise.all([
      prisma.notification.count({ where: { userId } }),
      prisma.notification.count({ where: { userId, isRead: false } }),
      prisma.notification.count({ where: { userId, isRead: true } }),
      prisma.notification.groupBy({
        by: ["type"],
        where: { userId },
        _count: { _all: true },
      }),
    ]);

    const typeCounts = NOTIFICATION_TYPES.reduce((acc, t) => {
      acc[t] = 0;
      return acc;
    }, {});

    byType.forEach((row) => {
      typeCounts[row.type] = row._count._all;
    });

    res.json({
      success: true,
      data: {
        total,
        unread,
        read,
        readRate: total > 0 ? Math.round((read / total) * 100) : 0,
        byType: typeCounts,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Analytics failed",
    });
  }
};

// Internal helper used elsewhere in the backend (e.g. inventory / order
// controllers) to create a notification for a vendor's own user and push it
// live over the socket connection.
export const sendRealtimeNotification = async (
  userId,
  title,
  body,
  io,
  type = "INFO",
) => {
  const notification = await prisma.notification.create({
    data: { userId, title, body, type },
  });

  if (io) {
    io.to(`user-${userId}`).emit("notification:new", notification);
  }

  return notification;
};
