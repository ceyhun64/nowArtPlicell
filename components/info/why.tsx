"use client";

import React from "react";
import { Phone, Globe } from "lucide-react";

export default function PlisePerdeArticle() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      {/* Başlık */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">
          Plise Perdeler Neden Tercih Edilmeli?
        </h1>
        <p className="text-gray-500">yazan NowArt - 25 Mart 2025</p>
      </div>

      {/* İçerik */}
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          Günümüzde perde seçiminde estetik, işlevsellik ve kullanım kolaylığı
          büyük önem taşıyor. Klasik perdelerin yerine modern ve pratik çözümler
          arayanlar için plise perdeler harika bir alternatif sunuyor. Peki,
          plise perdeler neden bu kadar popüler? İşte plise perdeleri tercih
          etmeniz için en önemli nedenler!
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">
          1. Şık ve Modern Tasarım
        </h2>
        <p>
          Plise perdeler, zarif ve modern tasarımlarıyla her mekâna şıklık
          katar. Geniş renk ve desen seçenekleri sayesinde ev dekorasyonunuza
          uyum sağlar. Minimalist bir görünüm sunduğu için özellikle modern ve
          sade tarzı sevenler tarafından tercih edilmektedir.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">
          2. Isı ve Işık Kontrolü Sağlar
        </h2>
        <p>
          Plise perdeler, özel kumaş yapısı sayesinde ısı yalıtımı ve ışık
          kontrolü sağlar. Güneş ışığını yumuşatarak odanıza doğal bir aydınlık
          kazandırırken, sıcak yaz günlerinde serin bir ortam oluşturur. Ayrıca,
          kış aylarında içerideki sıcak havanın dışarı kaçmasını önleyerek
          enerji tasarrufu sağlar.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">
          3. Kolay Kullanım ve Montaj
        </h2>
        <p>
          Plise perdeler, pencere çerçevesine zarar vermeden monte edilebilen ve
          ipli mekanizması sayesinde kolayca açılıp kapanabilen bir sistemle
          üretilir. Üstelik duvara veya tavana montaj gerektirmez, bu da onu
          kiracıların ve pratik çözümler arayanların ilk tercihi yapar.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">
          4. Mekânlara Ferah Bir Görünüm Kazandırır
        </h2>
        <p>
          Plise perdeler, pencere camına doğrudan monte edildiği için mekânda
          daha geniş ve ferah bir görüntü oluşturur. Klasik perdelerde olduğu
          gibi fazladan alan kaplamaz, bu yüzden özellikle küçük evler ve dar
          alanlar için idealdir.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">
          5. Geniş Kullanım Alanı
        </h2>
        <p>
          Plise perdeler yalnızca evlerde değil, ofisler, restoranlar, kış
          bahçeleri, balkonlar ve cam balkonlar gibi pek çok alanda
          kullanılabilir. Özellikle çift yönlü kullanım özelliği sayesinde,
          pencerenin istediğiniz kısmını kapatabilir, alt veya üst kısımdan
          açarak ışık dengesini kendiniz ayarlayabilirsiniz.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">
          6. Kolay Temizlik ve Bakım
        </h2>
        <p>
          Kumaş dokusu toz tutmaz ve temizliği oldukça pratiktir. Hafif nemli
          bir bezle silinerek ya da elektrikli süpürgenin düşük güç ayarıyla
          temizlenerek uzun süre ilk günkü gibi kullanılabilir.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">
          7. Dayanıklı ve Uzun Ömürlüdür
        </h2>
        <p>
          Kaliteli kumaş ve mekanizma sistemi sayesinde plise perdeler uzun
          yıllar sorunsuz kullanılabilir. Güneşe karşı dayanıklı kumaşları
          solmaz ve deformasyona uğramaz.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">
          Plise Perdeler ile Konforu ve Şıklığı Bir Arada Yaşayın!
        </h2>
        <p>
          Eğer perde seçiminde şık, modern, kullanışlı ve uzun ömürlü bir model
          arıyorsanız, plise perdeler sizin için en doğru seçenek! NowArt
          olarak, üreticiden tüketiciye doğrudan satış yaparak en uygun
          fiyatlarla kaliteli plise perdeleri sunuyoruz. Siz de hemen web
          sitemizden sipariş vererek yaşam alanlarınıza yepyeni bir hava
          katabilirsiniz.
        </p>
      </div>

      {/* İletişim Bilgileri */}
      <div className="bg-indigo-50 p-8 rounded-xl shadow-lg space-y-4 border border-indigo-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">İletişim</h2>
        <div className="space-y-2 text-gray-700">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-indigo-500" />
            <span>0552 555 10 25</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-indigo-500" />
            <span>NowArt.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
