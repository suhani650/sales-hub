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

  console.log("Seeding default approved vendor...");
  const vendorUser = await prisma.user.upsert({
    where: { email: "vendor@saleshub.dev" },
    update: {},
    create: {
      name: "Aarav Mehta",
      email: "vendor@saleshub.dev",
      passwordHash,
      roleId: roles.VENDOR.id,
      isVerified: true,
    },
  });

  const vendor = await prisma.vendor.upsert({
    where: { userId: vendorUser.id },
    update: {},
    create: {
      userId: vendorUser.id,
      storeName: "Tech & Style Co.",
      storeSlug: "tech-style-co",
      status: "APPROVED",
    },
  });

  console.log("Seeding brands...");
  const brandData = [
    { name: "Apex" },
    { name: "Sony" },
    { name: "Nike" },
    { name: "Samsung" },
    { name: "Ikea" }
  ];
  const brands = {};
  for (const b of brandData) {
    brands[b.name] = await prisma.brand.upsert({
      where: { name: b.name },
      update: {},
      create: b
    });
  }

  console.log("Seeding categories and subcategories...");
  const categoryTree = [
    {
      name: "Electronics",
      slug: "electronics",
      subcategories: [
        { name: "Mobiles & Accessories", slug: "mobiles-accessories" },
        { name: "Laptops & Computers", slug: "laptops-computers" },
        { name: "Audio & Headphones", slug: "audio-headphones" },
        { name: "Smart Wearables", slug: "smart-wearables" }
      ]
    },
    {
      name: "Fashion & Apparel",
      slug: "fashion-apparel",
      subcategories: [
        { name: "Men's Clothing", slug: "mens-clothing" },
        { name: "Women's Clothing", slug: "womens-clothing" },
        { name: "Footwear", slug: "footwear" },
        { name: "Watches & Accessories", slug: "watches-accessories" }
      ]
    },
    {
      name: "Home & Living",
      slug: "home-living",
      subcategories: [
        { name: "Furniture", slug: "furniture" },
        { name: "Home Decor", slug: "home-decor" },
        { name: "Kitchen Appliances", slug: "kitchen-appliances" },
        { name: "Bedding & Bath", slug: "bedding-bath" }
      ]
    },
    {
      name: "Groceries & Essentials",
      slug: "groceries-essentials",
      subcategories: [
        { name: "Fruits & Vegetables", slug: "fruits-vegetables" },
        { name: "Dairy & Eggs", slug: "dairy-eggs" },
        { name: "Beverages", slug: "beverages" },
        { name: "Cooking Essentials", slug: "cooking-essentials" }
      ]
    },
    {
      name: "Beauty & Personal Care",
      slug: "beauty-personal-care",
      subcategories: [
        { name: "Cosmetics & Makeup", slug: "cosmetics-makeup" },
        { name: "Hair Care", slug: "hair-care" },
        { name: "Skincare", slug: "skincare" },
        { name: "Fragrances", slug: "fragrances" }
      ]
    },
    {
      name: "Sports & Outdoors",
      slug: "sports-outdoors",
      subcategories: [
        { name: "Fitness Equipment", slug: "fitness-equipment" },
        { name: "Outdoor Recreation", slug: "outdoor-recreation" },
        { name: "Sportswear", slug: "sportswear" }
      ]
    },
    {
      name: "Books & Stationery",
      slug: "books-stationery",
      subcategories: [
        { name: "Fiction & Non-Fiction", slug: "fiction-nonfiction" },
        { name: "Office & School Supplies", slug: "office-school-supplies" }
      ]
    }
  ];

  const categories = {};
  const subcategoryList = [];
  for (const parent of categoryTree) {
    const parentRecord = await prisma.category.upsert({
      where: { slug: parent.slug },
      update: {},
      create: { name: parent.name, slug: parent.slug }
    });
    categories[parent.slug] = parentRecord;

    for (const child of parent.subcategories) {
      const childRecord = await prisma.category.upsert({
        where: { slug: child.slug },
        update: {},
        create: { name: child.name, slug: child.slug, parentId: parentRecord.id }
      });
      categories[child.slug] = childRecord;
      subcategoryList.push(childRecord);
    }
  }

  console.log("Generating 5 products in each subcategory programmatically...");
  const brandList = Object.values(brands);

  for (const subcat of subcategoryList) {
    for (let i = 1; i <= 5; i++) {
      const name = `${subcat.name} Pro ${String.fromCharCode(64 + i)}-${100 + i}`;
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const brand = brandList[Math.floor(Math.random() * brandList.length)];
      
      // Generate realistic price ranges
      const price = parseFloat((300 + Math.random() * 8000).toFixed(2));
      const mrp = parseFloat((price * (1.1 + Math.random() * 0.3)).toFixed(2));
      const sku = `${subcat.slug.slice(0, 4).toUpperCase()}-${brand.name.toUpperCase()}-${100 + i}`;

      await prisma.product.upsert({
        where: { slug },
        update: {},
        create: {
          name,
          slug,
          categoryId: subcat.id,
          brandId: brand.id,
          price,
          mrp,
          status: "ACTIVE",
          sku,
          description: `This is a premium grade ${name} engineered for superior performance in ${subcat.name.toLowerCase()}. Certified by ${brand.name} standards.`,
          vendorId: vendor.id,
        }
      });
    }
  }

  console.log("Seed complete.");
  console.log("Login: admin@saleshub.dev / Passw0rd!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
