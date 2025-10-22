import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

export async function POST(req: Request): Promise<Response> {
  try {
    const formData: FormData = await req.formData();
    const file = formData.get("file") as File | null;
    const folderNameInput = formData.get("folderName") as string | null;

    if (!file) {
      return new Response(
        JSON.stringify({
          error: "Dosya bulunamadı. Lütfen bir dosya yükleyin.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    let safeFolderName =
      (folderNameInput || "genel")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "") || "genel";

    const originalName = file.name.replace(/\s/g, "_");
    const filename = `${Date.now()}-${path.parse(originalName).name}.webp`;

    const folderPath = path.join("uploads", safeFolderName);
    const uploadDir = path.join(process.cwd(), "public", folderPath);

    await fs.mkdir(uploadDir, { recursive: true });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ Sharp ile boyut küçültme ve WebP'ye dönüştürme
    const optimizedBuffer = await sharp(buffer)
      .resize({ width: 1200, withoutEnlargement: true }) // 1200px max genişlik
      .toFormat("webp", { quality: 80 }) // WebP format, %80 kalite
      .toBuffer();

    const filepath = path.join(uploadDir, filename);
    await fs.writeFile(filepath, optimizedBuffer);

    const publicPath = `/${path
      .join(folderPath, filename)
      .replace(/\\/g, "/")}`;

    return new Response(JSON.stringify({ path: publicPath }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    console.error("Dosya yükleme hatası:", err);
    const message =
      err instanceof Error ? err.message : "Yükleme işlemi başarısız oldu.";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
