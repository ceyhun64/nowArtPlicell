// CartSummary.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Percent } from "lucide-react"; // Truck yerine Percent eklendi
import Link from "next/link";

interface CartSummaryProps {
  subtotal: number;
}

export default function CartSummary({ subtotal }: CartSummaryProps) {
  return (
    <div className="w-full md:w-[360px] flex-shrink-0 p-6 bg-white h-fit rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-semibold mb-6">Sipariş Özeti</h2>

      <div className="space-y-2 text-gray-600">
        <div className="flex justify-between">
          <span className="text-sm">Ara Toplam</span>
          <span className="font-medium text-sm">TL{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-bold text-lg border-t pt-3 mt-3 text-gray-900">
          <span>Toplam</span>
          <span>TL{subtotal.toFixed(2)}</span>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          KDV tutarı (%10) ödeme sayfasında hesaplanacaktır.
        </p>
      </div>

      <Button className="w-full mt-6 bg-[#92e676] hover:bg-green-400 text-black font-semibold rounded-xl flex items-center justify-center h-12 transition-colors">
        <Link
          href="/checkout"
          className="flex items-center justify-center gap-2 w-full"
        >
          <span>ÖDEMEYİ TAMAMLA</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>

      <div className="mt-6 space-y-3 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span>256-bit SSL ile güvenli ödeme</span>
        </div>
        <div className="flex items-center gap-2">
          <Percent className="h-4 w-4" /> {/* KDV ikonuna çevrildi */}
          <span>
            Tüm fiyatlarımıza %10 KDV dahildir (Ödeme sayfasında hesaplanır).
          </span>{" "}
          {/* KDV metni */}
        </div>
      </div>
    </div>
  );
}
