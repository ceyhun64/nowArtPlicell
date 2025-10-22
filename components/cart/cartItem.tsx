"use client";

import React from "react";
import { Trash2, Plus, Minus, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CartItemType } from "./cart";

interface CartItemProps {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  const { product, quantity, note, profile, device, width, height, m2 } = item;
  const finalPrice = (product.pricePerM2 || 0) * (m2 || 1) * quantity;

  return (
    <div className="flex w-full gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex-row items-center">
      {/* Product Image */}
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={product.mainImage}
          alt={product.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 justify-between">
        {/* Header */}
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-sm sm:text-base text-gray-900 truncate">
            {product.title}
          </h3>
          <button
            onClick={onRemove}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Product Details */}
        <div className="text-xs text-gray-600 mt-1 space-y-0.5">
          {note && <p className="truncate">Not: {note}</p>}
          {profile && <p className="truncate">Profil: {profile}</p>}
          {device && <p className="truncate">Aparat: {device}</p>}
          {width && height && (
            <p className="truncate">
              Ölçü: {width}cm x {height}cm (m²: {m2})
            </p>
          )}
        </div>

        {/* Quantity + Price */}
        <div className="flex justify-end items-center mt-2 gap-2">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden text-sm">
            <button
              onClick={onDecrease}
              disabled={quantity <= 1}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-40"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center font-medium text-gray-900 text-sm">
              {quantity}
            </span>
            <button
              onClick={onIncrease}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Price & Edit */}
          <div className="flex flex-col items-end text-right text-xs sm:text-sm">
            <span className="font-bold text-gray-900 text-sm sm:text-base">
              ₺{finalPrice.toFixed(2)}
            </span>
            <Link href={`/products/${product.id}`}>
              <button className="flex items-center text-xs text-gray-500 hover:text-gray-800 mt-1 transition-colors">
                <span className="mr-1">Düzenle</span>
                <Edit className="h-3 w-3" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
