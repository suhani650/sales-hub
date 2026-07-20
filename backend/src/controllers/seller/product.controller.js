import prisma from "../../config/prisma.js";

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Categories & Brands for the Add Product form (real DB lookups, not a
// hardcoded list — vendors must pick a real categoryId/brandId to submit).
export const getCatalogMeta = async (req, res) => {
  try {
    const [categories, brands] = await Promise.all([
      prisma.category.findMany({
        where: { isActive: true },
        select: { id: true, name: true, parentId: true },
        orderBy: { name: "asc" },
      }),
      prisma.brand.findMany({
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      }),
    ]);

    res.json({ success: true, data: { categories, brands } });
  } catch (error) {
    console.error("getCatalogMeta error:", error);
    res.status(500).json({
      success: false,
      message: "Catalog fetch failed",
    });
  }
};

// Create Product
export const createProduct = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }

    let {
      name,
      description,
      categoryId,
      brandId,
      sku,
      price,
      mrp,
      stock,
      images, // expected as an array of URLs coming from the upload endpoint
      status,
    } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "name and price are required.",
      });
    }

    // Ensure a unique slug (same collision-avoidance pattern used for vendor stores).
    const baseSlug = slugify(name);
    let slug = baseSlug;
    let attempt = 0;
    while (await prisma.product.findUnique({ where: { slug } })) {
      attempt += 1;
      slug = `${baseSlug}-${attempt}`;
    }

    // Auto-generate missing parameters
    const finalSku = sku ? sku.trim() : `SKU-${baseSlug.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const finalMrp = mrp !== undefined && mrp !== null && mrp !== "" ? Number(mrp) : Number(price);
    
    let finalCategoryId = Number(categoryId);
    if (!finalCategoryId) {
      const firstCat = await prisma.category.findFirst({
        where: { parentId: { not: null } },
      }) || await prisma.category.findFirst();
      finalCategoryId = firstCat ? firstCat.id : 1;
    }

    const quantity = Number(stock) || 99;

    const product = await prisma.product.create({
      data: {
        vendorId: vendor.id,
        categoryId: finalCategoryId,
        brandId: brandId ? Number(brandId) : null,
        name,
        slug,
        description: description || null,
        sku: finalSku,
        price: Number(price),
        mrp: finalMrp,
        status: status || "DRAFT",
        images: {
          create: (Array.isArray(images) ? images : []).map((url, index) => ({
            url,
            isPrimary: index === 0,
          })),
        },
        inventory: {
          create: {
            vendorId: vendor.id,
            quantity,
          },
        },
      },
      include: { images: true, inventory: true, category: true },
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error(error);

    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ success: false, message: "SKU already exists." });
    }

    res
      .status(500)
      .json({ success: false, message: "Product creation failed" });
  }
};

// Get Products (paginated, searchable, filterable — server-side)
export const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const {
      search,
      status,
      categoryId,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }

    const where = {
      vendorId: vendor.id,
      deletedAt: null,
      ...(status ? { status } : {}),
      ...(categoryId ? { categoryId: Number(categoryId) } : {}),
      ...(search
        ? {
            OR: [{ name: { contains: search } }, { sku: { contains: search } }],
          }
        : {}),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { [sortBy]: sortOrder === "asc" ? "asc" : "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: { images: true, inventory: true, category: true },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Products fetch failed" });
  }
};

// Get Single Product
export const getProduct = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    const product = await prisma.product.findFirst({
      where: {
        id: Number(req.params.id),
        vendorId: vendor?.id,
        deletedAt: null,
      },
      include: { images: true, inventory: true, category: true, brand: true },
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Product fetch failed" });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    const existing = await prisma.product.findFirst({
      where: {
        id: Number(req.params.id),
        vendorId: vendor?.id,
        deletedAt: null,
      },
    });

    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const {
      name,
      description,
      categoryId,
      brandId,
      sku,
      price,
      mrp,
      status,
      stock,
    } = req.body;

    const product = await prisma.product.update({
      where: { id: existing.id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(categoryId !== undefined ? { categoryId: Number(categoryId) } : {}),
        ...(brandId !== undefined
          ? { brandId: brandId ? Number(brandId) : null }
          : {}),
        ...(sku !== undefined ? { sku } : {}),
        ...(price !== undefined ? { price: Number(price) } : {}),
        ...(mrp !== undefined ? { mrp: Number(mrp) } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(stock !== undefined
          ? {
              inventory: {
                upsert: {
                  create: { vendorId: vendor.id, quantity: Number(stock) },
                  update: { quantity: Number(stock) },
                },
              },
            }
          : {}),
      },
      include: { images: true, inventory: true, category: true },
    });

    res.json({ success: true, data: product });
  } catch (error) {
    console.error(error);

    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ success: false, message: "SKU already exists." });
    }

    res.status(500).json({ success: false, message: "Update failed" });
  }
};

// Delete Product (soft delete — keeps order history intact)
export const deleteProduct = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    const existing = await prisma.product.findFirst({
      where: {
        id: Number(req.params.id),
        vendorId: vendor?.id,
        deletedAt: null,
      },
    });

    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    await prisma.product.update({
      where: { id: existing.id },
      data: { deletedAt: new Date(), status: "ARCHIVED" },
    });

    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};

// Search Products
export const searchProducts = async (req, res) => {
  try {
    const q = req.query.q || "";

    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }

    const products = await prisma.product.findMany({
      where: {
        vendorId: vendor.id,
        deletedAt: null,
        OR: [{ name: { contains: q } }, { sku: { contains: q } }],
      },
      include: { images: true, inventory: true, category: true },
    });

    res.json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Search failed" });
  }
};
