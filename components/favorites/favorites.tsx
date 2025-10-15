"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
import { Skeleton } from "@/components/ui/skeleton";

// === Tip Tanımları ===
interface Product {
  id: number;
  title: string;
  pricePerM2: number;
  rating: number;
  reviewCount: number;
  mainImage: string;
  subImage: string;
  category: string;
}

interface Favorite {
  id: number;
  product: Product;
}

// === Ana Bileşen ===
export default function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  // === Sahte Veri ===
  useEffect(() => {
    const SAHTE_FAVORILER: Favorite[] = [
      {
        id: 1,
        product: {
          id: 101,
          title: "Modern Desenli Halı",
          pricePerM2: 349.99,
          rating: 5,
          reviewCount: 128,
          mainImage: "/products/product1main.png",
          subImage: "/products/product1sub1.png",
          category: "DÜZ SERİ",
        },
      },
      {
        id: 2,
        product: {
          id: 102,
          title: "Klasik İran Motifli Halı",
          pricePerM2: 429.9,
          rating: 4,
          reviewCount: 97,
          mainImage: "/products/product2main.png",
          subImage: "/products/product2sub1.png",
          category: "BASKILI",
        },
      },
    ];

    setTimeout(() => {
      setFavorites(SAHTE_FAVORILER);
      setLoading(false);
    }, 1200);
  }, []);

  // === Favoriden Kaldırma ===
  const handleRemoveFavorite = (productId: number) => {
    setFavorites((prev) => prev.filter((fav) => fav.product.id !== productId));
  };

  // === Skeleton Bileşeni ===
  const FavoriteSkeleton = () => (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 shadow-md p-3">
      <Skeleton className="w-full h-60 rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex items-center justify-between mt-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/5" />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-20 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Favorilerim</h1>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <FavoriteSkeleton key={i} />
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <div className="p-4 rounded-md bg-indigo-50 text-gray-700">
          Henüz favorilerinize ürün eklemediniz.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <ProductCard
              key={fav.product.id}
              id={fav.product.id}
              title={fav.product.title}
              mainImage={fav.product.mainImage}
              subImage={fav.product.subImage}
              pricePerM2={fav.product.pricePerM2}
              rating={fav.product.rating}
              reviewCount={fav.product.reviewCount}
            />
          ))}
        </div>
      )}
    </div>
  );
}
