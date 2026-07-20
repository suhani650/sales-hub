import prisma from "../../config/prisma.js";

// -----------------------------------------------------------------------
// Transaction/Payment/Order do NOT carry a direct vendorId — a single order
// can contain items from multiple vendors. The real vendor scope lives on
// OrderItem.vendorId, so every query below reaches the vendor's transactions
// through Transaction -> Payment -> Order -> items(some vendorId).
// -----------------------------------------------------------------------
const vendorTxnFilter = (vendorId, type) => ({
  ...(type ? { type } : {}),
  payment: {
    order: {
      items: { some: { vendorId } },
    },
  },
});

async function getVendorOrFail(req, res) {
  const vendor = await prisma.vendor.findUnique({
    where: { userId: req.user.id },
  });

  if (!vendor) {
    res.status(404).json({ success: false, message: "Vendor not found" });
    return null;
  }

  return vendor;
}

export const getTransactions = async (req, res) => {
  try {
    const vendor = await getVendorOrFail(req, res);
    if (!vendor) return;

    const transactions = await prisma.transaction.findMany({
      where: vendorTxnFilter(vendor.id),
      include: {
        payment: {
          include: {
            order: {
              include: {
                customer: { include: { user: true } },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    const data = transactions.map((t) => ({
      id: `TXN-${t.id}`,
      type: (t.type || "charge").toUpperCase(),
      orderId: t.payment?.order?.orderNumber || "-",
      customer: t.payment?.order?.customer?.user?.name || "Customer",
      amount: Number(t.amount),
      method: (t.payment?.provider || "N/A").toUpperCase(),
      status: (t.payment?.status || "PENDING").toUpperCase(),
      date: t.createdAt,
    }));

    res.json({ success: true, data });
  } catch (error) {
    console.error("getTransactions error:", error);
    res.status(500).json({
      success: false,
      message: "Transaction fetch failed",
    });
  }
};

export const getPayouts = async (req, res) => {
  try {
    const vendor = await getVendorOrFail(req, res);
    if (!vendor) return;

    // Payouts are transactions of type "payout" settled against the
    // vendor's configured bank account.
    const payouts = await prisma.transaction.findMany({
      where: vendorTxnFilter(vendor.id, "payout"),
      include: { payment: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const data = payouts.map((p) => {
      const paymentStatus = p.payment?.status;
      const status =
        paymentStatus === "SUCCESS"
          ? "COMPLETED"
          : paymentStatus === "FAILED"
            ? "FAILED"
            : "UPCOMING";

      return {
        id: `PAY-${p.id}`,
        amount: Number(p.amount),
        bank: vendor.bankName || "Bank Not Configured",
        date: p.createdAt,
        status,
      };
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error("getPayouts error:", error);
    res.status(500).json({
      success: false,
      message: "Payout fetch failed",
    });
  }
};

function parseMeta(raw) {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export const getRefunds = async (req, res) => {
  try {
    const vendor = await getVendorOrFail(req, res);
    if (!vendor) return;

    const refunds = await prisma.transaction.findMany({
      where: vendorTxnFilter(vendor.id, "refund"),
      include: {
        payment: {
          include: {
            order: {
              include: {
                customer: { include: { user: true } },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    const data = refunds.map((r) => {
      const meta = parseMeta(r.meta);

      return {
        id: `REF-${r.id}`,
        orderId: r.payment?.order?.orderNumber || "-",
        customer: r.payment?.order?.customer?.user?.name || "Customer",
        amount: Number(r.amount),
        reason: meta.reason || "Refund requested",
        status: meta.status || "PENDING",
        date: r.createdAt,
      };
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error("getRefunds error:", error);
    res.status(500).json({
      success: false,
      message: "Refund fetch failed",
    });
  }
};

export const updateRefundStatus = async (req, res) => {
  try {
    const vendor = await getVendorOrFail(req, res);
    if (!vendor) return;

    const { id } = req.params;
    const { status } = req.body;

    if (!["APPROVED", "REJECTED", "PENDING"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const txnId = Number(String(id).replace(/^REF-/, ""));

    const txn = await prisma.transaction.findFirst({
      where: { id: txnId, ...vendorTxnFilter(vendor.id, "refund") },
    });

    if (!txn) {
      return res.status(404).json({
        success: false,
        message: "Refund not found",
      });
    }

    const meta = parseMeta(txn.meta);
    meta.status = status;

    await prisma.transaction.update({
      where: { id: txn.id },
      data: { meta: JSON.stringify(meta) },
    });

    if (status === "APPROVED") {
      await prisma.payment.update({
        where: { id: txn.paymentId },
        data: { status: "REFUNDED" },
      });
    }

    res.json({ success: true, data: { id: `REF-${txn.id}`, status } });
  } catch (error) {
    console.error("updateRefundStatus error:", error);
    res.status(500).json({
      success: false,
      message: "Refund update failed",
    });
  }
};

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getTaxReports = async (req, res) => {
  try {
    const vendor = await getVendorOrFail(req, res);
    if (!vendor) return;

    const charges = await prisma.transaction.findMany({
      where: vendorTxnFilter(vendor.id, "charge"),
      select: { amount: true, createdAt: true },
    });

    const byMonth = new Map();
    for (const t of charges) {
      const d = new Date(t.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      byMonth.set(key, (byMonth.get(key) || 0) + Number(t.amount));
    }

    const now = new Date();
    const currentKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    const data = Array.from(byMonth.entries())
      .sort((a, b) => (a[0] < b[0] ? 1 : -1))
      .slice(0, 12)
      .map(([key, revenue]) => {
        const [year, month] = key.split("-").map(Number);
        // GST @ 18% on gross revenue, TDS @ 1% under e-commerce GST rules —
        // same formula the finance-analytics summary uses for GST liability.
        const gstCollected = Math.round(revenue * 0.18);
        const tdsDeducted = Math.round(revenue * 0.01);
        const liability = gstCollected - tdsDeducted;
        const isFiled = key < currentKey;

        return {
          id: `GST-${key.replace("-", "")}`,
          period: `${MONTH_NAMES[month - 1]} ${year}`,
          gstCollected,
          tdsDeducted,
          liability,
          status: isFiled ? "FILED" : "PENDING",
          filingDate: isFiled ? new Date(year, month, 5).toISOString() : null,
        };
      });

    res.json({ success: true, data });
  } catch (error) {
    console.error("getTaxReports error:", error);
    res.status(500).json({
      success: false,
      message: "Tax report fetch failed",
    });
  }
};

export const financeAnalytics = async (req, res) => {
  try {
    const vendor = await getVendorOrFail(req, res);
    if (!vendor) return;

    const [chargeAgg, refundAgg, payoutAgg, txnCount] = await Promise.all([
      prisma.transaction.aggregate({
        where: vendorTxnFilter(vendor.id, "charge"),
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: vendorTxnFilter(vendor.id, "refund"),
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: vendorTxnFilter(vendor.id, "payout"),
        _sum: { amount: true },
      }),
      prisma.transaction.count({
        where: vendorTxnFilter(vendor.id),
      }),
    ]);

    const grossRevenue = Number(chargeAgg._sum.amount || 0);
    const refundAmount = Number(refundAgg._sum.amount || 0);
    const payoutAmount = Number(payoutAgg._sum.amount || 0);
    const commissionPct = Number(vendor.commissionPct || 0);
    const platformFees = Math.round((grossRevenue * commissionPct) / 100);
    const netProfit = Math.max(grossRevenue - platformFees - refundAmount, 0);
    const gstLiability = Math.round(grossRevenue * 0.18);
    const pendingPayout = Math.max(netProfit - payoutAmount, 0);

    res.json({
      success: true,
      data: {
        revenue: grossRevenue,
        payouts: payoutAmount,
        pendingPayout,
        refunds: refundAmount,
        platformFees,
        netProfit,
        gstLiability,
        transactionCount: txnCount,
        commissionPct,
        gstNumber: vendor.gstNumber,
        bankName: vendor.bankName,
        bankVerified: Boolean(vendor.accountNumber && vendor.ifscCode),
      },
    });
  } catch (error) {
    console.error("financeAnalytics error:", error);
    res.status(500).json({
      success: false,
      message: "Analytics fetch failed",
    });
  }
};
