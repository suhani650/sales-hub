import { prisma } from "../config/prisma.js";

export async function getCustomerProfile(req, res) {
  try {
    // Find the customer associated with the logged-in user
    const customer = await prisma.customer.findUnique({
      where: { userId: req.user.id },
      include: {
        orders: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer profile not found." });
    }

    res.json({
      referralCode: customer.referralCode,
      points: customer.points,
      createdAt: customer.createdAt,
      orders: customer.orders,
    });
  } catch (err) {
    console.error("Error fetching customer profile:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}
