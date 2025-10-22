import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

interface Params {
  id: string; // route param olarak id gelir
}

interface PatchRequestBody {
  quantity: number;
}

/**
 * DELETE /api/cart/[id]
 * Belirli bir cartItem'ı siler
 */
export async function DELETE(
  req: Request,
  { params }: { params: Params }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cartItemId = Number(params.id);

  try {
    const deleted = await prisma.cartItem.delete({
      where: { id: cartItemId },
    });
    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete cart item" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/cart/[id]
 * Belirli bir cartItem'ın quantity değerini günceller
 */
export async function PATCH(
  req: Request,
  { params }: { params: Params }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cartItemId = Number(params.id);
  const body: PatchRequestBody = await req.json();

  if (!body.quantity || body.quantity < 1)
    return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });

  try {
    const updated = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: body.quantity },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update quantity" },
      { status: 500 }
    );
  }
}
