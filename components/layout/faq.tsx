"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HelpCircle, Headset, MapPin, Mail, Phone, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Üye Olmadan Sipariş Verebilir Miyim?",
      answer: (
        <>
          <p className="mb-2">
            Evet, NowArt'den üye olmadan da kolayca sipariş verebilirsiniz!
          </p>
          <p className="mb-2">
            Misafir kullanıcı olarak alışveriş yapmanıza olanak tanıyan
            sistemimiz sayesinde hızlı ve zahmetsiz bir şekilde siparişlerinizi
            tamamlayabilirsiniz.
          </p>
          <div>
            <strong>Ancak, üye olmanın avantajlarını da unutmayın! </strong>
            <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
              <li>Siparişlerinizi kolayca takip edebilir,</li>
              <li>Geçmiş siparişlerinize hızlıca ulaşabilir,</li>
              <li>Kampanya ve indirimlerden ilk siz haberdar olabilirsiniz!</li>
            </ul>
          </div>
        </>
      ),
    },
    {
      question: "Siparişimin Durumunu Nasıl Takip Edebilirim?",
      answer: (
        <>
          <p className="mb-2">
            Web sitemizde yer alan Sipariş Sorgulama bölümüne giderek, sipariş
            numaranız ve e-posta adresinizi girmeniz yeterlidir.
          </p>
          <p className="mb-2">
            Siparişiniz kargoya verildiğinde, kargo takip numaranız da bu alanda
            yer alır. Böylece kargonuzu anlık olarak takip edebilirsiniz.
          </p>
          <p className="mb-2">
            Herhangi bir sorunla karşılaşırsanız, müşteri hizmetlerimize
            ulaşmaktan çekinmeyin! 0552 555 10 25 info@nowartplicell.com
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Sol: FAQ */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-stone-900 mb-6">
          Sıkça Sorulan Sorular
        </h2>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => toggleIndex(index)}
          >
            <div className="flex items-start gap-4">
              <HelpCircle className="w-6 h-6 text-[#92e676] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-stone-800 mb-2">
                  {faq.question}
                </h3>
                {openIndex === index && (
                  <div className="text-stone-700 text-sm mt-2">
                    {faq.answer}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sağ: Bize Ulaşın */}
      <div className="flex flex-col justify-center items-start bg-gradient-to-br from-blue-50 to-blue-100 p-10 rounded-2xl shadow-lg border border-indigo-200">
        <div className="flex items-center gap-3 mb-4">
          <Headset className="w-6 h-6 text-[#92e676]" />
          <h3 className="text-2xl font-bold text-blue-900">Sorunuz mu var?</h3>
        </div>
        <p className="text-indigo-700 mb-6">
          Yardıma ihtiyacınız olan bir sorun veya sorunuz varsa, aşağıdaki
          butona tıklayarak Müşteri Hizmetleri temsilcimizle iletişime
          geçebilirsiniz.
        </p>
        <Link href="/contact">
          <Button className="bg-[#92e676] hover:bg-green-600 text-white px-8 py-4 shadow-md transition-all transform hover:-translate-y-1 hover:shadow-xl">
            Bize Ulaşın
          </Button>
        </Link>
      </div>
    </div>
  );
}
