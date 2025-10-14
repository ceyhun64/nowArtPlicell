"use client";

import React from "react";
import { Trash2, Plus, Minus, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

interface CartItemProps {
  item: CartItemType;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  const { product, quantity } = item;

  const basePrice = product.price || 0;
  const oldPrice = product.oldPrice || 0;
  const strollerCoverPrice = item.strollerCover ? 149 : 0;
  const hatToyPrice =
    item.hatToyOption && item.hatToyOption !== "none" ? 149 : 0;

  const finalPrice = (basePrice + strollerCoverPrice + hatToyPrice) * quantity;
  const finalOldPrice =
    (oldPrice + strollerCoverPrice + hatToyPrice) * quantity;

  const hasOptions =
    (item.customName && item.customName !== "none") ||
    item.strollerCover ||
    (item.hatToyOption && item.hatToyOption !== "none");

  return (
    <div className="flex flex-col sm:flex-row w-full gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Product Image */}
      <div className="relative w-full sm:w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
        <Image
          src={product.mainImage}
          alt={product.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-sm sm:text-base text-gray-900">
            {product.name}
          </h3>
          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        {/* Product Options */}
        {hasOptions && (
          <div className="text-xs text-gray-600 mt-1 space-y-0.5">
            {item.customName && <p>Custom Name: {item.customName}</p>}
            {item.strollerCover && <p>Stroller Cover (+TL149)</p>}
            {item.hatToyOption && item.hatToyOption !== "none" && (
              <p>Hat & Toy: {item.hatToyOption} (+TL149)</p>
            )}
          </div>
        )}

        {/* Quantity & Price */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-3 gap-3">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => onDecrease(item.id)}
              disabled={quantity <= 1}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-medium text-gray-900">
              {quantity}
            </span>
            <button
              onClick={() => onIncrease(item.id)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Price & Edit */}
          <div className="flex flex-col items-end text-right">
            {oldPrice > 0 && (
              <span className="text-gray-400 line-through text-xs">
                TL{finalOldPrice.toFixed(2)}
              </span>
            )}
            <span className="font-bold text-gray-900 text-sm sm:text-base">
              TL{finalPrice.toFixed(2)}
            </span>

            <Link href={`/products/${product.id}`}>
              <button className="flex items-center text-xs text-gray-500 hover:text-gray-800 mt-1">
                <span className="mr-1">Düzenle</span>
                <Edit className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
