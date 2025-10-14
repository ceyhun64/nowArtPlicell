"use client";

import React from "react";
import { Instagram, Facebook, Phone, MessageCircle } from "lucide-react";

export default function SocialSidebar() {
  const whatsappNumber = "+905325551025";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[\s+]/g, "")}`;

  return (
    <div className="fixed left-4 bottom-20 md:bottom-4 flex flex-col items-center gap-3 z-50">
      {/* 1. INSTAGRAM (Gradient renk korunuyor) */}
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        // Resmi Instagram Gradient rengi
        className="bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] to-[#d62976] p-3 rounded-full text-white hover:brightness-90 transition"
        aria-label="Instagram"
      >
        <Instagram size={24} />
      </a>

      {/* 2. FACEBOOK (Mavi renk korunuyor) */}
      <a
        href="https://www.facebook.com/"
        target="_blank"
        rel="noopener noreferrer"
        // Resmi Facebook Mavi rengi
        className="bg-[#1877f2] p-3 rounded-full text-white hover:brightness-90 transition"
        aria-label="Facebook"
      >
        <Facebook size={24} />
      </a>

      {/* 3. WHATSAPP (Yeşil renk korunuyor, sırayı yukarı taşıdım) */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        // Resmi WhatsApp Yeşil rengi
        className="bg-[#25D366] p-3 rounded-full text-white hover:brightness-90 transition"
        aria-label="WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

      {/* 4. TELEFON (Daha belirgin bir telefon yeşili/rengi belirledik) */}
      <a
        href="tel:+905325551025"
        // Telefon için standart bir Koyu Yeşil renk (genellikle arama/iletişim için kullanılır)
        className="bg-[#075E54] p-3 rounded-full text-white hover:brightness-90 transition"
        aria-label="Telefon"
      >
        <Phone size={24} />
      </a>
    </div>
  );
}
