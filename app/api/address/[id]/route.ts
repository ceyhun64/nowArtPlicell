import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import type { NextRequest } from "next/server";

interface RouteParams {
  params: {
    id: string;
  };
}

// 📝 PATCH: Adresi güncelle
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = (await request.json()) as {
      title?: string;
      firstName?: string;
      lastName?: string;
      address?: string;
      district?: string;
      city?: string;
      zip?: string;
      phone?: string;
      country?: string;
    };

    const addressId = Number(id);
    if (isNaN(addressId)) {
      return NextResponse.json(
        { error: "Invalid address ID" },
        { status: 400 }
      );
    }

    const existingAddress = await prisma.address.findUnique({
      where: { id: addressId },
    });

    if (
      !existingAddress ||
      existingAddress.userId !== Number(session.user.id)
    ) {
      return NextResponse.json(
        { error: "Address not found or unauthorized" },
        { status: 404 }
      );
    }

    const updatedAddress = await prisma.address.update({
      where: { id: addressId },
      data: {
        title: body.title,
        firstName: body.firstName,
        lastName: body.lastName,
        address: body.address,
        district: body.district,
        city: body.city,
        zip: body.zip,
        phone: body.phone,
        country: body.country,
      },
    });

    return NextResponse.json({ address: updatedAddress });
  } catch (error) {
    console.error("Failed to update address:", error);
    return NextResponse.json(
      { error: "Failed to update address" },
      { status: 500 }
    );
  }
}

// ❌ DELETE: Adresi sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const addressId = Number(id);
    if (isNaN(addressId)) {
      return NextResponse.json(
        { error: "Invalid address ID" },
        { status: 400 }
      );
    }

    const existingAddress = await prisma.address.findUnique({
      where: { id: addressId },
    });

    if (
      !existingAddress ||
      existingAddress.userId !== Number(session.user.id)
    ) {
      return NextResponse.json(
        { error: "Address not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.address.delete({
      where: { id: addressId },
    });

    return NextResponse.json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Failed to delete address:", error);
    return NextResponse.json(
      { error: "Failed to delete address" },
      { status: 500 }
    );
  }
}
