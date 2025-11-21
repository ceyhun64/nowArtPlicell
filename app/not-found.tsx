// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Sayfa bulunamadı</p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
