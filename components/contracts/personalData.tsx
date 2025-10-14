"use client";

import React from "react";
import { MapPin, Phone, Globe, Mail, ShieldCheck } from "lucide-react";

export default function PersonalDataConsent() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      {/* Başlık */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">
          Kişisel Veriler Onay Metni
        </h1>
        <p className="text-gray-500">yazan NowArt - 22 Nisan 2025</p>
      </div>

      {/* İçerik */}
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          Tarafıma ait kişisel verilerin,{" "}
          <strong>6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)</strong>
          kapsamında, NowArt tarafından aşağıdaki amaçlarla işlenmesine ve
          gerektiğinde üçüncü kişilerle paylaşılmasına açıkça onay veriyorum:
        </p>

        <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
          <li>Sipariş işlemlerimin gerçekleştirilmesi</li>
          <li>Müşteri destek hizmetlerinin sağlanması</li>
          <li>Kargo ve teslimat süreçlerinin yürütülmesi</li>
          <li>Ödeme işlemlerinin gerçekleştirilmesi</li>
          <li>Yasal yükümlülüklerin yerine getirilmesi</li>
        </ul>

        <p className="mt-3">
          Bu kapsamda; adım, soyadım, telefon numaram, e-posta adresim, adres
          bilgilerim ve IP adresim gibi kişisel verilerimin, NowArt’in hizmet
          sağlayıcıları, kargo şirketleri, ödeme hizmeti sunucuları ve
          gerektiğinde resmi mercilerle paylaşılmasına izin verdiğimi beyan
          ederim.
        </p>

        <p className="mt-3">
          Kişisel verilerimin, yukarıdaki amaçlarla sınırlı olarak NowArt
          tarafından belirlenen süre boyunca saklanacağını ve KVKK kapsamında
          sahip olduğum haklar konusunda bilgilendirildiğimi kabul ederim.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">Haklarım</h2>
        <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
          <li>Verilerimin işlenip işlenmediğini öğrenmek</li>
          <li>
            Verilerimin işlenme amacını ve amaca uygun kullanılıp
            kullanılmadığını öğrenmek
          </li>
          <li>
            Verilerimin yurtiçi veya yurtdışında paylaşıldığı üçüncü kişileri
            bilmek
          </li>
          <li>
            Eksik veya yanlış işlenmişse bunların düzeltilmesini talep etmek
          </li>
          <li>
            Kanunda öngörülen şartlar çerçevesinde silinmesini veya yok
            edilmesini istemek
          </li>
          <li>İşlemenin kanuna aykırı olduğunu düşünüyorsam itiraz etmek</li>
        </ul>

        <p className="mt-3">
          NowArt ile kişisel verilerimle ilgili taleplerimi{" "}
          <strong>info@NowArt.com</strong> adresine iletebileceğim ve
          taleplerimin KVKK’ya uygun şekilde değerlendirileceğini kabul
          ediyorum.
        </p>
      </div>

      {/* İletişim Kartı */}
      <div className="bg-indigo-50 p-8 rounded-xl shadow-lg space-y-4 border border-indigo-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">İletişim</h2>
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
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
            <span>
              Kişisel verilerinizin korunması için güvenlik tedbirleri
              uygulanmaktadır.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
