import { PrismaClient } from "@/lib/generated/prisma";

declare global {
  // Global prisma tipini tanımlıyoruz (Node.js hot-reload fix için)
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma =
  process.env.NODE_ENV === "production"
    ? new PrismaClient()
    : global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
