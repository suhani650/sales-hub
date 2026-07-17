import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/tokens.js";

const REFRESH_COOKIE = "nexora_rt";
const cookieOpts = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// Only these roles can self-register from the public form.
// SUPER_ADMIN accounts are provisioned internally, never through /register.
const PUBLIC_ROLES = ["CUSTOMER", "VENDOR", "FIELD_SALES_OFFICER"];

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function randomCode(prefix, length = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < length; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}${code}`;
}

export async function register(req, res) {
  const { name, email, password, phone, role, storeName, gstNumber, region } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "Name, email, password, and role are required." });
  }

  if (!PUBLIC_ROLES.includes(role)) {
    return res.status(400).json({ error: "Invalid role selected." });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters." });
  }

  if (role === "VENDOR" && !storeName) {
    return res.status(400).json({ error: "Store name is required for a seller account." });
  }

  const normalizedEmail = email.toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    return res.status(409).json({ error: "An account with this email already exists." });
  }

  const roleRow = await prisma.role.findUnique({ where: { name: role } });
  if (!roleRow) {
    return res.status(500).json({ error: "Role is not configured on the server." });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: {
          name,
          email: normalizedEmail,
          phone: phone || null,
          passwordHash,
          roleId: roleRow.id,
        },
      });

      if (role === "CUSTOMER") {
        await tx.customer.create({
          data: {
            userId: createdUser.id,
            referralCode: randomCode("REF-", 6),
          },
        });
      } else if (role === "VENDOR") {
        const baseSlug = slugify(storeName);
        let slug = baseSlug;
        let attempt = 0;
        // Ensure slug uniqueness without failing the whole registration.
        while (await tx.vendor.findUnique({ where: { storeSlug: slug } })) {
          attempt += 1;
          slug = `${baseSlug}-${attempt}`;
        }
        await tx.vendor.create({
          data: {
            userId: createdUser.id,
            storeName,
            storeSlug: slug,
            gstNumber: gstNumber || null,
            status: "PENDING",
          },
        });
      } else if (role === "FIELD_SALES_OFFICER") {
        await tx.fieldSalesOfficer.create({
          data: {
            userId: createdUser.id,
            employeeCode: randomCode("FSO-", 5),
            region: region || null,
          },
        });
      }

      await tx.activityLog.create({
        data: { userId: createdUser.id, action: "REGISTER", entity: "user", entityId: createdUser.id, ipAddress: req.ip },
      });

      return createdUser;
    });

    const fullUser = await prisma.user.findUnique({ where: { id: user.id }, include: { role: true } });

    const accessToken = signAccessToken(fullUser);
    const refreshToken = signRefreshToken(fullUser);
    await prisma.user.update({ where: { id: fullUser.id }, data: { refreshToken, lastLoginAt: new Date() } });

    res.cookie(REFRESH_COOKIE, refreshToken, cookieOpts);

    const responseBody = {
      accessToken,
      user: {
        id: fullUser.id,
        name: fullUser.name,
        email: fullUser.email,
        role: fullUser.role.name,
        avatarUrl: fullUser.avatarUrl,
      },
    };

    if (role === "VENDOR") {
      responseBody.message = "Your seller account is pending Super Admin approval.";
    }

    res.status(201).json(responseBody);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create account. Please try again." });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    include: { role: true },
  });

  // Deliberately generic error to avoid leaking which emails exist.
  if (!user || user.deletedAt || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  if (!user.isActive) {
    return res.status(403).json({ error: "This account has been deactivated." });
  }

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { refreshToken, lastLoginAt: new Date() } }),
    prisma.activityLog.create({
      data: { userId: user.id, action: "LOGIN", entity: "user", entityId: user.id, ipAddress: req.ip },
    }),
  ]);

  res.cookie(REFRESH_COOKIE, refreshToken, cookieOpts);
  res.json({
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.name,
      avatarUrl: user.avatarUrl,
    },
  });
}

export async function refresh(req, res) {
  const token = req.cookies?.[REFRESH_COOKIE];
  if (!token) return res.status(401).json({ error: "No refresh token." });

  try {
    const payload = verifyRefreshToken(token);
    const user = await prisma.user.findUnique({ where: { id: payload.sub }, include: { role: true } });

    if (!user || user.refreshToken !== token) {
      return res.status(401).json({ error: "Refresh token is no longer valid." });
    }

    const accessToken = signAccessToken(user);
    res.json({ accessToken });
  } catch {
    return res.status(401).json({ error: "Refresh token expired." });
  }
}

export async function logout(req, res) {
  const token = req.cookies?.[REFRESH_COOKIE];
  if (token) {
    try {
      const payload = verifyRefreshToken(token);
      await prisma.user.update({ where: { id: payload.sub }, data: { refreshToken: null } }).catch(() => {});
    } catch {
      /* token already invalid, nothing to clean up */
    }
  }
  res.clearCookie(REFRESH_COOKIE);
  res.json({ ok: true });
}

export async function me(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { role: true },
  });
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role.name,
    avatarUrl: user.avatarUrl,
  });
}
