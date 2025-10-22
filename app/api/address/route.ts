// app/api/address/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // tek prisma instance
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import type { NextRequest } from "next/server";

// 📍 GET: Kullanıcının adreslerini getir
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const addresses = await prisma.address.findMany({
      where: { userId: Number(session.user.id) },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ addresses });
  } catch (error) {
    console.error("Failed to fetch addresses:", error);
    return NextResponse.json(
      { error: "Failed to fetch addresses" },
      { status: 500 }
    );
  }
}

// 📦 POST: Yeni adres ekleme
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as {
      title?: string;
      firstName: string;
      lastName: string;
      address: string;
      district: string;
      city: string;
      zip?: string;
      phone?: string;
      country: string;
    };

    const { title, firstName, lastName, address, district, city, zip, phone, country } = body;

    if (!firstName || !lastName || !address || !district || !city || !country) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const newAddress = await prisma.address.create({
      data: {
        userId: Number(session.user.id),
        title: title || "Home",
        firstName,
        lastName,
        address,
        district,
        city,
        zip: zip || "",
        phone: phone || "",
        country,
      },
    });

    return NextResponse.json({ address: newAddress }, { status: 201 });
  } catch (error) {
    console.error("Failed to create address:", error);
    return NextResponse.json(
      { error: "Failed to create address" },
      { status: 500 }
    );
  }
}
