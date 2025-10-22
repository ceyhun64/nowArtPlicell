import { PrismaClient, UserRole } from "../lib/generated/prisma/index.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const adminEmail: string | undefined = process.env.ADMIN_EMAIL;
  const adminPassword: string | undefined = process.env.ADMIN_PASSWORD;
  const adminName: string | undefined = process.env.ADMIN_NAME;
  const adminSurname: string | undefined = process.env.ADMIN_SURNAME;

  // .env eksikse işlemi sessizce sonlandır
  if (!adminEmail || !adminPassword || !adminName || !adminSurname) {
    return;
  }

  try {
    // Admin zaten var mı kontrol et
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    // Zaten varsa işlem yapma
    if (existingAdmin) return;

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Yeni admin oluştur
    await prisma.user.create({
      data: {
        name: adminName,
        surname: adminSurname,
        email: adminEmail,
        password: hashedPassword,
        role: UserRole.ADMIN, // ✅ Enum kullanımı (type-safe)
      },
    });
  } catch (error) {
    // Hata oluşursa sessiz geç
    return;
  } finally {
    await prisma.$disconnect();
  }
}

main();
