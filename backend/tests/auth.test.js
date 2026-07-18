import { describe, it, expect } from "vitest";
import request from "supertest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:5000";

describe("Auth API", () => {
  it("rejects login with missing credentials", async () => {
    const res = await request(BASE_URL).post("/api/auth/login").send({});
    expect(res.status).toBe(400);
  });

  it("rejects login with wrong password", async () => {
    const res = await request(BASE_URL)
      .post("/api/auth/login")
      .send({ email: "admin@saleshub.dev", password: "wrong-password" });
    expect(res.status).toBe(401);
  });

  it("logs in the seeded super admin successfully", async () => {
    const res = await request(BASE_URL)
      .post("/api/auth/login")
      .send({ email: "admin@saleshub.dev", password: "Passw0rd!" });
    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.user.role).toBe("SUPER_ADMIN");
  });

  it("blocks unauthenticated access to admin dashboard", async () => {
    const res = await request(BASE_URL).get("/api/admin/dashboard");
    expect(res.status).toBe(401);
  });

  it("registers a customer, sends email OTP, verifies OTP, and activates user", async () => {
    const phone = "+918888888888";
    const email = "otp_customer@saleshub.dev";

    // Clean up if previous tests failed
    await prisma.user.delete({ where: { email } }).catch(() => {});

    // Step 1: Initiate register
    const regRes = await request(BASE_URL)
      .post("/api/auth/register")
      .send({
        name: "Test OTP Customer",
        email,
        phone,
        password: "Passw0rd123!",
        role: "CUSTOMER",
      });
    expect(regRes.status).toBe(200);
    expect(regRes.body.message).toContain("OTP sent");

    // Step 2: Fetch OTP from DB (should be keyed by email)
    const record = await prisma.otpVerification.findUnique({ where: { target: email } });
    expect(record).toBeTruthy();
    expect(record.otp).toBeTruthy();

    // Step 3: Verify OTP
    const verifyRes = await request(BASE_URL)
      .post("/api/auth/verify-signup")
      .send({
        email,
        otp: record.otp,
      });
    expect(verifyRes.status).toBe(201);
    expect(verifyRes.body.accessToken).toBeTruthy();
    expect(verifyRes.body.user.role).toBe("CUSTOMER");

    // Clean up
    await prisma.user.delete({ where: { email } }).catch(() => {});
  });

  it("requests login OTP, sends OTP, verifies OTP, and logs in successfully", async () => {
    const email = "otp_login_test@saleshub.dev";
    const phone = "+919999999999";

    // Clean up if previous tests failed
    await prisma.user.delete({ where: { email } }).catch(() => {});

    const roleRow = await prisma.role.findUnique({ where: { name: "CUSTOMER" } });
    const user = await prisma.user.create({
      data: {
        name: "Login Test User",
        email,
        phone,
        passwordHash: "dummy",
        roleId: roleRow.id,
        isVerified: true,
        isActive: true,
      },
    });

    // Step 1: Request login OTP (using phone target)
    const reqRes = await request(BASE_URL)
      .post("/api/auth/login-request")
      .send({ target: phone });
    expect(reqRes.status).toBe(200);

    // Step 2: Fetch OTP from DB (should be keyed by email now)
    const record = await prisma.otpVerification.findUnique({ where: { target: email } });
    expect(record).toBeTruthy();

    // Step 3: Verify login OTP
    const verifyRes = await request(BASE_URL)
      .post("/api/auth/login-verify")
      .send({
        target: email,
        otp: record.otp,
      });
    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body.accessToken).toBeTruthy();

    // Clean up
    await prisma.user.delete({ where: { id: user.id } }).catch(() => {});
  });
});
