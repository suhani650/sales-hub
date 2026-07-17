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
  for (const c of categoryData) {
    await prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: c });
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
