"use client";

import React from "react";
import { MapPin, Phone, Globe, Mail, ShieldCheck } from "lucide-react";

export default function KvkkPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      {/* Başlık */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">
          KVKK Aydınlatma Metni
        </h1>
        <p className="text-gray-500">yazan NowArt - 22 Nisan 2025</p>
      </div>

      {/* İçerik */}
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          NowArt olarak,{" "}
          <strong>6698 sayılı Kişisel Verilerin Korunması Kanunu</strong>{" "}
          ("KVKK") kapsamında kişisel verilerinizin korunmasına büyük önem
          veriyoruz. Bu Aydınlatma Metni ile kişisel verilerinizin hangi
          amaçlarla işlendiği, nasıl toplandığı, hangi süreyle saklandığı ve
          haklarınız hakkında bilgi verilmektedir.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            1. Veri Sorumlusunun Kimliği
          </h2>
          <div className="mt-3 bg-indigo-50 p-6 rounded-xl shadow-sm border border-indigo-100">
            <p className="font-medium">
              Şirket Adı: <span className="font-normal">NowArt</span>
            </p>
            <p className="font-medium">
              Adres:{" "}
              <span className="font-normal">
                Bursa, Osmangazi, Küçükbalıklı Mah., Küçükbalıklı Cad., No: 55/3
              </span>
            </p>
            <p className="font-medium">
              Telefon: <span className="font-normal">0552 555 10 25</span>
            </p>
            <p className="font-medium">
              E-posta:{" "}
              <span className="font-normal">info@nowartplicell.com</span>
            </p>
            <p className="font-medium">
              Web Site: <span className="font-normal">NowArt.com</span>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            2. Kişisel Verilerin İşlenme Amaçları
          </h2>
          <p className="mt-3">
            Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
          </p>
          <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
            <li>Sipariş işlemlerinin gerçekleştirilmesi ve takibi.</li>
            <li>Müşteri desteği sağlanması.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            3. İşlenen Kişisel Veri Türleri
          </h2>
          <p className="mt-3">
            Aşağıdaki kişisel veri türleri; amaçlar doğrultusunda
            işlenebilmektedir:
          </p>
          <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
            <li>Ad, soyad</li>
            <li>Telefon numarası</li>
            <li>E-posta adresi</li>
            <li>IP adresi</li>
            <li>Adres bilgisi</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            4. Veri Toplama Yöntemleri
          </h2>
          <p className="mt-3">
            Kişisel verileriniz aşağıdaki yöntemlerle toplanabilir:
          </p>
          <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
            <li>Web sitesinde bulunan formlar aracılığıyla.</li>
            <li>Çerezler (cookies) yoluyla.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            5. Verilerin Paylaşımı ve Aktarımı
          </h2>
          <p className="mt-3">
            Kişisel verileriniz, aşağıdaki kişi ve kuruluşlarla paylaşılabilir:
          </p>
          <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
            <li>Kargo şirketleri (sipariş teslimatı için gerektiğinde).</li>
            <li>
              Ödeme hizmet sağlayıcıları (ödeme işlemleri için gerekli
              bilgiler).
            </li>
            <li>Resmi merciler (yasal yükümlülükler gerektirdiğinde).</li>
          </ul>
          <p className="mt-2">
            <strong>Yurt dışına veri aktarımı:</strong> Yapılmamaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            6. Verilerin Saklanma Süresi
          </h2>
          <p className="mt-3">
            Kişisel verileriniz, ilgili mevzuatta öngörülen saklama süreleri ve
            yasal yükümlülükler çerçevesinde tutulacaktır. Ayrıca müşteri
            iletişim bilgileri hizmetin gerektirdiği süre boyunca saklanacaktır.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            7. Kullanıcı Hakları
          </h2>
          <p className="mt-3">
            KVKK’nın 11. maddesi uyarınca sahip olduğunuz haklar şunlardır:
          </p>
          <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme.</li>
            <li>İşlenmişse buna ilişkin bilgi talep etme.</li>
            <li>
              İşleme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme.
            </li>
            <li>Verilerin aktarıldığı üçüncü kişileri bilme.</li>
            <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme.</li>
            <li>
              KVKK’da öngörülen şartlar çerçevesinde silinmesini veya yok
              edilmesini isteme.
            </li>
            <li>
              Bu işlemlerin, verilerin aktarıldığı üçüncü kişilere
              bildirilmesini talep etme.
            </li>
            <li>
              Otomatik sistemler aracılığıyla analiz edilmesi nedeniyle
              aleyhinize bir sonuç oluşmasına itiraz etme.
            </li>
            <li>
              Kanuna aykırı işlenmesi nedeniyle zarara uğramanız hâlinde
              tazminat talep etme.
            </li>
          </ul>
          <p className="mt-3">
            Bu hakları kullanmak için bizimle iletişime geçebilirsiniz; iletişim
            bilgileri aşağıda yer almaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900">
            8. Veri Güvenliği Tedbirleri
          </h2>
          <p className="mt-3">
            NowArt olarak kişisel verilerinizin gizliliğini ve güvenliğini
            sağlamak için hem teknolojik hem de idari tedbirler almaktayız.
            Verilere yetkisiz erişimleri engellemek ve kötüye kullanımı önlemek
            için güvenlik uygulamalarımız sürekli güncellenmektedir.
          </p>
        </section>
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
            <span>info@nowartplicell.com</span>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
            <span>
              Kişisel verilerinizin korunması için alınan güvenlik tedbirleri
              uygulanmaktadır.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
