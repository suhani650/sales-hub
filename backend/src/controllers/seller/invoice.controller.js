import prisma from "../../config/prisma.js";

// Create Invoice

export const createInvoice = async (req, res) => {
  try {
    const { orderId, subtotal, tax, shipping, total } = req.body;

    const invoice = await prisma.invoice.create({
      data: {
        orderId,
        subtotal,
        tax,
        shipping,
        total,
        invoiceNumber: `INV-${Date.now()}`,
      },
    });

    res.status(201).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Get All

export const getInvoices = async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        order: true,
      },
    });

    res.json({
      success: true,
      data: invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Get Invoice

export const getInvoice = async (req, res) => {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Delete

export const deleteInvoice = async (req, res) => {
  try {
    await prisma.invoice.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Analytics

export const invoiceAnalytics = async (req, res) => {
  try {
    const totalInvoices = await prisma.invoice.count();

    const amount = await prisma.invoice.aggregate({
      _sum: {
        total: true,
      },
    });

    res.json({
      success: true,
      data: {
        totalInvoices,
        totalAmount: amount._sum.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};
