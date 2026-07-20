import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/tokens.js";
import { sendEmail } from "../utils/mail.js";

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

  if (!name || !email || !password || !role || !phone) {
    return res.status(400).json({ error: "Name, email, mobile number, password, and role are required." });
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

  try {
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { email: normalizedEmail },
          { phone: phone }
        ]
      }
    });

    if (existing) {
      if (existing.isVerified) {
        return res.status(409).json({ error: "An account with this email or phone number already exists." });
      } else {
        // Delete unverified user to reset registration flow
        await prisma.user.delete({ where: { id: existing.id } });
      }
    }

    const roleRow = await prisma.role.findUnique({ where: { name: role } });
    if (!roleRow) {
      return res.status(500).json({ error: "Role is not configured on the server." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Create user as inactive/unverified
    await prisma.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: {
          name,
          email: normalizedEmail,
          phone,
          passwordHash,
          roleId: roleRow.id,
          isActive: false,
          isVerified: false,
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
        data: { userId: createdUser.id, action: "REGISTER_PENDING", entity: "user", entityId: createdUser.id, ipAddress: req.ip },
      });
    });

    // Generate signup OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    await prisma.otpVerification.upsert({
      where: { target: normalizedEmail },
      update: { otp, expiresAt },
      create: { target: normalizedEmail, otp, expiresAt },
    });

    await sendEmail(
      normalizedEmail,
      "SALESHUB - Complete Your Account Registration",
      `<p>Thank you for signing up! Your verification OTP code is: <strong>${otp}</strong>.</p><p>This code is valid for 10 minutes.</p>`
    );

    res.status(200).json({ message: "OTP sent to your email address. Please verify.", email: normalizedEmail });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not initiate registration. Please try again." });
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
    phone: user.phone,
    role: user.role.name,
    avatarUrl: user.avatarUrl,
  });
}

export async function verifySignup(req, res) {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email address and OTP are required." });
  }

  try {
    const normalizedEmail = email.toLowerCase();
    const record = await prisma.otpVerification.findUnique({ where: { target: normalizedEmail } });
    if (!record || record.otp !== otp || new Date() > record.expiresAt) {
      console.log("[OTP verification debug]:", {
        found: !!record,
        recordOtp: record?.otp,
        inputOtp: otp,
        isExpired: record ? new Date() > record.expiresAt : null,
        now: new Date().toISOString(),
        expiresAt: record?.expiresAt?.toISOString()
      });
      return res.status(400).json({ error: "Invalid or expired OTP." });
    }

    // Delete OTP record
    await prisma.otpVerification.delete({ where: { target: normalizedEmail } });

    // Activate user
    const user = await prisma.user.findFirst({
      where: { email: normalizedEmail },
      include: { role: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true, isActive: true },
    });

    // Generate JWT access & refresh tokens
    const fullUser = { ...updatedUser, role: user.role };
    const accessToken = signAccessToken(fullUser);
    const refreshToken = signRefreshToken(fullUser);

    await prisma.$transaction([
      prisma.user.update({ where: { id: fullUser.id }, data: { refreshToken, lastLoginAt: new Date() } }),
      prisma.activityLog.create({
        data: { userId: fullUser.id, action: "REGISTER_VERIFIED", entity: "user", entityId: fullUser.id, ipAddress: req.ip },
      }),
    ]);

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

    if (fullUser.role.name === "VENDOR") {
      responseBody.message = "Your seller account is pending Super Admin approval.";
    }

    res.status(201).json(responseBody);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not verify registration. Please try again." });
  }
}

export async function loginRequest(req, res) {
  const { target } = req.body;

  if (!target) {
    return res.status(400).json({ error: "Email or mobile number is required." });
  }

  try {
    const normalizedTarget = target.toLowerCase();
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: normalizedTarget },
          { phone: target },
        ],
        deletedAt: null,
      },
      include: { role: true },
    });

    if (!user) {
      return res.status(404).json({ error: "Account not found with this email or mobile number." });
    }

    if (!user.isVerified || !user.isActive) {
      return res.status(403).json({ error: "This account is not verified or has been deactivated." });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

    // Save in verification table using user's email
    await prisma.otpVerification.upsert({
      where: { target: user.email },
      update: { otp, expiresAt },
      create: { target: user.email, otp, expiresAt },
    });

    await sendEmail(
      user.email,
      "SALESHUB - Your Login OTP Code",
      `<p>Your SALESHUB login OTP verification code is: <strong>${otp}</strong>.</p><p>This code is valid for 5 minutes.</p>`
    );

    res.status(200).json({
      message: "OTP sent to your registered email address.",
      target: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not send login OTP. Please try again." });
  }
}

export async function loginVerify(req, res) {
  const { target, otp } = req.body;

  if (!target || !otp) {
    return res.status(400).json({ error: "Target and OTP are required." });
  }

  try {
    const record = await prisma.otpVerification.findUnique({ where: { target } });
    if (!record || record.otp !== otp || new Date() > record.expiresAt) {
      return res.status(400).json({ error: "Invalid or expired OTP." });
    }

    // Delete verification record
    await prisma.otpVerification.delete({ where: { target } });

    // Fetch user
    const normalizedTarget = target.toLowerCase();
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: normalizedTarget },
          { phone: target },
        ],
        deletedAt: null,
      },
      include: { role: true },
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ error: "User is no longer active." });
    }

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    await prisma.$transaction([
      prisma.user.update({ where: { id: user.id }, data: { refreshToken, lastLoginAt: new Date() } }),
      prisma.activityLog.create({
        data: { userId: user.id, action: "LOGIN_OTP", entity: "user", entityId: user.id, ipAddress: req.ip },
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not verify login OTP. Please try again." });
  }
}
