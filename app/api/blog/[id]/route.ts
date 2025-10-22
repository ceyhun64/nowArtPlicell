// app/api/blog/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import type { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

const BLOG_UPLOAD_DIR = path.join(process.cwd(), "public/upload/blogs");

async function deleteImage(fileName?: string) {
  if (!fileName) return;
  try {
    const filePath = path.join(BLOG_UPLOAD_DIR, fileName);
    await fs.unlink(filePath);
  } catch (err) {
    console.warn(`Resim silinirken hata: ${fileName}`, err);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const id = Number(params.id);
  if (isNaN(id))
    return NextResponse.json({ message: "Geçersiz ID" }, { status: 400 });

  try {
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog)
      return NextResponse.json({ message: "Blog bulunamadı" }, { status: 404 });

    // Resmi sil
    await deleteImage(blog.image);

    // Blogu veritabanından sil
    await prisma.blog.delete({ where: { id } });

    return NextResponse.json({ message: "Blog ve resmi silindi" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Blog silinirken hata oluştu" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const id = Number(params.id);
  if (isNaN(id))
    return NextResponse.json({ message: "Geçersiz ID" }, { status: 400 });

  const body = await req.json();
  const { title, content, image, category } = body;

  if (!title || !content || !category)
    return NextResponse.json({ message: "Eksik alanlar var" }, { status: 400 });

  try {
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog)
      return NextResponse.json({ message: "Blog bulunamadı" }, { status: 404 });

    // Eğer resim değiştiyse eskiyi sil
    if (image && blog.image && blog.image !== image) {
      await deleteImage(blog.image);
    }

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        content,
        image,
        category,
      },
    });

    return NextResponse.json({ blog: updatedBlog });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Blog güncellenirken hata oluştu" },
      { status: 500 }
    );
  }
}
