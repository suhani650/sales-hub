import prisma from "../../config/prisma.js";

import { Parser } from "json2csv";

export const exportProducts = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    const products = await prisma.product.findMany({
      where: {
        vendorId: vendor.id,
      },
    });

    const parser = new Parser();

    const csv = parser.parse(products);

    res.header("Content-Type", "text/csv");

    res.attachment("products.csv");

    return res.send(csv);
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};
