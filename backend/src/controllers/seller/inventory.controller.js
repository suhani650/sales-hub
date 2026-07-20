import prisma from "../../config/prisma.js";
import { notifyUser } from "../../services/notification.service.js";

// Get Inventory

export const getInventory = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const inventory = await prisma.inventory.findMany({
      where: {
        vendorId: vendor.id,
      },
      include: {
        product: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    res.json({
      success: true,
      data: inventory,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Inventory fetch failed",
    });
  }
};

// Get Single Inventory

export const getInventoryItem = async (req, res) => {
  try {
    const inventory = await prisma.inventory.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        product: true,
      },
    });

    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: "Inventory not found",
      });
    }

    res.json({
      success: true,
      data: inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Inventory fetch failed",
    });
  }
};

// Update Stock

export const updateStock = async (req, res) => {
  try {
    const { quantity, reserved, warehouseLocation } = req.body;

    const inventory = await prisma.inventory.update({
      where: {
        id: req.params.id,
      },
      data: {
        quantity: Number(quantity),
        reserved: Number(reserved),
        warehouseLocation,
      },
      include: { product: true },
    });

    // Real low-stock alert: fires a live notification the moment stock
    // drops to/below the item's configured threshold.
    if (inventory.quantity <= inventory.lowStockAlert) {
      await notifyUser({
        userId: req.user.id,
        title: "Low Stock Alert",
        body: `${inventory.product?.name ?? "A product"} has only ${inventory.quantity} unit(s) left in stock.`,
        type: "INVENTORY",
        io: req.app.get("io"),
      });
    }

    res.json({
      success: true,
      data: inventory,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Stock update failed",
    });
  }
};

// Bulk Stock Update

export const bulkUpdateStock = async (req, res) => {
  try {
    const updates = req.body.items;

    const results = await Promise.all(
      updates.map((item) =>
        prisma.inventory.update({
          where: {
            id: item.id,
          },
          data: {
            quantity: item.quantity,
          },
        }),
      ),
    );

    res.json({
      success: true,
      updated: results.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Bulk update failed",
    });
  }
};

// Low Stock Alerts

export const getLowStock = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const lowStock = await prisma.inventory.findMany({
      where: {
        vendorId: vendor.id,
        quantity: {
          lte: 10,
        },
      },
      include: {
        product: true,
      },
    });

    res.json({
      success: true,
      count: lowStock.length,
      data: lowStock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Low stock fetch failed",
    });
  }
};

// Inventory Analytics

export const inventoryAnalytics = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const totalItems = await prisma.inventory.count({
      where: {
        vendorId: vendor.id,
      },
    });

    const lowStock = await prisma.inventory.count({
      where: {
        vendorId: vendor.id,
        quantity: {
          lte: 10,
        },
      },
    });

    const outOfStock = await prisma.inventory.count({
      where: {
        vendorId: vendor.id,
        quantity: 0,
      },
    });

    res.json({
      success: true,
      data: {
        totalItems,
        lowStock,
        outOfStock,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Analytics failed",
    });
  }
};
