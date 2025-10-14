"use client";

import React, { useState } from "react";
import { Info, MessageCircle, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const dummyComments = [
  {
    id: 1,
    author: "Ali Y.",
    rating: 5,
    date: "2 ay önce",
    text: "Perdeler tam istediğim gibi geldi. Ölçüler birebir uydu, teşekkürler!",
  },
  {
    id: 2,
    author: "Esra D.",
    rating: 4,
    date: "1 ay önce",
    text: "Hızlı kargo ve kaliteli ürün. Kurulumu da çok kolay oldu.",
  },
];

interface ProductTabsProps {
  productTitle: string;
}

export default function ProductTabs({ productTitle }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "comments">(
    "description"
  );

  const tableData = [
    { label: "KUMAŞ", value: "Polyester" },
    { label: "MARKA", value: "Plise" },
    { label: "PROFİL", value: "Alüminyum" },
    { label: "RENK SEÇENEKLERİ", value: "10 farklı desen ve renk seçeneği." },
    { label: "ÜRÜN TEMİZLİĞİ", value: "Temizlenebilir" },
    { label: "NEM DAYANIKLILIK", value: "Var" },
    {
      label: "MONTAJ ALANLARI",
      value:
        "Cam balkon, pimapen pencere ve alüminyum pencereye monte edilebilir.",
    },
    {
      label: "MONTAJ APARATLARI",
      value: "Vida ve montaj aparatları ücretsiz gönderilmektedir.",
    },
    {
      label: "ÖDEME SEÇENEKLERİ",
      value: "Kredi Kartı - Banka Kartı - Banka Havale",
    },
    { label: "İMALAT SÜRESİ", value: "1 ila 7 iş günü içerisinde." },
  ];

  return (
    <section className="mt-16">
      {/* Sekme Başlıkları */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab("description")}
          className={`flex items-center gap-2 py-3 px-6 text-base font-medium transition-all duration-200 ${
            activeTab === "description"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Info size={18} />
          Açıklama
        </button>

        <button
          onClick={() => setActiveTab("comments")}
          className={`flex items-center gap-2 py-3 px-6 text-base font-medium transition-all duration-200 ${
            activeTab === "comments"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <MessageCircle size={18} />
          Yorumlar ({dummyComments.length})
        </button>
      </div>

      {/* İçerik Alanı */}
      <Card className="border-gray-200 shadow-sm rounded-2xl bg-white">
        <CardContent className="p-8">
          {activeTab === "description" && (
            <div className="text-gray-700">
              <table className="w-full text-left border-collapse mb-10">
                <tbody>
                  {tableData.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 last:border-none"
                    >
                      <td className="py-3 font-medium text-gray-900 w-1/3">
                        {item.label}
                      </td>
                      <td className="py-3 text-gray-600 w-2/3">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Separator className="my-8" />

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Pilise Perde Siparişi Verirken Nelere Dikkat Etmeliyiz?
                </h3>
                <p className="mb-6 leading-relaxed text-gray-600">
                  İlk defa pilise perde siparişi veriyorsanız, ölçü, montaj,
                  kumaş ve renk seçimi gibi süreçlere dikkat etmeniz faydalı
                  olur. Aşağıda doğru sipariş vermeniz için bazı ipuçlarını
                  paylaştık.
                </p>

                <h4 className="text-base font-semibold text-gray-900 mb-2">
                  Doğru Ölçü Almak
                </h4>
                <p className="mb-6 text-sm leading-relaxed text-gray-600">
                  Ölçü almadan önce “NowArt perde ölçüsü nasıl alınır”
                  rehberimize göz atın. Metre yardımıyla dikey ve yatay ölçüleri
                  dikkatlice hesaplayın. Milimetrik ölçü almak, tam uyumlu bir
                  perde için önemlidir.
                </p>

                <h4 className="text-base font-semibold text-gray-900 mb-2">
                  Desen ve Renk Seçimi
                </h4>
                <p className="mb-6 text-sm leading-relaxed text-gray-600">
                  Pilise perdelerde tül, jakarlı, düz seri, %100 karartmalı veya
                  %70 karartmalı seçenekler mevcuttur. Odanızın tarzına uygun
                  desen ve rengi seçerek siparişinizi oluşturabilirsiniz.
                </p>

                <h4 className="text-base font-semibold text-gray-900 mb-2">
                  Pilise Perde Montajı
                </h4>
                <p className="mb-6 text-sm leading-relaxed text-gray-600">
                  Ürünü teslim aldığınızda montaj konusunda endişelenmeyin.
                  Kılavuzdaki adımları izleyerek kolayca monte edebilirsiniz.
                  Aparatlar pakete dahildir.
                </p>

                <p className="font-semibold text-gray-900 text-base">
                  Hepsi bu kadar! Şıklığın tadını çıkarın.
                </p>
              </div>
            </div>
          )}

          {activeTab === "comments" && (
            <div className="space-y-6">
              {dummyComments.length > 0 ? (
                dummyComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-all"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-semibold text-gray-900">
                        {comment.author}
                      </p>
                      <span className="text-xs text-gray-500">
                        {comment.date}
                      </span>
                    </div>

                    <div className="flex items-center mb-2 text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < comment.rating
                              ? "fill-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">
                  Bu ürün için henüz yorum yapılmamıştır. İlk yorum yapan siz
                  olun!
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
