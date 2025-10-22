import { promises as fs } from "fs";
import path from "path";

/**
 * Dosya yükleme işlemini gerçekleştirir.
 * İsteğin FormData'sından "file" ve "folderName" alanlarını bekler.
 * @param req Gelen Request nesnesi.
 * @returns Başarı veya hata yanıtı.
 */
export async function POST(req: Request): Promise<Response> {
  try {
    // 1. FormData'yı Al
    const formData: FormData = await req.formData();
    const file = formData.get("file") as File | null;
    const folderNameInput = formData.get("folderName") as string | null;

    if (!file) {
      return new Response(
        JSON.stringify({
          error: "Dosya bulunamadı. Lütfen bir dosya yükleyin.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 2. Klasör Adını Temizle ve Hazırla
    // Eğer folderName sağlanmazsa 'genel' (general) olarak varsayılır.
    // Klasör adını URL uyumlu hale getiriyoruz (boşlukları _ ile değiştir, küçük harfe çevir).
    // DEĞİŞİKLİK: const yerine let kullanıldı, böylece yeniden atama yapılabilir.
    let safeFolderName = (folderNameInput || "genel")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, ""); // Sadece harf, rakam ve _ bırakır

    if (!safeFolderName) {
      // Eğer temizleme sonrası klasör adı boş kalırsa, yine 'genel' kullan
      safeFolderName = "genel";
    }

    // 3. Dosya Adı ve Upload Dizinini Tanımla
    const filename = `${Date.now()}-${file.name.replace(/\s/g, "_")}`; // Dosya adını da temizle

    // Upload dizini: public/uploads/[safeFolderName]
    const folderPath = path.join("uploads", safeFolderName);
    const uploadDir = path.join(process.cwd(), "public", folderPath);

    // 4. Upload dizini yoksa oluştur (iç içe klasörler için recursive: true)
    await fs.mkdir(uploadDir, { recursive: true });

    // 5. Dosyayı yaz
    const filepath = path.join(uploadDir, filename);
    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(filepath, Buffer.from(arrayBuffer));

    // 6. JSON olarak public path'i döndür
    // Path: /uploads/[safeFolderName]/[filename]
    const publicPath = `/${path
      .join(folderPath, filename)
      .replace(/\\/g, "/")}`; // Windows/Linux uyumu için

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
