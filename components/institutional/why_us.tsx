"use client";

import React from "react";
import { Phone, Globe, CircleCheck } from "lucide-react";
import Image from "next/image"; // Image bileşenini import ediyoruz

export default function WhyChooseUsPage() {
  const advantages = [
    {
      title: "Üreticiden Tüketiciye Doğrudan Satış",
      description:
        "Aracı yok, ekstra maliyet yok! Ürünlerimizi kendi fabrikamızda üretiyor, son kullanıcıya doğrudan ulaştırıyoruz. Hem kaliteyi garanti ediyor hem de en uygun fiyatlarla perde sahibi olmanızı sağlıyoruz.",
    },
    {
      title: "Yüksek Kalite Standartları",
      description:
        '"Her plise NowArt kalitesinde değildir." Sloganımız sadece bir söz değil, üretim felsefemizdir. Kullanılan kumaşlardan mekanizmalara kadar her bileşen özenle seçilir ve kalite kontrol testlerinden geçirilir.',
    },
    {
      title: "Ölçüye Özel Üretim",
      description:
        "Her pencere farklıdır; bu nedenle her perde de özel olmalıdır. Standart ölçülerle değil, yaşam alanınıza tam uyum sağlayan ölçülerle üretim yapıyoruz. Cam balkon, salon, çocuk odası, ofis veya farklı alanlara özel ölçü alım desteği sağlıyoruz.",
    },
    {
      title: "Geniş Ürün Yelpazesi",
      description:
        "Plise perdeden zebralara, storlardan fonlara kadar onlarca farklı model ve renk seçeneği sunuyoruz. Her zevke, her dekorasyona, her ihtiyaca özel perde çözümleriyle yanınızdayız.",
    },
    {
      title: "Estetik & Fonksiyonelliği Bir Arada Sunuyoruz",
      description:
        "Perdelerimiz sadece şık değil, aynı zamanda kullanışlıdır. Güneş ışığını kontrol etme, ısı yalıtımı sağlama, pratik kullanım gibi özellikler sayesinde yaşam konforunuzu artırır.",
    },
    {
      title: "Hızlı ve Güvenli Teslimat",
      description:
        "Üretimden montaja kadar tüm süreci titizlikle yönetiyoruz. Sipariş sonrası süreçlerimiz şeffaftır. Ürünleriniz, zarar görmeyecek şekilde özenle paketlenerek adresinize zamanında teslim edilir.",
    },
    {
      title: "Müşteri Memnuniyeti Odaklı Hizmet",
      description:
        "Müşterilerimizin memnuniyeti bizim en büyük referansımızdır. Satış öncesi ve sonrası süreçlerde her zaman ulaşılabilir bir ekip sizi karşılar.",
    },
    {
      title: "Kurumsal Güvence",
      description:
        "Bursa Osmangazi’de bulunan fabrikamızda üretim yapan köklü bir firmayız. Tescilli markamız, belgelenmiş kalite sistemlerimiz ve profesyonel kadromuzla size güven veriyoruz.",
    },
    {
      title: "Instagram’dan Gerçek Proje Paylaşımları",
      description:
        "Instagram hesaplarımızda (@NowArtperde ve @modabuse.tekstil) üretimden montaja kadar tüm süreçleri şeffaf şekilde paylaşıyoruz. Gerçek projeleri ve müşteri yorumlarını görebilirsiniz.",
    },
    {
      title: "Uygun Fiyat Politikası & Kampanyalar",
      description:
        "Kaliteli perde herkesin hakkı! Dönemsel kampanyalar ve özel fiyat avantajları sunuyoruz. Açılışa özel plise perde fiyatlarımız KDV dahil 250 TL’den başlamaktadır.",
    },
  ];

  // Kullanmak istediğiniz belirli görsel yollarını belirliyoruz
  const image1 = "/heroes/10.webp"; // İlk görsel
  const image2 = "/heroes/20.webp"; // İkinci görsel

  // Bir görsel bileşeni oluşturma helper'ı (Önceki koddan)
  const ImageBlock = ({ src, alt }: { src: string; alt: string }) => (
    <div className="my-8 rounded-xl overflow-hidden shadow-xl border border-gray-100">
      <Image
        src={src}
        alt={alt}
        width={1200} // Maksimum genişlik
        height={500} // Oranları korumak için tahmini yükseklik
        className="w-full h-auto object-cover"
        priority={false}
      />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
      {/* Başlık */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">
          Neden Bizi Tercih Etmelisiniz?
        </h1>
        <p className="text-gray-500">NowArt - 22 Nisan 2025</p>
      </div>

      {/* Tanıtım */}
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          Perde bir evin veya iş yerinin sadece dekorasyon parçası değil, aynı
          zamanda mahremiyetin, konforun ve şıklığın tamamlayıcısıdır. Biz,
          NowArt Mekanik Perde Sistemleri olarak bu bakış açısıyla üretim
          yapıyor, müşterilerimize sadece ürün değil; memnuniyet, güven ve
          kalite sunuyoruz.
        </p>
        {/* Görsel 1'i buraya ekliyoruz */}
        <ImageBlock src={image1} alt="Neden NowArt" />
        <p>
          Sizi neden NowArt’i tercih eden binlerce mutlu müşterinin arasına
          bekliyoruz? İşte cevabı:
        </p>
      </div>

      {/* Avantajlar Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {advantages.map((adv, idx) => (
          <div
            key={idx}
            className="bg-gray-50 p-4 rounded-xl shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
          >
            <CircleCheck className="text-[#92e676] w-6 h-6 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {adv.title}
              </h3>
              <p className="text-gray-700 text-sm mt-1">{adv.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Görsel 2'yi avantajlar listesinden sonra ekliyoruz */}
      <ImageBlock src={image2} alt="NowArt farkı" />

      {/* İletişim */}
      <div className="bg-blue-50 p-8 rounded-xl shadow-lg space-y-4 border border-blue-200">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Biz Hazırız, Ya Siz?
        </h2>
        <p className="text-indigo-900">
          NowArt ailesi olarak, yaşam alanlarınızı daha şık, konforlu ve
          işlevsel hale getirmek için buradayız. Kaliteyi yakından görmek ve
          doğru perdeyle tanışmak için siz de bizimle iletişime geçin.
        </p>
        <div className="space-y-2 text-indigo-900">
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
