import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

interface Params {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { id } = params; // productId
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
          },
        },
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Could not fetch reviews" },
      { status: 500 }
    );
  }
}
