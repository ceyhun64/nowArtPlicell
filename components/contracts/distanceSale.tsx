"use client";

import React from "react";
import { MapPin, Phone, Globe, Mail, Package } from "lucide-react";

export default function DistanceSalesContract() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      {/* Başlık */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">
          Mesafeli Satış Sözleşmesi
        </h1>
        <p className="text-gray-500">yazan NowArt - 05 Haziran 2025</p>
      </div>

      {/* İçerik */}
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">1. Taraflar</h2>
          <p className="mt-2">
            Bu sözleşme, Satıcı ile Alıcı arasında elektronik ortamda
            kurulmuştur.
          </p>
          <div className="mt-3 bg-indigo-50 p-6 rounded-xl shadow-sm border border-indigo-100">
            <p className="font-medium">Satıcı Bilgileri:</p>
            <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
              <li>Unvan: NowArt</li>
              <li>
                Adres: Bursa, Osmangazi, Küçükbalıklı Mah., Küçükbalıklı Cad.,
                No: 55/3
              </li>
              <li>Telefon: 0552 555 10 25</li>
              <li>E-posta: info@NowArt.com</li>
              <li>Web Sitesi: NowArt.com</li>
            </ul>
            <p className="mt-2 font-medium">Alıcı Bilgileri:</p>
            <p>
              Alıcı, sipariş sırasında paylaştığı ad, soyad, adres, telefon ve
              e-posta bilgileri ile tanımlanır.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            2. Sözleşmenin Konusu ve Kapsamı
          </h2>
          <p className="mt-2">
            Bu sözleşme, Alıcı'nın sipariş verdiği ürünlerin/hizmetlerin satışı
            ve teslimine ilişkin hak ve yükümlülükleri kapsar.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            3. Ürün/Hizmet Bilgileri
          </h2>
          <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
            <li>Ürün Adı: [Sipariş edilen ürünlerin isimleri]</li>
            <li>Adet: [Ürün adedi]</li>
            <li>Fiyat: [Ürün birim fiyatı ve toplam fiyat (KDV dahil)]</li>
            <li>Kargo Ücreti: [Kargo ücreti (varsa)]</li>
            <li>Teslimat Adresi: [Alıcı tarafından belirtilen adres]</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            4. Ödeme ve Teslimat Şartları
          </h2>
          <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
            <li>
              Ödeme, kredi kartı, havale/EFT veya Satıcı tarafından belirlenen
              diğer yöntemlerle yapılır.
            </li>
            <li>
              Sipariş onaylandıktan sonra ürünler en geç 7 iş günü içinde
              kargoya verilecektir.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            5. Cayma Hakkı
          </h2>
          <p className="mt-2">
            Alıcı, ürün teslim tarihinden itibaren 14 gün içinde gerekçe
            göstermeksizin cayma hakkını kullanabilir. Cayma hakkının kullanımı
            için Satıcı'ya yazılı bildirim yapılmalıdır.
          </p>
          <p className="mt-2 font-medium">
            Cayma hakkının kullanılamadığı durumlar:
          </p>
          <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
            <li>
              Kişiye özel üretilen ürünler, hasarlı çıkmadıkça iade edilemez.
            </li>
            <li>
              Kargo ücretleri karşılanmadığında geri gönderimde iade yapılmaz.
            </li>
            <li>Teslim sonrası açılan veya deforme ürünler.</li>
            <li>
              Kişiye özel ölçülerde üretilen ürünler, yeniden satışa sunulamaz.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            6. İade ve Değişim Koşulları
          </h2>
          <p className="mt-2">
            Kişiye özel ebatlarda üretilen ürünlerde iade hakkı yoktur. Sipariş
            ile bu koşullar kabul edilmiş sayılır.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            7. Sorumluluklar ve Garantiler
          </h2>
          <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
            <li>
              Ürün teslim sırasında hasarlı veya eksikse, kargo görevlisine
              tutanakla bildirilmelidir.
            </li>
            <li>Ayıplı mal durumunda, Alıcı kanuni haklarını kullanabilir.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            8. Hukuki Uyuşmazlıklar
          </h2>
          <p className="mt-2">
            İşbu sözleşmeden doğabilecek ihtilaflarda, Tüketici Hakem Heyetleri
            ve Tüketici Mahkemeleri yetkilidir.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            9. Elektronik Onay ve Yürürlük
          </h2>
          <p className="mt-2">
            Alıcı, sözleşmenin tüm koşullarını elektronik ortamda kabul etmiş
            olup, sipariş onayı ile yürürlüğe girer.
          </p>
        </section>
      </div>

      {/* İletişim Kartı */}
      <div className="bg-indigo-50 p-8 rounded-xl shadow-lg space-y-4 border border-indigo-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Satıcı İletişim
        </h2>
        <div className="space-y-3 text-gray-700">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-indigo-500" />
            <div>
              <p className="font-medium">Adres</p>
              <p>
                Küçükbalıklı Mah., Küçükbalıklı Cad. No: 55/3, Osmangazi / BURSA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-indigo-500" />
            <span>0552 555 10 25</span>
          </div>

          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-indigo-500" />
            <span>NowArt.com</span>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-indigo-500" />
            <span>info@NowArt.com</span>
          </div>

          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-indigo-500" />
            <span>
              Ürünler, sözleşme ve teslim şartlarına uygun olarak
              gönderilecektir.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
