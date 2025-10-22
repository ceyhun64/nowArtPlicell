"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import CartItem from "./cartItem";
import CartSummary from "./cartSummary";
import Loading from "../layout/loading";

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

  // 🔹 Login kontrolü
  const checkLogin = async () => {
    try {
      const res = await fetch("/api/account/check");
      if (!res.ok) return setIsLoggedIn(false);
      const data = await res.json();
      if (data?.user?.id) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    } catch {
      setIsLoggedIn(false);
    }
  };

  // 🔹 Sepeti backend’den çek
  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/cart");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCartItems(data);
    } catch {
      if (isLoggedIn) toast.error("Sepet yüklenemedi");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await checkLogin();
    })();
  }, []);

  useEffect(() => {
    if (isLoggedIn) fetchCart();
    else setIsLoading(false);
  }, [isLoggedIn]);

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
      const res = await fetch(`/api/cart/${id}`, { method: "DELETE" });
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

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product.pricePerM2 || 0;
    const quantity = item.quantity || 1;
    const m2 = item.m2 || 1;
    return acc + price * quantity * m2;
  }, 0);

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto px-3 md:px-16 py-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Sepetim</h1>

      {!isLoggedIn ? (
        <p className="text-gray-500 text-center mt-10">
          Sepetinizi görmek için giriş yapın.
        </p>
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
    </div>
  );
}
