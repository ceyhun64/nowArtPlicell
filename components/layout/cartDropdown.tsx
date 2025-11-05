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
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import CartItem from "./cartItem";
import Loading from "./loading";
import LoginModal from "@/components/layout/login";
import {
  getCart,
  updateGuestCartQuantity,
  removeFromGuestCart,
  GuestCartItem, // 🟢 tipi import ettik
} from "@/utils/cart";

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
  guest?: boolean; // 🔹 Ekledik
}

const CartDropdown = forwardRef(
  ({ showCount = true, guest = false }: CartDropdownProps, ref) => {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    const checkLogin = useCallback(async () => {
      try {
        const res = await fetch("/api/account/check", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) return setIsLoggedIn(false);
        const data = await res.json();
        setIsLoggedIn(!!data?.user?.id);
      } catch {
        setIsLoggedIn(false);
      }
    }, []);

    // Fetch cart
    const fetchCart = useCallback(async () => {
      debug("fetchCart() started");
      setIsLoading(true);
      try {
        const res = await fetch("/api/cart", {
          method: "GET",
          credentials: "include",
        });
        debug("fetchCart response", res.status);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        debug("fetchCart data", data);
        setCartItems(data);
      } catch (err) {
        debug("fetchCart error", err);
        setCartItems([]);
      } finally {
        debug("fetchCart finished, stopping loader");
        setIsLoading(false);
      }
    }, []);

    // Guest cart
    const loadGuestCart = useCallback(() => {
      debug("loadGuestCart() started");
      try {
        const cart = getCart();
        debug("localStorage getCart()", cart);
        const guestCart = cart.map((item: GuestCartItem) => ({
          id: item.productId,
          quantity: item.quantity,
          product: {
            id: item.productId,
            title: item.title,
            pricePerM2: item.pricePerM2,
            mainImage: item.image,
            category: "Plicell",
          },
          m2: item.m2,
          width: item.width,
          height: item.height,
          profile: item.profile,
          device: item.device,
          note: item.note,
        }));

        debug("mapped guestCart()", guestCart);
        setCartItems(guestCart);
      } catch (err) {
        debug("loadGuestCart() error", err);
      } finally {
        debug("loadGuestCart() finished, stopping loader");
        setIsLoading(false);
      }
    }, []);
    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      refreshCart: () => {
        if (isLoggedIn && !guest) fetchCart();
        else loadGuestCart();
      },
    }));

    // Login kontrolü
    useEffect(() => {
      debug("checkLogin() running...");
      checkLogin();
    }, [checkLogin]);

    useEffect(() => {
      if (isLoggedIn && !guest) fetchCart();
      else loadGuestCart();
    }, [isLoggedIn, fetchCart, loadGuestCart]);

    useEffect(() => {
      if (isOpen) {
        if (isLoggedIn && !guest) fetchCart();
        else loadGuestCart();
      }
    }, [isOpen, isLoggedIn, fetchCart, loadGuestCart]);

    useEffect(() => {
      const handleCartUpdate = () => {
        if (isLoggedIn && !guest) fetchCart();
        else loadGuestCart();
      };
      window.addEventListener("cartUpdated", handleCartUpdate);
      return () => window.removeEventListener("cartUpdated", handleCartUpdate);
    }, [isLoggedIn, fetchCart, loadGuestCart]);

    const handleQuantityChange = async (id: number, delta: number) => {
      if (!isLoggedIn) {
        updateGuestCartQuantity(id, delta);
        loadGuestCart();
        return;
      }

      try {
        const res = await fetch(`/api/cart/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ delta }),
          credentials: "include",
        });
        if (res.ok) fetchCart();
        else toast.error("Miktar güncellenemedi");
      } catch {
        toast.error("Miktar güncellenemedi");
      }
    };

    const handleRemove = async (id: number) => {
      if (!isLoggedIn) {
        removeFromGuestCart(id);
        loadGuestCart();
        return;
      }

      try {
        const res = await fetch(`/api/cart/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (res.ok) fetchCart();
        else toast.error("Ürün kaldırılamadı");
      } catch {
        toast.error("Ürün kaldırılamadı");
      }
    };
    useEffect(() => {
      debug("isOpen changed", isOpen);
      debug("isLoggedIn", isLoggedIn);
      debug("guest", guest);
      debug("cartItems length", cartItems.length);
    }, [isOpen, isLoggedIn, guest, cartItems]);

    const subtotal = cartItems.reduce((acc, item) => {
      const price = item.product.pricePerM2 || 0;
      const quantity = item.quantity || 1;
      const m2 = item.m2 || 1;
      return acc + price * quantity * m2;
    }, 0);
    const debug = (label: string, data?: any) => {
      console.log(`[🧩 CartDropdown DEBUG] ${label}`, data ?? "");
    };

    return (
      <>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {showCount && (
                <span className="absolute -top-2 -right-1.5 h-5 w-5 rounded-full bg-[#92e676] text-green-900 text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-full sm:w-96 flex flex-col justify-between p-0"
          >
            <SheetHeader className="p-6 pb-2 border-b">
              <SheetTitle>Sepetiniz ({cartItems.length})</SheetTitle>
              <SheetDescription>
                Sepetinizdeki ürünleri görüntüleyin, miktarlarını güncelleyin
                veya kaldırın.
              </SheetDescription>
            </SheetHeader>

            <div className="flex-grow overflow-y-auto px-4 space-y-3">
              {isLoading ? (
                <Loading />
              ) : cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-16 space-y-4 text-gray-500">
                  <ShoppingCart className="h-12 w-12 text-gray-400 animate-bounce" />
                  <p className="text-lg font-semibold">Sepetiniz boş</p>
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

            {cartItems.length > 0 && (
              <div className="border-t p-6 space-y-4">
                <div className="flex justify-between font-medium">
                  <span>Ara Toplam</span>
                  <span>TL{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Toplam</span>
                  <span>TL{subtotal.toFixed(2)}</span>
                </div>
                <Link href="/checkout">
                  <Button className="w-full bg-[#001e59] text-white hover:bg-slate-800 flex items-center justify-center gap-2">
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
