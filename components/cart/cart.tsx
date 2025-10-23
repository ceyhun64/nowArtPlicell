"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import CartItem from "./cartItem";
import CartSummary from "./cartSummary";
import Loading from "../layout/loading";
import LoginModal from "@/components/layout/login"; // 🔹 login modal import
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";

interface Product {
  id: number;
  title: string;
  pricePerM2: number;
  mainImage: string;
  category: string;
}

export interface CartItemType {
  id: number;
  product: Product;
  quantity: number;
  note?: string | null;
  profile?: string;
  width?: number;
  height?: number;
  device?: string;
  m2?: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // 🔹 modal state

  // 🔹 Sepeti backend’den çek (Geliştirilmiş Versiyon)
  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/cart", {
        credentials: "include", // NextAuth çerezini gönderir.
      });

      if (res.status === 401) {
        // 🚨 Sunucudan 401 hatası gelirse, kullanıcı giriş yapmamış demektir.
        setIsLoggedIn(false);
        setCartItems([]);
        return; // İşlemi durdur
      }

      if (!res.ok) {
        // 500 (Sunucu hatası) veya diğer hatalar
        throw new Error("Sepet verisi alınamadı");
      }

      // Başarılı (200 OK) ise
      setIsLoggedIn(true); // Geleneksel olarak zaten başarılı istek geldiği için kullanıcı yetkilidir.
      const data = await res.json();
      setCartItems(data);
    } catch (error) {
      console.error("Sepet çekme hatası:", error);
      toast.error("Sepet yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart(); // Direkt sepeti çekmeyi dene
  }, []);

  // 🔹 Quantity artır / azalt
  const handleQuantityChange = async (id: number, delta: number) => {
    const item = cartItems.find((c) => c.id === id);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);

    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
        credentials: "include", // ⚡ burayı ekle
      });

      const updatedItem = await res.json();

      if (res.ok) {
        setCartItems((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, quantity: updatedItem.quantity } : c
          )
        );
        toast.success(`Miktar güncellendi: ${updatedItem.quantity}`);
      } else {
        toast.error(updatedItem.error || "Güncelleme başarısız");
      }
    } catch {
      toast.error("Miktar güncellenemedi");
    }
  };

  // 🔹 Cart item sil
  const handleRemove = async (id: number) => {
    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: "DELETE",
        credentials: "include", // ⚡ burayı ekle
      });
      const data = await res.json();
      if (res.ok) {
        setCartItems((prev) => prev.filter((c) => c.id !== id));
        toast.success("Ürün sepetten kaldırıldı");
      } else {
        toast.error(data.error || "Ürün kaldırılamadı");
      }
    } catch {
      toast.error("Ürün kaldırılamadı");
    }
  };
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    fetchCart(); // giriş yaptıktan sonra sepeti tekrar çek
  };
  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product.pricePerM2 || 0;
    const quantity = item.quantity || 1;
    const m2 = item.m2 || 1;
    return acc + price * quantity * m2;
  }, 0);

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto px-3 md:px-16 py-16 mb-12">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Sepetim</h1>

      {!isLoggedIn ? (
        <div className="flex flex-col items-center justify-center mt-16 space-y-4 text-gray-500">
          <ShoppingBag className="h-12 w-12 text-gray-400 animate-bounce" />
          <p className="text-lg font-semibold">
            Sepetinizi görmek için giriş yapın
          </p>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => setIsLoginModalOpen(true)} // 🔹 modal açılıyor
          >
            Giriş Yap
          </Button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Sepetiniz boş.</p>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={() => handleQuantityChange(item.id, 1)}
                  onDecrease={() => handleQuantityChange(item.id, -1)}
                  onRemove={() => handleRemove(item.id)}
                />
              ))
            )}
          </div>

          {cartItems.length > 0 && <CartSummary subtotal={subtotal} />}
        </div>
      )}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onRegisterClick={() => (window.location.href = "/register")}
        onForgotPasswordClick={() =>
          (window.location.href = "/forgot-password")
        }
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
