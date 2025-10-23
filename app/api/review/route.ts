import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface ReviewRequestBody {
  productId: number;
  rating: number;
  title?: string;
  comment?: string;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: ReviewRequestBody;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { productId, rating, title, comment } = body;

  // rating kontrolü
  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Rating must be between 1 and 5" },
      { status: 400 }
    );
  }

  try {
    const review = await prisma.review.create({
      data: {
        userId: Number(session.user.id),
        productId,
        rating,
        title,
        comment,
      },
    });
    return NextResponse.json(review);
  } catch (error: any) {
    if (error?.code === "P2002") {
      // unique constraint violation
      return NextResponse.json(
        { error: "You have already reviewed this product." },
        { status: 400 }
      );
    }
    console.error(error);
    return NextResponse.json(
      { error: "Invalid product or other error." },
      { status: 400 }
    );
  }
}
