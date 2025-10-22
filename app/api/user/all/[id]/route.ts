import { NextResponse } from "next/server";
import prisma from "@/lib/db";

interface Params {
  params: {
    id: string,
  };
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const userId = Number(params.id);

    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
