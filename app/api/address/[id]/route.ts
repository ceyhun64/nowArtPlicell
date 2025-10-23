import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // 👈 dikkat!
) {
  const { id } = await context.params; // 👈 params artık Promise
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

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
      data: body,
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

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // 👈 aynı şekilde
) {
  const { id } = await context.params;

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    await prisma.address.delete({ where: { id: addressId } });

    return NextResponse.json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Failed to delete address:", error);
    return NextResponse.json(
      { error: "Failed to delete address" },
      { status: 500 }
    );
  }
}
