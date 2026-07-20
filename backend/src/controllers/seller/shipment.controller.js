import prisma from "../../config/prisma.js";

// Create Shipment

export const createShipment = async (req, res) => {
  try {
    const { orderId, trackingNumber, courierName } = req.body;

    const shipment = await prisma.shipment.create({
      data: {
        orderId,
        trackingNumber,
        courierName,
      },
    });

    res.status(201).json({
      success: true,
      data: shipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Shipment creation failed",
    });
  }
};

// Get Shipments

export const getShipments = async (req, res) => {
  try {
    const shipments = await prisma.shipment.findMany({
      include: {
        order: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: shipments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Shipment Details

export const getShipment = async (req, res) => {
  try {
    const shipment = await prisma.shipment.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        order: true,
      },
    });

    res.json({
      success: true,
      data: shipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Update Status

export const updateShipmentStatus = async (req, res) => {
  try {
    const shipment = await prisma.shipment.update({
      where: {
        id: req.params.id,
      },
      data: {
        shippingStatus: req.body.shippingStatus,
      },
    });

    res.json({
      success: true,
      data: shipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Analytics

export const shipmentAnalytics = async (req, res) => {
  try {
    const total = await prisma.shipment.count();

    const delivered = await prisma.shipment.count({
      where: {
        shippingStatus: "DELIVERED",
      },
    });

    const pending = await prisma.shipment.count({
      where: {
        shippingStatus: "PENDING",
      },
    });

    res.json({
      success: true,
      data: {
        total,
        delivered,
        pending,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};
