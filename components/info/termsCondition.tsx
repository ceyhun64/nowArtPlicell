"use client";

import React from "react";
import { Phone, Globe, CircleCheck, Mail } from "lucide-react";

export default function TermsConditionsPage() {
  const terms = [
    {
      title: "Genel Hükümler",
      description:
        "Bu Şartlar ve Koşullar, NowArt Mekanik Perde Sistemleri web sitesi (www.NowArt.com) aracılığıyla yapılan satışlar için geçerlidir. Web sitemizi kullanarak bu Şartlar ve Koşullar'ı kabul etmiş sayılırsınız.",
    },
    {
      title: "Hizmet Kapsamı",
      description:
        "NowArt olarak plise perde, çiftli sistem plise perde, karartmalı plise perde, zebra perde kumaşı ve plise perde kumaşı satışı yapmaktayız. Plise perde ürün ve hizmetlerimiz yalnızca Türkiye sınırları içerisinde geçerlidir. Toptan zebra kumaşı ve plise perde kumaşı tüm dünyaya satışımız vardır.",
    },
    {
      title: "Sipariş ve Ödeme",
      description:
        "Sitemiz üzerinden verilen siparişlerin ödemesi havale veya kredi kartı ile yapılabilir. Sipariş verildiğinde, sipariş bilgileri sistemimize kaydedilir ve tarafınıza onay mesajı gönderilir. Siparişler, üretim sürecinden geçtikten sonra kargoya teslim edilir.",
    },
    {
      title: "Sipariş İptali ve Değişikliği",
      description:
        "Sipariş edilen ürün üzerinde deforme, çizik, leke, yırtılma veya üretimle alakalı herhangi bir sorun tespit edilmesi halinde işlem başlatılabilir. Taleplerinizi info@nowartplicell.com e-posta adresine veya 0552 555 10 25 numarasına iletebilirsiniz.",
    },
    {
      title: "Teslimat ve Kargo",
      description:
        "Siparişler Yurtiçi Kargo ile gönderilmektedir. Ortalama teslimat süresi 1 ila 7 iş günü arasındadır. Kargo gönderim bilgileri sipariş sahibine e-posta veya SMS ile iletilir.",
    },
    {
      title: "İade ve Garanti Koşulları",
      description:
        "Standart ürünlerde 7 gün içerisinde iade hakkınız vardır. Özel ölçüler ile üretilen perdeler stoklu ürün olmadığı için iade edilmemektedir, ancak üretimle alakalı bir sorun yaşanması durumunda gerekli düzenlemeler yapılabilir. Tüm ürünler 1 yıl garantilidir, ancak garanti müşteri kaynaklı zararları kapsamaz.",
    },
    {
      title: "Gizlilik ve Veri Güvenliği",
      description:
        "NowArt olarak müşteri bilgilerinizin gizliliğine önem veriyoruz ve gelişmiş web alt yapımız ile bilgilerinizi koruyoruz. Kredi kartı bilgileriniz sistemlerimizde kaydedilmez. Kişisel verileriniz kesinlikle üçüncü taraflarla paylaşılmaz.",
    },
    {
      title: "Değişiklik Hakkı",
      description:
        "NowArt, bu Şartlar ve Koşullar'ı gerekli gördüğü zamanlarda güncelleme hakkını saklı tutar. Yapılan güncellemeler web sitemizde yayınlandığı anda yürürlüğe girer.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 ">
      {/* Başlık */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">
          Şartlar ve Koşullar
        </h1>
        <p className="text-gray-500">yazan NowArt - 25 Mart 2025</p>
      </div>

      {/* Tanıtım */}
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          Web sitemizden alışveriş yapan tüm kullanıcıların uyması gereken
          kurallar ve prosedürler aşağıda detaylı olarak belirtilmiştir. Lütfen
          sipariş vermeden önce tüm maddeleri okuyunuz.
        </p>
      </div>

      {/* Şartlar Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {terms.map((term, idx) => (
          <div
            key={idx}
            className="bg-gray-50 p-4 rounded-xl shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
          >
            <CircleCheck className="text-indigo-500 w-6 h-6 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {term.title}
              </h3>
              <p className="text-gray-700 text-sm mt-1">{term.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* İletişim */}
      <div className="bg-indigo-50 p-8 rounded-xl shadow-lg space-y-4 border border-indigo-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">İletişim</h2>
        <p className="text-gray-700">
          Herhangi bir soru veya destek talebiniz için bizimle aşağıdaki
          iletişim kanallarından ulaşabilirsiniz:
        </p>
        <div className="space-y-2 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-indigo-500" />
            <span> info@nowartplicell.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-indigo-500" />
            <span> 0552 555 10 25</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-indigo-500" />
            <span> www.NowArt.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
