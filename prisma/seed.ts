import { PrismaClient, UserRole } from "../lib/generated/prisma/index.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

//
// 👑 ADMIN SEED
//
async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME;
  const adminSurname = process.env.ADMIN_SURNAME;

  if (!adminEmail || !adminPassword || !adminName || !adminSurname) {
    console.log("⚠️ Admin .env bilgileri eksik, admin oluşturulmadı.");
    return;
  }

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("✅ Admin zaten mevcut, atlanıyor.");
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.create({
    data: {
      name: adminName,
      surname: adminSurname,
      email: adminEmail,
      password: hashedPassword,
      role: UserRole.ADMIN,
    },
  });

  console.log("👑 Admin başarıyla oluşturuldu.");
}

//
// 🧩 CATEGORY SEED
//
async function seedCategories() {
  const mainCategories = ["Plicell", "Zebra", "Stor", "Ahsap-Jaluzi"];
  const plicellSubs = [
    "Bella",
    "Valeria",
    "Spark",
    "Merlin",
    "Duble Linen",
    "Elegant",
    "Dimout",
    "Blackout",
    "Honeycomb20",
    "Honeycomb16",
  ];

  console.log("🪄 Ana kategoriler ekleniyor...");
  const createdMainCategories: Record<string, any> = {};

  for (const name of mainCategories) {
    let cat = await prisma.category.findFirst({ where: { name } });
    if (!cat) {
      cat = await prisma.category.create({ data: { name } });
      console.log(`✅ ${name} kategorisi eklendi.`);
    } else {
      console.log(`⚠️ ${name} zaten mevcut, atlanıyor.`);
    }
    createdMainCategories[name] = cat;
  }

  console.log("🧵 Plicell alt kategorileri ekleniyor...");
  const plicell = createdMainCategories["Plicell"];
  for (const name of plicellSubs) {
    const existing = await prisma.subCategory.findFirst({
      where: { name, categoryId: plicell.id },
    });
    if (!existing) {
      await prisma.subCategory.create({
        data: {
          name,
          categoryId: plicell.id,
        },
      });
      console.log(`   ➕ ${name} alt kategorisi eklendi.`);
    } else {
      console.log(`   ⚠️ ${name} zaten mevcut, atlanıyor.`);
    }
  }

  console.log("✅ Plicell alt kategorileri tamamlandı.");
}

//
// 🚀 MAIN SEED EXECUTION
//
async function main() {
  await seedAdmin();
  await seedCategories();
}

main()
  .then(() => {
    console.log("🎉 Seed işlemi başarıyla tamamlandı!");
  })
  .catch((e) => {
    console.error("🚨 Seed sırasında hata oluştu:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
