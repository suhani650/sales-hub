import prisma from "../../config/prisma.js";

// Create Ticket

export const createTicket = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const { subject, description, priority } = req.body;

    const ticket = await prisma.supportTicket.create({
      data: {
        vendorId: vendor.id,
        ticketNumber: `TKT-${Date.now()}`,
        subject,
        description,
        priority,
      },
    });

    res.status(201).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Ticket creation failed",
    });
  }
};

// Get All Tickets

export const getTickets = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const tickets = await prisma.supportTicket.findMany({
      where: {
        vendorId: vendor.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Get Ticket

export const getTicket = async (req, res) => {
  try {
    const ticket = await prisma.supportTicket.findUnique({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Update Status

export const updateTicketStatus = async (req, res) => {
  try {
    const ticket = await prisma.supportTicket.update({
      where: {
        id: req.params.id,
      },
      data: {
        status: req.body.status,
      },
    });

    res.json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Delete Ticket

export const deleteTicket = async (req, res) => {
  try {
    await prisma.supportTicket.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      success: true,
      message: "Ticket deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// Analytics

export const ticketAnalytics = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const total = await prisma.supportTicket.count({
      where: {
        vendorId: vendor.id,
      },
    });

    const open = await prisma.supportTicket.count({
      where: {
        vendorId: vendor.id,
        status: "OPEN",
      },
    });

    const closed = await prisma.supportTicket.count({
      where: {
        vendorId: vendor.id,
        status: "CLOSED",
      },
    });

    res.json({
      success: true,
      data: {
        total,
        open,
        closed,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};
