import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding roles...");
  const roleNames = ["SUPER_ADMIN", "VENDOR", "FIELD_SALES_OFFICER", "CUSTOMER"];
  const roles = {};
  for (const name of roleNames) {
    roles[name] = await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const passwordHash = await bcrypt.hash("Passw0rd!", 10);

  console.log("Seeding super admin...");
  await prisma.user.upsert({
    where: { email: "admin@saleshub.dev" },
    update: {},
    create: {
      name: "salesHub Admin",
      email: "admin@saleshub.dev",
      passwordHash,
      roleId: roles.SUPER_ADMIN.id,
      isVerified: true,
    },
  });

  console.log("Seeding categories...");
  const categoryData = [
    { name: "Electronics", slug: "electronics" },
    { name: "Fashion", slug: "fashion" },
    { name: "Home & Kitchen", slug: "home-kitchen" },
    { name: "Groceries", slug: "groceries" },
  ];
  const categories = [];
  for (const c of categoryData) {
    categories.push(await prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: c }));
  }

  console.log("Seeding vendors...");
  const vendorSeeds = [
    { name: "Aarav Mehta", store: "UrbanTech Store", slug: "urbantech-store", status: "APPROVED" },
    { name: "Priya Nair", store: "FreshMart Wholesale", slug: "freshmart-wholesale", status: "APPROVED" },
    { name: "Rohan Kapoor", store: "StyleHub Fashion", slug: "stylehub-fashion", status: "PENDING" },
  ];

  const vendors = [];
  for (const v of vendorSeeds) {
    const user = await prisma.user.upsert({
      where: { email: `${v.slug}@vendors.saleshub.dev` },
      update: {},
      create: {
        name: v.name,
        email: `${v.slug}@vendors.saleshub.dev`,
        passwordHash,
        roleId: roles.VENDOR.id,
        isVerified: true,
      },
    });
    const vendor = await prisma.vendor.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        storeName: v.store,
        storeSlug: v.slug,
        status: v.status,
        commissionPct: 12.5,
        rating: 4.2,
        city: "Bengaluru",
        state: "Karnataka",
      },
    });
    vendors.push(vendor);
  }

  console.log("Seeding products + inventory...");
  const productSeeds = [
    { name: "Wireless ANC Headphones", price: 4999, mrp: 6999, categoryIdx: 0, vendorIdx: 0 },
    { name: "Smart Fitness Band", price: 1999, mrp: 2999, categoryIdx: 0, vendorIdx: 0 },
    { name: "Organic Basmati Rice 5kg", price: 699, mrp: 899, categoryIdx: 3, vendorIdx: 1 },
    { name: "Cold-Pressed Coconut Oil 1L", price: 349, mrp: 449, categoryIdx: 3, vendorIdx: 1 },
    { name: "Men's Linen Shirt", price: 1299, mrp: 1899, categoryIdx: 1, vendorIdx: 2 },
  ];

  const products = [];
  for (const [i, p] of productSeeds.entries()) {
    const vendor = vendors[p.vendorIdx];
    const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const product = await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        vendorId: vendor.id,
        categoryId: categories[p.categoryIdx].id,
        name: p.name,
        slug,
        sku: `SKU-${1000 + i}`,
        price: p.price,
        mrp: p.mrp,
        status: "ACTIVE",
        description: `${p.name} — premium quality, sourced and fulfilled by ${vendor.storeName}.`,
      },
    });
    await prisma.inventory.upsert({
      where: { productId: product.id },
      update: {},
      create: { productId: product.id, vendorId: vendor.id, quantity: 100, lowStockAlert: 10 },
    });
    products.push(product);
  }

  console.log("Seeding a customer + sample order...");
  const customerUser = await prisma.user.upsert({
    where: { email: "customer@saleshub.dev" },
    update: {},
    create: {
      name: "Ishaan Verma",
      email: "customer@saleshub.dev",
      passwordHash,
      roleId: roles.CUSTOMER.id,
      isVerified: true,
    },
  });
  const customer = await prisma.customer.upsert({
    where: { userId: customerUser.id },
    update: {},
    create: { userId: customerUser.id, referralCode: "ISHAAN10" },
  });

  const order = await prisma.order.create({
    data: {
      orderNumber: `SH-${Date.now()}`,
      customerId: customer.id,
      status: "DELIVERED",
      subtotal: 4999,
      grandTotal: 4999,
      shippingAddress: "221B, HSR Layout, Bengaluru, KA 560102",
      items: {
        create: [
          {
            productId: products[0].id,
            vendorId: products[0].vendorId,
            quantity: 1,
            unitPrice: 4999,
            lineTotal: 4999,
            commissionAmount: 624.88,
          },
        ],
      },
    },
  });

  console.log("Seed complete.");
  console.log({ order: order.orderNumber });
  console.log("Login: admin@saleshub.dev / Passw0rd!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
