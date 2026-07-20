import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:5000";

describe("Checkout API & Order Placement", () => {
  const testEmail = "test_checkout_user@saleshub.dev";
  const testPhone = "+917777777777";
  let accessToken = "";
  let testProductId = null;

  beforeAll(async () => {
    // 1. Clean up potential old test users & related orders
    const oldUser = await prisma.user.findFirst({
      where: { email: testEmail },
      include: { customer: true }
    });
    if (oldUser) {
      if (oldUser.customer) {
        await prisma.order.deleteMany({ where: { customerId: oldUser.customer.id } }).catch(() => {});
        await prisma.cart.deleteMany({ where: { customerId: oldUser.customer.id } }).catch(() => {});
      }
      await prisma.user.delete({ where: { id: oldUser.id } }).catch(() => {});
    }

    // 2. Query a product in the database to use for cart additions
    const product = await prisma.product.findFirst({
      where: { status: "ACTIVE" },
      include: { inventory: true }
    });
    if (product) {
      testProductId = product.id;
      // Ensure inventory exists and has stock
      if (product.inventory) {
        await prisma.inventory.update({
          where: { id: product.inventory.id },
          data: { quantity: 10 }
        });
      } else {
        await prisma.inventory.create({
          data: {
            productId: product.id,
            vendorId: product.vendorId,
            quantity: 10
          }
        });
      }
    }

    // 3. Register and verify a customer user
    await request(BASE_URL)
      .post("/api/auth/register")
      .send({
        name: "Test Checkout Customer",
        email: testEmail,
        phone: testPhone,
        password: "Passw0rd123!",
        role: "CUSTOMER",
      });

    const record = await prisma.otpVerification.findUnique({ where: { target: testEmail } });
    const verifyRes = await request(BASE_URL)
      .post("/api/auth/verify-signup")
      .send({
        email: testEmail,
        otp: record.otp,
      });

    accessToken = verifyRes.body.accessToken;
  });

  afterAll(async () => {
    // Clean up created user and orders
    const user = await prisma.user.findFirst({
      where: { email: testEmail },
      include: { customer: true }
    });
    if (user) {
      if (user.customer) {
        await prisma.order.deleteMany({ where: { customerId: user.customer.id } }).catch(() => {});
        await prisma.cart.deleteMany({ where: { customerId: user.customer.id } }).catch(() => {});
      }
      await prisma.user.delete({ where: { id: user.id } }).catch(() => {});
    }
    await prisma.$disconnect();
  });

  it("should fail checkout if the cart is empty", async () => {
    const res = await request(BASE_URL)
      .post("/api/customer/orders")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        shippingAddress: {
          fullName: "John Doe",
          phone: "9999999999",
          addressLine1: "123 Test Street",
          city: "New Delhi",
          state: "Delhi",
          pinCode: "110001",
        },
        deliveryMethod: "STANDARD",
        paymentMethod: "CARD",
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain("shopping cart is empty");
  });

  it("should reject checkout if address details are incomplete", async () => {
    // Add product to cart first
    if (testProductId) {
      await request(BASE_URL)
        .post("/api/customer/cart")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ productId: testProductId, quantity: 2 });
    }

    const res = await request(BASE_URL)
      .post("/api/customer/orders")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        shippingAddress: {
          fullName: "John Doe",
          phone: "9999999999",
          // missing addressLine1
          city: "New Delhi",
          state: "Delhi",
          pinCode: "110001",
        },
        deliveryMethod: "STANDARD",
        paymentMethod: "CARD",
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain("shipping address details are required");
  });

  it("should successfully place an order, decrement stock, and clear cart", async () => {
    if (!testProductId) {
      console.log("No test product available to verify successful placement.");
      return;
    }

    // Get current inventory before placement
    const productBefore = await prisma.product.findUnique({
      where: { id: testProductId },
      include: { inventory: true }
    });
    const beforeStock = productBefore.inventory.quantity;

    // Execute checkout
    const res = await request(BASE_URL)
      .post("/api/customer/orders")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        shippingAddress: {
          fullName: "Test Recipient",
          phone: "9876543210",
          addressLine1: "456 Cyber Hub, DLF Phase 3",
          city: "Gurugram",
          state: "Haryana",
          pinCode: "122002",
        },
        deliveryMethod: "EXPRESS",
        paymentMethod: "UPI",
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toContain("placed successfully");
    expect(res.body.order).toBeDefined();
    expect(res.body.order.orderNumber).toBeDefined();
    expect(parseFloat(res.body.order.shippingTotal)).toBe(250.00); // Express charges

    // Verify stock is decremented
    const productAfter = await prisma.product.findUnique({
      where: { id: testProductId },
      include: { inventory: true }
    });
    expect(productAfter.inventory.quantity).toBe(beforeStock - 2); // Decremented by 2 (quantity added to cart in previous test)

    // Verify cart is cleared
    const customer = await prisma.customer.findUnique({
      where: { userId: (await prisma.user.findFirst({ where: { email: testEmail } })).id },
      include: {
        carts: {
          include: {
            items: true
          }
        }
      }
    });
    const cartItems = customer.carts && customer.carts[0] ? customer.carts[0].items : [];
    expect(cartItems.length).toBe(0);

    // Verify orders history includes new order
    const historyRes = await request(BASE_URL)
      .get("/api/customer/orders")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(historyRes.status).toBe(200);
    expect(historyRes.body.length).toBeGreaterThanOrEqual(1);
    expect(historyRes.body[0].orderNumber).toBe(res.body.order.orderNumber);
  });

  it("should successfully cancel a PENDING order and restore stock quantities", async () => {
    if (!testProductId) {
      console.log("No test product available to verify cancellation.");
      return;
    }

    // 1. Fetch current order from history to get ID
    const historyRes = await request(BASE_URL)
      .get("/api/customer/orders")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(historyRes.status).toBe(200);
    const pendingOrder = historyRes.body.find(o => o.status === "PENDING");
    if (!pendingOrder) {
      console.log("No pending order found in history to cancel.");
      return;
    }

    // Get current inventory stock before cancelling
    const productBefore = await prisma.product.findUnique({
      where: { id: testProductId },
      include: { inventory: true }
    });
    const beforeStock = productBefore.inventory.quantity;

    // 2. Call cancel endpoint
    const cancelRes = await request(BASE_URL)
      .put(`/api/customer/orders/${pendingOrder.id}/cancel`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(cancelRes.status).toBe(200);
    expect(cancelRes.body.message).toContain("cancelled successfully");
    expect(cancelRes.body.order.status).toBe("CANCELLED");

    // 3. Verify stock is incremented back by the trigger
    const productAfter = await prisma.product.findUnique({
      where: { id: testProductId },
      include: { inventory: true }
    });
    // The previous order had 2 items of testProductId
    expect(productAfter.inventory.quantity).toBe(beforeStock + 2);
  });
});
