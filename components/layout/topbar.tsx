"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
// next/link yerine <a> etiketi kullanılacaktır.

export default function Topbar() {
  // Mesajları sabitlemek için useMemo kullanıldı
  const messages = useMemo(
    () => ["Açılışa özel inanılmaz indirimler!", "Üreticiden halka!"],
    []
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false); // Kayma animasyonunu kontrol eder

  // Mevcut ve bir sonraki mesajı hesaplar
  const currentMessage = messages[currentIndex];
  // Bir sonraki mesajı doğru bir şekilde bulur (ör: 1 -> 0)
  const nextMessage = messages[(currentIndex + 1) % messages.length];

  useEffect(() => {
    const totalDuration = 2500; // Mesajın merkezde kalma süresi
    const transitionDuration = 500; // CSS geçiş süresiyle eşleşmeli

    const interval = setInterval(() => {
      // 1. Kayma Animasyonunu Başlat: İki mesaj da hareket etmeye başlar
      setIsSliding(true);

      // 2. Geçiş süresinin sonunda içeriği değiştir ve animasyonu sıfırla
      setTimeout(() => {
        // İçerik değişince, mevcut mesaj bir sonraki mesaj olur.
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setIsSliding(false);
      }, transitionDuration);
    }, totalDuration);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div
      className="w-full text-white text-sm py-3 font-bold overflow-hidden"
      style={{ backgroundColor: "#001e59" }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
        {/* Sol Bölüm — Sadece masaüstünde görünür */}
        <div className="hidden md:block flex-shrink-0">
          <Link // next/link yerine <a> kullanıldı
            href="/profile/orders"
            className="hover:text-[#cce7ff] transition-colors"
          >
            Sipariş Sorgula
          </Link>
        </div>

        {/* Orta Bölüm — Kayar Mesaj Alanı */}
        <div className="flex-1 flex justify-center">
          <div className="relative overflow-hidden w-[250px] sm:w-[350px] md:w-[400px] h-[20px] text-center">
            {/* Mevcut Mesaj: isSliding=true ise sola kaybolur (-translate-x-full) */}
            <span
              // React'ın doğru bileşenleri güncellemesi için key kullanıldı.
              key={currentIndex}
              className={`block absolute inset-0 transition-transform duration-500 ease-in-out 
                ${isSliding ? "-translate-x-full" : "translate-x-0"}
              `}
            >
              {currentMessage}
            </span>

            {/* Sonraki Mesaj: isSliding=false ise sağda bekler (translate-x-full), true olunca merkeze kayar (translate-x-0) */}
            <span
              key={`next-${currentIndex}`}
              className={`block absolute inset-0 transition-transform duration-500 ease-in-out 
                ${isSliding ? "translate-x-0" : "translate-x-full"}
              `}
            >
              {nextMessage}
            </span>
          </div>
        </div>

        {/* Sağ Bölüm — Sadece masaüstünde görünür */}
        <div className="hidden md:flex space-x-3 items-center">
          <a // next/link yerine <a> kullanıldı
            href="tel:+905325551025"
            className="hover:text-[#cce7ff] transition-colors"
          >
            +90 553 378 02 38
          </a>
          <span className="text-white/70">|</span>
          <a // next/link yerine <a> kullanıldı
            href="mailto:info@gunduzeli.com"
            className="hover:text-[#cce7ff] transition-colors"
          >
            info@gunduzeli.com
          </a>
        </div>
      </div>
    </div>
  );
}
