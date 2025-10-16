"use client";

import React from "react";
import {
  CreditCard,
  Banknote,
  ArrowRightCircle,
  ShieldCheck,
  Mail,
} from "lucide-react";

export default function PaymentOptions() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      {/* Başlık */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">Ödeme Seçenekleri</h1>
        <p className="text-gray-500">yazan NowArt - 22 Nisan 2025</p>
      </div>

      {/* İçerik */}
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          NowArt olarak, alışverişinizi kolay ve güvenli hale getirmek için
          çeşitli ödeme yöntemleri sunuyoruz. Aşağıda, web sitemiz üzerinden
          yapabileceğiniz ödeme seçeneklerini bulabilirsiniz.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            1. Kredi Kartı ile Ödeme
          </h2>
          <p className="mt-2">
            Visa, MasterCard ve diğer kredi kartlarıyla güvenli ödeme
            yapabilirsiniz. Ödemeler, PCI DSS güvenlik standartlarına uygun
            olarak şifreli şekilde işlenir. Kredi kartı bilgilerinizi sadece
            ödeme işleminde kullanıyoruz, üçüncü şahıslarla paylaşılmamaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            2. Banka Kartı ile Ödeme
          </h2>
          <p className="mt-2">
            Banka kartı ile ödeme yaparken, kartınızın kredi kartı özellikleri
            ile aynı güvenlik önlemleri uygulanmaktadır. Visa ve MasterCard
            altyapıları üzerinden banka kartı ile ödeme yapabilirsiniz.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            3. Havale/EFT ile Ödeme
          </h2>
          <p className="mt-2">
            Banka havalesi veya EFT (Elektronik Fon Transferi) seçeneği ile
            ödeme yapabilirsiniz. Siparişinizi tamamladıktan sonra gerekli banka
            hesap bilgileri e-posta yoluyla iletilecektir. Havale veya EFT
            işlemi tamamlandıktan sonra siparişiniz işleme alınır.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            4. Taksitli Ödeme Seçeneği
          </h2>
          <p className="mt-2">
            Kredi kartı ile yapılan ödemelerde taksitli ödeme seçeneği
            sunulmaktadır. Taksit sayısı, kullanılan kredi kartına ve banka
            politikalarına göre değişiklik gösterebilir. Ödeme adımında taksit
            seçeneği mevcutsa, taksit seçeneklerini görebilirsiniz.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            Güvenli Alışveriş
          </h2>
          <p className="mt-2">
            Tüm ödeme işlemleriniz, NowArt'in güvenlik önlemleriyle
            korunmaktadır. Kredi kartı ve banka bilgilerinizi yalnızca ödeme
            işlemi sırasında kullanıyor, üçüncü şahıslarla paylaşmıyoruz. Ödeme
            işlemleriniz 128-bit SSL şifreleme ile güvenli bir şekilde
            gerçekleştirilir.
          </p>
        </section>

        <p className="mt-3">
          Herhangi bir sorunuz varsa, bizimle{" "}
          <strong>info@nowartplicell.com</strong> adresi üzerinden iletişime
          geçebilirsiniz.
        </p>
      </div>

      {/* İletişim Kartı */}
      <div className="bg-indigo-50 p-8 rounded-xl shadow-lg space-y-4 border border-indigo-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">İletişim</h2>
        <div className="space-y-3 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-indigo-500" />
            <span>info@nowartplicell.com</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
            <span>
              Tüm ödeme işlemleriniz güvenli bir şekilde korunmaktadır.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-indigo-500" />
            <span>Kredi kartı ile güvenli ödeme</span>
          </div>
          <div className="flex items-center gap-3">
            <Banknote className="w-5 h-5 text-indigo-500" />
            <span>Banka kartı ve havale/EFT ile ödeme seçenekleri</span>
          </div>
          <div className="flex items-center gap-3">
            <ArrowRightCircle className="w-5 h-5 text-indigo-500" />
            <span>Taksitli ödeme imkanı</span>
          </div>
        </div>
      </div>
    </div>
  );
}
