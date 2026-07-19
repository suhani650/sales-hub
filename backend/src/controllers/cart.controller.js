import { prisma } from "../config/prisma.js";

export async function getCart(req, res) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { userId: req.user.id },
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer profile not found." });
    }

    // Find or create cart
    let cart = await prisma.cart.findFirst({
      where: { customerId: customer.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
                brand: true,
              },
            },
          },
          orderBy: { id: "asc" },
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { customerId: customer.id },
        include: {
          items: true,
        },
      });
    }

    res.json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}

export async function addToCart(req, res) {
  const { productId, quantity = 1 } = req.body;

  try {
    const customer = await prisma.customer.findUnique({
      where: { userId: req.user.id },
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer profile not found." });
    }

    const pId = parseInt(productId);
    const qty = parseInt(quantity);

    if (isNaN(pId) || isNaN(qty) || qty <= 0) {
      return res.status(400).json({ error: "Invalid product ID or quantity." });
    }

    // Check if product is active
    const product = await prisma.product.findUnique({
      where: { id: pId },
    });

    if (!product || product.status !== "ACTIVE") {
      return res.status(404).json({ error: "Product not found or inactive." });
    }

    // Find or create cart
    let cart = await prisma.cart.findFirst({
      where: { customerId: customer.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { customerId: customer.id },
      });
    }

    // Upsert cart item
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: pId,
      },
    });

    let item;
    if (existingItem) {
      item = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + qty },
      });
    } else {
      item = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: pId,
          quantity: qty,
        },
      });
    }

    res.json({ message: "Product added to cart.", item });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}

export async function removeFromCart(req, res) {
  const { id } = req.params; // CartItem ID

  try {
    const customer = await prisma.customer.findUnique({
      where: { userId: req.user.id },
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer profile not found." });
    }

    const itemId = parseInt(id);

    // Verify cart item belongs to this customer's cart
    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true },
    });

    if (!item || item.cart.customerId !== customer.id) {
      return res.status(404).json({ error: "Cart item not found." });
    }

    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    res.json({ message: "Cart item removed successfully." });
  } catch (err) {
    console.error("Error removing from cart:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}

export async function updateCartItemQuantity(req, res) {
  const { id } = req.params; // CartItem ID
  const { quantity } = req.body;

  try {
    const customer = await prisma.customer.findUnique({
      where: { userId: req.user.id },
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer profile not found." });
    }

    const itemId = parseInt(id);
    const qty = parseInt(quantity);

    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ error: "Quantity must be a positive integer." });
    }

    // Verify cart item belongs to this customer's cart
    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true },
    });

    if (!item || item.cart.customerId !== customer.id) {
      return res.status(404).json({ error: "Cart item not found." });
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: qty },
    });

    res.json({ message: "Cart item quantity updated.", item: updatedItem });
  } catch (err) {
    console.error("Error updating cart item quantity:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}
