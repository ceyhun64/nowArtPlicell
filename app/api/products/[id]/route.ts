import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import fs from "fs/promises";
import path from "path";

// --- TypeScript Tipleri ---
interface ProductData {
  title: string;
  mainImage: string;
  subImage?: string;
  pricePerM2: number;
  rating: number;
  reviewCount?: number;
  category: string;
}

// --- GET /api/products/:id ---
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(params.id) },
    });

    if (!product) {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Ürünleri getirirken hata:", error);
    return NextResponse.json({ error: "Ürünler alınamadı" }, { status: 500 });
  }
}

// --- DELETE /api/products/:id ---
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Mevcut ürünü al
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(params.id) },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }

    // 2. Eski görselleri silme fonksiyonu
    const deleteFile = async (filePath?: string | null) => {
      if (!filePath) return;
      try {
        await fs.unlink(path.join(process.cwd(), "public", filePath));
      } catch {
        // Dosya yoksa veya hata olursa görmezden gel
      }
    };

    await deleteFile(existingProduct.mainImage);
    await deleteFile(existingProduct.subImage);

    // 3. Veritabanından sil
    const product = await prisma.product.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ product }, { status: 200 });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }
    console.error(error);
    return NextResponse.json({ error: "Ürün silinemedi" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();

    const title = formData.get("title")?.toString();
    const pricePerM2 = Number(formData.get("pricePerM2"));
    const rating = Number(formData.get("rating"));
    const reviewCount = Number(formData.get("reviewCount"));
    const category = formData.get("category")?.toString();

    const mainFile = formData.get("file") as Blob | null;
    const subFile = formData.get("subImageFile") as Blob | null;

    // 1. Mevcut ürünü al
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(params.id) },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }

    // 2. Eski görselleri sil
    const deleteOldFile = async (filePath?: string | null) => {
      if (!filePath) return;
      try {
        await fs.unlink(path.join(process.cwd(), "public", filePath));
      } catch {
        // Hata varsa görmezden gel
      }
    };

    let mainImageUrl: string = existingProduct.mainImage;
    let subImageUrl: string | undefined = existingProduct.subImage || undefined;

    // 3. Dosya kaydetme fonksiyonu
    const saveFile = async (
      file: Blob,
      folderName = "products"
    ): Promise<string> => {
      const safeFolder = folderName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "");
      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        safeFolder
      );
      await fs.mkdir(uploadDir, { recursive: true });

      // Dosya adını al
      const filename = `${Date.now()}-${(file as any).name || "file"}`;
      const filePath = path.join(uploadDir, filename);

      // Blob'u buffer'a çevir
      const arrayBuffer = await file.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(arrayBuffer));

      return `/uploads/${safeFolder}/${filename}`;
    };

    if (mainFile) {
      await deleteOldFile(existingProduct.mainImage);
      mainImageUrl = await saveFile(mainFile);
    }

    if (subFile) {
      await deleteOldFile(existingProduct.subImage);
      subImageUrl = await saveFile(subFile);
    }

    // 4. Veritabanını güncelle
    const updatedProduct = await prisma.product.update({
      where: { id: Number(params.id) },
      data: {
        title,
        pricePerM2,
        rating,
        reviewCount,
        category,
        mainImage: mainImageUrl,
        subImage: subImageUrl,
      },
    });

    return NextResponse.json({ product: updatedProduct }, { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Ürün güncellenemedi" }, { status: 500 });
  }
}
