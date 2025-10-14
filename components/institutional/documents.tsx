"use client";

import React from "react";
import { MapPin, Phone, Globe, FileText } from "lucide-react";

export default function DocumentsPage() {
  const certificates = [
    {
      title: "ISO 9001:2015 Kalite Yönetim Sistemi Belgesi",
      description:
        "Firmamızın tüm üretim ve yönetim süreçlerinin uluslararası kalite standartlarına uygun olarak yürütüldüğünü belgelemektedir.",
    },
    {
      title: "TSE Belgesi (Türk Standartları Enstitüsü)",
      description:
        "Plise perde ve mekanik perde sistemlerimizin, Türk Standartları’na uygunluğunu tescil eden belgedir.",
    },
    {
      title: "CE Belgesi",
      description:
        "Avrupa Birliği normlarına uygunluk belgesidir. Ürünlerimizin insan sağlığına ve çevreye zarar vermediğini gösterir.",
    },
    {
      title: "Marka Tescil ve Patent Belgeleri",
      description:
        "Türk Patent ve Marka Kurumu tarafından tescillenmiş marka belgemiz ve Ar-Ge çalışmalarına bağlı tasarım tescil belgelerimiz mevcuttur.",
    },
    {
      title: "Uygunluk ve Yasal Yetki Belgeleri",
      description:
        "Perde üretimi ve toptan satışı konularında gerekli tüm ruhsat ve izinlere sahibiz. Tesisimiz yerel ve ulusal otoriteler tarafından denetlenmektedir.",
    },
    {
      title: "Sanayi Sicil Belgesi",
    },
    {
      title: "İşyeri Açma ve Çalışma Ruhsatı",
    },
    {
      title: "Vergi Levhası",
    },
    {
      title: "İmalat Yeterlilik Belgesi",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
      {/* Başlık */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">Belgelerimiz</h1>
        <p className="text-gray-500">NowArt - 22 Nisan 2025</p>
      </div>

      {/* Tanıtım */}
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          NowArt Mekanik Perde Sistemleri olarak, sektördeki güvenilirliğimizi
          yalnızca ürün kalitemizle değil, sahip olduğumuz resmi belgeler ve
          sertifikalarla da kanıtlıyoruz. Kurumsal yapımızı destekleyen bu
          belgeler, üretim süreçlerimizdeki standartlaşmayı, müşteri
          memnuniyetine verdiğimiz önemi ve yasal sorumluluklarımızı eksiksiz
          yerine getirdiğimizi göstermektedir.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">
          Kalite Belgelerimiz
        </h2>
        <p>
          Üretim tesislerimizde, modern teknoloji ile donatılmış makine
          parkurumuzda yürütülen her süreç kalite standartlarına uygun olarak
          denetlenmektedir. Ürünlerimizin tamamı, sektörel kalite belgeleri ile
          onaylanmış malzemelerden üretilmektedir. Bu kapsamda sahip olduğumuz
          belgelerden bazıları şunlardır:
        </p>

        <div className="space-y-4">
          {certificates.map((cert, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-4 rounded-xl shadow-sm flex items-start gap-4"
            >
              <FileText className="w-6 h-6 text-[#92e676] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {cert.title}
                </h3>
                {cert.description && (
                  <p className="text-gray-700 text-sm mt-1">
                    {cert.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-gray-900">
          Neden Belgelerimiz Önemli?
        </h2>
        <p>
          Belgelerimiz, sadece birer kağıt parçası değil, müşterilerimize
          duyduğumuz saygının, işimize verdiğimiz önemin ve kaliteden ödün
          vermediğimizin bir göstergesidir. NowArt olarak, her bir müşterimizin
          güvenle alışveriş yapabileceği bir sistem sunarken, aynı zamanda yasal
          sorumluluklarımızı da eksiksiz yerine getiriyoruz.
        </p>
        <p>
          NowArt olarak hedefimiz; yalnızca Türkiye’de değil, uluslararası
          pazarda da kalitesi ve güvenilirliğiyle tanınan bir marka olmaktır.
          Sahip olduğumuz belgeler, bu vizyonumuzun temellerini oluşturmaktadır.
        </p>
      </div>

      {/* İletişim */}
      <div className="bg-blue-50 p-8 rounded-xl shadow-lg space-y-4 border border-blue-200">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">İletişim</h2>
        <div className="space-y-2 text-indigo-900">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#92e676]" />
            <span>
              Detaylı bilgi ve belge talepleriniz için bizimle iletişime
              geçebilirsiniz
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-[#92e676]" />
            <span> 0552 555 10 25</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-[#92e676]" />
            <span> NowArt.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
