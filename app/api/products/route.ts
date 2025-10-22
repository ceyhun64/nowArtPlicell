// GEREKLİ NEXT.js İTHALLERİ
import { NextResponse } from "next/server";
// ÖRNEK VERİTABANI KULLANIMI
import prisma from "@/lib/db";

// Dosya yükleme hizmetini çağırmak için gerekli fetch fonksiyonu
// NOT: Gerçek bir Next.js uygulamasında, sunucu tarafında fetch yerine
// doğrudan route.ts'deki mantığı buraya taşıyarak daha verimli çalışabilirsiniz.
// Ancak ayrılmış API rotası modelini korumak için fetch kullanıyoruz.

interface ProductData {
  title: string;
  // mainImage: string artık FormData'dan File olarak gelecek
  subImage?: string;
  pricePerM2: number;
  rating: number;
  reviewCount?: number;
  category: string;
}

// GET /api/products
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json({ products }, { status: 200 });
  } catch (error: any) {
    console.error("Prisma fetch error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

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

    // Alt görsel yükleme (opsiyonel)
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

    // Ürün verilerini al
    const productData: Omit<ProductData, "mainImage"> & { mainImage: string } =
      {
        title: formData.get("title") as string,
        mainImage: mainImagePath,
        subImage: subImagePath,
        pricePerM2: parseFloat(formData.get("pricePerM2") as string),
        rating: parseFloat(formData.get("rating") as string),
        category: formData.get("category") as string,
        reviewCount: formData.get("reviewCount")
          ? parseInt(formData.get("reviewCount") as string)
          : undefined,
      };

    // Prisma ile kaydet
    const product = await prisma.product.create({
      data: {
        title: productData.title,
        mainImage: productData.mainImage,
        subImage: productData.subImage,
        pricePerM2: productData.pricePerM2,
        rating: productData.rating,
        reviewCount: productData.reviewCount,
        category: productData.category,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error: any) {
    console.error("Ürün oluştururken hata:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
