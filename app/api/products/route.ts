// GEREKLİ NEXT.js İTHALLERİ
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

interface ProductData {
  title: string;
  subImage?: string;
  pricePerM2: number;
  rating: number;
  reviewCount?: number;
  category: string;
  subCategory?: string;
}

// GET /api/products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        subCategory: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const formattedProducts = products.map((p) => ({
      id: p.id,
      title: p.title,
      pricePerM2: p.pricePerM2,
      rating: p.rating,
      reviewCount: p.reviewCount,
      mainImage: p.mainImage,
      subImage: p.subImage,
      category: p.category.name,
      subCategory: p.subCategory?.name || undefined,
      subCategoryId: p.subCategory?.id || undefined,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));

    return NextResponse.json({ products: formattedProducts }, { status: 200 });
  } catch (error: any) {
    console.error("Prisma fetch error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/products
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const mainFile = formData.get("file") as File | null;
    const subFile = formData.get("subImageFile") as File | null;

    if (!mainFile) {
      return NextResponse.json(
        { success: false, error: "Ürün ana görseli bulunamadı." },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Ana görsel yükleme
    const mainUploadForm = new FormData();
    mainUploadForm.append("file", mainFile);
    mainUploadForm.append("folderName", "products");
    const mainRes = await fetch(`${baseUrl}/api/upload`, {
      method: "POST",
      body: mainUploadForm,
    });
    const mainData = await mainRes.json();
    const mainImagePath = mainData.path;

    // Alt görsel yükleme
    let subImagePath: string | undefined;
    if (subFile) {
      const subUploadForm = new FormData();
      subUploadForm.append("file", subFile);
      subUploadForm.append("folderName", "products");
      const subRes = await fetch(`${baseUrl}/api/upload`, {
        method: "POST",
        body: subUploadForm,
      });
      const subData = await subRes.json();
      subImagePath = subData.path;
    }

    const title = formData.get("title") as string;
    const pricePerM2 = parseFloat(formData.get("pricePerM2") as string);
    const rating = parseFloat(formData.get("rating") as string);
    const reviewCount = formData.get("reviewCount")
      ? parseInt(formData.get("reviewCount") as string)
      : undefined;

    const mainCategoryName = formData.get("category") as string;
    const subCategoryName = formData.get("subCategory") as string | null;

    // Ana kategori bul
    const mainCategory = await prisma.category.findFirst({
      where: { name: mainCategoryName },
    });
    if (!mainCategory) {
      return NextResponse.json(
        { success: false, error: "Ana kategori bulunamadı." },
        { status: 404 }
      );
    }

    let subCategoryId: number | undefined = undefined;
    if (subCategoryName) {
      const subCategory = await prisma.subCategory.findFirst({
        where: {
          name: subCategoryName,
          categoryId: mainCategory.id,
        },
      });
      if (!subCategory) {
        return NextResponse.json(
          { success: false, error: "Alt kategori bulunamadı." },
          { status: 404 }
        );
      }
      subCategoryId = subCategory.id;
    }

    // Ürün oluştur
    const product = await prisma.product.create({
      data: {
        title,
        mainImage: mainImagePath,
        subImage: subImagePath,
        pricePerM2,
        rating,
        reviewCount,
        categoryId: mainCategory.id,
        subCategoryId, // null olabilir
      },
      include: {
        category: true,
        subCategory: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        product: {
          id: product.id,
          title: product.title,
          pricePerM2: product.pricePerM2,
          rating: product.rating,
          reviewCount: product.reviewCount,
          mainImage: product.mainImage,
          subImage: product.subImage,
          category: product.category.name,
          subCategory: product.subCategory?.name,
          createdAt: product.createdAt.toISOString(),
          updatedAt: product.updatedAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Ürün oluştururken hata:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
