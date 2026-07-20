import prisma from "../../config/prisma.js";

const VALID_STATUSES = ["ACTIVE", "LOW_STOCK", "INACTIVE"];

// Get All Warehouses

export const getWarehouses = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    const warehouses = await prisma.warehouse.findMany({
      where: { vendorId: vendor.id },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      data: warehouses,
    });
  } catch (error) {
    console.error("getWarehouses error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Warehouses fetch failed",
    });
  }
};

// Warehouse Analytics (for the stat cards)

export const warehouseAnalytics = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    const warehouses = await prisma.warehouse.findMany({
      where: { vendorId: vendor.id },
    });

    const totals = warehouses.reduce(
      (acc, w) => {
        acc.stockUnits += w.stockUnits;
        acc.pendingDispatch += w.pendingDispatch;
        acc.completedOrders += w.completedOrders;
        return acc;
      },
      { stockUnits: 0, pendingDispatch: 0, completedOrders: 0 },
    );

    res.json({
      success: true,
      data: {
        totalWarehouses: warehouses.length,
        ...totals,
      },
    });
  } catch (error) {
    console.error("Warehouse analytics failed error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Warehouse analytics failed",
    });
  }
};

// Get Single Warehouse

export const getWarehouse = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    const warehouse = await prisma.warehouse.findFirst({
      where: { id: Number(req.params.id), vendorId: vendor.id },
    });

    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: "Warehouse not found",
      });
    }

    res.json({
      success: true,
      data: warehouse,
    });
  } catch (error) {
    console.error("Warehouse fetch failed error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Warehouse fetch failed",
    });
  }
};

// Create Warehouse

export const createWarehouse = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    const {
      name,
      location,
      stockUnits,
      pendingDispatch,
      completedOrders,
      status,
    } = req.body;

    if (!name || !location) {
      return res.status(400).json({
        success: false,
        message: "Name and location are required",
      });
    }

    const warehouse = await prisma.warehouse.create({
      data: {
        vendorId: vendor.id,
        name,
        location,
        stockUnits: Number(stockUnits) || 0,
        pendingDispatch: Number(pendingDispatch) || 0,
        completedOrders: Number(completedOrders) || 0,
        status: VALID_STATUSES.includes(status) ? status : "ACTIVE",
      },
    });

    res.status(201).json({
      success: true,
      data: warehouse,
    });
  } catch (error) {
    console.error("Warehouse creation failed error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Warehouse creation failed",
    });
  }
};

// Update Warehouse

export const updateWarehouse = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    const existing = await prisma.warehouse.findFirst({
      where: { id: Number(req.params.id), vendorId: vendor.id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Warehouse not found",
      });
    }

    const {
      name,
      location,
      stockUnits,
      pendingDispatch,
      completedOrders,
      status,
    } = req.body;

    const data = {};
    if (name !== undefined) data.name = name;
    if (location !== undefined) data.location = location;
    if (stockUnits !== undefined) data.stockUnits = Number(stockUnits) || 0;
    if (pendingDispatch !== undefined)
      data.pendingDispatch = Number(pendingDispatch) || 0;
    if (completedOrders !== undefined)
      data.completedOrders = Number(completedOrders) || 0;
    if (status !== undefined && VALID_STATUSES.includes(status))
      data.status = status;

    const warehouse = await prisma.warehouse.update({
      where: { id: Number(req.params.id) },
      data,
    });

    res.json({
      success: true,
      data: warehouse,
    });
  } catch (error) {
    console.error("Warehouse update failed error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Warehouse update failed",
    });
  }
};

// Delete Warehouse

export const deleteWarehouse = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    const result = await prisma.warehouse.deleteMany({
      where: { id: Number(req.params.id), vendorId: vendor.id },
    });

    if (result.count === 0) {
      return res.status(404).json({
        success: false,
        message: "Warehouse not found",
      });
    }

    res.json({
      success: true,
      message: "Warehouse deleted",
    });
  } catch (error) {
    console.error("Warehouse delete failed error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Warehouse delete failed",
    });
  }
};
