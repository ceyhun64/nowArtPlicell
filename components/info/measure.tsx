"use client";

import React from "react";
import { Phone, Globe, CircleCheck } from "lucide-react";

export default function PlisePerdeOlcusuPage() {
  const steps = [
    {
      title: "Montaj Tipi",
      description:
        "Plise perdeyi pencere çerçevesinin içine mi yoksa dışına mı monte edeceğinizi belirleyin.",
    },
    {
      title: "Cam Kenarları",
      description: "Camın kenarlarındaki fitil boşluklarını ölçüme dahil edin.",
    },
    {
      title: "Pencere Tipi",
      description:
        "Standart, cam balkon veya eğimli pencere olup olmadığını kontrol edin.",
    },
    {
      title: "İç Montaj Ölçüleri",
      description:
        "Camın iç kısmında sol kenardan sağ kenara ve üstten alta ölçün. Genişlikten 1 cm eksilterek sipariş verin.",
    },
    {
      title: "Dış Montaj Ölçüleri",
      description:
        "Çerçevenin dış kenarlarından 3-5 cm fazlasını ekleyin. Üstten başlayıp istediğiniz kapanma seviyesine kadar ölçün.",
    },
    {
      title: "Cam Balkon / Kış Bahçesi Ölçüleri",
      description:
        "Her cam paneli ayrı ölçün ve fitil boşluğunu dikkate alarak sipariş verin.",
    },
    {
      title: "Yaygın Hatalar ve Çözümleri",
      description:
        "Yanlış ölçüm yapmaktan kaçının, boşluk payı bırakın ve cam fitilini dikkate alın.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 ">
      {/* Başlık */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">
          Plise Perde Ölçüsü Nasıl Alınır?
        </h1>
        <p className="text-gray-500">yazan NowArt - 22 Nisan 2025</p>
      </div>

      {/* Tanıtım */}
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          Plise perde siparişi verirken doğru ölçü almak, perdenin pencereye tam
          oturmasını sağlar. Yanlış ölçüm, perdeyi tam kapatmayabilir veya
          çerçeveye sığmamasına neden olabilir. İşte adım adım rehberimiz:
        </p>
      </div>

      {/* Ölçüm Adımları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-gray-50 p-4 rounded-xl shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
          >
            <CircleCheck className="text-indigo-500 w-6 h-6 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-700 text-sm mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* İletişim */}
      <div className="bg-indigo-50 p-8 rounded-xl shadow-lg space-y-4 border border-indigo-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Yardım ve Sipariş
        </h2>
        <p className="text-gray-700">
          Ölçümden emin değilseniz, profesyonel destek almak için bizimle
          iletişime geçebilirsiniz. NowArt olarak size doğru ölçü ve en uygun
          fiyatlarla kaliteli plise perdeler sunuyoruz.
        </p>
        <div className="space-y-2 text-gray-700">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-indigo-500" />
            <span> 0552 555 10 25</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-indigo-500" />
            <span> NowArt.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
