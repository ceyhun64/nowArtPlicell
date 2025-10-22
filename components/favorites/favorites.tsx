"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  title: string;
  pricePerM2: number;
  rating: number;
  reviewCount: number;
  mainImage: string;
  subImage?: string;
}

interface Favorite {
  id: number;
  product: Product;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginAndFetch = async () => {
      try {
        const res = await fetch("/api/account/check");
        const data = await res.json();

        if (res.ok && data.user?.id) {
          setIsLoggedIn(true);

          // Giriş varsa favorileri çek
          const favRes = await fetch("/api/favorites");
          if (!favRes.ok) throw new Error("Favoriler alınamadı");
          const favData: Favorite[] = await favRes.json();
          setFavorites(favData);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error(err);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoginAndFetch();
  }, []);

  const handleRemove = (productId: number) => {
    setFavorites((prev) => prev.filter((f) => f.product.id !== productId));
  };

  const handleLoginButtonClick = () => {
    window.location.href = "/login"; // Giriş sayfasına yönlendir
  };

  const FavoriteSkeleton = () => (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 shadow-md p-3">
      <Skeleton className="w-full h-60 rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-20 py-16 mb-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Favorilerim</h1>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <FavoriteSkeleton key={i} />
          ))}
        </div>
      ) : !isLoggedIn ? (
        <div className="flex flex-col items-center justify-center mt-16 space-y-4 text-gray-500">
          <Heart className="h-12 w-12 text-gray-400 animate-bounce" />
          <p className="text-lg font-semibold">
            Favorilere erişmek için giriş yapın
          </p>
          <p className="text-sm text-gray-400 text-center px-4">
            Favorilerinizi görmek ve ürünleri kaydetmek için hesabınıza giriş
            yapmanız gerekiyor.
          </p>
          <Button
            variant="outline"
            className="mt-2"
            onClick={handleLoginButtonClick}
          >
            Giriş Yap
          </Button>
        </div>
      ) : favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16 space-y-4 text-gray-500">
          <Heart className="h-12 w-12 text-gray-400 animate-bounce" />
          <p className="text-lg font-semibold">Henüz favori ürün eklemediniz</p>
          <p className="text-sm text-gray-400 text-center px-4">
            Favorilerinize ürün eklemek için ürünleri keşfedin ve kalp ikonuna
            tıklayın.
          </p>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => (window.location.href = "/products")}
          >
            Ürünleri Keşfet
          </Button>
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
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
