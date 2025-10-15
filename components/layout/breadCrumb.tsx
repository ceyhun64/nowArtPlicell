"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// İngilizce/Teknik kelimeleri Türkçeye çeviren sözlük
const translations: Record<string, string> = {
  home: "Anasayfa",
  products: "Tüm Ürünler",
  product: "Ürün",
  favorites: "Favorilerim",
  about: "Hakkımızda",
  contact: "İletişim",
  login: "Giriş Yap",
  register: "Kayıt Ol",
  cart: "Sepetim",
  checkout: "Ödeme",
  profile: "Profilim",
  "duz-seri": "Düz Seri",
  baskili: "Baskılı",
  "cift-sistem-tul": "Çift Sistem Tül",
  "tekli-tul": "Tekli Tül",
  jakar: "Jakar",
  honeycomb: "Honeycomb",
  blackout: "Blackout",
  dimout: "Dimout",
  "100-karartmali-perdeler": "%100 Karartmalı Perdeler",
  "70-karartmali-perdeler": "%70 Karartmalı Perdeler",
  "perde-aksesuar": "Perde Aksesuar",
  "tum-urunler": "Tüm Ürünler",
};

// Segment çeviri ve biçimlendirme fonksiyonu
function translateSegment(segment: string): string {
  return translations[segment.toLowerCase()] || segment.replace(/-/g, " ");
}

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();
  const segments = pathname?.split("/").filter(Boolean) || [];

  return (
    <nav className="text-sm sm:text-md breadcrumbs mb-0 md:mb-4">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Anasayfa
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;
          const translated = translateSegment(segment);

          return (
            <li key={href} className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              {isLast ? (
                <span className="text-gray-700 font-semibold">
                  {translated}
                </span>
              ) : (
                <Link href={href} className="text-gray-500 hover:text-gray-700">
                  {translated}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
