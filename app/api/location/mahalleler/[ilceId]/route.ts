import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  try {
    const params = await context.params;
    const ilceId = params.ilceId;

    const res = await fetch(`https://api.turkiyeapi.dev/v1/districts/${ilceId}`);
    if (!res.ok) throw new Error("Mahalle verisi alınamadı");

    const data = await res.json();

    const neighborhoods =
      data.data?.neighborhoods?.map((n: any) => ({
        id: n.id,
        name: n.name,
      })) || [];

    return NextResponse.json(neighborhoods);
  } catch (error) {
    console.error("Mahalleler alınırken hata:", error);
    return NextResponse.json({ error: "Mahalleler alınamadı" }, { status: 500 });
  }
}
