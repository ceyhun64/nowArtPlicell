"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  mainImage: string;
  subImage: string; // artık tek alt görsel
  title: string;
  pricePerM2: number;
  rating: number;
  reviewCount: number;
}

export default function ProductCard({
  id,
  mainImage,
  subImage,
  title,
  pricePerM2,
  rating,
  reviewCount,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const renderStars = () => {
    const stars = [];
    const maxRating = 5;
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <Link href={`/products/${id}`} className="block group relative">
      <Card
        className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Görsel */}
        <div className="relative overflow-hidden">
          <img
            src={hovered && subImage ? subImage : mainImage}
            alt={title}
            className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Favori ikonu */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault(); // Linke tıklamayı engelle
              setFavorited(!favorited);
            }}
            className="absolute top-3 right-3 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-red-500 hover:text-white transition-colors"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                favorited ? "text-red-500 fill-red-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>

        {/* Bilgi Alanı */}
        <CardContent className="p-5">
          <h2 className="text-base font-semibold text-stone-800 leading-snug line-clamp-2">
            {title}
          </h2>

          <div className="mt-2 flex items-center">
            <div className="flex space-x-0.5">{renderStars()}</div>
            <span className="ml-2 text-sm text-gray-500">({reviewCount})</span>
          </div>

          <div className="mt-3">
            <p className="text-lg font-semibold text-stone-800">
              {pricePerM2.toFixed(2)} TL
            </p>
            <p className="text-xs text-gray-500">Metrekare Fiyatı</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
