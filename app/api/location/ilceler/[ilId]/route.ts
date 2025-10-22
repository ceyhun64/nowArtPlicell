import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  try {
    // params'ı await et
    const params = await context.params;
    const ilId = params.ilId;

    const res = await fetch(`https://api.turkiyeapi.dev/v1/provinces/${ilId}`);
    if (!res.ok) throw new Error("İlçe verisi alınamadı");

    const data = await res.json();

    const districts =
      data.data?.districts?.map((d: any) => ({
        id: d.id,
        name: d.name,
      })) || [];

    return NextResponse.json(districts);
  } catch (error) {
    console.error("İlçeler alınırken hata:", error);
    return NextResponse.json({ error: "İlçeler alınamadı" }, { status: 500 });
  }
}
