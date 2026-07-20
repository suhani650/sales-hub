import { prisma } from "../config/prisma.js";

// Helper function to generate a unique structured order number (e.g. SH-8F9D2A3B)
function generateOrderNumber() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SH-${result}`;
}

export async function createOrder(req, res) {
  const userId = req.user.id;
  const { shippingAddress, deliveryMethod, paymentMethod } = req.body;

  if (!shippingAddress) {
    return res.status(400).json({ error: "Shipping address is required." });
  }

  // Expect address fields: fullName, phone, addressLine1, city, state, pinCode
  const { fullName, phone, addressLine1, addressLine2, city, state, pinCode } = shippingAddress;
  if (!fullName || !phone || !addressLine1 || !city || !state || !pinCode) {
    return res.status(400).json({ error: "Complete shipping address details are required." });
  }

  // Type & Format Validations (Security & Integrity Checks)
  if (typeof fullName !== "string" || fullName.trim().length < 3 || fullName.trim().length > 100) {
    return res.status(400).json({ error: "Full Name must be between 3 and 100 characters." });
  }
  if (!/^[a-zA-Z\s]+$/.test(fullName.trim())) {
    return res.status(400).json({ error: "Full Name must contain only letters and spaces." });
  }

  if (typeof phone !== "string" || !/^[6-9]\d{9}$/.test(phone.trim())) {
    return res.status(400).json({ error: "Phone number must be a valid 10-digit number starting with 6-9." });
  }

  if (typeof addressLine1 !== "string" || addressLine1.trim().length < 5 || addressLine1.trim().length > 150) {
    return res.status(400).json({ error: "Address Line 1 must be between 5 and 150 characters." });
  }
  if (/<script/i.test(addressLine1) || (addressLine2 && /<script/i.test(addressLine2))) {
    return res.status(400).json({ error: "Script injection strings are not allowed in Address." });
  }

  if (addressLine2 && (typeof addressLine2 !== "string" || addressLine2.trim().length > 150)) {
    return res.status(400).json({ error: "Address Line 2 cannot exceed 150 characters." });
  }

  if (typeof city !== "string" || city.trim().length < 2 || city.trim().length > 50) {
    return res.status(400).json({ error: "City name must be between 2 and 50 characters." });
  }
  if (!/^[a-zA-Z\s]+$/.test(city.trim())) {
    return res.status(400).json({ error: "City name must contain only letters and spaces." });
  }

  if (typeof pinCode !== "string" || !/^[1-9]\d{5}$/.test(pinCode.trim())) {
    return res.status(400).json({ error: "Pin Code must be a valid 6-digit Indian PIN code." });
  }

  if (deliveryMethod && !["STANDARD", "EXPRESS"].includes(deliveryMethod)) {
    return res.status(400).json({ error: "Invalid delivery method selected." });
  }

  if (paymentMethod && !["CARD", "UPI", "WALLET"].includes(paymentMethod)) {
    return res.status(400).json({ error: "Invalid payment method selected." });
  }

  try {
    // 1. Fetch customer details
    const customer = await prisma.customer.findUnique({
      where: { userId },
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer profile not found." });
    }

    // 2. Fetch cart items through Cart model
    const cart = await prisma.cart.findFirst({
      where: { customerId: customer.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                inventory: true,
              },
            },
          },
        },
      },
    });

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({ error: "Your shopping cart is empty." });
    }

    const cartItems = cart.items;

    // 3. Perform calculations
    let subtotal = 0;
    const itemsToCreate = [];

    for (const item of cartItems) {
      const productPrice = parseFloat(item.product.price);
      const lineTotal = productPrice * item.quantity;
      subtotal += lineTotal;

      // Check stock
      if (item.product.inventory && item.product.inventory.quantity < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for product: ${item.product.name}. Available: ${item.product.inventory.quantity}`,
        });
      }

      itemsToCreate.push({
        productId: item.productId,
        vendorId: item.product.vendorId,
        quantity: item.quantity,
        unitPrice: productPrice,
        lineTotal: lineTotal,
        commissionAmount: lineTotal * 0.10, // 10% commission default
      });
    }

    // Determine shipping charges
    // Standard: Free if subtotal > ₹5000, else ₹150.
    // Express: Flat ₹250.
    let shippingTotal = 0;
    if (deliveryMethod === "EXPRESS") {
      shippingTotal = 250;
    } else {
      shippingTotal = subtotal >= 5000 ? 0 : 150;
    }

    // Grand total: Subtotal + 18% GST + Shipping
    const taxTotal = subtotal * 0.18;
    const grandTotal = subtotal + taxTotal + shippingTotal;

    const addressString = `${fullName}, ${phone}, ${addressLine1}${
      shippingAddress.addressLine2 ? ", " + shippingAddress.addressLine2 : ""
    }, ${city}, ${state} - ${pinCode}`;

    const orderNumber = generateOrderNumber();

    // 4. Database Transaction
    const resultOrder = await prisma.$transaction(async (tx) => {
      // Create the order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerId: customer.id,
          status: "PENDING",
          subtotal,
          shippingTotal,
          grandTotal,
          shippingAddress: addressString,
          items: {
            create: itemsToCreate.map((item) => ({
              productId: item.productId,
              vendorId: item.vendorId,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              lineTotal: item.lineTotal,
              commissionAmount: item.commissionAmount,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      // Create Payment log
      await tx.payment.create({
        data: {
          orderId: newOrder.id,
          provider: paymentMethod || "MOCK",
          amount: grandTotal,
          status: "SUCCESS",
        },
      });

      return newOrder;
    });

    res.status(201).json({
      message: "Order placed successfully.",
      order: resultOrder,
    });
  } catch (err) {
    console.error("Checkout transaction error:", err);
    res.status(500).json({ error: "Failed to place order. Please try again." });
  }
}

export async function getCustomerOrders(req, res) {
  const userId = req.user.id;

  try {
    const customer = await prisma.customer.findUnique({
      where: { userId },
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer profile not found." });
    }

    const orders = await prisma.order.findMany({
      where: { customerId: customer.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                slug: true,
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ error: "Failed to load orders. Please try again." });
  }
}

export async function getOrderById(req, res) {
  const userId = req.user.id;
  const orderId = parseInt(req.params.id);

  if (isNaN(orderId)) {
    return res.status(400).json({ error: "Invalid order ID." });
  }

  try {
    const customer = await prisma.customer.findUnique({
      where: { userId },
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer profile not found." });
    }

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        customerId: customer.id,
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                slug: true,
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
            },
          },
        },
        payments: true,
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    res.json(order);
  } catch (err) {
    console.error("Fetch order by ID error:", err);
    res.status(500).json({ error: "Failed to load order details." });
  }
}

export async function cancelOrder(req, res) {
  const userId = req.user.id;
  const orderId = parseInt(req.params.id);

  if (isNaN(orderId)) {
    return res.status(400).json({ error: "Invalid order ID." });
  }

  try {
    const customer = await prisma.customer.findUnique({
      where: { userId },
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer profile not found." });
    }

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        customerId: customer.id,
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    if (order.status !== "PENDING") {
      return res.status(400).json({ error: `Cannot cancel order with status: ${order.status}. Only PENDING orders can be cancelled.` });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "CANCELLED",
      },
    });

    res.json({
      message: "Order cancelled successfully.",
      order: updatedOrder,
    });
  } catch (err) {
    console.error("Cancel order error:", err);
    res.status(500).json({ error: "Failed to cancel order. Please try again." });
  }
}
