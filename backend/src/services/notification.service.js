import prisma from "../config/prisma.js";

export const NOTIFICATION_TYPES = {
  INFO: "INFO",
  SUCCESS: "SUCCESS",
  WARNING: "WARNING",
  ERROR: "ERROR",
  ORDER: "ORDER",
  PAYMENT: "PAYMENT",
  INVENTORY: "INVENTORY",
  PROMOTION: "PROMOTION",
  REVIEW: "REVIEW",
  SUPPORT: "SUPPORT",
};

export async function notifyUser({ userId, title, body, type = "INFO", io }) {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        body,
        type,
      },
    });

    if (io) {
      io.to(`user:${userId}`).emit("notification:new", notification);
    }

    return notification;
  } catch (error) {
    console.error("notifyUser service error:", error);
    throw error;
  }
}
