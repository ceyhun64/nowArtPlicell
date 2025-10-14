"use client";

import React from "react";
import { Copy, IdCard, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BankAccount {
  bankName: string;
  branch: string;
  accountOwner: string;
  iban: string;
  currency: string;
}

const accounts: BankAccount[] = [
  {
    bankName: "Ziraat Bankası",
    branch: "Osmangazi",
    accountOwner: "NowArt Perde",
    iban: "TR00 0000 0000 0000 0000 00",
    currency: "TL",
  },
  {
    bankName: "VakıfBank",
    branch: "Osmangazi",
    accountOwner: "NowArt Perde",
    iban: "TR11 1111 1111 1111 1111 11",
    currency: "TL",
  },
];

export default function BankAccountsPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("IBAN kopyalandı!");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      {/* Başlık */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">Banka Hesaplarımız</h1>
        <p className="text-gray-500">NowArt - 22 Nisan 2025</p>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Siparişlerinizi güvenle tamamlayabilmeniz için banka bilgilerimizi
          buradan görüntüleyebilir, havale/EFT işlemlerinizi kolayca
          gerçekleştirebilirsiniz.
        </p>
      </div>

      {/* Banka Hesapları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.map((acc, idx) => (
          <div
            key={idx}
            className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="flex items-center gap-3 mb-4">
              <IdCard className="w-6 h-6 text-[#92e676]" />
              <h2 className="text-lg font-semibold text-gray-800">
                {acc.bankName}
              </h2>
            </div>
            <p className="text-gray-700">
              <strong>Şube:</strong> {acc.branch}
            </p>
            <p className="text-gray-700">
              <strong>Hesap Sahibi:</strong> {acc.accountOwner}
            </p>
            <p className="text-gray-700 flex items-center justify-between">
              <span>
                <strong>IBAN:</strong> {acc.iban}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="ml-2"
                onClick={() => copyToClipboard(acc.iban)}
              >
                <Copy className="w-4 h-4 mr-1" /> Kopyala
              </Button>
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Para Birimi:</strong> {acc.currency}
            </p>
          </div>
        ))}
      </div>

      {/* Bilgilendirme */}
      <div className="bg-blue-50 p-8 rounded-xl shadow-lg border border-blue-200 space-y-4">
        <h2 className="text-2xl font-bold text-blue-900">
          Ödeme Bilgilendirme
        </h2>
        <p className="text-indigo-900">
          Lütfen havale/EFT işlemlerinizde sipariş numaranızı açıklama kısmına
          ekleyin. Ödeme onayı alındıktan sonra ürünleriniz hızlıca hazırlanıp
          gönderilecektir.
        </p>
        <p className="text-indigo-900">
          Ödeme ile ilgili herhangi bir sorun yaşarsanız, bize aşağıdaki
          bilgilerden ulaşabilirsiniz:
        </p>
        <div className="flex flex-col md:flex-row gap-4 text-indigo-900">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-[#92e676]" /> 0552 555 10 25
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-[#92e676]" /> NowArt.com
          </div>
        </div>
      </div>
    </div>
  );
}
