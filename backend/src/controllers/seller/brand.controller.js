import prisma from "../../config/prisma.js";

// Get Brands (paginated, searchable, filterable — server-side)
// Brands are shared master data (any vendor's products can reference them),
// so the list shows every brand. "Products" is the marketplace-wide count
// on that brand — it must match what deleteBrand checks, otherwise a brand
// can show "0 products" here yet still be blocked from deletion because
// other vendors have products under it.
export const getBrands = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { search, status, categoryId } = req.query;

    const where = {
      ...(status ? { status } : {}),
      ...(categoryId ? { categoryId: Number(categoryId) } : {}),
      ...(search ? { name: { contains: search } } : {}),
    };

    const [brands, total] = await Promise.all([
      prisma.brand.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: { select: { id: true, name: true } },
          _count: {
            select: {
              products: { where: { deletedAt: null } },
            },
          },
        },
      }),
      prisma.brand.count({ where }),
    ]);

    const data = brands.map((b) => ({
      id: b.id,
      name: b.name,
      logoUrl: b.logoUrl,
      website: b.website,
      status: b.status,
      category: b.category?.name ?? "Uncategorized",
      categoryId: b.categoryId,
      products: b._count.products,
      createdAt: b.createdAt,
    }));

    res.json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (error) {
    console.error("getBrands error:", error);
    res.status(500).json({ success: false, message: "Brands fetch failed" });
  }
};

// Get Brand Stats (used by the summary cards on the Brand Management page)
export const getBrandStats = async (req, res) => {
  try {
    const [total, approved, pending, review] = await Promise.all([
      prisma.brand.count(),
      prisma.brand.count({ where: { status: "APPROVED" } }),
      prisma.brand.count({ where: { status: "PENDING" } }),
      prisma.brand.count({ where: { status: "REVIEW" } }),
    ]);

    res.json({
      success: true,
      data: { total, approved, pending, review },
    });
  } catch (error) {
    console.error("getBrandStats error:", error);
    res.status(500).json({ success: false, message: "Brand stats failed" });
  }
};

// Get Single Brand
export const getBrand = async (req, res) => {
  try {
    const brand = await prisma.brand.findUnique({
      where: { id: Number(req.params.id) },
      include: { category: { select: { id: true, name: true } } },
    });

    if (!brand) {
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    }

    res.json({ success: true, data: brand });
  } catch (error) {
    console.error("getBrand error:", error);
    res.status(500).json({ success: false, message: "Brand fetch failed" });
  }
};

// Create Brand — a vendor registering a new brand starts out PENDING
// until an admin approves it, same lifecycle as vendor onboarding.
export const createBrand = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }

    const { name, categoryId, website, logoUrl } = req.body;

    const brand = await prisma.brand.create({
      data: {
        name,
        website: website || null,
        logoUrl: logoUrl || null,
        categoryId: categoryId ? Number(categoryId) : null,
        status: "PENDING",
        createdBy: vendor.id,
      },
      include: { category: { select: { id: true, name: true } } },
    });

    res.status(201).json({ success: true, data: brand });
  } catch (error) {
    console.error("createBrand error:", error);

    if (error.code === "P2002") {
      return res
        .status(409)
        .json({
          success: false,
          message: "A brand with this name already exists.",
        });
    }

    res.status(500).json({ success: false, message: "Brand creation failed" });
  }
};

// Update Brand
export const updateBrand = async (req, res) => {
  try {
    const existing = await prisma.brand.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    }

    const { name, categoryId, website, logoUrl, status } = req.body;

    const brand = await prisma.brand.update({
      where: { id: existing.id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(website !== undefined ? { website: website || null } : {}),
        ...(logoUrl !== undefined ? { logoUrl: logoUrl || null } : {}),
        ...(categoryId !== undefined
          ? { categoryId: categoryId ? Number(categoryId) : null }
          : {}),
        ...(status !== undefined ? { status } : {}),
      },
      include: { category: { select: { id: true, name: true } } },
    });

    res.json({ success: true, data: brand });
  } catch (error) {
    console.error("updateBrand error:", error);

    if (error.code === "P2002") {
      return res
        .status(409)
        .json({
          success: false,
          message: "A brand with this name already exists.",
        });
    }

    res.status(500).json({ success: false, message: "Brand update failed" });
  }
};

// Delete Brand — blocked while products still reference it, so catalog
// integrity can't be broken by an accidental click.
export const deleteBrand = async (req, res) => {
  try {
    const existing = await prisma.brand.findUnique({
      where: { id: Number(req.params.id) },
      include: { _count: { select: { products: true } } },
    });

    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    }

    if (existing._count.products > 0) {
      return res.status(409).json({
        success: false,
        message:
          "This brand has products linked to it. Reassign or remove those products before deleting the brand.",
      });
    }

    await prisma.brand.delete({ where: { id: existing.id } });

    res.json({ success: true, message: "Brand deleted" });
  } catch (error) {
    console.error("deleteBrand error:", error);
    res.status(500).json({ success: false, message: "Brand deletion failed" });
  }
};
