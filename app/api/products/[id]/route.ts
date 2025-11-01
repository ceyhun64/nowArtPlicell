import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/db";
import fs from "fs/promises";
import path from "path";

// --- GET /api/products/:id ---
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
        subCategory: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(
      {
        product: {
          ...product,
          category: product.category.name,
          subCategory: product.subCategory?.name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ürünleri getirirken hata:", error);
    return NextResponse.json({ error: "Ürünler alınamadı" }, { status: 500 });
  }
}

// --- DELETE /api/products/:id ---
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }

    const deleteFile = async (filePath?: string | null) => {
      if (!filePath) return;
      try {
        await fs.unlink(path.join(process.cwd(), "public", filePath));
      } catch {}
    };

    await deleteFile(existingProduct.mainImage);
    await deleteFile(existingProduct.subImage);

    const product = await prisma.product.delete({
      where: { id: Number(id) },
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

// --- PUT /api/products/:id ---
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const formData = await request.formData();
    const mainFile = formData.get("file") as File | null;
    const subFile = formData.get("subImageFile") as File | null;

    const title = formData.get("title")?.toString();
    const pricePerM2 = parseFloat(formData.get("pricePerM2") as string);
    const rating = parseFloat(formData.get("rating") as string);
    const reviewCount = formData.get("reviewCount")
      ? parseInt(formData.get("reviewCount") as string)
      : undefined;

    const mainCategoryName = formData.get("category") as string;
    const subCategoryName = formData.get("subCategory") as string | null;

    if (!mainCategoryName) {
      return NextResponse.json(
        { success: false, error: "Ana kategori seçilmedi." },
        { status: 400 }
      );
    }

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
    if (subCategoryName && subCategoryName !== "null") {
      const subCategory = await prisma.subCategory.findFirst({
        where: { name: subCategoryName, categoryId: mainCategory.id },
      });
      if (!subCategory) {
        return NextResponse.json(
          { success: false, error: "Alt kategori bulunamadı." },
          { status: 404 }
        );
      }
      subCategoryId = subCategory.id;
    } else {
      // Alt kategori yoksa null gönder
      subCategoryId = undefined; // null yerine
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: "Ürün bulunamadı." },
        { status: 404 }
      );
    }

    const uploadFile = async (
      file: File | null
    ): Promise<string | undefined> => {
      if (!file) return undefined;
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const uploadForm = new FormData();
      uploadForm.append("file", file);
      uploadForm.append("folderName", "products");

      const res = await fetch(`${baseUrl}/api/upload`, {
        method: "POST",
        body: uploadForm,
      });
      const data = await res.json();
      return data.path;
    };

    const mainImagePath = mainFile
      ? await uploadFile(mainFile)
      : existingProduct.mainImage;
    const subImagePath = subFile
      ? await uploadFile(subFile)
      : existingProduct.subImage;

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        title,
        pricePerM2,
        rating,
        reviewCount,
        mainImage: mainImagePath,
        subImage: subImagePath,
        categoryId: mainCategory.id,
        subCategoryId,
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
          ...updatedProduct,
          category: updatedProduct.category.name,
          subCategory: updatedProduct.subCategory?.name,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Ürün güncellenirken hata:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Ürün güncellenemedi" },
      { status: 500 }
    );
  }
}
