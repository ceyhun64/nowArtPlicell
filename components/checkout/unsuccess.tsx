// app/payment-failed/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";

export default function Failed() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/"); // 10 saniye sonra ana sayfaya yönlendir
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50">
      <div className="bg-white shadow-lg rounded-xl p-10 text-center max-w-md">
        {/* Büyük ikon */}
        <XCircle className="text-red-600 w-24 h-24 mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Ödeme Başarısız
        </h1>

        <p className="text-gray-700 mb-6">
          Maalesef ödemeniz işlenemedi. Lütfen tekrar deneyin veya sorun devam
          ederse müşteri hizmetleri ile iletişime geçin.
        </p>

        <button
          onClick={() => router.push("/")}
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
}
