"use client";

import React from "react";
import { Instagram, Facebook, Phone } from "lucide-react";

export default function SocialSidebar() {
  const whatsappNumber = "+905301303084";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, "")}`;

  return (
    <div className="fixed left-4 bottom-20 md:bottom-4 flex flex-col items-center gap-3 z-50">
      {/* 1. INSTAGRAM */}
      <a
        href="https://www.instagram.com/nowartplicell/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] to-[#d62976] p-3 rounded-full text-white hover:brightness-90 transition"
        aria-label="Instagram"
      >
        <Instagram size={24} />
      </a>

      {/* 2. FACEBOOK */}
      <a
        href="https://www.facebook.com/share/1GzHckQSvz/?mibextid=wwXIfr"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#1877f2] p-3 rounded-full text-white hover:brightness-90 transition"
        aria-label="Facebook"
      >
        <Facebook size={24} />
      </a>

      {/* 3. WHATSAPP */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] p-3 rounded-full text-white hover:brightness-90 transition"
        aria-label="WhatsApp"
      >
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>WhatsApp icon</title>
          <path
            fill="currentColor"
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
          />
        </svg>
      </a>

      {/* 4. TELEFON */}
      <a
        href={`tel:${whatsappNumber}`}
        className="bg-[#075E54] p-3 rounded-full text-white hover:brightness-90 transition"
        aria-label="Telefon"
      >
        <Phone size={24} />
      </a>

      {/* 5. TIKTOK */}
      <a
        href="https://www.tiktok.com/@nowart.plicell?_r=1&_t=ZS-911855IDXLM"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black p-3 pl-4 rounded-full text-white hover:brightness-90 transition"
        aria-label="TikTok"
      >
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>TikTok icon</title>
          <path
            fill="currentColor"
            d="M12 2c.43 2.69 2.25 4.8 5 5v3.11a8.26 8.26 0 01-4.05-1.11v6.63a5.56 5.56 0 11-5.56-5.56c.38 0 .75.04 1.11.11v3.23a2.33 2.33 0 00-1.11-.29 2.45 2.45 0 102.45 2.45V2h2.16z"
          />
        </svg>
      </a>
    </div>
  );
}
