"use client";

import React from "react";
import { Ruler, Info, Phone, Globe } from "lucide-react";

export default function MeasurementUnitsPage() {
  const rules = [
    "Ölçüm yaparken esnemeyen çelik şerit metre kullanın.",
    "Tüm ölçümleri not alın ve hangi pencereye ait olduğunu belirtin.",
    "Perdenin nereye monte edileceğini (tavan, duvar ya da doğrama) önceden planlayın.",
    "Ölçüm yapılacak alanda pencere kolu, radyatör veya süpürgelik gibi çıkıntıların olup olmadığını kontrol edin.",
    "Mümkünse iki kişiyle ölçüm alın, biri metroyu tutarken diğer kişi ölçüyü daha kolay okuyabilir.",
  ];

  const pleatedRules = [
    "Camın içine, doğramaya monte edilen sistemde milimetrik ölçü almak oldukça önemlidir.",
    "Camın sabit bölümünün içten içe ölçüsünü alın. Ölçü, cam contasından başlamalıdır.",
    "Eğer ölçüm açılan bir cam kanadına aitse, menteşe tarafında boşluk kalmaması için 1-2 cm daraltarak ölçü alın.",
    "Tüm cam kanatları için ayrı ayrı ölçüm alın. Her cam farklı ölçüde olabilir.",
    "Camın üst kısmından alt contasına kadar olan yüksekliği ölçün.",
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
      {/* Başlık */}
      <div className="text-center space-y-2">
        <div className="flex justify-center gap-2 items-center text-[#92e676]">
          <Ruler className="w-6 h-6" />
          <h1 className="text-4xl font-bold text-gray-900">Ölçü Birimleri</h1>
        </div>
        <p className="text-gray-500">NowArt - 22 Nisan 2025</p>
      </div>

      {/* Giriş */}
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>
          Perde siparişi verirken dikkat edilmesi gereken en önemli adımlardan
          biri doğru ölçü almaktır. Çünkü en kaliteli perde bile yanlış ölçüyle
          monte edildiğinde istenilen görünümü ve işlevi sağlayamaz. NowArt
          Perde olarak, cam balkonlardan salonlara, ofislerden çocuk odalarına
          kadar her alanda ideal perde çözümünü sunarken, ölçü alımında dikkat
          etmeniz gereken tüm detayları sizin için bu yazıda topladık.
        </p>
      </div>

      {/* Genel Ölçü Kuralları */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-md space-y-4 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <Info className="w-5 h-5 text-[#92e676]" />
          Genel Ölçü Kuralları
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          {rules.map((rule, idx) => (
            <li key={idx}>{rule}</li>
          ))}
        </ul>
      </div>

      {/* Plise Perde Ölçüsü */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-md space-y-4 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <Ruler className="w-5 h-5 text-[#92e676]" />
          Plise Perde Ölçüsü Nasıl Alınır?
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
          {pleatedRules.map((rule, idx) => (
            <li key={idx}>{rule}</li>
          ))}
        </ol>
      </div>

      {/* Paylaşım/İletişim */}
      <div className="bg-blue-50 p-6 rounded-xl shadow-lg border border-blue-200 text-indigo-900 space-y-3">
        <p>
          Daha fazla bilgi ve ölçü desteği için bizimle iletişime
          geçebilirsiniz.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <span className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-[#92e676]" /> 0552 555 10 25
          </span>
          <span className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#92e676]" /> NowArt.com
          </span>
        </div>
      </div>
    </div>
  );
}
