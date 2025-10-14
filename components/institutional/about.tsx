"use client";

import React from "react";
import { MapPin, Phone, Globe, Mail, Instagram } from "lucide-react";
import Image from "next/image"; // Image bileşenini import ediyoruz

// Görsel sayısını temsil eden array artık gerekli değil.

export default function AboutPage() {
  // Sabit görsel yollarını belirliyoruz
  const image1 = "/heroes/2.jpg";
  const image2 = "/heroes/8.jpg";
  const image3 = "/heroes/33.jpg";

  // Bir görsel bileşeni oluşturma helper'ı (Önceki koddan)
  const ImageBlock = ({ src, alt }: { src: string; alt: string }) => (
    <div className="my-8 rounded-xl overflow-hidden shadow-xl border border-gray-100">
      <Image
        src={src}
        alt={alt}
        width={1200} // Maksimum genişlik
        height={500} // Oranları korumak için tahmini yükseklik
        className="w-full h-auto object-cover"
        // Görsel optimizasyonu ve yükleme önceliği için
        priority={false}
      />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 font-sans">
      {/* Başlık */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 font-serif">Hakkımızda</h1>
        <p className="text-gray-500">NowArt - 22 Nisan 2025</p>
      </div>

      {/* Tanıtım */}
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          NowArt Perde ve NowArt Tekstil, tekstil ve perde sistemleri
          sektöründe yenilikçi, kaliteli ve güvenilir çözümler sunmak amacıyla
          kurulmuş, %100 yerli sermaye ile büyüyen öncü kuruluşlardır. Bursa'nın
          Osmangazi ilçesi Küçükbalıklı Mahallesi'nde yer alan modern üretim
          tesisimizde; plise perde, zebra kumaş ve özel tekstil ürünleri
          üretimini en ileri teknolojiyle gerçekleştiriyoruz.
        </p>

        {/* SABİT GÖRSEL 1: /heroes/2.jpg */}
        <ImageBlock src={image1} alt="NowArt modern üretim tesisimiz" />

        <h2 className="text-2xl font-semibold text-gray-900">
          Üretimde Kalite, Tasarımda Özgünlük
        </h2>
        <p>
          NowArt Perde markası altında, yaşam alanlarınıza şıklık ve
          işlevsellik katan plise perde sistemleri üretmekteyiz. Modern yaşamın
          ihtiyaçlarına cevap verebilen, hem estetik hem de kullanışlı perde
          çözümlerimizle; evlerden ofislere, otellerden mağazalara kadar geniş
          bir müşteri kitlesine hitap ediyoruz. "Her plise NowArt kalitesinde
          değildir" sloganımızla yola çıkarak, sektörümüzde kalite çıtasını
          yükselten işler yapmaya devam ediyoruz.
        </p>

        <p>
          NowArt Tekstil markamız ise, plise ve zebra kumaş üretiminde
          uzmanlaşmış bir yapıdadır. Kumaş üretim süreçlerimizde hem yenilikçi
          teknolojileri hem de sürdürülebilir üretim anlayışını benimseyerek,
          Türkiye genelinde yüzlerce iş ortağımıza toptan satış yapmaktayız.
        </p>

        {/* SABİT GÖRSEL 2: /heroes/8.jpg */}
        <ImageBlock
          src={image2}
          alt="NowArt Tekstil kumaş ve ürün görselleri"
        />

        <h2 className="text-2xl font-semibold text-gray-900">
          Üreticiden Tüketiciye: Doğrudan ve Güvenilir Alışveriş
        </h2>
        <p>
          Sunduğumuz ürünleri doğrudan üretim tesisimizden, aracı olmaksızın
          müşterilerimize ulaştırıyoruz. Böylece kaliteyi uygun fiyatlarla
          sunarken, her müşterimizin memnuniyetini ön planda tutuyoruz. Tüm
          ürünlerimiz, kalite kontrol süreçlerinden geçerek sizlere
          ulaştırılmaktadır. Amacımız yalnızca ürün satmak değil, yaşam
          alanlarınıza değer katacak çözümler üretmektir.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">
          Neden NowArt?
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
          <li>
            <strong>Yüksek Kalite Standartları:</strong> En iyi malzemeleri, en
            son teknolojiyle işleyerek mükemmel sonuçlar elde ediyoruz.
          </li>
          <li>
            <strong>Uzman Kadro:</strong> Alanında deneyimli üretim, tasarım ve
            satış ekibimizle her zaman en iyisini hedefliyoruz.
          </li>
          <li>
            <strong>Estetik ve Fonksiyonellik:</strong> Hem görsel olarak
            etkileyici hem de işlevsel perde sistemleri geliştiriyoruz.
          </li>
          <li>
            <strong>Zamanında Teslimat:</strong> Söz verdiğimiz tarihlerde
            üretimi tamamlayarak, zamanınızı önemsiyoruz.
          </li>
          <li>
            <strong>Yaygın Toptan Dağıtım:</strong> Türkiye genelinde
            bayilerimize ve perdecilere kaliteli ürünleri hızlı şekilde
            ulaştırıyoruz.
          </li>
        </ul>

        {/* SABİT GÖRSEL 3: /heroes/33.jpg */}
        <ImageBlock src={image3} alt="NowArt Plise Perde Sistemleri" />

        <h2 className="text-2xl font-semibold text-gray-900">Misyonumuz</h2>
        <p>
          Kaliteyi ulaşılabilir kılarak, her evin ve her mekanın ihtiyacına
          uygun perde çözümleri sunmak. Müşteri memnuniyetini en üst düzeyde
          tutarak, uzun vadeli iş birlikleri kurmak.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">Vizyonumuz</h2>
        <p>
          Türkiye’nin dört bir yanına ve dünyaya açılan, sektörde referans kabul
          edilen bir perde ve tekstil markası olmak. Sürekli yenilenen
          tasarımlarımız ve ileri üretim tekniklerimizle, geleceğin yaşam
          alanlarını şekillendirmek.
        </p>
      </div>

      {/* İletişim Bilgileri */}
      <div className="bg-blue-50 p-8 rounded-xl shadow-lg space-y-4 border border-blue-200">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">İletişim</h2>
        <div className="space-y-2 text-gray-700">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#92e676]" />
            <span>
              Küçükbalıklı Mahallesi, Küçükbalıklı Caddesi No: 55/3, Osmangazi /
              BURSA
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
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#92e676]" />
            <span>info@NowArttekstil.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Instagram className="w-5 h-5 text-[#92e676]" />
            <span> @NowArtperde & @NowArt.tekstil</span>
          </div>
        </div>
      </div>
    </div>
  );
}
