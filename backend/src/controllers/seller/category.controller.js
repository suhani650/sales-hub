import prisma from "../../config/prisma.js";

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Get Categories (searchable, filterable — server-side)
// Categories are shared marketplace master data, so the list shows every
// category. "Products" is the marketplace-wide count in that category
// (not just this vendor's own) — it must match what deleteCategory checks,
// otherwise a category can show "0 products" here yet still be blocked
// from deletion because other vendors have products in it.
export const getCategories = async (req, res) => {
  try {
    const { search, isActive } = req.query;

    const where = {
      ...(isActive !== undefined ? { isActive: isActive === "true" } : {}),
      ...(search ? { name: { contains: search } } : {}),
    };

    const categories = await prisma.category.findMany({
      where,
      orderBy: { name: "asc" },
      include: {
        parent: { select: { id: true, name: true } },
        _count: {
          select: {
            products: { where: { deletedAt: null } },
            children: true,
          },
        },
      },
    });

    const data = categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      iconUrl: c.iconUrl,
      isActive: c.isActive,
      parentId: c.parentId,
      parentName: c.parent?.name ?? null,
      products: c._count.products,
      subcategories: c._count.children,
    }));

    res.json({ success: true, total: data.length, data });
  } catch (error) {
    console.error("getCategories error:", error);
    res
      .status(500)
      .json({ success: false, message: "Categories fetch failed" });
  }
};

// Get Category Stats (used by the summary cards on the page)
// "Products" here is this vendor's own catalog size — a different,
// intentionally vendor-scoped metric from the per-category counts above.
export const getCategoryStats = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }

    const [total, active, products] = await Promise.all([
      prisma.category.count(),
      prisma.category.count({ where: { isActive: true } }),
      prisma.product.count({
        where: { vendorId: vendor.id, deletedAt: null },
      }),
    ]);

    res.json({ success: true, data: { total, active, products } });
  } catch (error) {
    console.error("getCategoryStats error:", error);
    res.status(500).json({ success: false, message: "Category stats failed" });
  }
};

// Get Single Category
export const getCategory = async (req, res) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: Number(req.params.id) },
      include: { parent: { select: { id: true, name: true } } },
    });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.json({ success: true, data: category });
  } catch (error) {
    console.error("getCategory error:", error);
    res.status(500).json({ success: false, message: "Category fetch failed" });
  }
};

// Create Category
export const createCategory = async (req, res) => {
  try {
    const { name, parentId, iconUrl, isActive } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Category name is required." });
    }

    const baseSlug = slugify(name);
    let slug = baseSlug;
    let attempt = 0;
    while (await prisma.category.findUnique({ where: { slug } })) {
      attempt += 1;
      slug = `${baseSlug}-${attempt}`;
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        parentId: parentId ? Number(parentId) : null,
        iconUrl: iconUrl || null,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
      include: { parent: { select: { id: true, name: true } } },
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error("createCategory error:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "A category with this name already exists.",
      });
    }

    res
      .status(500)
      .json({ success: false, message: "Category creation failed" });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const existing = await prisma.category.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const { name, parentId, iconUrl, isActive } = req.body;

    if (
      parentId !== undefined &&
      parentId !== null &&
      Number(parentId) === existing.id
    ) {
      return res.status(400).json({
        success: false,
        message: "A category can't be its own parent.",
      });
    }

    const category = await prisma.category.update({
      where: { id: existing.id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(parentId !== undefined
          ? { parentId: parentId ? Number(parentId) : null }
          : {}),
        ...(iconUrl !== undefined ? { iconUrl: iconUrl || null } : {}),
        ...(isActive !== undefined ? { isActive: Boolean(isActive) } : {}),
      },
      include: { parent: { select: { id: true, name: true } } },
    });

    res.json({ success: true, data: category });
  } catch (error) {
    console.error("updateCategory error:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "A category with this name already exists.",
      });
    }

    res.status(500).json({ success: false, message: "Category update failed" });
  }
};

// Delete Category — blocked while products or subcategories still
// reference it, so catalog integrity can't be broken by an accidental click.
export const deleteCategory = async (req, res) => {
  try {
    const existing = await prisma.category.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        _count: { select: { products: true, children: true } },
      },
    });

    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    if (existing._count.products > 0) {
      return res.status(409).json({
        success: false,
        message:
          "This category has products linked to it. Reassign or remove those products before deleting the category.",
      });
    }

    if (existing._count.children > 0) {
      return res.status(409).json({
        success: false,
        message:
          "This category has subcategories. Delete or reassign them first.",
      });
    }

    await prisma.category.delete({ where: { id: existing.id } });

    res.json({ success: true, message: "Category deleted" });
  } catch (error) {
    console.error("deleteCategory error:", error);
    res
      .status(500)
      .json({ success: false, message: "Category deletion failed" });
  }
};
