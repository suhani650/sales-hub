import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();
const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:5000";

describe("Customer Profile API", () => {
  const testEmail = "profile_test_customer@saleshub.dev";
  let accessToken = "";
  let userId = null;

  beforeAll(async () => {
    // 1. Clean up stale test user
    const existing = await prisma.user.findUnique({ where: { email: testEmail } });
    if (existing) {
      await prisma.user.delete({ where: { id: existing.id } });
    }

    // 2. Register test user
    const roleRecord = await prisma.role.findUnique({ where: { name: "CUSTOMER" } });
    const bcrypt = await import("bcryptjs");
    const passwordHash = await bcrypt.hash("Passw0rd!", 10);

    const user = await prisma.user.create({
      data: {
        name: "Test Profile User",
        email: testEmail,
        passwordHash,
        phone: "9876543210",
        roleId: roleRecord.id,
        isVerified: true,
        isActive: true,
        customer: {
          create: {
            referralCode: "PROFTST6",
          },
        },
      },
    });
    userId = user.id;

    // 3. Log in to get accessToken
    const loginRes = await request(BASE_URL)
      .post("/api/auth/login")
      .send({ email: testEmail, password: "Passw0rd!" });
    
    accessToken = loginRes.body.accessToken;
  });

  afterAll(async () => {
    // Teardown test user
    if (userId) {
      await prisma.user.delete({ where: { id: userId } }).catch(() => {});
    }
  });

  it("should fetch customer profile data successfully", async () => {
    const res = await request(BASE_URL)
      .get("/api/customer/profile")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body.referralCode).toBe("PROFTST6");
    expect(res.body.user).toBeDefined();
    expect(res.body.user.name).toBe("Test Profile User");
    expect(res.body.user.phone).toBe("9876543210");
  });

  it("should reject profile update with invalid characters in name", async () => {
    const res = await request(BASE_URL)
      .put("/api/customer/profile")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "User123!",
        phone: "9876543210",
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain("letters and spaces");
  });

  it("should reject profile update with invalid phone number length", async () => {
    const res = await request(BASE_URL)
      .put("/api/customer/profile")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Valid User Name",
        phone: "98765432", // Too short
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain("10-digit Indian number");
  });

  it("should update name and phone details successfully", async () => {
    const res = await request(BASE_URL)
      .put("/api/customer/profile")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Updated Name",
        phone: "9123456789",
      });

    expect(res.status).toBe(200);
    expect(res.body.user.name).toBe("Updated Name");
    expect(res.body.user.phone).toBe("9123456789");

    // Verify DB
    const dbUser = await prisma.user.findUnique({ where: { id: userId } });
    expect(dbUser.name).toBe("Updated Name");
    expect(dbUser.phone).toBe("9123456789");
  });

  it("should reject password change if old password is wrong", async () => {
    const res = await request(BASE_URL)
      .put("/api/customer/profile")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Updated Name",
        phone: "9123456789",
        oldPassword: "wrong-password",
        newPassword: "NewPassw0rd!",
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain("Incorrect current password");
  });

  it("should successfully update password when current matches", async () => {
    const res = await request(BASE_URL)
      .put("/api/customer/profile")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Updated Name",
        phone: "9123456789",
        oldPassword: "Passw0rd!",
        newPassword: "NewPassw0rd!",
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toContain("updated successfully");

    // Try logging in with the new password
    const loginRes = await request(BASE_URL)
      .post("/api/auth/login")
      .send({ email: testEmail, password: "NewPassw0rd!" });
    
    expect(loginRes.status).toBe(200);
    expect(loginRes.body.accessToken).toBeDefined();
  });

  it("should successfully upload profile avatar image using multipart", async () => {
    // Generate a dummy buffer representing an image file
    const buffer = Buffer.from("fake-binary-image-data-string");

    const res = await request(BASE_URL)
      .post("/api/customer/profile/avatar")
      .set("Authorization", `Bearer ${accessToken}`)
      .attach("avatar", buffer, "test-avatar.png");

    expect(res.status).toBe(200);
    expect(res.body.avatarUrl).toContain("/uploads/avatars/avatar-");
    expect(res.body.user.avatarUrl).toContain("/uploads/avatars/avatar-");

    // Clean up uploaded physical file
    const filePath = path.join(process.cwd(), "public", res.body.avatarUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });
});
