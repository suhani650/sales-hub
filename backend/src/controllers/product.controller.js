import { prisma } from "../config/prisma.js";

export async function getProducts(req, res) {
  const { category, search, minPrice, maxPrice, sort, page = 1, limit = 6 } = req.query;

  try {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    // Filter build
    const where = {
      status: "ACTIVE",
    };

    if (category && category !== "all") {
      // Fetch selected category along with its subcategories
      const catRecord = await prisma.category.findUnique({
        where: { slug: category },
        include: { children: true },
      });

      if (catRecord) {
        const categoryIds = [catRecord.id, ...catRecord.children.map((c) => c.id)];
        where.categoryId = { in: categoryIds };
      }
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    // Sort build
    let orderBy = { createdAt: "desc" };
    if (sort === "price_asc") {
      orderBy = { price: "asc" };
    } else if (sort === "price_desc") {
      orderBy = { price: "desc" };
    } else if (sort === "name_asc") {
      orderBy = { name: "asc" };
    } else if (sort === "name_desc") {
      orderBy = { name: "desc" };
    }

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        orderBy,
        skip: offset,
        take: limitNum,
        include: {
          category: true,
          brand: true,
        },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      products,
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
    });
  } catch (err) {
    console.error("Error fetching customer products:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}

export async function getProductBySlug(req, res) {
  const { slug } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        brand: true,
        images: {
          orderBy: { sortOrder: "asc" },
        },
        reviews: {
          include: {
            customer: {
              include: {
                user: {
                  select: { name: true },
                },
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!product || product.status !== "ACTIVE") {
      return res.status(404).json({ error: "Product not found." });
    }

    res.json(product);
  } catch (err) {
    console.error("Error fetching product by slug:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}
