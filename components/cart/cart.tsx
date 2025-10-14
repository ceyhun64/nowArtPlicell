"use client";

import React, { useState } from "react";
import CartItem from "./cartItem";
import CartSummary from "./cartSummary";
import Loading from "../layout/loading";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  mainImage: string;
}

interface CartItemType {
  id: number;
  product: Product;
  quantity: number;
  strollerCover?: boolean;
  hatToyOption?: string;
  customName?: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: 1,
      product: {
        id: 1,
        name: "Baby Stroller",
        price: 499,
        oldPrice: 599,
        category: "strollers",
        mainImage: "/images/stroller.png",
      },
      quantity: 1,
      strollerCover: true,
      hatToyOption: "Teddy Bear",
    },
    {
      id: 2,
      product: {
        id: 2,
        name: "Car Seat Deluxe",
        price: 299,
        category: "car-seats",
        mainImage: "/images/seat.png",
      },
      quantity: 2,
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  // --- Fonksiyonlar number ID ile çalışacak ---
  const handleIncrease = (id: number) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  const handleDecrease = (id: number) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
      )
    );
  };

  const handleRemove = (id: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const basePrice = item.product.price || 0;
    const strollerCoverPrice = item.strollerCover ? 149 : 0;
    const hatToyPrice =
      item.hatToyOption && item.hatToyOption !== "none" ? 149 : 0;

    const finalPrice =
      (basePrice + strollerCoverPrice + hatToyPrice) * item.quantity;
    return acc + finalPrice;
  }, 0);

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto px-16 py-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">
        Sepetim ({cartItems.length})
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            ))
          )}
        </div>

        {/* Summary */}
        <CartSummary subtotal={subtotal} />
      </div>
    </div>
  );
}
