import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

/**
 * Verifies the short-lived access token sent as `Authorization: Bearer <token>`.
 * Attaches `req.user = { id, roleId, roleName }` on success.
 */
export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ error: "Not authenticated." });
    }

    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      include: { role: true },
    });

    if (!user || !user.isActive || user.deletedAt) {
      return res.status(401).json({ error: "Account is inactive or not found." });
    }

    req.user = { id: user.id, roleId: user.roleId, roleName: user.role.name };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}

/**
 * Role-based access control. Usage: requireRole("SUPER_ADMIN", "VENDOR")
 */
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.roleName)) {
      return res.status(403).json({ error: "You do not have permission to do this." });
    }
    next();
  };
}
