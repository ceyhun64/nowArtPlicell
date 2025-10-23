"use client";

import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight, UserPlus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import CartItem from "./cartItem";
import Loading from "./loading";
import LoginModal from "@/components/layout/login";

interface Product {
  id: number;
  title: string;
  pricePerM2: number;
  mainImage: string;
  oldPrice?: number;
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

interface CartDropdownProps {
  showCount?: boolean;
}

const CartDropdown = forwardRef(
  ({ showCount = true }: CartDropdownProps, ref) => {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    // Kullanıcı login mi?
    const checkLogin = useCallback(async () => {
      try {
        const res = await fetch("/api/account/check", {
          method: "GET",
          credentials: "include", // 🟢 session cookie gönder
        });
        if (!res.ok) return setIsLoggedIn(false);
        const data = await res.json();
        setIsLoggedIn(!!data?.user?.id);
      } catch {
        setIsLoggedIn(false);
      }
    }, []);

    // Sepeti backend’den çek
    const fetchCart = useCallback(async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/cart", {
          method: "GET",
          credentials: "include", // 🟢 session cookie gönder
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setCartItems(data);
      } catch {
        setCartItems([]);
      } finally {
        setIsLoading(false);
      }
    }, []);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      refreshCart: () => {
        if (isLoggedIn) fetchCart();
      },
    }));

    useEffect(() => {
      checkLogin();
    }, [checkLogin]);

    useEffect(() => {
      if (isLoggedIn) fetchCart();
    }, [isLoggedIn, fetchCart]);

    useEffect(() => {
      if (isOpen && isLoggedIn) fetchCart();
    }, [isOpen, isLoggedIn, fetchCart]);

    useEffect(() => {
      const handleCartUpdate = () => {
        if (isLoggedIn) fetchCart();
      };
      window.addEventListener("cartUpdated", handleCartUpdate);
      return () => {
        window.removeEventListener("cartUpdated", handleCartUpdate);
      };
    }, [isLoggedIn, fetchCart]);

    const handleQuantityChange = async (id: number, delta: number) => {
      const item = cartItems.find((c) => c.id === id);
      if (!item) return;
      const newQuantity = Math.max(1, item.quantity + delta);
      try {
        const res = await fetch(`/api/cart/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: newQuantity }),
          credentials: "include", // 🟢 session cookie gönder
        });
        const updatedItem = await res.json();
        if (res.ok) {
          setCartItems((prev) =>
            prev.map((c) =>
              c.id === id ? { ...c, quantity: updatedItem.quantity } : c
            )
          );
        } else {
          toast.error(updatedItem.error || "Güncelleme başarısız");
        }
      } catch {
        toast.error("Miktar güncellenemedi");
      }
    };

    const handleRemove = async (id: number) => {
      try {
        const res = await fetch(`/api/cart/${id}`, {
          method: "DELETE",
          credentials: "include", // 🟢 session cookie gönder
        });
        if (res.ok) {
          setCartItems((prev) => prev.filter((c) => c.id !== id));
        } else {
          const data = await res.json();
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

    const handleLoginButtonClick = () => {
      setIsOpen(false);
      setTimeout(() => setLoginModalOpen(true), 300);
    };

    return (
      <>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" aria-label="Sepeti aç">
              <ShoppingCart className="h-5 w-5" />
              {showCount && (
                <span className="absolute -top-2 -right-1.5 h-5 w-5 rounded-full bg-[#92e676] text-green-900 text-xs flex items-center justify-center p-0.5 leading-none">
                  {isLoggedIn ? cartItems.length : 0}
                </span>
              )}
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-full sm:w-96 flex flex-col justify-between p-0"
          >
            <SheetHeader className="p-6 pb-2 border-b">
              <SheetTitle>
                Sepetiniz {isLoggedIn ? `(${cartItems.length})` : ""}
              </SheetTitle>
            </SheetHeader>

            <div className="flex-grow overflow-y-auto px-4 space-y-3">
              {!isLoggedIn ? (
                <div className="flex flex-col items-center justify-center mt-16 space-y-4 text-gray-500">
                  <UserPlus className="h-12 w-12 text-gray-400 animate-bounce" />
                  <p className="text-lg font-semibold">Giriş Yapın</p>
                  <p className="text-sm text-gray-400 text-center px-4">
                    Sepetinizi görmek için giriş yapmanız gerekiyor. Hesabınıza
                    giriş yaparak alışverişe devam edebilirsiniz.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={handleLoginButtonClick}
                  >
                    Giriş Yap
                  </Button>
                </div>
              ) : isLoading ? (
                <Loading />
              ) : cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-16 space-y-4 text-gray-500">
                  <ShoppingCart aria-label="Sepeti aç" className="h-12 w-12 text-gray-400 animate-bounce" />
                  <p className="text-lg font-semibold">Sepetiniz boş</p>
                  <p className="text-sm text-gray-400 text-center px-4">
                    Henüz sepetinize ürün eklemediniz. Beğendiğiniz ürünleri
                    ekleyerek alışverişe başlayabilirsiniz.
                  </p>
                  <Link href="/products">
                    <Button variant="outline" className="mt-2">
                      Ürünlere Göz At
                    </Button>
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                  />
                ))
              )}
            </div>

            {isLoggedIn && cartItems.length > 0 && (
              <div className="border-t p-6 space-y-4">
                <div className="flex justify-between font-medium">
                  <span>Ara Toplam</span>
                  <span>TL{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Toplam</span>
                  <span>TL{subtotal.toFixed(2)}</span>
                </div>
                <Link href="/cart">
                  <Button variant="outline" className="w-full mb-2">
                    Sepete Git
                  </Button>
                </Link>
                <Link href="/checkout">
                  <Button
                    variant="default"
                    className="w-full bg-[#001e59] text-white hover:bg-slate-800 flex items-center justify-center gap-2"
                  >
                    Ödemeye Geç <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </SheetContent>
        </Sheet>

        <LoginModal
          isOpen={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          onRegisterClick={() => setLoginModalOpen(false)}
          onForgotPasswordClick={() => setLoginModalOpen(false)}
          onLoginSuccess={() => {
            setLoginModalOpen(false);
            setIsLoggedIn(true);
            fetchCart();
          }}
        />
      </>
    );
  }
);

export default CartDropdown;
