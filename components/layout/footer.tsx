"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";

interface LinkItem {
  href: string;
  label: string;
}

interface SectionData {
  key: string;
  title: string;
  links: LinkItem[];
}

const sections: SectionData[] = [
  {
    key: "contracts",
    title: "Sözleşmeler",
    links: [
      { href: "/contracts/kvkk", label: "KVKK Aydınlatma Metni" },
      { href: "/contracts/distance_sale", label: "Mesafeli Satış Sözleşmesi" },
      { href: "/contracts/personal_data", label: "Kişisel Veriler Onay Metni" },
      { href: "/contracts/payment_options", label: "Ödeme Seçenekleri" },
    ],
  },
  {
    key: "info",
    title: "Bilgi",
    links: [
      { href: "/info/why", label: "Plise Perdeler Neden Tercih Edilmeli?" },
      {
        href: "/info/advantage",
        label: "Plise Perde Nedir? Avantajları Nelerdir?",
      },
      { href: "/info/measure", label: "Plise Perde Ölçüsü Nasıl Alınır?" },
      { href: "/info/terms", label: "Şartlar ve Koşullar" },
    ],
  },
  {
    key: "menu",
    title: "Hızlı Menü",
    links: [
      { href: "/profile", label: "Hesabım" },
      { href: "/siparislerim", label: "Üye Girişi" },
      { href: "/hesabim", label: "Yeni Üye Kayıt" },
      { href: "/hesabim1", label: "Şifremi Unuttum" },
      { href: "/hesabim2", label: "Siparişi Sorgula" },
    ],
  },
];

interface SectionProps {
  section: SectionData;
  isOpen: boolean;
  toggleSection: () => void;
}

const Section: React.FC<SectionProps> = ({
  section,
  isOpen,
  toggleSection,
}) => (
  <div className="space-y-2 py-4 md:py-0">
    {/* Mobil Akordiyon Başlığı */}
    <div
      className="flex justify-between items-center cursor-pointer md:hidden"
      onClick={toggleSection}
    >
      <h3 className="text-base font-semibold text-white">{section.title}</h3>
      <span className="text-white text-xl font-bold transition-transform duration-300">
        {isOpen ? "-" : "+"}
      </span>
    </div>

    {/* Masaüstü Başlığı */}
    <h3 className="text-base font-semibold mb-3 text-white hidden md:block">
      {section.title}
    </h3>

    {/* İçerik */}
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? "max-h-96" : "max-h-0"
      } md:max-h-full md:block space-y-2 pt-2 md:pt-0`}
    >
      {section.links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block text-sm text-gray-100 hover:text-white transition-colors font-sans"
        >
          {item.label}
        </Link>
      ))}
    </div>
  </div>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <footer className="relative border-t border-white/20 overflow-hidden rounded-t-4xl bg-[#001e59] font-serif mb-16 md:mb-0 ">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-10">
          {/* Sütun 1 */}
          <div className="space-y-5 py-4 md:py-0 ">
            <Link href="/" className="block">
              <h2 className="text-3xl font-serif font-bold tracking-tight text-white hover:text-white transition-colors">
                NowArt Plicell
              </h2>
            </Link>
            <address className="not-italic text-sm leading-relaxed text-gray-100 font-sans">
              <p>Küçükbakkallı Mah. Küçükbakkallı Cad. No:55/3</p>
              <p>Osmangazi / BURSA</p>
              <p>info@nowart.com</p>
              <p>+90 552 555 10 25</p>
            </address>
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-100 hover:text-white transition-colors"
              >
                <Instagram size={22} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-100 hover:text-white transition-colors"
              >
                <Facebook size={22} />
              </a>
            </div>
          </div>

          {/* Sütunlar */}
          {sections.map((section) => (
            <Section
              key={section.key}
              section={section}
              isOpen={!!openSections[section.key]}
              toggleSection={() => toggleSection(section.key)}
            />
          ))}
        </div>

        {/* Alt Bar */}
        <div className="border-t border-white/20 py-6 px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-100">
          <p className="text-xs tracking-wide font-sans">
            © {currentYear}{" "}
            <span className="font-medium text-white">NowArt Plicell</span>. Tüm hakları
            saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
