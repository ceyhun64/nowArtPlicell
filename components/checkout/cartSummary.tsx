"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCart, GuestCartItem } from "@/utils/cart";

interface Product {
  id: number;
  title: string;
  pricePerM2: number;
  mainImage: string;
  oldPrice?: number;
}

interface BasketItem {
  id: number;
  product: Product;
  quantity: number;
  note?: string | null;
  profile?: string;
  width?: number;
  height?: number;
  device?: string;
}

interface BasketSummaryCardProps {
  basketItemsData?: BasketItem[];
  subTotal?: number;
  selectedCargoFee: number;
  totalPrice?: number;
}

export default function BasketSummaryCard({
  basketItemsData = [],
  subTotal = 0,
  selectedCargoFee,
  totalPrice = 0,
}: BasketSummaryCardProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [guestItems, setGuestItems] = useState<GuestCartItem[]>([]);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

  // ✅ Giriş durumunu kontrol et
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch("/api/account/check", { method: "GET" });
        const data = await res.json();
        setIsLoggedIn(!!data.user);
      } catch (error) {
        console.error("Oturum kontrolü başarısız:", error);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  // ✅ Cart verisini yükle (login -> backend, guest -> localStorage)
  useEffect(() => {
    if (isLoggedIn === null) return;

    const fetchCart = async () => {
      if (isLoggedIn) {
        try {
          const res = await fetch("/api/cart");
          if (res.ok) {
            const data = await res.json();
            const items: BasketItem[] = data.map((item: any, i: number) => ({
              id: i,
              product: {
                id: item.product.id,
                title: item.product.title,
                pricePerM2: item.product.pricePerM2,
                mainImage: item.product.mainImage,
                oldPrice: item.product.oldPrice,
              },
              quantity: item.quantity,
              note: item.note ?? undefined,
              profile: item.profile,
              width: item.width,
              height: item.height,
              device: item.device,
            }));
            setBasketItems(items);
            setGuestItems([]);
          } else {
            console.error("Backend cart fetch failed");
            setBasketItems([]);
          }
        } catch (err) {
          console.error("Cart fetch error:", err);
          setBasketItems([]);
        }
      } else {
        const localCart = getCart();
        setGuestItems(localCart);
        setBasketItems([]);
      }
    };

    fetchCart();

    // 🔹 Cart güncellendiğinde tekrar yükle
    const handleCartUpdated = () => {
      fetchCart();
    };
    window.addEventListener("cartUpdated", handleCartUpdated);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
    };
  }, [isLoggedIn]);

  // 🔹 Gösterilecek ürünleri belirle
  const itemsToRender =
    isLoggedIn && basketItems.length > 0
      ? basketItems
      : guestItems.map((item, i) => ({
          id: i,
          product: {
            id: item.productId,
            title: item.title,
            pricePerM2: item.pricePerM2,
            mainImage: item.image,
          },
          quantity: item.quantity,
          note: item.note ?? undefined,
          profile: item.profile,
          width: item.width,
          height: item.height,
          device: item.device,
        }));

  // 🔹 Ara toplam ve toplam hesapla
  const calculatedSubTotal = itemsToRender.reduce((acc, item) => {
    const area =
      item.width && item.height ? (item.width * item.height) / 10000 : 1;
    return acc + item.product.pricePerM2 * area * item.quantity;
  }, 0);

  const calculatedTotal = calculatedSubTotal + selectedCargoFee;

  const getItemDetails = (item: BasketItem): string[] => {
    const details: string[] = [];
    if (item.note) details.push(`Not: "${item.note}"`);
    if (item.profile) details.push(`Profil: ${item.profile}`);
    if (item.width && item.height)
      details.push(
        `Boyut: ${item.width} x ${item.height} cm (${item.device ?? "vidali"})`
      );
    return details;
  };

  if (isLoggedIn === null) {
    return <p className="text-center mt-4 text-gray-400">Yükleniyor...</p>;
  }

  if (!itemsToRender || itemsToRender.length === 0) {
    return (
      <p className="text-center mt-4 text-gray-500">
        Sepetinizde ürün bulunmamaktadır.
      </p>
    );
  }

  return (
    <Card className="sticky top-6 lg:h-fit">
      <CardHeader>
        <CardTitle className="text-xl">Sepet Özeti</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-4">
          {itemsToRender.map((item) => {
            const product: Product = item.product;
            const details = getItemDetails(item);
            const area =
              item.width && item.height
                ? (item.width * item.height) / 10000
                : 1;
            const itemPrice = product.pricePerM2 * area * item.quantity;

            return (
              <div key={item.id} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <Image
                    src={product.mainImage}
                    alt={product.title}
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>

                <div className="flex-grow">
                  <p className="font-semibold text-sm">{product.title}</p>
                  {details.length > 0 && (
                    <div className="text-xs text-gray-500 space-y-0.5 mt-1">
                      {details.map((detail, idx) => (
                        <p key={idx}>{detail}</p>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {item.quantity} adet
                  </p>
                </div>

                <div className="text-right flex flex-col items-end">
                  <span className="text-sm font-medium text-red-500">
                    {itemPrice.toFixed(2)}TL
                  </span>
                  {product.oldPrice &&
                    product.oldPrice > product.pricePerM2 && (
                      <span className="text-xs line-through text-gray-400">
                        {(product.oldPrice * area * item.quantity).toFixed(2)}TL
                      </span>
                    )}
                </div>
              </div>
            );
          })}
        </div>

        <Separator />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between font-normal">
            <span>Ara Toplam</span>
            <span className="font-medium">
              {calculatedSubTotal.toFixed(2)}TL
            </span>
          </div>
          <div className="flex justify-between font-normal">
            <span>Kargo / Teslimat</span>
            <span
              className={`font-medium ${
                selectedCargoFee === 0 ? "text-green-600" : ""
              }`}
            >
              {selectedCargoFee === 0
                ? "Ücretsiz"
                : `+${selectedCargoFee.toFixed(2)}TL`}
            </span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Toplam</span>
          <span>{calculatedTotal.toFixed(2)}TL</span>
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
