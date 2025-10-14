"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  mainImage: string;
}

interface BasketItem {
  id: string;
  product: Product;
  quantity: number;
  customName?: string;
  strollerCover?: boolean;
  hatToyOption?: string;
}

interface BasketSummaryCardProps {
  basketItemsData: BasketItem[];
  subTotal: number;
  selectedCargoFee: number;
  totalPrice: number;
}

export default function BasketSummaryCard({
  basketItemsData,
  subTotal,
  selectedCargoFee,
  totalPrice,
}: BasketSummaryCardProps) {
  // Ürün detaylarını oluştur
  const getItemDetails = (item: BasketItem) => {
    const details: string[] = [];
    if (item.customName) details.push(`Kişiselleştirme: "${item.customName}"`);
    if (item.strollerCover) details.push("Puset Kılıfı Dahil");
    if (item.hatToyOption && item.hatToyOption !== "none") details.push(`Şapka / Oyuncak: ${item.hatToyOption}`);
    return details;
  };

  return (
    <Card className="sticky top-6 lg:h-fit">
      <CardHeader>
        <CardTitle className="text-xl">Sepet Özeti</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Ürün Listesi */}
        <div className="space-y-4">
          {basketItemsData.map((item) => {
            if (!item.product) return null;
            const product = item.product;
            const details = getItemDetails(item);

            return (
              <div key={item.id} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <Image
                    src={product.mainImage}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>

                <div className="flex-grow">
                  <p className="font-semibold text-sm">{product.name}</p>
                  {details.length > 0 && (
                    <div className="text-xs text-gray-500 space-y-0.5 mt-1">
                      {details.map((detail, idx) => (
                        <p key={idx}>{detail}</p>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-400 mt-1">{item.quantity} adet</p>
                </div>

                <div className="text-right flex flex-col items-end">
                  <span className="text-sm font-medium text-red-500">
                    {(product.price * item.quantity).toFixed(2)}TL
                  </span>
                  {product.oldPrice && product.oldPrice > product.price && (
                    <span className="text-xs line-through text-gray-400">
                      {(product.oldPrice * item.quantity).toFixed(2)}TL
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <Separator />

        {/* Fiyat Detayları */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between font-normal">
            <span>Ara Toplam</span>
            <span className="font-medium">{subTotal.toFixed(2)}TL</span>
          </div>
          <div className="flex justify-between font-normal">
            <span>Kargo / Teslimat</span>
            <span className={`font-medium ${selectedCargoFee === 0 ? "text-green-600" : ""}`}>
              {selectedCargoFee === 0 ? "Ücretsiz" : `+${selectedCargoFee.toFixed(2)}TL`}
            </span>
          </div>
        </div>

        <Separator />

        {/* Toplam */}
        <div className="flex justify-between text-lg font-bold">
          <span>Toplam</span>
          <span>{totalPrice.toFixed(2)}TL</span>
        </div>
      </CardContent>

      <CardFooter>
        <Link href="/cart" className="w-full">
          <Button variant="outline" className="w-full">
            Sepeti Düzenle
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
