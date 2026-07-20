import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:5000";

describe("Customer Address Book API", () => {
  const testEmail = "address_test_customer@saleshub.dev";
  let accessToken = "";
  let userId = null;
  let customerId = null;

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
        name: "Test Address User",
        email: testEmail,
        passwordHash,
        phone: "9876543210",
        roleId: roleRecord.id,
        isVerified: true,
        isActive: true,
        customer: {
          create: {
            referralCode: "ADRTST6",
          },
        },
      },
      include: {
        customer: true,
      },
    });
    userId = user.id;
    customerId = user.customer.id;

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

  it("should return empty list initially", async () => {
    const res = await request(BASE_URL)
      .get("/api/customer/addresses")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it("should reject adding address with invalid phone number", async () => {
    const res = await request(BASE_URL)
      .post("/api/customer/addresses")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "Home",
        recipientName: "John Doe",
        phone: "12345678", // Too short
        street: "123 Main Street",
        city: "Delhi",
        state: "Delhi",
        pincode: "110001",
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain("Phone number");
  });

  it("should reject adding address with invalid pincode", async () => {
    const res = await request(BASE_URL)
      .post("/api/customer/addresses")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "Home",
        recipientName: "John Doe",
        phone: "9876543210",
        street: "123 Main Street",
        city: "Delhi",
        state: "Delhi",
        pincode: "1100", // Too short
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain("Pincode");
  });

  it("should successfully add first address and make it default", async () => {
    const res = await request(BASE_URL)
      .post("/api/customer/addresses")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "Home Office",
        recipientName: "John Doe",
        phone: "9876543210",
        street: "123 Main Street",
        city: "New Delhi",
        state: "Delhi",
        pincode: "110001",
        isDefault: false, // First address should automatically override to true
      });

    expect(res.status).toBe(201);
    expect(res.body.address.title).toBe("Home Office");
    expect(res.body.address.isDefault).toBe(true);

    const saved = await prisma.address.findUnique({ where: { id: res.body.address.id } });
    expect(saved.isDefault).toBe(true);
  });

  it("should successfully add second address and reset default states if requested", async () => {
    // Add second address as default
    const res = await request(BASE_URL)
      .post("/api/customer/addresses")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "Work Place",
        recipientName: "John Work",
        phone: "9123456789",
        street: "Sector 62, Block C",
        city: "Noida",
        state: "Uttar Pradesh",
        pincode: "201301",
        isDefault: true,
      });

    expect(res.status).toBe(201);
    expect(res.body.address.isDefault).toBe(true);

    // Verify first address is no longer default
    const addresses = await prisma.address.findMany({ where: { customerId } });
    expect(addresses.length).toBe(2);
    
    const first = addresses.find((a) => a.title === "Home Office");
    const second = addresses.find((a) => a.title === "Work Place");
    
    expect(first.isDefault).toBe(false);
    expect(second.isDefault).toBe(true);
  });

  it("should successfully update address details", async () => {
    const addresses = await prisma.address.findMany({ where: { customerId } });
    const first = addresses.find((a) => a.title === "Home Office");

    const res = await request(BASE_URL)
      .put(`/api/customer/addresses/${first.id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "Main Home",
        recipientName: "John Doe Update",
        phone: "9876543210",
        street: "123 Main Street Suite 10",
        city: "New Delhi",
        state: "Delhi",
        pincode: "110001",
        isDefault: false,
      });

    expect(res.status).toBe(200);
    expect(res.body.address.title).toBe("Main Home");
    expect(res.body.address.recipientName).toBe("John Doe Update");
  });

  it("should auto re-assign default status to remaining address on deletion", async () => {
    const addresses = await prisma.address.findMany({ where: { customerId } });
    const defaultAddr = addresses.find((a) => a.isDefault);
    const nonDefaultAddr = addresses.find((a) => !a.isDefault);

    // Delete default address
    const res = await request(BASE_URL)
      .delete(`/api/customer/addresses/${defaultAddr.id}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.status).toBe(200);

    // Verify remaining nonDefaultAddress is promoted to default
    const updatedRemaining = await prisma.address.findUnique({ where: { id: nonDefaultAddr.id } });
    expect(updatedRemaining.isDefault).toBe(true);
  });
});
