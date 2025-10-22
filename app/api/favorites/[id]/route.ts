import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// Tip tanımları
interface DeleteParams {
  params: { id: string };
}

export async function DELETE(req: Request, { params }: DeleteParams) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const productId = Number(params.id);
  if (isNaN(productId) || productId <= 0) {
    return NextResponse.json(
      { error: "Invalid or missing productId" },
      { status: 400 }
    );
  }

  try {
    const deleted = await prisma.favorite.deleteMany({
      where: {
        userId: Number(session.user.id),
        productId,
      },
    });

    return NextResponse.json({ deletedCount: deleted.count });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete favorite" },
      { status: 500 }
    );
  }
}
